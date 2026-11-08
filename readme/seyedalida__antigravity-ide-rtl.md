# Antigravity IDE RTL & Persian Font

<table align="center" width="100%">
  <tr>
    <td width="64%" align="center" valign="middle">
      <img src="./assets/chat-preview.png" alt="Antigravity IDE RTL Chat Preview" style="border-radius: 8px; max-width: 100%;">
    </td>
    <td width="36%" align="center" valign="middle">
      <img src="./assets/widget-preview.png" alt="Antigravity Smart RTL Settings Menu" style="border-radius: 8px; max-width: 100%;">
    </td>
  </tr>
</table>

A lightweight, zero-config patcher for **Antigravity IDE** that brings smart Right-to-Left (RTL) support, local **Vazirmatn** font integration, and an in-app hover settings panel to the chat interface.

---

## ⚡ Quick Install

Run directly via NPX (no cloning required):

```bash
npx @seyedalida/antigravity-ide-rtl
```

To uninstall and restore the original IDE files:

```bash
npx @seyedalida/antigravity-ide-rtl --restore
```

---

## ✨ Features

- 🌐 **Smart Bi-directional Detection**: Automatically applies RTL to Persian/Arabic paragraphs while preserving LTR layout for English responses, code blocks, and reasoning streams.
- 🎛️ **In-App Hover Settings Panel**: Hover over the globe icon in the chat header to adjust settings on the fly (opens and closes smoothly on hover).
- 💻 **Code & Syntax Isolation**: Monospace font and LTR direction are strictly preserved inside code blocks (`pre`, `code`, `.monaco-editor`, `shiki`) and inline snippets.
- 🎚️ **Dedicated Code Size Slider**: Adjust code font size independently without altering or bloating code block containers.
- 📊 **Markdown Tables RTL**: Automatically detects and formats Markdown tables with proper RTL column alignment and theme-matching borders.
- 🔤 **Offline Vazirmatn Variable Font**: Bundles local Vazirmatn font (no external CDN or internet connection needed) with support for custom system fonts.
- ⌨️ **Persian Keyboard `@` Fix**: Fixes `Shift + 2` to type `@` properly instead of `٬` on Persian keyboard layouts.
- ⌨️ **Keyboard Shortcut**: Toggle RTL on/off anytime using `Alt + R`.
- 🛡️ **Safe & CSP Compliant**: Compatible with Antigravity IDE's Trusted Types CSP and automatically patches integrity checksums to prevent "corrupt installation" warnings.

---

<div dir="rtl">

## 🌐 راهنمای فارسی

این ابزار یک پچر سریع و خودکار برای **Antigravity IDE** است که پشتیبانی هوشمند از راست‌چین (RTL)، فونت **وزیرمتن** و یک منوی تنظیمات درون‌برنامه‌ای را به محیط چت اضافه می‌کند.

### 📌 قابلیت‌ها

* 🌐 **تشخیص هوشمند جهت متن:** پیام‌های فارسی به صورت خودکار راست‌چین می‌شوند، اما قطعه‌کدها، اصطلاحات انگلیسی، خروجی‌های ترمینال و بخش‌های تفکر مدل (Thinking) کاملاً چپ‌چین و مرتب باقی می‌مانند.
* 🎛️ **منوی تنظیمات در نوار ابزار:** با بردن موس روی آیکون کره زمین در بالای صفحه چت، پنل تنظیمات با انیمیشن روان باز شده و با کنار رفتن موس بسته می‌شود.
* 💻 **ایزولاسیون کامل کدهای برنامه‌نویسی:** بلاک‌های کد (`pre`، `code`، `monaco-editor`، `shiki`) کاملاً چپ‌چین و با فونت مونو‌اسپیس نمایش داده می‌شوند.
* 🎚️ **تنظیم سایز فونت کدها به صورت مجزا:** علاوه بر سایز متن و فاصله خطوط، اسلایدر اختصاصی برای تغییر اندازه فونت داخل بلاک‌های کد بدون به هم ریختن کادر بیرونی وجود دارد.
* 📊 **پشتیبانی از جداول مارک‌داون:** جدول‌های گفتگو به صورت خودکار جهت‌دهی و راست‌چین شده و با تم برنامه هماهنگ می‌شوند.
* 🔤 **کاملاً آفلاین با فونت وزیرمتن:** فونت متغیر وزیرمتن به صورت محلی در برنامه تعبیه شده و بدون نیاز به اینترنت لود می‌شود (امکان استفاده از فونت‌های سیستمی دیگر نیز وجود دارد).
* ⌨️ **کلید میانبر و اصلاح کیبورد:** امکان فعال/غیرفعال کردن سریع با `Alt + R` و تایپ مستقیم کاراکتر `@` با `Shift + 2` در کیبورد فارسی.
* 🛡️ **بدون خطای دستکاری فایل:** کدهای اعتبارسنجی و Checksum برنامه به صورت خودکار همگام می‌شوند و هیچ اخطاری مبنی بر آسیب دیدن یا دستکاری IDE نمایش داده نخواهد شد.

### 🚀 نصب و راه‌اندازی

کافیست دستور زیر را در ترمینال اجرا کنید:

```bash
npx @seyedalida/antigravity-ide-rtl
```

پس از اتمام، یک‌بار برنامه Antigravity IDE را ببندید و مجدداً باز کنید.

#### 🔄 بازگردانی به حالت اولیه (Uninstall)

اگر به هر دلیلی خواستید پچ را حذف کرده و فایل‌های اصلی برنامه را بازگردانید:

```bash
npx @seyedalida/antigravity-ide-rtl --restore
```

</div>

---

## 🤝 Acknowledgments

- **Vazirmatn Font**: Created by [Saber Rastikerdar](https://github.com/rastikerdar/vazirmatn) (صابر راستی‌کردار) under the SIL Open Font License 1.1.
- **Antigravity Standalone RTL**: For RTL support in the standalone Antigravity application, see [mmnaderi/antigravity-rtl](https://github.com/mmnaderi/antigravity-rtl).

---

## 📄 License

Released under the [MIT License](LICENSE).