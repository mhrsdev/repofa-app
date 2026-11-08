# Python Headless CMS

[راهنمای فارسی](README.fa.md)

Python Headless CMS is an open-source, Flask-based content management backend
with a Persian RTL dashboard and API-first modules for content, media, sliders,
messages, dynamic datasets, and generated cover images.

طراحی و توسعه پیمان عابدین‌پور — developed by **perymaan abedinpour**  
Website: [peymaanabedinpour.ir](https://peymaanabedinpour.ir)

## Highlights

- Multi-namespace Blog API with tags, SEO fields, JSON-LD, sitemap, feed, and webhooks
- API In for receiving and managing structured messages
- API Out for creating token-protected APIs, schemas, datasets, and records
- Media API for images, audio, video, and documents
- Slider API with spaces, sets, publishing states, ordering, and image variants
- HTML-to-image cover generator with reusable templates
- OpenAPI dashboard, API sandbox, saved views, and backup/restore tools
- SQLite by default, environment-driven configuration, and responsive RTL UI

## Release hygiene

The public repository intentionally contains no database files, backups,
environment secrets, uploaded media, generated images, API tokens, or
operational records. Empty databases and runtime folders are created locally
when the application starts.

## Requirements

- Python 3.10 or newer
- SQLite with FTS5 support

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
```

On Windows PowerShell, activate with:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies and create the local configuration:

```bash
python -m pip install --upgrade pip
python -m pip install -r app/requirements.txt
cp app/.env.example app/.env
```

Generate a strong secret:

```bash
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Open `app/.env` and set at least:

```dotenv
SECRET_KEY=replace-with-the-generated-secret
ADMIN_EMAIL=replace-with-the-admin-email
ADMIN_PASSWORD=replace-with-a-strong-password
```

Start the development server:

```bash
cd app
python app.py
```

Then open `http://127.0.0.1:5000`.

There are no default credentials. The first administrator is created from
`ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Production

Run behind a reverse proxy and enable secure cookies:

```dotenv
SESSION_COOKIE_SECURE=true
DEBUG=false
```

Start the WSGI application:

```bash
cd app
gunicorn --workers 2 --bind 0.0.0.0:8000 wsgi:app
```

Use explicit allowed origins and store `app/.env`, databases, uploads, and
backups outside version control. Review proxy limits before enabling uploads.

## Configuration

The complete, secret-free template is in [`app/.env.example`](app/.env.example).
Important groups are:

| Group | Variables |
| --- | --- |
| Core | `SECRET_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `DATABASE_URL` |
| API In | `ORIGIN_WHITELIST`, `RATE_LIMIT_PER_MIN`, `API_TOKENS` |
| Webhooks | `WEBHOOK_URL`, `WEBHOOK_SECRET` |
| Blog | `BLOG_DATABASE_URL`, `BLOG_ADMIN_OPEN` |
| API Out | `AO_DATABASE_URL`, `AO_ALLOWED_ORIGINS` |
| Media | `MEDIA_DATABASE_URL`, `MEDIA_ROOT`, `MEDIA_MAX_SIZE_MB` |
| Sliders | `SLIDERS_DATABASE_URL`, `SLIDERS_ROOT`, `SLIDERS_MAX_SIZE_MB` |
| Covers | `COVER_DATABASE_URL`, `COVER_MEDIA_ROOT`, `COVER_OUTPUT_ROOT` |

Leave `API_TOKENS` empty to start without seeded API keys. New keys can be
created from the dashboard.

## Main routes

| Route | Purpose |
| --- | --- |
| `/login` | Administrator sign-in |
| `/dashboard/` | Main dashboard |
| `/dashboard/about` | Project and developer information |
| `/dashboard/blog-api` | Blog management |
| `/dashboard/apis` | API In management |
| `/dashboard/api-out` | Dynamic outbound APIs |
| `/dashboard/media-api` | Media management |
| `/dashboard/sliders` | Slider management |
| `/dashboard/cover` | Cover generator |
| `/dashboard/docs` | OpenAPI interface |
| `/health` | Public health check |
| `/api/openapi.json` | OpenAPI document |

## Tests

```bash
python -m unittest discover -s tests -v
python -m compileall -q app tests
```

The smoke suite uses temporary databases and storage directories; it does not
write test records into the repository.

## Repository files

- [`README.fa.md`](README.fa.md): complete Persian guide
- [`GITHUB_PUBLISHING.md`](GITHUB_PUBLISHING.md): paste-ready repository and release text in Persian and English
- [`CONTRIBUTING.md`](CONTRIBUTING.md): contribution workflow
- [`SECURITY.md`](SECURITY.md): responsible security reporting
- [`NOTICE`](NOTICE): author and attribution notice

## License

Released under the [MIT License](LICENSE).

Copyright © 2026 Peymaan Abedinpour (پیمان عابدین‌پور). The copyright and
license notice must remain with redistributed copies.

Bundled Vazirmatn font files remain under the
[SIL Open Font License 1.1](app/static/fonts/OFL.txt).