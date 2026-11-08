# pdfxz

**Safe, fast, and intelligent PDF compression from your terminal.**

`pdfxz` is a dual-mode PDF compression tool powered by Ghostscript. It offers a beautiful, keyboard-driven Terminal UI (TUI) for everyday use, and a robust Command-Line Interface (CLI) for scripts, batch processing, and automation.

<!-- markdownlint-disable MD033 -->
<p align="center">
  <img src="image/screenshot.png" alt="pdfxz TUI Screenshot" height="70%">
  <br>
  <em>Interactive Terminal UI (TUI)</em>
</p>
<!-- markdownlint-enable MD033 -->

---

## ✨ Features

- **Dual-Mode Interface**: Use the interactive TUI for visual workflows or the CLI for headless automation.
- **Smart & Safe Defaults**: Original files are never touched. Output collisions are automatically resolved. Partial files are cleaned up on failure.
- **Batch Processing**: Compress a single file or recursively process entire directory trees while preserving folder structures.
- **Explicit Quality Profiles**: Five carefully tuned compression profiles (from archival to maximum compression) using explicit Ghostscript parameters, ensuring consistent results across different Ghostscript versions.
- **Parallel Execution**: Speed up large batch jobs using multi-threaded Ghostscript workers (`--jobs`).
- **Intelligent Validation**: Verifies the `%PDF-` magic header before processing, skipping corrupted or fake PDFs gracefully.
- **Cross-Platform**: Fully supported on Linux, macOS, and Windows.

---

## 📦 Installation

`pdfxz` requires **Python 3.10+** and a working installation of **Ghostscript**.

### 1. Install Ghostscript

Ghostscript is the engine that powers the compression. It must be installed on your system first.

**macOS (Homebrew):**

```bash
brew install ghostscript
```

**Ubuntu / Debian:**

```bash
sudo apt update && sudo apt install ghostscript
```

**Fedora:**

```bash
sudo dnf install ghostscript
```

**Arch Linux:**

```bash
sudo pacman -S ghostscript
```

