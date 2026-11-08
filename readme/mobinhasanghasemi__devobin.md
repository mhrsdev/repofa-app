<div dir="ltr">

# DevObin

> **AI Engineering Context Compiler & Prompt Architect**

[![PyPI version](https://badge.fury.io/py/devobin.svg)](https://pypi.org/project/devobin/)
[![Python](https://img.shields.io/pypi/pyversions/devobin)](https://pypi.org/project/devobin/)
[![License](https://img.shields.io/pypi/l/devobin)](https://github.com/mobinhasanghasemi/devobin/blob/main/LICENSE)
[![Downloads](https://img.shields.io/pypi/dm/devobin)](https://pypi.org/project/devobin/)

DevObin is a CLI tool that analyzes your software project and generates production-ready engineering prompts for AI coding agents (Claude, Codex, Cursor, GPT, etc.).

**DevObin does NOT write code.** It builds the perfect context so the AI writes the best code.

---

## What It Does

```
You: "Add user authentication to my Django app"

DevObin scans your project → detects Django, REST API, PostgreSQL
    ↓
DevObin generates: authentication_prompt.md
    ↓
Give the file to Claude/Codex → they implement it perfectly
```

**Key difference:** DevObin reads YOUR actual codebase and produces prompts based on YOUR real architecture — not generic templates.

---

## Installation

### From PyPI (Recommended)

```bash
pip install devobin
```

### From Source

```bash
git clone https://github.com/mobinhasanghasemi/devobin.git
cd devobin
pip install -e .
```

### Requirements

- Python 3.12+
- An AI provider API key (OpenAI, Anthropic, Google, or Ollama)

---

## Quick Start

```bash
# 1. Launch DevObin
devobin

# 2. Connect to your AI provider
/connect

# 3. Describe what you need
Build a React dashboard with dark mode

# 4. Get your prompt
# → dashboard_prompt.md is created
# → Give it to Claude, Codex, or Cursor
```

---

## Features

### Smart Project Analysis
Scans your workspace, detects technologies (80+ frameworks, languages, databases), and understands your architecture.

### Knowledge Graph
Builds a structured model of your project with relationships between technologies, patterns, and domains.

### Dynamic Context Selection
Unlike static prompt generators, DevObin selects only relevant sections based on your intent:
- Bug fix → Security, Architecture, Tech Stack
- New feature → Full context with Design System, Components
- Performance → Optimization tips, Caching patterns

### 20 Prompt Sections
Each prompt includes structured sections:

| Section | Description |
|---------|-------------|
| Read Project First | Instructs AI to read code before writing |
| Role | Defines AI's expertise level |
| Tech Stack | Detected technologies |
| Constraints | DO / DO NOT rules |
| Deliverables | Expected output |
| Code Quality | Standards and conventions |
| Accessibility | WCAG AA compliance |
| SEO | Meta tags, Open Graph |
| Performance | Optimization requirements |
| Security | Security rules |
| And 10 more... | Architecture, Testing, Design System, etc. |

### Prompt Optimization
Optional optimization with three modes:

| Mode | Description | Latency |
|------|-------------|---------|
| `none` | No optimization | 0 |
| `quick` | Contradiction check + 1 mutation | ~2s |
| `full` | Contradiction + mutation + critique | ~10s |

### Plugin System
Extend DevObin without modifying core code:

```python
from devobin.plugins import Plugin
from devobin.tools import ToolDefinition, ToolResult

class MyPlugin(Plugin):
    name = "django-expert"
    version = "1.0.0"

    def register_tools(self):
        return [ToolDefinition(
            name="django-check",
            description="Check Django best practices",
            schema={},
            handler=lambda args: ToolResult(tool="django-check", content="OK"),
            permission="read",
        )]
```

---

## Supported Providers

| Provider | Models |
|----------|--------|
| OpenAI | GPT-4o, GPT-4, o1, o1-mini |
| Anthropic | Claude Sonnet, Claude Haiku |
| Google | Gemini Pro, Gemini Flash |
| Ollama | Local models (Llama, Mistral, etc.) |

---

## Commands

| Command | Description |
|---------|-------------|
| `/connect` | Connect to AI provider |
| `/model` | Select model |
| `/project` | Set project directory |
| `/memory` | Manage persistent memory |
| `/export` | Export generated prompt |
| `/run` | Execute shell command |
| `/read` | Read a file |
| `/ls` | List directory |

---

## Configuration

### Via Commands

```bash
devobin
/connect        # Set up provider
/model gpt-4o   # Choose model
```

### Via Config File

Edit `~/.config/devobin/settings.json`:

```json
{
  "provider": "openai",
  "model": "gpt-4o",
  "optimization_mode": "quick",
  "max_prompt_tokens": 8000,
  "memory_enabled": true
}
```

### Environment Variables

```bash
export OPENAI_API_KEY="sk-..."
# or
export ANTHROPIC_API_KEY="sk-ant-..."
```

---

## Architecture

```
User Input
    ↓
Scanner → Analyzer → Researcher
    ↓
Knowledge Graph
    ↓
Context Selector (intent + budget)
    ↓
Prompt Assembler (20 sections)
    ↓
Prompt Optimizer (optional)
    ↓
Final Prompt (.md)
```

---

## Development

### Setup

```bash
git clone https://github.com/mobinhasanghasemi/devobin.git
cd devobin
pip install -e ".[dev]"
```

### Run Tests

```bash
pytest tests/ -v
```

### Lint

```bash
ruff check devobin/
```

---

## Project Structure

```
devobin/
├── runtime.py          # Main orchestrator
├── event_bus.py        # Event system
├── provider_router.py  # Smart provider routing
├── scanner/            # Workspace scanning
├── analyzer/           # Input analysis
├── researcher/         # Tech research
├── knowledge/          # Knowledge graph
├── context/            # Context selection
├── prompt/             # Assembly & optimization
├── tools/              # Tool system
├── plugins/            # Plugin system
├── config/             # Configuration
├── providers/          # LLM providers
├── cli/                # CLI interface
├── ui/                 # Textual UI
└── storage/            # Database
```

---

## Links

- **Website:** [devobin.ir](https://devobin.ir)
- **PyPI:** [pypi.org/project/devobin](https://pypi.org/project/devobin/)
- **GitHub:** [github.com/mobinhasanghasemi/devobin](https://github.com/mobinhasanghasemi/devobin)
- **Instagram:** [devobin.ir](https://instagram.com/devobin.ir)
- **Issues:** [GitHub Issues](https://github.com/mobinhasanghasemi/devobin/issues)

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Author

**Mobin Hasanghasemi**
- GitHub: [@mobinhasanghasemi](https://github.com/mobinhasanghasemi)
- Email: mobin.hasanghasemi.m@gmail.com

</div>