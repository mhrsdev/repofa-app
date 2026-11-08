# Godot Learn Kit
Pure-GDScript machine learning toolkit for relatime and in-game machine learning tasks with Godot.

## Introduction

This project is a fully standalone machine‑learning framework built entirely in Godot Engine using pure GDScript and GLSL compute shaders. It is designed for researchers, students, and developers who need a lightweight yet powerful neural network toolkit capable of running fully accelerated training and inference directly inside interactive applications — without relying on external dependencies, Python bindings, or cloud runtimes.

The architecture combines GPU‑optimized pipelines for forward and backward passes with CPU‑accessible layers for hybrid workloads, leveraging low‑level SPIR‑V shaders for maximal performance and portability. This allows seamless integration of neural networks into real‑time simulations, games, and creative tools, while maintaining reproducibility and deterministic behavior within the Godot ecosystem.

Out‑of‑the‑box, the framework provides:

- Customizable neural network architectures (dense layers, activations, schedulers).
- Real‑time dataset handling for images, numerical data, and procedural inputs.
- Training reports and live performance metrics.
- Demos including iris classification with high accuracy and sub‑second inference times.
- Whether used for rapid prototyping, educational purposes, or embedding ML into production‑ready interactive software, this framework demonstrates how far neural computation can be pushed in native Godot without external ML libraries.

## Features

- **Native Neural Network Engine** — Built entirely in GDScript and GLSL compute shaders within Godot, providing a standalone ML runtime with zero external dependencies. All core modules (layers, activations, losses, dataset handling, serialization) are optimized for seamless integration into games, simulations, and educational tools.
- **GPU‑Accelerated Inference & Training** — Forward and backward passes are parallelized on GPU using SPIR‑V‑level compute shaders, enabling sub‑second inference times and significantly faster training cycles. Batching and memory access patterns are tuned to minimize data transfer overhead between CPU and GPU.
- **Flexible Activation Functions** — Includes Sigmoid, Tanh, ReLU, Leaky ReLU, and Softmax cores, all implemented with shader‑level optimizations for speed and stability. Custom activation functions can be integrated easily through the modular shader API, enabling experimentation with novel architectures.
- **Comprehensive Regularization** — Robust tools to prevent overfitting and improve generalization, including **L2 weight decay**, **stochastic dropout** at the shader level, and **adjustable learning‑rate schedules** (step decay, exponential decay, warm‑up phases, cosine schedular) for fine‑grained convergence control.
- **Versatile Loss Functions** — Optimized implementations of Mean Squared Error (MSE), Binary Cross‑Entropy (BCE), and Categorical Cross‑Entropy (CCE), with batched GPU evaluation for efficient handling of large datasets.
- **Gradient Clipping for Stability** — Integrated clipping mechanisms ensure gradients remain within safe bounds during backpropagation, reducing the risk of divergence in deep or high‑learning‑rate models.
~~- **Built‑In Demo Suite** — Includes ready‑to‑run Godot scenes demonstrating real‑world tasks: digit classification on 9k images achieving 97% accuracy, doodle recognition across nine categories, and live predictive displays with confidence scores calculated in real‑time.~~

## Architecture Overview

The framework is structured into modular layers and execution pipelines, enabling a clear separation between **data handling**, **model definition**, and **compute execution**. This design ensures each component can be extended or replaced without affecting the rest of the system.

A high-level API over all modules ensure safe and clean touch surface with extra utilities and documentation.

### Data Flow

1. **Load & Preprocess Data** → Dataset manager prepares batches.
2. **Forward Pass** → Input flows through CPU fallback or GPU‑optimized compute shaders.
3. **Loss Calculation** → Outputs are compared against target labels using GPU‑optimized loss functions.
4. **Backward Pass** → Gradients are computed on GPU, optionally clipped for stability.
5. **Weight Updates** → Regularization applied, learning‑rate schedules adjusted.

## Installation, Prerequisites

Please see [quick start guide](/docs/quick_start.md) for installation and prerequisites information.

## Usage

The framework is built for fast prototyping and easy integration.
You can create networks, set up GPU runners, train models, visualize training, and export/import them — all from GDScript.

### Example: Creating a network

```gdscript
var network := LearnKit.nn.network(
    [4, 32, 16, 3], # Layers
    null, # Use default forward pass runner
    LearnKit.ActivationType.RELU, # Hidden activations
    LearnKit.ActivationType.SOFTMAX, # Output activation
    LearnKit.WeightInitialization.KAIMING # Weights init
)
```

### Example: Training a Network

