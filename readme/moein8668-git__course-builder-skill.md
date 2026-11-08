# Course Builder

`course-builder` یک Skill برای طراحی و ساخت دوره‌های آموزشی زنده، هدف‌محور و پروژه‌محور است.

این Skill می‌تواند از هدف یادگیری، ابزار، مهارت، محصول یا منابعی مثل متن، PDF، ویس، ویدئو، repository، لینک و مستندات رسمی یک دورهٔ کامل بسازد.

## نصب با کمک ایجنت

این لینک را به ایجنت بده و از او بخواه:

```text
Skill «course-builder» را از این GitHub repository نصب کن:
https://github.com/moein8668-git/course-builder-skill
```

ایجنت باید repository را بررسی کند، Skill را در مسیر Skills خودش نصب کند و بعد از نصب با `$course-builder` قابل‌استفاده باشد. اگر Skill نصب‌کننده در محیط فعال نبود، ایجنت می‌تواند پوشهٔ repository را در مسیر استاندارد Skills خودش قرار دهد.

## استفاده

بعد از نصب، Skill را صریحاً صدا بزن:

```text
$course-builder create یک دورهٔ کامل برای یادگیری Docker از صفر تا ساخت یک سرویس production-ready بساز.
```

حالت‌های اصلی:

- `Create`: ساخت دوره از صفر؛
- `Extend`: ادامه و تکمیل دورهٔ موجود؛
- `Audit`: بررسی کمبودها و کیفیت دوره؛
- `Adapt`: شخصی‌سازی مسیر بر اساس پیشرفت و خطاهای دانشجو.

نمونهٔ استفاده با منبع ورودی:

```text
$course-builder
از این PDF و این ویدئوی کلاس یک دورهٔ SQL بساز. سرفصل‌ها را از محتوای واقعی منابع استخراج کن، prerequisiteهای جاافتاده را اضافه کن و اگر پروژهٔ نهایی مشخص نیست، دو capstone مناسب پیشنهاد بده.
```

## چه چیزی تولید می‌کند؟

- درسنامهٔ کامل و قابل‌مطالعه مثل کتاب؛
- مثال‌های runnable با ورودی و خروجی مشخص؛
- پروژهٔ هر درس با README دقیق و بدون جواب؛
- starter و قرارداد تست؛
- cheatsheet، lecture note و نکات خطاهای رایج؛
- پروژه‌های synthesis و capstone؛
- حافظهٔ learner، pitfall و spaced retrieval؛
- Quality Gate و validator ساختاری.

## قرارداد نقش‌ها

- **Author** محتوای دوره و وضعیت آماده‌بودن آن را می‌سازد؛
- **Mentor** تمرین دانشجو، evidence، progress، pitfall و retrieval را مدیریت می‌کند.

آماده‌بودن درس با پاس‌شدن آن توسط دانشجو یکی نیست. Skill این دو وضعیت را جدا نگه می‌دارد.

## منابع اصلی داخل Skill

- `SKILL.md`: router و قوانین مشترک؛
- `references/course-design.md`: طراحی مسیر و دریافت منابع؛
- `references/content-contracts.md`: قرارداد درس، پروژه، starter و تست؛
- `references/state-and-roles.md`: نقش‌ها، حافظه و حلقهٔ Mentor؛
- `references/validation.md`: ممیزی و Quality Gate؛
- `assets/templates/`: templateهای scaffold؛
- `scripts/validate_course.py`: validator دوره.

## نکتهٔ سازگاری

برای repositoryهای جدید، ساختار `.course/` و `AGENTS.md` پیشنهاد می‌شود. Skill در repositoryهای موجود ساختار فعلی مثل `.agent/` و `AGENT.md` را حفظ می‌کند و بدون درخواست صریح migration انجام نمی‌دهد.

## مجوز

این Skill برای استفادهٔ شخصی و توسعهٔ دوره‌های آموزشی منتشر شده است. قبل از استفاده در پروژهٔ تجاری، وضعیت مجوز repository را بررسی کنید.