<table>
  <tr>
    <td width="220">
      <img src="assets/logo.png" alt="MobileWan logo" width="200" />
    </td>
    <td>
      <h1>MobileWan: Closing the Quality Gap for Mobile Video Diffusion</h1>
    </td>
  </tr>
</table>
    
<p align="center">
  <!-- Badges -->
  <a href="https://qualcomm-ai-research.github.io/MobileWan">
    <img src="https://img.shields.io/badge/Project-Page-Green" alt="Project Page">
  </a>
  <a href="https://arxiv.org/abs/2607.06173">
    <img src="https://img.shields.io/badge/arXiv-2607.06173-b31b1b.svg" alt="arXiv">
  </a>
  <a href="https://huggingface.co/Qualcomm-AI-Research/mobilewan">
    <img src="https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Model-blue" alt="Hugging Face Model">
  </a>
  <a href="https://github.com/qualcomm-ai-research/mobilewan">
    <img src="https://img.shields.io/badge/GitHub-Code-181717?logo=github&logoColor=white" alt="GitHub Code">
  </a>
  <a href="https://huggingface.co/spaces/Qualcomm-AI-Research/mobilewan-t2v">
    <img src="https://img.shields.io/badge/Live-Demo-yellow" alt="Live Demo" />
    </a>
</p>

## Table of Contents

