# mcPHASES Explorer

Local, open-source visual exploration for the mcPHASES multimodal menstrual-cycle dataset.

mcPHASES Explorer turns the official mcPHASES ZIP into an interactive workspace for
reviewing hormones, sleep, temperature, heart signals, activity, glucose context,
respiratory context, and self-reported symptoms across reconstructed cycles.

This repository contains the app only. It does not include the mcPHASES dataset,
participant rows, processed caches, extracted files, or exports.

## What You Can Explore

- **Overview**: device provenance, cohort-level descriptive stories, cycle shape, phases, and coverage.
- **Cycle Story**: curated day-by-day cycle timelines with linked symptoms and signals.
- **Align & Reveal**: cycle alignment around menstrual onset, Observed LH Peak, or normalized cycle position.
- **Pattern Atlas**: deterministic descriptive findings that navigate to the exact evidence view.
- **Signal Explorer**: searchable signal catalog with normalization, focus, pinning, and detail inspection.
- **Data Sources**: the complete 23-source registry with coverage, resolution, derived features, and quality notes.

The app is exploratory and descriptive. It is not diagnostic, causal, or medical advice.

## Screenshots

<p>
  <img src="screenshots/screenshot1.png" alt="mcPHASES Explorer overview screen" width="49%">
  <img src="screenshots/screenshot2.png" alt="mcPHASES Explorer cycle story screen" width="49%">
</p>
<p>
  <img src="screenshots/screenshot3.png" alt="mcPHASES Explorer signal exploration screen" width="49%">
  <img src="screenshots/screenshot4.png" alt="mcPHASES Explorer data source screen" width="49%">
</p>

## Quick Start

You only need to install two tools first:

- **Python 3.11 or newer**: <https://www.python.org/downloads/>
- **Node.js 20 or newer**: <https://nodejs.org/>

Node.js includes npm. After installing them, download or clone this repository.

```bash
git clone git@github.com:AlirezaAzizi145/mcPHASES-Explorer.git
cd mcPHASES-Explorer
```

Then run the launcher for your device:

| Device | Easiest way to run |
|---|---|
| macOS | Double-click `run.command` |
| Windows | Double-click `run.bat` |
| Linux | Open Terminal in the project folder and run `./run.sh` |
| Any system with a terminal | Run `./run.command` on macOS, `./run.sh` on Linux, or `powershell -ExecutionPolicy Bypass -File .\run.ps1` on Windows |

The launcher creates the Python environment, installs backend and frontend
dependencies, builds the app, starts the local server, and opens the browser.

Open `http://127.0.0.1:8000` manually if the browser does not open automatically.

Every fresh browser/application session starts at **Drop your mcPHASES ZIP**.
The app never auto-adopts `mcData`, extracted CSVs, `.mcphases/active_dataset`,
or an old disk cache.

## Get the Dataset

The mcPHASES dataset is distributed by PhysioNet and must be downloaded by each
user under the dataset's own terms.

1. Open the official dataset page: <https://www.physionet.org/content/mcphases/1.0.0/>
2. Sign the Data Use Agreement on PhysioNet.
3. Download the official ZIP file.
4. Start mcPHASES Explorer and drop/select that ZIP.

Import flow:

```text
Open app -> select official ZIP -> validate/hash -> build or reuse matching cache -> Explorer
```

A processed cache is reusable only after the same ZIP is explicitly selected.
No participant metrics or charts appear before that selection.

## Try Without Real Participant Data

Automated tests and demos use synthetic rows only.

```bash
.venv/bin/python scripts/make_demo_zip.py
./run.command
```

Then upload `synthetic-mcphases.zip` in the app. The generated ZIP is ignored by Git.

## Development

For live frontend development:

```bash
python3 -m venv .venv
.venv/bin/pip install -e '.[dev]'
npm --prefix frontend install
./scripts/dev.sh
```

Open `http://127.0.0.1:5173`.

Before shipping changes:

```bash
.venv/bin/ruff check backend tests
.venv/bin/pytest -q
npm --prefix frontend test
npm --prefix frontend run build
```

CI uses synthetic data only and must not require the real mcPHASES dataset.

## Architecture

```text
Explicit ZIP import
  -> safe streamed extraction + SHA-256
  -> content-addressed DuckDB cache
  -> canonical participant x interval x study-day features
  -> queryable high-frequency detail tables
  -> server-side day/range filtering and downsampling
```

FastAPI owns the session-scoped dataset selection and API layer. DuckDB stores
canonical daily features plus filtered detail tables. React, TypeScript, Vite,
and Apache ECharts render the connected visual workspace.

Full high-frequency tables are never sent to the browser. Detail views are
filtered by participant, study interval, day/range, and downsampled server-side.

## Scientific Scope

- Source phase labels are Menstrual, Follicular, Fertility, and Luteal.
- Observed LH Peak means the maximum valid observed LH measurement in an adequately covered reconstructed cycle.
- Missing data stays missing; the app does not silently impute or bridge substantial gaps.
- E3G is treated as an estrogen metabolite and PdG as a progesterone metabolite.
- Computed nightly temperature and raw wrist-temperature deviation remain distinct.
- Sleep and computed temperature are assigned to wake day.
- Cohort comparisons derive effects within participant and interval first, then collapse intervals to one contribution per participant.
- Patterns are descriptive only: no diagnosis, treatment recommendation, abnormality label, causation claim, or AI medical interpretation.

More detail:

- [Data audit](docs/DATA_AUDIT.md)
- [Analytical methods](docs/METHODS.md)

## Data Privacy And Repository Safety

This repository intentionally excludes:

- `mcData/`
- official or generated ZIP archives
- extracted CSVs
- `.mcphases/` caches and DuckDB files
- Parquet/Arrow exports
- `.venv/`, `node_modules/`, build output, and test caches
- local AI/agent workspace files

Do not commit real participant rows or derived participant-level caches.

## Acknowledgements

The mcPHASES dataset was created and released by its original investigators and
PhysioNet contributors, who collected and published a rich multimodal menstrual
cycle dataset spanning hormones, self-reports, wearable signals, glucose, sleep,
activity, and related physiological context. This project does not redistribute
their data; it provides a local visual explorer that helps users inspect the
official dataset after they obtain it from PhysioNet under the appropriate terms.

Dataset page: <https://www.physionet.org/content/mcphases/1.0.0/>

## Creator

Created by [Alireza Azizi](https://www.linkedin.com/in/alireza-azizi-84a7ba204/).

## License

This project is licensed under the [MIT License](LICENSE). The mcPHASES dataset
has its own license and data-use requirements on PhysioNet.