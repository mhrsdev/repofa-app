# SysManagerBot 🤖

**Remote system management through Telegram and Bale bots.**

SysManagerBot is a desktop application built with **Python and PyQt5** that allows you to monitor and control a computer remotely through a Telegram or Bale bot.

> 🇮🇷 Persian documentation: [README_FA.md](README_FA.md)

---

## ✨ Features

- 📸 Take desktop screenshots
- 📊 Monitor system information
- 💻 Execute terminal commands remotely
- 🔍 Monitor running processes
- 📋 Read and write clipboard content
- 📁 Browse files and directories
- 📥 Download files remotely
- 🔌 Shutdown the system
- 🔄 Restart the system
- 🔒 Lock the workstation
- 🔐 User access control with allowed IDs
- 🤖 Telegram and Bale support
- ⚙️ Enable or disable individual features
- 🚀 Automatic bot startup
- 📝 Real-time event logging
- 📈 CPU, RAM, and Disk monitoring
- 💾 Persistent application configuration
- 🔁 Automatic reconnect after network failures
- 🌙 Catppuccin Mocha inspired dark interface

---

## 🖥️ Supported Platforms

SysManagerBot is designed to work across:

- Windows
- Linux
- macOS

Some system-level features use platform-specific commands internally.

---

## 🛠️ Technologies

This project is built with:

- **Python 3**
- **PyQt5**
- **pyTelegramBotAPI**
- **Pillow**
- **psutil**
- **PyAutoGUI**

