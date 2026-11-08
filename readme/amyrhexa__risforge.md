# RisForge

**RisForge** is an open-source cross-platform desktop application and Python library for managing bibliographic references and systematic-review citation workflows.

It is designed for researchers who need to combine exports from multiple databases, deduplicate records without losing metadata, convert citation formats, and enrich incomplete references with scholarly metadata and open-access links.

## Quick Start

### Windows

A standalone Windows installer is available for users who do not want to install Python.

Download the latest release from the [GitHub Releases](https://github.com/amyrhexa/risforge/releases) page and run the `Risforge-*-Windows-x64.exe` installer.

No Python installation is required.

### Python

RisForge supports **Python 3.10+** and is available on PyPI:

```bash
pip install risforge
```

Launch the desktop application with:

```bash
risforge
```

## Features

### Citation Conversion

Convert several common citation-export formats into structured RIS records:

- PubMed exports: `.nbib`, `.medline`, `.pubmed`
- Plain-text bibliographies: `.txt`
- APA, Vancouver, and numbered reference styles

### Multi-Database Merging

Combine citation exports from sources such as:

- Scopus
- Web of Science
- PubMed
- Reference managers
- Other RIS-compatible sources

Records are consolidated into a single workflow without modifying the original input files.

### Non-Destructive Deduplication

RisForge identifies duplicate records using bibliographic identifiers and normalized metadata, including:

- Exact DOI matches
- Normalized title + first-author matching

When duplicates are found, RisForge retains the most complete record as the base and merges missing metadata from the other records.

List-valued fields such as authors and keywords are combined rather than discarded.

### Metadata Enrichment

RisForge can retrieve missing bibliographic metadata from:

- [Crossref](https://www.crossref.org/)
- [OpenAlex](https://openalex.org/)
- [Semantic Scholar](https://www.semanticscholar.org/)
- [Unpaywall](https://unpaywall.org/)

Depending on the available source data, enrichment can provide missing:

- Abstracts
- Journal information
- Keywords
- DOIs and identifiers
- Open-access PDF links

Existing metadata is preserved rather than blindly overwritten.

### Safe File Handling

RisForge treats source files as read-only during processing.

Generated files are written to the selected output directory, with output handling designed to minimise the risk of leaving partially written result files.

## Desktop Application

The desktop interface brings the complete citation workflow into a single application.

### 1. Add input files

Add sources using:

- **Add Files...**
- **Add Folder...**
- Drag and drop

Folder imports can be scanned recursively.

### 2. Select operations

Choose the operations required for the workflow:

**Merge files**

Combines records from all selected inputs into a unified dataset.

**Clean & deduplicate**

Identifies duplicate references and merges their metadata while preserving useful information.

**Enrich metadata**

Queries supported scholarly services to fill selected missing metadata fields.

An email address is required for services that use it for polite API access.

### 3. Select the output directory

Choose where generated files should be written.

The default output directory is:

```text
~/risforge-output
```

### 4. Run the workflow

Click **Run Workflow** to start processing.

During execution, the application provides:

- Progress information
- A collapsible activity log
- A **Stop** control for interrupting the workflow

### 5. Inspect the results

After completion, the results area provides access to the generated outputs, including:

- The primary RIS output
- The output directory
- JSON execution reports

## Python API

RisForge can also be used as a Python library for reproducible scripts and data-processing pipelines.

### Complete workflow

```python
from pathlib import Path

from risforge import WorkflowConfig, run_workflow

config = WorkflowConfig(
    input_paths=[
        Path("scopus.ris"),
        Path("pubmed.nbib"),
    ],
    output_dir=Path("./output"),
    merge=True,
    clean=True,
    enrich=True,
    email="researcher@example.edu",
)

result = run_workflow(config)

print(f"Cleaned records: {result.records_cleaned}")
print(f"Enriched records: {result.records_enriched}")
print(f"Primary output: {result.primary_output_file}")
```

### Individual operations

Deduplicate an existing RIS file:

```python
from risforge import clean_ris_file

records, errors = clean_ris_file(
    "raw.ris",
    "cleaned.ris",
)
```

Convert citations to RIS:

```python
from risforge import convert_to_ris

convert_to_ris(
    ["citations.txt", "export.nbib"],
    "converted.ris",
)
```

## Development

Clone the repository:

```bash
git clone https://github.com/amyrhexa/risforge.git
cd risforge
```

Install the package in editable mode with development dependencies:

```bash
pip install -e ".[dev]"
```

Run the test suite:

```bash
pytest -v
```

Run static checks:

```bash
ruff check .
black --check .
```

## License

RisForge is open-source software released under the [MIT License](LICENSE).