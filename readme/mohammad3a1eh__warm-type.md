# warm-type
A lightweight terminal typing trainer for developers.

<p align="center">
  <img src="banner.png" alt="Warm Type Screenshot" width="900" style="border-radius: 12px;">
</p>

## Features

- Type directly inside your terminal
- Practice with any text file
- Measures typing speed (WPM)
- Calculates typing accuracy
- Displays a performance summary after each session
- Lightweight and easy to use

## Requirements

- Python 3.9 or newer

## Installation

Clone the repository:

```bash
git clone https://github.com/mohammad3a1eh/warm-type.git
cd warm-type
```

No external dependencies are required (unless specified in `requirements.txt`).

## Usage

Run the program by providing a text file:

```bash
python warm-type.py --file my_example.txt
```

Example:

```bash
python warm-type.py --file article.txt
```

The program will:

1. Load the text from the specified file.
2. Display it in the terminal.
3. Let you type the text line by line.
4. Compare your input with the original text.
5. Show your typing statistics when you finish.

## Sample Output

```text
==================================
       TYPING SESSION RESULTS
==================================

  Total time      : 12 min 34 sec
   Words per minute: 74.63 WPM
   Chars per minute: 412.6 CPM
    Accuracy        : 99.14 %
       Mistakes        : 31
       Total keystrokes: 5189
       Correct chars   : 5158

     Press any key to exit...
```

## File Format

> Warm Type can read and practice with **any plain text file**, regardless of its file extension, including source code, markup, configuration files, Markdown documents, logs, or regular text files.

Example:

```text
Programming is the art of solving problems by writing instructions that computers can understand.
```

## Tips

- Use longer texts for more realistic practice.
- Repeat the same text to improve muscle memory.
- Focus on accuracy before speed.

## License

This project is licensed under the Apache Version 2.0 License.