All required dependencies are listed in [`requirements.txt`](requirements.txt).

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
cd REPOSITORY
```

Replace `USERNAME/REPOSITORY` with your GitHub repository address.

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the application

```bash
python main.py
```

---

## 🤖 Telegram Bot Setup

### 1. Create a Telegram Bot

Open [@BotFather](https://t.me/BotFather) in Telegram.

Send:

```text
/newbot
```

Follow the instructions and copy your bot token.

### 2. Enter the Token

Open SysManagerBot and enter your bot token in the **Bot Token** field.

### 3. Configure Access Control

Enter the Telegram IDs that are allowed to control the computer.

Multiple IDs can be separated with commas:

```text
123456789, 987654321
```

If the field is empty, all users are allowed to access the bot.

> ⚠️ For security reasons, it is strongly recommended to configure Allowed IDs.

---

## 🔵 Bale Support

SysManagerBot also supports the **Bale** messaging platform.

You can switch between:

```text
Telegram
Bale
```

from the application settings.

The appropriate API endpoint is selected automatically according to the selected platform.

---

## ⚙️ Configuration

The application allows you to configure:

- Bot token
- Allowed user IDs
- Messaging platform
- Enabled features
- Automatic startup

Configuration is saved locally in:

```text
~/.remote_manager_config.json
```

The configuration is automatically loaded when the application starts.

---

## 🎯 Bot Commands

| Command | Description |
|---|---|
| `/start` | Show available commands |
| `/help` | Show available commands |
| `/screenshot` | Capture the desktop |
| `/sysinfo` | Show system information |
| `/run <command>` | Execute a terminal command |
| `/ps` | Show running processes |
| `/clipboard` | Read clipboard contents |
| `/setclip <text>` | Write text to clipboard |
| `/ls [path]` | List files and directories |
| `/download <path>` | Download a file |
| `/shutdown` | Shut down the system |
| `/restart` | Restart the system |
| `/lock` | Lock the workstation |

The available commands depend on which features are enabled in the application.

---

## 📸 Screenshot

Use:

```text
/screenshot
```

The bot captures the current desktop and sends the screenshot to the authorized user.

---

## 📊 System Information

Use:

```text
/sysinfo
```

The bot can return information such as:

- CPU usage
- RAM usage
- Disk usage
- Network traffic
- System uptime
- Operating system
- Python version

---

## 💻 Remote Terminal

Use:

```text
/run <command>
```

Example:

```text
/run whoami
```

The command is executed on the host machine and its output is returned through the bot.

Commands have a maximum execution timeout of **30 seconds**.

> ⚠️ **Warning:** This feature provides remote command execution on the host machine. Only enable it for trusted users.

---

## 🔍 Process Monitor

Use:

```text
/ps
```

The bot displays up to **15 running processes**, sorted by memory usage.

The output includes:

- PID
- CPU usage
- Memory usage
- Process name

---

## 📋 Clipboard Management

### Read Clipboard

```text
/clipboard
```

Returns the current clipboard contents.

### Write Clipboard

```text
/setclip <text>
```

Example:

```text
/setclip Hello from SysManagerBot
```

The application supports multiple clipboard methods depending on the operating system.

---

## 📁 File Management

### List Files

```text
/ls
```

Lists files in the default home directory.

You can also specify a path:

```text
/ls /home/user
```

### Download a File

```text
/download <path>
```

Example:

```text
/download /home/user/example.txt
```

The maximum allowed download size is:

```text
50 MB
```

---

## ⚡ Power Control

When the Power Control feature is enabled, the following commands become available:

### Shutdown

```text
/shutdown
```

### Restart

```text
/restart
```

### Lock

```text
/lock
```

> ⚠️ **Dangerous Feature:** These commands can directly affect the host machine. Enable Power Control only when necessary.

---

## 🔐 Security

SysManagerBot includes an **Allowed IDs** access-control system.

When Allowed IDs are configured, only those users can interact with the bot.

### Recommended Security Practices

- Never publish your bot token.
- Always configure Allowed IDs.
- Only enable features that you actually need.
- Do not expose the bot to untrusted users.
- Be especially careful when enabling `/run`.
- Keep Power Control disabled unless required.
- Do not share access to the bot with untrusted users.

> **Important:** SysManagerBot provides powerful system-management capabilities. Use it only on computers you own or have explicit permission to manage.

---

## 🔄 Automatic Reconnection

SysManagerBot uses a resilient polling system.

If the bot loses its network connection, it automatically attempts to reconnect after a short delay.

It can recover from temporary:

- Connection errors
- Network failures
- Timeouts
- HTTP 502 errors
- HTTP 503 errors
- HTTP 504 errors

The bot continues attempting to reconnect while it is running.

---

## 📈 System Monitoring

The graphical interface continuously displays:

```text
CPU
RAM
Disk
Date / Time
```

System statistics are refreshed automatically every few seconds.

---

## 🖥️ User Interface

SysManagerBot uses a modern dark interface inspired by the **Catppuccin Mocha** color palette.

The application contains two main sections:

### Settings

Configure:

- Messaging platform
- Bot token
- Allowed IDs
- Features
- Autostart

### Control

Manage:

- Start bot
- Stop bot
- Clear logs
- System statistics
- Event logs

---

## 🚀 Autostart

SysManagerBot can automatically start the bot when the application launches.

Enable the **Autostart** option in the Settings tab.

When enabled, the application starts the bot automatically after launching.

---

## 📝 Logging

The Control tab provides a real-time event log.

Log messages are categorized into:

```text
INFO
SUCCESS
WARNING
ERROR
```

Each log entry includes a timestamp.

This makes it easier to monitor:

- Bot connections
- Commands
- Errors
- Reconnection attempts
- System operations

---

## 💾 Configuration File

SysManagerBot stores its configuration locally:

```text
~/.remote_manager_config.json
```

The configuration contains settings such as:

```json
{
  "token": "",
  "allowed_ids": "",
  "platform": "telegram",
  "autostart": false,
  "features": {
    "screenshot": true,
    "sysinfo": true,
    "terminal": true,
    "processes": true,
    "clipboard": true,
    "files": true,
    "power": false
  }
}
```

> 🔐 Keep this file private because it may contain your bot token.

---

## 📂 Project Structure

```text
remote_manager/
│
├── main.py
├── requirements.txt
├── README.md
└── README_EN.md
```

---

## 📋 Requirements

The project requires:

```text
pyTelegramBotAPI >= 4.14.0
PyQt5 >= 5.15.0
Pillow >= 10.0.0
psutil >= 5.9.0
pyautogui >= 0.9.54
```

Install all dependencies with:

```bash
pip install -r requirements.txt
```

---

## 🧪 Example Workflow

A typical setup looks like this:

```text
1. Install Python
        ↓
2. Clone the repository
        ↓
3. Install requirements
        ↓
4. Create a Telegram/Bale bot
        ↓
5. Copy the bot token
        ↓
6. Start SysManagerBot
        ↓
7. Enter the bot token
        ↓
8. Configure Allowed IDs
        ↓
9. Enable required features
        ↓
10. Start the bot
        ↓
11. Control the system remotely
```

---

## ⚠️ Disclaimer

SysManagerBot is intended for **authorized remote administration and system management**.

Only use this software on systems that you own or have explicit permission to control.

The application provides powerful capabilities including:

- Remote command execution
- File access
- File downloading
- Clipboard access
- Screenshot capture
- System shutdown
- System restart
- Workstation locking

The developer is not responsible for unauthorized use, damage, data loss, or misuse of this software.

---

## 📄 License

This project does not currently specify a license.

If you want to make the project open-source, you can add a license such as:

```text
MIT License
```

and create a `LICENSE` file in the repository.

---

## 👨‍💻 Author

[AmirHBDev](https://github.com/AmirHBDev)

---
## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 🌍 Documentation

- 🇮🇷 **Persian:** [README_FA.md](README_FA.md)
- 🇬🇧 **English:** [README_EN.md](README.md)

---

<p align="center">
  Made with ❤️ using Python
</p>