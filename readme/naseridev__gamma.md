# Gamma

Gamma is a terminal music player and library browser written in Rust. It scans local folders for audio files, reads their tags, and gives you a fast, keyboard-driven interface to search, queue, and play them, all inside your terminal.

## Features

- Library browsing with fuzzy filtering by artist, album, or title.
- Metadata extraction (title, artist, album, duration) via lofty.
- Multi-threaded discovery and tagging with rayon, scaled to your CPU by default.
- Playback with play, pause, seek, volume, mute, and repeat modes, powered by rodio.
- Queue management: enqueue, play next, reorder, and clear.
- Shuffle, repeat-one, and repeat-all modes.
- Session persistence: Gamma remembers your queue and playback position between runs.
- Favorites and sortable views, by title, artist, album, or duration.
- A command palette for quick actions without leaving the keyboard.
- Multiple music directories ("routes") that you manage from the CLI.

## Installation

### From GitHub Releases

Download a prebuilt binary from the [Releases page](https://github.com/naseridev/gamma/releases). Grab the archive for your platform, extract it, and place the `gamma` binary on your `PATH`.

### From source

```bash
git clone https://github.com/naseridev/gamma
cd gamma
cargo build --release
```

The binary is at `target/release/gamma`. Install it onto your `PATH`:

```bash
cargo install --path .
```

Or copy the binary manually:

```bash
cp target/release/gamma ~/.local/bin/
```

### Requirements

- Rust 2024 edition toolchain (stable).
- A terminal that supports ANSI escape sequences.
- Audio output supported by rodio on your platform: ALSA on Linux, CoreAudio on macOS, WASAPI on Windows.

## Getting started

gamma needs at least one music route before it can start.

```bash
gamma route add ~/Music
```

Then launch it:

```bash
gamma
```

If no routes are configured, or none of the configured paths exist, gamma prints instructions and exits instead of opening the interface.

## CLI reference

```
gamma [OPTIONS] [COMMAND]
```

| Command | Description |
|---|---|
| `gamma` | Launch the terminal interface. |
| `gamma route add <PATH>` | Add a music directory as a route. |
| `gamma route list` | List configured routes. |
| `gamma route remove <PATH_OR_ID>` | Remove a route by path or list ID. |
| `gamma route clear` | Remove all routes. |

| Option | Description |
|---|---|
| `-t, --threads <N>` | Discovery thread count. Defaults to available parallelism. |

## Keybindings

### Library view

| Key | Action |
|---|---|
| `j` / `k` or arrow keys | Move selection down or up |
| `g` / `G` | Jump to top or bottom |
| `Ctrl+f` / `Ctrl+b` or Page Down/Up | Move by page |
| `/` | Filter the library |
| `:` | Open the command palette |
| `Enter` | Play the selected track |
| `Space` | Toggle play and pause |
| `n` / `p` | Next or previous track |
| `h` / `l` or Left/Right | Seek back or forward 5 seconds |
| `+` / `-` | Volume up or down |
| `m` | Toggle mute |
| `x` | Stop playback |
| `Z` | Toggle shuffle |
| `r` | Cycle repeat mode |
| `R` | Rescan library |
| `e` | Enqueue selected track |
| `E` | Play selected track next |
| `f` | Toggle favorite |
| `Tab` | Toggle the queue pane |
| `d` / `i` | Toggle the details pane |
| `s` | Cycle sort field |
| `S` | Toggle sort direction |
| `v` | Toggle visualizer |
| `?` | Toggle help pane |
| `q` | Quit |

### Filter mode

Type to filter. `Enter` confirms and returns to the library view. `Esc` clears the filter. `Ctrl+u` clears the query.

### Queue pane

| Key | Action |
|---|---|
| `j` / `k` | Move queue cursor |
| `Enter` | Play the selected queue entry |
| `J` / `K` | Move the selected entry down or up |
| `d` / `x` | Remove the selected entry |
| `c` | Clear the queue |
| `Z` | Toggle shuffle |
| `r` | Cycle repeat mode |
| `Tab` / `Esc` / `q` | Close the queue pane |

### Command palette

Type to filter commands. `Enter` runs the selected one. `Esc` closes the palette.

### Help pane

Type to filter shortcuts as you go. `Backspace` removes a character and `Ctrl+u` clears the query. `Esc` clears the query, then closes the pane; `Enter` closes it right away.

### Mouse

Mouse capture is enabled while the TUI is running and released on exit. Wheel over the volume label to raise or lower the volume, wheel over the library, queue, or help pane to scroll them, click a library or queue row to select it, and click a command palette entry to select it (click it again to run it). Double-click a library row to select and play it, click or drag on the progress-bar meter to seek, and wheel over the volume label to adjust volume. Everything else stays keyboard-only.

## Configuration and data

gamma stores its configuration and routes under your platform's config directory, in a `gamma` subfolder, and keeps session state under your platform's local data directory, also in a `gamma` subfolder. Both fall back to a temp directory if the platform paths cannot be resolved.

## Building for release

The release profile in `Cargo.toml` is tuned for a small, fast binary:

```toml
[profile.release]
opt-level = 3
lto = "thin"
codegen-units = 1
panic = "abort"
strip = true
```

Run `cargo build --release` to produce it.

## Project layout

```
src/
  app/        Application state, actions, and persistence
  cli/        Command-line argument parsing
  format/     Display and text formatting helpers
  library/    Discovery, metadata, search, and track models
  main.rs     Entry point and event loop
  playback/   Audio playback and analysis
  storage/    Config, state, and route storage
  ui/         Terminal interface, input handling, and overlays
```

## License

Gamma is licensed under the [GPL-3.0 license](https://github.com/naseridev/gamma#).