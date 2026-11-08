# God of Licenses v1.0.0

**خدای لایسنس‌ها** — A professional, secure, domain-bound license management system with PHP, supporting MySQL & SQLite, TOTP two-factor authentication, modern RTL admin panel, and robust APIs.

[![PHP](https://img.shields.io/badge/PHP-8.0%2B-blue.svg)](https://www.php.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security](https://img.shields.io/badge/Security-Hardened-green.svg)]()

A production-ready license validation and management solution for selling software, themes, plugins, or SaaS products. Licenses are strictly bound to domains, with optional HMAC-signed API requests for maximum security.

---

## ✨ Key Features

### Core License Management
- **Domain-bound validation**: Licenses only work on the registered domain (prevents sharing/piracy)
- **Flexible expiration**: Lifetime, 30/90/365 days, or custom days
- **Full CRUD**: Create, view, edit, revoke, delete licenses via admin panel or secure API
- **Bulk operations**: Revoke or delete multiple licenses at once
- **Validation logging**: Track every validation attempt with IP, user-agent, success/failure
- **Admin action audit log**: Complete history of all admin activities

### Security (Enterprise Grade)
- **TOTP 2FA** (Google Authenticator / Authy compatible) for admin login — mandatory recommended
- **Brute-force protection** with configurable login lockout
- **Rate limiting** on validation and API endpoints
- **HMAC signatures** (optional but recommended) for API requests to prevent replay/tampering
- **CSRF protection** on all forms
- **Prepared statements** everywhere (no SQL injection)
- **Security headers**: CSP, X-Frame-Options, HSTS, Permissions-Policy, etc.
- **Session hardening**: HttpOnly, SameSite=Strict, secure cookies
- **API tokens** are domain-bound + hashed + logged (no raw tokens stored)
- **Install folder auto-protection** after setup

### Multi-Database & Internationalization
- **MySQL/MariaDB** or **SQLite** (zero-config option)
- Full **RTL support** (Persian, Arabic) + English
- Complete translations for UI (فارسی / English / العربية)
- Language switcher in admin panel and installer

### Modern Admin Experience
- Clean, dark, professional Bootstrap 5 RTL interface
- Responsive design (mobile, tablet, desktop)
- Real-time stats dashboard
- Searchable, paginated license table with inline actions
- CSV export
- In-place editing modals
- New license key shown only once (with copy button)
- 2FA setup with QR code + manual key

### Powerful APIs
- **Validation API** (`/api/validate.php`): Simple POST for clients to check licenses
- **Management API** (`/api/manage.php`): Token-authenticated CRUD for licenses (ideal for automation, resellers, or integration)
- Optional HMAC signature + timestamp for both APIs
- Detailed error logging without leaking sensitive info

---

## 📁 Project Structure

```
god-of-licenses-v1.0.0/
├── admin/
│   ├── index.php              # Main dashboard (licenses, stats, settings, 2FA)
│   ├── login.php              # Secure login + 2FA flow
│   └── logout.php
├── api/
│   ├── validate.php           # Public license validation endpoint
│   └── manage.php             # Secure token-based management API
├── includes/
│   ├── config.php             # Main configuration (edit this!)
│   ├── config.example.php     # Safe template for sharing
│   └── lang/
│       ├── fa.php             # Persian (فارسی)
│       ├── en.php             # English
│       └── ar.php             # Arabic (العربية)
├── install/
│   ├── install.php            # One-time professional installer (with 2FA option)
│   └── schema.sql             # Reference schema (installer creates tables)
├── examples/
│   └── client_example.php     # PHP client example with optional HMAC
├── data/
│   └── .htaccess              # Protects SQLite DB and install marker
├── .htaccess                  # Root security headers + file protections
├── .gitignore
├── LICENSE
├── README.md
└── install/ (auto-protected after setup)
```

---

## 🚀 Quick Start (Production Ready)

### 1. Upload & Configure

```bash
# Upload the folder to your web server (PHP 8.0+ required)
cd /path/to/webroot
# Recommended: rename folder or use subdomain
```

Edit `includes/config.php`:

```php
define('DB_TYPE', 'mysql');           // or 'sqlite' for simple setups
define('DB_HOST', 'localhost');
define('DB_NAME', 'license_system_v1');
define('DB_USER', 'your_user');
define('DB_PASS', 'your_strong_password');

// IMPORTANT: Generate a long random secret
define('APP_SECRET', 'PASTE_YOUR_64+_CHAR_RANDOM_STRING_HERE');
// Generate with: openssl rand -hex 64
```

### 2. Run the Installer

Visit in browser:

```
https://yourdomain.com/god-of-licenses-v1.0.0/install/install.php
```

- Create a strong admin username + password (min 10 chars, mixed case, number, symbol)
- **Strongly recommended**: Enable 2FA during install (Google Authenticator)
- Click "Finalize" — the installer automatically:
  - Protects the `install/` folder with `.htaccess`
  - Renames `install.php` for safety

### 3. Login to Admin Panel

```
https://yourdomain.com/god-of-licenses-v1.0.0/admin/login.php
```

Use the credentials you created. If 2FA enabled, enter the 6-digit code from your authenticator app.

---

## 🔌 API Usage

### License Validation (for your software clients)

**Endpoint:** `POST https://yourdomain.com/.../api/validate.php`

**Required parameters:**
- `license_key` (format: `XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`)
- `domain` (the domain where your software is running)

**Optional (recommended for production):**
- `X-Signature` header (HMAC-SHA256)
- `X-Timestamp` header

**Success response:**
```json
{
  "valid": true,
  "message": "License is valid",
  "product": "Your Product Name",
  "domain": "customer.com",
  "expires": "2027-12-31 23:59:59",
  "user_info": "Customer Name / Email",
  "validation_count": 15,
  "status": "active",
  "server_time": "2026-07-09T09:36:00+00:00"
}
```

Failed responses always return a generic message for security.

See `examples/client_example.php` for a ready-to-use PHP client.

### Management API (automation / integrations)

Use tokens created from the admin panel (Settings or dedicated section).

All requests require:
- `X-API-Token`
- `X-Domain`
- `X-Timestamp`
- `X-Signature` (HMAC)

Supported actions: `list_licenses`, `create_license`, `update_license`, `revoke_license`, `delete_license`

Full documentation is available inside the admin panel under "API Docs".

---

## 🛡️ Security Recommendations

1. **Always use HTTPS** in production (HSTS is pre-configured in `.htaccess`)
2. Keep `APP_SECRET` secret and unique per installation
3. Enable 2FA for the admin account
4. Set `ADMIN_IP_WHITELIST` if you have a static IP
5. Regularly review validation logs and admin action logs
6. Use strong, unique passwords
7. Keep PHP and dependencies updated
8. Consider putting the admin panel behind additional authentication (e.g., Cloudflare Access) for extra sensitive deployments

---

## 🛠️ Development & Customization

- All strings are translatable via `includes/lang/`
- UI is built with Bootstrap 5 RTL + custom dark theme (easy to restyle)
- Database abstraction supports easy addition of new DB types
- TOTP implementation is pure PHP (no external libs required)
- HMAC/Ed25519 helpers included for future advanced signing

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute it commercially or privately.

---

## 👨‍💻 Author & Credits

**Developer:** bluedock
**Github:** https://github.com/bluedock
**Version:** 1.0.0 (July 2026)  
**UI/UX & Security Hardening:** Professional dark theme with full RTL, CSRF, rate limiting, 2FA, domain binding, and HMAC protection.

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

Focus areas for contributions:
- Additional language translations
- Docker / deployment helpers
- Webhook notifications on license events
- Admin dashboard widgets / charts
- Improved mobile experience

---

**God of Licenses v1.0.0** — Simple. Secure. Professional.

Made with ❤️ for developers who value clean code and real security.