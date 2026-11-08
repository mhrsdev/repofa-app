<div align="center">

<img src="assets/banner.png" alt="Steam Download Region Bench — Find the fastest route, not the closest region" width="100%">

# Steam Download Region Bench

**Find the Steam Download Region with the best real network path from your ISP — Windows & Linux.**

[![Python](https://img.shields.io/badge/python-3.10%2B-blue)](https://www.python.org/downloads/)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux-lightgrey)](#quick-start)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![CI](https://img.shields.io/badge/CI-Windows%20%2B%20Linux%20builds-blueviolet)](.github/workflows/build.yml)

[English](README.md) · [فارسی](README_FA.md)

</div>

---

## What is this?

A single-file, zero-dependency Python CLI that answers one question:

> **Which Steam Download Region currently has the best network path from my connection?**

For every region (CellID) it asks Valve for the **live content-server pool**, measures the real route from your machine, and ranks the regions in a clean table. It does **not** rank countries by map distance and does **not** test Steam Datagram Relay.

## How it works

```text
CellID → Valve GetServersForSteamPipe API → live content servers
       → IPv4 resolution → ICMP ping + TCP/TLS handshake timing
       → per-region aggregation → transparent ranking
```

Internet routing does not follow the map. An ISP in Iran can have a much better route to an Asian CDN than to a geographically closer one in Europe, so this tool measures the actual path instead of guessing from city names.

## Quick start

You need [Python 3.10+](https://www.python.org/downloads/). No third-party packages.

### Windows

```bat
py steam_region_bench.py
```

or double-click `run_windows.bat`.

### Linux

```bash
./run_linux.sh
```

or:

```bash
python3 steam_region_bench.py
```

### Handy examples

| Goal | Command |
|---|---|
| World-wide benchmark | `steam_region_bench.py --profile world` |
| Test specific cells | `steam_region_bench.py --cells 124,127,48` |
| More accurate run | `steam_region_bench.py --servers-per-region 40 --pings 8` |
| Save a CSV report | `steam_region_bench.py --csv report.csv` |
| Traceroute the top 3 | `steam_region_bench.py --trace-top 3` |

## Command-line options

| Option | Default | Description |
|---|---|---|
| `--profile nearby\|world` | `nearby` | Region set: Middle East / Europe / Asia or the whole world |
| `--cells` | — | Comma-separated CellIDs or ranges, e.g. `124,127,30-40` |
| `--servers-per-region` | `24` | Content servers sampled per region (1–100) |
| `--pings` | `5` | ICMP probes per server (2–10) |
| `--timeout` | `1500` | Ping/TCP timeout in milliseconds (300–5000) |
| `--csv` | — | Write the report to a CSV file |
| `--trace-top` | `0` | Traceroute the best N regions |
| `--no-color` | off | Disable colored output |
| `--version` | — | Print the version |

## Reading the results

```text
┌───┬──────────────────────┬──────┬────────┬─────────┬─────────┬────────┐
│ # │ Download Region      │ Cell │ OK/CDN │ Ping P50│ TCP P50 │ Fit    │
├───┼──────────────────────┼──────┼────────┼─────────┼─────────┼────────┤
│ 1 │ Germany - Frankfurt  │    5 │   18/24│    24.3 │    31.2 │   68.4 │
│ 2 │ China - Chengdu      │   48 │   21/24│    82.0 │   143.3 │  210.9 │
└───┴──────────────────────┴──────┴────────┴─────────┴─────────┴────────┘
```

- **OK/CDN** — reachable vs. sampled content servers.
- **Ping P50** — median ICMP round-trip.
- **TCP P50 / TCP P95** — median and tail TCP/TLS handshake latency. Certificates are not verified; the handshake is used for timing only.
- **Jitter / Loss** — stability of the ICMP probes.
- **Fit** — the ranking metric:

```text
Fit = TCP P50 + 0.35 × TCP P95 + 0.75 × Jitter + 4 × Loss%
```

Lower is better. Fit is a transparent network metric, **not** Steam's internal score, and low latency is **not** a download-speed guarantee — Steam may split a download across several servers. Run the benchmark a few times at different hours, then try the top regions in Steam itself.

## Standalone binaries

GitHub Actions builds a Windows `.exe` and a Linux binary for every `v*` tag and attaches them to the release — no Python needed on the target machine.

To build locally instead:

```bash
pip install pyinstaller
pyinstaller --onefile --name SteamRegionBench steam_region_bench.py
```

## Development

```bash
python -m pytest tests -q
```

## Notes on CellID labels

Region names are a conservative reference layer based on a public Steam CellMap snapshot. **Live server data is always fetched from Valve at runtime** — nothing CDN-related is hard-coded. A label never proves that a CDN edge physically sits in that city; the CellID and the measured path are what matter.

## Attribution

Uses the public Valve Web API endpoint `IContentServerDirectoryService/GetServersForSteamPipe`.

Related projects: [ValvePython/steam](https://github.com/ValvePython/steam) · [SteamTracking](https://github.com/SteamDatabase/SteamTracking) · [peg4/steam_ping](https://github.com/peg4/steam_ping)

## License

[MIT](LICENSE)