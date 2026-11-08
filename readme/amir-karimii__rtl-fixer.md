# RTL Fixer

<p align="center">
  <img src="icons/icon128.png" width="96" alt="RTL Fixer icon">
</p>

<p align="center">
  <strong>Persian RTL formatting for translated web pages.</strong><br>
  متن فارسی را مرتب و راست‌چین می‌کند و کدها را چپ‌به‌راست نگه می‌دارد.
</p>

<p align="center">
  <a href="#quick-start">Quick start</a> ·
  <a href="#راهنمای-فارسی">راهنمای فارسی</a> ·
  <a href="#features">Features</a> ·
  <a href="#privacy">Privacy</a>
</p>

## What it does

RTL Fixer is a lightweight Chrome extension for pages translated into Persian. Translate an English page to Persian with Google Translate first, then use RTL Fixer to align Persian content from right to left and apply the bundled **Vazirmatn** font. Code blocks and editors stay left-to-right and monospace.

## Quick start

1. Download the source archive or clone this repository.
2. Extract the archive, then open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extracted project folder.
5. Open an English page and translate the entire page to Persian with Google Translate.
6. Open RTL Fixer from Chrome's toolbar and click **اعمال راست‌چین**.

The full illustrated Persian installation guide is available at [docs/RTLFixer-Chrome-install-fa.pdf](docs/RTLFixer-Chrome-install-fa.pdf).

## Features

- Right-aligns detected Persian text without changing the overall page layout.
- Uses the included free Vazirmatn font for Persian content.
- Keeps `pre`, `code`, editors, and common code containers left-to-right.
- Watches translated content that arrives after the initial page render.
- Includes a one-click restore action.
- Uses only the active tab when you press the extension button.

## Privacy

RTL Fixer does not collect, transmit, or store browsing data. It modifies the current page only after you explicitly run it. The extension requires `activeTab` and `scripting` solely to apply or restore formatting in the active tab.

## Development

After changing an extension file, return to `chrome://extensions` and click **Reload** on the RTL Fixer card. Then refresh the test page.

## Release package

`output/release/RTLFixer-1.0.0.zip` is the clean Chrome extension package. Its `manifest.json` is at the ZIP root, so it can be uploaded to the Chrome Web Store or attached to a GitHub Release.

## License and attribution

The bundled [Vazirmatn](fonts/README.md) font is licensed under the SIL Open Font License 1.1. Choose a license for the extension source code before making the repository public.

---

## راهنمای فارسی

**RTL Fixer** افزونه‌ای سبک برای مرتب‌کردن صفحه‌هایی است که به فارسی ترجمه شده‌اند.

۱. ابتدا صفحهٔ انگلیسی را با افزونه یا قابلیت Google Translate به فارسی ترجمه کنید.
۲. روی آیکون افزونه در نوار ابزار Chrome بزنید.
۳. دکمهٔ «اعمال راست‌چین» را انتخاب کنید.

متن‌های فارسی راست‌چین و با فونت Vazirmatn نمایش داده می‌شوند؛ کدها و محیط‌های برنامه‌نویسی چپ‌به‌راست باقی می‌مانند. راهنمای تصویری کامل در [این PDF](docs/RTLFixer-Chrome-install-fa.pdf) قرار دارد.