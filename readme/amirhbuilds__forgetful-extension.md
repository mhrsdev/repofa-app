<p align="center">
  <img src="assets/hero.png" alt="Forgetful — forget a topic, not everything" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-6c8cff" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/AI%2FLLM-none-22bf9b" alt="No AI or LLM" />
  <img src="https://img.shields.io/badge/tests-463%20passing-2e89fd" alt="463 tests passing" />
  <img src="https://img.shields.io/badge/build%20step-none-9aa0ab" alt="No build step" />
</p>

<h3 align="center">Tell it what to forget. It finds it, explains it, and asks before it touches anything.</h3>

<p align="center">Not a history cleaner. A "forget" button for one specific part of your life at a time.</p>

<br/>

## See it in action

<table>
<tr>
<td width="33%" valign="top">
<p align="center"><strong>1. Say what to forget</strong></p>
<img src="assets/screenshot-home.png" width="100%" alt="Home screen: type a topic or pick a preset" />
</td>
<td width="33%" valign="top">
<p align="center"><strong>2. Pick how careful to be</strong></p>
<img src="assets/screenshot-mode.png" width="100%" alt="Mode select screen: Precise, Thorough, or Total" />
</td>
<td width="33%" valign="top">
<p align="center"><strong>3. Review, then confirm</strong></p>
<img src="assets/screenshot-results.png" width="100%" alt="Results screen: grouped by site, every match explained" />
</td>
</tr>
</table>

## Why people like it

- 🧠 **No guessing.** Every single match tells you exactly why it's there — a site, a search, a page title. Never "AI thinks this is related."
- 🚦 **Nothing disappears by accident.** You see the full list, grouped and sorted by confidence, before a single thing is deleted.
- 🔒 **It never leaves your computer.** No cloud, no AI model, no account. Your history is read once, scored, and forgotten by the tool the moment you close it.
- 🎯 **Built to be careful, not clever.** It would rather miss something than guess wrong — see [`TECHNICAL.md`](TECHNICAL.md) for exactly how that's enforced.
- ⏪ **Undo for 30 days**, just in case.

## 15 topics, ready to go

`Job search` `Shopping` `Gaming` `Adult content` `Gambling` `Scams & fake sites`
`Dating` `Travel` `Social media` `Development` `Streaming`
`Personal finance & investing` `Real estate` `News & current events` `Health & fitness`

Typed something else? It builds a one-off topic from your exact words —
no guessing what you meant.

## Get it running

1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked**, select this folder.
3. Click the toolbar icon. That's it — no build, no sign-up, no setup.

## Want the technical details?

Testing, permissions, the scoring engine, project structure, and known
limitations all live in [`TECHNICAL.md`](TECHNICAL.md). The full
architecture write-up is in [`SPEC.md`](SPEC.md).