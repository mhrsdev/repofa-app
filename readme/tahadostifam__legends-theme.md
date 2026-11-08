# Legends Theme

A pure dark VSCode theme with black background for maximum contrast and eye comfort.

Forked from [github-dark-high-contrast](https://github.com/hipstersmoothie/github-dark-high-contrast).

## Screenshot

<img src="./screenshot.png" />

## Color Palette

| Role          | Color   | Hex       |
| ------------- | ------- | --------- |
| Background    | Pure Black | `#000000` |
| Borders       | Dark Gray  | `#1e1e1e` |
| Functions     | Green      | `#15ff00` |
| Keywords      | Purple     | `#9012ff` |
| Strings       | Orange     | `#ffaa00` |
| Operators     | Orange     | `#ff6600` |
| Types/Classes | Yellow     | `#ffcc00` |
| Errors        | Red        | `#ff3333` |

## How to Build

1. Clone this repository:

   ```bash
    git clone https://github.com/tahadostifam/Legends-Theme
    cd Legends-Theme
   ```

2. Install `vsce` (VSCode Extension Manager):

   ```bash
   npm install -g @vscode/vsce
   ```

3. Package the theme into a `.vsix` file:

   ```bash
   vsce package
   ```

4. This will generate `legends-theme-1.0.0.vsix` in the project root.

## How to Import in VSCode

### Via VSIX (Recommended)

1. Open VSCode
2. Go to Extensions (`Ctrl+Shift+X`)
3. Click the `...` (More Actions) menu at the top of the Extensions sidebar
4. Select **Install from VSIX...**
5. Browse and select `legends-theme-1.0.0.vsix`

### Via Command Palette

1. Open VSCode
2. Press `Ctrl+Shift+P` to open the Command Palette
3. Type and select **Extensions: Install from VSIX...**
4. Browse and select the `.vsix` file

### Activate the Theme

1. Press `Ctrl+K Ctrl+T` or open the Command Palette (`Ctrl+Shift+P`)
2. Search for **Preferences: Color Theme**
3. Select **Legends Theme** from the list

### Manual Installation (without packaging)

Copy the `themes/` folder and `package.json` into `~/.vscode/extensions/legends-theme/` (Linux/macOS) or `%USERPROFILE%\.vscode\extensions\legends-theme\` (Windows), then reload VSCode.