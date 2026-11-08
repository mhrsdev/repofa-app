<img width="1470" height="831" alt="image" src="https://github.com/user-attachments/assets/6bac92c4-2bf7-486b-aff8-7b742599d7f6" />


# Linux is 35 🐧

[See It Here!](https://parsabordbar.github.io/linux35/)

A brochure-style single page celebrating 35 years of Linux — from the
"just a hobby" Usenet post of 25 August 1991 to a helicopter flying on Mars.

Riso-print look: two inks on cream paper, chunky display type, wavy paper-cut
edges, real project logos, and a terminal that types its commands as you scroll.

## Features

- **21 real milestones (1991–2026)** — every entry links to a primary or
  authoritative source: the original mail, the release archive, the press
  release. All URLs verified live.
- **Scroll-driven terminal** — on wide screens a sticky terminal follows you
  down the timeline and types `whoami`, `uname -sr`, `sudo apt install future`…
  driven purely by CSS scroll timelines. On mobile, mini terminal snippets
  (including `apt-get moo`) appear between eras instead.
- **Fun facts panel** — Freax, the Canberra penguin bite, "the stupid content
  tracker", Linux on Falcon 9 — each with a source.
- **Honest artwork** — everything is human-made and freely licensed: Tux by
  Larry Ewing, public-domain Tango icons, project logos verified through the
  Wikimedia Commons API. No AI-generated art. Full credits in
  [`assets/LICENSES.md`](assets/LICENSES.md).

## Stack

**Zero dependencies, zero build step.** Plain HTML/CSS/JS showing off the
modern web platform:

| Feature | Used for |
|---|---|
| CSS scroll-driven animations (`view()` / `scroll()`) | card reveals, progress bar |
| Named `view-timeline` | the terminal typing as you scroll |
| `light-dark()` + OKLCH | automatic dark mode in one function |
| Native web component (`<milestone-card>`) | rendering `milestones.json` |
| View Transitions API | the theme toggle |
| CSS `mask` | screen-print silhouettes |

## Run locally

```sh
python3 -m http.server 8135
# open http://localhost:8135
```

(A server is needed because the page fetches `milestones.json`.)

## Deploy to GitHub Pages

```sh
git remote add origin git@github.com:parsabordbar/linux35.git
git push -u origin main
```

Then: repo → Settings → Pages → "Deploy from a branch" → `main` / `/ (root)`.
The page is subpath-safe (all paths relative), so it works at
`https://parsabordbar.github.io/linux35/` as-is.

---

*This page was built with the help of [Claude](https://claude.com/claude-code).*