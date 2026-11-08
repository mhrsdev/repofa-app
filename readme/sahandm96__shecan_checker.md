# Shecan DNS Guardian

**A lightweight Windows watchdog for [Shecan](https://shecan.ir) DNS — monitors health, auto-failover, and DDNS updates.**

Now powered by a single **Go** binary with a **TUI-first** interface (optional web dashboard and system tray).

> Unofficial community tool. Not affiliated with or endorsed by Shecan.

[English](#english) · [فارسی](#فارسی)

---

## English

### Why this exists

[Shecan](https://shecan.ir) is a popular Iranian DNS service that helps users reach filtered websites. Two common pain points:

1. **Outages** — When Shecan DNS servers are unreachable, Windows may stall on every lookup and browsing breaks.
2. **Dynamic IP** — Users with changing public IPs must notify Shecan so traffic is routed correctly.

This tool runs in the background, checks Shecan every few minutes, adds a temporary fallback DNS when needed, and pings your DDNS update URLs automatically.

### Features

- **TUI (default)** — Terminal dashboard with live status
- **Web panel** — Optional embedded dashboard (`--mode web` or press `W` in TUI)
- **System tray** — Minimize to tray (`--mode tray`)
- **DNS monitoring** — Reads Windows DNS settings (PowerShell + `netsh`)
- **Automatic failover / assist** — Fallback DNS when Shecan is down
- **Sanction mirrors** — Sets Flutter/Dart mirror env vars when probes fail
- **Single binary** — No Python or WebView runtime required

### Requirements

| Requirement | Notes |
|-------------|-------|
| Windows 10/11 | Uses PowerShell and `netsh` |
| Go 1.25+ (to build) | Or download a release binary |
| Administrator | Required for DNS failover and Machine-level env vars |

### Quick start

```batch
git clone https://github.com/SahandM96/shecan_checker.git
cd shecan_checker

copy config-sample.json config.json
:: Edit config.json — add your DDNS update URLs from my.shecan.ir

go build -o shecan-guardian.exe ./cmd/shecan-guardian

:: Run as Administrator (default mode is TUI)
shecan-guardian.exe
```

### Run modes

| Mode | Command |
|------|---------|
| TUI (default) | `shecan-guardian.exe` or `--mode tui` |
| Web dashboard | `shecan-guardian.exe --mode web` → http://127.0.0.1:8765 |
| System tray | `shecan-guardian.exe --mode tray` |
| One-shot cycle | `shecan-guardian.exe --mode once` |

### TUI keys

| Key | Action |
|-----|--------|
| `Space` | Start / stop monitor |
| `R` | Refresh status |
| `W` | Start API (if needed) and open web dashboard |
| `D` | Donation / support screen |
| `X` | Restore normal DNS / env settings |
| `Q` | Quit |

### Auto-start (Windows Task Scheduler)

```batch
:: Install (run elevated) — starts Go binary in tray mode at login
shecan-guardian.exe --install-task

:: Remove auto-start (also deletes the legacy Python task "ShecanGuardian")
shecan-guardian.exe --uninstall-task
```

If an old Python console still opens at boot, migrate once:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\migrate_from_python.ps1
```

### Migrating from Python / Tauri

This project is **Go-only**. The former `shecan_service.py`, `shecan_core/`, and Tauri `desktop/` stacks have been removed. Language stats on GitHub should show Go.

### Support the project

Donations help fund ongoing development: [sahandm96.com/donates](https://sahandm96.com/donates)

### License

MIT — see [LICENSE](LICENSE)

---

## فارسی

### شروع سریع

```batch
go build -o shecan-guardian.exe ./cmd/shecan-guardian
shecan-guardian.exe
```

حالت پیش‌فرض **TUI** است. با کلید `W` پنل وب باز می‌شود و با `D` صفحهٔ حمایت مالی (مشابه [sahandm96.com/donates](https://sahandm96.com/donates)).

اگر هنوز موقع بوت کنسول پایتون باز می‌شود:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\migrate_from_python.ps1
```

### حمایت از پروژه

[حمایت مالی](https://sahandm96.com/donates)