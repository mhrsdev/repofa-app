# 🚀 Telegram Smart Summarizer Bot

A blazing-fast, pure-Python Telegram bot that turns long, noisy channel posts into clean, digestible summaries — powered by Google's Gemini AI models. Built from the ground up with **Telethon**, this bot doesn't just read messages, it *understands* them.

## ✨ Features

- 📡 **Live channel monitoring** — tracks a configurable list of Telegram channels in real time
- 🧠 **AI-powered summarization** — uses Gemini models to distill long posts into sharp, readable summaries
- 🐍 **100% pure Python** — no bloated frameworks, no unnecessary dependencies, just clean and efficient code
- ⚙️ **Simple configuration** — manage everything through plain Python config files

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Language | Python |
| Telegram Client | [Telethon](https://github.com/LonamiWebs/Telethon) |
| AI / Summarization | Google Gemini API |

## 📦 Requirements

All dependencies are listed in `requirements.txt`. Install them with:

```bash
pip install -r requirements.txt
```

## ⚙️ Configuration

- **Channels**: the list of Telegram channels the bot listens to is configured in `bot_channels.py`
- **Gemini API**: you'll need a valid Gemini API key set up for the summarization engine to work

## ▶️ Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/arshiachillguy/NewsBot
   cd NewsBot
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set your Telegram API credentials and Gemini API key (as environment variables or in your config file).
4. Add the channels you want to track in `bot_channels.py`.
5. Run the bot:
   ```bash
   python main.py
   ```
---