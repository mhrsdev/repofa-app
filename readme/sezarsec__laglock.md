# 🔒 LagLock — Game Anti-Lag Firewall

**LagLock** blocks internet access for every app on your PC while you're in a match — only your game, launcher and the apps *you* allow keep a connection. No background downloads, no updates, no Discord calls stealing your bandwidth mid-game. Less lag, stable ping.

> Developed by: **HosseinMohseni** • Powered by: **@Sezar_Sec**

## ✨ Features

- **Whitelist firewall** — sets Windows Firewall outbound policy to *Block* and only allows rules created by LagLock. Everything else gets **0 bytes**.
- **Any game, any platform** — pick your host platform (Steam / Epic / EA / Riot / Battle.net / FACEIT / Custom) and your game from the **installed games list** (auto-reads Steam appmanifests + Epic manifests) or pick any `.exe` manually.
- **Live server monitor** — detects the game's UDP server IP:Port automatically.
- **App picker** — add *any* installed app (Spotify, Teamspeak, whatever) to the allow-list from a searchable list of your Start-Menu apps.
- **Manage allow-list** — remove allowed apps anytime; the firewall rule is deleted instantly.
- **VPN friendly** — Hiddify, PacketRaft, sing-box, xray, tun2socks are auto-detected and allowed.
- **Safe restore** — disabling restores your normal firewall state and cleans up every rule (including rules from older versions).
- **Modern dark neumorphic UI** — bilingual 🇮🇷 FA / 🇬🇧 EN with right-to-left support, bundled Vazir font, custom icon.

## 🚀 Usage

1. Download `LagLock.exe` from [Releases](../../releases) (or build it yourself) and **Run as administrator**.
2. Pick your **platform** and **game**.
3. Hit **Enable GameMode** 🔴 before the match — optional: tick *Close browsers* to kill them automatically.
4. After the match, hit **Disable** ✅ and your internet is back.

> ⚠️ DNS/DHCP/Loopback are always allowed — otherwise your connection would drop completely. Don't disable that switch.

## 🛠 Build from source

```bash
pip install pyinstaller customtkinter pillow
build.bat          # -> dist\LagLock.exe (UAC admin manifest, icon, bundled font)
```

Or run from source: `python laglock.py` (as administrator).

## 📋 Requirements

- Windows 10/11
- Administrator rights (the app requests elevation via UAC)

## 📄 License

MIT — see [LICENSE](LICENSE).

## ⚠️ Disclaimer

LagLock modifies the **Windows Firewall outbound policy** while active. If the app crashes mid-lockdown, simply re-open it and press *Disable* (or run the disable action) to restore your internet.