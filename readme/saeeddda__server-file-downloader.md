# Server File Downloader

دانلود دسته‌ای فایل از URL به مسیر مشخص روی سرور، با احراز هویت و نمایش پیشرفت.

## ساختار

```
├── index.php              # مسیریاب صفحات
├── .env / .env.example    # تنظیمات و حساب ادمین
├── api/download.php       # API دانلود (SSE)
├── src/                   # هسته (Env, Auth, Downloader)
├── views/                 # صفحات HTML
├── assets/css|js          # استایل و اسکریپت
└── storage/               # کاربران ثبت‌نام‌شده (اختیاری)
```

## راه‌اندازی

1. فایل `.env.example` را به `.env` کپی کنید (اگر نیست).
2. مقادیر زیر را تنظیم کنید:

```env
AUTH_USERNAME=admin
AUTH_PASSWORD=your-strong-password
DOWNLOAD_BASE_PATH=/mnt/music-s3/music-server
ALLOW_REGISTER=false
```

3. وب‌سرور را روی ریشه پروژه تنظیم کنید تا `index.php` اجرا شود.

## صفحات

- ورود: `index.php?page=login`
- ثبت‌نام: `index.php?page=register` (فقط اگر `ALLOW_REGISTER=true`)
- دانلود: `index.php` یا `index.php?page=home`

حساب اصلی همیشه از `.env` خوانده می‌شود. با فعال بودن ثبت‌نام، کاربران اضافه در `storage/users.json` ذخیره می‌شوند.