# Telegram Rich Writer

Turn an ordinary Telegram message into a structured **Telegram Rich Message** with headings, tables, quotes, links, custom emoji preservation, and smart buttons.

The bot runs on **Cloudflare Workers** and uses **Workers AI** for free-form restructuring. Common structured inputs such as price lists, metrics, repeated records, and announcements are handled deterministically when possible, which improves speed and consistency.

> Persian documentation: [README.fa.md](README.fa.md)

## Features

- Real Telegram Rich Messages, not fake ASCII tables.
- Automatic headings, tables, quotes, sections, and link buttons.
- Deterministic table detection for price lists, KPIs, and repeated records.
- AI-assisted formatting for less structured text.
- Preserves source URLs instead of allowing the model to invent links.
- Preserves Telegram custom/premium emoji when available to the bot.
- RTL detection for Persian/Arabic content.
- Source-preserving fallback if AI output or Rich Markdown is rejected.
- Owner-only access via `OWNER_ID`.
- Private-chat preview by default.
- Optional channel publishing through `CHANNELS_JSON`.
- `/test` command to verify Rich Message support without using AI.

## Architecture

```text
Telegram
   │ webhook
   ▼
Cloudflare Worker
   │
   ├─ deterministic layout detection
   │    ├─ price tables
   │    ├─ KPI tables
   │    ├─ repeated-record tables
   │    └─ announcement summaries
   │
   └─ Workers AI for free-form text
        │
        ▼
Telegram Rich Markdown / fallback Rich HTML
        │
        ▼
Private Rich Message preview
```

## Requirements

- Node.js 20+ (Node.js 22 recommended)
- A Cloudflare account with Workers / Workers AI access
- A Telegram bot created with BotFather

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/telegram-rich-writer.git
cd telegram-rich-writer
npm install
```

### 2. Login to Cloudflare

```bash
npx wrangler login
npx wrangler whoami
```

### 3. Add Worker secrets

```bash
npx wrangler secret put BOT_TOKEN
npx wrangler secret put OWNER_ID
npx wrangler secret put WEBHOOK_SECRET
npx wrangler secret put CHANNELS_JSON
```

For preview-only mode, set `CHANNELS_JSON` to:

```json
{}
```

`OWNER_ID` must be your numeric Telegram user ID.

### 4. Deploy

```bash
npm run typecheck
npm run deploy
```

Wrangler will print a Worker URL similar to:

```text
https://telegram-rich-writer.YOUR_SUBDOMAIN.workers.dev
```

### 5. Set the Telegram webhook

Replace the values below locally. Never commit the token or webhook secret.

```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://YOUR_WORKER.workers.dev/telegram","secret_token":"YOUR_WEBHOOK_SECRET","allowed_updates":["message","callback_query"],"drop_pending_updates":true}'
```

Verify it:

```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"
```

### 6. Test

Open the bot in Telegram and send:

```text
/start
```

Then:

```text
/test
```

Finally send an ordinary message such as a price list or announcement. The bot should reply with a Rich Message preview.

## Local development

Copy the example variables:

```bash
cp .dev.vars.example .dev.vars
```

Fill in your local values, then run:

```bash
npm run dev
```

`.dev.vars` is ignored by Git and must never be committed.

## Configuration

| Variable | Required | Description |
|---|---:|---|
| `BOT_TOKEN` | Yes | Telegram Bot API token from BotFather |
| `OWNER_ID` | Yes | Numeric Telegram user ID allowed to use the bot |
| `WEBHOOK_SECRET` | Yes | Secret used to validate Telegram webhook requests |
| `CHANNELS_JSON` | No | Optional channel publishing config; use `{}` for private preview only |
| `AI_MODEL` | No | Workers AI model override |

Optional channel configuration example:

```json
{
  "main": {
    "label": "Main channel",
    "chat_id": "@yourchannel"
  }
}
```

The bot must have the required channel permissions if publishing is enabled.

## Commands

- `/start` or `/help` — help
- `/test` — Rich Message test without AI
- `/channels` — configured optional publishing targets

## Safety and privacy notes

- The Worker ignores non-owner messages.
- Source URLs are protected before AI processing and restored afterward.
- Never put real secrets in `wrangler.jsonc`, source files, README files, commits, screenshots, or issues.
- If a bot token is ever exposed, revoke/rotate it immediately through BotFather.

## Known limitations

- AI formatting is heuristic; unusual messages may use the source-preserving fallback.
- Telegram may restrict some custom emoji depending on bot/account capabilities.
- Deterministic layout rules currently focus on common announcement, metrics, repeated-record, and pricing patterns.
- Rich Message support depends on the Telegram Bot API/client capabilities available at deployment time.

## Development

```bash
npm install
npm run typecheck
npm run deploy
```

CI runs TypeScript typechecking on pushes and pull requests.

## License

MIT. See [LICENSE](LICENSE).