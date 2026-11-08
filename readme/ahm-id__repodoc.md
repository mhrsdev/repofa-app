# RepoDoc

> Export any source code repository into a single AI-ready Markdown document.

RepoDoc is a lightweight, cross-platform utility that generates a complete Markdown representation of your project, including its directory structure and supported source files. The generated document is ideal for AI-assisted development, project documentation, code reviews, repository archiving, and knowledge sharing.

---

## Languages

* [English](#english)
* [فارسی](#فارسی)

---

<a id="english"></a>

# English

## Overview

Modern software projects often contain hundreds or thousands of files. Sharing an entire codebase for documentation, review, or AI analysis usually requires manually selecting files, removing unnecessary content, and preserving the project structure.

RepoDoc automates this process.

With a single command, RepoDoc scans your project, builds a clean directory tree, extracts supported source files, filters unnecessary content, and generates a single Markdown document ready for documentation or AI assistants.

---

## Why RepoDoc?

Large Language Models (LLMs) perform significantly better when they receive complete project context.

Instead of copying dozens of files manually, RepoDoc creates a single document containing everything required to understand your project while excluding unnecessary files.

Typical use cases include:

* AI-assisted code review
* Architecture analysis
* Project documentation
* Repository migration
* Refactoring
* Code auditing
* Knowledge sharing
* Long-term project archiving

---

## Features

| Feature              | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| Cross-platform       | Works on Linux, macOS and Windows                          |
| Bash & PowerShell    | Native scripts for each platform                           |
| Directory Tree       | Generates a clean project tree                             |
| Source Extraction    | Collects supported text-based source files                 |
| `.gitignore` Support | Automatically respects ignored files when Git is available |
| Smart Filtering      | Skips binary, Markdown and CSV files                       |
| File Size Limit      | Prevents oversized files from being exported               |
| Custom Exclusions    | Ignore any directory you choose                            |
| AI Ready             | Markdown optimized for LLMs                                |
| Zero Dependencies    | No external packages required                              |

---

## Zero Dependencies

RepoDoc does not require installing any third-party libraries, frameworks or packages.

It runs using tools already available on supported operating systems.

* Linux: Bash
* macOS: Bash
* Windows: PowerShell

If Git is installed, RepoDoc automatically respects your `.gitignore` rules. If Git is unavailable, the tool still works using its built-in filtering logic.

---

## Project Structure

```text
.
├── RepoDoc.sh
├── RepoDoc.ps1
└── README.md
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/AHM-ID/RepoDoc.git
```

Move into the project directory.

```bash
cd RepoDoc
```

On Linux or macOS make the Bash script executable.

```bash
chmod +x RepoDoc.sh
```

No additional installation is required.

---

## Usage

### Bash

```bash
./RepoDoc.sh <project-path> [excluded-directories] [max-file-size-kb]
```

Example

```bash
./RepoDoc.sh . "node_modules,dist,build,.git" 800
```

---

### PowerShell

```powershell
.\RepoDoc.ps1 `
    -TargetDir "." `
    -ExcludeDirs "node_modules,dist,build" `
    -MaxFileSizeKB 800
```

---

## Parameters

| Parameter            | Description                      |
| -------------------- | -------------------------------- |
| Project Path         | Root directory of the repository |
| Excluded Directories | Comma-separated directory list   |
| Maximum File Size    | Maximum exported file size in KB |

---

## Generated Output

RepoDoc generates

```text
code-doc.md
```

The generated document contains:

* Project information
* Generation timestamp
* Directory tree
* Relative file paths
* Source code
* Syntax-highlighted code blocks

The resulting file can be directly shared with AI assistants or used as standalone project documentation.

---

## File Filtering

RepoDoc automatically excludes:

* Binary files
* Markdown files
* CSV files
* Oversized files
* Ignored Git files (when available)

This keeps the generated document focused and clean.

---

## Supported Platforms

| Operating System | Supported |
| ---------------- | --------- |
| Linux            | ✔         |
| macOS            | ✔         |
| Windows          | ✔         |

---

## Typical Workflow

1. Run RepoDoc.
2. Generate `code-doc.md`.
3. Share the generated document with your AI assistant.
4. Receive documentation, analysis, refactoring suggestions or code reviews.

---

## Frequently Asked Questions

### Does RepoDoc modify my project?

No. It only reads files and generates a separate Markdown document.

### Does it require Git?

No.

Git is optional and only improves `.gitignore` handling.

### Does it require Python or Node.js?

No.

### Does it require any external packages?

No.

RepoDoc runs using the default shell available on your operating system.

### Can I ignore directories?

Yes.

Multiple directories can be excluded using a comma-separated list.

---

<a id="فارسی"></a>

# فارسی

## معرفی

RepoDoc یک ابزار سبک و چندسکویی است که ساختار کامل یک پروژه نرم‌افزاری و محتوای فایل‌های متنی آن را در قالب یک فایل Markdown واحد استخراج می‌کند.

هدف این پروژه ساده کردن مستندسازی، بررسی کد، اشتراک‌گذاری پروژه و آماده‌سازی Codebase برای مدل‌های هوش مصنوعی مانند ChatGPT، Claude، Gemini، Grok، DeepSeek و سایر LLMها است.

---

## چرا RepoDoc؟

در پروژه‌های واقعی معمولاً صدها یا هزاران فایل وجود دارد.

برای ارسال پروژه به یک مدل هوش مصنوعی یا تهیه مستندات، معمولاً لازم است فایل‌ها به صورت دستی انتخاب شوند، فایل‌های اضافی حذف شوند و ساختار پروژه حفظ شود.

RepoDoc تمام این مراحل را به صورت خودکار انجام می‌دهد و تنها با یک دستور، تصویری کامل از پروژه تولید می‌کند.

---

## امکانات

| قابلیت                   | توضیح                                     |
| ------------------------ | ----------------------------------------- |
| چندسکویی                 | Linux، macOS و Windows                    |
| Bash و PowerShell        | اسکریپت اختصاصی برای هر سیستم‌عامل        |
| ساختار درختی پروژه       | تولید نمای کامل پوشه‌ها                   |
| استخراج سورس             | جمع‌آوری فایل‌های متنی پروژه              |
| پشتیبانی از `.gitignore` | رعایت فایل‌های نادیده گرفته شده           |
| فیلتر هوشمند             | حذف فایل‌های باینری، Markdown و CSV       |
| محدودیت حجم فایل         | جلوگیری از ورود فایل‌های بسیار بزرگ       |
| حذف پوشه‌های دلخواه      | امکان تعریف پوشه‌های نادیده گرفته شده     |
| خروجی مناسب LLM          | فایل Markdown آماده استفاده در هوش مصنوعی |
| بدون وابستگی             | بدون نیاز به نصب ابزار یا کتابخانه جانبی  |

---

## بدون وابستگی

RepoDoc برای اجرا نیازی به نصب هیچ نرم‌افزار، کتابخانه یا پکیج اضافی ندارد.

این ابزار تنها با امکانات پیش‌فرض سیستم‌عامل اجرا می‌شود.

* Bash در Linux و macOS
* PowerShell در Windows

در صورت نصب بودن Git، قوانین فایل `.gitignore` نیز به صورت خودکار اعمال می‌شوند. در غیر این صورت RepoDoc همچنان با استفاده از منطق داخلی خود فایل‌ها را فیلتر می‌کند.

---

## ساختار پروژه

```text
.
├── RepoDoc.sh
├── RepoDoc.ps1
└── README.md
```

---

## نصب

مخزن را Clone کنید.

```bash
git clone https://github.com/AHM-ID/RepoDoc.git
```

وارد پوشه پروژه شوید.

```bash
cd RepoDoc
```

در Linux یا macOS تنها کافی است فایل Bash را قابل اجرا کنید.

```bash
chmod +x RepoDoc.sh
```

هیچ مرحله نصب دیگری وجود ندارد.

---

## نحوه استفاده

### Bash

```bash
./RepoDoc.sh <project-path> [excluded-directories] [max-file-size-kb]
```

نمونه

```bash
./RepoDoc.sh . "node_modules,dist,build,.git" 800
```

### PowerShell

```powershell
.\RepoDoc.ps1 `
    -TargetDir "." `
    -ExcludeDirs "node_modules,dist,build" `
    -MaxFileSizeKB 800
```

---

## خروجی

پس از اجرا فایل

```text
code-doc.md
```

در ریشه پروژه ایجاد می‌شود.

این فایل شامل موارد زیر است:

* اطلاعات پروژه
* زمان تولید
* ساختار پوشه‌ها
* مسیر فایل‌ها
* محتوای فایل‌های متنی
* بلوک‌های کد با Syntax Highlight

خروجی تولید شده را می‌توان مستقیماً برای مدل‌های هوش مصنوعی ارسال کرد یا به عنوان مستند کامل پروژه نگهداری نمود.

---

## فایل‌های حذف شده

به صورت پیش‌فرض موارد زیر وارد خروجی نمی‌شوند:

* فایل‌های باینری
* فایل‌های Markdown
* فایل‌های CSV
* فایل‌های بزرگ‌تر از حد تعیین شده
* فایل‌های نادیده گرفته شده توسط Git

---

## کاربردها

* تحلیل پروژه توسط هوش مصنوعی
* مستندسازی پروژه
* بازبینی کد
* Refactoring
* مهاجرت پروژه
* اشتراک‌گذاری Codebase
* آرشیو پروژه

---

## پرسش‌های متداول

**آیا RepoDoc فایل‌های پروژه را تغییر می‌دهد؟**

خیر. این ابزار فقط فایل‌ها را می‌خواند و یک فایل Markdown جدید تولید می‌کند.

**آیا Git الزامی است؟**

خیر.

**آیا نیاز به نصب Python یا Node.js دارد؟**

خیر.

**آیا نیاز به نصب کتابخانه یا ابزار جانبی دارد؟**

خیر.

**آیا می‌توان پوشه‌هایی را نادیده گرفت؟**

بله.