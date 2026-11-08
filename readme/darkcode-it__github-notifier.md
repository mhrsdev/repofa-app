## GitHub Notifier

### English
- **What it does:** `GitHub Notifier` is a lightweight Flask webhook receiver that listens to GitHub repository events (stars, forks, pull requests) and forwards them to Telegram, and optionally to Discord, so you never miss important activity.
- **Why it helps:** Instead of checking GitHub manually, notifications arrive instantly in the chat tools you already use, saving time and keeping you focused.
- **How it works:**
  1. GitHub sends a webhook event to `/webhook` on this server.
  2. The app formats a human-friendly message in HTML.
  3. The message is delivered to Telegram via the Bot API and, if configured, mirrored to Discord using a webhook.
- **Setup steps:**
  1. Create a Telegram bot with BotFather and note the token.
  2. (Optional) Create a Discord webhook URL.
  3. Copy `.env.example` (or create `.env`) with:
     ```
     TELEGRAM_TOKEN=your_bot_token
     TELEGRAM_CHAT_ID=target_chat_id
     DISCORD_WEBHOOK=optional_discord_url
     ```
     You can find your chat id by running `python get_chat_id.py` after setting the token inside that helper script.
  4. Install dependencies: `python -m venv venv && source venv/bin/activate && pip install -r requirements.txt`.
  5. Run locally: `flask run` or `python app.py`. For production, use a WSGI server such as Gunicorn.
  6. In your GitHub repository, add a webhook pointing to `https://your-domain/webhook` with `application/json` content type and subscribe to the events you care about.
- **Health check:** `GET /health` returns a simple JSON payload for uptime monitoring.

### فارسی
- **قابلیت‌ها:** پروژه‌ی `GitHub Notifier` یک سرور سبک با فریم‌ورک Flask است که رویدادهای گیت‌هاب (ستاره، فورک، پول‌ریکوئست) را می‌گیرد و پیام آن را به تلگرام و در صورت نیاز به دیسکورد می‌فرستد تا هیچ فعالیت مهمی را از دست ندهید.
- **مزیت:** بجای بررسی دستی گیت‌هاب، اعلان‌ها فوری در پیام‌رسان‌های مورد استفاده‌تان دریافت می‌شوند و زمان شما را آزاد می‌کنند.
- **نحوه‌ی کار:** گیت‌هاب رویداد را به مسیر `/webhook` می‌فرستد، پیام فرمت می‌شود و از طریق API تلگرام و وبهوک دیسکورد ارسال می‌گردد.
- **مراحل راه‌اندازی:**
  1. با BotFather یک ربات تلگرام بسازید و توکن را بردارید.
  2. (اختیاری) یک وبهوک دیسکورد ایجاد کنید.
  3. فایل `.env` را با مقادیر زیر بسازید:
     ```
     TELEGRAM_TOKEN=توکن_ربات
     TELEGRAM_CHAT_ID=شناسه_چت
     DISCORD_WEBHOOK=آدرس_اختیاری_دیسکورد
     ```
     برای یافتن `TELEGRAM_CHAT_ID` می‌توانید پس از قرار دادن توکن در فایل `get_chat_id.py`، آن را اجرا کنید.
  4. وابستگی‌ها را نصب کنید: `python -m venv venv && source venv/bin/activate && pip install -r requirements.txt`.
  5. اجرا: `python app.py` یا در محیط تولید از Gunicorn استفاده کنید.
  6. در تنظیمات ریپوی گیت‌هاب، یک وبهوک با آدرس `https://دامنه-شما/webhook` و نوع `application/json` اضافه کنید و رویدادهای مورد نیاز را انتخاب نمایید.
- **بررسی سلامت:** مسیر `GET /health` برای مانیتورینگ آماده است.