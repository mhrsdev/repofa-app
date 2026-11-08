# SSH Automation

A Python-based multi-server SSH automation tool that executes commands concurrently across multiple remote Linux machines using Paramiko.

It supports ping checking, retry logic, sudo execution, logging, and JSON result export.

---

## Features

- Execute SSH commands on multiple servers in parallel
- Built-in ping check before connection
- Automatic retry with exponential backoff
- Thread pool concurrency (fast execution)
- Optional sudo command execution
- Real-time terminal output
- Thread-safe logging system
- JSON export of execution results

---

## Requirements

- Python 3.8+
- Paramiko

Install dependency:

```bash
pip install paramiko
````

---

## Configuration

All configuration is done directly inside `main.py`.

---

### Server list

Edit the `SERVERS` list:

```python
SERVERS = [
    {"ip": "192.168.1.10", "username": "client-01", "password": "123", "sudo": True, "port": 22},
    {"ip": "192.168.1.11", "username": "client-02", "password": "123", "sudo": True, "port": 22}
]
```

---

### Command to execute

Set the command you want to run on all servers:

```python
COMMAND = "sudo apt update"
```

or:

```python
COMMAND = "ls /"
```

---

## How it works

1. Pings each server before connecting
2. Skips offline servers
3. Connects via SSH using Paramiko
4. Executes the command (with optional sudo)
5. Retries on failure (up to 3 times)
6. Collects output and errors
7. Saves logs and structured results

---

## Usage

Run the script:

```bash
python main.py
```

---

## Output files

### Log file

A timestamped log file is created automatically:

```
ssh_log_YYYYMMDD_HHMMSS.txt
```

Contains detailed execution logs with timestamps.

---

### Result file

```
results_YYYYMMDD_HHMMSS.json
```

Example structure:

```json
{
  "ip": "192.168.1.10",
  "status": "success",
  "output": "...",
  "error": "",
  "attempts": 1,
  "ping_ok": true,
  "sudo": true
}
```

---

## Performance settings

You can tune performance in the script:

```python
MAX_WORKERS = 5      # number of parallel SSH connections
MAX_RETRIES = 3      # retry attempts per server
RETRY_DELAY = 2      # base retry delay (exponential backoff)
PING_TIMEOUT = 3     # ping timeout in seconds
```

---

## Security Notes

* This project uses hardcoded credentials inside the script
* It is intended for controlled environments (labs, internal networks, testing)
* Do NOT expose real production credentials in public repositories

---

## Example Use Cases

* Managing multiple Linux servers in a lab
* Running batch commands across machines
* Network/SSH connectivity testing
* System administration automation

---

## Future Improvements

* External JSON configuration file for servers
* SSH key-based authentication
* Interactive CLI mode
* Progress indicator for tasks
* CSV export support
* Packaging as a pip-installable tool

---

## License

MIT License

---

## Author

Amirali