```gdscript
var trainer := LearnKit.nn.trainer(
    network, # Network
    null, # Use default backward pass runner
    LearnKit.LossFunction.CCE, # Loss: Categorical Cross Entropy
    1e-2, # LR
    0, # l2 regularization lambda
    300, # Num epochs
    16, # Batch size
    LearnKit.nn.schedular.cosine(1e-2, 300, 3e-4), # Schedular (start_lr, n_epochs, min_lr)
    LearnKit.nn.optimizer(true, 1.0) # Grad clip optimizer
)
var split := LearnKit.data.train_test_split(inputs, targets, 0.2)

var time := trainer.train(split.train_inputs, split.train_targets)
var train_acc := LearnKit.evaluate.evaluate_model_soft_max(network, split.train_inputs, split.train_targets) * 100.0
var test_acc := LearnKit.evaluate.evaluate_model_soft_max(network, split.test_inputs, split.test_targets) * 100.0

print("Elapsed %d ms" % time)
print("Train acc: %f" % train_acc)
print("Test acc: %f" % test_acc)
```

### Example: Exporting a Model

```gdscript
LearnKit.serialize.export(network, "user://model.json")
```

### Example: Importing a Saved Model

```gdscript
network = LearnKit.serialize.import("user://model.json")

# Use network for inference...
```

### Why This Matters

- **Modular by Design** — Use only the components you need (datasets, GPU runners, training logic).
- **Embedding-Friendly** — Networks, trainers, and serializers work in any Godot script.
- **Python-like API** — Access all of what you need from `LearnKit` class and its inner classes. Any task needs just one function call.
- **Production-Ready** — Export trained models and load them in runtime environments without retraining.
- **Real-Time Capable** — Forward passes are GPU‑accelerated and optimized for interactive applications.

## Demo Showcase

Example demos are included in the `/examples` folder.

### Motivation

Machine Learning frameworks are abundant — but almost all require heavy external dependencies,
Python bindings, or separate runtime environments. For real‑time applications in **game engines** like Godot,
this creates friction: extra toolchains, limited in‑engine GPU acceleration, and fewer opportunities for live interaction.

This project began as a personal challenge:
to experiment, understand how neural networks work at their core, and build something powerful from scratch.
It reflects a passion for creating tools, testing and fixing problems, and pushing technical limits —
showing what one person can achieve through learning and dedication.

It also stands as proof of the **untapped potential of game engines** for live simulations, training demos, and interactive AI experiences,
where neural networks can run seamlessly, natively, and in real time — no external dependencies needed.

### Vision

I aim to make Machine Learning in Godot as natural and accessible as working with any other built‑in system:

- **Unified Workflow** — Build, train, and deploy networks entirely inside Godot scenes.
- **Real‑Time AI** — GPU compute shaders delivering instant inference for gameplay, VR, education, and simulation.
- **Modular Extensibility** — Easy addition of custom layers, activations, loss metrics, and schedulers.
- **Educational Accessibility** — Clear demos, visualizations, and approachable code for rapid learning.
- **Open Innovation** — Lightweight, open‑source, and community‑driven.

Future goals include:

- Support for advanced architectures (CNNs, RNNs, attention/transformers).
- Add visualization tools for debugging and understanding.
- Dataset generation utilities for creative and synthetic data.
- Showcasing the full power of interactive, GPU‑driven AI in games and simulations.

## Tech Stack

This framework is built entirely inside the **Godot Engine** ecosystem, using only native scripting and shader technologies.
There are **no external dependencies** — making it portable, lightweight, and easy to embed into any Godot project.

### Core Technologies

- **Godot Engine 4.x** — Game engine platform & runtime environment.
- **GDScript** — Primary language for network logic, data handling, and orchestration.
- **GLSL Compute Shaders** — GPU acceleration for forward/backward neural network passes.
- **SPIR‑V** — Low‑level shader intermediate representation for optimized GPU workloads.
- **JSON** — Used for model serialization.

### ML Components

- **Custom Neural Network Engine** — Implemented directly in GDScript & GLSL.
- **GPU‑Accelerated Training Pipeline** — Runs matrix ops, activation functions, and loss calculations in parallel.
- **Regularization Support** — Dropout, L2 weight decay, gradient clipping.
- **Multiple Activation & Loss Functions** — Sigmoid, Tanh, ReLU, Softmax, MSE, BCE, CCE.
- **Dataset Utilities** — Loading, preprocessing, train/test splitting, MinMax normalization.

### Development & Testing

- **Godot Scenes for Benchmarks** — Unit tests and performance measurements.
~~- **Examples & Demos** — Digits and doodle recognition with live classification.~~

## License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute this software for personal and commercial purposes,
provided that the original copyright notice and permission notice are included in all copies or substantial portions of the software.

See the [LICENSE](LICENSE) file for the full text.

This project is a heavily modified fork of [godot-neural-network](https://github.com/SinaMajdieh/godot-neural-network) by [Sina Majdieh](https://github.com/SinaMajdieh). Original license (MIT) is preserved. All new changes, API redesign, and additional features are released under the same MIT license.