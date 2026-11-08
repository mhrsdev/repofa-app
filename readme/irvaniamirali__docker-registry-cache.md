# Docker Registry Cache

A minimal local Docker image pull-through cache built with **Sonatype Nexus Repository** and **Caddy**.

The goal is simple: cache Docker images locally so repeated pulls do not need to download the same image from Docker Hub again.

## Architecture

```text
Docker Client
     │
     │ HTTPS
     ▼
docker.localhost
     │
     ▼
   Caddy
     │
     │ HTTP :8082
     ▼
Nexus Repository
     │
     ▼
docker-proxy
     │
     ▼
Docker Hub
```

## Components

* **Nexus Repository** — Docker pull-through cache
* **Caddy** — local HTTPS reverse proxy
* **Docker** — image client
* **Docker Hub** — upstream registry

The setup intentionally uses as few components as possible.

## Quick Start

## Clone the Repository

```bash
git clone https://github.com/irvaniamirali/docker-registry-cache.git
cd docker-registry-cache
```

Start the stack manually:

```bash
docker compose up -d
```

Stop it:

```bash
docker compose down
```

The stack does not use a Docker restart policy. Nexus and Caddy therefore do not automatically start when Docker Desktop starts.

Configure the local hostname:

```bash
./scripts/setup-local.sh
```

The registry will eventually be available at:

```text
https://docker.localhost
```

## Documentation

* [Architecture](docs/01-architecture.md)
* [Setup](docs/02-setup.md)
* [Nexus](docs/03-nexus.md)
* [Docker Proxy](docs/04-docker-proxy.md)
* [Caddy](docs/05-caddy.md)
* [Docker Client](docs/06-docker-client.md)
* [Troubleshooting](docs/07-troubleshooting.md)