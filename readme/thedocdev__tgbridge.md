# tgbridge

A minimal Telegram-over-HTTP bridge for old/dumb phone browsers — WAP-era
devices that render plain HTML only, with no JavaScript and often no
HTTPS support.

Built for a real use case: getting a basic flip phone's browser to read
and send Telegram messages, when the phone can't run the real Telegram
app or render web.telegram.org.

## What it looks like

- `/` — a plain list of your recent chats
- `/chat/<id>` — the last few messages in that chat (3 per page by
  default), oldest to newest, with a "next/older" and "back" link
- `/chat/<id>/send` — a bare HTML `<form>` to type and send a reply

No CSS, no JavaScript, no images — just links and forms, so it renders
on browsers from the WAP era.

## How it works

- [Telethon](https://github.com/LonamiWebs/Telethon) logs into your
  Telegram account via MTProto — Telegram's own supported protocol for
  third-party clients. This is a real login to your account, not a bot;
  it sees everything your account can see.
- [Flask](https://flask.palletsprojects.com/) serves that data as bare
  HTML.
- Access is gated by HTTP Basic Auth (a username + password you choose).
  Every request is logged with its source IP and User-Agent string. You
  can optionally lock the bridge to one specific device's User-Agent
  once you know it (see "Locking to your device" below).

## ⚠️ Read this before deploying: plain HTTP, not HTTPS

This bridge serves plain HTTP. It does **not** encrypt traffic between
the bridge and your phone.

This is a deliberate tradeoff, not an oversight: many old WAP/flip-phone
browsers cannot negotiate modern TLS at all, so HTTPS simply isn't an
option for this use case. If you point this at a phone that genuinely
can't do HTTPS, plain HTTP is the only way it works — but it means:

- Your Basic Auth username/password travel in plaintext.
- Your Telegram messages travel in plaintext.
- Anyone positioned on the network path between your server and your
  phone (your ISP, a carrier's transparent proxy, or state-level network
  inspection in some countries) can read all of it.

**Only use this for casual, low-stakes messaging.** Do not use it for
anything you wouldn't want read by a third party. If your target device
*can* do HTTPS, don't use this bridge as-is — put a reverse proxy
(Caddy or nginx) in front of it and terminate TLS there instead; this
repo doesn't include that setup since the intended use case is devices
that can't use it anyway.

Practical mitigations if you deploy over plain HTTP regardless:
- Set a long, random `BRIDGE_TOKEN` — this is your password, treat it
  like one.
- Use the User-Agent allowlist (below) once you know your device's UA,
  to cut down on casual/automated scanning traffic hitting the bridge.
- Don't expose this on a network you don't have to.

## Requirements

- Python 3.9+
- A Telegram account
- A server or machine with a public IP (a cheap VPS works well) if you
  want to reach it from a phone on mobile data — see "Where to run
  this" below.

## Setup, step by step

### 1. Get Telegram API credentials

Go to **https://my.telegram.org** → log in with your phone number →
**API development tools**. Fill in the form:

- **App title:** anything, e.g. `tgbridge`
- **Short name:** anything alphanumeric, 5-32 characters, e.g. `tgbridge`
- **URL:** can be left blank, or use any placeholder like
  `https://example.com`
- **Platform:** `Desktop` tends to be the most reliable choice
- **Description:** anything, e.g. `personal bridge project`

Submit. You'll be given an **`api_id`** (a number) and an **`api_hash`**
(a long hex string). You'll need both in the next step.

If this form gives a generic "ERROR" with no detail, it's a known
flaky page — try a private/incognito browser window, plain ASCII
values with no special characters, or waiting a few minutes and
retrying.

### 2. Clone and install

```bash
git clone https://github.com/TheDocdev/tgbridge.git
cd tgbridge
pip install -r requirements.txt
```

If you're on a modern Debian/Ubuntu/Mint system and get an
`externally-managed-environment` error, either add
`--break-system-packages` to the pip command, or use a virtual
environment instead (cleaner):

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

If you use a virtual environment, remember to `source venv/bin/activate`
again every time you open a new terminal to run this project.

### 3. Configure

```bash
cp .env.example .env
nano .env   # or any text editor
```

Fill in:

```
TG_API_ID=your_api_id_here
TG_API_HASH=your_api_hash_here
TG_SESSION=/full/path/to/where/you/want/session
BRIDGE_USER=pick_a_username
BRIDGE_TOKEN=pick_a_long_random_password
```

Notes:
- `TG_SESSION` is a file path *prefix* — Telethon will create
  `<that path>.session` next to it. Use a full absolute path to avoid
  ambiguity about where it ends up (e.g. `/opt/tgbridge/session` or
  `/home/youruser/tgbridge/session`).
- If the phone you're targeting has an awkward keypad (T9/multi-tap),
  favor lowercase letters and digits for `BRIDGE_USER`/`BRIDGE_TOKEN`
  over symbols and mixed case — it'll be much easier to type on the
  device itself.

### 4. First-time login

This creates your Telegram session file. Do this once, interactively:

```bash
export $(cat .env | xargs)
python3 login.py
```

You'll be asked for your phone number, the login code Telegram sends
you, and your 2FA password if you have one set. On success, it creates
`<TG_SESSION>.session` — treat this file like a password. Anyone with
it has full access to your Telegram account. Never share it

### 5. Run it

```bash
export $(cat .env | xargs)
python3 bridge.py
```

You should see Flask start up and report it's listening. Test locally
first, from the same machine:

```bash
curl -u your_username:your_password http://127.0.0.1:5055/
```

If that returns HTML with your chat list, it's working.

### 6. Making it reachable from your phone

By default `bridge.py` binds to all interfaces (`0.0.0.0`), so once
your server's firewall allows the port, it's reachable from outside.

**If your phone connects over mobile data (no WiFi)**, it needs to
reach a real public IP — a home computer usually won't work well here
unless it already has one, because most home/mobile ISPs put you behind
CGNAT (no public IP, and incoming connections can't reach you directly).
A cheap VPS is the most reliable option. If you want to try hosting from
a home machine anyway, you'll need a tunneling/dynamic-DNS service that
supports reverse proxying through CGNAT (e.g. DNSLab, ngrok, Cloudflare
Tunnel) — that's outside the scope of this README, but any of them can
sit in front of this bridge the same way a VPS's public IP would.

Open the port in your firewall, e.g. with `ufw`:

```bash
sudo ufw allow 5055/tcp
```

Some VPS providers also have a separate cloud-level firewall/security
group in their web control panel — if the port seems blocked even after
this, check there too.

Then, from your phone's browser:

```
http://YOUR_SERVER_IP:5055/
```

You should get a login prompt (Basic Auth) — enter the `BRIDGE_USER` /
`BRIDGE_TOKEN` you set in `.env`.

**If the login prompt seems to loop / keeps re-asking:** make sure
you're hitting the bare URL above with nothing extra appended, and that
you're not re-loading a bookmarked or cached URL from an earlier test.

### 7. Running persistently (recommended)

Running `python3 bridge.py` in a terminal stops the moment you close
that terminal or reboot the server. For anything beyond a quick test,
install it as a systemd service so it survives reboots and restarts on
crashes:

```bash
sudo cp tgbridge.service /etc/systemd/system/
sudo nano /etc/systemd/system/tgbridge.service
```

Edit `User=`, `WorkingDirectory=`, and `EnvironmentFile=` to match where
you actually put the project and which user should run it, then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now tgbridge
sudo systemctl status tgbridge
```

Should show `active (running)`. If it instead shows
`activating (auto-restart)` in a loop, something is crashing on
startup — check the logs:

```bash
sudo journalctl -u tgbridge -f
```

A common cause: something else (like a leftover manual `python3
bridge.py` run) is already holding port 5055. Find and stop it:

```bash
sudo lsof -i :5055
sudo kill -9 THAT_PID
sudo systemctl restart tgbridge
```

### 8. Locking to your device (optional, recommended)

Once your phone has successfully hit the bridge at least once, check
the logs for its User-Agent string:

```bash
sudo journalctl -u tgbridge -f
```

Look for a line like:

```
request from ip=... ua=TCL_onetouch_T301/1.0 Dorado WAP-Browser/1.0.0 path=/
```

Copy that `ua=` value into `bridge.py`:

```python
UA_ALLOWLIST = ["TCL_onetouch_T301/1.0 Dorado WAP-Browser/1.0.0"]
```

Restart the service. Now only requests presenting that exact
User-Agent are accepted — everything else gets a 403. This is a weak
control on its own (a motivated attacker can fake a User-Agent
trivially), but it filters out casual/automated scanner noise, and is a
useful extra layer on top of Basic Auth, not a replacement for it.

## Files in this repo

| File | Purpose |
|---|---|
| `bridge.py` | The Flask app — all routes, auth, and Telegram logic |
| `login.py` | One-time interactive Telethon login script |
| `requirements.txt` | Python dependencies |
| `tgbridge.service` | Example systemd unit for persistent running |
| `.env.example` | Template for the environment variables you need to set |
| `.gitignore` | Keeps `.env` and `*.session` out of version control |

## Security summary

- `session.session` = full access to your Telegram account. Never
  commit it, never share it, back it up somewhere private if at all.
- `.env` contains your API credentials and your Basic Auth password.
  Same rule applies.
- This bridge is plaintext HTTP by design, for devices that can't do
  better. Treat it accordingly — see the warning near the top.
- This is a personal/hobby project, not audited or hardened for
  multi-user or public-facing production use.

## License

MIT — see `LICENSE`.