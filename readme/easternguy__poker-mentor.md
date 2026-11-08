# ♠ Poker Mentor

**English** · [فارسی](#farsi)

[![MIT License](https://img.shields.io/badge/license-MIT-c9a25e?style=for-the-badge)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/☕_Buy_me_a_coffee-FFDD00?style=for-the-badge&logoColor=black)](https://buymeacoffee.com/Hessamsh)

**A No-Limit Texas Hold'em trainer that teaches you real poker while you play it.**

Poker Mentor is a single-player, browser-based poker game with a built-in coach. You sit at a 6-max table against five opponents with genuinely different playing styles, and every layer of the app is designed to make you a better player: a live coach explains the math behind every decision, each hand you finish is graded street by street, an interactive curriculum teaches the fundamentals, and long-term stats find your leaks and point you at the lesson that fixes them.

No accounts, no real money, no gambling — just a fast way to learn the most popular card game in the world without donating chips to strangers while you do it.

---

## Features

### 🎰 A real poker game
- Full No-Limit Texas Hold'em engine: blinds, betting rounds, side pots, split pots, min-raise rules (including the short all-in edge cases most implementations get wrong)
- Five AI opponents with distinct, data-driven personalities:
  - **Selena "The Shark"** — solid, balanced, aggressive when it counts
  - **Rocky the Rock** — folds everything; when he bets, run
  - **"Mad" Marta** — raises with anything, especially nothing
  - **Finn the Fish** — calls with any two cards, any price
  - **Norm the Nit** — waiting for aces since 2019
- Real bluffing: semi-bluffs with draws, continuation bets, street-aware bluff frequencies — and bots that occasionally *show* you the bluff they just stole a pot with
- Three difficulty levels: on Hard, bots use real equity simulation and exploit your tendencies
- Table talk, synthesized sound effects, card and chip animations — all toggleable, mobile-friendly

### 🎓 A coach at the table
- **Live coach** (toggleable): on every decision, see your current hand, your win probability (Monte Carlo simulation running in a web worker), the pot odds, and a recommended action with a one-paragraph explanation of *why*
- **Post-hand review**: every decision you made is graded — good / okay / mistake / blunder — against the coach's analysis, chess.com style
- **Hand summary screen**: after every hand, the full hand-ranking ladder appears with the winning hand marked on it — and *your* hand marked too, even when you folded. The game waits until you're done studying before dealing the next hand
- **Hand replay**: scrub through any past hand street by street with all hole cards revealed, your grades attached to each decision

### 📚 A curriculum
Eight interactive lessons: hand rankings → position → preflop ranges → pot odds & outs → board reading → value betting → bluffing → bankroll & tilt. Each lesson ends in drills — including "which hand wins?" puzzles rendered with real cards and table scenarios judged by the same coach logic used in the game, so the lessons can never disagree with the gameplay.

### 📈 A mirror
- Persistent stats: win rate (BB/100), VPIP, PFR, decision quality, bankroll curve
- **Leak detection**: rule-based analysis over your history ("you call too much without the right price") with each leak linking to the lesson that addresses it
- **Cross-device sync**: lesson progress and hand history sync through the bundled server, so you can play on your desktop and review on your phone

---

## Quick start

```bash
npm install
npm run dev        # → http://localhost:5173
```

Run the test suite (see [Testing](#testing) for why there are so many):

```bash
npm test
```

## Deployment

The app ships as a single Docker container: a static build served by a zero-dependency Node server that also provides the sync API.

```bash
docker build -t poker-mentor .
docker run -d --name poker-mentor \
  --restart unless-stopped \
  -p 8484:80 \
  -v poker-mentor-data:/data \
  poker-mentor
```

Open `http://<host>:8484`. The `/data` volume holds synced progress and hand history; without it, sync still works but data dies with the container. Without any server (plain `npm run dev`), the app transparently falls back to browser-local storage.

---

## Architecture

The design rule that shapes everything: **game logic is pure TypeScript with zero React/DOM imports.** Every hand is fully determined by `{config, seed, actions[]}` and emits a typed event log — one source of truth consumed by three clients: UI animations, post-hand analysis/replay, and stats.

```
src/
├─ engine/     Event-sourced NLHE state machine. Deterministic (seeded RNG),
│              replayable, exhaustively tested. Side pots, min-raise rules,
│              hand evaluation (phe, cross-validated against pokersolver).
├─ bots/       Personalities as config objects (VPIP by position, aggression,
│              bluff frequency...). Tuning a bot = editing numbers.
├─ equity/     Monte Carlo equity simulation, run in a Web Worker.
│              5k iterations ≈ ±0.7% in under 20ms.
├─ coach/      Preflop chart lookups + postflop equity-vs-pot-odds reasoning,
│              with template explanations. Pure functions.
├─ analysis/   Replays the event log, grades every hero decision, and builds
│              the end-of-hand summary.
├─ lessons/    Data-driven curriculum. Drill answers are verified against the
│              real evaluator and coach at build time.
├─ stats/      Aggregation (VPIP/PFR/BB-100), rule-based leak detection,
│              IndexedDB persistence.
├─ game/       The one stateful orchestrator (table controller), sounds, sync.
├─ store/      Zustand stores — thin bridges between logic and UI.
└─ ui/         React components. Receives sanitized snapshots only: bot hole
               cards physically never reach the UI until showdown.
server.js      Zero-dependency static file server + JSON sync API.
```

## Testing

Poker rules are easy to get subtly wrong, so correctness is proven rather than assumed:

- **Evaluator cross-validation** — 10,000 random showdowns compared against a second, independent evaluator library
- **Property-based tests** (fast-check) — hundreds of randomized hands asserting chips are never created or destroyed and every hand terminates, across arbitrary stack sizes and action sequences
- **Replay determinism** — any recorded hand replays to the exact same final state
- **Side-pot fixtures** — hand-written multi-way all-in scenarios with known answers, including the short-all-in-doesn't-reopen-betting rule
- **Statistical playtests** — hundreds of auto-played hands asserting each bot personality's measured VPIP/PFR — and bluffing frequency — actually matches its design
- **Self-verifying curriculum** — every "which hand wins?" drill is checked against the evaluator and every scenario drill against the coach; wrong lesson content fails the build

## Tech stack

Vite · React · TypeScript (strict) · Zustand · [phe](https://github.com/thlorenz/phe) hand evaluator · Web Workers · IndexedDB (`idb`) · Vitest + fast-check · WebAudio (all sounds synthesized, no assets) · Docker

## Support

If Poker Mentor helped your game, you can support development here:

☕ **[buymeacoffee.com/Hessamsh](https://buymeacoffee.com/Hessamsh)**

## Roadmap

- [ ] Opponent range modeling for even more honest equity numbers
- [ ] "Show bot's thinking" — the decision trace already exists behind the scenes
- [ ] More variants (Omaha) and table sizes
- [ ] UI translations (Farsi first)
- [ ] Optional multiplayer

## License

[MIT](LICENSE) — use it, learn from it, fork it.

*Poker Mentor is a training tool. It uses play chips only, involves no wagering, and is not affiliated with any real-money gaming service.*

---

<a id="farsi"></a>

# ♠ پوکر منتور (Poker Mentor)

[English](#-poker-mentor) · **فارسی**

<div dir="rtl">

**بازی تگزاس هولدم بدون محدودیت (No-Limit Texas Hold'em) که در حین بازی، پوکر واقعی به شما یاد می‌دهد.**

پوکر منتور یک بازی پوکر تک‌نفرهٔ تحت مرورگر با مربی داخلی است. پشت یک میز شش‌نفره مقابل پنج حریف هوش مصنوعی با سبک‌های کاملاً متفاوت می‌نشینید و تمام بخش‌های برنامه برای این طراحی شده‌اند که شما را بازیکن بهتری کنند: مربیِ زنده ریاضیاتِ پشت هر تصمیم را توضیح می‌دهد، هر دستی که بازی می‌کنید مرحله‌به‌مرحله نمره می‌گیرد، درس‌های تعاملی اصول بازی را آموزش می‌دهند و آمار بلندمدت، نقاط ضعف شما را پیدا کرده و به درسِ مربوطه ارجاع می‌دهد.

بدون ثبت‌نام، بدون پول واقعی و بدون قمار — فقط راهی سریع برای یادگیری محبوب‌ترین بازی کارتی جهان، بدون اینکه هنگام یادگیری ژتون‌هایتان را به دیگران هدیه بدهید.

## امکانات

- 🎰 **موتور کامل پوکر**: بلایندها، دورهای شرط‌بندی، پات‌های فرعی (side pot)، قوانین حداقلِ رِیز — همان جزئیاتی که بیشتر پیاده‌سازی‌ها اشتباه می‌گیرند
- 🤖 **پنج حریف با شخصیت‌های متمایز**: از «راکیِ سنگ» که همه‌چیز را فولد می‌کند تا «مارتای دیوانه» که با هیچ‌وپوچ رِیز می‌زند — و گاهی بلوفش را به شما نشان می‌دهد!
- 🎓 **مربی زنده**: در هر تصمیم، شانس بردتان (با شبیه‌سازی مونت‌کارلو)، پات آدز و حرکت پیشنهادی را همراه با توضیحِ دلیل آن می‌بینید
- 📊 **مرور بعد از هر دست**: هر تصمیم شما در مقایسه با تحلیل مربی نمره می‌گیرد — درست / قابل قبول / اشتباه / فاجعه
- 🃏 **صفحهٔ جمع‌بندی دست**: بعد از هر دست، جدول کامل رتبه‌بندی دست‌های پوکر نمایش داده می‌شود؛ دستِ برنده و دستِ خودِ شما (حتی وقتی فولد کرده‌اید) روی جدول علامت می‌خورد و بازی تا وقتی دکمهٔ «دست بعد» را نزنید صبر می‌کند
- ▶️ **بازپخش دست‌ها**: هر دستِ گذشته را حرکت‌به‌حرکت مرور کنید، با کارت‌های همهٔ بازیکنان رو
- 📚 **هشت درس تعاملی**: از رتبه‌بندی دست‌ها و اهمیت جایگاه (پوزیشن) تا پات آدز، بلوف و مدیریت سرمایه — با تمرین‌های تعاملی
- 📈 **آمار و کشف نقاط ضعف**: نرخ برد، VPIP/PFR، نمودار سرمایه و گزارش «لیک‌ها» با لینک به درسِ درمانش
- 📱 سازگار با موبایل، با افکت‌های صوتی و هماهنگ‌سازی پیشرفت بین دستگاه‌ها

> رابط کاربری بازی در حال حاضر به زبان انگلیسی است؛ ترجمهٔ فارسی رابط در نقشهٔ راه پروژه قرار دارد.

## اجرای سریع

</div>

```bash
npm install
npm run dev
```

<div dir="rtl">

سپس آدرس `http://localhost:5173` را در مرورگر باز کنید. برای اجرای تست‌ها: `npm test`

## اجرا با داکر

</div>

```bash
docker build -t poker-mentor .
docker run -d --name poker-mentor \
  --restart unless-stopped \
  -p 8484:80 \
  -v poker-mentor-data:/data \
  poker-mentor
```

<div dir="rtl">

سپس `http://<آدرس-سرور>:8484` را باز کنید. حجم `/data` تاریخچهٔ دست‌ها و پیشرفت درس‌ها را نگه می‌دارد تا بین دستگاه‌های شما همگام بماند.

## حمایت از پروژه

اگر پوکر منتور به بازی شما کمک کرد، می‌توانید از توسعهٔ آن حمایت کنید:

☕ **[buymeacoffee.com/Hessamsh](https://buymeacoffee.com/Hessamsh)**

## مجوز

این پروژه تحت مجوز [MIT](LICENSE) منتشر شده است — آزادانه استفاده کنید، یاد بگیرید و توسعه دهید.

*پوکر منتور یک ابزار آموزشی است: فقط با ژتون‌های مجازی کار می‌کند، هیچ شرط‌بندی واقعی در کار نیست و به هیچ سرویس قمار با پول واقعی وابسته نیست.*

</div>