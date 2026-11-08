<div align="center">

# ⚡ NEXOUYA

**بات تلگرامی آپلود و اشتراک‌گذاری فایل مبتنی بر Cloudflare Workers + Cloudflare D1**

![Telegram](https://img.shields.io/badge/Telegram-Bot%20API-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Database](https://img.shields.io/badge/Cloudflare-D1-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

</div>

---

## 📌 درباره پروژه

**NEXOUYA** یک بات تلگرامی برای آپلود فایل و ساخت لینک دریافت امن است.  
این بات فایل‌ها را در یک **کانال خصوصی تلگرام** ذخیره می‌کند و برای هر فایل یک **لینک اختصاصی با توکن تصادفی** می‌سازد.

هسته پروژه به‌صورت یک فایل واحد `worker.js` روی **Cloudflare Workers** اجرا می‌شود و برای ذخیره‌سازی اطلاعات از **Cloudflare D1** استفاده می‌کند.

---

## ✨ امکانات

- 📤 آپلود انواع فایل: سند، ویدیو، صوت، ویس، انیمیشن و عکس
- 🔗 ساخت لینک دریافت اختصاصی با توکن تصادفی
- 📦 ذخیره‌سازی فایل‌ها در کانال خصوصی تلگرام
- 🧩 عدم نمایش منبع فایل به کاربر نهایی با استفاده از `copyMessage`
- 🔐 عضویت اجباری کانال برای هر فایل به‌صورت جداگانه
- ⏳ تنظیم انقضای لینک: بدون انقضا، ۱ ساعت، ۲۴ ساعت، ۷ روز
- 📊 مشاهده آمار دانلود هر فایل
- 📂 مدیریت فایل‌های آپلودشده توسط کاربر
- 🛠 پنل مدیریتی برای Owner با دستور `/nexouya`
- 📢 شناسایی خودکار کانال ذخیره‌سازی هنگام ادمین شدن بات
- 🗄 ذخیره کاربران، فایل‌ها، کانال‌های اجباری و تنظیمات در Cloudflare D1
- 🔒 پشتیبانی از `WEBHOOK_SECRET` برای امن‌تر کردن webhook

---

## 🧠 معماری

- **Runtime:** Cloudflare Workers
- **Database:** Cloudflare D1
- **Bot API:** Telegram Bot API
- **Storage Backend:** Private Telegram Channel
- **Delivery Method:** `copyMessage`
- **Share Link Format:**

```text
https://t.me/BOT_USERNAME?start=f_TOKEN
```

---

## 🗂 ساختار پروژه

```text
nexouya/
├── worker.js        # کد اصلی بات
├── wrangler.toml    # تنظیمات Cloudflare Worker و D1 binding
├── schema.sql       # اسکیمای دیتابیس D1
├── DEPLOYMENT.md    # راهنمای کامل دیپلوی
├── README.md        # همین فایل
├── .gitignore       # فایل‌هایی که نباید وارد Git شوند
└── LICENSE          # لایسنس پروژه
```

---

## ⚠️ قبل از Deploy حتماً این‌ها را تنظیم کن

### 1. Owner ID

در فایل `worker.js` این خط وجود دارد:

```js
const OWNER_ID = YOUR_TELEGRAM_USER_ID;
```

باید آن را با **شناسه عددی تلگرام خودت** جایگزین کنی.

---

### 2. D1 Database ID

در فایل `wrangler.toml` بخش دیتابیس:

```toml
[[d1_databases]]
binding = "DB"
database_name = "nexouya-db"
database_id = "YOUR_D1_DATABASE_ID"
```

باید `database_id` را با شناسه‌ای که بعد از ساخت دیتابیس دریافت می‌کنی جایگزین کنی.

---

```

این‌ها باید با دستور `wrangler secret put` تنظیم شوند.

---

## 🚀 پیش‌نیازها

- اکانت [Cloudflare](https://dash.cloudflare.com/)
- اکانت [GitHub](https://github.com/)
- نصب [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- ساخت بات از [@BotFather](https://t.me/BotFather)
- داشتن User ID عددی تلگرام برای Owner
- یک کانال خصوصی تلگرام برای ذخیره‌سازی فایل‌ها

---

## 📦 نصب و دیپلوی

### 1. ورود به Cloudflare با Wrangler

```bash
npm install -g wrangler
wrangler login
```

---

### 2. ساخت دیتابیس D1

```bash
wrangler d1 create nexouya-db
```

بعد از اجرا، یک `database_id` به تو می‌دهد. آن را داخل `wrangler.toml` قرار بده:

```toml
[[d1_databases]]
binding = "DB"
database_name = "nexouya-db"
database_id = "YOUR_D1_DATABASE_ID"
```

---

### 3. اعمال اسکیمای دیتابیس

```bash
wrangler d1 execute nexouya-db --file=./schema.sql --remote
```

---

### 4. تنظیم Secrets

```bash
wrangler secret put BOT_TOKEN
```

سپس توکن دریافتی از BotFather را وارد کن.

```bash
wrangler secret put WEBHOOK_SECRET
```

یک رشته تصادفی بلند و امن به‌عنوان webhook secret وارد کن.

---

### 5. دیپلوی Worker

```bash
wrangler deploy
```

بعد از دیپلوی، Cloudflare یک URL مثل این به تو می‌دهد:

```text
https://nexouya.yourname.workers.dev
```

---

### 6. تنظیم Webhook تلگرام

```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "content-type: application/json" \
  -d '{
        "url": "https://nexouya.yourname.workers.dev",
        "secret_token": "YOUR_WEBHOOK_SECRET",
        "allowed_updates": ["message", "callback_query", "my_chat_member"]
      }'
