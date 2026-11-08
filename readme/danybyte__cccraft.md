# ccCraft

**AI-crafted subtitles for YouTube.** Extract captions, translate them into 40+ languages with your choice of AI provider, and display the result as an overlay on the video — all from a browser extension.

> [NOW AVAILABLE ON MOZILA ADD ONS🎉](https://addons.mozilla.org/en-GB/firefox/addon/cccraft/)

## Features

- **Automatic AI translation** — paste your API key, pick a model, click Translate. Subtitles are extracted from the YouTube player, sent to the AI in parallel chunks, and loaded back onto the video automatically.
- **Four AI providers** — Google Gemini, OpenAI GPT, NVIDIA NIM, and Alibaba Qwen (DashScope).
- **Multi-key fallback** — enter multiple API keys (comma-separated) for the same provider; if one key hits a rate limit or fails, the next key is used automatically.
- **41 target languages** — Persian, English, Arabic, Turkish, German, French, Spanish, Japanese, Korean, Chinese, and more.
- **Language learning mode** — hover over any word in the original subtitle to see its meaning in your target language (via Google Translate), and click the word to hear its pronunciation.
- **Subtitle appearance** — adjustable font size, color, and vertical position. Optionally show the original subtitle below the translation.
- **Manual translation** — download the subtitle JSON or a ready-made prompt, translate it yourself in any tool, and load the translated file back.
- **Background processing** — translation continues even if you close the popup. Progress is shown when you reopen it.
- **Cross-browser** — works in Chrome (121+) and Firefox (128+).

## Installation

### Chrome / Edge / Brave (121+)

1. Download and unzip the extension.
2. Open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the extension folder.
4. Refresh any open YouTube tab.

### Firefox (128+)

Use the Firefox build (`ccCraft-*-firefox.zip`), which has all files at the zip root.

- **Temporary install (any Firefox):** Go to `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on** → go to folder then select the manifest.json file. The extension is removed when Firefox closes.
- **Permanent install:** Regular Firefox only accepts signed add-ons. Either install the signed version from [Firefox Add-ons (AMO)](https://addons.mozilla.org/) once published, or use Firefox Developer Edition / Nightly with `xpinstall.signatures.required` set to `false` in `about:config`, then install the zip via `about:addons` → gear icon → **Install Add-on From File**.
- **Important:** Firefox MV3 host permissions are opt-in. After installing, go to `about:addons` → ccCraft → **Permissions** and enable access to the required domains (YouTube, Google Translate, and your chosen AI provider). Translation and word lookup will not work without these permissions.

## Usage

### Automatic translation

1. Open a YouTube video that has captions (the CC icon is visible on the player).
2. Click the ccCraft toolbar icon to open the popup.
3. **AI provider** — select Gemini, GPT, NVIDIA NIM, or Qwen.
4. **API key(s)** — paste your key. You can enter multiple keys separated by commas for automatic fallback.
5. Click **Fetch models** to detect available models, then pick one from the dropdown.
6. **Target language** — choose the language you want subtitles translated into.
7. Click **Auto-translate**. Progress is shown in the status area. When translation finishes, subtitles appear on the video automatically.

### Manual translation

1. Open the **Manual translation** section in the popup.
2. Click **Download JSON** to export the subtitle file.
3. Translate the `fa` field in each cue using any tool or AI of your choice.
4. Click **Load translated** and select your edited JSON file. Subtitles appear on the video immediately.

### Language learning

1. In the popup, open the **Language learning** section.
2. Enable **Word lookup on the original subtitle**.
3. The original subtitle line appears below the translation on the video.
4. **Hover** over any word in the original subtitle to see its meaning in your target language. The video pauses automatically while hovering.
5. **Click** a word to hear its pronunciation (via Google Translate TTS).
6. Move the mouse away to resume playback.

### Subtitle appearance

- **Font size** — drag the slider to adjust.
- **Color** — click the color picker to change subtitle text color.
- **Position** — adjust the bottom margin to move subtitles higher or lower.
- **Show original** — toggle to display the original subtitle line beneath the translation.

## AI providers

| Provider      | Default model                 | Key prefix        | API endpoint                        |
| ------------- | ----------------------------- | ----------------- | ----------------------------------- |
| Google Gemini | `gemini-2.5-flash`            | `AIza…` or `AQ.…` | `generativelanguage.googleapis.com` |
| OpenAI GPT    | `gpt-4o-mini`                 | `sk-…`            | `api.openai.com`                    |
| NVIDIA NIM    | `meta/llama-3.3-70b-instruct` | `nvapi-…`         | `integrate.api.nvidia.com`          |
| Alibaba Qwen  | `qwen-plus`                   | `sk-…`            | `dashscope-intl.aliyuncs.com`       |

Get an API key from:

- **Gemini:** [Google AI Studio](https://aistudio.google.com/apikey)
- **GPT:** [OpenAI platform](https://platform.openai.com/api-keys)
- **NVIDIA NIM:** [NVIDIA build](https://build.nvidia.com/)
- **Qwen:** [Alibaba Cloud Model Studio](https://modelstudio.console.alibabacloud.com/)

## Privacy

- API keys are stored only in your browser's local storage (`chrome.storage.local`) and are sent directly to the chosen AI provider. They are never transmitted to any third-party server.
- Subtitle text is sent to the AI provider for translation and to Google Translate for word lookup. No other data is collected or transmitted.
- The extension does not require an account and does not track usage.

## How it works

1. **Caption capture:** A content script injected into the page's MAIN world hooks `fetch` and `XMLHttpRequest` to intercept the real `/api/timedtext` URL that the YouTube player uses to fetch captions. This avoids the empty-response problem that occurs when requesting caption URLs directly from `ytInitialPlayerResponse` (which often lacks a valid playback token).
2. **Workfile generation:** Captured caption data is parsed into a structured JSON workfile (schema `cccraft-subtitle-v1.1`) with cues containing `id`, `start`, `end`, `source` (original text), and `fa` (translation field).
3. **AI translation:** The workfile is split into chunks of 50 lines. Chunks are sent to the AI provider in parallel (up to 3 concurrent requests). Each chunk uses a numbered-line prompt format (`id| text`) for efficiency — roughly half the output tokens of JSON. If a chunk fails, the next API key is tried automatically. Lines that remain untranslated after the first pass are retried in smaller chunks.
4. **Overlay rendering:** Translated cues are stored in `chrome.storage.local` and rendered as an absolute-positioned overlay on the video player. The overlay updates every frame via `requestAnimationFrame`, showing the active cue at the current playback time.
5. **Word lookup:** When language learning is enabled, the original subtitle text is tokenized into clickable word spans. Hovering sends a translation request to the Google Translate API (via the background service worker) and displays the result in a tooltip. Clicking plays pronunciation audio from Google Translate TTS.

## Tech stack

- **Manifest V3** Chrome extension (cross-compatible with Firefox 128+)
- Background service worker for AI API calls and word lookup
- Content script with MAIN-world injection for caption URL capture
- `requestAnimationFrame` render loop for subtitle overlay
- Vanilla JS, no build step, no dependencies

## Project structure

```
ccCraft/
├── manifest.json          # MV3 manifest (cross-browser)
├── src/
│   ├── background.js       # Service worker: AI translation, model listing, word lookup
│   ├── content.js          # Content script: caption extraction, overlay rendering, learning events
│   ├── inject-main.js      # MAIN-world script: fetch/XHR hooks for caption URL capture
│   └── overlay.css         # Subtitle overlay and tooltip styles
├── popup/
│   ├── popup.html          # Extension popup UI
│   ├── popup.js            # Popup logic: settings, translation control, polling
│   └── popup.css           # Popup styles
└── README.md
```

## License

MIT