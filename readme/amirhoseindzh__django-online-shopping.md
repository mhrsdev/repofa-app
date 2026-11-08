# django-online-shopping

A production-ready e-commerce backend built with Django. This project delivers a full-featured store backend (product catalog, cart, checkout, user auth, admin) and ships with frontend assets included in the repository. Images and other assets in the repo are retained as-is.

---

Table of contents
- Overview
- Features
- Screenshots
- Tech stack & requirements
- Dependencies
- Installation (without Docker)
- Installation (with Docker)
- Configuration (.env example)
- Celery & Redis (background tasks)
- Database & seed data
- Running tests
- Latest changes / Changelog
- Contributing
- License
- Maintainer / Contact

---

Overview
This repository contains the backend implementation of an online shopping platform using Django. It is designed as a starting point for small shops, demos, and further development. The backend exposes the Django admin for management and serves the included frontend assets.

Features
- Product catalog with categories and product detail pages
- Shopping cart and order management
- Checkout flow (basic)
- User registration, authentication, and user profiles
- Admin dashboard for products, orders and users
- Background task support via Celery + Redis
- Example fixtures/seed data for quick startup (if included)

Screenshots
<details>
<summary>Preview</summary>

<table>
  <tr>
    <td rowspan="3"><img src="Github/assets/admin_page.png" alt="admin page" height="400px"></td>
    <td rowspan="3"><img src="Github/assets/abzarkade_wholesite.png" alt="whole main page" height="700px"></td>
  </tr>
</table>

</details>

Tech stack & requirements
- Python 3.12
- Django 5.2
- Pipenv (Pipfile, Pipfile.lock) for dependency management
- Django REST framework (API endpoints)
- Bootstrap + custom JavaScript for frontend assets
- Celery for background tasks
- Redis as Celery broker / cache
- Database: SQLite (development) / PostgreSQL (recommended for production)
- Docker & docker-compose (optional, recommended for reproducible environments)

Dependencies
Dependencies are managed with Pipenv (Pipfile / Pipfile.lock). Key packages used in the project:
- Django==5.2
- djangorestframework
- celery
- redis (python client)
- Pillow (image handling)
- psycopg2-binary (PostgreSQL)
- gunicorn (production WSGI server)
- any frontend libs included in repo (Bootstrap, custom JS)

Refer to Pipfile for the authoritative list and exact pinned versions.

Installation (without Docker)
1. Clone the repository
   git clone https://github.com/Amirhoseindzh/django-online-shopping.git
   cd django-online-shopping

2. Install and activate pipenv environment
   - Install Pipenv if you don't have it:
     pip install pipenv

   - Install dependencies and spawn a shell:
     pipenv install --dev
     pipenv shell
   (If you prefer to install exactly from Pipfile.lock in CI or production:)
     pipenv install --deploy --ignore-pipfile

3. Configure environment
   cp .env.example .env
   Edit .env and set SECRET_KEY, DEBUG, DATABASE_URL, ALLOWED_HOSTS, and Celery/Redis variables.

4. Apply database migrations
   python manage.py migrate

5. (Optional) Load seed data
   python manage.py loaddata initial_data.json  # if present

6. Create a superuser
   python manage.py createsuperuser

7. Run the development server
   python manage.py runserver
   Open http://127.0.0.1:8000/

Installation (with Docker)
1. Ensure Docker and docker-compose are installed.

2. Build and start services
   docker-compose up --build -d

3. Run migrations and create superuser (example)
   docker-compose exec web python manage.py migrate
   docker-compose exec web python manage.py createsuperuser

4. (Optional) Load fixtures:
   docker-compose exec web python manage.py loaddata initial_data.json

5. Access the app at http://localhost:8000 (or the port configured in docker-compose.yml)

Configuration (.env example)
Copy .env.example to .env and set values. Typical variables:
- SECRET_KEY=replace-me
- DEBUG=True
- ALLOWED_HOSTS=localhost,127.0.0.1
- DATABASE_URL=sqlite:///db.sqlite3   # or postgres://user:pass@db:5432/dbname
- DJANGO_SETTINGS_MODULE=your_project.settings
- CELERY_BROKER_URL=redis://redis:6379/0
- REDIS_URL=redis://redis:6379/0
- EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD (if email is used)

Important: Do not commit real SECRET_KEY or credentials. Use environment management for production.

Celery & Redis (background tasks)
This project uses Celery for background jobs with Redis as the broker. Example local steps:

- If running without Docker, start Redis (install or run via Docker):
  docker run -d --name redis -p 6379:6379 redis:7

- Set CELERY_BROKER_URL and REDIS_URL in .env (example: redis://localhost:6379/0)

- Start a Celery worker:
  pipenv run celery -A <project_name> worker --loglevel=info
  (Replace <project_name> with your Django project module name — the directory that contains settings.py.)

- In Docker:
  docker-compose up -d  # ensure redis and celery services are defined
  docker-compose exec web celery -A <project_name> worker --loglevel=info

Database & seed data
- production, use PostgreSQL and set DATABASE_URL accordingly.
- Apply migrations: python manage.py migrate
- Load fixtures (if present): python manage.py loaddata initial_data.json

Running tests
- Locally (with pipenv):
  pipenv run python manage.py test

- With Docker:
  docker-compose exec web python manage.py test

If you use CI (GitHub Actions, etc.), add appropriate test and coverage steps.

Admin / Demo credentials
If the repository includes demo credentials for convenience, document them clearly and mark them as demo only. Do not include production credentials. Example (remove or rotate for public deployments):
- Demo username: admin
- Demo password: admin123456


Latest changes / Changelog
Please provide the changelog entries you want included. Example placeholder:

Unreleased
- Ongoing improvements and bug fixes

v0.2.0 — 2026-08-02
- Upgraded to Django 5.2
- Added Celery + Redis support
- Switched to Pipenv (Pipfile & Pipfile.lock)
- Other improvements...


Contributing
We welcome contributions. Suggested workflow:

1. Open an issue to discuss large or breaking changes before implementing.

2. Fork the repository and create a descriptive feature branch:
   git checkout -b feat/short-description

3. Write focused changes and include tests for bug fixes or new features.

4. Follow PEP 8 and any linter/formatter configured in the repo (black, flake8).

5. Commit message convention (example):
   feat(cart): add coupon support

6. Submit a Pull Request to branch main and include:
   - Summary of the change and motivation
   - Migration or environment changes required
   - How to test the change locally

7. Review process:
   - At least one approving review is required before merging (adjust depending on repo policy)
   - Maintainers may request rebase/squash of commits

8. Security issues:
   - Do not open public issues for security vulnerabilities. Contact maintainers privately or follow the repository SECURITY policy.


License
This project is licensed under the Apache License 2.0 — see the LICENSE file for details.