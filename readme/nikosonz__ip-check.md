# IP Check

A Windows desktop app that watches your public IP, ISP, and location in real time and reacts the
instant your VPN drops — before the leak reaches an AI provider, a client, or a service that would
ban or block you for it.

Built for developers, freelancers, and AI-tool users (particularly in regions where VPN use is the
default, not the exception) who cannot afford a silent tunnel drop turning into an account ban.

> **Status:** early development (MVP). See [docs/ROADMAP.md](docs/ROADMAP.md).

## Why

VPN clients don't reliably tell you when they've silently disconnected. The gap between "tunnel
dropped" and "your real IP went out over the wire" is where accounts get flagged and banned. IP Check
closes that gap with sub-second, OS-level detection and a fail-closed kill switch — instead of
polling a public "what's my IP" API in a loop, which would just get *you* banned by the IP provider.

## Features

- Live public IP, ISP, ASN, country, and city, verified across multiple providers (consensus, so no
  single provider's outage or block causes a false reading)
- Sub-second VPN-drop detection via Windows network-change events + a local (no-network) route check
- DNS / IPv6 / WebRTC(STUN) leak detection
- Kill switch: Windows Firewall block first, with opt-in adapter-disable and app-closing escalation
- System tray, real-time dashboard, event history, Simple and Advanced modes
- Password-protected settings, trusted IP list, whitelisted apps, one-click reconnect
- No telemetry, ever

## Tech stack

Tauri 2 · Rust · React · TypeScript · Zustand · SQLite (sqlx)

## Documentation

- [Product Requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Threat Model](docs/THREAT_MODEL.md)
- [Database Schema](docs/SCHEMA.md)
- [API Contract](docs/API.md)
- [State Management](docs/STATE.md)
- [Roadmap](docs/ROADMAP.md)
- [Security](docs/SECURITY.md)
- [Testing Strategy](docs/TESTING.md)

## Development

Requires Rust (stable), Node 20+, and pnpm.

```bash
pnpm install
pnpm dev      # tauri dev
pnpm build    # tauri build
cargo test --workspace
cargo clippy --workspace -- -D warnings
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security issues: see [SECURITY.md](docs/SECURITY.md), do not
open a public issue.

## License

MIT — see [LICENSE](LICENSE).