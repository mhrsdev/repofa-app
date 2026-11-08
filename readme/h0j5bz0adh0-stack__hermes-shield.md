<div align="center">

# 🛡️ Hermes Shield | هرمس شیلد

[![Version](https://img.shields.io/badge/Version-v1.3.0-blue.svg?style=for-the-badge)](https://github.com/h0j5bz0adh0-stack/hermes-shield)
[![Python](https://img.shields.io/badge/Python-3.8+-green.svg?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Agent](https://img.shields.io/badge/Agent-Hermes%20%7C%20Claude%20Code%20%7C%20OpenClaw-purple.svg?style=for-the-badge)](https://github.com/NousResearch/hermes-agent)

**Backup, Restore & Sync for AI Agent Configurations**
**بک‌آپ، بازیابی و همگام‌سازی تنظیمات ایجنت هوش مصنوعی**

[🇺🇸 English](#-why-hermes-shield) • [🇮🇷 فارسی](#فارسی) • [Quick Start](#-quick-start) • [Commands](#-commands)

</div>

---

## 🎯 Why Hermes Shield?

AI agents like Hermes, Claude Code, and OpenClaw store critical state locally — skills, plugins, cron jobs, memory, configuration. If you lose this, you lose weeks of work.

**Hermes Shield** gives you:
- ✅ One-command backup of everything
- ✅ AES-256 encryption (military-grade)
- ✅ Automatic versioning & cleanup
- ✅ Restore any point in time
- ✅ Diff between backups
- ✅ Cross-agent compatibility
- ✅ **Google Drive sync** — auto backup every 2 days
- ✅ **Headless server compatible** (no browser needed)

### Prerequisites

- **Python 3.8** or higher
- **pip** (usually comes with Python)
- **rclone** (optional — only for Google Drive sync)

## 🚀 Quick Start

**Option 1: Auto install (Recommended)**

```bash
curl -fsSL https://raw.githubusercontent.com/h0j5bz0adh0-stack/hermes-shield/main/install.sh | bash
```

**Option 2: Manual install**

```bash
git clone https://github.com/h0j5bz0adh0-stack/hermes-shield.git
cd hermes-shield
pip install cryptography
python3 scripts/hermes-shield.py backup
```

### Install as Hermes Skill

```bash
mkdir -p ~/.hermes/skills/devops/hermes-shield
cp SKILL.md ~/.hermes/skills/devops/hermes-shield/
cp -r scripts ~/.hermes/skills/devops/hermes-shield/
pip install cryptography
```

## 📋 Commands

| Command | Description |
|---------|-------------|
| `backup` | Create a full backup |
| `backup -l "label"` | Create a labeled backup |
| `backup -e -p PASS` | Create an encrypted backup |
| `backup -c` | Backup + upload to Google Drive |
| `restore` | Restore the latest backup |
| `restore -f FILE` | Restore from a specific file |
| `restore -t skills,config` | Restore only selected targets |
| `list` | List local backups |
| `list --cloud` | List cloud backups |
| `push` | Upload latest to Google Drive |
| `pull` | Download latest from Google Drive |
| `pull -f FILE` | Download specific from Google Drive |
| `verify FILE` | Verify backup integrity |
| `stats` | Show backup statistics |
| `config` | View configuration |
| `config set key=value` | Update a config setting |
| `connect` | Connect Google Drive (headless) |
| `setup` | Interactive setup wizard |
| `setup-auto` | Non-interactive setup (for Hermes) |
| `token <JSON>` | Apply Google Drive auth token |

## 🔒 Encryption

Uses **AES-256-CBC** with **PBKDF2** key derivation (480,000 iterations, SHA-256).

```bash
# Encrypted backup
python3 scripts/hermes-shield.py backup -e -p "my-secure-password"

# Restore
python3 scripts/hermes-shield.py restore -f backup.tar.gz
```

## ☁️ Google Drive Sync (Headless Server)

**Step 1:** Connect on your server

```bash
python3 scripts/hermes-shield.py connect
```

**Step 2:** On your laptop/phone, download rclone (no installation needed) and run:

```
rclone authorize "drive"
```

> Download rclone: https://rclone.org/downloads

**Step 3:** A browser window opens → select your Google account → Allow. It outputs a JSON token. Copy it and send here:

```bash
python3 scripts/hermes-shield.py token '{"access_token":"...","refresh_token":"...",...}'
```

**Step 4:** Enable auto backup

```bash
python3 scripts/hermes-shield.py config set cloud_enabled=true
```

## 📁 What Gets Backed Up

```
~/.hermes/
├── skills/          ✅ All skills & workflows
├── plugins/         ✅ Extensions & plugins
├── cron/            ✅ Scheduled jobs
├── memories/        ✅ Persistent memory
├── config.yaml      ✅ Main configuration
└── sessions/        ⚙️ Optional (large)
```

## 🤖 Cross-Agent Support

| Agent | Config Path | Status |
|-------|-------------|--------|
| Hermes Agent | `~/.hermes/` | ✅ Full |
| Claude Code | `~/.claude/` | ✅ Partial |
| OpenClaw | `~/.openclaw/` | ✅ Partial |
| Custom | Any path | 🔧 Configurable |

## 📊 Stats

```bash
$ python3 scripts/hermes-shield.py stats

🛡️  Hermes Shield v1.3.0 — Stats

  Local backups:    12
  Local size:       2.3 MB
  Cloud backups:    5
  Max local:        10
  Max cloud:        5
  Auto backup:      ✅ Every 48h
  Cloud sync:       ✅
  Google Drive:     ✅ Connected
  Current data:     45.2 KB
```

## 🛣️ Roadmap

- [ ] Dropbox / OneDrive support
- [ ] S3 / Cloudflare R2 remote storage
- [ ] Sync between multiple machines
- [ ] Web dashboard
- [ ] Compression level options

## 🤝 Contributing

Contributions welcome! 🐛 Report bugs • 💡 Suggest features • 🔧 Submit PRs

## 📜 License

MIT License — use freely, contribute back.

## 🙏 Credits

Built for the [Hermes Agent](https://github.com/NousResearch/hermes-agent) community.

---

<a id="فارسی"></a>

## 🇮🇷 فارسی

### معرفی

ایجنت‌های هوش مصنوعی مانند **Hermes**، **Claude Code** و **OpenClaw** تنظیمات حیاتی خود را به صورت محلی ذخیره می‌کنند — اسکیل‌ها، پلاگین‌ها، جاب‌های زمان‌بندی، حافظه و پیکربندی. در صورت از دست رفتن این اطلاعات، هفته‌ها کار از بین خواهد رفت.

**Hermes Shield** این قابلیت‌ها را ارائه می‌دهد:
- ✅ بک‌آپ کامل با **یک دستور**
- ✅ رمزنگاری **AES-256** (استاندارد نظامی)
- ✅ نسخه‌بندی خودکار و پاکسازی
- ✅ بازیابی از هر نقطه در زمان
- ✅ مقایسه دو بک‌آپ (Diff)
- ✅ سازگار با **Hermes، Claude Code، OpenClaw**
- ✅ **بک‌آپ خودکار روی Google Drive** هر ۲ روز
- ✅ **سازگار با سرورهای Headless** (بدون نیاز به مرورگر)

### پیش‌نیازها

- **Python 3.8** به بالا
- **pip** (معمولاً همراه Python نصب می‌شود)
- **rclone** (اختیاری — فقط برای اتصال Google Drive)

### نصب سریع

**روش اول: نصب خودکار (توصیه شده)**

```bash
curl -fsSL https://raw.githubusercontent.com/h0j5bz0adh0-stack/hermes-shield/main/install.sh | bash
```

**روش دوم: نصب دستی**

```bash
git clone https://github.com/h0j5bz0adh0-stack/hermes-shield.git
cd hermes-shield
pip install cryptography
python3 scripts/hermes-shield.py backup
```

### نصب به عنوان اسکیل Hermes

```bash
mkdir -p ~/.hermes/skills/devops/hermes-shield
cp SKILL.md ~/.hermes/skills/devops/hermes-shield/
cp -r scripts ~/.hermes/skills/devops/hermes-shield/
pip install cryptography
```

### دستورات

| دستور | توضیح |
|-------|-------|
| `backup` | بک‌آپ کامل |
| `backup -l "توضیحات"` | بک‌آپ با برچسب |
| `backup -e -p رمز` | بک‌آپ رمزنگاری‌شده |
| `backup -c` | بک‌آپ + آپلود به Google Drive |
| `restore` | بازیابی آخرین نسخه |
| `restore -f فایل` | بازیابی از فایل مشخص |
| `restore -t skills,config` | بازیابی بخش‌های مشخص |
| `list` | نمایش لیست بک‌آپ‌ها |
| `list --cloud` | نمایش بک‌آپ‌های ابری |
| `push` | آپلود آخرین بک‌آپ به Google Drive |
| `pull` | دانلود آخرین بک‌آپ از Google Drive |
| `verify فایل` | بررسی سلامت بک‌آپ |
| `diff A.tar.gz B.tar.gz` | مقایسه دو بک‌آپ |
| `stats` | نمایش آمار |
| `config` | نمایش تنظیمات |
| `connect` | اتصال Google Drive (سرور Headless) |
| `setup` | راه‌اندازی تعاملی |
| `setup-auto` | راه‌اندازی خودکار (برای Hermes) |
| `token <JSON>` | اعمال توکن Google Drive |

### محتوای بک‌آپ

<div dir="ltr">

```
~/.hermes/
├── skills/          ✅ اسکیل‌ها و ورک‌فلوها
├── plugins/         ✅ پلاگین‌ها
├── cron/            ✅ جاب‌های زمان‌بندی
├── memories/        ✅ حافظه پایدار
├── config.yaml      ✅ تنظیمات اصلی
└── sessions/        ⚙️ تاریخچه (اختیاری)
```

</div>

### رمزنگاری

از **AES-256** با **PBKDF2** (۴۸۰,۰۰۰ تکرار) استفاده می‌شود — همان استاندارد رمزنگاری بانک‌ها و مدیران رمز عبور.

```bash
python3 scripts/hermes-shield.py backup -e -p "رمز-امن-من"
python3 scripts/hermes-shield.py restore -f backup.tar.gz
```

### اتصال Google Drive (سرور Headless)

**مرحله ۱:** اتصال روی سرور

```bash
python3 scripts/hermes-shield.py connect
```

**مرحله ۲:** روی لپ‌تاپ/موبایل، rclone را دانلود و اجرا کنید (نیازی به نصب نیست):

```
rclone authorize "drive"
```

> لینک دانلود rclone: https://rclone.org/downloads

**مرحله ۳:** پنجره مرورگر باز می‌شود → اکانت Google خود را انتخاب کنید → Allow. یک متن JSON دریافت می‌کنید. آن را کپی و ارسال کنید:

```bash
python3 scripts/hermes-shield.py token '{"access_token":"...","refresh_token":"...",...}'
```

**مرحله ۴:** فعال‌سازی بک‌آپ خودکار

```bash
python3 scripts/hermes-shield.py config set cloud_enabled=true
```

### بک‌آپ خودکار هر ۲ روز

```bash
# crontab
0 3 */2 * * /usr/bin/python3 /path/to/hermes-shield.py backup -l "auto" -c
```

### پشتیبانی از ایجنت‌ها

| ایجنت | مسیر پیکربندی | وضعیت |
|-------|-------------|-------|
| Hermes Agent | `~/.hermes/` | ✅ کامل |
| Claude Code | `~/.claude/` | ✅ جزئی |
| OpenClaw | `~/.openclaw/` | ✅ جزئی |
| ایجنت سفارشی | هر مسیری | 🔧 قابل تنظیم |

---

<div align="center">

**⭐ Star this repo if it saved your data!**
**⭐ اگر این ابزار مفید بود، ستاره دهید!**

</div>