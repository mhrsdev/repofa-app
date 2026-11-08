## 🚦 Speed Radar — Smart Traffic Violation System

A desktop application that turns a regular camera (or video file) into a smart speed radar. It tracks vehicle motion using OpenCV optical flow, estimates speed in km/h, reads license plates with OCR, and automatically sends an SMS fine notice via the Kavenegar API when a vehicle exceeds the configured speed limit.

Built with Python and Tkinter, featuring a full Persian (Farsi) interface, live camera/video preview with bounding-box overlays, a violations log with CSV export, and a built-in simulation mode for testing without a real camera.

**Key features:**
- 🎥 Real-time vehicle detection & speed estimation (background subtraction + Lucas-Kanade optical flow)
- 🔢 License plate recognition (EasyOCR / Tesseract, with graceful fallback)
- 📩 Automatic SMS fine notifications (Kavenegar SDK)
- 📊 Violation history with snapshot clips and CSV export
- 🎮 Simulation mode for demoing without hardware
- 🪟 One-click Windows installer (NSIS) and setup scripts

⚠️ **Disclaimer:** This is a demo/educational project. Speed estimates are approximate (based on pixel displacement and an assumed camera distance) and are not calibrated for legal or law-enforcement use.

---

# 🚦 رادار هوشمند کنترل سرعت

سیستم تشخیص سرعت خودرو با هوش مصنوعی، خواندن پلاک، و ارسال خودکار جریمه از طریق SMS

---

## 🚀 نصب سریع (ویندوز)

1. **Python نصب کنید** از [python.org](https://python.org) (نسخه 3.10+)
2. فایل `install.bat` را اجرا کنید
3. برای اجرا: `run.bat` یا `python main.py`

---

## ⚙️ نحوه استفاده

### حالت شبیه‌سازی (بدون دوربین)
- تیک "حالت شبیه‌سازی" را بزنید
- روی "شروع" کلیک کنید
- تخلفات تصادفی شبیه‌سازی می‌شوند

### حالت دوربین واقعی
- دوربین را به سیستم وصل کنید
- "▶ شروع (دوربین)" را بزنید

### حالت ویدیو از فایل
- "📂 باز کردن ویدیو" را بزنید و فایل MP4/AVI انتخاب کنید

---

## 📱 تنظیم SMS (کاوه‌نگار)

1. در [kavenegar.com](https://kavenegar.com) ثبت‌نام کنید
2. API Key خود را دریافت کنید
3. در بخش "تنظیمات SMS" وارد کنید
4. "ذخیره تنظیمات" را بزنید

> **توجه:** برای ارسال SMS به شماره واقعی، نیاز به اکانت کاوه‌نگار دارید. بدون API Key، تخلفات فقط در جدول ثبت می‌شوند.

---

## 🔍 نحوه کار تشخیص سرعت

- از **Optical Flow** برای ردیابی حرکت خودروها استفاده می‌کند
- سرعت بر اساس جابجایی پیکسل‌ها و "فاصله دید دوربین" محاسبه می‌شود
- **تنظیم مهم:** فاصله دید دوربین را متناسب با زاویه و ارتفاع دوربین تنظیم کنید

---

## 📋 خروجی

- تخلفات در جدول نمایش داده می‌شوند
- تصویر لحظه تخلف در پوشه `violations/` ذخیره می‌شود
- خروجی CSV با دکمه "📋 خروجی CSV" قابل دریافت است

---

## ⚠️ نیازمندی‌ها

| نرم‌افزار | نسخه | اجباری |
|-----------|------|--------|
| Python | 3.10+ | ✅ |
| opencv-python | 4.8+ | ✅ |
| Pillow | 10+ | ✅ |
| numpy | 1.24+ | ✅ |
| requests | 2.31+ | ✅ |
| easyocr | 1.7+ | برای OCR واقعی |

---

## 📁 ساختار پروژه

```
speed_radar/
├── main.py          # برنامه اصلی
├── requirements.txt # وابستگی‌ها
├── install.bat      # نصب خودکار
├── run.bat          # اجرای برنامه
├── config.json      # تنظیمات (بعد از اولین اجرا ساخته می‌شود)
└── violations/      # تصاویر تخلفات
```