# RapidHLS - HLS Encoder & Decoder

<div align="center">

![RapidHLS](https://img.shields.io/badge/RapidHLS-v1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A powerful desktop application for converting video files to HLS (HTTP Live Streaming) format and decoding HLS playlists back to common video and audio formats, built with Electron, React, and Shadcn UI.

</div>

![rapidhls](https://github.com/user-attachments/assets/b5d08265-0d4c-4282-b107-4d54baf202ea)

---

## ✨ Features

- **HLS Encode & Decode**: Convert source videos to HLS or decode M3U8 playlists back to formats like MP4, MKV, MP3, and more
- **Bundled FFMPEG**: FFMPEG is automatically included - no manual installation required!
- **Single & Bulk Workflows**: Convert individual files or process multiple videos and playlists at once
- **Custom Settings**: Optional custom FFMPEG path and default split time configuration
- **Dark Mode**: Beautiful dark theme throughout the application
- **Custom Title Bar**: Frameless window with minimize and close buttons
- **Multi-Platform**: Support for Windows, macOS, and Linux
- **First-Time Setup**: Guided settings configuration on first launch

## 📦 Available Build Formats

### Windows

- Setup Installer (`x64`)
- Portable (`x64`)

### macOS

- DMG Image (`universal`)

### Linux

- AppImage (`x64`)
- DEB Package (`x64`)

![rapidhls2](https://github.com/user-attachments/assets/e0f533f1-9735-4724-af14-f24c4681560d)

## 🚀 Download & Installation

Download ready-to-use releases from the [Releases page](https://github.com/aliesm-com/RapidHLS/releases).

## 🛠️ Building & Development

For complete build instructions, see [BUILD.md](BUILD.md).

**Important:** Use GitHub Actions for building all platforms, not local builds!

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build (for testing only - use GitHub Actions for production)
# For Windows
pnpm build:win

# For macOS
pnpm build:mac

# For Linux
pnpm build:linux
```

## Project Structure

```
RapidHLS/
├── electron/
│   ├── main.ts          # Electron main process
│   └── preload.ts       # Preload script for IPC
├── src/
│   ├── components/
│   │   ├── Layout.tsx         # Main layout with fixed TitleBar
│   │   ├── TitleBar.tsx       # Custom window controls
│   │   ├── SplashScreen.tsx   # Animated splash screen
│   │   └── ui/                # Shadcn UI components
│   ├── pages/
│   │   ├── Home.tsx           # Home page with conversion options
│   │   ├── Settings.tsx       # Settings configuration page
│   │   ├── About.tsx          # About page with app info
│   │   ├── SingleConvert.tsx  # Single file HLS encoding
│   │   ├── BulkConvert.tsx    # Batch HLS encoding
│   │   ├── HLSConvert.tsx     # Single HLS decoding
│   │   ├── HLSBulkConvert.tsx # Batch HLS decoding
│   │   └── ConversionInProgress.tsx # Shared progress screen
│   ├── styles/
│   │   └── index.css    # Global styles and Tailwind imports
│   ├── lib/
│   │   └── utils.ts     # Utility functions
│   ├── types/
│   │   └── electron.d.ts # TypeScript definitions
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # React entry point
├── public/              # Static assets
└── assets/              # Application assets
```

## Pages

### Home (`/`)

- Four main workflows: **Single Convert**, **Bulk Convert**, **HLS Decode**, and **Bulk HLS Decode**
- Quick access to both HLS encoding and decoding methods
- Footer with GitHub link to creator

### Settings (`/settings`)

- Configure FFMPEG installation path
- Set default split time for HLS segments
- First-time setup wizard with "Later" option
- Settings stored in localStorage

### About (`/about`)

- Detailed information about RapidHLS
- Explanation of HLS technology and decode workflows
- Feature list and requirements
- Information about bundled FFMPEG

### Single Convert (`/single-convert`)

- Convert an individual video file to HLS output

### Bulk Convert (`/bulk-convert`)

- Process multiple video files into HLS output in one run

### HLS Decode (`/hls-convert`)

- Decode a single M3U8 playlist and TS segments to a chosen video or audio format

### Bulk HLS Decode (`/hls-bulk-convert`)

- Decode multiple M3U8 playlists in one batch job

## Technology Stack

- **Electron 28.0.0**: Desktop application framework
- **React 18.2.0**: UI library
- **TypeScript 5.3.2**: Type-safe development
- **Vite 5.0.2**: Fast build tool
- **React Router DOM 7.13.0**: Client-side routing
- **Shadcn UI**: Beautiful component library
- **Tailwind CSS 3.3.5**: Utility-first CSS
- **Lucide Icons**: Icon library

## Development

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- FFMPEG is bundled automatically (no separate installation needed)

### Installation

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Format code
pnpm format

# Check formatting
pnpm format:check
```

### Building

```bash
# Build for all platforms
pnpm build

# Build for specific platform
pnpm build:win    # Windows (Setup + Portable)
pnpm build:mac    # macOS (DMG)
pnpm build:linux  # Linux (AppImage + deb)
```

## Navigation

The application uses React Router for navigation with a persistent TitleBar:

- **Settings Icon**: Click to access settings page
- **Info Icon**: Click to view about page
- **Window Controls**: Minimize and close buttons in top-right

## First-Time Experience

When launching RapidHLS for the first time:

1. **Splash Screen**: Animated RapidHLS logo with "Created By AliESM"
2. **Auto-Redirect**: Automatically redirected to Settings page
3. **Configure or Skip**:
   - Configure FFMPEG path and split time, then click "Save Settings"
   - Or click "Later" to skip and explore the app
4. **Never Again**: Settings page won't auto-show after first configuration

## Settings Storage

Settings are stored in browser's localStorage:

```typescript
{
  ffmpegPath: string,    // Path to FFMPEG executable
  splitTime: string,      // Default split time in seconds
  configured: boolean     // Whether user has configured settings
}
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (all platforms)
- `pnpm build:win` - Build for Windows
- `pnpm build:mac` - Build for macOS
- `pnpm build:linux` - Build for Linux
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting