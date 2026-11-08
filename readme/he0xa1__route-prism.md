# 💎 RoutePrism

A modern, high-performance, cross-browser extension for **Google Chrome**, **Mozilla Firefox**, and **Apple Safari** that sniffs, extracts, and refracts all network domains, subdomains, third-party services, and CDN endpoints visited by any website.

It generates ready-to-paste routing rules and binary geosite files for:
- 🌐 **geosite.dat** (`geosite-<website>.dat` binary protobuf for V2Box, v2ray, Xray & sing-box)
- 🚀 **sing-box** (Rule-Set JSON, Route Rule snippet, Headless rules)
- ⚡ **v2ray / Xray** (`domain:` list, `full:` list, config.json routing rules)
- 🐱 **Clash / Clash Meta / Mihomo** (`DOMAIN-SUFFIX`, `DOMAIN`, Rule Provider YAML)
- ⚡ **Surge / Loon / Quantumult X / Shadowrocket**
- 📋 **Comma-Separated Lists** (All domains & subdomains, Just domains, Just subdomains)
- 📄 **Plain Domain Lists** (Root domains, Subdomains only, Full FQDNs, Wildcard `*.domain`, JSON array, AdGuard/Adblock, Dnsmasq)

---

## ✨ Features

- **Double-Layered Sniffing Engine**:
  - **Background Network Interceptor**: Observes all network requests (`webRequest.onBeforeRequest` in non-blocking mode) including XHR, fetch, WebSockets, stylesheets, scripts, iframes, images, and video/audio streaming chunks (such as YouTube's `googlevideo.com` CDN segments).
  - **In-Page DOM & Resource Timing Scanner**: Discovers links, media tags, embedded objects, and late-loading dynamic resources via `performance.getEntriesByType('resource')` and `PerformanceObserver`.
- **Intelligent Root Domain (eTLD+1) Parser**:
  - Automatically identifies registrable root domains, correctly handling multi-level public suffixes (e.g., `co.uk`, `com.au`, `org.cn`, `com.tr`, `github.io`, etc.).
  - Distinguishes **1st-Party** domains (subdomains of the site you are visiting) from **3rd-Party** domains (external CDNs, APIs, trackers, auth providers).
- **System-Adaptive Dark & Light Themes**:
  - Automatically synchronizes with your operating system's dark/light mode preference with zero flickering, plus includes a 1-click manual toggle (Auto 🌓 / Dark 🌙 / Light ☀️).
- **Automatic `geosite-<website>.dat` Generation**:
  - Compiles valid Protocol Buffers binary files tagged for V2Box and v2ray with live syntax hints (`ext:geosite-<website>.dat:<TAG>`).
- **Collapsible Tree & Flat Views**:
  - Group subdomains under their root domain in an accordion tree, or view a flat sorted list by request frequency.
- **Instant Search & Filter Chips**:
  - Filter by `All`, `1st-Party`, `3rd-Party`, or `Media/CDN`.
  - Live search input to quickly isolate specific services.
- **Active Tab & All Visited Sessions**:
  - **Current Site**: Domains captured during the active tab's browsing.
  - **All Visited Sites**: Historical list of visited websites grouped with their respective domain trees.
- **1-Click Copy & File Export**:
  - Copy directly to clipboard with instant toast notification.
  - Export to `.dat`, `.json`, `.txt`, or `.yaml` file.
  - In-popup **Preview modal** to inspect generated rule syntax before applying.

---

## 📦 Installation Guide

### 1. Google Chrome / Brave / Edge / Arc
1. Run the build script:
   ```bash
   npm run build
   ```
2. Open your browser and navigate to:
   - Chrome: `chrome://extensions`
   - Brave: `brave://extensions`
   - Edge: `edge://extensions`
3. Toggle on **Developer mode** (top right switch).
4. Click **Load unpacked** and select the directory:
   ```
   domainExtractor/dist/chrome
   ```
   *(or the root project folder directly)*.

---

### 2. Mozilla Firefox
1. Run the build script:
   ```bash
   npm run build
   ```
2. Open Firefox and navigate to:
   ```
   about:debugging#/runtime/this-firefox
   ```
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.json` file inside:
   ```
   domainExtractor/dist/firefox/manifest.json
   ```

---

### 3. Apple Safari (macOS & iOS)

#### Option A: Direct Unpacked Loading (Quick Testing)
1. Open **Safari** and go to **Settings** (or **Preferences**) -> **Advanced**.
2. Check the box **Show features for web developers** (or **Show Develop menu in menu bar**).
3. In the menu bar, open **Develop** -> check **Allow Unsigned Extensions**.
4. In Safari Settings, switch to the **Extensions** tab and enable **RoutePrism**.

#### Option B: Standalone App Wrapper via Xcode (Recommended for macOS/iOS)
macOS includes the `safari-web-extension-converter` tool to wrap the extension into an Xcode project:
```bash
npm run build
npm run build:safari-xcode
```
This generates a native macOS and iOS app project (`RoutePrism.xcodeproj`). Open it in Xcode, click **Run**, and the extension will be installed into Safari.

---

## 🚀 Store Publishing Packages

Running `npm run build` automatically packages ready-to-upload ZIP archives into the `dist/` folder:
- **Chrome Web Store / Edge / Brave**: `dist/route-prism-chrome.zip`
- **Firefox Add-ons (AMO)**: `dist/route-prism-firefox.zip`
- **Safari**: `dist/route-prism-safari.zip` (or Xcode project via `npm run build:safari-xcode`)

For complete store listing copy, justifications, and submission details, see [CHROMEWEBSTORE.md](file:///Users/he0xa1/Documents/domainExtractor/CHROMEWEBSTORE.md).
For privacy disclosure and data practices, see [PRIVACY.md](file:///Users/he0xa1/Documents/domainExtractor/PRIVACY.md).

---

## 🛠 Using Generated Rules in Proxy & VPN Apps

### 1. 🌐 Geosite Files (`geosite-<website>.dat` & v2fly text)

#### A. Binary `geosite-<website>.dat` (Protocol Buffers)
Format: `geosite-<website>.dat (Binary Protobuf)`  
Automatically names the file after the site you are visiting (e.g., `geosite-twitter.dat`, `geosite-youtube.dat`, `geosite-instagram.dat`) or a custom name you enter in the box.

Click **Export** to download the compiled `geosite-<website>.dat`. Place this file in your V2Box, V2Ray, Xray, or sing-box assets directory.

**V2Box / V2Ray / Xray (`config.json`)**:
```json
"routing": {
  "rules": [
    {
      "type": "field",
      "outboundTag": "proxy",
      "domain": [
        "ext:geosite-twitter.dat:TWITTER"
      ]
    }
  ]
}
```

**sing-box (`config.json`)**:
```json
{
  "route": {
    "rules": [
      {
        "geosite": [
          "twitter"
        ],
        "outbound": "proxy"
      }
    ]
  }
}
```

#### B. Geosite Source File (v2fly text format)
Format: `Geosite Source File (v2fly format)`  
Click **Export** to download `geosite-<website>.txt` ready for compiling with `v2fly/domain-list-community` or `sing-box rule-set compile`:
```text
# Geosite Data List: TWITTER
# Total Domains: 4
twitter.com
x.com
twimg.com
t.co
```

---

### 2. 📋 Comma-Separated & Subdomain Lists
In the format dropdown, select from:
- **Comma: All (Domains & Subdomains)**: `twitter.com, api.twitter.com, twimg.com, pbs.twimg.com, t.co`
- **Comma: Just Domains (Root)**: `twitter.com, twimg.com, t.co, x.com`
- **Comma: Just Subdomains**: `api.twitter.com, pbs.twimg.com, abs.twimg.com`
- **Just Domains (one per line)**: Plain root domain list.
- **Just Subdomains (one per line)**: Only subdomains (excluding root domains).

---

### 2. sing-box Rule-Sets

#### A. Headless Rule-Set JSON
Format: `sing-box (Rule-Set JSON)`  
Save as `my-site-rules.json` or paste into remote/local rule-set:
```json
{
  "version": 1,
  "rules": [
    {
      "domain_suffix": [
        "googlevideo.com",
        "youtube.com",
        "ytimg.com"
      ]
    }
  ]
}
```

#### B. Direct Route Rule Snippet
Format: `sing-box (Route Rule JSON)`  
Paste directly into your `config.json` under `"route"."rules"`:
```json
{
  "domain_suffix": [
    "googlevideo.com",
    "youtube.com",
    "ytimg.com"
  ],
  "outbound": "proxy"
}
```

---

### 2. v2ray / Xray

#### A. Routing Domain List
Format: `v2ray / Xray (domain: list)`  
Copy and paste into your v2ray routing rule list:
```
domain:googlevideo.com
domain:youtube.com
domain:ytimg.com
```

#### B. Config JSON Field
Format: `v2ray / Xray (Routing JSON)`  
Paste inside `"routing"."rules"` array in `config.json`:
```json
{
  "type": "field",
  "outboundTag": "proxy",
  "domain": [
    "domain:googlevideo.com",
    "domain:youtube.com",
    "domain:ytimg.com"
  ]
}
```

---

### 3. Clash / Mihomo

#### A. Rules List
Format: `Clash / Mihomo (DOMAIN-SUFFIX)`  
Paste under `rules:` in your `config.yaml`:
```yaml
rules:
  - DOMAIN-SUFFIX,googlevideo.com,PROXY
  - DOMAIN-SUFFIX,youtube.com,PROXY
  - DOMAIN-SUFFIX,ytimg.com,PROXY
```

#### B. Rule Provider YAML
Format: `Clash / Mihomo (Provider YAML)`  
Save to a file or rule-provider URL:
```yaml
payload:
  - '+.googlevideo.com'
  - '+.youtube.com'
  - '+.ytimg.com'
```

---

## 🧪 Development & Testing

```bash
# Run unit tests for TLD parser and formatters
npm test

# Rebuild all browser distributions (dist/chrome, dist/firefox, dist/safari)
npm run build

# Regenerate pixel-perfect PNG icons
npm run icons
```

---

## 📄 License
MIT