# 🛡️ TCP-Hunter

<p align="center">
  <b>Advanced TCP Port Scanner built with Python</b>
</p>

<p align="center">
  Fast, lightweight and modular network reconnaissance tool.
</p>


---

## 📌 Overview

TCP-Hunter is a Python-based TCP port scanner designed for network reconnaissance, security learning, and authorized penetration testing environments.

The tool uses TCP socket programming and multi-threaded scanning techniques to identify open ports on a target system and detect common services running on those ports.

This project was built to explore:

- TCP/IP networking
- Socket programming
- Port scanning techniques
- Network service discovery
- Python concurrency


---

## ✨ Features

- 🚀 Fast TCP port scanning
- ⚡ Multi-threaded scanning engine
- 🔍 Open port detection
- 🌐 Basic service identification
- 💻 Command Line Interface (CLI)
- 🎨 Beautiful terminal interface
- 🧩 Clean and modular architecture
- 🛡️ Lightweight and easy to use


---

## 📸 Preview

```text
████████╗ ██████╗██████╗ 
╚══██╔══╝██╔════╝██╔══██╗
   ██║   ██║     ██████╔╝
   ██║   ██║     ██╔═══╝
   ██║   ╚██████╗██║
   ╚═╝    ╚═════╝╚═╝


        TCP-Hunter
        TCP Port Scanner


Target: example.com
Ports: 1-1000


        Open Ports

 PORT        SERVICE
 --------------------
 80          HTTP
 443         HTTPS
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/TCP-Hunter.git
```

Enter project directory:

```bash
cd TCP-Hunter
```

Install dependencies:

```bash
pip install -r requirements.txt
```


---

# 🚀 Usage

## Basic Scan

```bash
python main.py scan TARGET
```

Example:

```bash
python main.py scan 127.0.0.1
```


## Scan Custom Port Range

```bash
python main.py scan TARGET --start START_PORT --end END_PORT
```

Example:

```bash
python main.py scan example.com --start 1 --end 1000
```


---

# 🏗️ Project Structure

```
TCP-Hunter/

│
├── main.py                  # Command line interface
│
├── scanner/
│   │
│   ├── core.py              # TCP scanning engine
│   ├── services.py          # Port and service database
│   └── __init__.py
│
├── requirements.txt         # Project dependencies
│
└── README.md                # Documentation
```


---

# 🧠 How It Works

TCP-Hunter works by creating TCP socket connections to a target host and checking whether specific ports accept incoming connections.

The scanning process:

```
Target Host

      |
      |
Create TCP Socket

      |
      |
Attempt Connection

      |
      |
Analyze Response

      |
      |
Open / Closed Port
```


To improve scanning speed, TCP-Hunter uses Python's ThreadPool system to scan multiple ports simultaneously.


---

# 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Python | Core development |
| Socket | TCP communication |
| ThreadPool | Concurrent scanning |
| Typer | CLI framework |
| Rich | Terminal interface |


---

# 🔐 Security Notice

TCP-Hunter is created for:

- Educational purposes
- Network administration
- Cybersecurity labs
- Authorized security testing


⚠️ Only scan systems that you own or have explicit permission to test.

The author is not responsible for misuse of this tool.


---

# 🗺️ Roadmap

Future improvements:

- [ ] JSON report generation
- [ ] Export scan results
- [ ] Banner grabbing
- [ ] Advanced service detection
- [ ] UDP scanning
- [ ] SYN scanning with Scapy
- [ ] Logging system
- [ ] Configuration file support
- [ ] Web dashboard


---

# 👨‍💻 Author

**Armin Cooper**

Computer Engineering Student

Cybersecurity & Network Security Enthusiast


---

# ⭐ Support

If you find this project useful, consider giving it a star ⭐