<div align="center">

# <img src="https://raw.githubusercontent.com/mjb4khshi/sarv-ui/main/sarv-logo.png" alt="logo" width="34" style="vertical-align: middle; margin-right: 8px;" /> Sarv UI

**A Minimal, Theme-Aware & Dynamic UI Component Library for Tailwind CSS v4**

[![npm version](https://img.shields.io/npm/v/sarv-ui.svg?style=flat-square&color=10b981)](https://www.npmjs.com/package/sarv-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0+-38bdf8.svg?style=flat-square)](https://tailwindcss.com)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Explore-6366f1.svg?style=flat-square)](https://mjb4khshi.github.io/sarv-ui/)

[**Live Interactive Demo →**](https://mjb4khshi.github.io/sarv-ui/)

</div>

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="25" height="25" /> Highlights

- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Artist Palette" width="20" height="20" style="vertical-align: middle;" /> **15 Curated Handcrafted Themes**: Persian, Cyberpunk, Matcha, Tokyo Midnight, Ocean Abyss, Emerald, Crimson, Sunset, and sharp variants.
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/High%20Voltage.png" alt="High Voltage" width="20" height="20" style="vertical-align: middle;" /> **Tailwind CSS v4 Ready**: Native `@plugin` and `@theme` support with pure CSS variable architecture.
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="20" height="20" style="vertical-align: middle;" /> **Tactile & Fluid Animations**: 3D hover elevations, center-expanding focus accents, floating labels, and smooth state transitions.
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Puzzle%20Piece.png" alt="Puzzle Piece" width="20" height="20" style="vertical-align: middle;" /> **100% Token-Driven**: Every component (buttons, custom inputs, custom selects, badges, checkboxes, radios) automatically adapts to any theme without hardcoded CSS.
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20with%20Meridians.png" alt="Globe" width="20" height="20" style="vertical-align: middle;" /> **First-Class RTL Support**: Built-in bidirectional support for Persian/Arabic layouts.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Installation

Install **Sarv UI** via npm:

```bash
npm install sarv-ui
```

> **Peer Dependency**: Ensure `tailwindcss` v4 is installed:
> ```bash
> npm install tailwindcss@^4.0.0
> ```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/High%20Voltage.png" alt="High Voltage" width="25" height="25" /> Quick Start

In your Tailwind CSS entry point (e.g., `src/index.css` or `src/app.css`):

```css
@import "tailwindcss";
@plugin "sarv-ui";
@import "sarv-ui/sarv.css";
```

### Switching Themes

Switch themes instantly anywhere on the DOM using the `data-theme` attribute:

```html
<!-- Light Themes -->
<html data-theme="persian-light">
<html data-theme="sunset">
<html data-theme="matcha">

<!-- Dark & Vibrant Themes -->
<html data-theme="persian-dark">
<html data-theme="tokyo-midnight">
<html data-theme="cyberpunk">
<html data-theme="ocean-abyss">
<html data-theme="emerald">
<html data-theme="crimson">
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gem%20Stone.png" alt="Gem Stone" width="25" height="25" /> Components Overview

### 1. Buttons (`.btn`)
Interactive buttons with tactile micro-interactions and elevation:
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-soft btn-secondary">Soft Secondary</button>
<button class="btn btn-outline btn-success">Outline Success</button>
<button class="btn btn-flat btn-warn">Flat Warning</button>
```

### 2. Modern Inputs (`.input-wrap`)
Filled inputs with center-expanding focus line, floating icons, and state messages:
```html
<div class="input-wrap">
  <label class="input-label">Email Address</label>
  <div class="input-box">
    <input type="email" class="input input-primary" placeholder="name@example.com" />
  </div>
</div>
```

### 3. Custom Animated Select (`.select`)
Theme-adaptive dropdown with animated chevron, keyboard accessibility, and subtle slide effects:
```html
<div class="select-wrap">
  <label class="select-label">Select Framework</label>
  <div class="select-box">
    <div class="select select-primary">
      <div class="select-trigger" tabindex="0">
        <span class="select-value">Tailwind CSS v4</span>
        <svg class="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>
      </div>
      <div class="select-menu">
        <div class="select-option is-selected"><span>Tailwind CSS v4</span></div>
        <div class="select-option"><span>Next.js</span></div>
        <div class="select-option"><span>Vite</span></div>
      </div>
    </div>
  </div>
</div>
```

### 4. Badges, Checkboxes & Radios
```html
<span class="badge badge-primary">New Feature</span>
<span class="badge badge-success">Completed</span>

<!-- Checkbox with animated scale pulse -->
<label class="checkbox checkbox-primary">
  <input type="checkbox" checked />
</label>

<!-- Radio button -->
<div class="radio-wrap">
  <input type="radio" class="radio" name="opt" checked />
  <div class="radio-mask radio-primary"></div>
</div>
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Artist Palette" width="25" height="25" /> Themes Included

| Theme Name | Description | Mode |
| :--- | :--- | :--- |
| `persian-light` | Balanced, clean warm-white palette | Light |
| `persian-dark` | Deep charcoal with rich contrast | Dark |
| `tokyo-midnight` | Deep indigo and electric purple neon | Dark |
| `ocean-abyss` | Rich navy and glowing cyan | Dark |
| `cyberpunk` | High-contrast black with neon yellow & cyan | Dark |
| `emerald` | Deep forest greens and mint highlights | Dark |
| `crimson` | Dark slate with scarlet & rose glow | Dark |
| `coffee-roast` | Warm espresso and roasted amber | Dark |
| `royal-purple` | Regal violet and lavender tones | Dark |
| `sunset` | Warm terracotta, cream and golden hues | Light |
| `matcha` | Soft organic sage and green tones | Light |
| `nordic` | Crisp Scandinavian slate and ice-blue | Light |
| `rose-gold` | Elegant blush and metallic rose accents | Light |
| `*-sharp` | Zero-radius modern brutalist variants | Any |

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Package.png" alt="Package" width="25" height="25" /> Version

Current release: **v0.3.0** <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Seedling.png" alt="Seedling" width="20" height="20" style="vertical-align: middle;" />

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" alt="Handshake" width="25" height="25" /> Contributing

Pull requests and issues are welcome!  
Open an issue on [GitHub](https://github.com/mjb4khshi/sarv-ui/issues).

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Scroll.png" alt="Scroll" width="25" height="25" /> License

Distributed under the **MIT License**. See [LICENSE](./LICENSE) for details.