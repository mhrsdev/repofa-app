# VERSIK CLI - Advanced YouTube Downloader

VERSIK is a robust, production-ready, and cross-platform Command Line Interface (CLI) tool built in Python for downloading YouTube videos and audio. Designed with a focus on user experience, reliability, and zero-configuration setup, VERSIK brings a modern, visually appealing terminal interface to the classic YouTube downloading experience.

![Image](screenshot.png)

## ✨ Features

-   Zero-Configuration Setup: Automatically downloads and installs all required Python libraries and the FFmpeg binary on the first run.
-   Stunning Terminal UI: Features a continuous 3D animated rainbow banner, clean developer info, and a classic Windows XP-style thick green progress bar.
-   Media Selection: Choose between downloading high-quality Video (MP4) or Audio (MP3).
-   Quality Control: Automatically detects available resolutions (up to 4K/2160p) and lets you choose your preferred quality.
-   Smart Size Estimation: Calculates and displays the estimated download size before starting, asking for user confirmation to save bandwidth.
-   Playlist Support: Seamlessly downloads entire playlists sequentially with individual progress tracking.
-   Cross-Platform: Works flawlessly on Windows, macOS, and Linux without needing to manually configure system environment variables for FFmpeg.
-   Crash Protection: Prevents the terminal window from closing immediately upon completion or error, ensuring you can read the output.

## ⚙️ How it Works & Auto-Installation

One of the core design philosophies of VERSIK is frictionless onboarding. You do not need to manually install `pip` packages or download FFmpeg.

When you execute the script, the `ensure_prerequisites()` function runs first. It checks if the required libraries are present in your current Python environment. If any are missing, it automatically triggers `pip install` using the exact Python executable running the script.

Furthermore, it utilizes the `imageio-ffmpeg` library, which automatically downloads the correct, pre-compiled FFmpeg binary for your specific operating system and architecture, completely bypassing the need for manual FFmpeg installation or PATH configuration.

## 📦 Dependencies

The script relies on the following libraries (all handled automatically):

1.  `yt-dlp`: The most robust and up-to-date fork of `youtube-dl`, used for extracting and downloading media from YouTube.
2.  `rich`: A Python library for rich text and beautiful formatting in the terminal (used for the 3D banners, panels, and XP-style progress bars).
3.  `imageio-ffmpeg`: Provides the cross-platform FFmpeg binary required for merging video/audio streams and converting audio to MP3.

*Note: The only manual prerequisite is having Python 3.6+ installed on your system.*

## 🚀 Step-by-Step Usage Guide

### 1\. Get the Script

Download the `versik.py` file to your local machine, or clone the repository.

### 2\. Run the Program

Open your terminal or command prompt in the directory where `versik.py` is located and run:

python versik.py

(On some systems, you might need to use python3 versik.py or py versik.py).

### 3\. Follow the CLI Prompts

Welcome Screen: Watch the 3D animated rainbow banner and developer info.

Content Type: The program will ask what you want to download. Enter 1 for Video (MP4) or 2 for Audio (MP3). Pressing Enter defaults to Video.

URL Input:

Hint: If YouTube is restricted in your region, ensure your VPN is active.

Hint: Use your mouse's Right-Click to paste the YouTube URL into the terminal.

Paste a valid YouTube video, Shorts, or Playlist URL and press Enter.

Quality Selection (For MP4 only): The script will fetch available qualities (e.g., 4K, 1080p, 720p). Enter the corresponding number to select your desired resolution.

Size Estimation & Confirmation: VERSIK will calculate the total estimated file size and ask if you want to proceed. Enter 1 for Yes (default) or 2 for No.

Download: Watch the XP-style progress bar as your media downloads, showing real-time speed and downloaded/total size.

📂 Output Directories

To keep your files organized, VERSIK automatically creates two dedicated folders right next to the versik.py script upon its first run:

mp4ytd/: All downloaded Video (MP4) files are saved here.

mp3ytd/: All downloaded Audio (MP3) files are saved here.

If a file with the same name already exists, yt-dlp will automatically append a suffix to prevent overwriting.

👨‍💻 Developer

Hossein | Computer Engineer

📧 Email: hosseineng7931@gmail.com

📍 Telegram: @hosseinjavadinasab

📜 License

This project is open-source and available under the MIT License.

MIT License

Copyright (c) 2026 Hossein (Hossein Javadinasab)

Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.