```

به جای:

- `<BOT_TOKEN>` توکن بات را بگذار
- `YOUR_WEBHOOK_SECRET` همان secret را بگذار که در Wrangler تنظیم کردی
- آدرس Worker را با URL واقعی خودت عوض کن

---

## 📢 تنظیم کانال ذخیره‌سازی

1. یک کانال خصوصی بساز.
2. بات خودت را به کانال اضافه کن.
3. بات را ادمین کن.
4. دسترسی‌های لازم را بده:
   - Post Messages
   - Edit Messages
   - Delete Messages

بعد از ادمین شدن، بات از طریق آپدیت `my_chat_member` این اتفاق را تشخیص می‌دهد و از Owner می‌پرسد که این کانال به‌عنوان Storage Channel تنظیم شود یا نه.

---

## 🧪 تست سریع

1. به بات پیام بده:

```text
/start
```

2. یک فایل برای بات بفرست.
3. باید لینک دریافت بگیری.
4. لینک را با یک اکانت دیگر باز کن.
5. فایل باید بدون forward tag و بدون نمایش کانال ذخیره‌سازی ارسال شود.

---

## 🔐 عضویت اجباری

برای هر فایل می‌توانی از مسیر زیر عضویت اجباری فعال کنی:

```text
📦 فایل‌های من
→ انتخاب فایل
→ ⚙️ تنظیمات فایل
→ 🔐 عضویت اجباری
→ ➕ افزودن کانال
```

برای افزودن کانال یکی از این دو روش را انجام بده:

1. یک پیام از کانال را برای بات فوروارد کن.
2. یوزرنیم عمومی کانال را به شکل `@channel` ارسال کن.

### نکته مهم تلگرامی

بررسی عضویت فقط برای کانال‌هایی کار می‌کند که بات داخل آن‌ها عضو یا ادمین باشد.  
اگر بات به کانال دسترسی نداشته باشد، بررسی عضویت به‌صورت fail-closed انجام می‌شود؛ یعنی کاربر عضو تشخیص داده نمی‌شود.

---

## 🛠 متغیرها و Secrets

| نام | نوع | لازم؟ | توضیح |
|---|---|---:|---|
| `BOT_TOKEN` | Secret | بله | توکن بات تلگرام از BotFather |
| `WEBHOOK_SECRET` | Secret | به‌شدت توصیه می‌شود | جلوگیری از فراخوانی webhook توسط منابع ناشناس |
| `DB` | D1 Binding | بله | اتصال به دیتابیس Cloudflare D1 |
| `BOT_USERNAME` | Variable | اختیاری | یوزرنیم بات برای ساخت لینک |
| `BOT_ID` | Variable | اختیاری | ID عددی بات |
| `OWNER_ID` | داخل کد | بله | ID عددی مالک بات |

---

## 🧾 دستورات مهم Wrangler

### اجرای محلی

```bash
wrangler dev
```

### مشاهده لاگ‌ها

```bash
wrangler tail
```

### دیپلوی مجدد

```bash
wrangler deploy
```

### اجرای SQL روی D1

```bash
wrangler d1 execute nexouya-db --file=./schema.sql --remote
```

---

## 🐞 رفع مشکلات رایج

### خطای 403 روی Webhook

اگر Worker خطای 403 برگرداند، احتمالاً `WEBHOOK_SECRET` با secret ثبت‌شده در تلگرام یکسان نیست.

---

### بات فایل را ذخیره نمی‌کند

بررسی کن:

- کانال Storage Channel تنظیم شده باشد.
- بات داخل کانال ادمین باشد.
- بات دسترسی ارسال و حذف پیام داشته باشد.

---

### عضویت اجباری کار نمی‌کند

بررسی کن:

- بات داخل کانال موردنظر عضو یا ادمین باشد.
- کانال عمومی یا قابل access برای بات باشد.
- یوزرنیم کانال درست وارد شده باشد.

---

### دکمه کپی لینک کار نمی‌کند

دکمه‌های کپی از فیلد `copy_text` استفاده می‌کنند که مربوط به نسخه‌های جدید Bot API است. ممکن است برخی کلاینت‌های قدیمی تلگرام به‌درستی آن را نمایش ندهند.

---

## 🔒 امنیت

- Secrets را داخل کد commit نکن.
- `BOT_TOKEN` و `WEBHOOK_SECRET` را فقط با `wrangler secret put` تنظیم کن.
- اگر توکن بات لو رفت، فوراً در BotFather آن را regenerate کن.
- اگر مخزن عمومی است، ID واقعی Owner و Database ID را placeholder کن.

---

## 📄 لایسنس

این پروژه تحت لایسنس [MIT](./LICENSE) منتشر شده است.