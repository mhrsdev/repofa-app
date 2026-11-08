```markdown
# 📡 Installing Packet Tracer on Arch Linux

A clean, step‑by‑step guide to get Cisco Packet Tracer running on your Arch Linux system using an official `.deb` package.

> **Author:** [iliarezaei](https://github.com/iliarezaei)

---

## ✨ Prerequisites

- An Arch Linux distribution (or derivative)
- `base-devel` package group installed (`sudo pacman -S base-devel`)
- A downloaded Cisco Packet Tracer `.deb` file (from NetAcad or your instructor)

---

## 🚀 Installation Steps

### 1. Create / edit the `PKGBUILD` file

```bash
nano PKGBUILD
```

### 2. Point the `source` to your `.deb` file

Inside `PKGBUILD`, locate the `source` array and set it like this:

```bash
source=("file:///path/to/your/PacketTracer_xxx_amd64.deb")
```

> Replace `/path/to/your/` with the actual folder where your `.deb` is stored.

### 3. Save and exit

If using `nano`: press `Ctrl+O`, `Enter`, then `Ctrl+X`.

### 4. Build the package

Run `makepkg` to generate an installable package (`.tar.zst` or `.tar.gz`):

```bash
makepkg -i
```

> The `-i` flag tells `makepkg` to install the package after building.  
> You will now have a file like `packettracer-<version>-<arch>.pkg.tar.zst`.

### 5. Install via `pacman`

Use `sudo pacman -U` with the generated filename:

```bash
sudo pacman -U packettracer-*.pkg.tar.zst
```

*(Replace the wildcard with the exact filename if necessary.)*

### 6. 🎉 Enjoy!

Launch Packet Tracer from your application menu or by typing `packettracer` in the terminal.

---

## 📝 Notes

- If you see missing dependencies, install them with `pacman -S <dep>` before building.
- The `.deb` file must be trusted – always download from official Cisco sources.
- For older Packet Tracer versions, the output may be a `.tar.gz` – the `pacman -U` command works the same.

---

## 🇮🇷 راهنمای فارسی (Persian)

برای نصب پکت تریسر بر روی آرچ لینوکس، مراحل زیر را به ترتیب انجام دهید:

1. فایل `PKGBUILD` را با `nano` باز کنید.  
2. در قسمت `source` آدرس فایل `.deb` خود را وارد کنید.  
3. فایل را ذخیره کرده و خارج شوید.  
4. دستور `makepkg -i` را اجرا کنید – یک فایل `.tar.gz` یا `.pkg.tar.zst` ساخته می‌شود.  
5. با دستور زیر فایل حاصل را نصب کنید:  
   ```bash
   sudo pacman -U packettracer-*.pkg.tar.zst
   ```
6. از پکت تریسر لذت ببرید!  

**تهیه شده توسط [iliarezaei](https://github.com/iliarezaei)**

---

Feel free to ⭐ this repository if the guide helped you!
```