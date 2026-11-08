# GFilex

[برای دیدن توضیحات به زبان فارسی اینجا را کلیک کنید](README-fa.md)

[Belgeleri Türkçe olarak görüntülemek için buraya tıklayın](README-tr.md)

**Web-based file management and sharing server, written entirely in C**

GFilex is a lightweight, multi-threaded HTTP server with no dependency on any framework or other language that provides a complete web interface for browsing, uploading, downloading, and managing files in a directory on your system. This project was written from scratch using only standard POSIX/C libraries, and no part of the server is implemented in a language other than C (only client-side HTML/CSS/JavaScript, which is necessary for running the interface in a browser, is generated and delivered from within the C code).

---

## Table of Contents

- [License](#license)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation and Compilation](#installation-and-compilation)
- [Running and Using](#running-and-using)
- [Project Structure](#project-structure)
- [Internal Programming Interface (API)](#internal-programming-interface-api)
- [Security Notes](#security-notes)
- [Advanced Configuration](#advanced-configuration)
- [Contributing](#contributing)

---

## License

This project is released under the terms of the **GNU General Public License version 3 (GPL-3.0)**.

```
GFilex
Copyright (C) 2026  Mehmet Lotfi

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
```

In short, GPLv3 allows you to freely run, study, modify, and distribute this software; however, every distributed version (whether modified or unmodified) must also be provided under the same license and with its complete source code available (the Copyleft principle). The full official license text must be placed in a file named `LICENSE` in the repository root; you can obtain the official and complete version from the following address:

<https://www.gnu.org/licenses/gpl-3.0.txt>
___

## Features

### HTTP Server Core

- HTTP/1.1 server written from scratch, without using any external networking library.
- **Multi-threaded** architecture with a fixed-size Thread Pool and Bounded Queue; when the queue is full, new requests are immediately rejected with `503 Service Unavailable` so the server never hangs.
- Full support for **HTTP Range Requests** (`206 Partial Content`) for partial and resumable file downloads.
- An intelligent **Resume Cache** layer: if a download is interrupted incompletely, the next request (even without an explicit `Range` header) automatically resumes from the same point (for a configurable period of a few minutes).
- **Graceful Shutdown** with `SIGINT`/`SIGTERM` signal handling: all connections currently being processed are completed and resources are freed before exit.
- Full request logging (method, path, client IP address, status code) to standard output.
- All paths are restricted to the specified root directory through precise, multi-layer checks, and escaping the root (Path Traversal) is impossible in any way — not during download, upload, rename, move, extraction, or compression.

### Web File Browser

- Directory listing showing type (file/folder), name, and human-readable size (KB, MB, GB) — directory sizes are calculated recursively.
- A selectable (Checkbox) column for each item to perform batch operations.
- A dedicated “Parent Directory” button for returning to the higher level.

### Upload and Download

- File upload with a live Progress Bar and percentage display.
- If a file with the same name as an existing file is uploaded, the previous file is automatically overwritten (Overwrite).
- File downloads use the `Content-Disposition: attachment` header, causing the browser to show a real download dialog (with percentage progress and estimated completion time) instead of displaying the file inline.
- Ability to download an entire directory as a compressed archive (`.zip` or `.tar.xz`) with one click; the archive filename always exactly matches the directory name.
- The archive size is calculated before download and sent in the `Content-Length` header so the browser can display a real estimated time; the generated temporary file is deleted immediately after the transfer ends and is never left in the working directory.
- Default upload size limit: **10 GB** per file (configurable in the settings file).

### File and Folder Management

- **Create Folder** (New Folder) through the web interface.
- **Rename** files and folders.
- **Move / Copy** using a client-side Clipboard mechanism and a “Paste Here” button.
  - Automatically detects when source and destination are identical.
  - In case of a name Conflict at the destination, the user chooses among three options: **Auto Rename** (adding a sequential number), **Replace**, or **Skip** — with a progress bar for multi-file operations.
- **Extract** archives with support for `zip`, `tar`, `tar.gz`, `tar.xz`, `gz`, `xz`, and `rar`; with two options:
  - **Here**: extract into the same current directory.
  - **Browse**: choose any desired path inside the root directory through a graphical path browser (restricted to inside Root).
  - If a same-named folder already exists at the destination, the output name is automatically made unique by adding a number; no data is overwritten.
- **Compress** selected items into `zip`, `tar`, `tar.gz`, or `tar.xz`, with the ability to set the **Compression Level** for `tar.gz` and `tar.xz`. The created archive is stored directly in the current directory without any temporary file.
- **Search** with the following capabilities:
  - Search in the same directory or recursively downward from it.
  - Search by file name or file content.
  - Support for Plain Text or Regular Expression patterns.
- **File Info**: displays the actual file type (using the `file` command and Magic Bytes detection — not merely the filename extension), creation date, and file owner username.

### User Interface Design

- Modern, integrated Theme with custom CSS, without dependency on any frontend framework.
- All long-running operations (upload, compression, extraction, paste) have dedicated progress bars.
- Responsive design for proper display on small screens.

---

## Prerequisites

### For Compilation

- Linux operating system (or any POSIX-compatible system) with `pthread`.
- `gcc` compiler with support for the `gnu11` standard (version 9 or newer recommended).
- `make`.

### For Runtime

Archive extraction and compression capabilities make the server dependent on the following command-line tools, which must be available in the system `PATH`:

| Tool | Usage | Common Debian/Ubuntu package |
|---|---|---|
| `tar` | Create/extract `tar`, `tar.gz`, `tar.xz` | `tar` (usually installed by default) |
| `zip` | Create `zip` archives | `zip` |
| `unzip` | Extract `zip` archives | `unzip` |
| `gzip` | Extract individual `.gz` files | `gzip` (usually installed by default) |
| `xz` | Extract individual `.xz` files | `xz-utils` |
| `unrar` | Extract `.rar` archives | `unrar` |
| `file` | Detect actual file type (Magic Bytes) in the “File Info” section | `file` (usually installed by default) |
| `bash` | Run subcommands for extracting individual `gz`/`xz` files | `bash` (usually installed by default) |

Install all dependencies on Debian/Ubuntu-based distributions:

```bash
sudo apt update
sudo apt install -y build-essential tar zip unzip gzip xz-utils unrar file bash
```

On Red Hat/Fedora-based distributions:

```bash
sudo dnf install -y gcc make tar zip unzip gzip xz unrar file bash
```

> If some of these tools are not installed, the server will still run and the browsing/upload/download file sections will work normally; only operations related to that specific archive format (for example, extracting a `.rar` file without `unrar`) will fail.

---

## Installation and Compilation

### Cloning the Repository

```bash
git clone https://github.com/mehmetlotfi/gfilex.git
```

### Entering the Created Directory

```bash
cd gfilex
```

### Cleaning Extra Files - Leaving Only the Source

```bash
make clean
```

This command removes previously created binary files, markdown files, and `LICENSE` from the project structure so that only pure source code remains.

### Checking Prerequisites

```bash
chmod u+x ./configure
./configure
```

If all checks return `ok`, proceed to the next step — otherwise go to [Prerequisites](#prerequisites) or manually install the package(s) that produced errors and run the above script again.

### Compilation

```bash
make
```

This command builds an optimized binary (`-O2`) with compiler security hardening options (`_FORTIFY_SOURCE`, `stack-protector-strong`, `PIE`, `RELRO`) in the main project directory under the name `gfilex`.

> Note: The Build process does not use any directory outside the project (such as `/tmp`). Intermediate Object files are created in a temporary directory inside the project itself and are immediately deleted after final linking; at the end, only the executable remains.


### Installation (copy to a path) - (optional)
You can copy the compiled program (``` gfilex ‍‍```) to one of your system paths. You can do this manually or use the following command for this purpose (with root privileges):
```bash
make install
```

If you are not root but have sudo access, add sudo before the command as follows:
```bash
sudo make install
```

If you change your mind (to remove it), you can manually delete the file ``` gfilex ‍‍``` from the specified path or enter the following command:

```bash
make uninstall
```

If you are not root but have sudo access, add sudo before the command as follows:
```bash
sudo make uninstall
```

## Running and Using

### Running Method

```bash
./gfilex [path] [port]
```

Both arguments are **optional** and can be given in any order (the server automatically determines which argument is numeric):

| Run mode | Behavior |
|---|---|
| `./gfilex` | Serves the current directory on the default port `5000` |
| `./gfilex 8080` | Serves the current directory on port `8080` |
| `./gfilex /srv/files` | Serves `/srv/files` on port `5000` |
| `./gfilex /srv/files 8080` | Serves `/srv/files` on port `8080` |

If the specified path does not exist or the executing user does not have access to it, the server stops with a clear error message and exit code 1 without crashing.

After startup, the server prints all accessible IP addresses on the system (including Loopback, local network, etc.) along with the complete link, for example:

```
Serving HTTP on the following addresses (port 5000):
  http://127.0.0.1:5000
  http://192.168.1.20:5000
Press Ctrl+C to stop.

Serving directory: /srv/files
```

To stop the server, press `Ctrl+C`; before exiting, the server completes all requests currently being processed and frees resources.

### Accessing the Web Interface

Open the address printed in the terminal (for example, `http://127.0.0.1:5000`) in your browser. If you want the server to also be accessible from other devices on the local network, enter the same local network IP address printed by the server (for example, `http://192.168.1.20:5000`) on those devices. Note that the server listens on all network interfaces, so if access restriction is required, the operating system firewall must be used (see the [Security Notes](#security-notes) section).

### Running as a Background Service (optional)

Example `systemd` unit for continuously running the server:

```ini
# /etc/systemd/system/gfilex.service
[Unit]
Description=GFilex
After=network.target

[Service]
Type=simple
User=gfilex
ExecStart=/opt/gfilex/gfilex /srv/shared-files 8080
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now gfilex.service
```

It is recommended to run the server with a non-Root user without additional privileges (see the [Security Notes](#security-notes) section).

---

## Project Structure

The project is divided into small, single-responsibility files for readability, easy maintenance, and fast debugging; each file implements exactly one specific part of the application logic:

```
gfilex/
├── configure
├── Makefile
├── LICENSE
├── README-fa.md
├── README.md
├── README-tr.md
├── include
│   ├── config.h
│   ├── dir_response.h
│   ├── file_send.h
│   ├── file_utils.h
│   ├── http_handler.h
│   ├── http_parser.h
│   ├── http_response.h
│   ├── internal_buffer.h
│   ├── logger.h
│   ├── management_handler.h
│   ├── net_utils.h
│   ├── paste_check_handler.h
│   ├── path_safety.h
│   ├── request_reader.h
│   ├── resume_cache.h
│   ├── thread_pool.h
│   └── upload_handler.h
└── src
    ├── archive_create.c
    ├── archive_extract.c
    ├── archive_stream.c
    ├── dir_create_rename.c
    ├── dir_listing.c
    ├── dir_remove.c
    ├── dir_response.c
    ├── file_info.c
    ├── file_search.c
    ├── file_send.c
    ├── http_handler.c
    ├── http_parser.c
    ├── http_response.c
    ├── internal_buffer.c
    ├── logger.c
    ├── main.c
    ├── management_handler.c
    ├── mime_types.c
    ├── move_copy_ops.c
    ├── name_sanitize.c
    ├── net_utils.c
    ├── paste_check_handler.c
    ├── path_resolve.c
    ├── path_safety.c
    ├── request_reader.c
    ├── resume_cache.c
    ├── size_format.c
    ├── thread_pool.c
    └── upload_handler.c

```

---

## Internal Programming Interface (API)

The web interface communicates with the server through a set of HTTP routes. These routes can also be called directly without the graphical interface (for example, for scripting):

| Method | Path | Description |
|---|---|---|
| `GET` | `/<path>/` | Display a directory listing or download/display a file |
| `GET` | `/<path>/?action=archive&format=zip\|tarxz` | Download the entire directory as an archive |
| `GET` | `/?action=browse&path=<path>` | List subdirectories of a path (for the path browser) |
| `GET` | `/?action=search&pattern=<p>&path=<path>&recursive=0\|1&content=0\|1&regex=0\|1` | Search files |
| `GET` | `/?action=info&target=<path>` | Get file information |
| `GET` | `/?action=paste_check&dest_dir=<path>&names=<json>` | Check name conflicts before Paste |
| `POST` | `/<path>/` (with `multipart/form-data`) | Upload a file |
| `POST` | `/<path>/?action=mkdir` (body: `name=`) | Create a folder |
| `POST` | `/?action=rename&src=<path>&new_name=<name>` | Rename |
| `POST` | `/<path>/?action=paste&mode=move\|copy&src=<path>[&conflict=rename\|replace]` | Move or copy |
| `POST` | `/?action=extract&src=<path>&dest=here\|<path>` | Extract an archive |
| `POST` | `/<path>/?action=compress` (body: `name=`, `format=`, `level=`, `files=`) | Create an archive from selected items |

All paths pass through a security filter restricting them to the root directory before any file operation.

---

## Security Notes

- By default, the server listens on all network interfaces (`0.0.0.0`). If you want access only through `localhost` or a specific network, use the operating system firewall (`iptables`, `ufw`, `firewalld`) to restrict the port.
- This project has **no built-in Authentication or TLS/HTTPS encryption mechanism**. If you intend to expose the server on an untrusted network or the public Internet, you should place it behind a Reverse Proxy (such as Nginx or Caddy) with HTTPS support and an appropriate authentication layer.
- It is strongly recommended to run the server with a restricted system user (non-Root) without write access to sensitive system paths. The executing user should only have access to the directory intended to be served.
- Upload, folder creation, rename, move, extraction, and compression capabilities are exposed to web users only when the system user running the server itself has write access to that directory; this is an operating-system-level restriction, not an end-user authentication mechanism.
- All input paths (file name, destination path, search pattern, etc.) are validated and sanitized before use to prevent Path Traversal or Command Injection attacks when invoking external tools (`tar`, `zip`, ...).

---

## Advanced Configuration

Important default values are defined in [`include/config.h`](include/config.h) and can be changed before compilation if needed:

| Constant | Default value | Description |
|---|---|---|
| `DEFAULT_PORT` | `5000` | Default port when no argument is specified |
| `THREAD_POOL_SIZE` | `16` | Number of worker threads for concurrent request processing |
| `TASK_QUEUE_CAPACITY` | `256` | Maximum number of requests in the waiting queue |
| `MAX_UPLOAD_FILE_SIZE` | 10 GB | Maximum allowed size for each uploaded file |
| `MAX_DIR_ENTRIES` | `100000` | Maximum number of items displayed in a directory listing |
| `RESUME_CACHE_TTL_SEC` | `300` (5 minutes) | How long automatic download resume remains valid |
| `SOCKET_RECV_TIMEOUT_SEC` / `SOCKET_SEND_TIMEOUT_SEC` | `30` | Wait time before disconnecting unresponsive connections |

After changing any of these values, recompile the project (`make clean && make`).

---

## Contributing

Pull Requests and Bug Reports (Issue) are welcome. Please open an Issue to discuss major changes before submitting them. Code should:

- Compile with the `gnu11` standard and without any Warning under `-Wall -Wextra`.
- Follow the project's single-file/single-responsibility style.
- Include functional and security testing (especially for file paths) when adding a new feature.

---

### External Runtime Dependencies

Note that the command-line tools used at runtime (`tar`, `zip`, `unzip`, `gzip`, `xz`, `unrar`, `file`) are not part of this project's source code and are only invoked as External Processes through the operating system; each of these tools has its own license (often GPL or similar) and is not covered by this project's license.


# Mehmet Lotfi