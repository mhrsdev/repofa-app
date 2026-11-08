# Duet of Silence

A privacy-first Windows desktop app that turns **how you type** — never **what you type** —
into a unique, evolving ambient soundtrack.

Typing fast and continuously drives bright, energetic rhythmic patterns. Long pauses
let the music drift into slow, quiet, sustained pads. Every session is seeded uniquely,
so no two soundtracks are ever the same.

## Privacy guarantees

- **Text is never captured.** Keyboard input is used only to derive anonymous timing
  signals: key intervals, pace, pauses, Backspace share, and activity intensity.
  The low-level hook translates every key to a coarse *category* (letter / digit /
  punctuation / …) and discards the actual key immediately — characters never exist
  anywhere in the process.
- **Local and offline by default.** No network access, no account, no telemetry,
  no analytics, no advertising. The only third-party dependency is
  [NAudio](https://github.com/naudio/NAudio) (MIT), used for local audio output.
- **RAM-only session data.** Behavioral buffers, composer state and synth voices
  live exclusively in memory and are wiped when you pause monitoring or exit.
  Nothing is ever written to disk except standard build artifacts.
- **Visible status + instant pause.** The window always shows a monitoring status
  pill, and one button immediately unhooks the keyboard listener and wipes all
  behavioral buffers.
- **No malware-like behavior.** No keylogging of content, no clipboard monitoring,
  no screenshots, no persistence, no autostart, no registry changes, no elevation,
  no code injection, no bypassing of Windows security or privacy protections.

## Architecture

```
DuetOfSilence.sln
├─ src/DuetOfSilence.Core            (platform-agnostic engine, fully unit-tested)
│  ├─ Input/KeyboardHookMonitor      WH_KEYBOARD_LL → anonymous timing events only
│  ├─ Analysis/BehaviorAnalyzer      rolling windows → smoothed Energy / Calm / pace / backspace
│  ├─ Music/SessionComposer          seeded per-session scale, mode, progression, densities
│  ├─ Synth/SynthEngine + voices     pure managed DSP: pads, plucks, echo, limiter
│  ├─ Audio/                         NAudio output wrapper + fail-safe sample renderer
│  ├─ Privacy/PrivacyController      the monitoring switch + wipe bookkeeping
│  └─ Logging/SafeLog                in-RAM ring buffer, sanitized, never contains key data
├─ src/DuetOfSilence.App             (WPF UI: status pill, pause control, meters, diagnostics)
└─ tests/DuetOfSilence.Tests         (xUnit: analyzer, composer, DSP safety, privacy, logging)
```

### Safety features

- **No volume spikes:** feed-forward peak limiter (instant attack, smooth release),
  a smoothed master gain, and a hard master ceiling (~ −3 dBFS) the UI slider cannot exceed.
- **Graceful audio failures:** device errors are contained, reported in the window
  (with a *Restart audio* button), and never crash the app. Rendering errors yield
  silence instead of exceptions escaping the audio thread.
- **Low CPU / RAM:** allocation-free audio path, hard-bounded voice count,
  fixed-size ring buffers, 10 Hz analysis tick.

## Build & run

Requires the .NET 8 SDK (Windows).

```
dotnet build DuetOfSilence.sln -c Release
dotnet run --project src/DuetOfSilence.App -c Release
```

Run the tests:

```
dotnet test DuetOfSilence.sln
```

## Usage

- **Status pill** — top-right: green *Monitoring active* / amber *Paused — no key data*.
- **Pause / Resume keyboard monitoring** — instant, wipes all behavioral buffers.
- **Master volume** — perceptual curve, internally capped for hearing safety.
- **Behavior signals** — live anonymous meters (typing energy, stillness, pace, backspace share).
- **Show diagnostics** — in-RAM event log (contains only state descriptions, never input).