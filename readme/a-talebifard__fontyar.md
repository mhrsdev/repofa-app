<p align="center">
  <img src="assets/banner.jpg" alt="فونت‌یار - FontYar" width="100%" />
</p>

<h1 align="center">فونت‌یار</h1>

<p align="center"><b>مدیریت و پیش‌نمایش فونت - فارسی، سریع، آفلاین</b></p>

<p align="center">
<img src="https://img.shields.io/badge/Tech-Tauri_2+Rust-7C3AED?logo=rust&logoColor=white" alt="Tauri 2 + Rust" />
<img src="https://img.shields.io/badge/Frontend-Next.js_16+React_19-black" alt="Next.js 16" />
<img src="https://img.shields.io/badge/Language-TypeScript-3178C6" alt="TypeScript" />
<img src="https://img.shields.io/badge/Platform-Windows_%7C_Linux_%7C_macOS-green" alt="Platforms" />
</p>
<p align="center">
  <img src="assets/demo.gif" alt="دموی فونت‌یار" width="1920" />
</p>

---

## 🇮🇷 فارسی

**فونت‌یار** مدیر فونت فارسی‌زبان‌هاست: همهٔ فونت‌های سیستم و پوشه‌هایتان را یک‌جا ببینید، با هر متنی که دوست دارید پیش‌نمایش بگیرید، وزن‌ها و فونت‌های متغیر را زنده مقایسه کنید و با دو کلیک CSS آمادهٔ `@font-face` یا بستهٔ کامل فونت‌ها را خروجی بگیرید. فونت‌یار کاملاً روی سیستم شما اجرا می‌شود - بدون سرور، بدون حساب کاربری، بدون ارسال یک بایت از داده‌هایتان؛ و چون به‌جای مرورگر سنگین، از موتور بومی سیستم استفاده می‌کند (Tauri)، سریع و سبک است.

### ✨ امکانات

|     | امکان                                                                                                                                       |
| :-: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔍  | **اسکن پوشه‌ها** - همهٔ قالب‌ها (TTF / OTF / TTC / WOFF / WOFF2)، تشخیص خودکار خانواده و وزن‌ها، علامت‌گذاری فایل‌های تکراری                |
| ✍️  | **پیش‌نمایش با متن دلخواه** - باکس متن چندخطی با رشد خودکار؛ متن‌های نمونهٔ آماده (فارسی، لاتین، اعداد فارسی، لورم) و ذخیرهٔ متن‌های خودتان |
| 🎨  | **استایل‌های تایپوگرافی** - ساده، تیتر، پاراگراف، یا تیتر + پاراگراف با هم تا فونت را در کار واقعی ببینید                                   |
| 📏  | **اندازهٔ دقیق متن** - خودکار یا واحد دلخواه: **px / pt / rem** با استپر و تایپ مستقیم عدد (ارقام فارسی هم قبول!)                           |
| 🔤  | **فونت‌های متغیر** - اسلایدر زندهٔ وزن روی خود پیش‌نمایش + انتخاب وزن با یک کلیک روی شمارهٔ وزن                                             |
| 📦  | **خروجی حرفه‌ای** - CSS خودکفای `@font-face` (آدرس‌های نسبی یا self-host) و بستهٔ ZIP شامل CSS + همهٔ فایل‌های فونت خانواده                 |

### 📥 دانلود

