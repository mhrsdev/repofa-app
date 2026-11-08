# 🛡️ VPN Guard (Chrome Extension - Manifest V3)

**VPN Guard** is a light-weight, privacy-focused Chrome Extension that strictly prevents accidental browsing on user-defined sensitive websites whenever your VPN is disconnected.

---

## ✨ Features

* **🎯 Custom Restricted Domain List:** Easily add or remove websites (e.g., `youtube.com`, `github.com`) directly from the Extension Popup.
* **🔒 Fail-Safe Protection:** Automatically intercepts navigation before pages load if the VPN is OFF or if IP telemetry cannot be verified.
* **🔄 Seamless Auto-Restore:** Automatically redirects open blocked tabs back to their original target destination once the VPN is re-connected.
* **⏱️ Auto-Retry Loop:** Periodically re-checks VPN telemetry every 2 seconds on the blocked page and updates status dynamically.
* **📱 Modern Dark/Light UI:** Clean, responsive, and accessible user interface for both the blocked page and extension popup.
* **🚀 Manifest V3 Compliant:** Built using clean, modular asynchronous architecture without any heavy external dependencies or bundlers.

---

## 📁 Project Structure

```text
VPN-Guard/
├── manifest.json       # Extension configuration & Manifest V3 setup
├── background.js       # Background Service Worker orchestrator
├── utils.js            # Common helper functions and URL matchers
├── storage.js          # Async wrapper for chrome.storage.local
├── vpnChecker.js       # IP & Country telemetry fetching logic
├── navigationGuard.js  # Intercepts web navigation requests
├── blocked.html        # Redirection landing page when VPN is OFF
├── blocked.css         # Styling for the blocked page
├── blocked.js          # Auto-retry loop and UI logic for blocked.html
├── popup.html          # Extension popup UI
├── popup.css           # Styling for popup UI
├── popup.js            # Popup interactions & domain manager
├── README.md           # Documentation
└── icons/              # Extension icons
    ├── icon-red.png
    └── icon-green.png
```
## 🚀 Installation

1. Clone or download this repository to your local machine.

2. Open Google Chrome and go to:

   ```
   chrome://extensions/
   ```

3. Enable **Developer mode** using the toggle in the top-right corner.

4. Click **Load unpacked**.

5. Select the root folder of the **VPN Guard** extension.

The extension is now installed and ready to use.

---

## ⚙️ Usage

### Add Restricted Websites

1. Click the **VPN Guard** icon in the Chrome toolbar.
2. Enter a domain name (for example: `github.com` or `chatgpt.com`) in the **Restricted Websites** field.
3. Press **Enter** or click the **+** button.

The domain will be added to the protected list.

---

### Test the Protection

#### VPN Disconnected

1. Disable your VPN.
2. Visit a website that exists in your restricted list.

VPN Guard will:

- Detect that the VPN is not active.
- Block the request.
- Redirect the browser to **blocked.html**.

#### VPN Connected

1. Connect to your VPN (any system-wide VPN).
2. Visit the same restricted website.

VPN Guard will:

- Detect the VPN connection by verifying the current public IP and country.
- Automatically allow access.
- Return the browser to the original requested page.

---

## 🔒 Security & Privacy

### Zero Data Collection

VPN Guard does **not** collect, store, or transmit:

- Browsing history
- Credentials
- Personal information
- Usage analytics

---

### Local Storage Only

All configuration data is stored locally using:

```javascript
chrome.storage.local
```

This includes:

- Restricted website list
- VPN telemetry cache
- Extension settings

No data is sent to external servers.

---

### Fail-Safe Protection

If VPN detection services fail, timeout, or become unavailable, VPN Guard automatically assumes that the VPN is **OFF**.

This fail-safe behavior prevents accidental IP leakage by blocking access until VPN status can be verified.

---

## ✨ Features

- Protect any website by domain.
- Automatic VPN status detection.
- Blocks protected websites when VPN is disconnected.
- Automatically restores access when VPN reconnects.
- Local-only storage.
- No tracking or telemetry.
- Lightweight and built with Manifest V3.

---

## 🛠 Technologies

- JavaScript
- Chrome Extensions API
- Manifest V3
- chrome.storage.local
- Declarative Net Request