**Windows:**
Download the official AGPL/GPL installer from [ghostscript.com](https://www.ghostscript.com/releases/gsdnld.html). Ensure the installation directory (e.g., `C:\Program Files\gs\bin`) is added to your system `PATH`.

_Verify installation:_

```bash
gs --version      # macOS/Linux
gswin64c --version # Windows
```

### 2. Install pdfxz

**From PyPI (Recommended):**

```bash
pip install pdfxz
```

**From Source:**

```bash
git clone [https://github.com/amyrhexa/pdfxz.git](https://github.com/amyrhexa/pdfxz.git)
cd pdfxz
pip install .
```

---

## 🚀 Quick Start

### Interactive TUI

Simply run `pdfxz` without any arguments to launch the interactive interface:

```bash
pdfxz
```

```text
┌──────────────────────────────────────────────────────────┐
│                         P D F X Z                        │
│                  PDF Compression Utility                 │
├──────────────────────────────────────────────────────────┤
│ INPUT                                                    │
│ [ ~/Documents/papers                     ] [ Browse... ] │
│                                                          │
│ OUTPUT                                                   │
│ [ ~/Documents/compressed                 ] [ Browse... ] │
│                                                          │
│ QUALITY                                                  │
│ ▰▰▰▯▯  Balanced                                          │
│                                                          │
│                     [ Compress PDFs ]                    │
└──────────────────────────────────────────────────────────┘
```

**TUI Highlights:**

- Use `Tab` to navigate and `Enter` to select.
- Built-in directory browser (`Browse...`) eliminates manual path typing.
- Live progress tracking, ETA, and per-file status reporting.
- Press `Esc` at any time to safely cancel a running batch.

### Command-Line Interface (CLI)

For scripts and quick tasks, pass the input path directly:

```bash
# Compress a single file (creates paper_compressed.pdf)
pdfxz paper.pdf

# Compress a directory recursively
pdfxz ~/Documents/papers -o ~/Documents/compressed -r
```

---

## 📖 CLI Usage Guide

### Basic Operations

| Goal                          | Command                                   |
| :---------------------------- | :---------------------------------------- |
| **Compress one file**         | `pdfxz input.pdf`                         |
| **Specify output file**       | `pdfxz input.pdf -o output.pdf`           |
| **Compress a folder**         | `pdfxz ./papers -o ./compressed`          |
| **Recursive folder scan**     | `pdfxz ./papers -o ./compressed -r`       |
| **Force create missing dirs** | `pdfxz input.pdf -o ./new/dir/out.pdf -p` |

### Advanced Operations

**Parallel Processing:**
Speed up large batches by running multiple Ghostscript instances concurrently.

```bash
pdfxz ./huge_archive -o ./compressed -r --jobs 4
```

**Strict Scripting Mode:**
Prevent the TUI from accidentally launching in automated environments (e.g., cron jobs, CI/CD). If `INPUT` is missing, it will exit with an error instead of opening the UI.

```bash
pdfxz --no-tui input.pdf -o output.pdf
```

**Debugging:**
Enable verbose logging to troubleshoot Ghostscript errors.

```bash
pdfxz input.pdf --debug
```

### Full CLI Reference

```text
usage: pdfxz [INPUT] [OUTPUT] [options]

Positional:
  INPUT                 A PDF file or a directory containing PDFs.
  OUTPUT                Output PDF file or directory (optional).

Options:
  -o, --output PATH     Output PDF file or directory.
  -p, --parents         Create missing output directories (like mkdir -p).
  -q, --quality LEVEL   Compression profile (default: balanced).
  -r, --recursive       Recurse into subdirectories.
  --overwrite           Allow overwriting an existing output file.
  --jobs N              Number of parallel Ghostscript jobs to run (default: 1).
  --no-tui              Never launch the interactive TUI.
  --debug               Enable verbose debug logging.
  --version             Show version and exit.
```

---

## 🎚️ Compression Profiles

`pdfxz` avoids Ghostscript's vague `/screen` or `/ebook` presets. Instead, it uses explicit, version-independent parameters for predictable results.

| Profile                  | Key                   | Best For                            | Image Downsampling   |
| :----------------------- | :-------------------- | :---------------------------------- | :------------------- |
| **Maximum Quality**      | `maximum`             | Archival, print-ready documents     | Minimal (300+ DPI)   |
| **High Quality**         | `high`                | High-res screen viewing, good print | Moderate (200 DPI)   |
| **Balanced** _(Default)_ | `balanced`            | Everyday sharing, email attachments | Standard (150 DPI)   |
| **Strong**               | `strong`              | Mobile viewing, saving space        | Aggressive (120 DPI) |
| **Maximum Compression**  | `maximum-compression` | Strict file-size limits, drafts     | Extreme (72 DPI)     |

_Note: Actual compression ratios depend heavily on the PDF's content. Scanned image-heavy PDFs will shrink dramatically, while text-only PDFs may see minimal changes._

---

## 🛡️ Safety & Reliability Guarantees

`pdfxz` is engineered to be strictly non-destructive.

1. **Input Immutability**: Your original PDF files are never modified, moved, or deleted.
2. **Collision Avoidance**:
   - In the **TUI**, if an output file exists, `pdfxz` automatically generates a unique name (e.g., `report_compressed (2).pdf`).
   - In the **CLI**, existing outputs are protected. You must explicitly pass `--overwrite` to replace them.
3. **Same-Path Rejection**: The engine will refuse to run if the input and output paths resolve to the exact same file.
4. **Atomic Cleanup**: If Ghostscript crashes, times out, or the user cancels the operation, any partially written output file is immediately deleted.
5. **Structure Preservation**: When compressing directories recursively, the output mirrors the input's folder structure. This prevents files with identical names in different subfolders from overwriting each other.
6. **Signature Validation**: Files are checked for the `%PDF-` magic header. Corrupted files or text files mistakenly named `.pdf` are skipped and reported, rather than causing the batch to crash.

---

## ⚙️ Configuration & Environment Variables

| Variable           | Description                                                                       |
| :----------------- | :-------------------------------------------------------------------------------- |
| `PDFXZ_GS_PATH`    | Explicit path to the Ghostscript executable. Bypasses automatic `PATH` discovery. |
| `PDFXZ_CONFIG_DIR` | Override the default configuration directory (used for saving TUI themes).        |

**Default Config Locations:**

- **Linux/macOS**: `~/.config/pdfxz/config.json`
- **Windows**: `%APPDATA%\pdfxz\config.json`

---

## 🛠️ Development & Testing

We welcome contributions! The test suite uses a mock Ghostscript executable, meaning you can run tests without having Ghostscript installed on your development machine.

### Setup

```bash
git clone [https://github.com/amyrhexa/pdfxz.git](https://github.com/amyrhexa/pdfxz.git)
cd pdfxz

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install in editable mode with dev dependencies
pip install -e ".[dev]"
```

### Running Tests

The project uses `pytest` and `pytest-asyncio` (for TUI testing via Textual's pilot).

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=pdfxz

# Run only CLI tests
pytest tests/test_cli.py
```

### Project Architecture

```text
pdfxz/
├── src/pdfxz/
│   ├── app.py           # Textual TUI screens and widgets
│   ├── cli.py           # Argparse CLI entry point
│   ├── compressor.py    # Ghostscript subprocess wrapper & safety logic
│   ├── workers.py       # ThreadPoolExecutor batch orchestration
│   ├── scanner.py       # File discovery and %PDF- header validation
│   ├── profiles.py      # Explicit Ghostscript parameter definitions
│   ├── models.py        # Dataclasses for Results and State
│   ├── formatting.py    # Pure functions for UI/CLI text rendering
│   └── utils.py         # Path resolution and GS discovery
├── tests/
│   ├── fixtures/        # fake_gs.py (Mock Ghostscript binary)
│   ├── test_app.py      # Async TUI integration tests
│   └── test_*.py        # Unit tests for all modules
└── pyproject.toml       # Project metadata and dependencies
```

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

_Disclaimer: `pdfxz` is an independent tool and is not affiliated with or endorsed by Artifex Software, Inc. (the developers of Ghostscript)._