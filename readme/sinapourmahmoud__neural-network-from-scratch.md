# 🧠 Neural Network from Scratch (NumPy)

A fully connected neural network implemented **from scratch using NumPy**, without relying on deep learning frameworks such as TensorFlow or PyTorch.

This project is built to demonstrate the **fundamental concepts of neural networks**, including forward propagation, backpropagation, and optimization.

---

## 🚀 Features

* Pure **NumPy implementation**
* Supports activation functions:

  * `sigmoid`
  * `relu`
* Implements:

  * Forward propagation
  * Backpropagation
  * Cross-entropy loss
* Optimizers:

  * Stochastic Gradient Descent (SGD)
  * Momentum
* Batch training
* Command-line configurable

---

## 🧩 Model Architecture

* **Input Layer:** 784 neurons (28×28 images)
* **Hidden Layer:** 64 neurons
* **Output Layer:** 10 neurons (classification)

---

## 📂 Project Structure

```bash
.
├── main.py          # Neural Network implementation
├── train.py         # Training script
├── train.csv        # Dataset
├── requirements.txt # Dependencies
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2️⃣ Create Virtual Environment

```bash
python -m venv env
```

#### Activate it:

* **Windows**

```bash
env\Scripts\activate
```

* **macOS/Linux**

```bash
source env/bin/activate
```

---

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

Or minimal setup:

```bash
pip install numpy pandas
```

---

## ▶️ How to Run

### 🔹 Basic Training

```bash
python train.py
```

---

### 🔹 Advanced Usage (Custom Parameters)

```bash
python train.py --activation relu --optimizer momentum --l_rate 0.001 --batch_size 128 --beta 0.9
```

---

## ⚙️ Command-Line Arguments

| Argument       | Description                          | Default  |
| -------------- | ------------------------------------ | -------- |
| `--activation` | Activation function (`sigmoid/relu`) | sigmoid  |
| `--optimizer`  | Optimizer (`sgd/momentum`)           | momentum |
| `--l_rate`     | Learning rate                        | 0.001    |
| `--batch_size` | Batch size                           | 128      |
| `--beta`       | Momentum coefficient                 | 0.9      |

---

## 🧪 Training Pipeline (`train.py`)

The training script performs:

* Loading dataset from `train.csv`
* Normalizing pixel values (`/255`)
* One-hot encoding labels
* Splitting into train/test sets
* Shuffling training data
* Training the neural network

---

## 🧠 Neural Network Implementation (`main.py`)

Core components:

* Weight initialization (scaled random)
* Activation functions:

  * Sigmoid
  * ReLU
  * Softmax (output layer)
* Forward propagation
* Backpropagation (gradient computation)
* Parameter updates (SGD / Momentum)
* Accuracy and loss calculation

---

## 📊 Output Example

```text
Epoch 1: 0.52s, train acc=0.85, train loss=0.45, test acc=0.83, test loss=0.50
```

Tracks:

* Training accuracy
* Test accuracy
* Loss values

---

## 📦 Dependencies

Install all dependencies:

```bash
pip install -r requirements.txt
```

---

## ⚠️ Notes

* This project is for **educational purposes**
* Everything is implemented manually to understand deep learning internals
* No external ML frameworks are used

---

## ✨ Author

**Sina Pourmahmoud**

---

## ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Fork and improve it
* Share with others learning machine learning 🚀



### Made with 🤍🤍