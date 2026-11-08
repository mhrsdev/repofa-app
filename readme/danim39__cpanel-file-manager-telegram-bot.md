# cPanel File Manager Telegram Bot

A Telegram bot that lets you browse, view, edit, and upload files on your cPanel-hosted server directly from Telegram — powered by the cPanel UAPI `Fileman` module.

## Features

- 📂 **Browse directories** — navigate your server's folder structure with inline buttons
- 📄 **View file content** — read any file's content straight from Telegram
- ✏️ **Edit files** — send new text to overwrite a file's content
- 📤 **Upload files** — send a document to Telegram and have it uploaded to your server

## How it works

The bot talks to the [cPanel UAPI](https://api.docs.cpanel.net/openapi/cpanel/operation/get_file_content/) over HTTPS using an API token, and uses [pyTelegramBotAPI](https://github.com/eternnoir/pyTelegramBotAPI) to handle the Telegram side.

| Action | UAPI Function |
|---|---|
| List files/folders | `Fileman::list_files` |
| Read file content | `Fileman::get_file_content` |
| Save/overwrite file content | `Fileman::save_file_content` |
| Upload a file | `Fileman::upload_files` |

## Requirements

- Python 3.9+
- A cPanel hosting account with API token access
- A Telegram bot token (from [@BotFather](https://t.me/BotFather))

## Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
pip install -r requirements.txt
```

### requirements.txt

```
pyTelegramBotAPI
python-telegram-bot
requests
```

## Configuration

Open `bot.py` and set your own values at the top of the file:

```python
bot = telebot.TeleBot('YOUR_TELEGRAM_BOT_TOKEN')
base_dir = "/home/your_cpanel_username"
url = 'https://yourdomain.com:2083'
username = 'your_cpanel_username'
API = 'YOUR_CPANEL_API_TOKEN'
```

### How to get a cPanel API token

1. Log in to cPanel.
2. Go to **Security → Manage API Tokens**.
3. Click **Create**, give it a name, and generate the token.
4. Copy the token immediately — it's only shown once.

## Usage

```bash
python bot.py
```

1. Open your bot in Telegram and send `/start`.
2. Tap a **📂 folder** to browse into it, or a **📄 file** to view its content.
3. After viewing a file, send a text message to overwrite its content, or tap **Upload** and send a document to upload it.

## Project Structure

```
.
├── bot.py              # Main bot logic
├── requirements.txt    # Python dependencies
└── README.md
```



## License

MIT — feel free to use and modify.

## Disclaimer

This project directly modifies files on your live server. Use with caution, especially the "save/overwrite" feature, since it replaces a file's entire content with no undo.