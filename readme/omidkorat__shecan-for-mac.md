# Shecan for Mac

Shecan for Mac is a lightweight, modern menu bar application that makes it incredibly easy to enable or disable the Shecan DNS service on your Mac. Built with SwiftUI for macOS 14.0+.

## Features

*   **1-Click Enable/Disable**: Toggle Shecan DNS from your menu bar instantly.
*   **Shecan Pro**: Seamlessly switch to Shecan Pro DNS servers.
*   **Smart Network Detection**: Automatically applies DNS changes to all your active hardware network interfaces (Wi-Fi, Ethernet, etc.) simultaneously, and ignores virtual VPN interfaces so the settings actually take effect.
*   **Auto-Update IP**: Configurable custom URL to automatically fetch and display your current IP address (ideal for DDNS/Shecan update links) with automatic 30-minute background refreshing.
*   **Launch at Login**: Easily configure the app to start automatically when you log into your Mac.
*   **Native & Lightweight**: Runs entirely from the Menu Bar using modern `MenuBarExtra`. No Dock icon, minimal footprint.

## Requirements

*   macOS 14.0 or later

## Installation

1.  Download the latest `Shecan.dmg` from the **Releases** page.
2.  Open the DMG and drag `Shecan.app` into your `Applications` folder.
3.  Open the app. It will appear as a shield icon in your top right menu bar.

*Note: The first time you enable/disable Shecan, macOS will prompt you for your administrator password, as changing system-wide DNS settings requires elevated privileges.*

## Building from Source

1.  Clone the repository.
2.  Open `Shecan.xcodeproj` in Xcode 15 or later.
3.  Select the `Shecan` scheme and build for your Mac.

## How it works under the hood

The application utilizes AppleScript (`osascript`) wrapping standard `networksetup` terminal commands to correctly ask for your permission without running into App Sandbox/TCC limitations. It fetches your active network adapters and pushes the `178.22.122.100` and `185.51.200.2` DNS configurations to them.

## License
MIT License