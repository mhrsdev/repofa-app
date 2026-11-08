# SMRules

<p align="center">
  <img src="docs/screenshots/dashboard_final_v2.png" width="240" alt="SMRules dashboard">
</p>

**SMRules** is a fully offline Android utility that reads incoming SMS on your device, understands what each message is, and lets you act on it instantly.

It is **not** a messaging app. It works alongside your existing messaging app:

> SMS arrives → SMRules detects the verification code → a notification with a **COPY** button appears → one tap → done.

No cloud. No account. No analytics. The app does not request an INTERNET permission except for the optional update check.

---

## Features

| | |
|---|---|
| **OTP quick-copy** | Contextual detection of 4–8 digit codes in English and Persian, with confidence scoring. Copy codes straight from the notification. |
| **No duplicate alerts** | SMRules only notifies for verification codes by default — regular messages stay in your messaging app. |
| **Smart classification** | Every message is classified as Verification, Banking, Transaction, Promotional, Delivery, Service, Personal or Unknown. Change a category manually at any time. |
| **OTP history with TTL** | Codes live for 5–60 minutes (default 10) and are deleted automatically — from history *and* from the stored message. |
| **Per-sender rules** | Toggle code detection, notifications, silent mode, hidden codes, promo blocking, forced category and custom TTL per sender. |
| **Search & filters** | Instant local search across senders, message text and codes, with category filter chips. |
| **Dashboard** | Today's stats, the last code with a live expiry ring, quick actions. |
| **Auto cleanup** | Optional rules to delete expired-code messages, promotional and service messages after N days. Off by default — nothing is deleted without your say-so. |
| **8 languages** | English, Persian (فارسی), 中文, Español, العربية, हिन्दी, Português, Français — with full RTL layout mirroring. |
| **App lock** | Optional device-credential lock (fingerprint / face / PIN) before any message content is shown. |

## Screenshots

| Dashboard | Codes | Messages |
|---|---|---|
| ![Dashboard](docs/screenshots/dashboard_final_v2.png) | ![Codes](docs/screenshots/codes.png) | ![Messages](docs/screenshots/messages.png) |

## Privacy model

- Message content never leaves the device. The only network call in the entire app is the **manual update check** against this repository's GitHub Releases (Settings → Updates).
- OTP codes are wiped automatically after their TTL expires.
- Nothing is ever logged: no SMS content, no codes, no banking info.
- Clipboard entries are tagged as sensitive (`EXTRA_IS_SENSITIVE`) and auto-clear after 60 seconds.
- The SMS permission is requested with a plain-language explanation, and you can skip it entirely — the app stays usable.

## Building

Requirements: JDK 17, Android SDK 35+.

```bash
./gradlew assembleDebug        # → app/build/outputs/apk/debug/app-debug.apk
./gradlew testDebugUnitTest    # 90 unit tests
```

The repo ships with `local-m2/`, an offline dependency mirror, used automatically when present (machines without access to dl.google.com). CI and normal setups ignore it and resolve from `google()` / `mavenCentral()`.

## Releases

Releases are fully automated via GitHub Actions:

- **Every push to `main`** → tests run and a debug APK is built as a workflow artifact.
- **Every `v*` tag** (e.g. `v1.1.0`) → tests run, a signed release APK is built and published as a GitHub Release. The tag determines the app's `versionName` (`v1.1.0` → `1.1.0`).

The in-app update checker (Settings → Updates) compares the installed version against the latest published release here and links to it when a newer version exists. Network failures degrade to a quiet "unavailable" state.

**Releasing a new version:**

```bash
git tag v1.1.0 && git push origin v1.1.0
```

## Project layout

```
app/src/main/java/com/smartsms/app/
├── detection/      TextNormalizer · LanguageDetector · OtpDetector
│                   MessageClassifier · EntityExtractor · SmsParser
├── rules/          SenderRuleEngine — per-sender behaviour resolution
├── data/           SmsRepository (SQLite) · SenderRuleStore · SettingsStore
├── domain/         MessageProcessor · OtpManager · CleanupManager
├── notifications/  Notifier (grouped, actionable) · action receiver
├── sms/            SmsReceiver (SMS_RECEIVED, priority 999)
├── clipboard/      SecureClipboard (sensitive flag + auto-clear)
├── updates/        UpdateChecker (GitHub releases) · update UI
├── security/       App-lock via device credentials
├── worker/         CleanupWorker (periodic expiry sweep)
└── ui/             Compose UI: theme, icons, components, screens
```

## Testing

90 unit tests cover the detection engine and rules: Persian/Arabic digit normalization, OTP keyword matching, false-positive guards (prices, dates, phones, tracking numbers, card numbers, repeated patterns), message classification, entity extraction, sender-rule resolution and OTP expiry semantics.

```bash
./gradlew testDebugUnitTest
```

## License

All rights reserved © 2026 ArasTey. Contact the repository owner for licensing questions.