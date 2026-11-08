<div align="center">

# Web-Vibe-Security

**Deterministic security guardrails for AI-generated web applications.**

Drop-in agent rules · modular security specifications · static analysis · dependency verification · adversarial audit loop

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Modules](https://img.shields.io/badge/modules-4-brightgreen.svg)](modules/)
[![Semgrep rules](https://img.shields.io/badge/semgrep%20rules-27-orange.svg)](skills/semgrep-rules.yml)

Built and maintained by **Hadi Hajibagheri** — [@HajibagheriLabs](https://github.com/HajibagheriLabs)

</div>

---

## The problem

"Vibe coding" — building software by prompting a language model in natural language instead of
writing the code yourself — collapses the cost of shipping a web application. It does not collapse
the cost of shipping a *secure* one.

The reason is structural, not incidental. Language models are trained to produce code that
**works**, optimizing for functional completion against a corpus of public code that is full of
historical, unauthenticated, insecure patterns. Security requirements are non-functional: input
sanitization, ownership checks, policy enforcement, boundary validation. Nothing in the prompt
"build me a dashboard" asks for them, so nothing in the output contains them.

The result is a specific, repeatable set of failures — and they are measured:

| Failure class | Rate | What it means |
|---|---:|---|
| Code containing at least one exploitable vulnerability | **40–62%** | Baseline across generated code |
| Applications failing a standard OWASP Top 10 audit | **45%** | Nearly half fail a routine audit |
| Client-side secret exposure | **73%** | Of all critical findings in automated audits |
| Broken access control / missing Row-Level Security | **25.6%** | Of audited vibe-coded applications |
| Cross-Site Scripting (CWE-79) | **86%** | Failure rate in generated samples |
| Log Injection (CWE-117) | **88%** | Highest failure rate measured |
| SQL Injection (CWE-89) | **~20%** | Of generated data-access routines |
| Hallucinated package names ("slopsquatting") | **19.7%** | Of recommended dependencies do not exist |

Three findings shape everything in this repository:

**The typical breach requires no exploit.** An attacker registers a normal account through your
public signup form, closes the browser, and issues direct HTTP requests against your
auto-generated database API. If Row-Level Security was never configured, the database returns
every row in the table. No payload. No CVE. Four requests against a control that was never
implemented on the server.

**Hallucinated package names are reproducible.** About **43%** of invented package names recur
across identical prompts. That turns a nuisance into an attack: adversaries collect the recurring
names, register them on npm and PyPI, and wait. The malicious `postinstall` script runs before you
read a single line of what you installed — harvesting `.env` files, SSH keys, and CI secrets from
the build host.

**Prompting is a real control.** Self-review at generation time cuts vulnerability rates by
**48–50%**, and language-specific security instructions outperform generic ones by about **37%**.
That is why this repository ships rules for the agent, not only documentation for the human.

## What this repository provides

Constraints an agent reads **before** it writes the vulnerability, plus deterministic tools that
catch what slips through.

| | | |
|---|---|---|
| 📄 **[`configs/`](configs/)** | Drop-in rules files, one per agent platform | Prevention at generation time |
| 📘 **[`modules/`](modules/)** | Four modular specifications: root cause, rules, detection, agent constraints | The reference material |
| 🔍 **[`skills/semgrep-rules.yml`](skills/semgrep-rules.yml)** | 27 AST rules across all four classes | Deterministic static detection |
| 🔁 **[`skills/audit-prompt.md`](skills/audit-prompt.md)** | The Ralph Loop — four-pass adversarial review | Finds what static analysis cannot |
| 📦 **[`scripts/verify-deps.mjs`](scripts/verify-deps.mjs)** | Live registry verification, zero dependencies | Stops slopsquatting before install |
| 🧪 **[`examples/`](examples/)** | Four side-by-side vulnerable → remediated walkthroughs | Shows the fix, not just the rule |
| ✅ **[`CHECKLIST.md`](CHECKLIST.md)** | Pre-deployment verification, copy-paste commands | The last gate before shipping |

---

## 30-second quickstart

Pick your agent, run one command. The rules load into every request from then on.

| Agent | Command | Where it lands |
|---|---|---|
| **Claude Code** | `curl -sL https://raw.githubusercontent.com/HajibagheriLabs/Web-Vibe-Security/main/configs/CLAUDE.md -o CLAUDE.md` | `CLAUDE.md` — read automatically at session start |
| **Cursor** | `curl -sL https://raw.githubusercontent.com/HajibagheriLabs/Web-Vibe-Security/main/configs/.cursorrules -o .cursorrules` | `.cursorrules` — applied to every request |
| **Windsurf** | `curl -sL https://raw.githubusercontent.com/HajibagheriLabs/Web-Vibe-Security/main/configs/.windsurfrules -o .windsurfrules` | `.windsurfrules` — loaded by Cascade |
| **GitHub Copilot** | `mkdir -p .github && curl -sL https://raw.githubusercontent.com/HajibagheriLabs/Web-Vibe-Security/main/configs/copilot-instructions.md -o .github/copilot-instructions.md` | `.github/copilot-instructions.md` |
| **Aider** | `curl -sL https://raw.githubusercontent.com/HajibagheriLabs/Web-Vibe-Security/main/configs/AGENT_RULES.md -o AGENT_RULES.md` then `aider --read AGENT_RULES.md` | Read-only context on every request |
| **Hermes / OpenHands / Cline** | `curl -sL https://raw.githubusercontent.com/HajibagheriLabs/Web-Vibe-Security/main/configs/AGENT_RULES.md -o AGENT_RULES.md` | Point the agent's rules setting at this file |
| **Any custom CLI / API** | `curl -sL https://raw.githubusercontent.com/HajibagheriLabs/Web-Vibe-Security/main/configs/AGENT_RULES.md -o AGENT_RULES.md` | Prepend the file to your system prompt |

<details>
<summary><b>Not sure what that command does? Read this.</b></summary>

`curl` downloads a file from the internet and saves it into the folder you are currently in. That
is all these commands do — they fetch one text file of security rules and drop it where your
coding assistant already looks for instructions.

**To run it:** open a terminal (Terminal on macOS/Linux, PowerShell or Git Bash on Windows),
navigate into your project folder with `cd path/to/your/project`, and paste the line for your tool.

**How to confirm it worked:** run `ls -a` (macOS/Linux) or `dir /a` (Windows) and look for the new
file. Then ask your assistant *"what security rules are you following?"* — it should describe
secrets, authorization, injection, and dependencies.

**Prefer not to use the terminal?** Open the file on GitHub, click **Raw**, copy everything, and
paste it into a new file with the right name in your project root. The result is identical.

**Windows note:** all commands in this repository are written for a POSIX shell. Use Git Bash or
WSL, or run [`scripts/install.ps1`](scripts/install.ps1) from PowerShell instead.

</details>

### Install everything at once

```bash
git clone https://github.com/HajibagheriLabs/Web-Vibe-Security.git
cd Web-Vibe-Security
./scripts/install.sh /path/to/your/project          # macOS / Linux / Git Bash
```

```powershell
.\scripts\install.ps1 -Target C:\path\to\your\project   # Windows PowerShell
```

The installer copies the rules file for every agent it detects, adds `.gitignore` entries for
`.env*`, writes a hardened `.npmrc`, and installs the CI workflow. It never overwrites an existing
file without asking.

---

## Scan an existing project

### 1 · Static analysis — 27 AST rules

[Semgrep](https://semgrep.dev) parses your code into a syntax tree and matches structural patterns,
so it catches the vulnerability regardless of variable names or formatting.

The ruleset is tested against Semgrep **1.179.0**. Every rule has positive and negative fixtures in
[`tests/semgrep/`](tests/semgrep/), and CI fails if any rule stops loading or stops matching.

```bash
pip install semgrep
```

```bash
semgrep --config https://raw.githubusercontent.com/HajibagheriLabs/Web-Vibe-Security/main/skills/semgrep-rules.yml .
```

Run it from a local clone, and block the build on anything critical:

```bash
semgrep --config skills/semgrep-rules.yml --error --severity ERROR .
```

Only report what a change introduced, ignoring pre-existing findings:

```bash
semgrep --config skills/semgrep-rules.yml --baseline-commit $(git merge-base HEAD main) .
```

### 2 · Dependency verification — before you install

Roughly one in five model-suggested packages does not exist. Verify against the live registry
**before** running the install command, because the install command is what executes the payload.

```bash
node scripts/verify-deps.mjs
```

Check specific names an agent just proposed, without installing them:

```bash
node scripts/verify-deps.mjs @supabase/ssr some-package-the-agent-suggested
```

Gate CI on it — non-zero exit for anything nonexistent, unpinned, or unverifiable:

```bash
node scripts/verify-deps.mjs --strict
```

### 3 · The Ralph Loop — adversarial audit

Static analysis finds known patterns. It cannot tell you that an endpoint has no authorization at
all. That takes an adversarial reading, so a **second** agent audits the first agent's output
across four structured passes — Secrets, Authorization/RLS, Injection Sinks, Dependencies — and
drives repair until every pass is clean.

Full prompt and loop protocol: **[`skills/audit-prompt.md`](skills/audit-prompt.md)**

```bash
# 1. Deterministic tools first — faster, and they never hallucinate.
semgrep --config skills/semgrep-rules.yml .
node scripts/verify-deps.mjs --strict

# 2. Then the adversarial pass, in a FRESH session with no build context.
cat skills/audit-prompt.md
```

Paste the prompt into a new session with your repository in context. Give the auditor no
visibility into the build conversation — an auditor that remembers why the code was written that
way will rationalize the same blind spots.

**Loop exit conditions:** PASS when all four passes return zero CRITICAL and zero HIGH.
HALT and escalate to a human when a finding survives three repair attempts, or when a repair
introduces a new CRITICAL.

### 4 · Verify the build, not just the source

The authoritative secret test. A credential that survives the build is exposed no matter where it
was written:

```bash
npm run build && grep -rEn "sk_live_|sk_test_|service_role|AKIA[0-9A-Z]{16}|-----BEGIN" .next/static dist build 2>/dev/null
```

Any hit is a P0. **Rotate the key before fixing the code** — removing a secret from source does
not un-publish it.

---

## The four modules

Each module targets one measured failure class: root cause, non-negotiable rules, detection
commands, agent constraints, and a worked example.

### [01 — Secret Boundaries](modules/01-secret-boundaries.md) · 73%

Zero secrets in client bundles or public environment prefixes (`NEXT_PUBLIC_`, `VITE_`,
`REACT_APP_`). Mandatory server-side proxies for every third-party operation, each one
authenticating, authorizing, validating, and rate-limiting before it touches a credential.
Pre-emptive `.gitignore`. Least-privilege credential scoping with documented rotation.

### [02 — Zero-Trust Authorization](modules/02-zero-trust-auth.md) · 25.6%

Elimination of UI-only authorization. Every query bound to a cryptographically verified session
identity (`session.user.id` / `auth.uid()`) so IDOR has no surface. Default-deny Row-Level Security
on every table, with per-operation policies and no `USING (true)`. Server-side role matrices that
users cannot write to.

### [03 — Injection Defense](modules/03-injection-defense.md) · 86% XSS · 88% logs · ~20% SQLi

Parameterized queries exclusively; identifiers resolved through allowlists. No unencoded DOM
insertion — `innerHTML`, `dangerouslySetInnerHTML`, `v-html` are banned outright, with DOMPurify
for genuine rich text. Nonce-based CSP with no `unsafe-inline`. CRLF stripping and structured JSON
logging for every user-controlled value.

### [04 — Supply Chain Integrity](modules/04-supply-chain.md) · 19.7%

Registry pre-verification against the npm and PyPI APIs before any install. Standard library over
micro-packages. Exact version pinning with no range wildcards. Committed lockfiles with integrity
hashes. `ignore-scripts=true` by default. Namespace scoping against dependency confusion.

---

## Worked examples

| Example | Module | What it shows |
|---|---|---|
| [Next.js secret leak](examples/nextjs-leak-remediation.md) | 01 | Service-role key in a client bundle → server proxy with the full authenticate/validate/rate-limit chain |
| [Supabase RLS bypass](examples/supabase-rls-bypass-remediation.md) | 02 | Open tables and an IDOR endpoint → default-deny RLS, session-bound queries, negative-path tests |
| [Injection sinks](examples/injection-sink-remediation.md) | 03 | Concatenated SQL, `dangerouslySetInnerHTML`, forged log lines → bound parameters, DOMPurify, structured logs |
| [Hallucinated dependency](examples/slopsquat-dependency-remediation.md) | 04 | A nonexistent package with a credential-stealing `postinstall` → verification, exact pins, `ignore-scripts` |

---

## Continuous enforcement

Prevention at generation time is the first layer. These are the layers that catch what it misses.

**Pre-commit** — [`.pre-commit-config.yaml`](.pre-commit-config.yaml) runs gitleaks and the
Semgrep ruleset before a commit is created, so a secret never reaches history in the first place:

```bash
pip install pre-commit && pre-commit install
```

**Continuous integration** — [`.github/workflows/security-audit.yml`](.github/workflows/security-audit.yml)
runs the full ruleset, dependency verification, a bundle secret scan, and `npm audit` on every
push and pull request.

**Before deploying** — work through [`CHECKLIST.md`](CHECKLIST.md). Every item is a copy-paste
command with a stated pass condition.

---

## Design principles

**Deterministic over advisory.** A rule an agent can interpret loosely will be interpreted
loosely. Every rule names a specific banned construct and the specific safe replacement.

**Prevention before detection.** The cheapest vulnerability is the one never generated. Rules
files come first because they change the output; scanners exist for what still gets through.

**Security boundaries live outside generated code.** Never rely on AI-synthesized application
logic to enforce access control. Row-Level Security, API gateways, key vaults, and container
sandboxes hold the line regardless of what the application layer does.

**Verification is executable.** Every module ends in commands you can run, with a stated pass
condition — not advice you have to interpret.

**Assume the client is hostile.** Every threat model in this repository starts from an attacker
who holds a valid session token and never loads your JavaScript.

---

## Contributing

Issues and pull requests are welcome — particularly:

- New Semgrep rules for failure patterns you have observed in generated code
- Framework coverage beyond Next.js/React (SvelteKit, Nuxt, Remix, Django, Rails, Laravel)
- Rules files for agent platforms not yet covered
- Corrections to any statistic, with a citation

**Every Semgrep rule needs fixtures.** Add at least one `ruleid:` (must match) and one `ok:` (must
not match) case to [`tests/semgrep/`](tests/semgrep/), then run:

```bash
python tests/run_semgrep_tests.py
```

A rule that loads but never matches is as broken as one that fails to load — the test checks both.

Security issues in this repository itself: see [`SECURITY.md`](SECURITY.md).

## Scope

This repository covers **web applications**. Desktop (Electron process isolation, IPC bridge
exposure) and mobile (insecure local storage, binary credential extraction, deep-link tampering)
have their own distinct failure modes and are addressed separately.

## License

[MIT](LICENSE) © Hadi Hajibagheri

---

<div align="center">
<sub>

The statistics in this document come from published empirical security research on AI-generated
code. They are a snapshot of a fast-moving field — verify against current sources before citing
them elsewhere.

</sub>
</div>