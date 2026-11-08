# 🖼️ Image Converter

A modern and lightweight desktop image converter built with **Python, PyQt6, and Pillow**.

Image Converter Pro provides an easy-to-use dark-themed graphical interface for converting, resizing, optimizing, and enhancing multiple images at once.

---

## ✨ Features

* 🖼️ Convert images between multiple formats
* 📂 Support for multiple image files
* 🖱️ Drag & Drop image files
* 📁 Browse and select images manually
* 🎯 Output format selection
* 📐 Preset and custom image sizes
* 🔒 Preserve image aspect ratio
* ✨ Adjustable image quality
* 🔷 Multi-size ICO generation
* 💾 Select custom output directory
* ⚠️ Optional overwrite of existing files
* 🔍 Sharpness enhancement
* ⚡ Sharpen filter
* 📊 Real-time conversion progress
* 🧵 Background conversion using `QThread`
* 🖥️ Modern dark-themed interface
* 📈 DPI configuration
* ❌ Per-file error handling without stopping the entire conversion process

---

## 📦 Supported Formats

The application supports the following image formats:

* PNG
* JPEG / JPG
* BMP
* GIF
* ICO
* WEBP
* TIFF

The drag-and-drop and file selection dialogs support these common image extensions as well.

---

## 🛠️ Technologies

This project is built with:

* **Python**
* **PyQt6** — Graphical User Interface
* **Pillow** — Image processing

Main libraries used by the project:

```text
PyQt6
Pillow
```

The application uses PyQt6 widgets, threads, signals, dialogs, progress bars, and other GUI components.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/AmirHBDev/Image-Converter.git
cd Image-Converter
```

Replace `AmirHBDev/Image-Converter` with your actual GitHub repository.

### 2. Install dependencies

```bash
pip install PyQt6 Pillow
```

Or, if a `requirements.txt` file is available:

```bash
pip install -r requirements.txt
```

### 3. Run the application

```bash
python convert_img_format.py
```

The application creates the Qt application, initializes the main window, and starts the event loop from the script entry point.

---

## 🖥️ Usage

### Add Images

You can add images in two ways:

1. Drag and drop image files into the application.
2. Click the drop zone and select files using the file browser.

The application displays the selected files and their approximate sizes.

---

### Select Output Format

Choose the desired output format from:

```text
PNG
JPEG
BMP
GIF
ICO
WEBP
TIFF
```

---

### Change Image Size

You can choose from predefined sizes:

```text
Original
16x16
32x32
48x48
64x64
128x128
256x256
512x512
1024x1024
Custom
```

You can also specify a custom width and height.

By default, the application keeps the original aspect ratio when resizing.

---

### ICO Generation

When `ICO` is selected, you can specify multiple icon sizes.

Default ICO sizes:

```text
16,32,48,64,128,256
```

The application generates a multi-size ICO file using the selected sizes.

This makes the application especially useful for creating:

* Windows application icons
* Website favicons
* Desktop shortcuts
* Multi-resolution `.ico` files

---

### Image Quality

For formats such as JPEG and WEBP, you can adjust the output quality from:

```text
10% → 100%
```

The default quality is:

```text
95%
```

JPEG and WEBP output also use optimization settings during saving.

---

### Advanced Settings

The application provides additional settings including:

* DPI
* Background color field
* Sharpness enhancement
* Sharpen filter

The default DPI value is:

```text
300
```

The sharpness enhancement uses Pillow's `ImageEnhance.Sharpness`, while the sharpen option uses Pillow's `ImageFilter.SHARPEN`.

---

## 📁 Output

By default, converted images are saved in the same directory as the source image.

You can also select a custom output directory.

If overwriting is disabled and a file with the same name already exists, the application automatically generates a new filename:

```text
image.png
image_1.png
image_2.png
...
```

This prevents existing files from being overwritten.

---

## ⚡ Conversion Process

Images are processed in a dedicated `QThread`, keeping the graphical interface responsive during conversion.

The conversion worker:

1. Opens the source image.
2. Converts incompatible color modes when necessary.
3. Applies optional enhancement and sharpening.
4. Resizes the image if requested.
5. Creates the output directory if necessary.
6. Applies format-specific saving options.
7. Saves the converted image.
8. Reports progress to the GUI.
9. Reports successful and failed conversions when finished.

---

## 📊 Progress Tracking

During conversion, the application displays:

* Current progress percentage
* Number of processed files
* Current file name
* Successful conversion count
* Failed conversion count

If some files fail, the application keeps track of their errors and displays a summary after conversion.

---

## 🎨 Interface

The application uses a modern dark UI with:

* Dark theme
* Cyan accent colors
* Rounded components
* Gradient buttons
* Drag & Drop zone
* Progress bar
* File list
* Advanced settings panel
* Responsive scrolling interface

The main window is initialized with a minimum size of `650x880`.

---

## 📂 Project Structure

For the current single-file version:

```text
Image-Converter-Pro/
│
├── convert_img_format.py
└── README.md
```

---

## 💻 Requirements

Recommended environment:

```text
Python 3.x
PyQt6
Pillow
```

The project does not require an internet connection for image conversion itself; processing is performed locally using Pillow.

---

## 🔧 Example

For example, you can convert:

```text
photo.png
```

to:

```text
photo.webp
```

or:

```text
photo.jpg
```

You can also resize:

```text
1920x1080
```

to:

```text
1024x1024
```

while preserving the aspect ratio.

For creating a favicon, select:

```text
Format: ICO
Sizes: 16,32,48,64,128,256
```

---

## 📝 Error Handling

Conversion errors are handled individually.

If an image cannot be processed, the application records the filename and the corresponding exception instead of immediately terminating the entire conversion process.

At the end, the application displays a summary similar to:

```text
Converted: 8
Failed: 2
```

along with a preview of the encountered errors.

---

## 🔮 Future Improvements

Possible future improvements include:

* [ ] Image preview before conversion
* [ ] Batch folder processing
* [ ] Automatic output filename templates
* [ ] EXIF metadata controls
* [ ] Transparent background options
* [ ] Image compression presets
* [ ] Image rotation
* [ ] Image flipping
* [ ] Cropping tools
* [ ] More advanced color adjustments
* [ ] Application settings persistence
* [ ] Portable Windows executable
* [ ] Linux package
* [ ] macOS application bundle

---

## 📄 License

Add your preferred license here.

For example:

```text
MIT License
```

---

## 👨‍💻 Author

Developed by [AmirHBDev](https://github.com/AmirHBDev)

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.