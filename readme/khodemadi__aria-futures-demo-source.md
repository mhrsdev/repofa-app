# Aria Futures Demo

محیط متن‌باز Paper Trading برای قرارداد دائمی `BTCUSDT` در بازار Binance
USDⓈ-M Futures. قیمت‌ها واقعی‌اند، اما موجودی، سفارش‌ها و پوزیشن‌ها کاملاً
مجازی هستند و هیچ سفارش واقعی به صرافی ارسال نمی‌شود.

[مشاهده نسخه آنلاین](https://aria-futures-demo.ariaghat2100.chatgpt.site)

## امکانات

- قیمت زنده، تغییر و حجم ۲۴ ساعته، Mark Price، Index Price، Funding و Bid/Ask
- نمودار یک‌دقیقه‌ای BTCUSDT و دفتر سفارش‌ها
- سفارش دمو Market و Limit، پوزیشن Long و Short و اهرم 1× تا 50×
- Cross و Isolated Margin، حد سود، حد ضرر و لیکویید تخمینی
- محاسبه کارمزد Maker/Taker، سودوزیان و تاریخچه معاملات
- حساب اولیه 10,000 USDT و امکان بازنشانی حساب
- ذخیره حساب هر کاربر با ایمیل ورود ChatGPT در پایگاه‌داده Cloudflare D1
- ۱۰ اندیکاتور: SMA، EMA، Bollinger، VWAP، Ichimoku، RSI، MACD، Stochastic، ATR و OBV
- ۱۰ ابزار نمودار: نشانگر، ترندلاین، پرتو، فلش، خطوط افقی و عمودی، مستطیل، کانال موازی، فیبوناچی و خط‌کش
- توقف خودکار سفارش‌گذاری هنگام قدیمی‌شدن داده بازار

## APIهای Binance

هیچ API Key یا Secret لازم نیست. برنامه فقط endpointهای عمومی Binance را
می‌خواند:

- `GET /fapi/v1/ticker/24hr?symbol=BTCUSDT`
- `GET /fapi/v1/premiumIndex?symbol=BTCUSDT`
- `GET /fapi/v1/depth?symbol=BTCUSDT&limit=10`
- `GET /fapi/v1/klines?symbol=BTCUSDT&interval=1m&limit=180`
- WebSocketهای عمومی mark price، book ticker، aggTrade و kline یک‌دقیقه‌ای

## اجرای محلی

نیازمند Node.js نسخه 22.13 یا بالاتر:

```bash
npm ci
npm run dev
```

ورود کاربران و ذخیره ابری نسخه آنلاین به احراز هویت ChatGPT Sites و D1 binding
با نام `DB` وابسته است. مقدار `project_id` داخل `.openai/hosting.json` عمداً
با placeholder جایگزین شده و برای استقرار جدید باید با شناسه پروژه خودتان عوض شود.

## تست و ساخت

```bash
npm run build
npm run lint
npm test
```

## نکته مهم

این برنامه صرفاً آموزشی است. مدل Funding، لیکویید و کارمزد ممکن است با موتور
ریسک واقعی Binance تفاوت داشته باشد. پروژه کلید خصوصی صرافی دریافت نمی‌کند و
هیچ امکان واریز، برداشت یا معامله واقعی ندارد.

## License

MIT — see [LICENSE](LICENSE).

[telegram channel](https://t.me/WhisperEconomy)