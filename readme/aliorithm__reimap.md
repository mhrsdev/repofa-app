# ReMap · ری‌مپ

**Persian-first Tehran metro router** — a dark-mode MapLibre map, transfer-aware Dijkstra routing over the full Tehran network, saved places, and an LLM assistant that actually *drives the map*.

[![CI](https://github.com/Aliorithm/reimap/actions/workflows/ci.yml/badge.svg)](https://github.com/Aliorithm/reimap/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

Live demo: **https://reimap.vercel.app**

🎬 **Demo video:** [ReiMap.mp4](public/ReiMap.mp4)

[<video src="public/ReiMap.mp4" width="720" controls preload="metadata"></video>](https://github.com/user-attachments/assets/9c4775a4-8710-44f7-b173-b4059c96507a)

## Features

- **Routing that understands transfers.** Dijkstra runs over `(station, line)` states, so changing lines costs a penalty and routes prefer staying on one line — exactly how riders think.
- **Metro + BRT modes.** The «خطوط و ناوگان» panel toggles each fleet on/off; the map layers, the routing graph, the search and the AI assistant all follow. Metro↔BRT transfers are real walking edges (≤800 m) with honest walk-time costs, so the router trades mode changes exactly like a rider would.
- **Door-to-door endpoints.** Origin/destination can be a station, a saved place, your GPS location, a map click, or a free-text address (Nominatim, bounded to greater Tehran). Non-station endpoints get first/last-mile walking legs with distance-based time estimates.
- **AI assistant that controls the map.** The LLM answers in Persian and emits `<map>{...}</map>` commands (`route` / `show` / `save` / `nearby`) that the app parses, validates and executes — streaming over SSE while command blocks are hidden from the chat bubble.
- **Saved places.** «خانه خاله», «دانشگاه»… stored locally, matched script-insensitively (alef/yeh/kaf variants, ZWNJ), and understood by the assistant by name.
- **Cross-device sharing, no backend.** Share your saved places as a link (`#p=…`, compressed into the URL hash) or a QR code — the data travels inside the link itself; nothing is stored on any server. Phone→desktop: send the link; desktop→phone: scan the QR. Incoming places merge with script-insensitive duplicate detection.
- **Nearby POI search** via Photon with brand queries («نزدیک‌ترین کافه لمیز»), distance-sorted numbered pins.
- **Fully RTL Persian UI**, Persian digits, under-construction stations dimmed on the map.

## How it works

### Routing core — `src/lib/route-finder.ts`

1. **Graph repair.** Upstream data misses some reverse edges; `makeBidirectional` mirrors every edge so lines run both ways.
2. **State-space Dijkstra.** A node is not a station but a *(station, line)* pair. Riding into a station on line A then continuing on line B costs the transfer penalty (`MIN_PER_TRANSFER = 5 min`) — the search naturally trades extra hops against transfers.
3. **Legs reconstruction.** The state chain is folded into contiguous per-line legs (the shared transfer station closes one leg and opens the next), which drive both the timeline UI and the map geometry.
4. **Walking legs.** Arbitrary endpoints snap to their nearest station (haversine); walking time uses 4.5 km/h.

### Assistant protocol

```
user  →  "از دانشگاهم تا هتل اسپیناس"
model →  "الان مسیر دانشگاه تا هتل اسپیناس را نمایش میدهم."
         <map>{"action":"route","from":"دانشگاه","to":"هتل اسپیناس"}</map>
app   →  resolves both names (saved place → station → Nominatim),
         sets endpoints, draws the route, shows an action chip in the chat
```

The request body only carries `{ q, context, history }`; the system prompt and every message role are composed **server-side** in `src/app/api/ai/route.ts`, behind a per-IP rate limit. Client code can never forge roles or stream arbitrary prompts to the model provider.

## Getting started

Prerequisites: **Node ≥ 20**.

```bash
npm install
cp .env.example .env.local   # then fill in GROQ_API_KEY
npm run dev                  # http://localhost:3000
```

Get a free Groq API key at [console.groq.com](https://console.groq.com/keys). Without it everything works except the AI assistant sheet.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` / `start` | Production build / serve |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals` + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest — routing invariants incl. “every active station reachable from Tajrish” |

## Data & attribution

- **Network data** (stations, lines, graph, paths): collected and maintained by the author — regularly synced from public live-transit sources via a private data pipeline. Spot an outdated station? Open an issue.
- **Map tiles**: © [OpenFreeMap](https://openfreemap.org) © [OpenMapTiles](https://www.openmaptiles.org/), data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) (ODbL).
- **Geocoding**: [Nominatim](https://operations.osmfoundation.org/policies/nominatim/) (rate-limited client-side to respect its usage policy) · **POI search**: [Photon](https://photon.komoot.io/) by Komoot.
- **LLM**: [Groq](https://groq.com/) inference.

## Contributing

Issues and PRs are welcome — especially data corrections for new stations/lines. Keep PRs small; CI (typecheck + lint + tests) must be green.

## License

[MIT](LICENSE). Network data remains subject to OpenStreetMap's ODbL where applicable.

---

<div dir="rtl">

# ری‌مپ

مسیریاب مترو تهران — نقشه تیره با MapLibre، مسیریابی با الگوریتم دایکسترا و جریمه تعویض خط، مکان‌های ذخیره‌شده، و دستیار هوشمندی که خودِ نقشه را کنترل می‌کند.

**قابلیت‌ها**
- مسیریابی مبدأ تا مقصد درب به درب؛ ایستگاه، مکان ذخیره‌شده، موقعیت GPS یا هر آدرس متنی
- روشن/خاموش کردن ناوگان مترو و بی‌آرتی در پنل «خطوط و ناوگان»؛ نقشه، مسیریابی، جستجو و دستیار همه از حالت‌های فعال پیروی می‌کنند
- دستیار فارسی‌زبان که با دستورهای `<map>` نقشه را مسیریابی، نمایش مکان، ذخیره و جستجوی اطراف انجام می‌دهد
- زمان تقریبی سفر با احتساب پیاده‌روی اول و آخر مسیر و جریمه تعویض خط
- رابط کاملاً راست‌به‌چپ با اعداد فارسی
- اشتراک‌گذاری مکان‌های ذخیره‌شده بین دستگاه‌ها بدون سرور — لینک یا کد QR؛ همه داده‌ها داخل خود لینک است و ورودی‌ها با تشخیص تکرار ادغام می‌شوند

**اجرا**

```bash
npm install
cp .env.example .env.local   # کلید رایگان Groq را قرار دهید
npm run dev
```