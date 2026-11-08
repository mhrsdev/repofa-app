# Iran Dev Environment — Agent Skill (v0.1.1)

A portable Agent Skill that helps coding agents diagnose Iranian-network failures and keep developer workflows moving with verified mirrors, reversible changes, safe connectivity troubleshooting, and offline fallbacks.

## What's included

- `SKILL.md` — core agent behavior and routing rules.
- `references/diagnostic-playbook.md` — DNS/TCP/TLS/HTTP/API/package failure triage.
- `references/mirror-catalog.yaml` — candidate mirrors and their ecosystem coverage. Entries are **not assumed operational**; test them from the actual ISP/network before use.
- `references/anti-censorship-tools.md` — tool categories, verification process, and a seed inventory based on public/community references and the initial user-provided list.
- `references/tool-inventory.yaml` — machine-readable inventory of the 53 submitted tool/version entries, clearly marked as unverified.
- `references/service-access.md` — provider/API availability and error classification.
- `references/service-catalog.yaml` — candidate hostnames and official docs/status links for major developer registries and AI APIs; not a live availability guarantee.
- `references/offline-first.md` — caches, package bundles, Git bundles, and offline builds.
- `references/security-and-trust.md` — supply-chain, privacy, tunnel, and third-party bot safeguards.
- `references/source-policy.md` — source ranking, freshness/expiry, and community-report handling.
- `scripts/quick-diagnose.sh` — opt-in, bounded HTTPS reachability snapshot; a specific profile/URL is required.
- `scripts/validate-project.sh` — offline structural checks for maintainers; it does not make network requests.
- `scripts/check-governance-update.sh` — CI guard that requires `governance/WORK_LOG.md` in non-empty changes.
- `templates/diagnostic-report.md` — report structure for a failed or repaired connection.
- `AGENTS.md` and `governance/` — project charter, architecture, task board, contribution rules, decisions, changelog, work log, and token/network efficiency limits.

فارسی: [راهنمای فارسی](README.fa.md)

## Quick start

1. Place the `iran-dev-environment` directory in the skills location supported by your agent.
2. Keep the folder name identical to the `name` in `SKILL.md`.
3. Ask the agent to diagnose a concrete failure, e.g. “`pip install` times out on my TCI ADSL connection; find the cause before changing config.”
4. The agent should read only the relevant reference and keep normal diagnostics to at most three distinct external target probes.
5. Run diagnostics only with the user's consent and within the agent's allowed tool permissions. The script requires an explicit profile or URL; `--profile all` is a broad test, not a default.

The Agent Skills standard uses `SKILL.md` frontmatter and supports companion `references/` and `scripts/` files. See https://agentskills.io/specification.

## Maintainer validation

Run `bash scripts/validate-project.sh` before submitting changes. The check is offline by design; passing it does not verify live mirror or VPN availability.

## Important status note

Version 0.1 is a working starter, not a validated live status feed. Mirror URLs, tool releases, DNS behavior, app availability, and tunnel methods can change by ISP and time. The catalogue stores candidate information, not guarantees. Add current probe results only with a timestamp and scope.

## Project governance and efficiency

Read `AGENTS.md` before extending the project. `governance/PROJECT_CHARTER.fa.md` states the mission and non-goals; `governance/TASKS.md` tracks priorities; `governance/TOKEN_EFFICIENCY.md` prevents unnecessary reference loading, web searches and repeated network probes. Every development task must be recorded in `governance/WORK_LOG.md`.

## Roadmap

- **v0.1:** portable skill, core triage, seed mirror catalogue, community tool inventory, offline-first playbook, safe read-only probe.
- **v0.2:** automated mirror checks per ecosystem; structured test results (`last_checked`, network scope, latency, TLS, status, confidence, expiry); tests in CI from multiple regions.
- **v0.3:** OS-specific playbooks for Linux, Windows/WSL, macOS, Android/Termux; package-manager fix snippets with automatic backup and rollback.
- **v0.4:** optional local CLI/MCP interface exposing diagnostics and curated, timestamped data to agents. Keep core knowledge usable without a server.
- **v1.0:** contribution workflow, maintainer/reviewer policy, abuse-resistant reports, reproducible checks, release signing, and periodic audits.

## Design principle

This project is the agent's **decision and knowledge layer**, not a clone of every network utility. Integrate or reference existing open-source projects where appropriate instead of rewriting them.