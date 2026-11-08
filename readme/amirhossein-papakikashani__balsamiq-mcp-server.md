# Balsamiq Wireframes MCP Server 🎨📐

An official **Model Context Protocol (MCP)** Server for seamlessly integrating **Balsamiq Wireframes** with **Google Antigravity**, **Claude Code**, and AI Agent ecosystems.

This server enables AI assistants to autonomously construct, layout, and export interactive UI mockups directly into native **`.bmpr`** project files (fully compliant with Balsamiq Wireframes 4.x) and standard Wireframe JSON format.

---

## ✨ Features

- 🛠 **Autonomous UI Generation**: AI agents can generate UI mockups based on natural language prompts (e.g. *"Create a barber appointment booking dashboard with search filters, table, and action buttons"*).
- 📦 **Native `.bmpr` Support**: Direct SQLite serialization with 100% schema compliance for Balsamiq Wireframes 4.x (open files instantly with double-click).
- 🧩 **Extensive Control Library**: Supports all core Balsamiq widgets (`BrowserWindow`, `Button`, `TextInput`, `TextArea`, `DataGrid`, `SearchBox`, `ComboBox`, `CheckBox`, `RadioButton`, `Label`, `Title`, `Subtitle`, `ButtonBar`, `Icon`, `Image`, `Paragraph`).
- ⚡ **Lightweight & Fast**: Built on top of Python `FastMCP`.

---

## 🚀 Installation & Quick Start

### 1. Prerequisites
- Python 3.10 or higher
- [Balsamiq Wireframes](https://balsamiq.com/wireframes/)

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## ⚙️ Configuration

### For Google Antigravity
Add the server definition to your `~/.gemini/config/mcp_config.json` file:

```json
{
  "mcpServers": {
    "balsamiq": {
      "command": "python",
      "args": [
        "E:/Balsamiq_mcp/server.py"
      ]
    }
  }
}
```

### For Claude Desktop / Claude Code
Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "balsamiq": {
      "command": "python",
      "args": [
        "E:/Balsamiq_mcp/server.py"
      ]
    }
  }
}
```

---

## 🛠 Available Tools (MCP API)

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `init_canvas` | `title: str`, `width: int`, `height: int` | Initializes a clean canvas/wireframe buffer with custom title and dimensions. |
| `add_control` | `control_type: str`, `x: int`, `y: int`, `w: int`, `h: int`, `text: str`, `properties: dict` | Adds a specific UI widget onto the canvas with coordinate positioning and properties. |
| `export_bmpr` | `file_path: str` | Generates a native Balsamiq `.bmpr` project SQLite file that opens directly in Balsamiq Wireframes. |
| `export_wireframe` | `file_path: str` | Exports the mockup to a standard Balsamiq Wireframe JSON document. |

---

## 📝 Example Usage Prompt

> *"Create a wireframe for a barber appointment management dashboard with a search bar, staff filter dropdown, and a data grid displaying customer bookings."*

The Agent automatically invokes:
1. `init_canvas("Barber Management Dashboard", 1100, 800)`
2. `add_control("BrowserWindow", 50, 30, 1000, 720, "Barber Management System\nhttp://barber.local")`
3. `add_control("SearchBox", 80, 160, 280, 32, "Search customer...")`
4. `add_control("DataGrid", 80, 210, 940, 420, "ID ^, Customer, Time, Service, Barber, Status\n#101, Ali Rezaei, 10:30, Haircut, Sohrab, [x] Confirmed")`
5. `export_bmpr("appointments.bmpr")`

---

## 📄 License
MIT License. Feel free to use and contribute!