- [Abstract](#abstract)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Clone the repository](#clone-the-repository)
  - [Python requirements](#python-requirements)
  - [Virtual environment installation](#virtual-environment-installation)
  - [Docker installation](#docker-installation)
- [Installation Verification](#installation-verification)
  - [Download the MobileWan checkpoint](#download-the-mobilewan-checkpoint)
- [Repository Structure](#repository-structure)
- [Running Commands](#running-commands)
  - [Quickstart](#quickstart)
  - [Important fixed generation settings](#important-fixed-generation-settings)
  - [Useful CLI options](#useful-cli-options)
  - [Expected output](#expected-output)
- [Pruning Plan](#pruning-plan)
- [Troubleshooting](#troubleshooting)
- [Citation](#citation)
- [License](#license)

## Abstract

This repository provides an inference-only sampler for MobileWan, a lightweight, mobile-optimized adaptation of Wan2.2-5B. Repository-local model-surgery, pruning, feature-embedding, and attention code live in the `mobilewan/` package. The released code focuses on single-prompt video generation: it applies hybrid-attention surgery and a packaged self-attention head-pruning plan before loading the released MobileWan transformer weights.

## Demo

A live demo is available on Hugging Face Spaces: https://huggingface.co/spaces/Qualcomm-AI-Research/mobilewan-t2v

<img src="assets/showcase_video_banner.webp" alt="MobileWan showcase video banner" width="100%" />

## Getting Started

### Clone the repository

The repository may contain Git LFS-tracked assets. Install Git LFS before cloning if you want those assets checked out automatically:

```bash
git lfs install
git clone https://github.com/Qualcomm-AI-research/mobilewan.git
cd mobilewan
```

If Git LFS is not available, clone without downloading LFS objects:

```bash
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/Qualcomm-AI-research/mobilewan.git
cd mobilewan
```

### Python requirements

The package currently targets:

- `Python>=3.10.12`.
- `accelerate>=1.1.1`.
- `diffusers>=0.36.0`.
- `einops`.
- `imageio[ffmpeg]`.
- `safetensors`.
- `torch>=2.5.1`.
- `transformers>=4.49.0, <=4.51.3`.

These dependencies are declared in `pyproject.toml` and mirrored in `docker/requirements.txt`.

### Virtual environment installation

From the repository root, install the package in editable mode:

```bash
python -m pip install -e .
```

If you are using a managed environment where the runtime dependencies are already installed, you can install only the local package:

```bash
python -m pip install -e . --no-deps
```

### Docker installation

A Dockerfile is provided under `docker/`. The current Docker setup expects common CLI programs such as `git`, `curl`, `wget`, and `ffmpeg` during image build.

To build the image from the repository root:

```bash
docker build -f docker/Dockerfile -t mobilewan:local .
```

To start an interactive container:

```bash
docker run --rm -it mobilewan:local
```

If GPU access is available through the NVIDIA container runtime:

```bash
docker run --rm -it --gpus all mobilewan:local
```

For checkpoint and output directories, create host directories first and bind-mount them into the container:

```bash
mkdir -p checkpoints outputs
docker run --rm -it --gpus all \
  -v "$PWD/checkpoints:/workspace/mobilewan/checkpoints" \
  -v "$PWD/outputs:/workspace/mobilewan/outputs" \
  mobilewan:local
```

If Docker cannot mount your working directory because of host filesystem permissions, use a Docker-accessible path such as `/tmp/mobilewan_checkpoints` and `/tmp/mobilewan_outputs` instead.

## Installation Verification

After virtual-environment installation, verify the package import and CLI wiring:

```bash
python -c "import mobilewan; print('mobilewan import OK')"
python scripts/sample.py --help
```

After starting the Docker container, run the same checks inside the container:

```bash
python3 -c "import mobilewan; print('mobilewan import OK')"
python3 scripts/sample.py --help
```

The help output should list `--checkpoint` as a required argument.

### Download the MobileWan checkpoint

Download the pretrained MobileWan transformer checkpoint from [Hugging Face](https://huggingface.co/Qualcomm-AI-Research/mobilewan):

```bash
huggingface-cli download Qualcomm-AI-Research/mobilewan \
  --local-dir checkpoints/mobilewan
```

Use the downloaded checkpoint directory as the `--checkpoint` value when running the sampler. See [Quickstart](#quickstart) for the full sampling command.

## Repository Structure

```text
mobilewan/
├── README.md
├── pyproject.toml
├── assets/
│   ├── logo.png
│   └── showcase_video_banner.webp
├── docker/
│   ├── Dockerfile
│   └── requirements.txt
├── scripts/
│   └── sample.py
└── mobilewan/
    ├── __init__.py
    ├── attention.py
    ├── config.py
    ├── embedding.py
    ├── pruning_plan.json
    └── rehyat_utils.py
```

## Running Commands

### Quickstart

The released checkpoint corresponds to the 3-step decoupled DMD step-distilled model. VBench evaluation with this repository reproduces the reported VBench total score of `82.44` using the `flow_euler` sampler with shift `5` and GPT-enhanced prompts.

```bash
python scripts/sample.py \
  --output_dir outputs \
  --checkpoint checkpoints/mobilewan \
  --pretrained_model_name_or_path Wan-AI/Wan2.2-TI2V-5B-Diffusers \
  --prompt "A cinematic shot of a golden retriever running through a sunny backyard, weaving between flower beds and patches of tall grass. Warm afternoon light filters through the trees, creating soft shadows and a playful, energetic atmosphere."
```

This command samples one prompt and writes a single MP4 file to `outputs/`. By default, the output filename is derived from the prompt text.

### Important fixed generation settings

This release uses fixed generation settings:

- Height: `480`.
- Width: `832`.
- Frames: `81`.
- CFG scale: `1.0`.

These settings are defined in `mobilewan/config.py` and are not exposed as CLI arguments.

### Useful CLI options

- `--seed`: set a seed for reproducible sampling.
- `--output_name`: choose an explicit MP4 filename.
- `--skip_existing_generation`: skip generation if the output MP4 already exists.
- `--high_quality`: write the output video with a higher x264 quality setting.
- `--scheduler`: select `flow_euler` (default), `unipcm`, or the pipeline default scheduler.
- `--fps`: set the MP4 frame-rate metadata written to disk.

### Expected output

A successful run writes a single `.mp4` file to the requested output directory and prints a message of the form:

```text
Saved video to: outputs/<filename>.mp4
```

Video generation is not guaranteed to be bitwise deterministic across all hardware and software environments. If you want more reproducible behavior, pass `--seed` and keep the software stack fixed.

## Pruning Plan

The self-attention head pruning plan is packaged with the `mobilewan` package as:

```text
mobilewan/pruning_plan.json
```

The pruning plan is validated and applied after attention surgery and before loading the released MobileWan transformer weights.

## Troubleshooting

- **`ModuleNotFoundError: No module named 'mobilewan'`**  
  Install the package first with:

  ```bash
  python -m pip install -e .
  ```

- **Permission errors during `pip install -e .` in a managed environment**  
  If dependencies are already installed, use:

  ```bash
  python -m pip install -e . --no-deps
  ```

- **Transformer checkpoint load failure**  
  Ensure the released MobileWan transformer weights match the hybridized and structurally pruned MobileWan transformer architecture expected by this code.

- **Invalid pruning plan error**  
  Check that block indices and head indices in `mobilewan/pruning_plan.json` match the released model architecture.

- **CUDA / PyTorch mismatch**  
  CUDA-enabled PyTorch installation may require selecting the appropriate wheel or container image for your system.

## Citation

If you use this repository in academic work, please cite the associated paper:

```bibtex
@article{ghafoorian2026mobilewan,
  title        = {MOBILEWAN: Closing the Quality Gap for Mobile Video Diffusion},
  author       = {Mohsen Ghafoorian and Denis Korzhenkov and Adil Karjauv and Ioannis Lelekas and Noor Fathima and Spyridon Stasis and Hanno Ackermann and Boris van Breugel and Markus Nagel and Fatih Porikli and Animesh Karnewar and Amirhossein Habibian},
  journal      = {arXiv preprint arXiv:2607.06173},
  year         = {2026}
}
```

Repository information:

- Homepage: `https://qualcomm-ai-research.github.io/mobilewan`
- Documentation: `https://github.com/Qualcomm-AI-research/mobilewan/blob/main/README.md`
- Repository: `https://github.com/Qualcomm-AI-research/mobilewan.git`

## License

This repository is released under the BSD-3-Clause-Clear license. See the source headers for details.