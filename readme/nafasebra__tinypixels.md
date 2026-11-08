# 🖼️ TinyPixels

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/PsymoNiko/tinypixels/ci.yml?style=flat-square&logo=github&label=CI)](https://github.com/PsymoNiko/tinypixels/actions/workflows/ci.yml)
[![Python Version](https://img.shields.io/badge/python-3.9%2B-blue?style=flat-square&logo=python)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square&logo=license)](LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/PsymoNiko/tinypixels?style=flat-square&logo=github)](https://github.com/PsymoNiko/tinypixels/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/PsymoNiko/tinypixels?style=flat-square&logo=github)](https://github.com/PsymoNiko/tinypixels/forks)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg?style=flat-square)](code_of_conduct.md)

A fast and lightweight command‑line tool for compressing and optimizing images in bulk. TinyPixels scans a folder, compresses supported image formats, and saves optimized versions while preserving visual quality. It can also convert images to a specific format such as WebP, JPEG, or PNG.

Designed to be simple, fast, and useful for developers preparing images for the web.

## ✨ Features

- ⚡ **Fast batch image compression** – Process many images quickly
- 📦 **Broad format support** – JPEG, PNG, WebP, GIF, BMP, TIFF, HEIC, AVIF, and more
- 🔄 **Optional format conversion** – Convert to WebP, JPEG, or PNG with one command
- 🎚️ **Adjustable JPEG quality** – Fine‑tune the quality/compression balance
- 🎨 **Optimized compression per format** – Best settings for PNG, WebP, GIF, etc.
- 🎞️ **Animated GIF support** – Preserves animation frames
- 🛡️ **Smart fallback** – Uses lossless WebP when lossy conversion isn’t suitable
- 📊 **Compression summary report** – See exactly how much space you saved
- 🧹 **Safe operation** – Never overwrites original files; keeps original when compression increases size
- 💻 **Clean CLI interface** – Simple and intuitive commands

## 📦 Supported Formats

TinyPixels supports most commonly used image formats:

```
jpg · jpeg · png · webp · bmp · tiff · tif · gif · ico · heic · heif · avif
```


Some formats may be converted internally before compression.

## 📋 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [CLI Usage](#-cli-usage)
- [Output Behavior](#-output-behavior)
- [How It Works](#-how-it-works)
- [Compression Settings](#-compression-settings)
- [Platform Support](#-platform-support)
- [Limitations](#-limitations)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Installation

### Requirements

- **Python 3.9+** – Check your version with `python --version`
- **pip** – Usually included with Python

### With pipx (recommended)

[pipx](https://pypa.github.io/pipx/) installs CLI tools in isolated environments and makes them available globally.

```bash
pip install pipx
pipx ensurepath
pipx install git+https://github.com/nafasebra/tinypixels.git
```

After installation, the tinypixels command will be available globally in your terminal.

#### From source

Clone the repository and install the package:

```bash
git clone https://github.com/nafasebra/tinypixels.git
cd tinypixels
pip install .
```

For development (editable install):

```bash
pip install -e .
```

If you prefer pipx for development:

```bash
pipx install .
```

#### 🎯 Quick Start

Compress all images inside a folder with one command:

```bash
tinypixels ./images
```

TinyPixels automatically creates an output folder and saves the optimized images there. Original files remain untouched.

#### 🛠️ CLI Usage

```
tinypixels <folder> [options]
```

Examples

```
tinypixels images # Compress all images in the "images" folder
tinypixels images -o optimized Save optimized images to a custom directory
tinypixels images -f # webp Convert all images to WebP format
tinypixels images -q 85 # Set JPEG quality to 85 (default is 95)
tinypixels images -o output -f webp -q 85  # Combine multiple options
```

Options

```
-o, --output Output directory for optimized images
-f, --format Force output format (webp, jpeg/jpg, png)
-q, --quality JPEG quality (integer, default: 95)
```

#### 📁 Output Behavior

By default, optimized images are stored in a folder named web_optimized/ created inside the input directory. For example:

```
images/
├── photo1.jpg
├── photo2.png
└── web_optimized/
    ├── photo1.jpg
    └── photo2.png
```

Note: Original images are never overwritten. If compression doesn't reduce file size, the original is kept in the output folder.

#### 🔧 How It Works

For every image in the input folder:

1. Load – The image is loaded using Pillow
2. Detect – The format is automatically identified
3. Compress – Format‑specific compression settings are applied (see Compression Settings)
4. Save – The optimized image is saved to the output folder
5. Compare – If the optimized image becomes larger than the original, the original file is kept instead

#### ⚙️ Compression Settings

TinyPixels uses carefully tuned parameters for each format to balance quality and file size:

Format Settings
- PNG compress_level=9 – Maximum optimization; transparency preserved
- JPEG Adjustable quality; subsampling=0 for better color accuracy; progressive encoding
- WebP High compression method; lossless when appropriate
- GIF Animation frames preserved; rebuilt for optimization
- Other formats (HEIC, TIFF, BMP, etc.) Converted to lossless WebP before saving

#### 💻 Platform Support

TinyPixels works on:

- Windows
- macOS
- Linux

### ⚠️ Limitations

- No metadata preservation – EXIF data (camera settings, GPS coordinates) is removed during compression
- Format conversion caution – Converting between formats may result in some quality loss, especially from lossy to lossy formats
- Large GIFs – Complex animated GIFs may not see significant size reduction

## 🤝 Contributing

We welcome contributions! Whether it's reporting a bug, suggesting a feature, or submitting a pull request, please follow our Code of Conduct.

Before Contributing, see [CONTRIBUTING.md](CONTRIBUTING.md)

📜 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.