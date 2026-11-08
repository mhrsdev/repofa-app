# Orven

Orven is an MCP-compatible context and memory system for AI-assisted development. It does two connected jobs:

1. **Paged context.** It gives assistants a structured, paged view of a project so they can navigate large codebases without exhausting the context window.
2. **Recorded theory.** It keeps a durable record of what is known about the code: claims with provenance, verified as the code changes, carried alongside the source in version control.

Orven implements the Model Context Protocol and nothing else. Any editor, assistant, or agent that speaks MCP can connect to it, and Orven neither knows nor depends on which client is calling. It runs entirely on local files: no daemons to install, no containers, no external services. Git integration is optional and detected at runtime.

## Demo

![Orven indexing a project, reporting its status, reclaiming context, and removing itself](https://github.com/naseridev/orven/raw/main/docs/demo.gif)

The recording shows the context engine: indexing with `init`, the `status` dashboard, reclaiming context with `reset`, and removing with `remove`. The theory commands are described below.

## Why it exists

An assistant working in a real repository has two bad options. It can read whole files, which fills the context window with code it does not need, or it can guess from filenames, which produces wrong answers. Orven's context engine applies the memory model an operating system uses for the same problem: the project is parsed once into an index of symbol signatures, bodies are loaded on demand, tracked while in use, and released when they are not. On Orven's own source, a full read of roughly 100,000 tokens becomes an index of under 10,000 while every symbol stays one call away. Run `npm run bench` to measure any project.

The deeper problem is that knowledge about code rots silently. Why a function exists, what invariant it protects, which assumption it relies on: this is derived over and over by every developer and every assistant, then lost when the session ends, and it goes stale the moment the code changes without anyone noticing. Orven's theory layer makes that knowledge a first-class artifact. A claim is recorded once, bound to the identity of the code it describes, re-verified when that code changes, and honest about its own staleness when read back.

## The context engine

The context window is modelled as three tiers.

| Tier | Contents | Stored in |
| --- | --- | --- |
| L1, active frames | Symbol bodies and traces currently in use | `.orven/frames.json` |
| L2, page table | Signature index of every class, function, and type | `.orven/page-table.json` |
| Swap, disk | Traces, diffs, logs, and written-back notes | `.orven/swap/` |

Parsing uses tree-sitter, so the index is derived from real syntax trees rather than regular expressions. Symbols are stored as byte ranges; bodies are re-read from source on request. Incremental re-indexing keeps the index fresh as files change, a background eviction loop releases least-recently-used frames, notes written by the assistant are flushed to swap before release, and a cross-process advisory lock serializes every read-modify-write.

## The theory layer

A **claim** is one recorded statement about one or more symbols. Claims have a kind (`intent`, `invariant`, `observation`, `inference`, `assumption`, `decision`, or `procedure`), a statement, subjects, provenance, and a validity condition that machines can check.

Claims move through a small lifecycle:

- **proposed**: recorded but not yet warranted.
- **active**: its validity condition holds. By default that condition is "the subject exists and its fingerprint is unchanged"; it can also be a passing test or a time-limited human attestation.
- **stale**: the code beneath it changed, a referenced test failed, or an attestation expired. Stale means "no longer known to be true", never "false".
- **refuted**: a person rejected it. Automated checks can only withdraw warrant; refutation is reserved for `human:` principals by design, so CI noise can never become a permanent false accusation.

Three mechanisms keep this honest:

- **Identity.** Every symbol carries a stable identity that survives renames, moves, and reverts, plus a content fingerprint that ignores comments and whitespace. Claims bind to the identity; validity binds to the fingerprint.
- **Evidence.** Claims can cite evidence records: CI runs, traces, commits, documents, benchmarks. Test results ride `ci-run` evidence, and ingesting new results re-verifies exactly the claims whose warrant mentions the affected tests.
- **Earned confidence.** A claim that has survived real code changes is trusted more than one that was never tested. Confidence is computed from evidence quality and survival count; it is never self-declared.

Theory state is bound to repository history with **anchors**: an anchor snapshots the derived status of every claim and ties it to the current commit. `orven theory diff` then reports what changed between any two states, with the trigger and reason behind each transition. `orven theory check` runs read-only integrity checks over the whole store and recommends remediation without ever modifying anything.

Everything lives under `.orven/theory/` as content-addressed records and append-only logs, and is meant to be committed. `init` configures git so the logs merge cleanly across branches; two machines recording theory independently converge under a plain `git merge`.

## Requirements

Node.js 22.13 or newer. No native toolchain is required; parsing uses WebAssembly grammars. Git is optional: commit anchoring degrades gracefully without it.

## Installation

Run without installing:

```
npx @naseridev/orven init
```

Or install globally (recommended for regular use):

```
npm install -g @naseridev/orven
```

This puts two commands on your `PATH`: `orven` (the command line) and `orven-mcp` (the MCP server, started by your MCP client rather than by hand). To build from source, clone the repository and run `npm install && npm run build`.

## Initialization

Run `init` inside the project you want indexed:

```
cd /path/to/your/project
orven init
```

`init` creates `.orven/` with its swap directory, prepares the theory root at `.orven/theory/`, parses the project into the page table, and registers the MCP server in `.mcp.json`. It also adjusts git configuration so recorded theory can be committed: the blanket `.orven/` ignore rule becomes `.orven/*` plus `!.orven/theory/`, and `.gitattributes` gains merge rules for the theory logs. Existing rules are preserved, the edits are idempotent, and if recorded theory would remain hidden by an ignore rule Orven cannot fix, `init` refuses and names the exact remediation. Re-running `init` at any time is safe.

## MCP integration

`init` writes a standard MCP server entry to `.mcp.json` at the project root. When installed globally the entry points straight at the server; when run through `npx` it writes a self-resolving entry (`npx -y --package=@naseridev/orven@2.1.0 orven-mcp`) that is safe to commit. `ORVEN_ROOT` determines which project the server serves.

The server exposes fifteen tools. Five drive the context engine:

| Tool | Purpose |
| --- | --- |
| `orven_get_page_table` | Return the project's signature index, without function bodies. |
| `orven_page_in` | Load one symbol's full body into active context. |
| `orven_inspect_swap` | Read a trace, diff, or saved note back from swap. |
| `orven_free_frame` | Release a frame and reclaim its tokens. |
| `orven_write_scratch` | Hold working notes in memory, written back to swap on eviction. |

Ten drive the theory layer, and every one of them speaks a stable, canonically serialized JSON envelope tagged `protocol/1`:

| Tool | Purpose |
| --- | --- |
| `theory_recall` | Ranked briefing of recorded claims, scoped and budgeted. |
| `theory_explain` | Why a symbol exists, from recorded intent and decisions. |
| `theory_propose` | Record a claim. Proposals are quarantined until verification. |
| `theory_verify` | Run truth-maintenance and report transitions. |
| `theory_attest` | Record an attestation. Refutation requires a `human:` principal. |
| `theory_evidence` | Store an evidence record; referencing claims re-verify. |
| `theory_evidence_list` | List stored evidence, newest first. |
| `theory_anchor` | Bind the current theory state to the HEAD commit. |
| `theory_diff` | Compare theory state between two anchors or the working tree. |
| `theory_check` | Read-only integrity checks with recommended actions. |

## Commands

```
orven init      Index the project, prepare the theory root, publish the MCP server
orven status    Show index, context use and efficiency
orven theory    Work with recorded claims (subcommands below)
orven reset     Release working context and compact swap
orven remove    Remove Orven from this project
```

All commands accept `-C, --root <dir>` to target a directory other than the working directory. `remove` preserves recorded theory unless `--purge-theory` is passed, because claims are the one thing Orven cannot re-derive. `purge` and `uninstall` remain as hidden aliases for `reset` and `remove`.

The theory subcommands:

```
orven theory recall              Ranked briefing of recorded claims
orven theory explain <selector>  Why a symbol exists
orven theory propose             Record a claim
orven theory verify              Run truth-maintenance
orven theory attest <claim>      Affirm or refute a claim as a person
orven theory evidence            Record evidence, or --list what exists
orven theory anchor              Bind theory state to the HEAD commit
orven theory diff [from] [to]    What changed between two states
orven theory check               Read-only integrity checks
orven theory render              Regenerate the THEORY.md projection
```

Every reading command accepts `--json` and prints the plain result object, suitable for scripts; the `protocol/1` envelope appears only on the MCP transport. Scripts can gate on exit codes: `check` exits non-zero when problems are found, and human output always names a recommended action.

## A theory workflow

```
# record a claim warranted by a test
orven theory propose --kind invariant \
  --subject "src/pay/refund.ts#applyRefund" \
  --statement "Refunds are idempotent: applying the same refund twice changes nothing." \
  --test "payments::refund-idempotence" --verify

# feed it results from your test run
orven theory evidence --kind ci-run --source "npm test" \
  --summary "suite green" --test "payments::refund-idempotence=pass"

# bind the state to this commit, then see what a change did
orven theory anchor
orven theory diff

# read it back later
orven theory recall --scope "src/pay/**"
orven theory explain applyRefund
```

When the function's body changes, the claim goes stale with the reason and the trigger recorded. When the test passes again, or the change is reverted, it returns to active with a higher earned confidence than before, because it survived.

## Configuration

Context-engine defaults are written to `.orven/config.json` on first `init` and can be edited directly; the theory layer needs no configuration. The main keys:

| Key | Default | Effect |
| --- | --- | --- |
| `l1TokenBudget` | `12000` | Target size of active context. |
| `highWaterRatio` | `0.85` | Fraction of budget that triggers eviction. |
| `lowWaterRatio` | `0.6` | Fraction of budget eviction reclaims down to. |
| `evictionGraceMs` | `30000` | Recently used frames are protected for this long. |
| `daemonEnabled` | `true` | Enables automatic eviction. |
| `reindexEnabled` | `true` | Enables incremental re-indexing. |
| `prefetchEnabled` | `true` | Enables next-symbol prediction. |
| `prefetchAdaptive` | `true` | Adjusts prediction depth to measured accuracy. |
| `maxFileBytes` | `1500000` | Files larger than this are skipped. |
| `ignoredDirectories` | build and vendor directories | Excluded from indexing. |

Environment variables:

| Variable | Effect |
| --- | --- |
| `ORVEN_ROOT` | Project directory the MCP server serves. |
| `ORVEN_AGENT_ID` | Principal recorded on writes; defaults to `human:<username>` on the CLI. |
| `NO_COLOR` | Disables colour output. |
| `ORVEN_ASCII` | Forces ASCII glyphs for terminals without Unicode. |
| `ORVEN_NO_FLAVOR` | Disables the optional flavour line in CLI output. |
| `ORVEN_FLAVOR_SEED` | Makes that line deterministic, for scripted or snapshot use. |

## Architecture

```
src/
  types.ts     Shared domain model
  config/      Paths, defaults, thresholds
  util/        Atomic JSON writes, file locking, token estimation
  ast/         tree-sitter parsing, symbol and reference extraction
  memory/      Page table, frames, swap, eviction, graph, write-back
  theory/      Records, lineage, claims, evidence, anchors, diff, integrity
  server/      MCP server, context tools, theory tools
  cli/         Command-line interface and rendering
```

Project state is confined to `.orven/`. Runtime state stays out of version control; recorded theory goes in:

```
.orven/
  config.json       Settings                  (ignored)
  page-table.json   Symbol index              (ignored)
  frames.json       Active frames             (ignored)
  swap/             Traces and notes          (ignored)
  theory/           Recorded theory           (committed)
    records/        Content-addressed claims, evidence, checkpoints
    log/            Append-only lineage, verification, anchor logs
    THEORY.md       Generated human-readable projection
```

Records are immutable and named by their content hash, so they can never conflict under merge; the logs carry `merge=union` attributes and converge across branches. `orven theory check` audits the whole structure and never writes.

## Practical notes

- Stale is information, not noise. Briefings show stale claims by default with their reasons, because a stale claim with a long survival history is often the most important thing in scope.
- A claim whose code changed but whose statement still holds can be re-recorded against the new fingerprint, or warranted by a test so compatible refactors do not stale it.
- Evidence for a test that no longer exists keeps its last outcome until newer evidence contradicts it.
- `theory recall --json` includes a generation timestamp; the human rendering is fully deterministic.

## Development

The source lives at [github.com/naseridev/orven](https://github.com/naseridev/orven). Bugs and feature requests belong in the [issue tracker](https://github.com/naseridev/orven/issues).

```
npm run build       Compile TypeScript
npm run typecheck   Type-check without emitting
npm test            Build, then run the full test suite
npm run bench       Report index size and token reduction for a project
```

The test suite covers the CLI end to end, the context engine through the MCP interface, and the theory layer: storage, identity across renames and reverts, the claim lifecycle, evidence, anchoring, diff, integrity checks, and concurrent access from multiple processes.

`web-tree-sitter` is pinned to 0.24.x. Later versions require grammar modules in a format the prebuilt grammars used here do not provide.

## License

GNU General Public License v3.0. See [LICENSE](LICENSE) for the full text.