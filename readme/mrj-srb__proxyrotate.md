# ProxyRotate — Rotating Proxy Pool for Any Command

[![CI](https://github.com/Mrj-Srb/ProxyRotate/actions/workflows/ci.yml/badge.svg)](https://github.com/Mrj-Srb/ProxyRotate/actions)
[![Python 3.11+](https://img.shields.io/badge/python-3.11%2B-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](pyproject.toml)

**Run any CLI tool through a rotating pool of HTTP, HTTPS and SOCKS5 proxies — powered by [sing-box](https://github.com/sagernet/sing-box).**

ProxyRotate starts a local [sing-box](https://github.com/sagernet/sing-box) instance with one outbound per proxy, injects `HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY` into your command, and rotates the exit proxy on a timer, after N connections, or after N megabytes — whichever hits first. Dead proxies are health-checked, skipped and exponentially cooled down. Your app owns the terminal; ProxyRotate stays silent.


> **Keywords:** proxy rotator, rotating proxies, proxy pool, IP rotation, HTTP proxy, SOCKS5 proxy, sing-box, proxy manager, web scraping, API rate limit

---

## Why ProxyRotate?

| Feature | ProxyRotate | Manual `export HTTP_PROXY` | Browser extensions |
|---|---|---|---|
| **Automatic rotation** | timer / connections / traffic (combined) | manual | timer only |
| **Health checks** | parallel pre-check + live verification | none | none |
| **Cooldown** | exponential 30s → 60s → 120s … capped at 10m | none | none |
| **SOCKS5** | native, no deps | curl only | limited |
| **Terminal ownership** | app owns stdout/stderr | — | — |
| **Zero deps** | Python stdlib only | — | — |

---

## Use Cases

### 1. AI Coding Agents (opencode, Claude Code, Aider)

Run AI coding agents through a managed proxy pool without modifying the agent itself.

This is especially useful when you're already using proxies with OpenCode and want automatic rotation, health checking, and failover instead of manually changing proxy settings.

```bash
proxyrotate --every 30 opencode
proxyrotate --every 60 --requests 20 --... opencode
```

ProxyRotate handles the proxy layer while OpenCode keeps full control of the terminal and its own configuration.

### 2. Web Scraping & Crawling
Distribute requests across 50-100 proxies. Combine time + traffic rotation for heavy pages.

```bash
proxyrotate --every 45 --mb 100 --health-timeout 3 scrapy crawl myspider
proxyrotate --every 0 --requests 10 python scraper.py
```

### 3. API Testing & Traffic Distribution

Test APIs from different network endpoints and distribute traffic across a proxy pool.

```bash
proxyrotate --every 10 curl https://api.example.com/v1/users
proxyrotate --requests 5 --mb 20 k6 run loadtest.js
```

```bash
proxyrotate --every 10 curl https://api.example.com/v1/users
proxyrotate --requests 5 --mb 20 k6 run loadtest.js
```

### 4. Privacy & Research
Route research scripts, `curl`, `wget`, or `git` through a managed rotating proxy pool.

```bash
proxyrotate --every 120 curl -s https://ifconfig.me
proxyrotate --mb 50 python research.py
```

### 5. CI / Load Testing
Inject proxy rotation into any command without code changes — just prefix it.

```bash
proxyrotate --every 0 --mb 50 -- pytest tests/
proxyrotate --check-proxies  # dry-run: test list and exit
```

---

## Install

**Requirements:** Python 3.11+ and a [`sing-box`](https://github.com/sagernet/sing-box/) binary.

**Option A — uv (recommended):**
```bash
uv tool install proxyrotate          # from PyPI (once published)
uv tool install .                    # from source
```

**Option B — pipx:**
```bash
pipx install proxyrotate
pipx install .                       # from source
```

**Option C — venv fallback** (handled by `install.sh`):
```bash
./install.sh
# uninstall later:
./uninstall.sh
```

**sing-box:** Must be on `$PATH`, or point explicitly:

```bash
proxyrotate --sing-box ~/sing-box/sing-box opencode
# also via config file: sing_box = "~/sing-box/sing-box"
```

Verify:
```bash
proxyrotate --version
proxyrotate --help
```

---

## Quick Start

1. Create proxy list:
```bash
mkdir -p ~/.config/proxyrotate
cat > ~/.config/proxyrotate/proxies.txt <<'EOF'
# Europe
http://1.2.3.4:8080
http://user:pass@9.9.9.9:3128

# US
socks5://5.6.7.8:1080
https://proxy.example.com:8443
EOF
```

2. Test proxies:
```bash
proxyrotate --check-proxies
# → Loaded 4 proxies / Healthy proxies: 3/4
```

3. Run anything:
```bash
proxyrotate --every 30 opencode
proxyrotate --every 60 --requests 20 --mb 50 -- curl https://api.ipify.org
```

---

## Usage

```
proxyrotate [OPTIONS] COMMAND [ARGS...]
```

| Option | Description |
|---|---|
| `--proxy-file PATH` | Proxy list file (default: `~/.config/proxyrotate/proxies.txt`) |
| `--sing-box PATH` | Path to sing-box executable |
| `--every SECONDS` | Rotate every N seconds (`0` disables timer, default: `60`) |
| `--requests N` | Rotate after N new proxied connections |
| `--mb MB` | Rotate after MB megabytes of proxied traffic |
| `--health-check` / `--no-health-check` | Test proxies before starting (default: on) |
| `--check-proxies` | With no COMMAND: test proxies and exit |
| `--health-timeout SECONDS` | Per-proxy check timeout (default: `5`) |
| `--cooldown SECONDS` | Base failure cooldown; doubles per repeat failure up to `cooldown_max` (default: `30`) |
| `--log-level LEVEL` | File log level: `debug` `info` `warning` `error` (default: `info`) |
| `--process-name NAME` | Route the launched command and every process it creates through the proxy at the **OS level** (Linux only; needs sudo for nftables). NAME must match the program name → see below |
| `--process-name-mode MODE` | How NAME matches: `exact` basename (default) or `substring` |
| `--process-dns HOST[:PORT]` | Plain-DNS resolver reached *through the proxy* for transparent name resolution (default: `1.1.1.1`) |
| `--config PATH` | Alternative config file |
| `--version` | Show version |

> All options can also be set via `~/.config/proxyrotate/config.toml` — CLI overrides file, which overrides defaults.

Forwarding args with `--` :

```bash
proxyrotate --every 30 -- opencode --continue
proxyrotate --every 30 -- npm run dev -- --port 3000
```

### Rotation Modes

Modes combine with **OR** — whichever threshold fires first triggers rotation:

```bash
proxyrotate --every 60 --requests 20 opencode   # 60s OR 20 connections
proxyrotate --every 0 --mb 50 opencode          # only after 50 MB
proxyrotate --every 30 --requests 10 --mb 100 curl https://example.com
```

* `--requests` counts **new sing-box tunnels** (connections), not HTTP requests inside TLS. Long-lived keep-alive tunnels count once; very short tunnels may be missed between polls. Traffic to `www.gstatic.com` (health-check) is excluded. For exact usage-based rotation, prefer `--mb`.
* `--mb` is exact (Δ of `downloadTotal + uploadTotal`).

### Failed Proxies & Cooldown

```
30s → 60s → 120s → 240s → 480s → 600s (cap)  # cooldown_max
```

Each verified failure doubles cooldown; one successful round-trip resets it. If every proxy is cooling, ProxyRotate waits instead of reusing a known-bad proxy.

### Proxy List Format

One per line; `#` comments and blank lines ignored; duplicates dropped; invalid lines warned (not fatal):

```
# Europe - datacenter
http://1.2.3.4:8080

# US - residential with auth
socks5://5.6.7.8:1080
http://user:pass@9.9.9.9:3128

# HTTPS
https://proxy.example.com:8443
```

Supported schemes: `http`, `https`, `socks5`. Formats with `user:pass@host:port` are fully supported and never logged in plaintext.

### Example Session

```text
$ proxyrotate --every 30 opencode
ProxyRotate 0.2.0
Loaded 100 proxies
Checking 100 proxies...
  checked 50/100
  checked 100/100
Healthy proxies: 63
Starting opencode
(opencode owns the terminal)
^C
Interrupted
ProxyRotate stopped

# details → ~/.cache/proxyrotate/proxyrotate.log
# passwords redacted as ***
```

---

## Configuration File

Optional: `~/.config/proxyrotate/config.toml`

```toml
proxy_file = "~/.config/proxyrotate/proxies.txt"
sing_box = "~/sing-box/sing-box"

rotation_interval = 30        # seconds between rotations (0 = off)
rotation_requests = 20        # rotate after N connections (omit to disable)
rotation_mb = 50              # rotate after N MB (omit to disable)
failure_cooldown = 30         # base seconds a failed proxy is skipped
cooldown_max = 600            # cap for exponential cooldown

health_check = true
health_timeout = 5

log_level = "info"
```

Priority: **CLI > config.toml > defaults**.

---

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Runtime / general failure |
| `2` | Invalid CLI usage or configuration |
| `3` | No usable proxies (after health check / verification) |
| `4` | sing-box failure |
| `127` | Target command not found |
| `130` | Interrupted (Ctrl+C) |

Otherwise the target's exit code is preserved (`signal` death → `128 + signal`).

---

## How It Works

1. **Config + health check** — loads proxies, tests each via `http://www.gstatic.com/generate_204` (SOCKS5 uses stdlib-only handshake).
2. **sing-box** — generates JSON config with `mixed` inbound (`127.0.0.1` random port) + one outbound per proxy + `selector` + `direct`, validates with `sing-box check`, starts `sing-box run`, waits for Clash API `/version` on `127.0.0.1` with random `Bearer` secret.
3. **Proxy env** — sets `HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY`/`NO_PROXY` for child process only.
4. **Rotation loop** — polls `GET /connections` for `new_connections` / `new_bytes`, evaluates `TimeRotationStrategy` / `ConnectionsRotationStrategy` / `BytesRotationStrategy` (combined via `CombinedStrategy`), switches via `PUT /proxies/proxy-rotate` and verifies with a request through `127.0.0.1:inbound_port`.
5. **Cleanup** — on exit restores signals, terminates sing-box (TERM → KILL), removes `0600` temp config.

With `--process-name` there is a 6th, **OS-level** mechanism that routes real network traffic — see the next section.

No third-party dependencies; SOCKS5 handshake is pure stdlib.

---

## Process Routing (Linux, optional)

Proxy env variables only *encourage* well-behaved clients to use the proxy. `--process-name` goes further: it routes the **launched command and every process it ever creates** through the rotating proxy at the OS level.

```bash
sudo -v   # warm up the sudo cache once; nft rule install/removal needs it
proxyrotate --proxy-file proxies.txt --process-name opencode -- opencode
```

### How it works

1. **cgroup v2** — a unique directory `proxyrotate-<session-id>` is created inside *your own* delegated user cgroup. The command is moved into it between `fork()` and `exec()` (self-migration, no privileges), so the group is closed under child creation — no `/proc` scans, no name races. Everything spawned later is a member from birth.
2. **nftables** — two base chains scoped to that cgroup only (`socket cgroupv2` matching) inside table `inet proxyrotate`:
   - `PR-<rid>-nat` (output/dstnat): TCP from the group → `redirect` into a sing-box `redirect` inbound; UDP destination-port 53 → `redirect` into a local DNS relay.
   - `PR-<rid>-fil` (output): allow-list, then **`counter drop`** — fail-closed.
3. **DNS relay** — redirected UDP 53 queries are re-sent as DNS-over-TCP *through the sing-box SOCKS inbound*, i.e. resolution leaves via the currently selected rotating proxy. This closes the DNS leak for every client, including glibc resolvers talking to `127.0.0.53`. The upstream resolver (default `1.1.1.1`) is chosen with `--process-dns HOST[:PORT]`.
4. **Matching guard** — `--process-name` must match the basename of `COMMAND` (or a substring with `--process-name-mode substring`). A mismatch aborts with exit code 2 *before anything is set up*. Attaching to already-running processes is intentionally unsupported.

### Privileges

* ProxyRotate itself runs **as your user, never root**.
* Only `sudo nft` is ever elevated — a few narrow, all-or-nothing batch transactions sent via stdin (table/chains + this session's rules at start; the same chains at exit). Nothing is installed persistently; `sudo` is needed at start and at exit of each run.
* cgroup creation is unprivileged (systemd user-session delegation). If your desktop is not systemd-with-cgroup-v2... it can't create the group and fails with a clear error.

### What is routed / what is blocked

From the routed group only:

| Traffic | Behavior |
|---|---|
| TCP (IPv4 + IPv6) | Proxied through sing-box (redirect inbound) |
| DNS (UDP 53, any destination incl. `127.0.0.53`) | Captured → relayed via proxy (`--process-dns`) |
| Loopback TCP/UDP (`127.0.0.0/8`, `::1`, except port 53) | Allowed normally |
| Multicast (224/4), IPv6 link-local/multicast, ICMPv6 ND + packet-too-big | Allowed (local machinery) |
| **Everything else**: non-DNS UDP (incl. QUIC/HTTP3, NTP, DHCP), ICMP ping, raw sockets | **Dropped** (fail-closed) — no direct fallback |

So: TCP and DNS always leave via the proxy; anything the proxy path cannot carry is dropped rather than leaking. Clients fall back from HTTP/3 to TCP automatically (they must — the UDP is blackholed).

The host outside the group, and sing-box itself, are never touched: the nft table is only created if missing, existing rulesets are never flushed or replaced, and per-session chains named `PR-<rid>-…` are removed only while that session's cgroup is empty (an unstoppable process keeps its fail-closed rules until it dies). A next run sweeps chains of abandoned sessions.

### Cleanup

On normal exit, SIGINT, SIGTERM, or any startup failure (routing error, sing-box error, command-not-found): relay stopped → stragglers in the group killed (TERM→KILL) → this session's chains removed → cgroup directory removed. Artifacts are named uniquely per run; nothing global persists. One caveat: if a killed process somehow lingers in its cgroup, its rules are deliberately kept (fail-closed) and the directory stays until cleaned by a later run's sweep.

### Manual verification (needs sudo, run once)

Firewall interception cannot be tested from pytest without elevated privileges. Run the target app under the router and verify the four properties with these one-off commands in another terminal:

```bash
# 1. session rules exist and are scoped (expect 2 chains + rules)
sudo nft -j list table inet proxyrotate | grep -e PR- -e cgroupv2

# 2. TCP really goes through sing-box while routed
ss -tnp | grep sing-box        # expect many ESTAB connections owned by sing-box

# 3. no DNS leak: queries reach the relay, not the host resolver
sudo tcpdump -nn -i lo 'udp port 53'           # client→relay flow on 127.0.0.1
sudo ss -tnp | grep 53                          # DNS-over-TCP leaving via sing-box

# 4. fail-closed: Ctrl-Z the sing-box process; the routed app must lose
#    network (curl hangs/dies) but keep localhost. Then SIGCONT it.
```

Routed-traffic end-to-end check: `curl -m 5 https://api.ipify.org` inside the routed app vs the same from an unrouted shell — the addresses (and ASN) must differ per rotation when `--every` is short.

---

## Development

```bash
uv sync                     # install runtime + dev dependencies
uv run python -m pytest -q  # 198 tests — offline fake sing-box, fake nft recorder
uv run proxyrotate --help
uv build                    # wheel + sdist → dist/
```

Project layout:

```
src/proxyrotate/
├── cli.py        # arg parsing, composition root, exit codes
├── config.py     # defaults + TOML loading + CLI overrides
├── logging.py    # file logging (~/.cache/proxyrotate/proxyrotate.log)
├── models.py     # Proxy data model (parse/redact)
├── proxies.py    # proxy list loader (comments, dedup, validation)
├── health.py     # health checking (bounded pool, SOCKS5 handshake)
├── rotation.py   # pool state, cooldown, strategies, rotation loop
├── singbox.py    # sing-box discovery/config/API/lifecycle
├── routing.py    # process routing: cgroup v2 + nftables + cleanup (Linux)
├── dnsrelay.py   # DNS relay: UDP→DNS-over-TCP via the proxied inbound
└── process.py    # child process, signal handling, exit codes
```

CI: `.github/workflows/ci.yml` tests Python `3.11`–`3.14` on Ubuntu.

---

## Security

* sing-box config (contains passwords) is written to a `0600` temporary file and unlinked on exit (`singbox.py:191`).
* Passwords redacted as `***` in all console and file logs (`models.py:69`).
* Clash API + inbound bind to `127.0.0.1` only; per-run random `Bearer` secret.
* No proxy credentials ever appear in `ps` or `sing-box` stdout.
* Process routing elevation is restricted to `sudo nft` batches over stdin; sessions use unique random names and remove only their own chains/cgroup. The host ruleset is never flushed.

---

## Future Work

Latency ranking, country filtering, multiple proxy sources/lists, automatic list refresh, retry policies, per-domain routing, systemd integration. The `RotationStrategy` protocol in `rotation.py` is the extension point.

---

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Meraj Sarab (Mrj-Srb).

## Keywords

`proxy rotator` `rotating proxies` `proxy pool` `sing-box` `http proxy` `https proxy` `socks5` `proxy manager` `IP rotation` `web scraping` `python proxy` `proxyrotate` `traffic distribution` `AI coding agents` `opencode`