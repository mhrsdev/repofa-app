# Production MCP + LangGraph Agent Patterns

A small, runnable reference for the patterns I use when an AI agent has to call real tools and
survive real users: an MCP server with typed tools, an MCP client with local validation and a
call ledger, a LangGraph agent with explicit state, bounded retries and a human-approval gate,
an evaluation harness with a golden set, and a security document that separates what is
implemented here from what production needs.

This repository is a sanitized public demonstration of production patterns. It does not contain
proprietary source code from my production systems.

[![ci](https://github.com/MatinLabkhandagh/mcp-agent-production-patterns/actions/workflows/ci.yml/badge.svg)](https://github.com/MatinLabkhandagh/mcp-agent-production-patterns/actions/workflows/ci.yml)

## Why this repository exists

Most agent examples stop at "the model called a tool". The work that decides whether the system
is usable starts after that: what happens when the tool says `not_found`, when the model
produces a malformed argument, when the upstream times out twice, when a write needs a human
to say yes, and how you prove next month that a prompt change did not break any of it.

I have built and run three production AI systems ([OmidGPT](https://aimatin.com/en/case-studies/omidgpt/),
[Jozveh-AI](https://aimatin.com/en/case-studies/jozveh-ai/), [AiMatin](https://aimatin.com/en/case-studies/aimatin/)).
The patterns here are the ones that survived contact with those. The code is new, fictional
and small on purpose, so each pattern is visible instead of buried in a product.

## What it demonstrates

- **Model Context Protocol (MCP)** server and client using the official Python SDK (2.x), over
  stdio and Streamable HTTP.
- **Typed tool contracts**: Pydantic models are the single source of the JSON Schema the server
  advertises, the validation the client performs, and the validation the agent performs.
- **Two failure channels**, kept apart: protocol errors (`is_error`) and business failures
  (`ok=false, error.code`). The agent retries neither blindly.
- **LangGraph** workflow with a `TypedDict` state, routing as pure functions, retry cap,
  terminal `fail` node, and an `interrupt()`-based approval gate for write tools.
- **Evaluation** on a golden set: tool selection, argument validity, execution count,
  termination, answer constraints, through a `Judge` protocol.
- **Tool-call ledger**: per-invocation record with hashed arguments, latency and outcome.
- **Security** write-up covering OAuth 2.1, PKCE, resource indicators, per-user
  authorization, SSRF, credential isolation, audit logging, idempotency, rate limiting.
- **Docker** image (non-root) and compose file that runs server and client over HTTP.

## Architecture

![System: user, LangGraph agent, MCP client, MCP server, business tools](architecture/system.svg)

The agent process holds no tool implementations, only an allow-list of names and argument
models. The server process holds the implementations and nothing else: no filesystem, shell or
network. Between them, one JSON-RPC call per tool invocation and one ledger entry.

![Agent flow with retry loop, fail node and evaluation attachment points](architecture/agent-flow.svg)

![OAuth 2.1 sequence with PKCE and resource binding between user, client, authorization server and MCP server](architecture/oauth-flow.svg)

## Repository structure

```
mcp_server/     MCP server: schemas.py (contracts), tools.py (implementations), server.py (transport)
mcp_client/     MCP client with local schema validation, error mapping and the call ledger
agent/          LangGraph agent: state.py, tools.py (executor), graph.py (nodes, routing, model boundary)
evaluation/     golden-set/examples.json, judge.py (Judge protocol + RuleJudge), evaluate.py (runner)
security/       README.md: implemented controls vs production considerations
architecture/   system.svg, agent-flow.svg, oauth-flow.svg
tests/          42 tests: tool contracts, protocol behaviour, routing, retries, approval, judge
docker/         Dockerfile (non-root, uv lockfile) and docker-compose.yml
.github/        CI: ruff, mypy, pytest, evaluation, Docker build, on Python 3.12 and 3.13
```

Each package has its own README with the decisions specific to it.

## Quick start

Requires Python 3.12+ and [uv](https://docs.astral.sh/uv/).

```bash
git clone https://github.com/MatinLabkhandagh/mcp-agent-production-patterns.git
cd mcp-agent-production-patterns
uv sync --all-extras

uv run pytest -q                             # 42 tests
uv run python -m mcp_client.client           # spawns the MCP server over stdio, prints calls + ledger
uv run python -m agent.graph                 # six requests through the LangGraph agent, with traces
uv run python -m evaluation.evaluate         # 14 golden cases, exit 1 on any failure
```

Without uv: `python -m venv .venv && . .venv/bin/activate && pip install -e ".[dev]"`, then the
same commands without the `uv run` prefix.

## MCP server

`mcp_server/` exposes four tools over a fictional retail support desk: `get_customer`,
`search_orders`, `get_order`, `create_support_ticket`. Data is in memory and deterministic.

```python
@server.tool(annotations=READ_ONLY)
def get_customer(customer_id: CustomerId) -> CustomerResponse:
    """Fetch one customer record by id. Returns error.code=not_found for unknown ids."""
    return desk.get_customer(customer_id)
```

`CustomerId` is an `Annotated[str, Field(pattern=r"^C-\d{4}$", ...)]` defined once in
`schemas.py`. The SDK turns it into the tool's `inputSchema`; the response model becomes its
`outputSchema` and is returned as `structuredContent`. Tool annotations (`readOnlyHint`,
`destructiveHint`, `idempotentHint`) are set truthfully so a host can apply policy.

The write tool takes an `idempotency_key`. Retrying with the same key returns the original
ticket with `created=false`. An agent that retries will eventually retry a write; this is the
minimum that makes that safe. Details: [`mcp_server/README.md`](mcp_server/README.md).

## MCP client

`mcp_client/client.py` wraps `mcp.Client` and adds the three things I never ship without:

1. Arguments are validated against the advertised JSON Schema **before** the call. A bad call
   raises `ToolArgumentError` with the schema path and is recorded as `rejected_locally`.
2. `is_error=true` becomes `ToolCallError`; `ok=false` in the payload becomes a normal result
   with `error_code`. Different causes, different handling.
3. Every invocation appends `{seq, tool, args_hash, outcome, latency_ms, error_code}` to a
   ledger. Arguments are hashed because they carry personal data.

```
$ uv run python -m mcp_client.client
get_customer -> Lena Ortiz (8.7 ms)
search_orders -> ['O-5002', 'O-5001']
get_order(O-9999) -> ok = False error_code = not_found
rejected locally: customer_id: '1001' does not match '^C-\\d{4}$'
create_support_ticket -> T-0001 created = True | retry created = False
```

Details: [`mcp_client/README.md`](mcp_client/README.md).

## LangGraph agent

```
START -> classify -> [approve] -> call_tool -> validate -> answer -> END
                 \-> answer                       \-> call_tool (transient, attempts < 3)
                                                   \-> fail (bad arguments, exhausted, declined)
```

The routing functions read `error_kind` and `attempts` and nothing else, so the retry policy is
tested with a dict. Three failure classes get three outcomes: transient failures retry up to
`MAX_ATTEMPTS = 3`, bad arguments stop immediately, business failures go to `answer` because
"no such order" is an answer, not an error. That last rule is what removes the classic
agent retry loop by construction.

The language model sits behind a two-method `Model` protocol (`classify`, `compose`). The
shipped `RuleBasedModel` is regex-based and deterministic, which is why the tests and the
evaluation run offline. An LLM-backed model implements the same protocol; the graph does not
change.

`build_graph(require_approval=True, checkpointer=InMemorySaver())` inserts an `approve` node
that calls LangGraph's `interrupt()` for non-read-only tools. The run pauses with the proposed
call, and resumes with `Command(resume=True)` or `Command(resume=False)`. Details:
[`agent/README.md`](agent/README.md).

## Evaluation

*Sanitized demonstration inspired by production evaluation patterns.*

`evaluation/golden-set/examples.json` pins 14 behaviours. Each case declares the expected tool,
a subset of expected arguments, the expected behaviour (`tool_then_answer`,
`answer_without_tool`, `business_failure_reported`) and answer constraints. `RuleJudge` checks
five things per case; the one that catches real regressions is `tool_execution`, which fails
if the tool ran more than once.

```
$ uv run python -m evaluation.evaluate
case                                    result  failing checks
customer-lookup-basic                   PASS
order-not-found                         PASS
ticket-order-belongs-to-other-customer  PASS
...
14/14 cases passed (100%)
```

`Judge` is a protocol so an LLM judge can sit next to the rule judge. In my production
evaluation work the rule checks gate the model judge, and claim-level judging (one verdict per
claim, not per answer) is what made results actionable. Neither is implemented here.
Details: [`evaluation/README.md`](evaluation/README.md).

## Security

[`security/README.md`](security/README.md) has two lists. **Implemented here**: schema
validation at both ends, tool allow-list, no side-channel capabilities, structured failures,
retry cap, idempotent writes, approval gate, call ledger, truthful tool annotations, non-root
container. **Production considerations**: OAuth 2.1 with PKCE, resource/audience binding
(RFC 8707), scopes mapped to tool groups plus per-user row filtering, SSRF rules for any tool
that fetches URLs, credential isolation between agent and server, persisted audit logging,
server-side idempotency storage, rate limits per principal and per conversation, transport
hardening. Nothing in the second list is claimed as implemented.

## Testing

```bash
uv run ruff check . && uv run ruff format --check .
uv run mypy            # strict, all packages and tests
uv run pytest -q       # 42 tests
```

Tests cover the tool contracts in plain Python and over the MCP protocol (in-process client),
the client's local rejection and ledger, every routing function, retry-then-succeed,
retry-then-fail, bad-argument stop, business-failure answer, approval pause/resume/decline,
golden-set pass, and that the judge fails on duplicate calls, wrong tools and non-termination.

## Docker

```bash
docker build -f docker/Dockerfile -t mcp-agent-patterns .
docker run --rm mcp-agent-patterns python -m mcp_client.client          # stdio inside the container
docker compose -f docker/docker-compose.yml up --build --abort-on-container-exit   # HTTP: server + client
```

The image installs from `uv.lock`, runs as a non-root user and serves Streamable HTTP on
port 8000. Set `MCP_PORT` to publish on a different host port. Put TLS and authentication in
front of it; see the security document.

## Production considerations

What changes between this repository and a deployed version, in the order I would do it:

1. Replace `RuleBasedModel` with an LLM-backed model using structured output for `classify`.
   Keep the executor's validation; feed its error message back for one repair attempt.
2. Persist the ledger and the LangGraph checkpoints (Postgres for both), joined by
   conversation and user id.
3. Put the MCP server behind TLS and an OAuth resource-server check; map scopes to tool groups;
   filter every query by the authenticated principal.
4. Add per-principal rate limits at the server and a per-turn tool-call and token budget at
   the agent.
5. Grow the golden set from real conversations; add an LLM judge for faithfulness; run the
   harness in CI on every prompt change, which is the part teams skip and regret.

## Limitations

- The "model" is a set of regexes. It demonstrates the control flow, not language understanding.
- Data is in memory; tickets reset on restart. There is no database.
- No authentication is implemented. The server is safe to run only on localhost or behind a
  gateway that authenticates.
- Single process, single tenant. Nothing here addresses concurrency across users.
- The evaluation measures behaviour on 14 hand-written inputs, not quality on a distribution.

## Relation to my real work

I built this as a public, sanitized demonstration of how I structure agent systems. The
production versions of these ideas live in systems I built and operate:

- [OmidGPT](https://aimatin.com/en/case-studies/omidgpt/): a multi-provider agentic AI platform
  with a tool-call ledger, MCP connectors behind an OAuth relay, semantic caching and
  complexity-based model routing.
- [Jozveh-AI](https://aimatin.com/en/case-studies/jozveh-ai/): a LangGraph supervisor over
  specialised agents with GraphRAG retrieval, source-cited generation and an evaluation stack of
  RAGAS, a claim-level LLM judge and grounding filters.
- [AiMatin](https://aimatin.com/en/case-studies/aimatin/): a FastAPI and Next.js platform whose
  admin API is wrapped in a custom MCP server so an AI operator can run its workflows.

None of their source code is in this repository. If you are building or fixing something in this
space, the [services page](https://aimatin.com/en/services/) describes how I work, and you can
[book a call](https://cal.com/matin-labkhandagh).

Matin Labkhandagh, Production AI & Agentic Systems Engineer.
[aimatin.com/en](https://aimatin.com/en/) · [LinkedIn](https://www.linkedin.com/in/matin-labkhandagh-637553234/) · [GitHub profile](https://github.com/MatinLabkhandagh)

## License

MIT. See [LICENSE](LICENSE).