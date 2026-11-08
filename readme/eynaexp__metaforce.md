# MetaForce

A GUI metadata editor powered by [ExifTool](https://exiftool.org/). Read, edit, delete, and write metadata for **400+ file formats** including images, video, audio, documents, and executables.

![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-lightgrey)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Read ALL metadata** — every tag ExifTool can extract, not just a handful
- **Edit any tag** — nothing is read-only; change group, tag name, and value freely
- **Delete tags** — remove individual metadata entries
- **Add custom tags** — inject new metadata fields
- **Save As** — export to a new file with modified metadata
- **Save In-Place** — overwrite the original file
- **Anonymize File** — one-click privacy: deletes GPS, serial numbers, camera info, maker notes; replaces author/copyright/timestamps with random data; safe for all formats
- **Strip All** — remove every trace of metadata (creates .bak backup)
- **Search & Filter** — live text search and group-based filtering
- **Dark UI** — modern sidebar layout with keyboard shortcuts
- **Context menu** — right-click to copy tag name, value, or both

## Supported Formats

ExifTool supports **400+ file formats**. Common ones include:

| Category | Formats |
|----------|---------|
| **Images** | JPEG, PNG, GIF, BMP, TIFF, WebP, HEIC, RAW (CR2, NEF, ARW, DNG, RAF...) |
| **Video** | MP4, MKV, AVI, MOV, WMV, FLV, WebM, 3GP |
| **Audio** | MP3, FLAC, OGG, M4A, AAC, WAV, WMA, Opus |
| **Documents** | PDF, DOCX, XLSX, PPTX, EPUB |
| **Executables** | EXE, DLL, SYS (PE version info, timestamps) |
| **Archives** | ZIP, 7Z, RAR, GZIP |
| **Other** | Torrent, Font files, DICOM, FITS, and many more |

## Installation

### Prerequisites

- **Python 3.8+** (with tkinter — included by default on Windows)
- **ExifTool** (see below)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/EynaExp/MetaForce.git
   cd MetaForce
   ```

2. **Download ExifTool for Windows**
   - Get the **64-bit** version from: https://exiftool.sourceforge.net/
   - Direct link: [exiftool-13.59_64.zip](https://sourceforge.net/projects/exiftool/files/exiftool-13.59_64.zip/download)
   - Extract the zip
   - Rename `exiftool(-k).exe` to `exiftool.exe`
   - Place `exiftool.exe` AND the `exiftool_files/` folder into `bin/`:
   ```
   MetaForce/
   ├── metaforce.py
   └── bin/
       ├── exiftool.exe
       └── exiftool_files/
           └── ...  (ExifTool's Perl libraries)
   ```

3. **Run**
   ```bash
   python metaforce.py
   ```
   Or double-click `MetaForce.bat`

> **Note:** No Python packages to install. MetaForce uses only the standard library (tkinter, subprocess, json).

## Usage

1. **Open a file** — click "Open File" or use the sidebar button
2. **Browse metadata** — all tags appear in the table, searchable and filterable
3. **Edit a tag** — select it, modify the value in the bottom panel, click "Apply"
4. **Add a tag** — fill in Group/Tag/Value fields, click "+ Add New"
5. **Delete a tag** — select it, press Delete or right-click → "Delete Tag"
6. **Save** — "Save In-Place" overwrites the original, "Save As" exports to a new file
7. **Strip all** — removes all metadata, creates a `.bak` backup first
8. **Anonymize** — one-click privacy cleanup; deletes GPS, serial numbers, maker notes, ICC profiles; replaces required fields (author, timestamps) with random values to avoid breaking the file

## Project Structure

```
MetaForce/
├── metaforce.py        # Main application
├── MetaForce.bat       # Windows launcher
├── requirements.txt    # Dependencies (none — stdlib only)
├── .gitignore
├── LICENSE
└── README.md
```

## How It Works

MetaForce is a Python GUI wrapper around Phil Harvey's [ExifTool](https://exiftool.org/), the gold-standard command-line metadata tool. It:

1. Calls `exiftool -json -G -n <file>` to read all metadata as structured JSON
2. Displays entries in a searchable, editable table
3. On save, writes modified tags back using `exiftool -<tag>=<value> <file>`

This gives access to every tag ExifTool supports — tens of thousands across hundreds of formats — with full read/write capability.

## Credits

- **[ExifTool](https://exiftool.org/)** by Phil Harvey — the metadata engine behind MetaForce
- **[tkinter](https://docs.python.org/3/library/tkinter.html)** — Python's standard GUI toolkit

## License

MIT License — see [LICENSE](LICENSE)

## Disclaimer

MetaForce modifies file metadata in place. Always keep backups of important files. The "Strip All" feature automatically creates a `.bak` copy, but manual saves do not.