از صفحهٔ **[Releases](https://github.com/a-talebifard/fontyar/releases)** آخرین نسخه را بگیرید:

| سیستم‌عامل                   | فایل                                     | نصب                               |
| ---------------------------- | ---------------------------------------- | --------------------------------- |
| **ویندوز ۱۰/۱۱**             | `FontYar_1.0.0_x64-setup.exe`            | نصب per-user - بدون نیاز به Admin |
| **لینوکس**                   | `FontYar_1.0.0_amd64.AppImage` یا `.deb` | AppImage: `chmod +x` سپس اجرا     |
| **مک (اینتل + اپل سیلیکون)** | `FontYar_1.0.0_universal.dmg`            | یک فایل برای هر دو معماری         |

> 💡 برنامه امضای دیجیتال ندارد:
>
> - **ویندوز:** در هشدار SmartScreen روی «More info» و سپس «Run anyway» بزنید.
> - **مک:** روی برنامه راست‌کلیک → Open، یا `xattr -cr /Applications/FontYar.app`
> - **لینوکس:** فقط سرچشمه‌های نرم‌افزار را لازم دارد - هیچ دسترسی خاصی نمی‌خواهد.

### 🛠️ تکنولوژی‌ها

| لایه              | فناوری                                    | چرا؟                                                            |
| ----------------- | ----------------------------------------- | --------------------------------------------------------------- |
| هستهٔ دسکتاپ      | **Tauri 2** (Rust)                        | باینری و مصرف حافظهٔ بسیار کم، امنیت بالا - بدون سنگین Electron |
| رابط کاربری       | **Next.js 16 + React 19 + TypeScript**    | معماری مدرن و تایپ‌سیف                                          |
| استایل            | **Tailwind CSS 4 + shadcn/ui + Radix UI** | طراحی تمیز و دسترس‌پذیر (a11y)                                  |
| مدیریت وضعیت      | **Zustand**                               | سبک و بدون boilerplate                                          |
| دیتابیس محلی      | **Dexie** (IndexedDB)                     | کتابخانهٔ بزرگ بدون فایل جانبی                                  |
| فشرده‌سازی        | **fflate**                                | ساخت ZIP در یک میلی‌ثانیه                                       |
| آیکون / فونت رابط | **lucide-react** + **وزیرمتن**            | ظاهر یکدست فارسی                                                |

### 🔨 ساخت از سورس

پیش‌نیاز مشترک: **Node.js 20+** و **Rust 1.77+**

```bash
git clone https://github.com/a-talebifard/fontyar.git
cd fontyar
npm install
npm run tauri:dev     # اجرای توسعه
npm run tauri:build   # خروجی نهایی → src-tauri/target/release/bundle/
```

وابستگی‌های هر سیستم‌عامل:

<details>
<summary><b>🐧 لینوکس (Ubuntu/Debian)</b></summary>

```bash
sudo apt-get install libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

خروجی: `.deb` و `.AppImage`

</details>

<details>
<summary><b>🪟 ویندوز</b></summary>

- [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) با بار کاری «Desktop development with C++»
- خروجی: `.exe` (نصب‌کنندهٔ NSIS)
</details>

<details>
<summary><b>🍎 مک‌اواس</b></summary>

```bash
xcode-select --install
```

خروجی: `.dmg` - برای بیلد یونیورسال: `npm run tauri build -- --target universal-apple-darwin`

</details>

### 🐳 اجرای با داکر (Docker)

برنامه را می‌توان با داکر در محیط لینوکس اجرا کرد. داکر‌فایل و داکر‌کامپوز در ریشهٔ پروژه قرار دارند.

#### پیش‌نیاز

- Docker runtime (Docker Desktop یا Docker Engine)

#### اجرای سریع با داکر‌کامپوز

```bash
# ساخت و اجرای جداگانه
docker compose up --build

# اجرای پس‌زمینه
docker compose up -d --build
```

#### دستورهای مفید

```bash
# مشاهده لاگ‌هایruntime
docker compose logs -f

# توقف و حذف کانتینرها
docker compose down

# ساخت without cache
docker compose build --no-cache
```

#### ساخت تصویر دائمی

```bash
docker build -t fontyar:latest .
docker run --rm -it fontyar:latest
```

### 🗺️ نقشهٔ راه

- [ ] Persian/English names for non-standard weights
- [ ] Special-glyph preview (Persian ligatures and combining marks)
- [ ] Font installation on Linux & macOS
- [ ] Library backup & restore

### 🤝 مشارکت

پیشنهاد و باگ را در [Issues](https://github.com/a-talebifard/fontyar/issues) ثبت کنید - فارسی یا انگلیسی، هر دو خوش‌آمد است. تاریخچهٔ فنی کامل توسعه در [CHANGELOG.fa.md](CHANGELOG.fa.md) آمده است.

---

## 🇬🇧 English

**FontYar** (فونت‌یار) is a Persian-first font manager: see every font on your system and custom folders in one place, preview them with any text you like, compare weights and variable fonts live, and export production-ready `@font-face` CSS or a complete font bundle in two clicks. FontYar runs fully on your machine - no server, no account, not a single byte of your data leaves the device - and because it uses the native system engine (Tauri) instead of a heavy embedded browser, it stays fast and light.

### ✨ Features

|     | Feature                                                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔍  | **Smart folder scanning** - every format (TTF / OTF / TTC / WOFF / WOFF2), automatic family & weight detection, duplicate marking                 |
| ✍️  | **Preview with your own text** - multi-line auto-growing box; ready-made samples (Persian, Latin, Persian digits, lorem) and your own saved texts |
| 🎨  | **Typographic styles** - plain, heading, paragraph, or heading + paragraph side by side                                                           |
| 📏  | **Exact text size** - auto, or pick your unit: **px / pt / rem** with a stepper and direct typing (Persian digits accepted!)                      |
| 🔤  | **Variable fonts** - live weight slider on the preview + click any weight number to render it                                                     |
| 📦  | **Professional export** - self-contained `@font-face` CSS (relative or self-hosted URLs) and a ZIP bundle with the CSS + all family files         |

### 📥 Download

Grab the latest build from the **[Releases](https://github.com/a-talebifard/fontyar/releases)** page:

| OS                                | File                                     | Install                            |
| --------------------------------- | ---------------------------------------- | ---------------------------------- |
| **Windows 10/11**                 | `FontYar_1.0.0_x64-setup.exe`            | per-user setup - no admin required |
| **Linux**                         | `FontYar_1.0.0_amd64.AppImage` or `.deb` | AppImage: `chmod +x` then run      |
| **macOS (Intel + Apple Silicon)** | `FontYar_1.0.0_universal.dmg`            | one file for both architectures    |

> 💡 The app is not code-signed:
>
> - **Windows:** in the SmartScreen warning choose "More info" → "Run anyway".
> - **macOS:** right-click → Open, or run `xattr -cr /Applications/FontYar.app`
> - **Linux:** uses only stock system libraries - no special privileges.

### 🛠️ Tech Stack

| Layer           | Technology                                | Why                                                                 |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| Desktop core    | **Tauri 2** (Rust)                        | tiny binary & memory footprint, strong security - no Electron bloat |
| UI              | **Next.js 16 + React 19 + TypeScript**    | modern, fully typed                                                 |
| Styling         | **Tailwind CSS 4 + shadcn/ui + Radix UI** | clean, accessible design (a11y)                                     |
| State           | **Zustand**                               | light, no boilerplate                                               |
| Local database  | **Dexie** (IndexedDB)                     | large libraries without sidecar files                               |
| Compression     | **fflate**                                | ZIP building in milliseconds                                        |
| Icons / UI font | **lucide-react** + **Vazirmatn**          | consistent Persian look                                             |

### 🔨 Build from Source

Common prerequisites: **Node.js 20+** and **Rust 1.77+**

```bash
git clone https://github.com/a-talebifard/fontyar.git
cd fontyar
npm install
npm run tauri:dev     # dev mode
npm run tauri:build   # production build → src-tauri/target/release/bundle/
```

Per-OS dependencies:

<details>
<summary><b>🐧 Linux (Ubuntu/Debian)</b></summary>

```bash
sudo apt-get install libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

Output: `.deb` and `.AppImage`

</details>

<details>
<summary><b>🪟 Windows</b></summary>

- [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) with the "Desktop development with C++" workload
- Output: `.exe` (NSIS installer)
</details>

<details>
<summary><b>🍎 macOS</b></summary>

```bash
xcode-select --install
```

Output: `.dmg` - for a universal build: `npm run tauri build -- --target universal-apple-darwin`

</details>

### 🐳 Running with Docker

The app can be run with Docker in a Linux environment. The Dockerfile and docker-compose are located at the project root.

#### Prerequisites

- Docker runtime (Docker Desktop or Docker Engine)

#### Quick run with docker-compose

```bash
# Build and run
docker compose up --build

# Run in background
docker compose up -d --build
```

#### Useful commands

```bash
# View runtime logs
docker compose logs -f

# Stop and remove containers
docker compose down

# Build without cache
docker compose build --no-cache
```

#### Build a standalone image

```bash
docker build -t fontyar:latest .
docker run --rm -it fontyar:latest
```

### 🗺️ Roadmap

- [ ] Persian/English names for non-standard weights
- [ ] Special-glyph preview (Persian ligatures and combining marks)
- [ ] Font installation on Linux & macOS
- [ ] Library backup & restore

### 🤝 Contributing

Feature ideas and bug reports go to [Issues](https://github.com/a-talebifard/fontyar/issues) - Persian or English, both are welcome. The full technical development history lives in [CHANGELOG.en.md](CHANGELOG.en.md).

---

<div align="center">
  <sub>ساخته‌شده با ❤️ برای جامعهٔ فارسی‌ | Built with ❤️ for the Persian community</sub>
</div>