# 🌐 Agent RTL Fix

<p align="center">
  <b>Universal BiDi (RTL/LTR) Formatting Standard & Typography for AI Coding Agents</b>
  <br />
  <i>Zero-token bloat, native Markdown preservation, and isolated LTR code blocks for Persian, Arabic, Urdu, and Hebrew.</i>
</p>

<p align="center">
  <a href="https://github.com/dalroot/agent-rtl-fix/releases"><img src="https://img.shields.io/badge/release-v2.0.0-blue.svg?style=flat-square" alt="Release v2.0.0"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20macOS-informational.svg?style=flat-square" alt="Platforms">
  <img src="https://img.shields.io/badge/agents-Antigravity%20%7C%20Cursor%20%7C%20Windsurf%20%7C%20Copilot%20%7C%20Claude-success.svg?style=flat-square" alt="Supported Agents">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="License MIT"></a>
</p>

<p align="center">
  <b>English</b> • <a href="README.fa.md"><b>🇮🇷 راهنمای فارسی (Persian)</b></a>
</p>

---

## ⚡ The Problem

When AI coding assistants (like Google Antigravity, Cursor, Windsurf, Copilot, or Claude Code) generate responses in right-to-left (RTL) languages like **Persian, Arabic, Urdu, or Hebrew**, severe text-rendering bugs occur:

1. **Inverted Punctuation & Brackets**: Parentheses `()`, brackets `[]`, and quotation marks get inverted and jump across lines.
2. **Reversed Paths & URLs**: File paths (`/var/log/...` or `C:\Users\...`) and URLs get scrambled backward.
3. **Broken Markdown Tables**: Columns render in reversed order or get converted into ugly, bulky raw HTML.
4. **Token Bloat in Old Fixes**: Older community workarounds forced hundreds of characters of inline CSS styling on every single paragraph, slowing down generation and consuming token quota.

**Agent RTL Fix** completely solves this using a lightweight, native BiDi wrapper architecture with zero token bloat.

---

## 💬 1-Prompt In-Chat Activation (No Terminal Needed)

You don't need to open a terminal to enable this. Simply copy and paste this single prompt directly into your AI agent's chat window (in Antigravity, Cursor, Windsurf, Claude Code, or Copilot):

```text
Please read the universal BiDi formatting standard from:
https://raw.githubusercontent.com/dalroot/agent-rtl-fix/main/rules/AGENTS.md
and save it as an always-on rule in this workspace/environment.
```

---

## 🚀 Quick Install via Terminal (1-Liner)

Running the installer script automatically installs core Vazirmatn fonts, enables BiDi highlighting in your editor settings, and registers the global machine-wide rule:

### Windows (PowerShell)
```powershell
irm https://raw.githubusercontent.com/dalroot/agent-rtl-fix/main/install.ps1 | iex
```

### Linux & macOS (Bash)
```bash
curl -fsSL https://raw.githubusercontent.com/dalroot/agent-rtl-fix/main/install.sh | bash
```

### Offline / 1-Click
1. Download `agent-rtl-fix-v2.0.0.zip` from the [Latest Release](https://github.com/dalroot/agent-rtl-fix/releases/latest).
2. Extract the archive and run `install.bat` (Windows) or `bash install.sh` (Linux/macOS).

---

## 🤖 Supported AI Agents Matrix

| AI Coding Agent | Configuration Location | Rule File in this Repo | Setup Action |
| :--- | :--- | :--- | :--- |
| **Google Antigravity** | `~/.gemini/config/rules/` | [`rules/antigravity.md`](rules/antigravity.md) | Installed automatically system-wide (`trigger: always_on`) |
| **Cursor IDE** | `.cursor/rules/` or project root | [`rules/cursor.mdc`](rules/cursor.mdc) | Copy to `.cursor/rules/bidi.mdc` or `.cursorrules` |
| **Windsurf (Codeium)** | Project root | [`rules/windsurf.rules`](rules/windsurf.rules) | Copy to `.windsurfrules` |
| **GitHub Copilot** | `.github/` | [`rules/copilot-instructions.md`](rules/copilot-instructions.md) | Copy to `.github/copilot-instructions.md` |
| **Claude Code** | Project root | [`rules/claude.md`](rules/claude.md) | Append to `CLAUDE.md` |
| **Cline / Roo Code** | Project root | [`rules/cline.md`](rules/cline.md) | Copy to `.clinerules` |
| **Universal Standard** | Any project root | [`rules/AGENTS.md`](rules/AGENTS.md) | Place `AGENTS.md` in repository root |

---

## ⚙️ The Core Formatting Rule

The standard universal instruction enforced across all agents:

```markdown
- Whenever responding in RTL languages (Persian, Arabic, Urdu, Hebrew):
  1. Wrap the complete response inside <div dir="rtl">...</div>.
  2. Keep standard Markdown syntax for headings, bullet points, and tables.
  3. Keep all code blocks, logs, terminal outputs, and file paths strictly LTR.
  4. Never produce uncontained or left-aligned RTL text.
```

---

## 📁 Repository Structure

```text
agent-rtl-fix/
├── .github/
│   └── workflows/
│       └── release.yml          # Automated release and zip packager
├── rules/                       # Modular rules for every agent
│   ├── antigravity.md           # Antigravity always_on global rule
│   ├── cursor.mdc               # Cursor IDE rule
│   ├── windsurf.rules           # Windsurf rules
│   ├── copilot-instructions.md  # GitHub Copilot instructions
│   ├── claude.md                # Claude Code instructions
│   ├── cline.md                 # Cline / Roo Code rules
│   └── AGENTS.md                # Universal AI Agent specification
├── fonts/                       # Core Vazirmatn typography (~500 KB)
│   └── Vazirmatn/
│       ├── Vazirmatn-Regular.ttf
│       ├── Vazirmatn-Medium.ttf
│       ├── Vazirmatn-SemiBold.ttf
│       └── Vazirmatn-Bold.ttf
├── scripts/
│   ├── install.ps1              # Modular Windows installer
│   ├── install.sh               # Modular Linux/macOS installer
│   ├── uninstall.ps1            # Windows cleanup script
│   └── uninstall.sh             # Linux/macOS cleanup script
├── install.bat                  # 1-Click Windows launcher
├── install.ps1                  # Root PowerShell installer
├── install.sh                   # Root Bash installer
├── LICENSE                      # MIT License
├── README.md                    # English Documentation
└── README.fa.md                 # Persian Documentation
```

---

## 🔍 Search Keywords & Indexing Topics
`ai-agent-rtl` • `cursor-rules-rtl` • `antigravity-persian` • `vazirmatn-vscode` • `bidi-markdown` • `copilot-rtl` • `windsurf-rules` • `claude-code-persian` • `persian-arabic-urdu-hebrew` • `inverted-parentheses-fix` • `bidirectional-text-formatting`

---

## 📜 License

This project is licensed under the **MIT License**. Free for open-source and commercial use.