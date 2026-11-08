<div align="center">

# 🤖 NetraUploader

**A serverless Telegram file-uploader bot — runs entirely on Cloudflare, no server required.**

[![Telegram Bot API](https://img.shields.io/badge/Telegram-Bot%20API-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://core.telegram.org/bots/api)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Cloudflare D1](https://img.shields.io/badge/Cloudflare-D1%20Database-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/d1/)

📢 **Telegram Channel:** [@NetraIR](https://t.me/NetraIR)

**Language:** [🇬🇧 English](#english) · [🇮🇷 فارسی](#فارسی) · [🇨🇳 中文](#中文) · [🇷🇺 Русский](#русский)

</div>

---

## English

📢 Telegram Channel: [@NetraIR](https://t.me/NetraIR)

### 📖 What this is

A Telegram bot that stores files (in a private Telegram channel you control) and hands out a private download link/code for each one. It supports 10 interface languages, an admin panel, optional forced-join, and optional auto-delete of sent files.

### ✅ Before you start

You'll need: a Cloudflare account (free tier is fine) and a Telegram account. Everything is done through Cloudflare's web dashboard — no Node.js or command-line tools required.

> 🚀 **Prefer an easy install?** Talk to **[@NetraInstallerBOT](https://t.me/NetraInstallerBOT)** on Telegram — it walks you through setup step by step, no manual copy-pasting needed.

### ⚙️ Installation

1. **🤖 Create your bot**
   - Open Telegram, search for **@BotFather**, and start a chat with it.
   - Send `/newbot` and follow the prompts (it'll ask you to pick a name).
   - At the end it gives you a long code called a **token**. Copy and save it — this is your `BOT_TOKEN`.

2. **🆔 Find your Telegram ID**
   - Search for **@userinfobot** and send it any message.
   - It replies with a number — that's your personal ID. Save it — this is your `OWNER_ID`.

3. **☁️ Sign up for a free Cloudflare account**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up (the free plan is enough).

4. **🗄️ Create a database**
   - In the Cloudflare dashboard, click **Storage & Databases** on the left, then click **D1 SQL Database**.
   - Click **Create database**, type the name `filestore-bot`, and create it.
   - Open the new database and copy the **Database ID** shown on the page — save it for later.

5. **📄 Load the starting structure into the database**
   - On that same database page, click the **Console** tab.
   - Open the `schema.sql` file (included in this project) with Notepad or any text editor.
   - Copy everything in it, paste it into the Console box, and click **Run**.

6. **⚡ Create the Worker** (this is where your bot's code will live)
   - Go to **Workers & Pages**, click **Create**, then **Create Worker**.
   - Give it any name, e.g. `my-file-bot`, and click **Deploy** to finish creating it.

7. **💻 Add your bot's code**
   - Open the Worker you just created and click **Edit code**.
   - Delete all the default code inside.
   - Open the `worker.js` file from this project, copy everything in it, and paste it in.
   - Click **Save and deploy**.

8. **🔧 Set up your Worker's variables** (this covers everything in the Variables tab)
   - Go to the Worker's **Settings** tab, then click **Variables** (sometimes called Bindings).
   - Under **D1 Database Bindings**, click **Add binding**. For "Variable name" type `DB`, and pick the `filestore-bot` database.
   - Still on this tab, add these three variables one at a time:

   | Variable | Value | Encrypt? |
   |---|---|---|
   | `OWNER_ID` | Your Telegram ID from step 2 | No |
   | `BOT_TOKEN` | Your bot's token from step 1 | ✅ Yes |
   | `WEBHOOK_SECRET` | A random string, at least 16 characters, mixing letters and numbers (e.g. `mySecret2026XYZ!`) — the longer and more random, the safer | ✅ Yes |

   - Click **Save** (and redeploy if it asks you to).

9. **🌐 Copy your Worker's web address**
    - On the Worker's main page you'll see an address ending in `.workers.dev`. Copy it.

10. **📡 Tell Telegram where your bot lives**
    - Open this link in your browser, replacing the parts inside `< >` with your own token and worker address:
    ```
    https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<your-worker>.workers.dev/webhook/<WEBHOOK_SECRET>
    ```
    - If it worked, you'll see `{"ok":true,...}` on the page.

11. **🚀 Try it out!**
    - Open your bot in Telegram and send `/start`.
    - Since you're the owner, also send `/admin` to open the control panel. The first thing it asks for is your storage channel — just forward it any message from that channel (make sure your bot is an admin of that channel first).

### 💬 Support

Questions or issues? Reach out on Telegram: **[@NetraIR](https://t.me/NetraIR)**

---

## فارسی

📢 کانال تلگرام: [@NetraIR](https://t.me/NetraIR)

### 📖 این چیست

یک ربات تلگرام که فایل‌ها را در یک کانال خصوصی تلگرام (متعلق به خودتان) ذخیره می‌کند و برای هر فایل یک لینک/کد دانلود اختصاصی می‌دهد. از ۱۰ زبان رابط کاربری، پنل مدیریت، عضویت اجباری اختیاری و حذف خودکار فایل ارسالی پشتیبانی می‌کند.

### ✅ قبل از شروع

به این‌ها نیاز دارید: یک حساب Cloudflare (پلن رایگان کافی است) و یک حساب تلگرام. همهٔ مراحل از طریق پنل وب Cloudflare انجام می‌شود — نیازی به نصب Node.js یا هیچ ابزار خط فرمانی نیست.

> 🚀 **نصب آسان‌تر می‌خواهید؟** با ربات **[@NetraInstallerBOT](https://t.me/NetraInstallerBOT)** در تلگرام صحبت کنید — مرحله به مرحله راه‌اندازی را برایتان انجام می‌دهد، بدون نیاز به کپی-پیست دستی.

### ⚙️ نصب

1. **🤖 ربات‌تان را بسازید**
   - تلگرام را باز کنید، دنبال **BotFather@** بگردید و با آن چت را شروع کنید.
   - پیام `/newbot` را بفرستید و مراحل را دنبال کنید (از شما یک اسم می‌خواهد).
   - در پایان یک کد طولانی به شما می‌دهد به نام **توکن**. آن را کپی و جایی ذخیره کنید — این همان `BOT_TOKEN` شماست.

2. **🆔 آی‌دی تلگرام‌تان را پیدا کنید**
   - دنبال **userinfobot@** بگردید و هر پیامی برایش بفرستید.
   - یک عدد برایتان می‌فرستد — همان آی‌دی شخصی شماست. آن را ذخیره کنید — این `OWNER_ID` شماست.

3. **☁️ یک حساب رایگان Cloudflare بسازید**
   - به آدرس [dash.cloudflare.com](https://dash.cloudflare.com) بروید و ثبت‌نام کنید (پلن رایگان کافی است).

4. **🗄️ یک دیتابیس بسازید**
   - در داشبورد Cloudflare، از منوی سمت چپ روی **Storage & Databases** کلیک کنید، سپس روی **D1 SQL Database**.
   - روی **Create database** کلیک کنید، نام `filestore-bot` را بنویسید و بسازید.
   - دیتابیس تازه‌ساخته را باز کنید و مقدار **Database ID** نمایش داده‌شده را کپی و جایی یادداشت کنید.

5. **📄 ساختار اولیهٔ دیتابیس را وارد کنید**
   - در همان صفحهٔ دیتابیس، تب **Console** را باز کنید.
   - فایل `schema.sql` (همراه این پروژه) را با یک ویرایشگر متن مثل Notepad باز کنید.
   - کل محتوای آن را کپی کنید، در کادر Console جای‌گذاری کنید و روی **Run** کلیک کنید.

6. **⚡ Worker بسازید** (جایی که کد ربات‌تان زندگی می‌کند)
   - به **Workers & Pages** بروید، روی **Create** و سپس **Create Worker** کلیک کنید.
   - یک نام دلخواه مثل `my-file-bot` بدهید و روی **Deploy** بزنید تا ساخته شود.

7. **💻 کد ربات را اضافه کنید**
   - Workerی که ساختید را باز کنید و روی **Edit code** کلیک کنید.
   - تمام کد پیش‌فرض داخلش را پاک کنید.
   - فایل `worker.js` (همراه این پروژه) را باز کنید، همه‌اش را کپی و اینجا جای‌گذاری کنید.
   - روی **Save and deploy** کلیک کنید.

8. **🔧 متغیرهای Worker را تنظیم کنید** (همهٔ این کارها در یک تب انجام می‌شود)
   - به تب **Settings** ورکر بروید، سپس روی **Variables** کلیک کنید (گاهی Bindings هم نامیده می‌شود).
   - در بخش **D1 Database Bindings** روی **Add binding** کلیک کنید. در قسمت «Variable name» بنویسید `DB` و دیتابیس `filestore-bot` را انتخاب کنید.
   - در همان تب، این سه متغیر را هم اضافه کنید:

   | متغیر | مقدار | رمزنگاری (Encrypt)؟ |
   |---|---|---|
   | `OWNER_ID` | آی‌دی تلگرامی که در مرحلهٔ ۲ گرفتید | خیر |
   | `BOT_TOKEN` | توکنی که در مرحلهٔ ۱ گرفتید | ✅ بله |
   | `WEBHOOK_SECRET` | یک رشتهٔ تصادفی حداقل ۱۶ کاراکتری، ترکیبی از حروف و عدد (مثلاً `mySecret2026XYZ!`) — هرچه طولانی‌تر و تصادفی‌تر، امن‌تر | ✅ بله |

   - روی **Save** کلیک کنید (اگر خواست، دوباره Deploy کنید).

9. **🌐 آدرس اینترنتی Worker را کپی کنید**
    - در صفحهٔ اصلی Worker، یک آدرس با پسوند `.workers.dev` می‌بینید. آن را کپی کنید.

10. **📡 به تلگرام بگویید ربات‌تان کجاست**
    - این لینک را در مرورگرتان باز کنید، فقط دو قسمت داخل `< >` را با توکن و آدرس Worker خودتان جایگزین کنید:
    ```
    https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<your-worker>.workers.dev/webhook/<WEBHOOK_SECRET>
    ```
    - اگر درست کار کرد، عبارت `{"ok":true,...}` را در صفحه می‌بینید.

11. **🚀 امتحانش کنید!**
    - ربات‌تان را در تلگرام باز کنید و `/start` بفرستید.
    - چون شما مالک هستید، `/admin` را هم بفرستید تا پنل مدیریت باز شود. اولین کاری که از شما می‌خواهد تنظیم کانال ذخیره‌سازی است — کافیست یک پیام از آن کانال را برای ربات فوروارد کنید (قبلش مطمئن شوید ربات ادمین همان کانال شده باشد).

### 💬 پشتیبانی

سوال یا مشکلی دارید؟ در تلگرام پیام بدهید: **[@NetraIR](https://t.me/NetraIR)**

---

## 中文

📢 Telegram 频道: [@NetraIR](https://t.me/NetraIR)

### 📖 这是什么

一个 Telegram 机器人,将文件保存在您自己控制的私有 Telegram 频道中,并为每个文件生成专属的下载链接/代码。支持 10 种界面语言、管理面板、可选的强制加入频道功能,以及可选的文件自动删除功能。

### ✅ 开始之前

您需要:一个 Cloudflare 账户(免费套餐即可)和一个 Telegram 账户。全部操作都通过 Cloudflare 的网页控制台完成——不需要安装 Node.js 或任何命令行工具。

> 🚀 **想要更简单的安装方式?** 联系 Telegram 机器人 **[@NetraInstallerBOT](https://t.me/NetraInstallerBOT)**,它会一步步引导您完成设置,无需手动复制粘贴。

### ⚙️ 安装步骤

1. **🤖 创建您的机器人**
   - 打开 Telegram,搜索 **@BotFather**,和它开始对话。
   - 发送 `/newbot`,按照提示操作(它会让您取一个名字)。
   - 最后它会给您一长串代码,叫做**令牌(token)**。复制并保存好——这就是您的 `BOT_TOKEN`。

2. **🆔 找到您的 Telegram ID**
   - 搜索 **@userinfobot**,给它发送任意一条消息。
   - 它会回复一个数字,这就是您的个人 ID。保存它——这就是您的 `OWNER_ID`。

3. **☁️ 注册一个免费的 Cloudflare 账户**
   - 前往 [dash.cloudflare.com](https://dash.cloudflare.com) 注册(免费套餐就够用)。

4. **🗄️ 创建一个数据库**
   - 在 Cloudflare 控制台左侧菜单,点击 **Storage & Databases**,再点击 **D1 SQL Database**。
   - 点击 **Create database**,输入名称 `filestore-bot`,创建。
   - 打开这个新数据库,复制页面上显示的 **Database ID**,先保存下来。

5. **📄 导入数据库的初始结构**
   - 在同一个数据库页面,打开 **Console** 标签页。
   - 用文本编辑器(比如记事本)打开项目里的 `schema.sql` 文件。
   - 复制里面全部内容,粘贴到 Console 输入框中,点击 **Run**。

6. **⚡ 创建 Worker**(您机器人代码存放的地方)
   - 前往 **Workers & Pages**,点击 **Create**,再点击 **Create Worker**。
   - 随便取个名字,比如 `my-file-bot`,点击 **Deploy** 完成创建。

7. **💻 添加机器人代码**
   - 打开刚创建的 Worker,点击 **Edit code**。
   - 删除里面所有默认代码。
   - 打开项目里的 `worker.js` 文件,复制全部内容,粘贴进去。
   - 点击 **Save and deploy**。

8. **🔧 设置 Worker 的变量**(这些操作都在同一个标签页完成)
   - 进入 Worker 的 **Settings** 标签页,再点击 **Variables**(有时也叫 Bindings)。
   - 在 **D1 Database Bindings** 部分点击 **Add binding**。"Variable name" 填 `DB`,数据库选择 `filestore-bot`。
   - 在同一个页面,再添加以下三个变量:

   | 变量 | 值 | 是否加密 |
   |---|---|---|
   | `OWNER_ID` | 第 2 步得到的 Telegram ID | 否 |
   | `BOT_TOKEN` | 第 1 步得到的令牌 | ✅ 是 |
   | `WEBHOOK_SECRET` | 自己编一串至少 16 个字符的随机字符串,字母加数字混合(例如 `mySecret2026XYZ!`)——越长、越随机越安全 | ✅ 是 |

   - 点击 **Save**(如果提示,请重新部署)。

9. **🌐 复制 Worker 的网址**
    - 在 Worker 主页面,您会看到一个以 `.workers.dev` 结尾的网址,复制它。

10. **📡 告诉 Telegram 您的机器人在哪里**
    - 在浏览器中打开下面这个链接,把 `< >` 里的部分换成您自己的令牌和 Worker 地址:
    ```
    https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<your-worker>.workers.dev/webhook/<WEBHOOK_SECRET>
    ```
    - 如果成功,页面上会显示 `{"ok":true,...}`。

11. **🚀 试试看!**
    - 在 Telegram 中打开您的机器人,发送 `/start`。
    - 因为您是所有者,再发送 `/admin` 打开管理面板。它首先会让您设置存储频道——只需转发该频道的一条消息给机器人即可(记得先把机器人加为该频道的管理员)。

### 💬 获取支持

有问题或遇到故障?请通过 Telegram 联系:**[@NetraIR](https://t.me/NetraIR)**

---

## Русский

📢 Телеграм-канал: [@NetraIR](https://t.me/NetraIR)

### 📖 Что это такое

Telegram-бот, который сохраняет файлы в приватном Telegram-канале, принадлежащем вам, и выдаёт для каждого файла приватную ссылку/код для скачивания. Поддерживает 10 языков интерфейса, панель администратора, опциональную обязательную подписку на канал и опциональное автоудаление отправленных файлов.

### ✅ Перед началом

Понадобится: аккаунт Cloudflare (бесплатного тарифа достаточно) и аккаунт Telegram. Всё делается через веб-панель Cloudflare — устанавливать Node.js или какие-либо инструменты командной строки не нужно.

> 🚀 **Хотите более простую установку?** Напишите боту **[@NetraInstallerBOT](https://t.me/NetraInstallerBOT)** в Telegram — он проведёт вас через настройку шаг за шагом, без ручного копирования и вставки.

### ⚙️ Установка

1. **🤖 Создайте своего бота**
   - Откройте Telegram, найдите **@BotFather** и начните с ним чат.
   - Отправьте `/newbot` и следуйте подсказкам (он попросит придумать имя).
   - В конце он даст вам длинный код — **токен**. Скопируйте и сохраните его — это ваш `BOT_TOKEN`.

2. **🆔 Узнайте свой Telegram ID**
   - Найдите **@userinfobot** и отправьте ему любое сообщение.
   - Он ответит числом — это ваш личный ID. Сохраните его — это ваш `OWNER_ID`.

3. **☁️ Зарегистрируйте бесплатный аккаунт Cloudflare**
   - Перейдите на [dash.cloudflare.com](https://dash.cloudflare.com) и зарегистрируйтесь (бесплатного тарифа достаточно).

4. **🗄️ Создайте базу данных**
   - В панели Cloudflare слева нажмите **Storage & Databases**, затем **D1 SQL Database**.
   - Нажмите **Create database**, введите имя `filestore-bot` и создайте.
   - Откройте новую базу данных и скопируйте показанный **Database ID** — сохраните его.

5. **📄 Загрузите начальную структуру базы данных**
   - На той же странице базы данных откройте вкладку **Console**.
   - Откройте файл `schema.sql` (идёт вместе с проектом) в любом текстовом редакторе.
   - Скопируйте всё его содержимое, вставьте в поле Console и нажмите **Run**.

6. **⚡ Создайте Worker** (место, где будет жить код бота)
   - Перейдите в **Workers & Pages**, нажмите **Create**, затем **Create Worker**.
   - Дайте любое имя, например `my-file-bot`, и нажмите **Deploy**, чтобы завершить создание.

7. **💻 Добавьте код бота**
   - Откройте созданный Worker и нажмите **Edit code**.
   - Удалите весь код по умолчанию.
   - Откройте файл `worker.js` (из этого проекта), скопируйте всё содержимое и вставьте сюда.
   - Нажмите **Save and deploy**.

8. **🔧 Настройте переменные Worker'а** (всё делается на одной вкладке)
   - Перейдите на вкладку **Settings** Worker'а, затем нажмите **Variables** (иногда называется Bindings).
   - В разделе **D1 Database Bindings** нажмите **Add binding**. В поле "Variable name" впишите `DB`, а базу выберите `filestore-bot`.
   - На этой же странице добавьте ещё три переменные:

   | Переменная | Значение | Encrypt? |
   |---|---|---|
   | `OWNER_ID` | Ваш Telegram ID из шага 2 | Нет |
   | `BOT_TOKEN` | Токен бота из шага 1 | ✅ Да |
   | `WEBHOOK_SECRET` | Случайная строка не короче 16 символов, смесь букв и цифр (например, `mySecret2026XYZ!`) — чем длиннее и случайнее, тем безопаснее | ✅ Да |

   - Нажмите **Save** (и разверните заново, если попросит).

9. **🌐 Скопируйте адрес вашего Worker**
    - На главной странице Worker вы увидите адрес, заканчивающийся на `.workers.dev`. Скопируйте его.

10. **📡 Скажите Telegram, где находится ваш бот**
    - Откройте эту ссылку в браузере, заменив части в `< >` на свой токен и адрес Worker:
    ```
    https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<your-worker>.workers.dev/webhook/<WEBHOOK_SECRET>
    ```
    - Если всё получилось, на странице появится `{"ok":true,...}`.

11. **🚀 Проверьте, как это работает!**
    - Откройте вашего бота в Telegram и отправьте `/start`.
    - Так как вы владелец, отправьте `/admin`, чтобы открыть панель управления. Сначала она попросит настроить канал хранения — просто перешлите боту любое сообщение из этого канала (сначала добавьте бота туда администратором).

### 💬 Поддержка

Вопросы или проблемы? Пишите в Telegram: **[@NetraIR](https://t.me/NetraIR)**