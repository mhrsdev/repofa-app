<p align="center">
  <img src="brand/github-banner.png" alt="AnyStream" />
</p>

<p align="center">
  <img src="docs/media/app.jpg" alt="AnyStream home screen" />
</p>

<p align="center">
  Search music, paste a link, and save tagged audio files on Windows<br />
  <a href="#what-anystream-does"><b>What it can do</b></a> ·
  <a href="#install">Install</a> ·
  <a href="#how-a-file-is-made">How a file is made</a> ·
  <a href="#when-something-fails">If something goes wrong</a> ·
  <a href="CHANGELOG.md">Changelog</a>
</p>

AnyStream is a Windows desktop app. Unzip one folder, run `AnyStream.exe`, and that is the whole setup. You do not need a website, Docker, or an account.

It saves music as ordinary files on your computer: MP3, M4A, Opus, or the original audio.

**How the audio is found.** AnyStream bundles a tool called [yt-dlp](https://github.com/yt-dlp/yt-dlp) that runs on your own computer as part of the app. Spotify, Deezer, and Apple Music act only as catalogs, so all they hand over is song names, artwork, and track lists. The sound itself always comes from a public YouTube or SoundCloud upload, either the page you pasted or the closest match for that artist and title.

No accounts. No API keys. Files stay on your computer.

## What AnyStream does

### Search four catalogs at once

Type a song, album, or artist. AnyStream searches Deezer, Apple Music, SoundCloud, and YouTube at the same time and folds the hits into one list.

- **Artists** are the real catalog artists with albums attached. Random accounts that happen to share a name get filtered out.
- **Playlists** are the ones actually about the artist (say, "This Is Moein"), not every list that mentions the name in passing.
- **Tracks and albums** open the full listing, or you can download straight from the row.

Keep scrolling and more results load. If a search is taking too long, cancel it.

### Open the links people actually share

| You paste | What AnyStream reads | Where the audio comes from |
| --- | --- | --- |
| YouTube, YouTube Music, Shorts, playlists, or youtu.be | That page | **That exact video or playlist** |
| SoundCloud track, set, or profile | That page | **That exact upload** |
| Spotify track, album, or playlist | Song names and artwork (no login) | A matching YouTube video for each track |
| Deezer track, album, or playlist | Song names and artwork | A matching YouTube video for each track |
| Apple Music song or album | Song names and artwork | A matching YouTube video for each track |

Other sites will not work. AnyStream is not a downloader for "every site on the internet."

Spotify, Deezer, and Apple Music never hand over their own audio. They only provide names, artwork, and track numbers, and the sound is always a public YouTube or SoundCloud file.

### Save it the way you want

| Format | Quality choices | What you get |
| --- | --- | --- |
| **MP3** | 128 / 192 / 320 | Default is 192. Plays almost everywhere. |
| **M4A** | 128 / 192 / 256 | A common Apple-friendly format. |
| **Opus** | 96 / 128 / 160 | Smaller files. Works on modern players. |
| **Original** | — | No extra conversion. Best sound, but some older devices cannot play it. |

Every finished file is tagged with the title, artists, album, track number, year, and cover art. You can add lyrics too.

Files are named `NN - Artist - track name`. That number comes from the album or playlist, not the order you happened to click download.

### Built for the desktop

- **System tray.** Closing the window just hides it, and downloads keep running. Use the tray icon to bring the window back or to quit for real.
- **Save folder.** Pick where new files land. Anything already downloading keeps the folder it started in.
- **Text size** can be set to 90%, default, 110%, or 125% in Settings.
- Each track row carries its length, plus play, lyrics, and download buttons, so you never have to open another page first.
- **Full play** means the whole track, not a 30-second clip. The first play can take a moment while AnyStream tracks down the matching upload.
- The **mini player** at the bottom handles pause, skip, and seek. Space pauses and resumes, and an album or playlist rolls on to the next track on its own.
- A **lyrics window** can open by itself whenever you play a track that has lyrics.
- The **downloads panel** shows live progress. Stop a job and the finished files stay put; from there you can open the folder or zip up whatever completed.
- **App updates:** when a newer AnyStream shows up on GitHub, a banner asks before it installs anything.
- **Tool updates:** if yt-dlp, ffmpeg, or deno has a newer version, AnyStream can grab it once your downloads finish.
- Launch the app a second time and it just brings back the window you already have, at the size you left it.
- The interface is in English, but Persian song titles still display correctly.

## Install

1. Download **[anystream-portable.zip](https://github.com/ai-obsessed/AnyStream/releases/tag/v1.1)** from Releases.
2. Unzip it anywhere. Keep `AnyStream.exe`, `python-helper.exe`, and the `frontend` folder together.
3. Run **AnyStream.exe**.

The first time it runs, AnyStream quietly downloads **yt-dlp**, **ffmpeg**, and **deno** into an `engines` folder next to the program. Those tools are not part of this project and are not inside the ZIP.

Files save to `%USERPROFILE%\Music\AnyStream` by default, which you can change in Settings. A fresh install does not write your Windows username into the settings file.

## How a file is made

```
You type a search or paste a link
        │
        ▼
AnyStream.exe          the window you see
        │
        ▼
python-helper.exe      the background engine
        │
        ├─ search     Deezer, Apple Music, SoundCloud, YouTube
        ├─ open link  read the catalog or the YouTube / SoundCloud page
        ├─ match      find the closest YouTube video by artist, title, and length
        ├─ download   yt-dlp, on your computer
        ├─ convert    ffmpeg (or keep the original audio)
        └─ tag        name, artwork, optional lyrics
        │
        ▼
Music\AnyStream\NN - Artist - title.mp3
```

Paste a YouTube or SoundCloud link and AnyStream downloads that page. Paste Spotify, Deezer, or Apple Music and it hunts for a public YouTube video whose length lands within 20 seconds of the catalog track, which usually rules out live versions and long mixes. If one video fails, it tries another, and SoundCloud is the last resort.

**The extra tools.** yt-dlp, ffmpeg, and deno live in `engines/` next to the program, and the first launch downloads them in the background. Search works right away; a download will wait if those tools are still on their way. Deno is only there so AnyStream can read certain YouTube pages, since without it a few videos come back silent.

Nothing is uploaded to an AnyStream server.

More detail for developers: [`docs/HOW-IT-WORKS.md`](docs/HOW-IT-WORKS.md).

## If something goes wrong

1. **First minute after a fresh unzip.** The extra tools may still be downloading. Search already works, so wait a bit and try the download again. You should see `engines/yt-dlp/yt-dlp.exe` and `engines/ffmpeg/ffmpeg.exe` show up next to the program.
2. **That one YouTube video won't download.** If it is private, removed, or blocked in your country, search the song name and pick another upload.
3. **yt-dlp is out of date.** YouTube changes often. Open Settings → Engines → Update, or delete the `engines/yt-dlp` folder and start the app again.
4. **deno is missing.** Some YouTube pages need `engines/deno/deno.exe`. The first launch should have put it there.
5. **A Spotify link fails.** Spotify playlists have to be public. If every Spotify link suddenly breaks at once, the public preview pages have probably changed.

AnyStream is built to run on a home computer, not a rented server.

## What is in this folder (for developers)

| Path | What it is |
| --- | --- |
| `desktop/` | The Windows window, tray icon, and folder picker |
| `anystream/backend/` | The background engine and tests |
| `anystream/frontend/` | The screens you see |
| `scripts/dev.sh` | Run from source |
| `scripts/package.sh` | Rebuild the portable folder |
| `brand/` | Logo and banner |
| `docs/` | Extra notes |

Do not move `AnyStream.exe` out of its folder.

## Develop from source

You need [uv](https://github.com/astral-sh/uv) and Node.js 20+. The first run (or `python scripts/fetch-engines.py`) fills the `engines` folder.

```sh
bash scripts/dev.sh
```

```sh
cd anystream/backend && uv run pytest tests/ -q
```

## Credits

AnyStream is inspired by [Unstream](https://github.com/amiralibg/unstream) by [amiralibg](https://github.com/amiralibg). The catalog search, lyrics, and tagging build on that project (MIT). The Windows app, first-run tools, extra audio formats, save-folder picker, and tray behaviour are AnyStream's own.

## Releases

See **[Releases](https://github.com/ai-obsessed/AnyStream/releases)** for downloads, and [CHANGELOG.md](CHANGELOG.md) for what changed in each version.

## Licence

[MIT](LICENSE). The [Vazirmatn](https://github.com/rastikerdar/vazirmatn) and [Inter](https://github.com/rsms/inter) fonts are SIL OFL 1.1.

## Legal

Only download what you have the rights to, and follow the copyright laws where you live.

AnyStream is not affiliated with Spotify, Deezer, Apple, YouTube, or SoundCloud. Those names only describe what the software can read. Nothing is taken from a streaming service's own audio; the files come from public YouTube and SoundCloud pages.