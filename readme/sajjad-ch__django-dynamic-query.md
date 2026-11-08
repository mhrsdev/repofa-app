# Django Dynamic Query

**Secure AI-powered Dynamic Django ORM Query Builder**

`django-dynamic-query` is a Django package that allows developers to safely generate Django ORM queries from natural language using AI models such as **OpenAI** or **Ollama**.

Instead of writing complex filtering logic manually, users can ask questions in plain English and the package converts them into validated Django ORM queries while protecting against unsafe operations.

---
![Text Input AI](https://raw.githubusercontent.com/sajjad-ch/django-dynamic-query/main/images/text_input_ai.png)
**Text Input AI**
---

---
![Visual Builder](https://raw.githubusercontent.com/sajjad-ch/django-dynamic-query/main/images/visual_builder.png)
**Visual Builder**
---

## Features

* AI-powered natural language querying
* Secure ORM query generation
* Schema indexing using Django management command
* OpenAI support
* Ollama support
* Built-in validation layer
* Protection against dangerous ORM operations
* Easy Django integration
* Simple web dashboard
* Extensible architecture

---

# Installation

Install using pip:

```bash
pip install django-dynamic-query
```

or

```bash
pip install git+https://github.com/sajjad-ch/django-dynamic-query.git
```

---

# Requirements

* Python 3.10+
* Django 4.2+

---

# Add to INSTALLED_APPS

Open your project's **settings.py**

```python
INSTALLED_APPS = [
    ...
    "django_dynamic_query",
]
```

---
Configuration
Add the following configuration to your settings.py to enable and customize the AI-powered features:

```python
DJANGO_DYNAMIC_QUERY = {
    # Set to True to enable AI processing (Natural Language to ORM)
    "ENABLE_NLP": True,
    
    # Choose 'local' for Ollama/Local LLMs or 'api' for OpenAI/Cloud services
    "MODEL_TYPE": "local", 
    
    # Required for 'local': The name of the model (e.g., 'gemma2', 'llama3')
    "MODEL_NAME": "llama3",
    
    # Optional for 'local': Absolute path to a model file if not using a registry
    "MODEL_PATH": None,
    
    # Required for 'api': Your API Key
    "AI_API_KEY": "sk-...",
}
```
---

# Index Your Models

Before using AI queries, index your Django models.

Run:

```bash
python manage.py index_schema
```

This command scans your Django models and builds the schema used by the AI engine.

Whenever your models change, run the command again.

---

# URLs

Add the package URLs to your project.

```python
from django.urls import include, path

urlpatterns = [
    ...
    path(
        "dynamic-query/",
        include("django_dynamic_query.urls")
    ),
]
```

---

# Dashboard

After adding the URLs, open:

```
http://localhost:8000/dynamic-query/dashboard
```

The dashboard allows testing natural language queries directly from the browser.

---

# Basic Usage

Example:

```python
from django_dynamic_query import ...

# Your code here
```

Natural language example:

```
Show all active users created this month.
```

The package converts the request into a validated Django ORM query.

---

# Security

The package is designed with security in mind.

Validation includes:

* Preventing dangerous ORM operations
* Validating model names
* Validating field names
* Safe filter generation
* Query sanitization

---

# Supported AI Providers

Currently supported:

* OpenAI
* Ollama

The architecture allows adding additional providers in the future.

---

# Project Structure

```
django_dynamic_query/

├── core/
│   ├── builder.py
│   ├── validators.py
│   └── exceptions.py
│
├── nlp/
│   ├── ai_handler.py
│   └── schema_rag.py
│
├── management/
│   └── commands/
│       └── index_schema.py
│
├── templates/
│
├── views.py
├── urls.py
└── utils.py
```

---

# Running Tests

Run all tests:

```bash
python -m pytest
```

or

```bash
python runtests.py
```

---

# Development Installation

Clone the repository:

```bash
git clone https://github.com/sajjad-ch/django-dynamic-query.git
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run tests:

```bash
pytest
```

---


# Contributing

Contributions are welcome.

If you would like to improve the package:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# License

This project is licensed under the MIT License.

See the LICENSE file for details.

---

# Roadmap

Future improvements include:

* Additional AI providers
* Better prompt optimization
* Query explanation
* Query caching
* Admin integration
* Multi-database support

---

# Author

Developed with ❤️ for the Django community.