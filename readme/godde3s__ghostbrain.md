<div align="center">

# 🧠 Ghost Brain

**اکانت رایگان وب جیمینای → یک API واقعیِ سازگار با OpenAI و Anthropic**

همه‌چیز در **یک فایل** `GhostBrain.py` — بدون Key، بدون هزینه، بدون دردسر

[![Version](https://img.shields.io/badge/version-1.0.0-66fcf1?style=for-the-badge)]()
[![Python](https://img.shields.io/badge/python-3.10%2B-a78bfa?style=for-the-badge&logo=python&logoColor=white)]()
[![License](https://img.shields.io/badge/license-MIT-2ed573?style=for-the-badge)]()
[![Key](https://img.shields.io/badge/API%20Key-ندارد!-ff8fa3?style=for-the-badge)]()

</div>

---

## ✨ این دقیقاً چیه؟

Ghost Brain مرورگر وبِ [gemini.google.com](https://gemini.google.com) (اکانت رایگان گوگل) را به یک
**API استاندارد و محلی** تبدیل می‌کند که کیفیتش دقیقاً همان قدرت مدل‌های مرورگر است:
**Gemini 3.6 Flash ⚡ | 3.1 Pro 🧠 | 3.5 Flash-Lite 🪶**

یعنی هر برنامه‌ای که «OpenAI-compatible» یا «Anthropic-compatible» است — مخصوصاً
**ایجنت‌های کدنویسی** — بدون هیچ تغییری به آن وصل می‌شود و کد می‌نویسد، پروژه می‌سازد،
تسک حل می‌کند و تحقیق انجام می‌دهد:

| ✅ تست‌شده | پروتکل |
|---|---|
| **OpenCode** | OpenAI (`/v1/chat/completions`) |
| **OpenClaw** | OpenAI + Anthropic (هر دو) |
| **Hermes Agent** | OpenAI + Anthropic (هر دو) |
| Cline، Roo-Code، LobeChat، LangChain، AutoGen، Aider و… | OpenAI |

> 🔑 **بدون Key!** هیچ کلیدی لازم نیست — جایی که Key می‌خواهند هر چیزی بنویس (مثلاً `ghost`).
> سرور به‌صورت پیش‌فرض هیچ احراز هویتی ندارد.

---

## 🚀 شروع در ۴ گام — فقط ران کردن یک فایل

```bash
python GhostBrain.py
```

همین! وابستگی‌ها (fastapi، uvicorn، playwright و حتی مرورگر Chromium) **بار اول خودکار نصب می‌شوند.**
بعد مرورگر را باز کن: **http://127.0.0.1:8000** — داشبورد به‌شکل **ویزارد ۴ مرحله‌ای** راهنمایی‌ات می‌کند:

| گام | چی‌کار | توضیح |
|---|---|---|
| **۱️⃣ اجرا** | هیچ! | همین که این صفحه را می‌بینی یعنی سرور روشن است ✔ |
| **۲️⃣ اکانت** | «＋ افزودن اکانت جیمینای» | یک پنجره Chrome باز می‌شود → با گوگل لاگین کن → تمام. کوکی‌ها ذخیره می‌شوند و همیشه وارد می‌مانی |
| **۳️⃣ اتصال** | کانفیگ آماده را کپی کن | کانفیگ دقیق OpenCode / OpenClaw / Hermes با دکمه «📋 کپی» — فقط Paste کن |
| **۴️⃣ تست** | چت زنده از داخل صفحه | بدون حتی باز کردن ترمینال، مطمئن شو همه‌چیز کار می‌کند |

### 💪 چند اکانت = دور زدن لیمیت

هر چند اکانت گوگل که داری، دکمه «افزودن اکانت» را بزن. سیستم به‌صورت **round-robin**
بین همه‌شان می‌چرخد؛ وقتی یک اکانت لیمیت خورد (۴۲۹)، خودش می‌رود سراغ بعدی و بعد از
کول‌داون برمی‌گردد. وضعیت زندهٔ هر اکانت را در گام ۲ داشبورد می‌بینی.

---

## 🔌 اتصال ایجنت‌ها (کپی‌پیست)

Base URL همیشه این است: **`http://127.0.0.1:8000/v1`** — Key: **هر چیزی**

<details open>
<summary><b>OpenCode</b> — فایل <code>opencode.json</code></summary>

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ghost": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ghost Brain (Gemini Web)",
      "options": {
        "baseURL": "http://127.0.0.1:8000/v1",
        "apiKey": "ghost"
      },
      "models": {
        "gemini-3.6-flash":      { "name": "Gemini 3.6 Flash" },
        "gemini-3.1-pro":        { "name": "Gemini 3.1 Pro" },
        "gemini-3.5-flash-lite": { "name": "Gemini 3.5 Flash-Lite" }
      }
    }
  }
}
```
</details>

<details>
<summary><b>OpenClaw</b> — فایل <code>~/.openclaw/openclaw.json</code></summary>

```json5
{
  models: {
    mode: "merge",
    providers: {
      ghost: {
        baseUrl: "http://127.0.0.1:8000/v1",
        apiKey: "ghost",
        api: "openai-completions",   // یا "anthropic-messages" روی http://127.0.0.1:8000
        models: [
          { id: "gemini-3.6-flash",      name: "Gemini 3.6 Flash" },
          { id: "gemini-3.1-pro",        name: "Gemini 3.1 Pro" },
          { id: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash-Lite" }
        ]
      }
    }
  }
}
```
</details>

<details>
<summary><b>Hermes Agent</b> — متغیر محیطی یا تنظیمات</summary>

```bash
export OPENAI_BASE_URL=http://127.0.0.1:8000/v1
export OPENAI_API_KEY=ghost
hermes chat
```
یا در `~/.hermes/config.yaml` با پروتکل Anthropic:
```yaml
model:
  base_url: http://127.0.0.1:8000
  api_mode: anthropic_messages
```
</details>

<details>
<summary><b>تست با curl</b></summary>

```bash
curl http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-3.6-flash","messages":[{"role":"user","content":"سلام!"}]}'
```
</details>

> 💡 **نام مدل مهم نیست!** حالت پیش‌فرض «آزاد» است: هر اسم مدلی بفرستی (`gpt-4o`،
> `local`، هر چیزی) با مدل پیش‌فرض جیمینای جواب می‌گیری. سفت‌گیرش می‌خواهی؟
> `GHOST_STRICT_MODEL=1`

---

## 🤖 مدل‌ها

| شناسه مدل | مدل وب | مناسب برای |
|---|---|---|
| `gemini-3.6-flash` *(پیش‌فرض)* | **3.6 Flash** ⚡ | کار روزمرهٔ ایجنت — سریع و قوی |
| `gemini-3.1-pro` | **3.1 Pro** 🧠 | تسک‌های سخت، معماری، ریاضی |
| `gemini-3.5-flash-lite` | **3.5 Flash-Lite** 🪶 | کارهای سبک و پرتکرار |

(نسخه‌های `bean-gemini-*` و شناسه‌های قدیمی 2.5 هم alias هستند؛ مدل‌های واقعی اکانت خودت
هم خودکار در `GET /v1/models` ظاهر می‌شوند.)

## 🏆 کیفیت API واقعی — چه چیزهایی «واقعی» است؟

- **استریم SSE استاندارد** در هر دو پروتکل + **ضربان قلب** (`: ping`) هنگام فکر کردن طولانی
- **Tool Calling کامل و موازی** — `tool_calls` با id یکتا (OpenAI) و `tool_use` با `input_json_delta` (Anthropic)
- **بدون درز JSON**: پنجرهٔ sniff بایت‌های شبیه-ابزار را نگه می‌دارد، متن عادی زنده جاری می‌شود
- **تعمیر JSON خراب** (ویرگول اضافه، `True/False/None` پایتونی، گیومهٔ هوشمند)
- **خطاهای درست**: 400/404/422/429/503 با بدنهٔ قابل-پارس برای هر دو پروتکل
- **Failover خودکار قبل از استریم** + صف ورود + cooldown بعد از 429
- **max_tokens واقعی** (کلیک Stop در جیمینای) و توقف تولید هنگام قطع کلاینت
- **dedup تاریخچه** (TokenMiser) — ایجنت‌ها تاریخچهٔ بزرگ می‌فرستند، اینجا فشرده می‌شود

## ⚙️ تنظیمات (همه اختیاری)

| متغیر | پیش‌فرض | توضیح |
|---|---|---|
| `GHOST_API_KEY` | **خالی = بدون Key** | اگر ست کنی، Bearer/x-api-key اجباری می‌شود |
| `GHOST_WORKERS` | 2 | تعداد اکانت هم‌زمان هنگام اولین اجرا |
| `GHOST_PORT` | 8000 | پورت سرور |
| `GHOST_HOST` | 127.0.0.1 | برای LAN: `0.0.0.0` + `GHOST_EXTRA_HOSTS` |
| `GHOST_MAX_PROMPT` | 120000 | سقف کاراکتر پرامپت |
| `GHOST_STRICT_MODEL` | 0 | 1 = نام مدل ناشناخته 404 بدهد نه fallback |
| `GHOST_NO_BOOTSTRAP` | 0 | 1 = نصب خودکار وابستگی‌ها را خاموش کن |

## 🧪 تست‌ها

36 تست واحد + تست‌های wiring + ۱۹ تست e2e دو-پروتکه‌ای — همه سبز. ✅
(آموزش بخش‌بخش سورس در [docs/AMOOZESH-KAMEL.md](docs/AMOOZESH-KAMEL.md))

## ❓ سوال‌های پرتکرار

**در فیلد Key چی بنویسم؟** هر چیزی — مثلاً `ghost`. سرور پیش‌فرض چک نمی‌کند.

**چرا 503 با کد `needs_login` گرفتم؟** لاگین گوگل باطل شده؛ داشبورد را باز کن و در
پنجرهٔ Chrome دوباره وارد شو — بدون ری‌استارت خودش برمی‌گردد.

**ویندوز چطور؟** دابل‌کلیک روی `Run-Windows.bat` (یا همان `python GhostBrain.py`).

**رایگان؟** بله — اما این ابزار رابط وب جیمینای را اتومیت می‌کند و ممکن است با
Terms سرویس گوگل ناسازگار باشد؛ ریسک محدودسازی اکانت با خودت است.

## 📁 فایل‌ها

```
GhostBrain.py             ← همه‌چیز در همین یک فایل (هسته + سرور + داشبورد)
Run-Windows.bat           ← اجرای دابل‌کلیکی ویندوز
Run-Mac-Linux.sh          ← اجرای دابل‌کلیکی مک/لینوکس
requirements.txt          ← ۳ وابستگی (اختیاری - خودکار هم نصب می‌شوند)
ghost_routes.example.json ← روتر مدل خارجی (اختیاری)
docs/AMOOZESH-KAMEL.md    ← آموزش کامل + آموزش بخش‌بخش سورس
```

## ⚠️ امنیت

- سرور فقط روی `127.0.0.1` گوش می‌دهد و Host-check دارد (ضد DNS-rebinding).
- اگر روی LAN باز می‌کنی (`GHOST_HOST=0.0.0.0`) حتماً `GHOST_API_KEY` را ست کن.
- `Gemini_Profiles/` = کوکی‌های گوگل تو؛ هرگز commit/به‌اشتراک نگذار.

---

<div align="center">

ساخته‌شده با 💜 بر پایهٔ [RealMDstar/ghostbrain](https://github.com/RealMDstar/ghostbrain) — بازنویسی کامل v1.0.0

**MIT License** — استفاده، تغییر و توزیع آزاد است.

</div>