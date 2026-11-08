# ML Course, From Scratch

**A 14-day, code-first walkthrough of [_A Course in Machine Learning_](http://ciml.info) by Hal Daumé III.**
The book is theory-only; this repository turns every formula and algorithm in it into
readable Python that actually runs, then validates the result against scikit-learn.

[![Python](https://img.shields.io/badge/python-3.9%2B-blue.svg)](https://www.python.org/)
[![scikit-learn](https://img.shields.io/badge/validated%20with-scikit--learn-orange.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/license-educational-lightgrey.svg)](LICENSE)
[![Source](https://img.shields.io/badge/source-A%20Course%20in%20ML-informational.svg)](http://ciml.info)

<p align="center">
  <img src="assets/roadmap.png" alt="14-day roadmap" width="520">
</p>

---

## Table of Contents

- [What this is](#what-this-is)
- [Design principles](#design-principles)
- [Getting started](#getting-started)
- [Repository structure](#repository-structure)
- [Curriculum](#curriculum)
- [Datasets](#datasets)
- [Notebooks](#notebooks)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## What this is

Each day covers one topic from the book and follows the same recipe:

| Element | Description |
|---|---|
| **From-scratch implementation** | Plain NumPy. No `model.fit()` shortcuts for the algorithm under study. |
| **Real dataset** | A dataset from `sklearn.datasets` (or a downloaded public dataset) — never synthetic toy data. |
| **Correctness check** | The from-scratch model is compared against the equivalent scikit-learn implementation. |
| **Companion guide** | `en.md` (or one `<topic>_en.md` per topic on two-chapter days): objectives, theory, build steps, exercises. |
| **Notebook** | Every day also ships a self-contained `.ipynb` that runs end to end. |

If you want to *understand* an algorithm, read the guide; if you want to *see it run*,
execute the script or open the notebook.

## Design principles

1. **No magic.** Every core learner is implemented with explicit loops, gradients, and
   update rules so the math is visible in the code.
2. **Ground truth matters.** Each implementation is cross-checked against a trusted
   reference (scikit-learn) on real data, with agreement rates and metric comparisons printed.
3. **Theory-first, but honest.** Where the book is only an outline, the guide says so and
   the script builds the canonical algorithm it points to.
4. **Reproducible.** Fixed random seeds everywhere, so runs are deterministic.
5. **One concept per day.** Chapters build on each other loosely, but each stands on its own.

## Getting started

### Prerequisites

- Python 3.9+
- The packages in [`requirements.txt`](requirements.txt) (`numpy`, `scipy`, `scikit-learn`)

### Install

```bash
git clone https://github.com/panteamkhh/ml-course-from-scratch.git
cd ml-course-from-scratch

python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### Run a chapter

Every chapter is a standalone script that prints its experiments and results:

```bash
python ch01-decision-trees/decision_tree.py
python ch11-unsupervised-learning/unsupervised_learning.py
```

Or open any notebook in `notebooks/` and run it top to bottom.

> **Note:** `ch06-probabilistic-modeling` downloads the public SMS Spam Collection dataset
> on first run and caches it as `sms.tsv` (already covered by `.gitignore`).

## Repository structure

```
ml-course-from-scratch/
├── assets/
│   └── roadmap.png                     # 14-day roadmap
│
├── notebooks/                          # self-contained notebooks (Days 1-14)
│   ├── ch01-decision-trees.ipynb
│   ├── ...
│   ├── ch10-ensemble-efficient-learning.ipynb
│   ├── ch11-unsupervised-learning.ipynb
│   ├── ch12-expectation-maximization.ipynb
│   ├── ch12-semi-supervised-learning.ipynb
│   ├── ch13-graphical-models.ipynb
│   ├── ch13-online-learning.ipynb
│   ├── ch14-structured-learning.ipynb
│   └── ch14-bayesian-learning.ipynb
│
├── ch01-decision-trees/
│   ├── decision_tree.py                # from-scratch implementation + experiments
│   └── en.md                           # companion guide
├── ch02-geometry-neighbors/
├── ch03-perceptron/
├── ch04-practical-issues-beyond-binary/
│   ├── practical_issues.py
│   ├── practical-issues_en.md
│   ├── beyond_binary_classification.py
│   └── beyond-binary-classification_en.md
├── ch05-linear-models/
├── ch06-probabilistic-modeling/
├── ch07-neural-networks/
├── ch08-kernel-methods/
├── ch09-learning-theory/
├── ch10-ensemble-efficient-learning/
├── ch11-unsupervised-learning/
├── ch12-em-semi-supervised/
├── ch13-graphical-models-online-learning/
├── ch14-structured-bayesian-learning/
│
├── requirements.txt
├── LICENSE
└── README.md
```

## Curriculum

| Day | Directory | Book chapters | Guide(s) | Notebook |
|:---:|---|---|---|---|
| 01 | `ch01-decision-trees` | 1. Decision Trees | `en.md` | yes |
| 02 | `ch02-geometry-neighbors` | 2. Geometry & Nearest Neighbors | `en.md` | yes |
| 03 | `ch03-perceptron` | 3. The Perceptron | `en.md` | yes |
| 04 | `ch04-practical-issues-beyond-binary` | 4. Practical Issues · 5. Beyond Binary Classification | `practical-issues_en.md`, `beyond-binary-classification_en.md` | yes |
| 05 | `ch05-linear-models` | 6. Linear Models | `en.md` | yes |
| 06 | `ch06-probabilistic-modeling` | 7. Probabilistic Modeling | `en.md` | yes |
| 07 | `ch07-neural-networks` | 8. Neural Networks | `en.md` | yes |
| 08 | `ch08-kernel-methods` | 9. Kernel Methods | `en.md` | yes |
| 09 | `ch09-learning-theory` | 10. Learning Theory | `en.md` | yes |
| 10 | `ch10-ensemble-efficient-learning` | 11. Ensemble Methods · 12. Efficient Learning | `en.md` | yes |
| 11 | `ch11-unsupervised-learning` | 13. Unsupervised Learning | `en.md` | yes |
| 12 | `ch12-em-semi-supervised` | 14. Expectation Maximization · 15. Semi-Supervised Learning | `expectation-maximization_en.md`, `semi-supervised-learning_en.md` | yes |
| 13 | `ch13-graphical-models-online-learning` | 16. Graphical Models · 17. Online Learning | `graphical-models_en.md`, `online-learning_en.md` | yes |
| 14 | `ch14-structured-bayesian-learning` | 18. Structured Learning · 19. Bayesian Learning | `structured-learning_en.md`, `bayesian-learning_en.md` | yes |

> Folder numbers are *days*; the "Book chapters" column maps each day to the
> corresponding chapters in the source book.

## Datasets

All experiments use real data:

- Built-in scikit-learn datasets: Breast Cancer Wisconsin, Wine, Digits, Iris, Diabetes.
- The SMS Spam Collection (5,574 real text messages), downloaded automatically by Day 06.

## Notebooks

Every day ships an interactive notebook that mirrors the scripts and runs end to end,
making it the fastest way to explore a chapter. Two-chapter days have one notebook per
topic, for example:

| Day | Notebooks |
|---|---|
| 04 | `ch04-practical-issues.ipynb`, `ch04-beyond-binary-classification.ipynb` |
| 12 | `ch12-expectation-maximization.ipynb`, `ch12-semi-supervised-learning.ipynb` |
| 13 | `ch13-graphical-models.ipynb`, `ch13-online-learning.ipynb` |
| 14 | `ch14-structured-learning.ipynb`, `ch14-bayesian-learning.ipynb` |

## Contributing

Contributions that improve correctness, clarity, or portability are welcome:

1. Open an issue describing the bug or improvement.
2. Fork the repository and create a feature branch.
3. Keep the existing style: NumPy-first, deterministic seeds, and a scikit-learn sanity check.
4. Verify the affected script runs end to end before opening a pull request.

## License

Released for **educational use only** — see [`LICENSE`](LICENSE). The source book,
its text, figures, and algorithms remain the property of Hal Daumé III.

## Acknowledgements

- **Hal Daumé III** for [_A Course in Machine Learning_](http://ciml.info), the foundation of this project.
- The **scikit-learn** maintainers for the reference implementations used in the sanity checks.
- The `justmarkham/pycon-2016-tutorial` repository for hosting the SMS Spam dataset used in Day 06.