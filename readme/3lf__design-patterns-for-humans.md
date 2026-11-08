<div dir="rtl">

![Design Patterns For Humans](images/poster.png)

---

<h3 dir="rtl" align="center">
🎉 توضیح ساده دیزاین پترن‌ها ! 🎉
</h3>

<p dir="rtl" align="center">
فهمیدن دیزاین پترن‌ها از اون موضوع‌هاست که ذهن رو به چالش می‌کشه.
 اینجا سعی می‌کنم با مثال‌های ساده از دنیای واقعی و دنیای کد ، اونو راحت وارد ذهنت کنم.
</p>

---

منبع اصلی این ریپازیتوری [این](https://github.com/rommel-sunga/design-patterns-for-humans-python) ریپازیتوری هست که
خودش نسخه پایتونیزه شده [این](https://github.com/kamranahmedse/design-patterns-for-humans) ریپازیتوریه.

در ترجمه، تعاریف و مثال‌ها از منابع مختلف فارسی و انگلیسی استفاده شده تا بهترین نتیجه حاصل بشه :)


</div>

---


<div dir="rtl">

<!-- TOC -->

<details open>
<summary><b>فهرست سریع</b></summary>

<br>

| دسته‌بندی | دیزاین پترن‌ها |
| --- | --- |
| 🧱 **اصول SOLID** | [🧱 اصول SOLID (SOLID Principles)](#اصول-solid-solid-principles-)<br>[تک‌مسئولیتی (SRP)](#۱-اصل-تک‌مسئولیتی-single-responsibility-principle-srp-)<br>[باز/بسته (OCP)](#۲-اصل-بازبسته-openclosed-principle-ocp-)<br>[جایگزینی لیسکوف (LSP)](#۳-اصل-جایگزینی-لیسکوف-liskov-substitution-principle-lsp-)<br>[تفکیک اینترفیس (ISP)](#۴-اصل-تفکیک-اینترفیس-interface-segregation-principle-isp-)<br>[وارونگی وابستگی (DIP)](#۵-اصل-وارونگی-وابستگی-dependency-inversion-principle-dip-) |
| 🏗️ **سازنده (Creational)** | [🏠 کارخانه ساده (Simple Factory)](#کارخانه-ساده-simple-factory-)<br>[🏭 فکتوری متد (Factory Method)](#فکتوری-متد-factory-method-)<br>[🔨 کارخانه انتزاعی (Abstract Factory)](#کارخانه-انتزاعی-abstract-factory-)<br>[👷 بیلدر (Builder)](#بیلدر-builder-)<br>[🐑 نمونه اولیه (Prototype)](#نمونه-اولیه-prototype-)<br>[💍 تک‌نمونه (Singleton)](#تک‌نمونه-singleton-) |
| 🧩 **ساختاری (Structural)** | [🔌 مبدل (Adapter)](#مبدل-adapter-)<br>[🌉 پل (Bridge)](#پل-bridge-)<br>[🌿 درختی (Composite)](#درختی-composite-)<br>[☕ دکوریتور (Decorator)](#دکوریتور-decorator-)<br>[📦 نما (Facade)](#نما-facade-)<br>[🍃 فلای‌وِیت (Flyweight)](#فلای‌وِیت-flyweight-)<br>[🎱 پراکسی (Proxy)](#پراکسی-proxy-) |
| 🎭 **رفتاری (Behavioral)** | [🔗 زنجیره مسئولیت (Chain of Responsibility)](#زنجیره-مسئولیت-chain-of-responsibility-)<br>[👮 فرمان (Command)](#فرمان-command-)<br>[🧠 مفسر (Interpreter)](#مفسر-interpreter-)<br>[➿ پیمایش‌گر (Iterator)](#پیمایش‌گر-iterator-)<br>[👽 میانجی (Mediator)](#میانجی-mediator-)<br>[💾 نقطه‌ی بازگشت (Memento)](#نقطه‌ی-بازگشت-memento-)<br>[😎 ناظر (Observer)](#ناظر-observer-)<br>[🏃 بازدیدکننده (Visitor)](#بازدیدکننده-visitor-)<br>[💡 استراتژی (Strategy)](#استراتژی-strategy-)<br>[💢 حالت (State)](#حالت-state-)<br>[📒 متد قالب (Template Method)](#متد-قالب-template-method-) |

</details>

<!-- TOC -->

</div>

---

<div dir="rtl" align="center">

# مقدمه 🚀

</div>

<div dir="rtl">

دیزاین پترن‌ها یک سری دستورالعمل برای مقابله با یک سری مشکلات رایج هستند.

اونا یک سری کلاس، پکیج یا کتابخونه نیستند که با اضافه کردنشون به پروژه‌ت جادو کنن. در عوض یک سری راه‌حل بهت می‌دن که
در شرایط خاص به مشکل نخوری.

<br>

> پس دیزاین پترن‌ها راه‌حلی برای مشکلات رایج هستن.

<br>

**ویکی‌پدیا** دیزاین پترن‌ها رو اینطوری توصیف می‌کنه:

> در مهندسی نرم‌افزار، الگوی طراحی یک راه‌حل عمومی قابل تکرار برای مشکلات متداول در زمینه طراحی نرم‌افزار است. الگوی
> طراحی، یک طراحی تمام‌شده نیست که به صورت مستقیم بتواند تبدیل به کد منبع یا ماشین شود؛ بلکه، یک توضیح یا قالب برای حل
> یک
> مسئله در شرایط مختلف است. الگوها در واقع بهترین روش ممکن هستند که یک برنامه‌نویس می‌تواند در هنگام طراحی یک برنامه
> برای
> حل مشکلاتش از آن‌ها استفاده کند.

<br>
<div dir="rtl" align="right">

## هشدار ⚠️

</div>

- الگوهای طراحی برای همه مشکلات راه‌حل ندارن.
- سعی نکن حتماً توی پروژه‌هات از اونا استفاده کنی؛ یادت باشه دیزاین پترن‌ها راه‌حلی برای مشکلاتن، نه راهی برای پیدا کردن مشکل. پس خیلی درگیرِ پیدا کردن دلیل برای استفاده ازشون نشو.
- اگه سرِ جای درست از اونا استفاده کنی، پروژه رو از مشکلات نجات می‌دی؛ در غیر این صورت قراره فاجعه به بار بیاد.

<br>
<br>

---

<div align="center">

## این راهنما رو چطوری بخونیم؟ 🧭

</div>

<div dir="rtl">

این راهنما برای کسیه که یه کم با **شیءگرایی (OOP)** آشناست (کلاس، آبجکت، ارث‌بری، اینترفیس) و می‌خواد دیزاین پترن‌ها رو بدون خشکیِ کتاب‌های دانشگاهی یاد بگیره؛ از مبتدی تا کسی که فقط دنبال یه مرور سریعه.

هر الگو رو با یه قالب ثابت پیش می‌بریم تا راحت دنبالش کنی:

*   🌍 **یه مثال از دنیای واقعی** تا حسش کنی.
*   💡 **به زبون ساده** که ته‌نشین بشه.
*   📖 **تعریف ویکی‌پدیا** (به‌همراه ترجمه فارسی) تا دقیق هم بدونی.
*   💻 **کد، توی ۱۰ زبان** (Python، JavaScript، TypeScript، Java، C#، PHP، Go، C++، Kotlin، Dart)؛ روی زبون خودت کلیک کن و بازش کن.
*   🤔 **کی به کارش ببریم؟** یه جعبه کوتاه که می‌گه کجا به دردت می‌خوره، کجا نه، و فرقش با الگوهای شبیهش چیه.

الگوها هم سه دسته‌ان: **سازنده (Creational)** درباره‌ی ساختن آبجکت‌هاست، **ساختاری (Structural)** درباره‌ی کنار هم چیدنِ کلاس‌ها و آبجکت‌ها، و **رفتاری (Behavioral)** درباره‌ی اینکه آبجکت‌ها چطور با هم حرف می‌زنن و کار رو بین خودشون تقسیم می‌کنن.

> 💡 لازم نیست همه رو یه‌جا حفظ کنی! اینجا رو مثل یه فرهنگِ لغت ببین؛ هر وقت سرِ مشکلی گیر کردی، برگرد و الگوی مناسبش رو پیدا کن.

</div>

---

<div align="center">

## اصول SOLID (SOLID Principles) 🧱

</div>

<div dir="rtl">

قبل از اینکه بریم سراغ دیزاین پترن‌ها، باید الفبای کدنویسی تمیز رو یاد بگیریم. این ۵ تا اصل (SOLID) بهت کمک می‌کنن کدی بنویسی که راحت تغییر کنه و مثل ماکارونی درهم‌پیچیده نشه! 🍝

### ۱. اصل تک‌مسئولیتی (Single Responsibility Principle, SRP) 🧙
> **قانون طلایی:** هر کلاس فقط و فقط باید **یک دلیل** برای تغییر داشته باشه.

<div align="center">
📦 <b>مثال دنیای واقعی: جعبه ابزار vs چاقوی سوئیسی</b>
</div>

فرض کن یه چاقوی سوئیسی داری که هم پیچ‌گوشتیه، هم اره، هم دربازکن. اگه اره‌ش بشکنه، باید کل چاقو رو بدی تعمیر و دیگه پیچ‌گوشتی هم نداری!
بهترین کار اینه که یه جعبه ابزار داشته باشی که توش پیچ‌گوشتی جدا و اره جدا باشه. اینطوری خرابی یکی به بقیه ربطی نداره.

💻 **توی کد یعنی چی؟**
کلاسی که هم اطلاعات یوزر رو ثبت می‌کنه، هم بهش ایمیل خوش‌آمدگویی می‌فرسته، هم لاگ می‌ندازه، اشتباهه!
*   اگه سرویس ایمیل عوض بشه -> کلاس باید تغییر کنه.
*   اگه فرمت لاگ عوض بشه -> کلاس باید تغییر کنه.
✅ **درست:** `UserRepository` برای دیتابیس، `EmailService` برای ایمیل، `Logger` برای لاگ.

---

### ۲. اصل باز/بسته (Open/Closed Principle, OCP) 🚪
> **قانون طلایی:** نرم‌افزار باید برای **توسعه باز** (Open)، اما برای **تغییر بسته** (Closed) باشه.

<div align="center">
🎮 <b>مثال دنیای واقعی: کنسول بازی</b>
</div>

تو یک پلی‌استیشن داری. وقتی بازی جدیدی (مثل GTA VI) میاد، لازم نیست کل دستگاه رو باز کنی و سیم‌کشی‌شو عوض کنی تا بازی جدید رو بخونه!
کنسول **بسته** است (سخت‌افزارش ثابت می‌مونه) اما برای **توسعه** بازه (فقط دیسک بازی جدید رو می‌ذاری توش).

💻 **توی کد یعنی چی؟**
اگه فردا مشتری گفت «حالا می‌خوام پرداخت با بیت‌کوین هم داشته باشیم»، نباید بری توی کلاس `PaymentService` و کد `if (type == 'bitcoin')` اضافه کنی (این یعنی تغییر کد قبلی ❌).
باید طوری کد زده باشی که فقط یه کلاس جدید `BitcoinPayment` بسازی و سیستم خودکار بشناستش (این یعنی توسعه ✅).

---

### ۳. اصل جایگزینی لیسکوف (Liskov Substitution Principle, LSP) 🧩
> **قانون طلایی:** کلاس فرزند باید بتونه جای کلاس پدر بشینه، بدون اینکه رفتار برنامه عوض بشه یا ارور بده.

<div align="center">
☕️ <b>مثال دنیای واقعی: دستگاه قهوه‌ساز</b>
</div>

فرض کن یه کلاس کلی داریم به اسم **«دستگاه قهوه‌ساز»** که یه دستور داره به اسم: `addMilk()` (شیر اضافه کن).
حالا میایم یه کلاس فرزند می‌سازیم به اسم **«دستگاه اسپرسوساز خالص»** (که فقط قهوه سیاه می‌ده و اصلاً مخزن شیر نداره).

اگه توی کد برنامه، هر جا که «دستگاه قهوه‌ساز» لازم داشتیم، بیایم این «اسپرسوساز» رو بذاریم، چی می‌شه؟
وقتی برنامه دستورِ `addMilk()` رو صدا بزنه، اسپرسوساز قاطی می‌کنه یا ارور می‌ده! 💥

چرا؟ چون این فرزند (اسپرسوساز) نتونست به عهد و پیمان پدرش (که قول داده بود شیر اضافه کنه) وفادار بمونه. پس **اصل جایگزینی** رو نقض کرده.

💻 **توی کد یعنی چی؟**
اگه یه کلاس `Bird` (پدر) داری که متد `fly()` داره، نباید کلاسی مثل `Penguin` (فرزند) بسازی که ازش ارث ببره ولی موقع پرواز ارور `I can't fly` بده!
چون هر جا تو کد از `Bird` استفاده کردی، باید بتونی `Penguin` هم بذاری. اگه پنگوئن پرواز نمی‌کنه، پس نباید از `Bird` (که پرواز می‌کنه) ارث ببره.

---

### ۴. اصل تفکیک اینترفیس (Interface Segregation Principle, ISP) ✂
> **قانون طلایی:** نباید کلاس‌ها رو مجبور کنیم متدهایی رو پیاده‌سازی کنن که بهشون نیاز ندارن.

<div align="center">
🍔 <b>مثال دنیای واقعی: منوی رستوران</b>
</div>

فرض کن رفتی رستوران و فقط یه «سالاد فصل» می‌خوای. اما رستوران فقط یه منوی غول‌آسا داره به اسم «سوپر منو» که توش پیتزا، کباب، سوشی و سالاد هست. گارسون مجبورت می‌کنه کل این منوی سنگین رو دستت بگیری و ورق بزنی تا برسی به سالاد.
خیلی بهتر بود اگه یه «منوی سالاد» جدا و کوچیک و سبک وجود داشت.

💻 **توی کد یعنی چی؟**
اگه یه اینترفیس گنده داری به اسم `Animal` که توش هم `fly()` داره، هم `swim()` و هم `bark()`.
حالا کلاس `Dog` مجبوره `fly()` رو هم داشته باشه (و توش خالی باشه)!
✅ **درست:** اینترفیس‌ها رو بشکنی: `Flyable`، `Swimmable`، `Barkable`. حالا سگ فقط `Barkable` و `Swimmable` رو پیاده‌سازی می‌کنه.

---

### ۵. اصل وارونگی وابستگی (Dependency Inversion Principle, DIP) 🔌
> **قانون طلایی:** به چیزهای واقعی و ملموس (Concrete) وابسته نباش، به مفاهیم کلی (Abstractions) وابسته باش.

<div align="center">
🔌 <b>مثال دنیای واقعی: دوشاخه و پریز برق</b>
</div>

لامپ اتاق تو که مستقیم به سیم‌های توی دیوار لحیم نشده، شده؟ معلومه که نه!
چون اگه اینطوری بود، هر بار که می‌خواستی یه سشوار به برق بزنی یا لامپ رو عوض کنی، باید دیوار رو خراب می‌کردی و سیم‌کشی رو تغییر می‌دادی. 🧱
به جاش چی داریم؟ «پریز برق». پریز یه استاندارد (Interface) هست. سشوار و تلویزیون و لامپ، همگی فقط با پریز کار دارن و براشون اصلا مهم نیست که پشت دیوار سیم‌ها چجوری سیم‌کشی شدن.

💻 **توی کد یعنی چی؟**
کلاس `Store` نباید مستقیم بگه `new MySQLDatabase()`. چون اگه فردا بخوایم بریم روی `PostgreSQL` بیچاره می‌شیم.
کلاس `Store` باید بگه «من یه چیزی می‌خوام که `IDatabase` باشه». حالا اینکه اون پشت MySQL هست یا Mongo، برای `Store` مهم نیست.

</div>

<br>

---

<br>

<div align="center">

# الگوهای سازنده (Creational Design Patterns) 🧱

</div>

به زبون ساده:

> الگوهای طراحی سازنده، به مشکلات مربوط به ساخت آبجکت‌ها می‌پردازن.

ویکی‌پدیا:

<div dir="ltr">

> In software engineering, creational design patterns are design patterns that deal with object creation mechanisms,
> trying to create objects in a manner suitable to the situation.

</div>

خلاصه: الگوهای سازنده روش ساختِ آبجکت‌ها رو طوری مدیریت می‌کنن که برای هر موقعیت، مناسب‌ترین راه انتخاب بشه.

<br>

---

<div align="center">

## کارخانه ساده (Simple Factory) 🏠

</div>

<div align="center">
🚪 <b>مثال دنیای واقعی: کارگاه نجاری</b>
</div>

فرض کن داری یه خونه می‌سازی. برای هر اتاقی یه در لازم داری.
آیا منطقیه که برای هر در، خودت اره و تیشه برداری و شروع کنی به بریدن چوب؟ 🪚 نه! اینطوری که تو گل می‌مونی.

راه‌حل چیه؟ زنگ می‌زنی به «کارگاه نجاری» (Factory) و می‌گی: «آقا یه در چوبی با عرض ۹۰ و ارتفاع ۲۱۰ می‌خوام».
دیگه برات مهم نیست نجار چجوری چوب رو می‌بره یا از چه چسبی استفاده می‌کنه. تو فقط محصول نهایی رو تحویل می‌گیری.

💡 **به زبون ساده:**
> این پترن می‌گه: **«بی‌خیالِ `new` کردنِ مستقیم شو! ساختن آبجکت رو بسپار به یه متد مخصوص.»**
> اینطوری کدت تمیز می‌مونه و اگه فردا خواستی روش ساخت در رو عوض کنی، فقط همون کارگاه رو تغییر می‌دی، نه کل خونه رو.

ویکی‌پدیا:

<div dir="ltr">

> In object-oriented programming (OOP), a factory is an object for creating other objects – formally a factory is a
> function or method that returns objects of a varying prototype or class from some method call, which is assumed to
> be "
> new".

</div>

خلاصه‌ش به زبون خودمون: «کارخانه» یه آبجکته که کارش ساختن آبجکت‌های دیگه‌ست.
یعنی به‌جای اینکه خودت مستقیم `new` بزنی، یه متد صدا می‌زنی و اون برات نمونه‌ی آماده رو تحویل می‌ده.

**مثال برنامه‌نویسی**

توی این مثال دقیقاً همون سناریوی در و کارگاه رو پیاده‌سازی می‌کنیم.
اول یه اینترفیس `Door` داریم، بعد پیاده‌سازی `WoodenDoor`، و در نهایت `DoorFactory` که برامون در می‌سازه.

<details>
<summary>Python</summary>

<div dir="ltr">

```python
from abc import ABC, abstractmethod


class Door(ABC):
    @abstractmethod
    def getWidth(self):
        ...

    @abstractmethod
    def getHeight(self):
        ...


class WoodenDoor(Door):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def getWidth(self):
        return self.width

    def getHeight(self):
        return self.height


class DoorFactory:
    @staticmethod
    def makeDoor(width, height):
        return WoodenDoor(width, height)


# ----------------------------
door = DoorFactory.makeDoor(90, 210)
print(door.getHeight())
print(door.getWidth())
```

</div>

</details>

<details>
<summary>Typescript</summary>

<div dir="ltr">

```typescript
interface Door {
    getWidth(): number;
    getHeight(): number;
}

class WoodenDoor implements Door {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
}

class DoorFactory {
    static makeDoor(width: number, height: number): Door {
        return new WoodenDoor(width, height);
    }
}

// ----------------------------

const door: Door = DoorFactory.makeDoor(90, 210);
console.log(door.getHeight());
console.log(door.getWidth());
```

</div>

</details>

<details>
<summary>JavaScript</summary>

<div dir="ltr">

```javascript
class Door {
    getWidth() {
        throw new Error("not implemented");
    }

    getHeight() {
        throw new Error("not implemented");
    }
}

class WoodenDoor extends Door {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}

class DoorFactory {
    static makeDoor(width, height) {
        return new WoodenDoor(width, height);
    }
}


const door = DoorFactory.makeDoor(90, 210);
console.log(door.getHeight());
console.log(door.getWidth());
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;

public interface IDoor
{
    int GetHeight();
    int GetWidth();
}

public class WoodenDoor : IDoor
{
    private int Height { get; set; }
    private int Width { get; set; }

    public WoodenDoor(int width, int height)
    {
        this.Width = width;
        this.Height = height;
    }

    public int GetHeight()
    {
        return this.Height;
    }
    public int GetWidth()
    {
        return this.Width;
    }
}

public static class DoorFactory
{
    public static IDoor MakeDoor(int width, int height)
    {
        return new WoodenDoor(width, height);
    }
}


// ----------------------------

var door = DoorFactory.MakeDoor(90, 210);
Console.WriteLine(door.GetHeight());
Console.WriteLine(door.GetWidth());
```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php
interface DoorInterface {
    public function getHeight();
    public function getWidth();
}

class WoodenDoor implements DoorInterface {
    private $width;
    private $height;

    public function __construct($width, $height) {
        $this->width = $width;
        $this->height = $height;
    }

    public function getHeight() {
        return $this->height;
    }
    public function getWidth() {
        return $this->width;
    }
}

class DoorFactory {
    public static function makeDoor($width, $height) {
        return new WoodenDoor($width, $height);
    }
}

$door = DoorFactory::makeDoor(90, 210);
echo $door->getHeight() . "\n";
echo $door->getWidth() . "\n";

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go
package main

import "fmt"

type Door interface {
	getHeight() int
	getWidth() int
}

type WoodenDoor struct {
	width  int
	height int
}

func NewWoodenDoor(width, height int) *WoodenDoor {
	return &WoodenDoor{width: width, height: height}
}

func (w *WoodenDoor) getHeight() int {
	return w.height
}

func (w *WoodenDoor) getWidth() int {
	return w.width
}

type DoorFactory struct{}

func (df *DoorFactory) makeDoor(width, height int) Door {
	return NewWoodenDoor(width, height)
}

func main() {
	doorFactory := &DoorFactory{}
	door := doorFactory.makeDoor(90, 210)
	fmt.Println(door.getHeight())
	fmt.Println(door.getWidth())
}

```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
public interface Door {
    int getHeight();
    int getWidth();
}

public class WoodenDoor implements Door {
    private int width;
    private int height;

    public WoodenDoor(int width, int height) {
        this.width = width;
        this.height = height;
    }

    public int getHeight() {
        return height;
    }
    public int getWidth() {
        return width;
    }
}

public class DoorFactory {
    public static Door makeDoor(int width, int height) {
        return new WoodenDoor(width, height);
    }
}

// ----------------------------

Door door = DoorFactory.makeDoor(90, 210);
System.out.println(door.getHeight());
System.out.println(door.getWidth());
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>

// Door interface
class Door {
public:
    virtual ~Door() = default;
    virtual int getWidth() const = 0;
    virtual int getHeight() const = 0;
};

// Wooden door implementation
class WoodenDoor : public Door {
private:
    int width;
    int height;

public:
    WoodenDoor(int width, int height)
        : width(width), height(height) {}

    int getWidth() const override {
        return width;
    }

    int getHeight() const override {
        return height;
    }
};

// Door factory
class DoorFactory {
public:
    static Door* makeDoor(int width, int height) {
        return new WoodenDoor(width, height);
    }
};

// Usage
int main() {
    Door* door = DoorFactory::makeDoor(90, 210);
    std::cout << door->getHeight() << std::endl;
    std::cout << door->getWidth() << std::endl;

    delete door;
    return 0;
}
```

</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
interface Door {
    fun getWidth(): Int
    fun getHeight(): Int
}

class WoodenDoor(private val width: Int, private val height: Int) : Door {
    override fun getWidth(): Int = width
    override fun getHeight(): Int = height
}

object DoorFactory {
    fun makeDoor(width: Int, height: Int): Door {
        return WoodenDoor(width, height)
    }
}

// ----------------------------

fun main() {
    val door = DoorFactory.makeDoor(90, 210)
    println(door.getHeight())
    println(door.getWidth())
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
abstract class Door {
  int getWidth();
  int getHeight();
}

class WoodenDoor implements Door {
  final int width;
  final int height;

  WoodenDoor(this.width, this.height);

  @override
  int getWidth() => width;

  @override
  int getHeight() => height;
}

class DoorFactory {
  static Door makeDoor(int width, int height) {
    return WoodenDoor(width, height);
  }
}

// ----------------------------

void main() {
  var door = DoorFactory.makeDoor(90, 210);
  print(door.getHeight());
  print(door.getWidth());
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ وقتی ساختن یه آبجکت چند خط مقدمه‌چینی داره و نمی‌خوای این شلوغی همه‌جای کدت پخش شه، بسپارش به یه فکتوری متد؛ ❌ اگه فقط یه `new` ساده‌ست، الکی پیچیده‌ش نکن.
> 🪤 **دام رایج:** کم‌کم همه‌چی رو می‌ریزی توی یه `makeDoor` غول‌پیکر پر از `if`/`else`؛ همون‌جاست که باید بری سراغ الگوهای جدی‌تر.
> 🔗 **فرقش با [فکتوری متد](#فکتوری-متد-factory-method-):** اینجا یه متد ساده‌ی (معمولاً static) خودش تصمیم می‌گیره چی بسازه؛ توی فکتوری متد، تصمیمِ ساخت رو به زیرکلاس‌ها واگذار می‌کنی.


<br>

---

<div align="center">

## فکتوری متد (Factory Method) 🏭

</div>

<div align="center">
👔 <b>مثال دنیای واقعی: مدیر استخدام</b>
</div>

فرض کن یه مدیر استخدام (`HiringManager`) داریم. فرآیند استخدام توی این شرکت یه قانون کلی داره:
۱. مصاحبه‌کننده رو انتخاب کن.
۲. ازش بخواه سوال بپرسه.

اما نکته اینجاست: مدیر استخدامِ کل، خودش نمی‌دونه برای هر پوزیشن چه سوالای تخصصی‌ای باید پرسیده بشه یا چه کسی صلاحیت داره. پس چی‌کار می‌کنه؟ ساختن «مصاحبه‌کننده» رو می‌سپاره به مدیرهای هر بخش.

*   اگه استخدام برای بخش **فنی** باشه، مدیر فنی (`DevelopmentManager`) میاد و یه **برنامه‌نویس** (`Developer`) رو می‌سازه تا سوالای فنی بپرسه.
*   اگه استخدام برای بخش **مارکتینگ** باشه، مدیر مارکتینگ (`MarketingManager`) میاد و یه **بازاریاب** (`CommunityExecutive`) رو می‌سازه.

پس «فرآیند کلی مصاحبه» ثابته، اما اینکه «کی قراره سوال بپرسه» (یا همون ساختن آبجکت مصاحبه‌کننده) رو می‌سپاریم به زیرکلاس‌ها.

💡 **به زبون ساده:**
> این پترن می‌گه: **«من (کلاس پدر) منطق کلی کار رو می‌دونم، اما ساختن ابزار دقیقش (آبجکت) رو می‌سپارم به بچه‌هام (کلاس‌های فرزند).»**

ویکی‌پدیا:

<div dir="ltr">

> In class-based programming, the factory method pattern is a creational pattern that uses factory methods to deal with
> the problem of creating objects without having to specify the exact class of the object that will be created. This is
> done by creating objects by calling a factory method, either specified in an interface and implemented by child
> classes,
> or implemented in a base class and optionally overridden by derived classes, rather than by calling a constructor.

</div>

خلاصه‌ش این می‌شه: به‌جای اینکه مستقیم با `new` یه آبجکت بسازی، یه متد مخصوص ساخت (همون فکتوری متد) صداش می‌زنی. این متد یا توی یه اینترفیس تعریف شده و فرزندها پیاده‌سازیش می‌کنن، یا توی کلاس پدر یه نسخه پیش‌فرض داره و فرزندها در صورت نیاز بازنویسیش می‌کنن. این‌جوری کدِ پدر لازم نیست بدونه دقیقاً داره کدوم کلاس رو می‌سازه.

**مثال برنامه‌نویسی**

بیا از مثال مدیر استخدام برای درک بهتر استفاده کنیم.

پس اول یک اینترفیس برای مصاحبه کننده‌ها می‌سازیم و چند پیاده‌سازی هم برای اون ایجاد می‌کنیم.

بعد از اون `HiringManager` رو پیاده‌سازی می‌کنیم

در نهایت هر فرزند می‌تونه ازش ارث بری کنه و متد `makeInterviewer` خودش رو داشته باشه:

<details>
<summary>Python</summary>

<div dir="ltr">

```python
class Interviewer:
    def askQuestions(self):
        pass


class Developer(Interviewer):
    def askQuestions(self):
        print('Asking about design patterns!')


class CommunityExecutive(Interviewer):
    def askQuestions(self):
        print('Asking about community building')


class HiringManager:
    def makeInterviewer(self):
        pass

    def takeInterview(self):
        interviewer = self.makeInterviewer()
        interviewer.askQuestions()


class DevelopmentManager(HiringManager):
    def makeInterviewer(self):
        return Developer()


class MarketingManager(HiringManager):
    def makeInterviewer(self):
        return CommunityExecutive()


# ----------------------------

devManager = DevelopmentManager()
devManager.takeInterview()

marketingManager = MarketingManager()
marketingManager.takeInterview()
```

</div>

</details>

<details>
<summary>Typescript</summary>

<div dir="ltr">

```typescript
interface Interviewer {
  askQuestions(): void;
}

class Developer implements Interviewer {
  askQuestions(): void {
    console.log("Asking about design patterns!");
  }
}

class CommunityExecutive implements Interviewer {
  askQuestions(): void {
    console.log("Asking about community building");
  }
}

abstract class HiringManager {
  abstract makeInterviewer(): Interviewer;

  takeInterview(): void {
    let interviewer = this.makeInterviewer();
    interviewer.askQuestions();
  }
}

class DevelopmentManager extends HiringManager {
  makeInterviewer(): Developer {
    return new Developer();
  }
}

class MarketingManager extends HiringManager {
  makeInterviewer(): CommunityExecutive {
    return new CommunityExecutive();
  }
}

let devManager = new DevelopmentManager();
devManager.takeInterview();

let marketingManager = new MarketingManager();
marketingManager.takeInterview();
```

</div>

</details>

<details>
<summary>JavaScript</summary>

<div dir="ltr">

```javascript
class Developer {
    askQuestions() {
        console.log("Asking about design patterns!");
    }
}

class CommunityExecutive {
    askQuestions() {
        console.log("Asking about community building");
    }
}

class HiringManager {
    takeInterview() {
        const interviewer = this.makeInterviewer();
        interviewer.askQuestions();
    }
}

class DevelopmentManager extends HiringManager {
    makeInterviewer() {
        return new Developer();
    }
}

class MarketingManager extends HiringManager {
    makeInterviewer() {
        return new CommunityExecutive();
    }
}

const devManager = new DevelopmentManager();
devManager.takeInterview();

const marketingManager = new MarketingManager();
marketingManager.takeInterview();

```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;


interface IInterviewer
{
    void AskQuestions();
}

class Developer : IInterviewer
{
    public void AskQuestions()
    {
        Console.WriteLine("Asking about design patterns!");
    }
}

class CommunityExecutive : IInterviewer
{
    public void AskQuestions()
    {
        Console.WriteLine("Asking about community building");
    }
}

abstract class HiringManager
{
    // Factory method
    abstract protected IInterviewer MakeInterviewer();
    public void TakeInterview()
    {
        var interviewer = this.MakeInterviewer();
        interviewer.AskQuestions();
    }
}

class DevelopmentManager : HiringManager
{
    protected override IInterviewer MakeInterviewer()
    {
        return new Developer();
    }
}

class MarketingManager : HiringManager
{
    protected override IInterviewer MakeInterviewer()
    {
        return new CommunityExecutive();
    }
}


// ----------------------------

var devManager = new DevelopmentManager();
devManager.TakeInterview(); //Output : Asking about design patterns!

var marketingManager = new MarketingManager();
marketingManager.TakeInterview();//Output : Asking about community building

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php
interface InterviewerInterface
{
    public function askQuestions();
}

class Developer implements InterviewerInterface
{
    public function askQuestions()
    {
        echo "Asking about design patterns!\n";
    }
}

class CommunityExecutive implements InterviewerInterface
{
    public function askQuestions()
    {
        echo "Asking about community building\n";
    }
}

abstract class HiringManager
{
    // Factory method
    abstract protected function makeInterviewer(): InterviewerInterface;

    public function takeInterview()
    {
        $interviewer = $this->makeInterviewer();
        $interviewer->askQuestions();
    }
}

class DevelopmentManager extends HiringManager
{
    protected function makeInterviewer(): InterviewerInterface
    {
        return new Developer();
    }
}

class MarketingManager extends HiringManager
{
    protected function makeInterviewer(): InterviewerInterface
    {
        return new CommunityExecutive();
    }
}


// Usage
$devManager = new DevelopmentManager();
$devManager->takeInterview(); // Output: Asking about design patterns!

$marketingManager = new MarketingManager();
$marketingManager->takeInterview(); // Output: Asking about community building

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go
package main

import "fmt"

type Interviewer interface {
	AskQuestions()
}

type Developer struct{}

func (d *Developer) AskQuestions() {
	fmt.Println("Asking about design patterns!")
}

type CommunityExecutive struct{}

func (ce *CommunityExecutive) AskQuestions() {
	fmt.Println("Asking about community building")
}

// HiringManager نقش کلاس پدر رو داره: takeInterview فقط یک‌بار اینجا تعریف می‌شه.
// تنها چیزی که توی هر مدیر فرق می‌کنه، فکتوری متد‌ی makeInterviewer هست.
type HiringManager struct {
	makeInterviewer func() Interviewer
}

func (hm *HiringManager) TakeInterview() {
	interviewer := hm.makeInterviewer()
	interviewer.AskQuestions()
}

type DevelopmentManager struct {
	HiringManager
}

func NewDevelopmentManager() *DevelopmentManager {
	return &DevelopmentManager{
		HiringManager{makeInterviewer: func() Interviewer { return &Developer{} }},
	}
}

type MarketingManager struct {
	HiringManager
}

func NewMarketingManager() *MarketingManager {
	return &MarketingManager{
		HiringManager{makeInterviewer: func() Interviewer { return &CommunityExecutive{} }},
	}
}

func main() {
	devManager := NewDevelopmentManager()
	devManager.TakeInterview() // Output: Asking about design patterns!

	marketingManager := NewMarketingManager()
	marketingManager.TakeInterview() // Output: Asking about community building
}

```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
interface Interviewer {
  void askQuestions();
}

class Developer implements Interviewer {

  @Override
  public void askQuestions() {
    System.out.println("Asking about design patterns!");
  }
}

class CommunityExecutive implements Interviewer {

  @Override
  public void askQuestions() {
    System.out.println("Asking about community building");
  }
}

abstract class HiringManager {
  abstract Interviewer makeInterviewer();
  public void takeInterview() {
    Interviewer interviewer = this.makeInterviewer();
    interviewer.askQuestions();
  }
}

class DevelopmentManager extends HiringManager {
  public Developer makeInterviewer() {
    return new Developer();
  }
}

class MarketingManager extends HiringManager {
  public CommunityExecutive makeInterviewer() {
    return new CommunityExecutive();
  }
}

// ----------------------------

DevelopmentManager devManager = new DevelopmentManager();
devManager.takeInterview();

MarketingManager marketingManager = new MarketingManager();
marketingManager.takeInterview();
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>
#include <memory>

// Interviewer interface
class Interviewer {
public:
    virtual ~Interviewer() = default;
    virtual void askQuestions() = 0;
};

// Developer interviewer
class Developer : public Interviewer {
public:
    void askQuestions() override {
        std::cout << "Asking about design patterns!" << std::endl;
    }
};

// Community executive interviewer
class CommunityExecutive : public Interviewer {
public:
    void askQuestions() override {
        std::cout << "Asking about community building" << std::endl;
    }
};

// Abstract hiring manager
class HiringManager {
public:
    virtual ~HiringManager() = default;
    virtual std::unique_ptr<Interviewer> makeInterviewer() = 0;
    
    void takeInterview() {
        auto interviewer = makeInterviewer();
        interviewer->askQuestions();
    }
};

// Development manager
class DevelopmentManager : public HiringManager {
public:
    std::unique_ptr<Interviewer> makeInterviewer() override {
        return std::make_unique<Developer>();
    }
};

// Marketing manager
class MarketingManager : public HiringManager {
public:
    std::unique_ptr<Interviewer> makeInterviewer() override {
        return std::make_unique<CommunityExecutive>();
    }
};

// Usage
int main() {
    DevelopmentManager devManager;
    devManager.takeInterview(); // Output: Asking about design patterns!
    
    MarketingManager marketingManager;
    marketingManager.takeInterview(); // Output: Asking about community building
    
    return 0;
}
```

</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
interface Interviewer {
    fun askQuestions()
}

class Developer : Interviewer {
    override fun askQuestions() {
        println("Asking about design patterns!")
    }
}

class CommunityExecutive : Interviewer {
    override fun askQuestions() {
        println("Asking about community building")
    }
}

abstract class HiringManager {
    abstract fun makeInterviewer(): Interviewer

    fun takeInterview() {
        val interviewer = makeInterviewer()
        interviewer.askQuestions()
    }
}

class DevelopmentManager : HiringManager() {
    override fun makeInterviewer(): Interviewer = Developer()
}

class MarketingManager : HiringManager() {
    override fun makeInterviewer(): Interviewer = CommunityExecutive()
}

// ----------------------------

fun main() {
    val devManager = DevelopmentManager()
    devManager.takeInterview()

    val marketingManager = MarketingManager()
    marketingManager.takeInterview()
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
abstract class Interviewer {
  void askQuestions();
}

class Developer implements Interviewer {
  @override
  void askQuestions() {
    print('Asking about design patterns!');
  }
}

class CommunityExecutive implements Interviewer {
  @override
  void askQuestions() {
    print('Asking about community building');
  }
}

abstract class HiringManager {
  Interviewer makeInterviewer();

  void takeInterview() {
    var interviewer = makeInterviewer();
    interviewer.askQuestions();
  }
}

class DevelopmentManager extends HiringManager {
  @override
  Interviewer makeInterviewer() => Developer();
}

class MarketingManager extends HiringManager {
  @override
  Interviewer makeInterviewer() => CommunityExecutive();
}

// ----------------------------

void main() {
  var devManager = DevelopmentManager();
  devManager.takeInterview();

  var marketingManager = MarketingManager();
  marketingManager.takeInterview();
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ وقتی کلاس پدر منطق کلی کار رو می‌دونه ولی نوع دقیقِ آبجکتی که باید ساخته بشه به زیرکلاس بستگی داره، اون تصمیم رو می‌سپاری به فرزندها؛ ❌ ولی اگه فقط یه‌جا و بر اساس یه شرط ساده آبجکت می‌سازی، یه if کوچیک یا «کارخانه ساده» کافیه و این الگو زیادی‌ست.
> 🪤 **دام رایج:** برای یه حالتِ ساده کلی زیرکلاس می‌سازی و کد رو بی‌خودی شلوغ می‌کنی؛ این الگو وقتی می‌ارزه که واقعاً چند نوع سازنده داشته باشی.
> 🔗 **فرقش با [کارخانه ساده](#کارخانه-ساده-simple-factory-):** کارخانه ساده همه‌چی رو توی یه متد با شرط جمع می‌کنه، اما اینجا ساختِ آبجکت رو به ارث‌بری و زیرکلاس‌ها می‌سپاری، پس هر نوع جدید یعنی یه زیرکلاس جدید نه دست‌کاری متدِ موجود.


<br>

---

<div align="center">

## کارخانه انتزاعی (Abstract Factory) 🔨

</div>

<div align="center">
🛠 <b>مثال دنیای واقعی: سرویس کامل نصب در</b>
</div>

بیا مثال قبلی رو کامل‌تر کنیم. فرض کن تو فقط «در» نمی‌خوای، بلکه «نصاب» هم می‌خوای.
نکته مهم اینه که اینا باید با هم **ست** باشن:
*   اگه در **چوبی** خریدی، باید **نجار** بیاد نصبش کنه.
*   اگه در **آهنی** خریدی، باید **جوشکار** بیاد.

فاجعه اونجاست که در چوبی بخری ولی جوشکار بیاد دم خونه! 🔥

اینجاست که **Abstract Factory** میاد وسط. ما به جای اینکه در و نصاب رو جدا جدا سفارش بدیم، زنگ می‌زنیم به «کارخونه محصولات چوبی». اونا هم در چوبی می‌دن، هم نجار رو می‌فرستن. اینطوری خیالمون راحته که همه چی با هم جوره.

💡 **به زبون ساده:**
> این پترن کارخونه‌ای از کارخونه‌هاست! یعنی یه کارخونه که بسته‌های کامل و هماهنگ (Products Family) رو تحویل می‌ده تا مبادا قطعات ناسازگار کنار هم قرار بگیرن.

ویکی‌پدیا:

<div dir="ltr">

> The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme
> without specifying their concrete classes

</div>

یعنی الگوی کارخانه انتزاعی بهت یه راه می‌ده که یه گروه از کارخونه‌های هم‌خانواده رو زیر یه چتر جمع کنی؛ بدون اینکه کد مصرف‌کننده بدونه پشت پرده دقیقاً کدوم کلاس واقعی داره ساخته می‌شه. کارش اینه که خانواده‌ای از محصولات سازگار رو با هم بسازه، نه تک‌تک قطعه‌ها رو جدا.

<br>

**مثال برنامه‌نویسی**

خب همون مثال ساخت خونه و نیاز به درب‌های مختلف رو ترجمه می‌کنیم.

اول باید اینترفیس درب رو بسازیم و چند پیاده‌سازی ازش ایجاد کنیم.

در مرحله بعد برای هر درب متخصص مربوطه رو ایجاد می‌کنیم.

و در مرحله آخر سراغ پیاده‌سازی دیزاین پترن‌مون می‌ریم.

برای مثال کلاس `WoodenDoorFactory` زمانی استفاده می‌شه که نیاز به درب چوبی داریم و کارش اینه که برای ایجاد آبجکت درب (که
اینجا
درب چوبی هست) از کلاس `WoodenDoor` و برای ایجاد آبجکت متخصص (که اینجا نجار هست) از `Carpenter` استفاده کنه.

این موضوع برای درب آهنی و ... هم به‌طور مشابه پیاده‌سازی می‌شه.

<details>
<summary>Python</summary>

<div dir="ltr">

```python
class Door:
    def getDescription(self):
        pass


class WoodenDoor(Door):
    def getDescription(self):
        print('I am a wooden door')


class IronDoor(Door):
    def getDescription(self):
        print('I am an iron door')


class DoorFittingExpert:
    def getDescription(self):
        pass


class Carpenter(DoorFittingExpert):
    def getDescription(self):
        print('I can only fit wooden doors')


class Welder(DoorFittingExpert):
    def getDescription(self):
        print('I can only fit iron doors')


class DoorFactory:
    def makeDoor(self):
        pass

    def makeFittingExpert(self):
        pass


class WoodenDoorFactory(DoorFactory):
    def makeDoor(self):
        return WoodenDoor()

    def makeFittingExpert(self):
        return Carpenter()


class IronDoorFactory(DoorFactory):
    def makeDoor(self):
        return IronDoor()

    def makeFittingExpert(self):
        return Welder()


# ----------------------------

woodenFactory = WoodenDoorFactory()

door = woodenFactory.makeDoor()
expert = woodenFactory.makeFittingExpert()

door.getDescription()    # Output: I am a wooden door
expert.getDescription()  # Output: I can only fit wooden doors

# ----------------------------

ironFactory = IronDoorFactory()

door = ironFactory.makeDoor()
expert = ironFactory.makeFittingExpert()

door.getDescription()    # Output: I am an iron door
expert.getDescription()  # Output: I can only fit iron doors
```

</div>

**همون‌طور که می‌بینی، می‌تونیم به‌طور مشابه با هر دو نوع درب برخورد کنیم و از این موضوع مطمئن باشیم که متخصص اشتباه برای یک
درب
انتخاب نمی‌کنیم.**

</details>

<details>
<summary>Typescript</summary>

<div dir="ltr">

```typescript
interface Door {
    getDescription(): void;
}

class WoodenDoor implements Door {
    getDescription(): void {
        console.log("I am a wooden door");
    }
}

class IronDoor implements Door {
    getDescription(): void {
        console.log("I am an iron door");
    }
}

interface DoorFittingExpert {
    getDescription(): void;
}

class Carpenter implements DoorFittingExpert {
    getDescription(): void {
        console.log("I can only fit wooden doors");
    }
}

class Welder implements DoorFittingExpert {
    getDescription(): void {
        console.log("I can only fit iron doors");
    }
}

abstract class DoorFactory {
    abstract makeDoor(): Door;

    abstract makeFittingExpert(): DoorFittingExpert;
}

class WoodenDoorFactory extends DoorFactory {
    makeDoor(): WoodenDoor {
        return new WoodenDoor();
    }

    makeFittingExpert(): Carpenter {
        return new Carpenter();
    }
}

class IronDoorFactory extends DoorFactory {
    makeDoor(): IronDoor {
        return new IronDoor();
    }

    makeFittingExpert(): Welder {
        return new Welder();
    }
}

// ----------------------------

let woodenFactory = new WoodenDoorFactory();

let door = woodenFactory.makeDoor();
let expert = woodenFactory.makeFittingExpert();

door.getDescription();   // Output: I am a wooden door
expert.getDescription(); // Output: I can only fit wooden doors

// ----------------------------

let ironFactory = new IronDoorFactory();

door = ironFactory.makeDoor();
expert = ironFactory.makeFittingExpert();

door.getDescription();   // Output: I am an iron door
expert.getDescription(); // Output: I can only fit iron doors

```

</div>

**همون‌طور که می‌بینی، می‌تونیم به‌طور مشابه با هر دو نوع درب برخورد کنیم و از این موضوع مطمئن باشیم که متخصص اشتباه برای یک
درب
انتخاب نمی‌کنیم.**

</details>

<details>
<summary>JavaScript</summary>

<div dir="ltr">

```javascript
class WoodenDoor {
    getDescription() {
        console.log("I am a wooden door");
    }
}

class IronDoor {
    getDescription() {
        console.log("I am an iron door");
    }
}

class Carpenter {
    getDescription() {
        console.log("I can only fit wooden doors");
    }
}

class Welder {
    getDescription() {
        console.log("I can only fit iron doors");
    }
}

class DoorFactory {
    makeDoor() {
        throw new Error("makeDoor() must be implemented by subclasses");
    }

    makeFittingExpert() {
        throw new Error("makeFittingExpert() must be implemented by subclasses");
    }
}

class WoodenDoorFactory extends DoorFactory {
    makeDoor() {
        return new WoodenDoor();
    }

    makeFittingExpert() {
        return new Carpenter();
    }
}

class IronDoorFactory extends DoorFactory {
    makeDoor() {
        return new IronDoor();
    }

    makeFittingExpert() {
        return new Welder();
    }
}

// ----------------------------

let woodenFactory = new WoodenDoorFactory();

let door = woodenFactory.makeDoor();
let expert = woodenFactory.makeFittingExpert();

door.getDescription();   // Output: I am a wooden door
expert.getDescription(); // Output: I can only fit wooden doors

// ----------------------------

let ironFactory = new IronDoorFactory();

door = ironFactory.makeDoor();
expert = ironFactory.makeFittingExpert();

door.getDescription();   // Output: I am an iron door
expert.getDescription(); // Output: I can only fit iron doors
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;


interface IDoor {

  void GetDescription();

}
class WoodenDoor : IDoor
{
  public void GetDescription()
  {
    Console.WriteLine("I am a wooden door");
  }
}

class IronDoor : IDoor
{
  public void GetDescription()
  {
    Console.WriteLine("I am an iron door");
  }
}

interface IDoorFittingExpert
{
  void GetDescription();
}

class Carpenter : IDoorFittingExpert
{
  public void GetDescription()
  {
    Console.WriteLine("I can only fit wooden doors");
  }
}

class Welder : IDoorFittingExpert
{
  public void GetDescription()
  {
    Console.WriteLine("I can only fit iron doors");
  }
}

interface IDoorFactory {
  IDoor MakeDoor();
  IDoorFittingExpert MakeFittingExpert();
}

// Wooden factory to return carpenter and wooden door
class WoodenDoorFactory : IDoorFactory
{
  public IDoor MakeDoor()
  {
    return new WoodenDoor();
  }

  public IDoorFittingExpert MakeFittingExpert()
  {
    return new Carpenter();
  }
}

// Iron door factory to get iron door and the relevant fitting expert
class IronDoorFactory : IDoorFactory
{
  public IDoor MakeDoor()
  {
    return new IronDoor();
  }

  public IDoorFittingExpert MakeFittingExpert()
  {
    return new Welder();
  }
}
// ----------------------------
var woodenFactory = new WoodenDoorFactory();

var woodenDoor = woodenFactory.MakeDoor();
var woodenExpert = woodenFactory.MakeFittingExpert();

woodenDoor.GetDescription();   // Output: I am a wooden door
woodenExpert.GetDescription(); // Output: I can only fit wooden doors

// ----------------------------

var ironFactory = new IronDoorFactory();

var ironDoor = ironFactory.MakeDoor();
var ironExpert = ironFactory.MakeFittingExpert();

ironDoor.GetDescription();   // Output: I am an iron door
ironExpert.GetDescription(); // Output: I can only fit iron doors

```

</div>

**همون‌طور که می‌بینی، می‌تونیم به‌طور مشابه با هر دو نوع درب برخورد کنیم و از این موضوع مطمئن باشیم که متخصص اشتباه برای یک
درب
انتخاب نمی‌کنیم.**

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php

interface DoorInterface {
  public function getDescription();
}

class WoodenDoor implements DoorInterface {
  public function getDescription() {
    echo "I am a wooden door";
  }
}

class IronDoor implements DoorInterface {
  public function getDescription() {
    echo "I am an iron door";
  }
}

interface DoorFittingExpertInterface {
  public function getDescription();
}

class Carpenter implements DoorFittingExpertInterface {
  public function getDescription() {
    echo "I can only fit wooden doors";
  }
}

class Welder implements DoorFittingExpertInterface {
  public function getDescription() {
    echo "I can only fit iron doors";
  }
}

interface DoorFactoryInterface {
  public function makeDoor(): DoorInterface;
  public function makeFittingExpert(): DoorFittingExpertInterface;
}

// Wooden factory to return carpenter and wooden door
class WoodenDoorFactory implements DoorFactoryInterface {
  public function makeDoor(): DoorInterface {
    return new WoodenDoor();
  }

  public function makeFittingExpert(): DoorFittingExpertInterface {
    return new Carpenter();
  }
}

// Iron door factory to get iron door and the relevant fitting expert
class IronDoorFactory implements DoorFactoryInterface {
  public function makeDoor(): DoorInterface {
    return new IronDoor();
  }

  public function makeFittingExpert(): DoorFittingExpertInterface {
    return new Welder();
  }
}


// Usage
$woodenFactory = new WoodenDoorFactory();

$woodenDoor = $woodenFactory->makeDoor();
$woodenExpert = $woodenFactory->makeFittingExpert();

$woodenDoor->getDescription();   // Output: I am a wooden door
echo "\n";
$woodenExpert->getDescription(); // Output: I can only fit wooden doors
echo "\n";

$ironFactory = new IronDoorFactory();

$ironDoor = $ironFactory->makeDoor();
$ironExpert = $ironFactory->makeFittingExpert();

$ironDoor->getDescription();   // Output: I am an iron door
echo "\n";
$ironExpert->getDescription(); // Output: I can only fit iron doors
echo "\n";

```

</div>

**همون‌طور که می‌بینی، می‌تونیم به‌طور مشابه با هر دو نوع درب برخورد کنیم و از این موضوع مطمئن باشیم که متخصص اشتباه برای یک
درب
انتخاب نمی‌کنیم.**

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go

package main

import "fmt"

type IDoor interface {
	GetDescription()
}

type WoodenDoor struct{}

func (w *WoodenDoor) GetDescription() {
	fmt.Println("I am a wooden door")
}

type IronDoor struct{}

func (i *IronDoor) GetDescription() {
	fmt.Println("I am an iron door")
}

type IDoorFittingExpert interface {
	GetDescription()
}

type Carpenter struct{}

func (c *Carpenter) GetDescription() {
	fmt.Println("I can only fit wooden doors")
}

type Welder struct{}

func (w *Welder) GetDescription() {
	fmt.Println("I can only fit iron doors")
}

type IDoorFactory interface {
	MakeDoor() IDoor
	MakeFittingExpert() IDoorFittingExpert
}

type WoodenDoorFactory struct{}

func (w *WoodenDoorFactory) MakeDoor() IDoor {
	return &WoodenDoor{}
}

func (w *WoodenDoorFactory) MakeFittingExpert() IDoorFittingExpert {
	return &Carpenter{}
}

type IronDoorFactory struct{}

func (i *IronDoorFactory) MakeDoor() IDoor {
	return &IronDoor{}
}

func (i *IronDoorFactory) MakeFittingExpert() IDoorFittingExpert {
	return &Welder{}
}

func main() {
	woodenFactory := &WoodenDoorFactory{}

	woodenDoor := woodenFactory.MakeDoor()
	woodenExpert := woodenFactory.MakeFittingExpert()

	woodenDoor.GetDescription()   // Output: I am a wooden door
	woodenExpert.GetDescription() // Output: I can only fit wooden doors

	ironFactory := &IronDoorFactory{}

	ironDoor := ironFactory.MakeDoor()
	ironExpert := ironFactory.MakeFittingExpert()

	ironDoor.GetDescription()   // Output: I am an iron door
	ironExpert.GetDescription() // Output: I can only fit iron doors
}

```

</div>

**همون‌طور که می‌بینی، می‌تونیم به‌طور مشابه با هر دو نوع درب برخورد کنیم و از این موضوع مطمئن باشیم که متخصص اشتباه برای یک
درب
انتخاب نمی‌کنیم.**

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
interface Door {
    void getDescription();
}

class WoodenDoor implements Door {
    @Override
    public void getDescription() {
        System.out.println("I am a wooden door");
    }
}

class IronDoor implements Door {
    @Override
    public void getDescription() {
        System.out.println("I am an iron door");
    }
}

interface DoorFittingExpert {
    void getDescription();
}

class Carpenter implements DoorFittingExpert {
    @Override
    public void getDescription() {
        System.out.println("I can only fit wooden doors");
    }
}

class Welder implements DoorFittingExpert {
    @Override
    public void getDescription() {
        System.out.println("I can only fit iron doors");
    }
}

interface DoorFactory {
    Door makeDoor();
    DoorFittingExpert makeFittingExpert();
}

class WoodenDoorFactory implements DoorFactory {
    @Override
    public WoodenDoor makeDoor() {
        return new WoodenDoor();
    }

    @Override
    public Carpenter makeFittingExpert() {
        return new Carpenter();
    }
}

class IronDoorFactory implements DoorFactory {
    @Override
    public IronDoor makeDoor() {
        return new IronDoor();
    }

    @Override
    public Welder makeFittingExpert() {
        return new Welder();
    }
}

// ----------------------------

WoodenDoorFactory woodenFactory = new WoodenDoorFactory();
Door woodenDoor = woodenFactory.makeDoor();
DoorFittingExpert woodenExpert = woodenFactory.makeFittingExpert();

woodenDoor.getDescription();   // Output: I am a wooden door
woodenExpert.getDescription(); // Output: I can only fit wooden doors

// ----------------------------

IronDoorFactory ironFactory = new IronDoorFactory();
Door ironDoor = ironFactory.makeDoor();
DoorFittingExpert ironExpert = ironFactory.makeFittingExpert();

ironDoor.getDescription();   // Output: I am an iron door
ironExpert.getDescription(); // Output: I can only fit iron doors
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>
#include <memory>

// Door interface
class Door {
public:
    virtual ~Door() = default;
    virtual void getDescription() = 0;
};

// Wooden door
class WoodenDoor : public Door {
public:
    void getDescription() override {
        std::cout << "I am a wooden door" << std::endl;
    }
};

// Iron door
class IronDoor : public Door {
public:
    void getDescription() override {
        std::cout << "I am an iron door" << std::endl;
    }
};

// Door fitting expert interface
class DoorFittingExpert {
public:
    virtual ~DoorFittingExpert() = default;
    virtual void getDescription() = 0;
};

// Carpenter
class Carpenter : public DoorFittingExpert {
public:
    void getDescription() override {
        std::cout << "I can only fit wooden doors" << std::endl;
    }
};

// Welder
class Welder : public DoorFittingExpert {
public:
    void getDescription() override {
        std::cout << "I can only fit iron doors" << std::endl;
    }
};

// Door factory interface
class DoorFactory {
public:
    virtual ~DoorFactory() = default;
    virtual std::unique_ptr<Door> makeDoor() = 0;
    virtual std::unique_ptr<DoorFittingExpert> makeFittingExpert() = 0;
};

// Wooden door factory
class WoodenDoorFactory : public DoorFactory {
public:
    std::unique_ptr<Door> makeDoor() override {
        return std::make_unique<WoodenDoor>();
    }
    
    std::unique_ptr<DoorFittingExpert> makeFittingExpert() override {
        return std::make_unique<Carpenter>();
    }
};

// Iron door factory
class IronDoorFactory : public DoorFactory {
public:
    std::unique_ptr<Door> makeDoor() override {
        return std::make_unique<IronDoor>();
    }
    
    std::unique_ptr<DoorFittingExpert> makeFittingExpert() override {
        return std::make_unique<Welder>();
    }
};

// Usage
int main() {
    WoodenDoorFactory woodenFactory;
    auto woodenDoor = woodenFactory.makeDoor();
    auto woodenExpert = woodenFactory.makeFittingExpert();

    woodenDoor->getDescription();   // Output: I am a wooden door
    woodenExpert->getDescription(); // Output: I can only fit wooden doors

    IronDoorFactory ironFactory;
    auto ironDoor = ironFactory.makeDoor();
    auto ironExpert = ironFactory.makeFittingExpert();

    ironDoor->getDescription();   // Output: I am an iron door
    ironExpert->getDescription(); // Output: I can only fit iron doors

    return 0;
}
```
</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
interface Door {
    fun getDescription()
}

class WoodenDoor : Door {
    override fun getDescription() {
        println("I am a wooden door")
    }
}

class IronDoor : Door {
    override fun getDescription() {
        println("I am an iron door")
    }
}

interface DoorFittingExpert {
    fun getDescription()
}

class Carpenter : DoorFittingExpert {
    override fun getDescription() {
        println("I can only fit wooden doors")
    }
}

class Welder : DoorFittingExpert {
    override fun getDescription() {
        println("I can only fit iron doors")
    }
}

interface DoorFactory {
    fun makeDoor(): Door
    fun makeFittingExpert(): DoorFittingExpert
}

class WoodenDoorFactory : DoorFactory {
    override fun makeDoor(): Door = WoodenDoor()
    override fun makeFittingExpert(): DoorFittingExpert = Carpenter()
}

class IronDoorFactory : DoorFactory {
    override fun makeDoor(): Door = IronDoor()
    override fun makeFittingExpert(): DoorFittingExpert = Welder()
}

// ----------------------------

fun main() {
    val woodenFactory = WoodenDoorFactory()

    val woodenDoor = woodenFactory.makeDoor()
    val woodenExpert = woodenFactory.makeFittingExpert()

    woodenDoor.getDescription()
    woodenExpert.getDescription()

    val ironFactory = IronDoorFactory()

    val ironDoor = ironFactory.makeDoor()
    val ironExpert = ironFactory.makeFittingExpert()

    ironDoor.getDescription()
    ironExpert.getDescription()
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
abstract class Door {
  void getDescription();
}

class WoodenDoor implements Door {
  @override
  void getDescription() => print('I am a wooden door');
}

class IronDoor implements Door {
  @override
  void getDescription() => print('I am an iron door');
}

abstract class DoorFittingExpert {
  void getDescription();
}

class Carpenter implements DoorFittingExpert {
  @override
  void getDescription() => print('I can only fit wooden doors');
}

class Welder implements DoorFittingExpert {
  @override
  void getDescription() => print('I can only fit iron doors');
}

abstract class DoorFactory {
  Door makeDoor();
  DoorFittingExpert makeFittingExpert();
}

class WoodenDoorFactory implements DoorFactory {
  @override
  Door makeDoor() => WoodenDoor();

  @override
  DoorFittingExpert makeFittingExpert() => Carpenter();
}

class IronDoorFactory implements DoorFactory {
  @override
  Door makeDoor() => IronDoor();

  @override
  DoorFittingExpert makeFittingExpert() => Welder();
}

// ----------------------------

void main() {
  var woodenFactory = WoodenDoorFactory();

  var door = woodenFactory.makeDoor();
  var expert = woodenFactory.makeFittingExpert();

  door.getDescription();
  expert.getDescription();

  var ironFactory = IronDoorFactory();

  door = ironFactory.makeDoor();
  expert = ironFactory.makeFittingExpert();

  door.getDescription();
  expert.getDescription();
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ وقتی محصولاتت یه **خانواده هماهنگ** می‌سازن و باید با هم ست بمونن (مثل در چوبی + نجار)، تا یه دفعه قطعه ناجور قاطی نشه؛ ❌ وقتی فقط یه نوع محصول داری یا قرار نیست چند خانواده کنار هم زندگی کنن.
> 🪤 **دام رایج:** خانواده‌ها رو زیادی ریز می‌کنی و کلی کلاس کارخونه می‌سازی که فقط یه محصول می‌ده؛ اونجا داری بی‌خودی پیچیده‌اش می‌کنی.
> 🔗 **فرقش با [فکتوری متد](#فکتوری-متد-factory-method-):** فکتوری متد یه محصول رو می‌سازه، ولی کارخانه انتزاعی یه **خانواده کامل از محصولات مرتبط** رو با هم تحویل می‌ده.


<br>

---

<div align="center">

## بیلدر (Builder) 👷

</div>

<div align="center">
🍔 <b>مثال دنیای واقعی: ساخت ساندویچ سفارشی</b>
</div>

فرض کن رفتی ساندویچ‌فروشی که خودت مواد رو انتخاب می‌کنی (مثل Subway).
تو نمی‌گی «یه ساندویچ بده!» (چون ممکنه توش پیاز باشه و تو ازش متنفر باشی).

بلکه مرحله به مرحله می‌گی:
۱. نون باگت باشه. 🥖
۲. پنیر اضافه بزن. 🧀
۳. گوجه و خیارشور بذار. 🍅
۴. پیاز نذار! 🧅
۵. سس خردل بزن. 🌭

در نهایت ساندویچ مخصوص **خودت** ساخته می‌شه. این دقیقاً کاریه که الگوی **Builder** انجام می‌ده.

💡 **به زبون ساده:**
> دیدی بعضی وقت‌ها یه تابع سازنده (Constructor) داریم که ۱۰ تا ورودی داره و آدم گیج می‌شه کدوم به کدومه؟ 😵‍💫
> (به این مشکل می‌گن "Telescoping Constructor Anti-pattern")
>
> الگوی Builder می‌گه: **«به جای اینکه همه چیز رو یه‌جا بدی دست تابع سازنده، بیا مرحله به مرحله و تمیز آبجکت رو بسازیم.»**

برای همه ما پیش اومده که یک تابع سازنده ترسناک به این شکل ببینیم که آدم رو فراری می‌ده:


<details>
<summary>Python</summary>
<div dir="ltr">

```python
def __init__(self, size, cheese=True, mushrooms=True, tomato=False): ...
```

</div>
</details>

<details>
<summary>Typescript</summary>
<div dir="ltr">

```typescript
constructor(size: number, cheese: boolean = true, mushrooms: boolean = true, tomato: boolean = false) {}
```

</div>
</details>

<details>
<summary>JavaScript</summary>

<div dir="ltr">

```javascript
constructor(size, cheese = true, mushrooms = true, tomato = false) {}
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;


public Burger(int size, bool cheese, bool mushrooms, bool tomato)

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php

public function __construct(int $size, bool $cheese, bool $mushrooms, bool $tomato)

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go

func Burger(size int, cheese bool, mushrooms bool, tomato bool)

```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
public Burger(int size, boolean cheese, boolean mushrooms, boolean tomato)
```

</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
class Burger(size: Int, cheese: Boolean, mushrooms: Boolean, tomato: Boolean)
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
class Burger {
  Burger(int size, bool cheese, bool mushrooms, bool tomato);
}
```

</div>
</details>

در این شرایط معمولا Builder می‌تونه به دادمون برسه.

<br>

ویکی‌پدیا:

<div dir="ltr">

> The builder pattern is an object creation software design pattern with the intentions of finding a solution to the
> telescoping constructor anti-pattern.

</div>

خلاصه‌اش این می‌شه که الگوی Builder یه الگوی ساخت آبجکته که اومده تا جواب مشکل «تابع سازنده تلسکوپی (Telescoping Constructor)» رو بده؛ یعنی همون تابع سازنده‌ای که هی ورودی‌های اختیاری بهش اضافه می‌شه و قاطی‌پاتی می‌شه. به جاش، آبجکت رو قدم‌به‌قدم و خوانا می‌سازیم.

<br>

**مثال برنامه‌نویسی**

در این بخش هم می‌خوام مثال برگر رو برات ترجمه کنم.

اولین مرحله اینه که یک کلاس برگر معمولی داشته باشیم

در ادامه کلاس Builder رو براش ایجاد می‌کنیم.

<details>
<summary>Python</summary>

<div dir="ltr">

```python
class Burger:
    def __init__(self, builder):
        self.size = builder.size
        self.cheese = builder.cheese
        self.mushrooms = builder.mushrooms
        self.tomato = builder.tomato

    def get_description(self):
        return (
            f"Burger: size {self.size}, cheese: {str(self.cheese).lower()}, "
            f"mushrooms: {str(self.mushrooms).lower()}, tomato: {str(self.tomato).lower()}"
        )


class BurgerBuilder:
    def __init__(self, size):
        self.size = size
        self.cheese = False
        self.mushrooms = False
        self.tomato = False

    def add_cheese(self):
        self.cheese = True
        return self

    def add_mushrooms(self):
        self.mushrooms = True
        return self

    def add_tomato(self):
        self.tomato = True
        return self

    def build(self):
        return Burger(self)


# ----------------------------

burger = BurgerBuilder(14).add_cheese().add_mushrooms().build()

print(burger.get_description())
# Burger: size 14, cheese: true, mushrooms: true, tomato: false
```

</div>

</details>

<details>
<summary>Typescript</summary>
<div dir="ltr">

```typescript
class Burger {
    private size: number;
    private cheese: boolean;
    private mushrooms: boolean;
    private tomato: boolean;

    constructor(builder: BurgerBuilder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.mushrooms = builder.mushrooms;
        this.tomato = builder.tomato;
    }

    getDescription(): string {
        return `Burger: size ${this.size}, cheese: ${this.cheese}, ` +
            `mushrooms: ${this.mushrooms}, tomato: ${this.tomato}`;
    }
}

class BurgerBuilder {
    size: number;
    cheese: boolean = false;
    mushrooms: boolean = false;
    tomato: boolean = false;

    constructor(size: number) {
        this.size = size;
    }

    addCheese(): this {
        this.cheese = true;
        return this;
    }

    addMushrooms(): this {
        this.mushrooms = true;
        return this;
    }

    addTomato(): this {
        this.tomato = true;
        return this;
    }

    build(): Burger {
        return new Burger(this);
    }
}

// ----------------------------

const burger = new BurgerBuilder(14)
    .addCheese()
    .addMushrooms()
    .build();

console.log(burger.getDescription());
// Burger: size 14, cheese: true, mushrooms: true, tomato: false
```

</div>
</details>

<details>
<summary>JavaScript</summary>

<div dir="ltr">

```javascript
class Burger {
    constructor(builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.mushrooms = builder.mushrooms;
        this.tomato = builder.tomato;
    }

    getDescription() {
        return `Burger: size ${this.size}, cheese: ${this.cheese}, ` +
            `mushrooms: ${this.mushrooms}, tomato: ${this.tomato}`;
    }
}

class BurgerBuilder {
    constructor(size) {
        this.size = size;
        this.cheese = false;
        this.mushrooms = false;
        this.tomato = false;
    }

    addCheese() {
        this.cheese = true;
        return this;
    }

    addMushrooms() {
        this.mushrooms = true;
        return this;
    }

    addTomato() {
        this.tomato = true;
        return this;
    }

    build() {
        return new Burger(this);
    }
}

// ----------------------------

const burger = new BurgerBuilder(14)
    .addCheese()
    .addMushrooms()
    .build();

console.log(burger.getDescription());
// Burger: size 14, cheese: true, mushrooms: true, tomato: false
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;
using System.Text;

class Burger
{
  private int mSize;
  private bool mCheese;
  private bool mMushrooms;
  private bool mTomato;

  public Burger(BurgerBuilder builder)
  {
    this.mSize = builder.Size;
    this.mCheese = builder.Cheese;
    this.mMushrooms = builder.Mushrooms;
    this.mTomato = builder.Tomato;
  }

  public string GetDescription()
  {
    var sb = new StringBuilder();
    sb.Append($"Burger: size {this.mSize}, ");
    sb.Append($"cheese: {this.mCheese.ToString().ToLower()}, ");
    sb.Append($"mushrooms: {this.mMushrooms.ToString().ToLower()}, ");
    sb.Append($"tomato: {this.mTomato.ToString().ToLower()}");
    return sb.ToString();
  }
}

class BurgerBuilder {
  public int Size;
  public bool Cheese;
  public bool Mushrooms;
  public bool Tomato;

  public BurgerBuilder(int size)
  {
    this.Size = size;
  }

  public BurgerBuilder AddCheese()
  {
    this.Cheese = true;
    return this;
  }

  public BurgerBuilder AddMushrooms()
  {
    this.Mushrooms = true;
    return this;
  }

  public BurgerBuilder AddTomato()
  {
    this.Tomato = true;
    return this;
  }

  public Burger Build()
  {
    return new Burger(this);
  }
}

// ----------------------------

var burger = new BurgerBuilder(14)
                .AddCheese()
                .AddMushrooms()
                .Build();
Console.WriteLine(burger.GetDescription());
// Burger: size 14, cheese: true, mushrooms: true, tomato: false

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php
class Burger {
    private $size;
    private $cheese = false;
    private $mushrooms = false;
    private $tomato = false;

    public function __construct($builder) {
        $this->size = $builder->size;
        $this->cheese = $builder->cheese;
        $this->mushrooms = $builder->mushrooms;
        $this->tomato = $builder->tomato;
    }

    public function getDescription() {
        $cheese = $this->cheese ? 'true' : 'false';
        $mushrooms = $this->mushrooms ? 'true' : 'false';
        $tomato = $this->tomato ? 'true' : 'false';
        return "Burger: size {$this->size}, cheese: {$cheese}, "
            . "mushrooms: {$mushrooms}, tomato: {$tomato}";
    }
}

class BurgerBuilder {
    public $size;
    public $cheese = false;
    public $mushrooms = false;
    public $tomato = false;

    public function __construct($size) {
        $this->size = $size;
    }

    public function addCheese() {
        $this->cheese = true;
        return $this;
    }

    public function addMushrooms() {
        $this->mushrooms = true;
        return $this;
    }

    public function addTomato() {
        $this->tomato = true;
        return $this;
    }

    public function build() {
        return new Burger($this);
    }
}

$burger = (new BurgerBuilder(14))
            ->addCheese()
            ->addMushrooms()
            ->build();

echo $burger->getDescription() . "\n";
// Burger: size 14, cheese: true, mushrooms: true, tomato: false

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go
package main

import (
	"fmt"
)

type Burger struct {
	Size      int
	Cheese    bool
	Mushrooms bool
	Tomato    bool
}

func NewBurger(builder *BurgerBuilder) *Burger {
	return &Burger{
		Size:      builder.Size,
		Cheese:    builder.Cheese,
		Mushrooms: builder.Mushrooms,
		Tomato:    builder.Tomato,
	}
}

func (b *Burger) GetDescription() string {
	return fmt.Sprintf("Burger: size %d, cheese: %t, mushrooms: %t, tomato: %t",
		b.Size, b.Cheese, b.Mushrooms, b.Tomato)
}

type BurgerBuilder struct {
	Size      int
	Cheese    bool
	Mushrooms bool
	Tomato    bool
}

func NewBurgerBuilder(size int) *BurgerBuilder {
	return &BurgerBuilder{Size: size}
}

func (b *BurgerBuilder) AddCheese() *BurgerBuilder {
	b.Cheese = true
	return b
}

func (b *BurgerBuilder) AddMushrooms() *BurgerBuilder {
	b.Mushrooms = true
	return b
}

func (b *BurgerBuilder) AddTomato() *BurgerBuilder {
	b.Tomato = true
	return b
}

func (b *BurgerBuilder) Build() *Burger {
	return NewBurger(b)
}

func main() {
	burger := NewBurgerBuilder(14).AddCheese().AddMushrooms().Build()
	fmt.Println(burger.GetDescription())
	// Burger: size 14, cheese: true, mushrooms: true, tomato: false
}

```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
class Burger {
    private int size;
    private boolean cheese;
    private boolean mushrooms;
    private boolean tomato;

    public Burger(BurgerBuilder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.mushrooms = builder.mushrooms;
        this.tomato = builder.tomato;
    }

    public String getDescription() {
        return "Burger: size " + this.size
                + ", cheese: " + this.cheese
                + ", mushrooms: " + this.mushrooms
                + ", tomato: " + this.tomato;
    }
}

class BurgerBuilder {
    public int size;
    public boolean cheese;
    public boolean mushrooms;
    public boolean tomato;

    public BurgerBuilder(int size) {
        this.size = size;
    }

    public BurgerBuilder addCheese() {
        this.cheese = true;
        return this;
    }

    public BurgerBuilder addMushrooms() {
        this.mushrooms = true;
        return this;
    }

    public BurgerBuilder addTomato() {
        this.tomato = true;
        return this;
    }

    public Burger build() {
        return new Burger(this);
    }
}

// ----------------------------

Burger burger = new BurgerBuilder(14)
        .addCheese()
        .addMushrooms()
        .build();

System.out.println(burger.getDescription());
// Burger: size 14, cheese: true, mushrooms: true, tomato: false
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>
#include <string>
#include <memory>

class BurgerBuilder;

class Burger {
private:
    int size;
    bool cheese;
    bool mushrooms;
    bool tomato;

public:
    Burger(int size, bool cheese, bool mushrooms, bool tomato)
        : size(size), cheese(cheese), mushrooms(mushrooms), tomato(tomato) {}

    std::string getDescription() const {
        auto b = [](bool v) { return v ? "true" : "false"; };
        return "Burger: size " + std::to_string(size) +
               ", cheese: " + b(cheese) +
               ", mushrooms: " + b(mushrooms) +
               ", tomato: " + b(tomato);
    }
};

class BurgerBuilder {
private:
    int size;
    bool cheese = false;
    bool mushrooms = false;
    bool tomato = false;

public:
    explicit BurgerBuilder(int size) : size(size) {}

    BurgerBuilder& addCheese() {
        this->cheese = true;
        return *this;
    }

    BurgerBuilder& addMushrooms() {
        this->mushrooms = true;
        return *this;
    }

    BurgerBuilder& addTomato() {
        this->tomato = true;
        return *this;
    }

    std::unique_ptr<Burger> build() {
        return std::make_unique<Burger>(size, cheese, mushrooms, tomato);
    }
};

// ----------------------------

int main() {
    auto burger = BurgerBuilder(14)
        .addCheese()
        .addMushrooms()
        .build();

    std::cout << burger->getDescription() << std::endl;
    // Burger: size 14, cheese: true, mushrooms: true, tomato: false

    return 0;
}
```
</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
class Burger(builder: BurgerBuilder) {
    private val size: Int = builder.size
    private val cheese: Boolean = builder.cheese
    private val mushrooms: Boolean = builder.mushrooms
    private val tomato: Boolean = builder.tomato

    fun getDescription(): String {
        return "Burger: size $size, cheese: $cheese, " +
            "mushrooms: $mushrooms, tomato: $tomato"
    }
}

class BurgerBuilder(val size: Int) {
    var cheese: Boolean = false
    var mushrooms: Boolean = false
    var tomato: Boolean = false

    fun addCheese(): BurgerBuilder {
        cheese = true
        return this
    }

    fun addMushrooms(): BurgerBuilder {
        mushrooms = true
        return this
    }

    fun addTomato(): BurgerBuilder {
        tomato = true
        return this
    }

    fun build(): Burger {
        return Burger(this)
    }
}

// ----------------------------

fun main() {
    val burger = BurgerBuilder(14)
        .addCheese()
        .addMushrooms()
        .build()

    println(burger.getDescription())
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
class Burger {
  final int size;
  final bool cheese;
  final bool mushrooms;
  final bool tomato;

  Burger(BurgerBuilder builder)
      : size = builder.size,
        cheese = builder.cheese,
        mushrooms = builder.mushrooms,
        tomato = builder.tomato;

  String getDescription() {
    return 'Burger: size $size, cheese: $cheese, '
        'mushrooms: $mushrooms, tomato: $tomato';
  }
}

class BurgerBuilder {
  final int size;
  bool cheese = false;
  bool mushrooms = false;
  bool tomato = false;

  BurgerBuilder(this.size);

  BurgerBuilder addCheese() {
    cheese = true;
    return this;
  }

  BurgerBuilder addMushrooms() {
    mushrooms = true;
    return this;
  }

  BurgerBuilder addTomato() {
    tomato = true;
    return this;
  }

  Burger build() => Burger(this);
}

// ----------------------------

void main() {
  var burger = BurgerBuilder(14).addCheese().addMushrooms().build();

  print(burger.getDescription());
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ «وقتی ساختن یه آبجکت کلی گزینه اختیاری داره و می‌خوای قدم‌به‌قدم و خوانا بسازیش»؛ ❌ «وقتی آبجکتت دو سه تا فیلد ساده داره و یه تابع سازنده معمولی کافیه».
> 🪤 **دام رایج:** «build() رو صدا نزنی و با خود Builder کار کنی، یا فیلدهای اجباری رو نگیری و آبجکت نصفه‌نیمه بسازی».
> 🔗 **فرقش با الگوهای دیگه:** «Builder یه آبجکت رو مرحله‌به‌مرحله می‌سازه، نه اینکه بین چند نوع آبجکت آماده انتخاب کنه».


<br>

---

<div align="center">

## نمونه اولیه (Prototype) 🐑

</div>

<div align="center">
🧬 <b>مثال دنیای واقعی: کپی گرفتن از یه سند آماده</b>
</div>

فرض کن یه فایل ورد داری که کلی روش وقت گذاشتی؛ حاشیه، فونت، استایل، همه چی تنظیم شده. حالا برای یه سند جدید، از صفر شروع نمی‌کنی. همون فایل رو **Copy/Paste** می‌کنی و فقط متنش رو عوض می‌کنی. این دقیقاً کاری‌ه که این پترن می‌کنه؛ به جای ساختن از صفر، از روی یه نمونه آماده یه **کپی** (Clone) می‌گیری.

توی دنیای کامپیوتر هم خیلی وقتا پیش میاد که ساختن یه آبجکت از صفر خیلی هزینه داره (مثلاً باید کلی دیتابیس رو کوئری بزنه تا ساخته بشه).
به جای اینکه هر دفعه این مسیر سخت رو بریم، میایم از روی یه نمونه آماده (Prototype) یه کپی می‌گیریم. مثل دستور **Copy/Paste**.

💡 **به زبون ساده:**
> این پترن می‌گه: **«به جای اینکه بگی `new` و همه چیز رو از اول بسازی، از روی یکی که داری یه `clone` بگیر.»**
> (مخصوصاً وقتی ساختن آبجکت خیلی زمان‌بر یا پیچیده باشه).

ویکی‌پدیا:

<div dir="ltr">

> The prototype pattern is a creational design pattern in software development. It is used when the type of objects to
> create is determined by a prototypical instance, which is cloned to produce new objects.

</div>

به زبون خودمون: پترن نمونه اولیه (Prototype) یه پترن سازنده (Creational) هست. وقتی به دردت می‌خوره که نوع آبجکتی که می‌خوای بسازی رو یه نمونه آماده مشخص می‌کنه؛ پس به جای ساختن از صفر، از روی همون نمونه یه کپی (Clone) می‌گیری و آبجکت جدیدت آماده‌ست.

**مثال برنامه‌نویسی**

فرض کن یه کلاس Person داریم که یه اسم داره و یه آبجکت تو در توی Address، که توش شهر طرف نگه‌داری می‌شه.

می‌خوایم دو جور کپی ازش بگیریم؛ یه کپی سطحی (Shallow Copy) و یه کپی عمیق (Deep Copy)، تا فرقشون رو زنده ببینی.

<details>
<summary>Python</summary>

پایتون magic method‌هایی برای این مسئله در نظر گرفته که ما هم از همون دو تابع معروف copy و deep copy استفاده می‌کنیم:

<div dir="ltr">

```python
import copy


class Address:
    def __init__(self, city):
        self.city = city


class Person:
    def __init__(self, name, address):
        self.name = name
        self.address = address  # nested mutable object

    def __copy__(self):
        # Shallow copy: new Person, but the SAME Address object is shared
        return Person(self.name, self.address)

    def __deepcopy__(self, memo):
        # Deep copy: the nested Address is copied too, so it is independent
        return Person(self.name, copy.deepcopy(self.address, memo))


# Shallow clone: shares the nested Address
original = Person("Sara", Address("Tehran"))
shallow = copy.copy(original)
shallow.address.city = "Shiraz"
print(shallow.address.city)    # Shiraz
print(original.address.city)   # Shiraz  -> the original changed too (shared Address)

# Deep clone: gets its own Address
original = Person("Sara", Address("Tehran"))
deep = copy.deepcopy(original)
deep.address.city = "Shiraz"
print(deep.address.city)       # Shiraz
print(original.address.city)   # Tehran  -> the original stayed the same
```

</div>

</details>

<details>
<summary>Typescript</summary>
<div dir="ltr">

```typescript
class Address {
    city: string;

    constructor(city: string) {
        this.city = city;
    }
}

class Person {
    name: string;
    address: Address; // nested mutable object

    constructor(name: string, address: Address) {
        this.name = name;
        this.address = address;
    }

    // Shallow copy: new Person, but the SAME Address object is shared
    shallowCopy(): Person {
        return new Person(this.name, this.address);
    }

    // Deep copy: the nested Address is copied too, so it is independent
    deepCopy(): Person {
        return new Person(this.name, new Address(this.address.city));
    }
}

// Shallow clone: shares the nested Address
let original = new Person("Sara", new Address("Tehran"));
let shallow = original.shallowCopy();
shallow.address.city = "Shiraz";
console.log(shallow.address.city);    // Shiraz
console.log(original.address.city);   // Shiraz  -> the original changed too (shared Address)

// Deep clone: gets its own Address
original = new Person("Sara", new Address("Tehran"));
let deep = original.deepCopy();
deep.address.city = "Shiraz";
console.log(deep.address.city);       // Shiraz
console.log(original.address.city);   // Tehran  -> the original stayed the same
```

</div>
</details>

<details>
<summary>JavaScript</summary>

<div dir="ltr">

```javascript
class Address {
    constructor(city) {
        this.city = city;
    }
}

class Person {
    constructor(name, address) {
        this.name = name;
        this.address = address; // nested mutable object
    }

    // Shallow copy: new Person, but the SAME Address object is shared
    shallowCopy() {
        return new Person(this.name, this.address);
    }

    // Deep copy: the nested Address is copied too, so it is independent
    deepCopy() {
        return new Person(this.name, new Address(this.address.city));
    }
}

// Shallow clone: shares the nested Address
let original = new Person("Sara", new Address("Tehran"));
let shallow = original.shallowCopy();
shallow.address.city = "Shiraz";
console.log(shallow.address.city);    // Shiraz
console.log(original.address.city);   // Shiraz  -> the original changed too (shared Address)

// Deep clone: gets its own Address
original = new Person("Sara", new Address("Tehran"));
let deep = original.deepCopy();
deep.address.city = "Shiraz";
console.log(deep.address.city);       // Shiraz
console.log(original.address.city);   // Tehran  -> the original stayed the same
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp

using System;

public class Address
{
    public string City;

    public Address(string city)
    {
        City = city;
    }
}

public class Person
{
    public string Name;
    public Address Address; // nested mutable object

    public Person(string name, Address address)
    {
        Name = name;
        Address = address;
    }

    // Shallow copy: MemberwiseClone keeps the SAME Address reference (shared)
    public Person ShallowCopy()
    {
        return (Person)this.MemberwiseClone();
    }

    // Deep copy: also copy the nested Address, so it is independent
    public Person DeepCopy()
    {
        Person clone = (Person)this.MemberwiseClone();
        clone.Address = new Address(this.Address.City);
        return clone;
    }
}

public class Program
{
    public static void Main()
    {
        // Shallow clone: shares the nested Address
        Person original = new Person("Sara", new Address("Tehran"));
        Person shallow = original.ShallowCopy();
        shallow.Address.City = "Shiraz";
        Console.WriteLine(shallow.Address.City);    // Shiraz
        Console.WriteLine(original.Address.City);   // Shiraz  -> the original changed too (shared Address)

        // Deep clone: gets its own Address
        original = new Person("Sara", new Address("Tehran"));
        Person deep = original.DeepCopy();
        deep.Address.City = "Shiraz";
        Console.WriteLine(deep.Address.City);       // Shiraz
        Console.WriteLine(original.Address.City);   // Tehran  -> the original stayed the same
    }
}

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php
class Address
{
    public string $city;

    public function __construct(string $city)
    {
        $this->city = $city;
    }
}

class Person
{
    public string $name;
    public Address $address; // nested mutable object

    public function __construct(string $name, Address $address)
    {
        $this->name = $name;
        $this->address = $address;
    }

    // Shallow copy: clone keeps the SAME Address object (shared)
    public function shallowCopy(): Person
    {
        return clone $this;
    }

    // Deep copy: also copy the nested Address, so it is independent
    public function deepCopy(): Person
    {
        $clone = clone $this;
        $clone->address = new Address($this->address->city);
        return $clone;
    }
}

// Shallow clone: shares the nested Address
$original = new Person("Sara", new Address("Tehran"));
$shallow = $original->shallowCopy();
$shallow->address->city = "Shiraz";
echo $shallow->address->city . "\n";    // Shiraz
echo $original->address->city . "\n";   // Shiraz  -> the original changed too (shared Address)

// Deep clone: gets its own Address
$original = new Person("Sara", new Address("Tehran"));
$deep = $original->deepCopy();
$deep->address->city = "Shiraz";
echo $deep->address->city . "\n";       // Shiraz
echo $original->address->city . "\n";   // Tehran  -> the original stayed the same

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go
package main

import "fmt"

type Address struct {
	City string
}

type Person struct {
	Name    string
	Address *Address // nested mutable object
}

// Shallow copy: new Person, but the SAME Address pointer is shared
func (p *Person) ShallowCopy() *Person {
	return &Person{Name: p.Name, Address: p.Address}
}

// Deep copy: the nested Address is copied too, so it is independent
func (p *Person) DeepCopy() *Person {
	return &Person{Name: p.Name, Address: &Address{City: p.Address.City}}
}

func main() {
	// Shallow clone: shares the nested Address
	original := &Person{Name: "Sara", Address: &Address{City: "Tehran"}}
	shallow := original.ShallowCopy()
	shallow.Address.City = "Shiraz"
	fmt.Println(shallow.Address.City)  // Shiraz
	fmt.Println(original.Address.City) // Shiraz  -> the original changed too (shared Address)

	// Deep clone: gets its own Address
	original = &Person{Name: "Sara", Address: &Address{City: "Tehran"}}
	deep := original.DeepCopy()
	deep.Address.City = "Shiraz"
	fmt.Println(deep.Address.City)     // Shiraz
	fmt.Println(original.Address.City) // Tehran  -> the original stayed the same
}

```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
class Address {
    String city;

    Address(String city) {
        this.city = city;
    }
}

class Person {
    String name;
    Address address; // nested mutable object

    Person(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    // Shallow copy: new Person, but the SAME Address object is shared
    Person shallowCopy() {
        return new Person(this.name, this.address);
    }

    // Deep copy: the nested Address is copied too, so it is independent
    Person deepCopy() {
        return new Person(this.name, new Address(this.address.city));
    }
}

public class Proto {
    public static void main(String[] args) {
        // Shallow clone: shares the nested Address
        Person original = new Person("Sara", new Address("Tehran"));
        Person shallow = original.shallowCopy();
        shallow.address.city = "Shiraz";
        System.out.println(shallow.address.city);    // Shiraz
        System.out.println(original.address.city);   // Shiraz  -> the original changed too (shared Address)

        // Deep clone: gets its own Address
        original = new Person("Sara", new Address("Tehran"));
        Person deep = original.deepCopy();
        deep.address.city = "Shiraz";
        System.out.println(deep.address.city);       // Shiraz
        System.out.println(original.address.city);   // Tehran  -> the original stayed the same
    }
}
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>
#include <string>
#include <memory>

class Address {
public:
    std::string city;
    Address(const std::string& city) : city(city) {}
};

class Person {
public:
    std::string name;
    std::shared_ptr<Address> address; // nested mutable object

    Person(const std::string& name, std::shared_ptr<Address> address)
        : name(name), address(address) {}

    // Shallow copy: new Person, but the SAME Address object is shared
    Person shallowCopy() const {
        return Person(name, address);
    }

    // Deep copy: the nested Address is copied too, so it is independent
    Person deepCopy() const {
        return Person(name, std::make_shared<Address>(address->city));
    }
};

int main() {
    // Shallow clone: shares the nested Address
    Person original("Sara", std::make_shared<Address>("Tehran"));
    Person shallow = original.shallowCopy();
    shallow.address->city = "Shiraz";
    std::cout << shallow.address->city << std::endl;   // Shiraz
    std::cout << original.address->city << std::endl;  // Shiraz  -> the original changed too (shared Address)

    // Deep clone: gets its own Address
    original = Person("Sara", std::make_shared<Address>("Tehran"));
    Person deep = original.deepCopy();
    deep.address->city = "Shiraz";
    std::cout << deep.address->city << std::endl;      // Shiraz
    std::cout << original.address->city << std::endl;  // Tehran  -> the original stayed the same

    return 0;
}
```
</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
class Address(var city: String)

class Person(val name: String, val address: Address) { // nested mutable object
    // Shallow copy: new Person, but the SAME Address object is shared
    fun shallowCopy(): Person {
        return Person(name, address)
    }

    // Deep copy: the nested Address is copied too, so it is independent
    fun deepCopy(): Person {
        return Person(name, Address(address.city))
    }
}

// ----------------------------

fun main() {
    // Shallow clone: shares the nested Address
    var original = Person("Sara", Address("Tehran"))
    val shallow = original.shallowCopy()
    shallow.address.city = "Shiraz"
    println(shallow.address.city)    // Shiraz
    println(original.address.city)   // Shiraz  -> the original changed too (shared Address)

    // Deep clone: gets its own Address
    original = Person("Sara", Address("Tehran"))
    val deep = original.deepCopy()
    deep.address.city = "Shiraz"
    println(deep.address.city)       // Shiraz
    println(original.address.city)   // Tehran  -> the original stayed the same
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
class Address {
  String city;

  Address(this.city);
}

class Person {
  String name;
  Address address; // nested mutable object

  Person(this.name, this.address);

  // Shallow copy: new Person, but the SAME Address object is shared
  Person shallowCopy() {
    return Person(name, address);
  }

  // Deep copy: the nested Address is copied too, so it is independent
  Person deepCopy() {
    return Person(name, Address(address.city));
  }
}

// ----------------------------

void main() {
  // Shallow clone: shares the nested Address
  var original = Person('Sara', Address('Tehran'));
  var shallow = original.shallowCopy();
  shallow.address.city = 'Shiraz';
  print(shallow.address.city);    // Shiraz
  print(original.address.city);   // Shiraz  -> the original changed too (shared Address)

  // Deep clone: gets its own Address
  original = Person('Sara', Address('Tehran'));
  var deep = original.deepCopy();
  deep.address.city = 'Shiraz';
  print(deep.address.city);       // Shiraz
  print(original.address.city);   // Tehran  -> the original stayed the same
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ «وقتی ساختن آبجکت از صفر گرونه، و یه نمونه آماده داری که فقط می‌خوای ازش کپی بگیری»؛ ❌ «وقتی آبجکت ساده‌ست و ساختن دوباره‌ش هیچ هزینه‌ای نداره».
> 🪤 **دام رایج:** «کپی سطحی می‌گیری و یادت می‌ره فیلدهای تو در توش هنوز مشترکن؛ بعد تغییر کپی، اصلی رو هم خراب می‌کنه».
> 🔗 **فرقش با کارخانه:** نمونه اولیه از روی یه آبجکت موجود کپی می‌گیره، ولی کارخانه هر بار یه آبجکت تازه از صفر می‌سازه.


<br>

**تفاوت کپی سطحی (Shallow Copy) و کپی عمیق (Deep Copy) چیه؟**
<br>
توی کپی سطحی (Shallow Copy)، یه آبجکت جدید ساخته می‌شه، ولی فیلدهای تو در توش (مثل همون Address توی مثال) کپی نمی‌شن؛ هر دو آبجکت به یه آدرس مشترک توی حافظه اشاره می‌کنن. پس اگه شهرِ اون Address رو از روی کپی عوض کنی، چون آبجکت Address یکی‌ه، آبجکت اصلی هم تغییر می‌کنه.

ولی توی کپی عمیق (Deep Copy)، اون آبجکت تو در تو هم جدا کپی می‌شه. در نتیجه هر کدوم Address خودشون رو دارن و تغییر یکی هیچ اثری روی اون یکی نمی‌ذاره.

<br>

<div align="center">

## تک‌نمونه (Singleton) 💍

</div>

<div align="center">
👑 <b>مثال دنیای واقعی: رئیس‌جمهور</b>
</div>

توی یک کشور، نمی‌شه ۱۰ تا رئیس‌جمهور داشت! 🏛️
همیشه **فقط و فقط یک** رئیس‌جمهور وجود داره. هر وقت هر کسی (از هر وزارتخونه‌ای) با رئیس‌جمهور کار داره، باید به همون **یک نفر واحد** مراجعه کنه، نه اینکه بره برای خودش یه رئیس‌جمهور جدید بسازه!

💡 **به زبون ساده:**
> این پترن تضمین می‌کنه که از یه کلاس، **فقط یه دونه آبجکت** ساخته بشه و همه جای برنامه از همون یکی استفاده کنن. (مثلاً برای کانکشن دیتابیس).

⚠️ **هشدار:**
> دیزاین پترن Singleton یه جورایی «آنتی پترن» (ضد الگو) هم حساب می‌شه! چون مثل «متغیر سراسری» (Global Variable) عمل می‌کنه و اگه زیاده‌روی کنی، تست نوشتن و دیباگ کردن پروژه رو تبدیل به کابوس می‌کنه. پس با احتیاط مصرفش کن! 💊

ویکی‌پدیا:

<div dir="ltr">

> In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a
> class to one object. This is useful when exactly one object is needed to coordinate actions across the system.

</div>

خلاصه‌اش این می‌شه که الگوی تک‌نمونه (Singleton) ساختن آبجکت از یه کلاس رو به فقط یه دونه محدود می‌کنه. این وقتی به درد می‌خوره که دقیقاً یه آبجکت لازم داری تا کارهای کل سیستم رو هماهنگ کنه.

<br>

**مثال برنامه‌نویسی**

به‌طور کلی برای ساخت singleton باید تابع سازنده private بشه، cloning و متدهای copy بسته بشن و تابع استاتیکی برای ساخت
آبجکت تعریف بشه.

ولی توی پایتون یه راه‌حل ساده‌تر هست و اون هم استفاده از metaclassهاست:

<details>
<summary>Python</summary>

<div dir="ltr">

```python
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class President(metaclass=SingletonMeta):
    pass


if __name__ == "__main__":
    # The client code.

    a = President()
    b = President()

    print("Same instance?", "True" if a is b else "False")
    # Output: Same instance? True
```

</div>

این روش لزوماً Thread Safe نیست؛ یعنی اگه چند نخ (Thread) هم‌زمان اولین بار `getInstance` رو صدا بزنن، شاید بیشتر از یه نمونه ساخته بشه. تو محیط چندنخی باید با یه قفل (Lock) جلوش رو بگیری.

</details>

<details>
<summary>Typescript</summary>
<div dir="ltr">

```typescript
class President {
    private static instance: President;

    private constructor() {
        // Private constructor prevents direct instantiation
    }

    public static getInstance(): President {
        if (!President.instance) {
            President.instance = new President();
        }
        return President.instance;
    }
}

// ----------------------------

const a = President.getInstance();
const b = President.getInstance();

console.log("Same instance?", Object.is(a, b) ? "True" : "False");
// Output: Same instance? True
```

</div>

</details>

<details>
<summary>JavaScript</summary>

<div dir="ltr">

```javascript
class President {
    static #instance;

    static getInstance() {
        if (!President.#instance) {
            President.#instance = new President();
        }
        return President.#instance;
    }
}

const a = President.getInstance();
const b = President.getInstance();

console.log("Same instance?", Object.is(a, b) ? "True" : "False");
// Output: Same instance? True
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;


public class President
{
  static President instance;

  // Private constructor hides direct instantiation
  private President()
  {
  }

  public static President GetInstance()
  {
    if (instance == null) {
      instance = new President();
    }
    return instance;
  }
}

// ----------------------------

President a = President.GetInstance();
President b = President.GetInstance();

Console.WriteLine($"Same instance? {(a == b ? "True" : "False")}");
// Output: Same instance? True

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php

class President
{
  private static $instance;

  private function __construct()
  {
    // Hiding the Constructor
  }

  public static function getInstance()
  {
    if (self::$instance == null) {
      self::$instance = new President();
    }
    return self::$instance;
  }
}

$a = President::getInstance();
$b = President::getInstance();

echo "Same instance? " . ($a === $b ? "True" : "False") . "\n";
// Output: Same instance? True

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go
package main

import (
	"fmt"
	"sync"
)

type President struct{}

var (
	instance *President
	once     sync.Once
)

func GetInstance() *President {
	once.Do(func() {
		instance = &President{}
	})
	return instance
}

// -----------------------

func main() {
	a := GetInstance()
	b := GetInstance()

	same := "False"
	if a == b {
		same = "True"
	}
	fmt.Println("Same instance?", same)
	// Output: Same instance? True
}


```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
class President {
    private static President instance;
    // Private constructor
    private President() {
        // Hiding the Constructor
    }

    public static President getInstance() {
        if (instance == null) {
            instance = new President();
        }
        return instance;
    }
}

// ----------------------------

President a = President.getInstance();
President b = President.getInstance();

System.out.println("Same instance? " + (a == b ? "True" : "False"));
// Output: Same instance? True
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>

class President {
private:
    // Private constructor
    President() = default;

    // Delete copy constructor and assignment operator
    President(const President&) = delete;
    President& operator=(const President&) = delete;

public:
    // Thread-safe in C++11 and later (Meyers singleton)
    static President& getInstance() {
        static President instance;
        return instance;
    }
};

int main() {
    President& a = President::getInstance();
    President& b = President::getInstance();

    std::cout << "Same instance? " << (&a == &b ? "True" : "False") << std::endl;
    // Output: Same instance? True
    return 0;
}
```
</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
object President {
    // The single instance is the object itself
}

// ----------------------------

fun main() {
    val a = President
    val b = President

    println("Same instance? " + if (a === b) "True" else "False")
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
class President {
  static final President _instance = President._internal();

  President._internal();

  factory President() {
    return _instance;
  }
}

// ----------------------------

void main() {
  var a = President();
  var b = President();

  print("Same instance? ${identical(a, b) ? "True" : "False"}");
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ «وقتی واقعاً باید توی کل برنامه فقط یه نمونه از یه چیز وجود داشته باشه، مثل تنظیمات سراسری یا یه مخزنِ اتصال‌ها (Connection Pool)»؛ ❌ «وقتی فقط برای راحتیِ دسترسی می‌خوای همه‌جا بهش برسی، که اون‌وقت داری متغیر سراسری (Global Variable) می‌سازی».
> 🪤 **دام رایج:** «حالت مشترک و قابل‌تغییرِ تک‌نمونه، تست‌ها رو به هم وابسته می‌کنه و توی برنامه‌های چندنخی (Multithreaded) دردسر می‌سازه».


<br>
<br>

---

<br>

<div align="center">

# الگوهای ساختاری (Structural Design Patterns) 🧰

</div>

به زبون ساده:

> به‌طور کلی الگوهای طراحی ساختاری با روابط بین موجودیت‌ها و ترکیب کردن اونا کار دارن.

ویکی‌پدیا:

<div dir="ltr">

> In software engineering, structural design patterns are design patterns that ease the design by identifying a simple
> way to realize relationships between entities.

</div>

خلاصه: الگوهای ساختاری کمک می‌کنن کلاس‌ها و آبجکت‌ها رو طوری کنار هم بچینی که رابطه‌هاشون ساده و سرراست بمونه.

<br>

---

<div align="center">

## مبدل (Adapter) 🔌

</div>

<div align="center">
🔌 <b>مثال دنیای واقعی: تبدیل دوشاخه برق</b>
</div>

فرض کن رفتی سفر خارج (مثلاً آمریکا). لپ‌تاپت شارژش تموم شده و می‌خوای بزنی به برق.
اما ای داد بیداد! 😱 پریزهای اونجا سه شاخه‌ست، ولی شارژر تو دو شاخه‌ست.

شارژر تو (کلاینت) نمی‌تونه مستقیم وارد پریز (سرویس) بشه.
اینجا چیکار می‌کنی؟ سیم شارژر رو می‌بری؟ دیوار رو خراب می‌کنی؟ نه!
می‌ری یه **«مبدل» (Adapter)** می‌خری. مبدل یه سرش به شارژر تو می‌خوره، سر دیگه‌ش به پریز دیوار.

💡 **به زبون ساده:**
> آداپتور یعنی: **«وقتی دو تا چیز به هم نمی‌خورن، یه واسطه بذار وسط که اینو به اون وصل کنه، بدون اینکه دست به ترکیب اصلیشون بزنی.»**

ویکی‌پدیا:

<div dir="ltr">

> In software engineering, the adapter pattern is a software design pattern that allows the interface of an existing
> class to be used as another interface. It is often used to make existing classes work with others without modifying
> their source code.

</div>

خلاصه‌ش این می‌شه: آداپتور به تو اجازه می‌ده از یه کلاسِ موجود، انگار که یه اینترفیس دیگه‌ست استفاده کنی.
بیشتر وقتی به کارت میاد که بخوای کلاس‌های آماده رو کنار بقیه به کار بگیری، بدون اینکه کد اصلیشون رو دست بزنی.

**مثال برنامه‌نویسی**

فرض کن یه بازی داریم که توش یه «شکارچی» (`Hunter`) هست که عادت داره «شیر» (`Lion`) شکار کنه.
شکارچی وقتی شیر می‌بینه، انتظار داره شیر «غرش» (`roar`) کنه.

حالا یه «سگ وحشی» (`WildDog`) به بازی اضافه شده. اما سگ‌ها غرش نمی‌کنن، «پارس» (`bark`) می‌کنن.
شکارچی قاطی می‌کنه! چون فقط بلده با متد `roar` کار کنه.

اینجا یه `WildDogAdapter` می‌سازیم. این آداپتور:
1.  از بیرون شبیه `Lion` به نظر میاد (متد `roar` داره).
2.  اما اون پشت، وقتی `roar` صدا زده می‌شه، می‌ره `bark` سگ رو صدا می‌زنه.
اینطوری شکارچی فکر می‌کنه داره شیر شکار می‌کنه، ولی در واقع داره سگ شکار می‌کنه! 😉

برای حلش به این صورت می‌تونیم براش آداپتور تعریف کنیم:

<details>
<summary>Python</summary>

<div dir="ltr">

```python
class Lion:
    def roar(self) -> str:
        raise NotImplementedError


class AfricanLion(Lion):
    def roar(self) -> str:
        return "Roaaar"


class Hunter:
    def hunt(self, lion: Lion) -> None:
        print("The hunter is hunting...")
        print(lion.roar())


class WildDog:
    def bark(self) -> str:
        return "Woof"


class WildDogAdapter(Lion):
    def __init__(self, dog: WildDog):
        self.dog = dog

    def roar(self) -> str:
        return self.dog.bark()


# ----------------------------

african_lion = AfricanLion()
wild_dog = WildDog()
wild_dog_adapter = WildDogAdapter(wild_dog)

hunter = Hunter()
hunter.hunt(african_lion)       # The hunter is hunting... -> Roaaar
hunter.hunt(wild_dog_adapter)   # The hunter is hunting... -> Woof

# Output:
# The hunter is hunting...
# Roaaar
# The hunter is hunting...
# Woof
```

</div>
این مثال یه‌کم انتزاعیه، ولی مفهوم رو خیلی خوب می‌رسونه.

</details>

<details>
<summary>Typescript</summary>
<div dir="ltr">

```typescript
interface Lion {
    roar(): string;
}

class AfricanLion implements Lion {
    roar(): string {
        return "Roaaar";
    }
}

class Hunter {
    hunt(lion: Lion): void {
        console.log("The hunter is hunting...");
        console.log(lion.roar());
    }
}

class WildDog {
    bark(): string {
        return "Woof";
    }
}

class WildDogAdapter implements Lion {
    private dog: WildDog;

    constructor(dog: WildDog) {
        this.dog = dog;
    }

    roar(): string {
        return this.dog.bark();
    }
}

// ----------------------------

const africanLion = new AfricanLion();
const wildDog = new WildDog();
const wildDogAdapter = new WildDogAdapter(wildDog);

const hunter = new Hunter();
hunter.hunt(africanLion);      // The hunter is hunting... -> Roaaar
hunter.hunt(wildDogAdapter);   // The hunter is hunting... -> Woof

// Output:
// The hunter is hunting...
// Roaaar
// The hunter is hunting...
// Woof
```

</div>
</details>

<details>
<summary>JavaScript</summary>
<div dir="ltr">

```javascript
class Lion {
    roar() {
        return "";
    }
}

class AfricanLion extends Lion {
    roar() {
        return "Roaaar";
    }
}

class Hunter {
    hunt(lion) {
        console.log("The hunter is hunting...");
        console.log(lion.roar());
    }
}

class WildDog {
    bark() {
        return "Woof";
    }
}

class WildDogAdapter extends Lion {
    constructor(dog) {
        super();
        this.dog = dog;
    }

    roar() {
        return this.dog.bark();
    }
}

// ----------------------------

const africanLion = new AfricanLion();
const wildDog = new WildDog();
const wildDogAdapter = new WildDogAdapter(wildDog);

const hunter = new Hunter();
hunter.hunt(africanLion);      // The hunter is hunting... -> Roaaar
hunter.hunt(wildDogAdapter);   // The hunter is hunting... -> Woof

// Output:
// The hunter is hunting...
// Roaaar
// The hunter is hunting...
// Woof
```

</div>
</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;

interface ILion
{
  string Roar();
}

class AfricanLion : ILion
{
  public string Roar()
  {
    return "Roaaar";
  }
}

class Hunter
{
  public void Hunt(ILion lion)
  {
    Console.WriteLine("The hunter is hunting...");
    Console.WriteLine(lion.Roar());
  }
}

// This needs to be added to the game
class WildDog
{
  public string Bark()
  {
    return "Woof";
  }
}

// Adapter around wild dog to make it compatible with our game
class WildDogAdapter : ILion
{
  private WildDog mDog;
  public WildDogAdapter(WildDog dog)
  {
    this.mDog = dog;
  }
  public string Roar()
  {
    return mDog.Bark();
  }
}

// ----------------------------

var africanLion = new AfricanLion();
var wildDog = new WildDog();
var wildDogAdapter = new WildDogAdapter(wildDog);

var hunter = new Hunter();
hunter.Hunt(africanLion);      // The hunter is hunting... -> Roaaar
hunter.Hunt(wildDogAdapter);   // The hunter is hunting... -> Woof

// Output:
// The hunter is hunting...
// Roaaar
// The hunter is hunting...
// Woof

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php

interface Lion {
    public function roar(): string;
}

class AfricanLion implements Lion {
    public function roar(): string {
        return "Roaaar";
    }
}

class Hunter {
    public function hunt(Lion $lion): void {
        echo "The hunter is hunting...\n";
        echo $lion->roar() . "\n";
    }
}

class WildDog {
    public function bark(): string {
        return "Woof";
    }
}

// Adapter around wild dog to make it compatible with our game
class WildDogAdapter implements Lion
{
    private $mDog;
    public function __construct(WildDog $dog)
    {
        $this->mDog = $dog;
    }
    public function roar(): string
    {
        return $this->mDog->bark();
    }
}

$africanLion = new AfricanLion();
$wildDog = new WildDog();
$wildDogAdapter = new WildDogAdapter($wildDog);

$hunter = new Hunter();
$hunter->hunt($africanLion);      // The hunter is hunting... -> Roaaar
$hunter->hunt($wildDogAdapter);   // The hunter is hunting... -> Woof

// Output:
// The hunter is hunting...
// Roaaar
// The hunter is hunting...
// Woof

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go

package main

import "fmt"

type Lion interface {
	Roar() string
}

type AfricanLion struct{}

func (a AfricanLion) Roar() string {
	return "Roaaar"
}

type Hunter struct{}

func (h Hunter) Hunt(lion Lion) {
	fmt.Println("The hunter is hunting...")
	fmt.Println(lion.Roar())
}

type WildDog struct{}

func (w WildDog) Bark() string {
	return "Woof"
}

type WildDogAdapter struct {
	dog WildDog
}

func (w WildDogAdapter) Roar() string {
	return w.dog.Bark()
}

func main() {
	africanLion := AfricanLion{}
	wildDog := WildDog{}
	wildDogAdapter := WildDogAdapter{dog: wildDog}

	hunter := Hunter{}
	hunter.Hunt(africanLion)    // The hunter is hunting... -> Roaaar
	hunter.Hunt(wildDogAdapter) // The hunter is hunting... -> Woof
}

// Output:
// The hunter is hunting...
// Roaaar
// The hunter is hunting...
// Woof

```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
interface Lion {

    String roar();
}

class AfricanLion implements Lion {

    @Override
    public String roar() {
        return "Roaaar";
    }
}

class Hunter {

    public void hunt(Lion lion) {
        System.out.println("The hunter is hunting...");
        System.out.println(lion.roar());
    }
}

class WildDog {

    public String bark() {
        return "Woof";
    }
}

// Adapter around wild dog to make it compatible
class WildDogAdapter implements Lion {
    private WildDog wildDog;

    public WildDogAdapter(WildDog wildDog) {
        this.wildDog = wildDog;
    }

    @Override
    public String roar() {
        return wildDog.bark();
    }
}

// ----------------------------

AfricanLion africanLion = new AfricanLion();
WildDog wildDog = new WildDog();
WildDogAdapter wildDogAdapter = new WildDogAdapter(wildDog);

Hunter hunter = new Hunter();
hunter.hunt(africanLion);      // The hunter is hunting... -> Roaaar
hunter.hunt(wildDogAdapter);   // The hunter is hunting... -> Woof

// Output:
// The hunter is hunting...
// Roaaar
// The hunter is hunting...
// Woof
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>
#include <string>

// Lion interface
class Lion {
public:
    virtual ~Lion() = default;
    virtual std::string roar() = 0;
};

// African lion
class AfricanLion : public Lion {
public:
    std::string roar() override {
        return "Roaaar";
    }
};

// Hunter
class Hunter {
public:
    void hunt(Lion* lion) {
        std::cout << "The hunter is hunting..." << std::endl;
        std::cout << lion->roar() << std::endl;
    }
};

// Wild dog (incompatible interface)
class WildDog {
public:
    std::string bark() {
        return "Woof";
    }
};

// Adapter to make WildDog compatible with the Lion interface
class WildDogAdapter : public Lion {
private:
    WildDog* dog;

public:
    WildDogAdapter(WildDog* dog) : dog(dog) {}

    std::string roar() override {
        return dog->bark();
    }
};

// Usage
int main() {
    AfricanLion africanLion;
    WildDog wildDog;
    WildDogAdapter wildDogAdapter(&wildDog);

    Hunter hunter;
    hunter.hunt(&africanLion);      // The hunter is hunting... -> Roaaar
    hunter.hunt(&wildDogAdapter);   // The hunter is hunting... -> Woof

    return 0;
}

// Output:
// The hunter is hunting...
// Roaaar
// The hunter is hunting...
// Woof
```
</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
interface Lion {
    fun roar(): String
}

class AfricanLion : Lion {
    override fun roar(): String {
        return "Roaaar"
    }
}

class Hunter {
    fun hunt(lion: Lion) {
        println("The hunter is hunting...")
        println(lion.roar())
    }
}

class WildDog {
    fun bark(): String {
        return "Woof"
    }
}

// Adapter around wild dog to make it compatible
class WildDogAdapter(private val wildDog: WildDog) : Lion {
    override fun roar(): String {
        return wildDog.bark()
    }
}

// ----------------------------

fun main() {
    val africanLion = AfricanLion()
    val wildDog = WildDog()
    val wildDogAdapter = WildDogAdapter(wildDog)

    val hunter = Hunter()
    hunter.hunt(africanLion)
    hunter.hunt(wildDogAdapter)
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
abstract class Lion {
  String roar();
}

class AfricanLion implements Lion {
  @override
  String roar() {
    return "Roaaar";
  }
}

class Hunter {
  void hunt(Lion lion) {
    print("The hunter is hunting...");
    print(lion.roar());
  }
}

class WildDog {
  String bark() {
    return "Woof";
  }
}

// Adapter around wild dog to make it compatible
class WildDogAdapter implements Lion {
  final WildDog _wildDog;

  WildDogAdapter(this._wildDog);

  @override
  String roar() {
    return _wildDog.bark();
  }
}

// ----------------------------

void main() {
  var africanLion = AfricanLion();
  var wildDog = WildDog();
  var wildDogAdapter = WildDogAdapter(wildDog);

  var hunter = Hunter();
  hunter.hunt(africanLion);
  hunter.hunt(wildDogAdapter);
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ «وقتی یه کلاس کارِتو راه می‌اندازه ولی امضای متدهاش با چیزی که کدت انتظار داره جور نیست»؛ ❌ «وقتی خودت کنترل هر دو طرف رو داری و می‌تونی همون اول اینترفیس رو درست طراحی کنی».
> 🪤 **دام رایج:** «آداپتور رو کم‌کم پر از منطق اضافه می‌کنی تا جایی که از یه واسطه ساده تبدیل می‌شه به یه لایه شلوغ که فهمیدنش سخته».
> 🔗 **فرقش با [پل (Bridge)](#پل-bridge-):** «پل رو از اول طراحی می‌کنی تا انتزاع و پیاده‌سازی مستقل از هم رشد کنن؛ آداپتور بعد از ماجرا میاد که دو تا چیزِ ناسازگارِ موجود رو به هم برسونه. (نزدیک به [پراکسی (Proxy)](#پراکسی-proxy-) و [دکوریتور (Decorator)](#دکوریتور-decorator-) هم هست؛ ولی اون‌ها اینترفیس رو عوض نمی‌کنن)».


<br>

---

<div align="center">

## پل (Bridge) 🌉

</div>

<div align="center">
🎨 <b>مثال دنیای واقعی: تم وب‌سایت</b>
</div>

فرض کن یه وب‌سایت داری که ۲ تا صفحه داره: `About` و `Careers`.
حالا می‌خوای ۳ تا تم رنگی هم اضافه کنی: `Dark`, `Light`, `Aqua`.

اگه از روش معمولی (ارث‌بری) بری، باید برای هر صفحه، ۳ تا حالت بسازی:
*   `AboutDark`, `AboutLight`, `AboutAqua`
*   `CareersDark`, `CareersLight`, `CareersAqua`

می‌بینی؟ تعداد کلاس‌ها داره منفجر می‌شه! (تعداد صفحات × تعداد تم‌ها). 💣
اگه فردا ۱۰ تا صفحه و ۵ تا تم داشته باشی، باید ۵۰ تا کلاس بسازی!

**راه‌حل Bridge چیه؟**
می‌گه این دوتا رو از هم جدا کن:
۱. یه سلسله‌مراتب برای **صفحات** (About, Careers).
۲. یه سلسله‌مراتب برای **تم‌ها** (Dark, Light).
حالا توی هر صفحه، یه «پل» (Bridge) می‌زنیم به تم مورد نظر. اینطوری فقط ۱۰ + ۵ کلاس داریم، نه ۱۰ × ۵.

💡 **به زبون ساده:**
> دوتا چیزی که دارن جدا جدا تغییر می‌کنن، مثلاً «صفحه» و «تم»، رو به دوتا سلسله‌مراتب مستقل بشکن و با یه «پل» به هم وصلشون کن؛ اینطوری به جای ضرب کردن حالت‌ها در هم، فقط جمعشون می‌کنی.
> به جای اینکه بگی «من یه صفحه درباره ما هستم که سیاهه»، بگو «من یه صفحه درباره ما هستم که یه تم، حالا هر چی، دارم.»

![With and without the bridge pattern](images/without_bridge.png)

ویکی‌پدیا:

<div dir="ltr">

> The bridge pattern is a design pattern used in software engineering that is meant to "decouple an abstraction from its
> implementation so that the two can vary independently"

</div>

خلاصه‌اش این می‌شه: «انتزاع» (Abstraction) رو، یعنی همون چیزی که داری باهاش کار می‌کنی، از «پیاده‌سازی» (Implementation) جدا نگه دار؛ اونوقت هر کدوم می‌تونن مستقل از اون یکی تغییر کنن و رشد کنن، بدون اینکه به هم گره بخورن.

**مثال برنامه‌نویسی**

بیا همون مثال سایت و قالب که بالاتر درباره‌ش صحبت کردیم رو پیاده‌سازی کنیم.

در مرحله اول کلاس `WebPage` و پیاده‌سازی‌هایی از اون رو داریم.

برای قالب هم، باید کلاس و پیاده‌سازی‌های مختلفی بنویسیم:

<details>
<summary>Python</summary>

<div dir="ltr">

```python
class Theme:
    def getColor(self):
        pass


class DarkTheme(Theme):
    def getColor(self):
        return "Dark Black"


class LightTheme(Theme):
    def getColor(self):
        return "Off white"


class AquaTheme(Theme):
    def getColor(self):
        return "Light blue"


class WebPage:
    def __init__(self, theme):
        self.theme = theme

    def getContent(self):
        pass


class About(WebPage):
    def getContent(self):
        return "About page in " + self.theme.getColor()


class Careers(WebPage):
    def getContent(self):
        return "Careers page in " + self.theme.getColor()


# ----------------------------

darkTheme = DarkTheme()
aquaTheme = AquaTheme()

about = About(darkTheme)
careers = Careers(aquaTheme)

print(about.getContent())    # About page in Dark Black
print(careers.getContent())  # Careers page in Light blue
```

</div>

</details>

<details>
<summary>Typescript</summary>
<div dir="ltr">

```typescript
interface Theme {
    getColor(): string;
}

class DarkTheme implements Theme {
    getColor(): string {
        return "Dark Black";
    }
}

class LightTheme implements Theme {
    getColor(): string {
        return "Off white";
    }
}

class AquaTheme implements Theme {
    getColor(): string {
        return "Light blue";
    }
}

abstract class WebPage {
    protected theme: Theme;

    constructor(theme: Theme) {
        this.theme = theme;
    }

    abstract getContent(): string;
}

class About extends WebPage {
    getContent(): string {
        return "About page in " + this.theme.getColor();
    }
}

class Careers extends WebPage {
    getContent(): string {
        return "Careers page in " + this.theme.getColor();
    }
}

// ----------------------------

const darkTheme = new DarkTheme();
const aquaTheme = new AquaTheme();

const about = new About(darkTheme);
const careers = new Careers(aquaTheme);

console.log(about.getContent());    // About page in Dark Black
console.log(careers.getContent());  // Careers page in Light blue
```

</div>

</details>

<details>
<summary>JavaScript</summary>
<div dir="ltr">

```javascript
class Theme {
    getColor() {
        return "";
    }
}

class DarkTheme extends Theme {
    getColor() {
        return "Dark Black";
    }
}

class LightTheme extends Theme {
    getColor() {
        return "Off white";
    }
}

class AquaTheme extends Theme {
    getColor() {
        return "Light blue";
    }
}

class WebPage {
    constructor(theme) {
        this._theme = theme;
    }

    getContent() {
        return "";
    }
}

class About extends WebPage {
    getContent() {
        return `About page in ${this._theme.getColor()}`;
    }
}

class Careers extends WebPage {
    getContent() {
        return `Careers page in ${this._theme.getColor()}`;
    }
}


const darkTheme = new DarkTheme();
const aquaTheme = new AquaTheme();

const about = new About(darkTheme);
const careers = new Careers(aquaTheme);

console.log(about.getContent());    // About page in Dark Black
console.log(careers.getContent());  // Careers page in Light blue
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;


interface IWebPage
{
  string GetContent();
}

class About : IWebPage
{
  protected ITheme theme;

  public About(ITheme theme)
  {
    this.theme = theme;
  }

  public string GetContent()
  {
    return $"About page in {theme.GetColor()}";
  }
}

class Careers : IWebPage
{
  protected ITheme theme;

  public Careers(ITheme theme)
  {
    this.theme = theme;
  }

  public string GetContent()
  {
    return $"Careers page in {theme.GetColor()}";
  }
}


interface ITheme
{
  string GetColor();
}

class DarkTheme : ITheme
{
  public string GetColor()
  {
    return "Dark Black";
  }
}

class LightTheme : ITheme
{
  public string GetColor()
  {
    return "Off white";
  }
}

class AquaTheme : ITheme
{
  public string GetColor()
  {
    return "Light blue";
  }
}

// ----------------------------

var darkTheme = new DarkTheme();
var aquaTheme = new AquaTheme();

var about = new About(darkTheme);
var careers = new Careers(aquaTheme);

Console.WriteLine(about.GetContent());   // About page in Dark Black
Console.WriteLine(careers.GetContent()); // Careers page in Light blue

```

</div>

</details>

<details>
<summary>PHP</summary>
<div dir="ltr">

```php
interface WebPageInterface {
  public function getContent();
}

class About implements WebPageInterface {
  protected $theme;

  public function __construct(ThemeInterface $theme) {
    $this->theme = $theme;
  }

  public function getContent() {
    return "About page in " . $this->theme->getColor();
  }
}

class Careers implements WebPageInterface {
  protected $theme;

  public function __construct(ThemeInterface $theme) {
    $this->theme = $theme;
  }

  public function getContent() {
    return "Careers page in " . $this->theme->getColor();
  }
}

interface ThemeInterface {
  public function getColor();
}

class DarkTheme implements ThemeInterface {
  public function getColor() {
    return "Dark Black";
  }
}

class LightTheme implements ThemeInterface {
  public function getColor() {
    return "Off white";
  }
}

class AquaTheme implements ThemeInterface {
  public function getColor() {
    return "Light blue";
  }
}

$darkTheme = new DarkTheme();
$aquaTheme = new AquaTheme();

$about = new About($darkTheme);
$careers = new Careers($aquaTheme);

echo $about->getContent() . "\n";   // About page in Dark Black
echo $careers->getContent() . "\n"; // Careers page in Light blue

```

</div>

</details>

<details>
<summary>Go</summary>
<div dir="ltr">

```go
package main

import "fmt"

type IWebPage interface {
GetContent() string
}

type About struct {
theme ITheme
}

func NewAbout(theme ITheme) *About {
return &About{theme: theme}
}

func (a *About) GetContent() string {
return fmt.Sprintf("About page in %s", a.theme.GetColor())
}

type Careers struct {
theme ITheme
}

func NewCareers(theme ITheme) *Careers {
return &Careers{theme: theme}
}

func (c *Careers) GetContent() string {
return fmt.Sprintf("Careers page in %s", c.theme.GetColor())
}

type ITheme interface {
GetColor() string
}

type DarkTheme struct{}

func (d *DarkTheme) GetColor() string {
return "Dark Black"
}

type LightTheme struct{}

func (l *LightTheme) GetColor() string {
return "Off white"
}

type AquaTheme struct{}

func (a *AquaTheme) GetColor() string {
return "Light blue"
}

func main() {
darkTheme := &DarkTheme{}
aquaTheme := &AquaTheme{}

about := NewAbout(darkTheme)
careers := NewCareers(aquaTheme)

fmt.Println(about.GetContent())   // About page in Dark Black
fmt.Println(careers.GetContent()) // Careers page in Light blue
}
```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
interface WebPage {
    String getContent();
}

interface Theme {
    String getColor();
}

class About implements WebPage {
    private Theme theme;

    public About(Theme theme) {
        this.theme = theme;
    }

    public String getContent() {
        return "About page in " + theme.getColor();
    }
}

class Careers implements WebPage {
    private Theme theme;

    public Careers(Theme theme) {
        this.theme = theme;
    }

    public String getContent(){
        return "Careers page in "+ theme.getColor();
    }
}

class DarkTheme implements Theme {
    public String getColor() {
        return "Dark Black";
    }
}

class LightTheme implements Theme {
    public String getColor() {
        return "Off white";
    }
}

class AquaTheme implements Theme {
    public String getColor() {
        return "Light blue";
    }
}

// ----------------------------


DarkTheme darkTheme = new DarkTheme();
AquaTheme aquaTheme = new AquaTheme();

About about = new About(darkTheme);
Careers careers = new Careers(aquaTheme);

System.out.println(about.getContent());     // About page in Dark Black
System.out.println(careers.getContent());   // Careers page in Light blue
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>
#include <string>
#include <memory>

// Theme interface (Implementor)
class Theme {
public:
    virtual ~Theme() = default;
    virtual std::string getColor() = 0;
};

// Dark theme implementation
class DarkTheme : public Theme {
public:
    std::string getColor() override {
        return "Dark Black";
    }
};

// Light theme implementation
class LightTheme : public Theme {
public:
    std::string getColor() override {
        return "Off white";
    }
};

// Aqua theme implementation
class AquaTheme : public Theme {
public:
    std::string getColor() override {
        return "Light blue";
    }
};

// Web page abstraction
class WebPage {
protected:
    std::unique_ptr<Theme> theme;

public:
    WebPage(std::unique_ptr<Theme> theme) : theme(std::move(theme)) {}
    virtual ~WebPage() = default;
    virtual std::string getContent() = 0;
};

// About page
class About : public WebPage {
public:
    About(std::unique_ptr<Theme> theme) : WebPage(std::move(theme)) {}
    
    std::string getContent() override {
        return "About page in " + theme->getColor();
    }
};

// Careers page
class Careers : public WebPage {
public:
    Careers(std::unique_ptr<Theme> theme) : WebPage(std::move(theme)) {}
    
    std::string getContent() override {
        return "Careers page in " + theme->getColor();
    }
};

// Usage
int main() {
    About about(std::make_unique<DarkTheme>());
    Careers careers(std::make_unique<AquaTheme>());

    std::cout << about.getContent() << std::endl;     // About page in Dark Black
    std::cout << careers.getContent() << std::endl;   // Careers page in Light blue

    return 0;
}
```
</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
interface Theme {
    fun getColor(): String
}

interface WebPage {
    fun getContent(): String
}

class DarkTheme : Theme {
    override fun getColor() = "Dark Black"
}

class LightTheme : Theme {
    override fun getColor() = "Off white"
}

class AquaTheme : Theme {
    override fun getColor() = "Light blue"
}

class About(private val theme: Theme) : WebPage {
    override fun getContent() = "About page in " + theme.getColor()
}

class Careers(private val theme: Theme) : WebPage {
    override fun getContent() = "Careers page in " + theme.getColor()
}

// ----------------------------

fun main() {
    val darkTheme = DarkTheme()
    val aquaTheme = AquaTheme()

    val about = About(darkTheme)
    val careers = Careers(aquaTheme)

    println(about.getContent())
    println(careers.getContent())
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
abstract class Theme {
  String getColor();
}

abstract class WebPage {
  final Theme theme;

  WebPage(this.theme);

  String getContent();
}

class DarkTheme implements Theme {
  @override
  String getColor() => "Dark Black";
}

class LightTheme implements Theme {
  @override
  String getColor() => "Off white";
}

class AquaTheme implements Theme {
  @override
  String getColor() => "Light blue";
}

class About extends WebPage {
  About(Theme theme) : super(theme);

  @override
  String getContent() => "About page in " + theme.getColor();
}

class Careers extends WebPage {
  Careers(Theme theme) : super(theme);

  @override
  String getContent() => "Careers page in " + theme.getColor();
}

// ----------------------------

void main() {
  var darkTheme = DarkTheme();
  var aquaTheme = AquaTheme();

  var about = About(darkTheme);
  var careers = Careers(aquaTheme);

  print(about.getContent());
  print(careers.getContent());
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ «وقتی دوتا بُعد مستقل داری که جدا جدا زیاد می‌شن، مثل صفحه × تم، و نمی‌خوای ضربشون کنی در هم»؛ ❌ «وقتی فقط یه بُعد داری یا حالت‌ها هیچ‌وقت قرار نیست زیاد بشن».
> 🪤 **دام رایج:** «از همون اول همه‌چی رو با پل می‌سازی و کد رو الکی پیچیده می‌کنی، در حالی که هنوز انفجار کلاس‌ها اتفاق نیفتاده».
> 🔗 **فرقش با [مبدل (Adapter)](#مبدل-adapter-):** «مبدل بعد از ساخته‌شدن کد، دوتا چیز ناسازگار رو به هم می‌چسبونه؛ پل از اول طراحی می‌شه تا دو بُعد جدا بمونن».


<br>

---

<div align="center">

## درختی (Composite) 🌿

</div>

<div align="center">
📦 <b>مثال دنیای واقعی: جعبه تو جعبه</b>
</div>

فرض کن قراره قیمت یه بسته پستی بزرگ رو حساب کنی.
توی این بسته بزرگ، ممکنه:
۱. چندتا محصول تکی باشه (مثلاً یه کتاب، یه گوشی).
۲. چندتا «جعبه کوچیک‌تر» باشه که توی اون جعبه‌ها هم دوباره محصول یا حتی جعبه‌های دیگه هست!

اگه بخوای قیمت کل رو حساب کنی، باید دونه دونه جعبه‌ها رو باز کنی.
اما توی دنیای کامپیوتر، ما دوست داریم با **کل بسته** یه طوری رفتار کنیم که انگار یه **محصول تکی** هست.
یعنی وقتی می‌گیم `GetPrice()`، خودش بره ته توش رو دراره و قیمت همه زیرمجموعه‌هاش رو جمع بزنه و برگردونه.

💡 **به زبون ساده:**
> این پترن برای ساختن **ساختارهای درختی** (Tree Structures) عالیه.
> به تو اجازه می‌ده با یک «گروه از آبجکت‌ها» (Composite) دقیقاً همون‌طوری رفتار کنی که با یک «آبجکت تکی» (Leaf) رفتار می‌کنی.

![Composite](images/Composite.png)

ویکی‌پدیا:

<div dir="ltr">

> In software engineering, the composite pattern is a partitioning design pattern. The composite pattern describes that
> a group of objects is to be treated in the same way as a single instance of an object. The intent of a composite is
> to "
> compose" objects into tree structures to represent part-whole hierarchies. Implementing the composite pattern lets
> clients treat individual objects and compositions uniformly.

</div>

خلاصه‌اش این می‌شه که الگوی درختی بهت اجازه می‌ده آبجکت‌ها رو توی یه ساختار درختی بچینی و بعد کل اون درخت رو درست مثل یه آبجکت تکی صدا بزنی.
فرقی نمی‌کنه طرفت یه «برگ» تنهاست یا یه «شاخه» پر از زیرمجموعه؛ با هردوشون عین هم رفتار می‌کنی و خود ساختار، ته‌توش رو در میاره.

**مثال برنامه‌نویسی**

به‌طور کلی توی دیزاین پترن composite ما دو مدل دیتا داریم:

یک: اینکه Composite که می‌تونه برای خودش زیرمجموعه داشته باشه. (هرچند خودش هم وظایفی داشته باشه)

دو: Leaf که در واقع زیرمجموعه نداره و فقط یک سری وظیفه داره.

خب اول بیایم یک اینترفیس پایه برای کامپوننت‌هامون بسازیم و در ادامه هم اینترفیس‌های Composite و Leaf رو بسازیم:

<details>

<summary>Python</summary>

<div dir="ltr">

```python
from abc import ABC, abstractmethod
from typing import List


class Employee(ABC):
    @abstractmethod
    def get_name(self) -> str: ...

    @abstractmethod
    def get_salary(self) -> float: ...


class Developer(Employee):
    def __init__(self, name: str, salary: float) -> None:
        self._name = name
        self._salary = salary

    def get_name(self) -> str:
        return self._name

    def get_salary(self) -> float:
        return self._salary


class Designer(Employee):
    def __init__(self, name: str, salary: float) -> None:
        self._name = name
        self._salary = salary

    def get_name(self) -> str:
        return self._name

    def get_salary(self) -> float:
        return self._salary


# Organization is itself an Employee (the Composite); it can hold sub-members
class Organization(Employee):
    def __init__(self, name: str) -> None:
        self._name = name
        self._members: List[Employee] = []

    def add(self, employee: Employee) -> None:
        self._members.append(employee)

    def get_name(self) -> str:
        return self._name

    def get_salary(self) -> float:
        total = 0.0
        for member in self._members:
            total += member.get_salary()  # recurses into sub-organizations
        return total


# ----------------------------

design_team = Organization("Design Team")
design_team.add(Designer("Arya", 4000))

company = Organization("Acme")
company.add(Developer("John", 5000))
company.add(Developer("Jane", 6000))
company.add(design_team)

print(f"Total salary: {company.get_salary():g}")
# Total salary: 15000
```

</div>

</details>

<details>

<summary>Typescript</summary>

<div dir="ltr">

```typescript
interface Employee {
    getName(): string;

    getSalary(): number;
}

class Developer implements Employee {
    constructor(private name: string, private salary: number) {
    }

    getName(): string {
        return this.name;
    }

    getSalary(): number {
        return this.salary;
    }
}

class Designer implements Employee {
    constructor(private name: string, private salary: number) {
    }

    getName(): string {
        return this.name;
    }

    getSalary(): number {
        return this.salary;
    }
}

// Organization is itself an Employee (the Composite); it can hold sub-members
class Organization implements Employee {
    private members: Employee[] = [];

    constructor(private name: string) {
    }

    add(employee: Employee): void {
        this.members.push(employee);
    }

    getName(): string {
        return this.name;
    }

    getSalary(): number {
        let total = 0;
        for (const member of this.members) {
            total += member.getSalary(); // recurses into sub-organizations
        }
        return total;
    }
}

// ----------------------------

const designTeam = new Organization("Design Team");
designTeam.add(new Designer("Arya", 4000));

const company = new Organization("Acme");
company.add(new Developer("John", 5000));
company.add(new Developer("Jane", 6000));
company.add(designTeam);

console.log(`Total salary: ${company.getSalary()}`);
// Total salary: 15000
```

</div>

</details>

<details>

<summary>JavaScript</summary>

<div dir="ltr">

```javascript
class Developer {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    getName() {
        return this.name;
    }

    getSalary() {
        return this.salary;
    }
}

class Designer {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    getName() {
        return this.name;
    }

    getSalary() {
        return this.salary;
    }
}

// Organization is itself an Employee (the Composite); it can hold sub-members
class Organization {
    constructor(name) {
        this.name = name;
        this.members = [];
    }

    add(employee) {
        this.members.push(employee);
    }

    getName() {
        return this.name;
    }

    getSalary() {
        let total = 0;
        for (const member of this.members) {
            total += member.getSalary(); // recurses into sub-organizations
        }
        return total;
    }
}

// ----------------------------

const designTeam = new Organization("Design Team");
designTeam.add(new Designer("Arya", 4000));

const company = new Organization("Acme");
company.add(new Developer("John", 5000));
company.add(new Developer("Jane", 6000));
company.add(designTeam);

console.log(`Total salary: ${company.getSalary()}`);
// Total salary: 15000
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;
using System.Collections.Generic;

interface IEmployee
{
  string GetName();
  float GetSalary();
}

class Developer : IEmployee
{
  private string mName;
  private float mSalary;

  public Developer(string name, float salary)
  {
    this.mName = name;
    this.mSalary = salary;
  }

  public string GetName()
  {
    return this.mName;
  }

  public float GetSalary()
  {
    return this.mSalary;
  }
}

class Designer : IEmployee
{
  private string mName;
  private float mSalary;

  public Designer(string name, float salary)
  {
    this.mName = name;
    this.mSalary = salary;
  }

  public string GetName()
  {
    return this.mName;
  }

  public float GetSalary()
  {
    return this.mSalary;
  }
}

// Organization is itself an IEmployee (the Composite); it can hold sub-members
class Organization : IEmployee
{
  private string mName;
  private List<IEmployee> mMembers = new List<IEmployee>();

  public Organization(string name)
  {
    this.mName = name;
  }

  public void Add(IEmployee employee)
  {
    mMembers.Add(employee);
  }

  public string GetName()
  {
    return this.mName;
  }

  public float GetSalary()
  {
    float total = 0;
    foreach (var member in mMembers)
    {
      total += member.GetSalary(); // recurses into sub-organizations
    }
    return total;
  }
}

// ----------------------------

var designTeam = new Organization("Design Team");
designTeam.Add(new Designer("Arya", 4000));

var company = new Organization("Acme");
company.Add(new Developer("John", 5000));
company.Add(new Developer("Jane", 6000));
company.Add(designTeam);

Console.WriteLine($"Total salary: {company.GetSalary()}");
// Total salary: 15000
```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php
interface EmployeeInterface {
  function getName(): string;
  function getSalary(): float;
}

class Developer implements EmployeeInterface {
  private string $name;
  private float $salary;

  public function __construct(string $name, float $salary) {
    $this->name = $name;
    $this->salary = $salary;
  }

  public function getName(): string {
    return $this->name;
  }

  public function getSalary(): float {
    return $this->salary;
  }
}

class Designer implements EmployeeInterface {
  private string $name;
  private float $salary;

  public function __construct(string $name, float $salary) {
    $this->name = $name;
    $this->salary = $salary;
  }

  public function getName(): string {
    return $this->name;
  }

  public function getSalary(): float {
    return $this->salary;
  }
}

// Organization is itself an EmployeeInterface (the Composite); it can hold sub-members
class Organization implements EmployeeInterface {
  private string $name;
  private array $members = array();

  public function __construct(string $name) {
    $this->name = $name;
  }

  public function add(EmployeeInterface $employee): void {
    $this->members[] = $employee;
  }

  public function getName(): string {
    return $this->name;
  }

  public function getSalary(): float {
    $total = 0;
    foreach ($this->members as $member) {
      $total += $member->getSalary(); // recurses into sub-organizations
    }
    return $total;
  }
}

// ----------------------------

$designTeam = new Organization("Design Team");
$designTeam->add(new Designer("Arya", 4000));

$company = new Organization("Acme");
$company->add(new Developer("John", 5000));
$company->add(new Developer("Jane", 6000));
$company->add($designTeam);

echo "Total salary: " . $company->getSalary() . PHP_EOL;
// Total salary: 15000
```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go
package main

import "fmt"

type Employee interface {
    GetName() string
    GetSalary() float64
}

type Developer struct {
    Name   string
    Salary float64
}

func (d *Developer) GetName() string {
    return d.Name
}

func (d *Developer) GetSalary() float64 {
    return d.Salary
}

type Designer struct {
    Name   string
    Salary float64
}

func (d *Designer) GetName() string {
    return d.Name
}

func (d *Designer) GetSalary() float64 {
    return d.Salary
}

// Organization is itself an Employee (the Composite); it can hold sub-members
type Organization struct {
    Name    string
    members []Employee
}

func (o *Organization) Add(employee Employee) {
    o.members = append(o.members, employee)
}

func (o *Organization) GetName() string {
    return o.Name
}

func (o *Organization) GetSalary() float64 {
    total := float64(0)
    for _, member := range o.members {
        total += member.GetSalary() // recurses into sub-organizations
    }
    return total
}

func main() {
    designTeam := &Organization{Name: "Design Team"}
    designTeam.Add(&Designer{Name: "Arya", Salary: 4000})

    company := &Organization{Name: "Acme"}
    company.Add(&Developer{Name: "John", Salary: 5000})
    company.Add(&Developer{Name: "Jane", Salary: 6000})
    company.Add(designTeam)

    fmt.Printf("Total salary: %g\n", company.GetSalary())
    // Total salary: 15000
}
```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
import java.util.*;

interface Employee {

    String getName();
    float getSalary();
}

class Developer implements Employee {
    private String name;
    private float salary;

    public Developer(String name, float salary) {
        this.name = name;
        this.salary = salary;
    }

    public String getName() {
        return this.name;
    }
    public float getSalary() {
        return this.salary;
    }
}

class Designer implements Employee {
    private String name;
    private float salary;

    public Designer(String name, float salary) {
        this.name = name;
        this.salary = salary;
    }

    public String getName() {
        return this.name;
    }
    public float getSalary() {
        return this.salary;
    }
}

// Organization is itself an Employee (the Composite); it can hold sub-members
class Organization implements Employee {
    private String name;
    private List<Employee> members = new ArrayList<>();

    public Organization(String name) {
        this.name = name;
    }

    public void add(Employee employee) {
        members.add(employee);
    }

    public String getName() {
        return this.name;
    }

    public float getSalary() {
        float total = 0;
        for (Employee member : members) {
            total += member.getSalary(); // recurses into sub-organizations
        }
        return total;
    }
}

// ----------------------------

Organization designTeam = new Organization("Design Team");
designTeam.add(new Designer("Arya", 4000));

Organization company = new Organization("Acme");
company.add(new Developer("John", 5000));
company.add(new Developer("Jane", 6000));
company.add(designTeam);

System.out.printf("Total salary: %.0f%n", company.getSalary());
// Total salary: 15000
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>

// Employee interface
class Employee {
public:
    virtual ~Employee() = default;
    virtual std::string getName() const = 0;
    virtual double getSalary() const = 0;
};

// Developer leaf
class Developer : public Employee {
private:
    std::string name;
    double salary;

public:
    Developer(const std::string& name, double salary) : name(name), salary(salary) {}

    std::string getName() const override {
        return name;
    }

    double getSalary() const override {
        return salary;
    }
};

// Designer leaf
class Designer : public Employee {
private:
    std::string name;
    double salary;

public:
    Designer(const std::string& name, double salary) : name(name), salary(salary) {}

    std::string getName() const override {
        return name;
    }

    double getSalary() const override {
        return salary;
    }
};

// Organization is itself an Employee (the Composite); it can hold sub-members
class Organization : public Employee {
private:
    std::string name;
    std::vector<std::shared_ptr<Employee>> members;

public:
    explicit Organization(const std::string& name) : name(name) {}

    void add(std::shared_ptr<Employee> employee) {
        members.push_back(std::move(employee));
    }

    std::string getName() const override {
        return name;
    }

    double getSalary() const override {
        double total = 0.0;
        for (const auto& member : members) {
            total += member->getSalary(); // recurses into sub-organizations
        }
        return total;
    }
};

// Usage
int main() {
    auto designTeam = std::make_shared<Organization>("Design Team");
    designTeam->add(std::make_shared<Designer>("Arya", 4000));

    auto company = std::make_shared<Organization>("Acme");
    company->add(std::make_shared<Developer>("John", 5000));
    company->add(std::make_shared<Developer>("Jane", 6000));
    company->add(designTeam);

    std::cout << "Total salary: " << company->getSalary() << std::endl;
    // Total salary: 15000

    return 0;
}
```
</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
interface Employee {
    fun getName(): String
    fun getSalary(): Double
}

class Developer(private val name: String, private val salary: Double) : Employee {
    override fun getName() = name
    override fun getSalary() = salary
}

class Designer(private val name: String, private val salary: Double) : Employee {
    override fun getName() = name
    override fun getSalary() = salary
}

// Organization is itself an Employee (the Composite); it can hold sub-members
class Organization(private val name: String) : Employee {
    private val members = mutableListOf<Employee>()

    fun add(employee: Employee) {
        members.add(employee)
    }

    override fun getName() = name

    override fun getSalary(): Double {
        var total = 0.0
        for (member in members) {
            total += member.getSalary() // recurses into sub-organizations
        }
        return total
    }
}

// ----------------------------

fun main() {
    val designTeam = Organization("Design Team")
    designTeam.add(Designer("Arya", 4000.0))

    val company = Organization("Acme")
    company.add(Developer("John", 5000.0))
    company.add(Developer("Jane", 6000.0))
    company.add(designTeam)

    println("Total salary: ${company.getSalary().toInt()}")
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
abstract class Employee {
  String getName();
  double getSalary();
}

class Developer implements Employee {
  final String _name;
  final double _salary;

  Developer(this._name, this._salary);

  @override
  String getName() => _name;

  @override
  double getSalary() => _salary;
}

class Designer implements Employee {
  final String _name;
  final double _salary;

  Designer(this._name, this._salary);

  @override
  String getName() => _name;

  @override
  double getSalary() => _salary;
}

// Organization is itself an Employee (the Composite); it can hold sub-members
class Organization implements Employee {
  final String _name;
  final List<Employee> _members = [];

  Organization(this._name);

  void add(Employee employee) {
    _members.add(employee);
  }

  @override
  String getName() => _name;

  @override
  double getSalary() {
    double total = 0;
    for (var member in _members) {
      total += member.getSalary(); // recurses into sub-organizations
    }
    return total;
  }
}

// ----------------------------

void main() {
  var designTeam = Organization("Design Team");
  designTeam.add(Designer("Arya", 4000));

  var company = Organization("Acme");
  company.add(Developer("John", 5000));
  company.add(Developer("Jane", 6000));
  company.add(designTeam);

  print("Total salary: ${company.getSalary().toInt()}");
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ «وقتی داده‌هات یه ساختار درختی دارن (بخش‌ها و کل‌ها) و می‌خوای با تک‌آبجکت و گروه یه‌جور رفتار کنی»؛ ❌ «وقتی آبجکت‌هات سلسله‌مراتب ندارن و صاف کنار هم‌ان؛ اون‌جا درختی فقط پیچیدگی الکی اضافه می‌کنه».
> 🪤 **دام رایج:** «این‌قدر هوس می‌کنی همه‌چی رو یکدست کنی که متدهای بی‌معنی مثل add روی «برگ» هم می‌ذاری و در زمان اجرا می‌ترکه».


<br>

---

<div align="center">

## دکوریتور (Decorator) ☕

</div>

<div align="center">
☕ <b>مثال دنیای واقعی: کافی‌شاپ</b>
</div>

فرض کن رفتی کافی‌شاپ و سفارش قهوه می‌دی.
اول یه «قهوه ساده» سفارش می‌دی. ☕
بعد می‌گی «شیر هم اضافه کن». 🥛 (الآن شد قهوه با شیر)
بعد می‌گی «شکر هم بریز توش». 🧂 (الآن شد قهوه با شیر و شکر)

آیا برای هر کدوم از این ترکیب‌ها باید یه کلاس جدید بسازیم؟
*   `SimpleCoffee`
*   `CoffeeWithMilk`
*   `CoffeeWithMilkAndSugar`
*   ...

نه! اینطوری که کلاس‌ها منفجر می‌شن!
الگوی **Decorator** می‌گه: «قهوه ساده رو پایه قرار بده و هر چیزی که خواستی رو مثل لایه‌های مختلف دورش بپیچ (Decorate کن).»

💡 **به زبون ساده:**
> این پترن می‌گه: **«به جای اینکه کلاس رو تغییر بدی، قابلیت‌های جدید رو لایه لایه بهش اضافه کن.»**
> (دقیقا مثل لباس پوشیدن! اول لباس زیر، بعد پیراهن، بعد کاپشن. هر لایه یه چیزی به قبلی اضافه می‌کنه).

ویکی‌پدیا:

<div dir="ltr">

> In object-oriented programming, the decorator pattern is a design pattern that allows behavior to be added to an
> individual object, either statically or dynamically, without affecting the behavior of other objects from the same
> class. The decorator pattern is often useful for adhering to the Single Responsibility Principle, as it allows
> functionality to be divided between classes with unique areas of concern.

</div>

به زبون خودمون: الگوی دکوریتور می‌گه که می‌تونی بدون دست زدن به خود کلاس، رفتار و قابلیت‌های تازه رو به یه آبجکت مشخص اضافه کنی؛ اونم به‌صورت لایه‌لایه و حتی همون لحظه که برنامه داره اجرا می‌شه. اینطوری هر کلاس مسئول یه کار می‌مونه و آبجکت‌های دیگه از همون کلاس دست‌نخورده باقی می‌مونن.

**مثال برنامه‌نویسی**

بیا قهوه رو در نظر بگیریم. اول از همه یه قهوه ساده داریم که اینترفیس `Coffee` رو پیاده‌سازی می‌کنه.

می‌خوایم کد رو توسعه‌پذیر کنیم تا در صورت نیاز، گزینه‌های جدید بتونن رفتارش رو تغییر بدن.

پس بیا چند دکوریتور (Decorator) براش بسازیم.

همون‌طور که می‌بینی خیلی ساده می‌تونیم هر آبجکت رو به عنوان ورودی تابع بعدی بدیم و اینطوری چندین مرحله افزودنی رو خیلی
راحت به آبجکتمون اضافه کردیم!

<details>
<summary>Python</summary>

<div dir="ltr">

```python
class Coffee:
    def cost(self):
        pass

    def description(self):
        pass


class SimpleCoffee(Coffee):
    def cost(self):
        return 10

    def description(self):
        return 'Simple coffee'


class MilkDecorator(Coffee):
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost() + 2

    def description(self):
        return self._coffee.description() + ', milk'


class SugarDecorator(Coffee):
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost() + 1

    def description(self):
        return self._coffee.description() + ', sugar'


# ----------------------------

coffee = SimpleCoffee()
print(f"{coffee.description()}: {coffee.cost()}")  # Simple coffee: 10

coffee = MilkDecorator(coffee)
print(f"{coffee.description()}: {coffee.cost()}")  # Simple coffee, milk: 12

coffee = SugarDecorator(coffee)
print(f"{coffee.description()}: {coffee.cost()}")  # Simple coffee, milk, sugar: 13
```

</div>

</details>

<details>
<summary>Typescript</summary>
<div dir="ltr">

```typescript
interface Coffee {
    cost(): number;
    description(): string;
}

class SimpleCoffee implements Coffee {
    cost(): number {
        return 10;
    }

    description(): string {
        return "Simple coffee";
    }
}

class MilkDecorator implements Coffee {
    private coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost(): number {
        return this.coffee.cost() + 2;
    }

    description(): string {
        return this.coffee.description() + ", milk";
    }
}

class SugarDecorator implements Coffee {
    private coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost(): number {
        return this.coffee.cost() + 1;
    }

    description(): string {
        return this.coffee.description() + ", sugar";
    }
}

// ----------------------------

let coffee: Coffee = new SimpleCoffee();
console.log(`${coffee.description()}: ${coffee.cost()}`); // Simple coffee: 10

coffee = new MilkDecorator(coffee);
console.log(`${coffee.description()}: ${coffee.cost()}`); // Simple coffee, milk: 12

coffee = new SugarDecorator(coffee);
console.log(`${coffee.description()}: ${coffee.cost()}`); // Simple coffee, milk, sugar: 13
```

</div>
</details>

<details>
<summary>JavaScript</summary>
<div dir="ltr">

```javascript
class Coffee {
    cost() {
        throw new Error("cost() must be implemented by subclasses");
    }

    description() {
        throw new Error("description() must be implemented by subclasses");
    }
}

class SimpleCoffee extends Coffee {
    cost() {
        return 10;
    }

    description() {
        return "Simple coffee";
    }
}

class MilkDecorator extends Coffee {
    constructor(coffee) {
        super();
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 2;
    }

    description() {
        return this.coffee.description() + ", milk";
    }
}

class SugarDecorator extends Coffee {
    constructor(coffee) {
        super();
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 1;
    }

    description() {
        return this.coffee.description() + ", sugar";
    }
}


let coffee = new SimpleCoffee();
console.log(`${coffee.description()}: ${coffee.cost()}`); // Simple coffee: 10

coffee = new MilkDecorator(coffee);
console.log(`${coffee.description()}: ${coffee.cost()}`); // Simple coffee, milk: 12

coffee = new SugarDecorator(coffee);
console.log(`${coffee.description()}: ${coffee.cost()}`); // Simple coffee, milk, sugar: 13
```

</div>
</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;


interface ICoffee
{
  int Cost();
  string Description();
}

class SimpleCoffee : ICoffee
{
  public int Cost()
  {
    return 10;
  }

  public string Description()
  {
    return "Simple coffee";
  }
}

class MilkDecorator : ICoffee
{
  private readonly ICoffee mCoffee;

  public MilkDecorator(ICoffee coffee)
  {
    mCoffee = coffee ?? throw new ArgumentNullException("coffee", "coffee should not be null");
  }

  public int Cost()
  {
    return mCoffee.Cost() + 2;
  }

  public string Description()
  {
    return String.Concat(mCoffee.Description(), ", milk");
  }
}

class SugarDecorator : ICoffee
{
  private readonly ICoffee mCoffee;

  public SugarDecorator(ICoffee coffee)
  {
    mCoffee = coffee ?? throw new ArgumentNullException("coffee", "coffee should not be null");
  }

  public int Cost()
  {
    return mCoffee.Cost() + 1;
  }

  public string Description()
  {
    return String.Concat(mCoffee.Description(), ", sugar");
  }
}


// ----------------------------

ICoffee coffee = new SimpleCoffee();
Console.WriteLine($"{coffee.Description()}: {coffee.Cost()}"); // Simple coffee: 10

coffee = new MilkDecorator(coffee);
Console.WriteLine($"{coffee.Description()}: {coffee.Cost()}"); // Simple coffee, milk: 12

coffee = new SugarDecorator(coffee);
Console.WriteLine($"{coffee.Description()}: {coffee.Cost()}"); // Simple coffee, milk, sugar: 13

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php
interface CoffeeInterface {
  public function cost();
  public function description();
}

class SimpleCoffee implements CoffeeInterface {
  public function cost() {
    return 10;
  }

  public function description() {
    return "Simple coffee";
  }
}

class MilkDecorator implements CoffeeInterface {
  private $coffee;

  public function __construct(CoffeeInterface $coffee) {
    $this->coffee = $coffee ?? throw new Exception("coffee should not be null");
  }

  public function cost() {
    return $this->coffee->cost() + 2;
  }

  public function description() {
    return $this->coffee->description() . ", milk";
  }
}

class SugarDecorator implements CoffeeInterface {
  private $coffee;

  public function __construct(CoffeeInterface $coffee) {
    $this->coffee = $coffee ?? throw new Exception("coffee should not be null");
  }

  public function cost() {
    return $this->coffee->cost() + 1;
  }

  public function description() {
    return $this->coffee->description() . ", sugar";
  }
}

$coffee = new SimpleCoffee();
echo $coffee->description() . ": " . $coffee->cost() . "\n"; // Simple coffee: 10

$coffee = new MilkDecorator($coffee);
echo $coffee->description() . ": " . $coffee->cost() . "\n"; // Simple coffee, milk: 12

$coffee = new SugarDecorator($coffee);
echo $coffee->description() . ": " . $coffee->cost() . "\n"; // Simple coffee, milk, sugar: 13

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go
package main

import (
	"fmt"
)

type Coffee interface {
	Cost() int
	Description() string
}

type SimpleCoffee struct{}

func (c *SimpleCoffee) Cost() int {
	return 10
}

func (c *SimpleCoffee) Description() string {
	return "Simple coffee"
}

type MilkDecorator struct {
	coffee Coffee
}

func NewMilkDecorator(coffee Coffee) *MilkDecorator {
	if coffee == nil {
		panic("coffee should not be nil")
	}
	return &MilkDecorator{coffee: coffee}
}

func (c *MilkDecorator) Cost() int {
	return c.coffee.Cost() + 2
}

func (c *MilkDecorator) Description() string {
	return fmt.Sprintf("%s, milk", c.coffee.Description())
}

type SugarDecorator struct {
	coffee Coffee
}

func NewSugarDecorator(coffee Coffee) *SugarDecorator {
	if coffee == nil {
		panic("coffee should not be nil")
	}
	return &SugarDecorator{coffee: coffee}
}

func (c *SugarDecorator) Cost() int {
	return c.coffee.Cost() + 1
}

func (c *SugarDecorator) Description() string {
	return fmt.Sprintf("%s, sugar", c.coffee.Description())
}

func main() {
	var coffee Coffee = &SimpleCoffee{}
	fmt.Printf("%s: %d\n", coffee.Description(), coffee.Cost()) // Simple coffee: 10

	coffee = NewMilkDecorator(coffee)
	fmt.Printf("%s: %d\n", coffee.Description(), coffee.Cost()) // Simple coffee, milk: 12

	coffee = NewSugarDecorator(coffee)
	fmt.Printf("%s: %d\n", coffee.Description(), coffee.Cost()) // Simple coffee, milk, sugar: 13
}
```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
interface Coffee {

    int cost();
    String description();
}

class SimpleCoffee implements Coffee {

    public int cost() {
        return 10;
    }

    public String description() {
        return "Simple coffee";
    }
}

class MilkDecorator implements Coffee {
    private final Coffee coffee;

    public MilkDecorator(Coffee coffee) {
        if(coffee == null)
            throw new IllegalArgumentException("coffee should not be null");
        this.coffee = coffee;
    }

    public int cost() {
        return coffee.cost() + 2;
    }

    public String description() {
        return coffee.description() + ", milk";
    }
}

class SugarDecorator implements Coffee {
    private final Coffee coffee;

    public SugarDecorator(Coffee coffee) {
        if(coffee == null)
            throw new IllegalArgumentException("coffee should not be null");
        this.coffee = coffee;
    }

    public int cost() {
        return coffee.cost() + 1;
    }

    public String description() {
        return coffee.description() + ", sugar";
    }
}

// ----------------------------

Coffee coffee = new SimpleCoffee();
System.out.println(coffee.description() + ": " + coffee.cost()); // Simple coffee: 10

coffee = new MilkDecorator(coffee);
System.out.println(coffee.description() + ": " + coffee.cost()); // Simple coffee, milk: 12

coffee = new SugarDecorator(coffee);
System.out.println(coffee.description() + ": " + coffee.cost()); // Simple coffee, milk, sugar: 13
```

</div>
</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>
#include <string>
#include <memory>

// Coffee interface
class Coffee {
public:
    virtual ~Coffee() = default;
    virtual int cost() const = 0;
    virtual std::string description() const = 0;
};

// Simple coffee
class SimpleCoffee : public Coffee {
public:
    int cost() const override {
        return 10;
    }

    std::string description() const override {
        return "Simple coffee";
    }
};

// Milk decorator
class MilkDecorator : public Coffee {
    std::unique_ptr<Coffee> coffee;

public:
    MilkDecorator(std::unique_ptr<Coffee> coffee) : coffee(std::move(coffee)) {}

    int cost() const override {
        return coffee->cost() + 2;
    }

    std::string description() const override {
        return coffee->description() + ", milk";
    }
};

// Sugar decorator
class SugarDecorator : public Coffee {
    std::unique_ptr<Coffee> coffee;

public:
    SugarDecorator(std::unique_ptr<Coffee> coffee) : coffee(std::move(coffee)) {}

    int cost() const override {
        return coffee->cost() + 1;
    }

    std::string description() const override {
        return coffee->description() + ", sugar";
    }
};

// Usage
int main() {
    std::unique_ptr<Coffee> coffee = std::make_unique<SimpleCoffee>();
    std::cout << coffee->description() << ": " << coffee->cost() << std::endl; // Simple coffee: 10

    coffee = std::make_unique<MilkDecorator>(std::move(coffee));
    std::cout << coffee->description() << ": " << coffee->cost() << std::endl; // Simple coffee, milk: 12

    coffee = std::make_unique<SugarDecorator>(std::move(coffee));
    std::cout << coffee->description() << ": " << coffee->cost() << std::endl; // Simple coffee, milk, sugar: 13

    return 0;
}
```
</div>
</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
interface Coffee {
    fun cost(): Int
    fun description(): String
}

class SimpleCoffee : Coffee {
    override fun cost() = 10
    override fun description() = "Simple coffee"
}

class MilkDecorator(private val coffee: Coffee) : Coffee {
    override fun cost() = coffee.cost() + 2
    override fun description() = coffee.description() + ", milk"
}

class SugarDecorator(private val coffee: Coffee) : Coffee {
    override fun cost() = coffee.cost() + 1
    override fun description() = coffee.description() + ", sugar"
}

// ----------------------------

fun main() {
    var coffee: Coffee = SimpleCoffee()
    println("${coffee.description()}: ${coffee.cost()}")

    coffee = MilkDecorator(coffee)
    println("${coffee.description()}: ${coffee.cost()}")

    coffee = SugarDecorator(coffee)
    println("${coffee.description()}: ${coffee.cost()}")
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
abstract class Coffee {
  int cost();
  String description();
}

class SimpleCoffee implements Coffee {
  @override
  int cost() => 10;

  @override
  String description() => "Simple coffee";
}

class MilkDecorator implements Coffee {
  final Coffee _coffee;

  MilkDecorator(this._coffee);

  @override
  int cost() => _coffee.cost() + 2;

  @override
  String description() => _coffee.description() + ", milk";
}

class SugarDecorator implements Coffee {
  final Coffee _coffee;

  SugarDecorator(this._coffee);

  @override
  int cost() => _coffee.cost() + 1;

  @override
  String description() => _coffee.description() + ", sugar";
}

// ----------------------------

void main() {
  Coffee coffee = SimpleCoffee();
  print("${coffee.description()}: ${coffee.cost()}");

  coffee = MilkDecorator(coffee);
  print("${coffee.description()}: ${coffee.cost()}");

  coffee = SugarDecorator(coffee);
  print("${coffee.description()}: ${coffee.cost()}");
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ «وقتی می‌خوای قابلیت‌ها رو لایه‌لایه و موقع اجرا به یه آبجکت اضافه کنی، بدون اینکه کلاسش رو دست بزنی»؛ ❌ «وقتی فقط یکی دو حالت ثابت داری و یه ساب‌کلاس ساده کافیه».
> 🪤 **دام رایج:** «وقتی ده‌ها لایه روی هم می‌پیچی، دنبال کردن مسیر و دیباگ کردنش سخت و گیج‌کننده می‌شه».
> 🔗 **فرقش با [پراکسی (Proxy)](#پراکسی-proxy-):** «دکوریتور قابلیت تازه به آبجکت اضافه می‌کنه؛ پراکسی همون رفتار رو نگه می‌داره ولی دسترسی بهش رو کنترل می‌کنه».


<br>

---

<div align="center">

## نما (Facade) 📦

</div>

<div align="center">
💻 <b>مثال دنیای واقعی: دکمه پاور لپ‌تاپ</b>
</div>

تو برای روشن کردن لپ‌تاپ فقط یه کار می‌کنی: دکمه پاور رو می‌زنی.
ولی پشت همون یک دکمه، کلی کار ریز و درشت اتفاق می‌افته: برق‌رسانی، چک کردن سخت‌افزار، بوت شدن سیستم‌عامل، بالا اومدن سرویس‌ها و...

تو نه لازم داری این مراحل رو حفظ باشی، نه دوست داری هر بار ۱۰ تا دکمه بزنی. فقط می‌خوای «روشن بشه». 😄

💡 **به زبون ساده:**
> این پترن می‌گه: **«برای یک سیستم شلوغ و پیچیده، یه ورودیِ ساده و خوش‌دست درست کن.»**
> کاربر فقط با همون ورودی ساده کار می‌کنه و جزئیاتِ پشت پرده قایم می‌مونه.

ویکی‌پدیا:

<div dir="ltr">

> A facade is an object that provides a simplified interface to a larger body of code, such as a class library.

</div>

نما یه آبجکته که یه رابط ساده‌شده جلوی یه تیکه کدِ بزرگ‌تر می‌ذاره، مثل یه کتابخونه کلاس‌ها. تو با همون رابط ساده کار می‌کنی و درگیر پیچیدگی پشتش نمی‌شی.

**مثال برنامه‌نویسی**

بیا همون مثال مربوط به کامپیوتر رو پیاده‌سازی کنیم!

اول باید کلاس کامپیوتر رو بسازیم.

کلاس Facade به این صورت پیاده‌سازی می‌شه که یک آبجکت رو به عنوان ورودی دریافت می‌کنه و با هر تابع خودش یک سری عملیات رو
روی اون آبجکت اعمال می‌کنه.

<details>

<summary>Python</summary>

<div dir="ltr">

```python
class Computer:
    def getElectricShock(self):
        print("Ouch!")

    def makeSound(self):
        print("Beep beep!")

    def showLoadingScreen(self):
        print("Loading..")

    def bam(self):
        print("Ready to be used!")

    def closeEverything(self):
        print("Bup bup..")

    def pullCurrent(self):
        print("Haaah!")

    def sooth(self):
        print("Zzzzz")


class ComputerFacade:
    def __init__(self, computer):
        self.computer = computer

    def turnOn(self):
        self.computer.getElectricShock()
        self.computer.makeSound()
        self.computer.showLoadingScreen()
        self.computer.bam()

    def turnOff(self):
        self.computer.closeEverything()
        self.computer.pullCurrent()
        self.computer.sooth()


# ----------------------------

computer = ComputerFacade(Computer())
computer.turnOn()
computer.turnOff()

'''
Output:
Ouch!
Beep beep!
Loading..
Ready to be used!
Bup bup..
Haaah!
Zzzzz
'''
```

</div>

</details>

<details>

<summary>Typescript</summary>

<div dir="ltr">

```typescript
class Computer {
    getElectricShock() {
        console.log("Ouch!");
    }

    makeSound() {
        console.log("Beep beep!");
    }

    showLoadingScreen() {
        console.log("Loading..");
    }

    bam() {
        console.log("Ready to be used!");
    }

    closeEverything() {
        console.log("Bup bup..");
    }

    pullCurrent() {
        console.log("Haaah!");
    }

    sooth() {
        console.log("Zzzzz");
    }
}

class ComputerFacade {
    private computer: Computer;

    constructor(computer: Computer) {
        this.computer = computer;
    }

    turnOn() {
        this.computer.getElectricShock();
        this.computer.makeSound();
        this.computer.showLoadingScreen();
        this.computer.bam();
    }

    turnOff() {
        this.computer.closeEverything();
        this.computer.pullCurrent();
        this.computer.sooth();
    }
}

// ----------------------------

const computer = new ComputerFacade(new Computer());
computer.turnOn();
computer.turnOff();

// Output:
// Ouch!
// Beep beep!
// Loading..
// Ready to be used!
// Bup bup..
// Haaah!
// Zzzzz
```

</div>

</details>

<details>

<summary>JavaScript</summary>

<div dir="ltr">

```javascript
class Computer {
    getElectricShock() {
        console.log("Ouch!");
    }

    makeSound() {
        console.log("Beep beep!");
    }

    showLoadingScreen() {
        console.log("Loading..");
    }

    bam() {
        console.log("Ready to be used!");
    }

    closeEverything() {
        console.log("Bup bup..");
    }

    pullCurrent() {
        console.log("Haaah!");
    }

    sooth() {
        console.log("Zzzzz");
    }
}

class ComputerFacade {
    constructor(computer) {
        this.computer = computer;
    }

    turnOn() {
        this.computer.getElectricShock();
        this.computer.makeSound();
        this.computer.showLoadingScreen();
        this.computer.bam();
    }

    turnOff() {
        this.computer.closeEverything();
        this.computer.pullCurrent();
        this.computer.sooth();
    }
}

const computer = new ComputerFacade(new Computer());
computer.turnOn();
computer.turnOff();

// Output:
// Ouch!
// Beep beep!
// Loading..
// Ready to be used!
// Bup bup..
// Haaah!
// Zzzzz
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;


class Computer
{
  public void GetElectricShock()
  {
    Console.WriteLine("Ouch!");
  }

  public void MakeSound()
  {
    Console.WriteLine("Beep beep!");
  }

  public void ShowLoadingScreen()
  {
    Console.WriteLine("Loading..");
  }

  public void Bam()
  {
    Console.WriteLine("Ready to be used!");
  }

  public void CloseEverything()
  {
    Console.WriteLine("Bup bup..");
  }

  public void PullCurrent()
  {
    Console.WriteLine("Haaah!");
  }

  public void Sooth()
  {
    Console.WriteLine("Zzzzz");
  }
}


class ComputerFacade
{
  private readonly Computer mComputer;

  public ComputerFacade(Computer computer)
  {
    this.mComputer = computer ?? throw new ArgumentNullException("computer", "computer cannot be null");
  }

  public void TurnOn()
  {
    mComputer.GetElectricShock();
    mComputer.MakeSound();
    mComputer.ShowLoadingScreen();
    mComputer.Bam();
  }

  public void TurnOff()
  {
    mComputer.CloseEverything();
    mComputer.PullCurrent();
    mComputer.Sooth();
  }
}

// ----------------------------

var computer = new ComputerFacade(new Computer());
computer.TurnOn();
computer.TurnOff();

// Output:
// Ouch!
// Beep beep!
// Loading..
// Ready to be used!
// Bup bup..
// Haaah!
// Zzzzz

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php
class Computer
{
  public function getElectricShock()
  {
    echo "Ouch!" . PHP_EOL;
  }

  public function makeSound()
  {
    echo "Beep beep!" . PHP_EOL;
  }

  public function showLoadingScreen()
  {
    echo "Loading.." . PHP_EOL;
  }

  public function bam()
  {
    echo "Ready to be used!" . PHP_EOL;
  }

  public function closeEverything()
  {
    echo "Bup bup.." . PHP_EOL;
  }

  public function pullCurrent()
  {
    echo "Haaah!" . PHP_EOL;
  }

  public function sooth()
  {
    echo "Zzzzz" . PHP_EOL;
  }
}

class ComputerFacade
{
  public function __construct(private Computer $computer)
  {
  }

  public function turnOn()
  {
    $this->computer->getElectricShock();
    $this->computer->makeSound();
    $this->computer->showLoadingScreen();
    $this->computer->bam();
  }

  public function turnOff()
  {
    $this->computer->closeEverything();
    $this->computer->pullCurrent();
    $this->computer->sooth();
  }
}

$computerFacade = new ComputerFacade(new Computer());
$computerFacade->turnOn();
$computerFacade->turnOff();

// Output:
// Ouch!
// Beep beep!
// Loading..
// Ready to be used!
// Bup bup..
// Haaah!
// Zzzzz

```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go

package main

import (
    "fmt"
)

type computer struct{}

func (c *computer) getElectricShock() {
    fmt.Println("Ouch!")
}

func (c *computer) makeSound() {
    fmt.Println("Beep beep!")
}

func (c *computer) showLoadingScreen() {
    fmt.Println("Loading..")
}

func (c *computer) bam() {
    fmt.Println("Ready to be used!")
}

func (c *computer) closeEverything() {
    fmt.Println("Bup bup..")
}

func (c *computer) pullCurrent() {
    fmt.Println("Haaah!")
}

func (c *computer) sooth() {
    fmt.Println("Zzzzz")
}

type computerFacade struct {
    computer *computer
}

func newComputerFacade(c *computer) *computerFacade {
    if c == nil {
        panic("computer cannot be nil")
    }
    return &computerFacade{computer: c}
}

func (cf *computerFacade) turnOn() {
    cf.computer.getElectricShock()
    cf.computer.makeSound()
    cf.computer.showLoadingScreen()
    cf.computer.bam()
}

func (cf *computerFacade) turnOff() {
    cf.computer.closeEverything()
    cf.computer.pullCurrent()
    cf.computer.sooth()
}

func main() {
    c := newComputerFacade(&computer{})
    c.turnOn()
    c.turnOff()
}

// Output:
// Ouch!
// Beep beep!
// Loading..
// Ready to be used!
// Bup bup..
// Haaah!
// Zzzzz

```

</div>

</details>

<details>
  <summary>Java</summary>

<div dir="ltr">

```java
class Computer {
    public void getElectricShock() {
        System.out.println("Ouch!");
    }

    public void makeSound() {
        System.out.println("Beep beep!");
    }

    public void showLoadingScreen() {
        System.out.println("Loading..");
    }

    public void bam() {
        System.out.println("Ready to be used!");
    }

    public void closeEverything() {
        System.out.println("Bup bup..");
    }

    public void pullCurrent() {
        System.out.println("Haaah!");
    }

    public void sooth() {
        System.out.println("Zzzzz");
    }
}

class ComputerFacade {
    private Computer computer;

    public ComputerFacade(Computer computer) {
        if (computer == null)
            throw new IllegalArgumentException("computer cannot be null");
        this.computer = computer;
    }

    public void turnOn() {
        computer.getElectricShock();
        computer.makeSound();
        computer.showLoadingScreen();
        computer.bam();
    }

    public void turnOff() {
        computer.closeEverything();
        computer.pullCurrent();
        computer.sooth();
    }
}

// ----------------------------

ComputerFacade computer = new ComputerFacade(new Computer());
computer.turnOn();
computer.turnOff();

// Output:
// Ouch!
// Beep beep!
// Loading..
// Ready to be used!
// Bup bup..
// Haaah!
// Zzzzz
```

</div>

</details>

<details>
<summary>C++</summary>

<div dir="ltr">

```cpp
#include <iostream>

class Computer {
public:
    void getElectricShock() {
        std::cout << "Ouch!" << std::endl;
    }

    void makeSound() {
        std::cout << "Beep beep!" << std::endl;
    }

    void showLoadingScreen() {
        std::cout << "Loading.." << std::endl;
    }

    void bam() {
        std::cout << "Ready to be used!" << std::endl;
    }

    void closeEverything() {
        std::cout << "Bup bup.." << std::endl;
    }

    void pullCurrent() {
        std::cout << "Haaah!" << std::endl;
    }

    void sooth() {
        std::cout << "Zzzzz" << std::endl;
    }
};

class ComputerFacade {
private:
    Computer& computer;

public:
    ComputerFacade(Computer& comp) : computer(comp) {}

    void turnOn() {
        computer.getElectricShock();
        computer.makeSound();
        computer.showLoadingScreen();
        computer.bam();
    }

    void turnOff() {
        computer.closeEverything();
        computer.pullCurrent();
        computer.sooth();
    }
};

// ----------------------------

int main() {
    Computer comp;
    ComputerFacade computer(comp);
    computer.turnOn();
    computer.turnOff();
    return 0;
}

// Output:
// Ouch!
// Beep beep!
// Loading..
// Ready to be used!
// Bup bup..
// Haaah!
// Zzzzz
```

</div>

</details>

<details>
<summary>Kotlin</summary>

<div dir="ltr">

```kotlin
class Computer {
    fun getElectricShock() = println("Ouch!")
    fun makeSound() = println("Beep beep!")
    fun showLoadingScreen() = println("Loading..")
    fun bam() = println("Ready to be used!")
    fun closeEverything() = println("Bup bup..")
    fun pullCurrent() = println("Haaah!")
    fun sooth() = println("Zzzzz")
}

class ComputerFacade(private val computer: Computer) {
    fun turnOn() {
        computer.getElectricShock()
        computer.makeSound()
        computer.showLoadingScreen()
        computer.bam()
    }

    fun turnOff() {
        computer.closeEverything()
        computer.pullCurrent()
        computer.sooth()
    }
}

// ----------------------------

fun main() {
    val computer = ComputerFacade(Computer())
    computer.turnOn()
    computer.turnOff()
}
```

</div>
</details>

<details>
<summary>Dart</summary>

<div dir="ltr">

```dart
class Computer {
  void getElectricShock() => print('Ouch!');
  void makeSound() => print('Beep beep!');
  void showLoadingScreen() => print('Loading..');
  void bam() => print('Ready to be used!');
  void closeEverything() => print('Bup bup..');
  void pullCurrent() => print('Haaah!');
  void sooth() => print('Zzzzz');
}

class ComputerFacade {
  final Computer _computer;

  ComputerFacade(this._computer);

  void turnOn() {
    _computer.getElectricShock();
    _computer.makeSound();
    _computer.showLoadingScreen();
    _computer.bam();
  }

  void turnOff() {
    _computer.closeEverything();
    _computer.pullCurrent();
    _computer.sooth();
  }
}

// ----------------------------

void main() {
  var computer = ComputerFacade(Computer());
  computer.turnOn();
  computer.turnOff();
}
```

</div>
</details>

> 🤔 **کی به کارش ببریم؟**
> ✅ «وقتی یه زیرسیستم شلوغ و چندمرحله‌ای داری و می‌خوای یه ورودی ساده و خوش‌دست جلوش بذاری»؛ ❌ «وقتی فقط یه کلاس ساده داری که اصلاً پیچیدگی‌ای برای قایم کردن نداره».
> 🪤 **دام رایج:** «نما رو نکن یه گاد آبجکت (God Object) که خودش همه‌کاره‌ست؛ نما فقط هماهنگ‌کننده‌ست، نه انجام‌دهنده همه‌چی».


<br>

---

<div align="center">

## فلای‌وِیت (Flyweight) 🍃

</div>

<div align="center">
🍵 <b>مثال دنیای واقعی: غرفه چای</b>
</div>

توی غرفه چای معمولاً یه دیگ چای آماده هست و فروشنده فقط برای هر نفر یه لیوان می‌ریزه.
یعنی برای ۱۰۰ تا مشتری، قرار نیست ۱۰۰ بار «چای رو از صفر درست کنه»؛ بخش اصلی و مشترک (خودِ چای) رو نگه می‌داره و فقط چیزهای متفاوت رو برای هر نفر جدا حساب می‌کنه (مثلاً «کم‌شکر»، «با شیر»، «لیوانِ میز ۵»).

💡 **به زبون ساده:**
> این پترن می‌گه: **«بخش‌های مشترکِ آبجکت‌ها رو share کن؛ تفاوت‌ها رو از بیرون بهش بده.»**
> نتیجه؟ وقتی تعداد آبجکت‌ها خیلی زیاد می‌شه، حافظه و هزینه ساختن‌شون کمتر می‌شه.

ویکی‌پدیا:

<div dir="ltr">

> In computer programming, flyweight is a software design pattern. A flyweight is an object that minimizes memory use by
> sharing as much data as possible with other similar objects; it is a way to use objects in large numbers when a simple
> repeated representation would use an unacceptable amount of memory.

</div>

به زبون خودمون: فلای‌وِیت یه آبجکته که با share کردنِ بیشترین داده ممکن با آبجکت‌های مشابه، مصرف حافظه رو کم می‌کنه.
وقتی قراره تعداد خیلی زیادی آبجکت بسازی و حالت تکراری و ساده‌شون کلی حافظه می‌بلعه، این پترن به دادت می‌رسه.

**مثال برنامه‌نویسی**

بیا مثال غرفه چای رو پیاده‌سازی کنیم. اول باید انواع چای و چای‌ساز رو پیاده‌سازی کنیم.

توی مرحله بعد ما یک کلاس `TeaShop` داریم که وظیفه ثبت سفارش و آماده کردن اون‌هارو به عهده داره.

برای اینکه حواس‌مون پیشِ خودِ پترن بمونه، اینجا کلاس چای رو خالی گذاشتیم؛ توی دنیای واقعی همین آبجکتِ مشترک می‌تونه داده‌های سنگینِ مشترک رو نگه داره. نکته اصلی اینه که چای‌ساز برای هر «نوع» چای فقط یه بار آبجکت می‌سازه و دفعه‌های بعد همون رو پس می‌ده؛ شماره میز هم از بیرون به سفارش وصل می‌شه، نه داخل خودِ چای.

<details>
<summary>Python</summary>

<div dir="ltr">

```python
# KarakTea is the flyweight: the shared, intrinsic part.
class KarakTea:
    pass


# TeaMaker acts as the factory and caches one tea object per type.
class TeaMaker:
    def __init__(self):
        self.available_tea = {}

    def make(self, tea_type):
        if tea_type not in self.available_tea:
            self.available_tea[tea_type] = KarakTea()

        return self.available_tea[tea_type]

    def total_teas_made(self):
        return len(self.available_tea)


class TeaShop:
    def __init__(self, tea_maker):
        self.orders = {}
        self.tea_maker = tea_maker

    def take_order(self, tea_type, table):
        # Table number is the extrinsic state, passed in from outside.
        self.orders[table] = self.tea_maker.make(tea_type)

    def serve(self):
        for table in self.orders:
            print("Serving Karak Tea to table #" + str(table))


# ----------------------------

tea_maker = TeaMaker()
shop = TeaShop(tea_maker)

shop.take_order("Karak", 1)
shop.take_order("Karak", 3)
shop.take_order("Karak", 5)
shop.take_order("Karak", 7)
shop.take_order("Karak", 9)

shop.serve()

print("Total tea objects made: " + str(tea_maker.total_teas_made()))
# Serving Karak Tea to table #1
# Serving Karak Tea to table #3
# Serving Karak Tea to table #5
# Serving Karak Tea to table #7
# Serving Karak Tea to table #9
# Total tea objects made: 1
```

</div>

</details>

<details>
<summary>Typescript</summary>
<div dir="ltr">

```typescript
// KarakTea is the flyweight: the shared, intrinsic part.
class KarakTea {
}

// TeaMaker acts as the factory and caches one tea object per type.
class TeaMaker {
    private availableTea: { [key: string]: KarakTea } = {};

    make(teaType: string): KarakTea {
        if (!(teaType in this.availableTea)) {
            this.availableTea[teaType] = new KarakTea();
        }

        return this.availableTea[teaType];
    }

    totalTeasMade(): number {
        return Object.keys(this.availableTea).length;
    }
}

class TeaShop {
    private orders: { [key: number]: KarakTea } = {};
    private teaMaker: TeaMaker;

    constructor(teaMaker: TeaMaker) {
        this.teaMaker = teaMaker;
    }

    takeOrder(teaType: string, table: number): void {
        // Table number is the extrinsic state, passed in from outside.
        this.orders[table] = this.teaMaker.make(teaType);
    }

    serve(): void {
        for (const table in this.orders) {
            console.log("Serving Karak Tea to table #" + table);
        }
    }
}

// ----------------------------

const teaMaker = new TeaMaker();
const shop = new TeaShop(teaMaker);

shop.takeOrder("Karak", 1);
shop.takeOrder("Karak", 3);
shop.takeOrder("Karak", 5);
shop.takeOrder("Karak", 7);
shop.takeOrder("Karak", 9);

shop.serve();

console.log("Total tea objects made: " + teaMaker.totalTeasMade());
// Serving Karak Tea to table #1
// Serving Karak Tea to table #3
// Serving Karak Tea to table #5
// Serving Karak Tea to table #7
// Serving Karak Tea to table #9
// Total tea objects made: 1
```

</div>

</details>

<details>

<summary>JavaScript</summary>

<div dir="ltr">

```javascript
// KarakTea is the flyweight: the shared, intrinsic part.
class KarakTea {
}

// TeaMaker acts as the factory and caches one tea object per type.
class TeaMaker {
    constructor() {
        this.availableTea = {};
    }

    make(teaType) {
        if (!(teaType in this.availableTea)) {
            this.availableTea[teaType] = new KarakTea();
        }

        return this.availableTea[teaType];
    }

    totalTeasMade() {
        return Object.keys(this.availableTea).length;
    }
}

class TeaShop {
    constructor(teaMaker) {
        this.orders = {};
        this.teaMaker = teaMaker;
    }

    takeOrder(teaType, table) {
        // Table number is the extrinsic state, passed in from outside.
        this.orders[table] = this.teaMaker.make(teaType);
    }

    serve() {
        for (const table in this.orders) {
            console.log("Serving Karak Tea to table #" + table);
        }
    }
}


const teaMaker = new TeaMaker();
const shop = new TeaShop(teaMaker);

shop.takeOrder("Karak", 1);
shop.takeOrder("Karak", 3);
shop.takeOrder("Karak", 5);
shop.takeOrder("Karak", 7);
shop.takeOrder("Karak", 9);

shop.serve();

console.log("Total tea objects made: " + teaMaker.totalTeasMade());
// Serving Karak Tea to table #1
// Serving Karak Tea to table #3
// Serving Karak Tea to table #5
// Serving Karak Tea to table #7
// Serving Karak Tea to table #9
// Total tea objects made: 1
```

</div>

</details>

<details>
<summary>C#</summary>

<div dir="ltr">

```csharp
using System;
using System.Collections.Generic;


// KarakTea is the flyweight: the shared, intrinsic part.
class KarakTea
{
}

// Acts as a factory and caches one tea object per type.
class TeaMaker
{
  private Dictionary<string, KarakTea> mAvailableTea = new Dictionary<string, KarakTea>();

  public KarakTea Make(string teaType)
  {
    if (!mAvailableTea.ContainsKey(teaType))
    {
      mAvailableTea[teaType] = new KarakTea();
    }

    return mAvailableTea[teaType];
  }

  public int TotalTeasMade()
  {
    return mAvailableTea.Count;
  }
}

class TeaShop
{
  private Dictionary<int, KarakTea> mOrders = new Dictionary<int, KarakTea>();
  private readonly TeaMaker mTeaMaker;

  public TeaShop(TeaMaker teaMaker)
  {
    mTeaMaker = teaMaker ?? throw new ArgumentNullException("teaMaker", "teaMaker cannot be null");
  }

  public void TakeOrder(string teaType, int table)
  {
    // Table number is the extrinsic state, passed in from outside.
    mOrders[table] = mTeaMaker.Make(teaType);
  }

  public void Serve()
  {
    foreach (var table in mOrders.Keys)
    {
      Console.WriteLine("Serving Karak Tea to table #" + table);
    }
  }
}

// ----------------------------

var teaMaker = new TeaMaker();
var teaShop = new TeaShop(teaMaker);

teaShop.TakeOrder("Karak", 1);
teaShop.TakeOrder("Karak", 3);
teaShop.TakeOrder("Karak", 5);
teaShop.TakeOrder("Karak", 7);
teaShop.TakeOrder("Karak", 9);

teaShop.Serve();

Console.WriteLine("Total tea objects made: " + teaMaker.TotalTeasMade());
// Serving Karak Tea to table #1
// Serving Karak Tea to table #3
// Serving Karak Tea to table #5
// Serving Karak Tea to table #7
// Serving Karak Tea to table #9
// Total tea objects made: 1

```

</div>

</details>

<details>
<summary>PHP</summary>

<div dir="ltr">

```php
// KarakTea is the flyweight: the shared, intrinsic part.
class KarakTea
{
}

// Acts as a factory and caches one tea object per type.
class TeaMaker
{
  private array $mAvailableTea = [];

  public function make(string $teaType): KarakTea
  {
    if (!array_key_exists($teaType, $this->mAvailableTea)) {
      $this->mAvailableTea[$teaType] = new KarakTea();
    }

    return $this->mAvailableTea[$teaType];
  }

  public function totalTeasMade(): int
  {
    return count($this->mAvailableTea);
  }
}

class TeaShop
{
  private array $mOrders = [];

  public function __construct(private TeaMaker $teaMaker)
  {
  }

  public function takeOrder(string $teaType, int $table): void
  {
    // Table number is the extrinsic state, passed in from outside.
    $this->mOrders[$table] = $this->teaMaker->make($teaType);
  }

  public function serve(): void
  {
    foreach ($this->mOrders as $table => $tea) {
      echo "Serving Karak Tea to table #$table\n";
    }
  }
}

$teaMaker = new TeaMaker();
$teaShop = new TeaShop($teaMaker);

$teaShop->takeOrder("Karak", 1);
$teaShop->takeOrder("Karak", 3);
$teaShop->takeOrder("Karak", 5);
$teaShop->takeOrder("Karak", 7);
$teaShop->takeOrder("Karak", 9);

$teaShop->serve();

echo "Total tea objects made: " . $teaMaker->totalTeasMade() . "\n";
// Serving Karak Tea to table #1
// Serving Karak Tea to table #3
// Serving Karak Tea to table #5
// Serving Karak Tea to table #7
// Serving Karak Tea to table #9
// Total tea objects made: 1


```

</div>

</details>

<details>
<summary>Go</summary>

<div dir="ltr">

```go
package main

import "fmt"

// KarakTea is the flyweight: the shared, intrinsic part.
type KarakTea struct{}

// TeaMaker acts as the factory and caches one tea object per type.
type TeaMaker struct {
    mAvailableTea map[string]*KarakTea
}

func NewTeaMaker() *TeaMaker {
    return &TeaMaker{mAvailableTea: make(map[string]*KarakTea)}
}

func (tm *TeaMaker) Make(teaType string) *KarakTea {
    if _, ok := tm.mAvailableTea[teaType]; !ok {
        tm.mAvailableTea[teaType] = &KarakTea{}
    }
    return tm.mAvailableTea[teaType]
}

func (tm *TeaMaker) TotalTeasMade() int {
    return len(tm.mAvailableTea)
}

type TeaShop struct {
    mTables   []int
    mOrders   map[int]*KarakTea
    mTeaMaker *TeaMaker
}

func NewTeaShop(teaMaker *TeaMaker) *TeaShop {
    return &TeaShop{
        mOrders:   make(map[int]*KarakTea),
        mTeaMaker: teaMaker,
    }
}

func (ts *TeaShop) TakeOrder(teaType string, table int) {
    // Table number is the extrinsic state, passed in from outside.
    if _, ok := ts.mOrders[table]; !ok {
        ts.mTables = append(ts.mTables, table)
    }
    ts.mOrders[table] = ts.mTeaMaker.Make(teaType)
}

func (ts *TeaShop) Serve() {
    for _, table := range ts.mTables {
        fmt.Printf("Serving Karak Tea to table #%d\n", table)
    }
}
// ---------------------------

func main() {
    teaMaker := NewTeaMaker()
<!-- truncated -->
