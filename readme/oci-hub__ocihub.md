# ocihub — Ephemeral Docker Registry

**Docker images that expire themselves.**

`ocihub.com` is a free, anonymous, OCI-compatible Docker registry for short-lived images. The image tag sets the lifetime: push with a tag like `1h` and the image is deleted automatically one hour later. No signup, no API keys, no cleanup jobs — just standard `docker push` and `docker pull`.

## Quick start

```bash
docker pull alpine:latest
docker tag alpine:latest ocihub.com/alpine:1h
docker push ocihub.com/alpine:1h

# anyone can pull it for the next hour
docker pull ocihub.com/alpine:1h
```

That's it. After one hour the image is removed automatically.

> Tip: use a hard-to-guess repository name (e.g. a UUID) since the registry is public and anonymous:
>
> ```bash
> IMAGE=ocihub.com/$(uuidgen | tr A-Z a-z):1h
> docker build -t "$IMAGE" . && docker push "$IMAGE"
> ```

## TTL tags

The **entire tag** is the TTL value:

| Tag | Lifetime |
|---|---|
| `30m` | 30 minutes |
| `1h`, `6h` | hours |
| `2d` | days |
| `1w` | 1 week (maximum) |
| `latest`, `v1.0`, anything else | default lifetime (24h) |

- Supported units: `s`, `m`, `h`, `d`, `w`.
- Allowed range: **1 minute to 1 week**. A TTL tag outside this range is not clamped — it falls back to the default 24h.
- Tags like `build-1h` are not TTLs; the whole tag must be the value.

Every successful push returns the applied expiry in the response headers:

```text
X-Ephemeral-TTL: 1h0m0s
X-Ephemeral-Expires-At: 2026-07-02T18:30:00Z
```

## Use in CI/CD

Build once, hand the image to later jobs — no shared cache or artifact store needed:

```yaml
# .github/workflows/ci.yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          docker build -t ocihub.com/myapp-${{ github.sha }}:1h .
          docker push ocihub.com/myapp-${{ github.sha }}:1h

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: |
          docker pull ocihub.com/myapp-${{ github.sha }}:1h
          docker run --rm ocihub.com/myapp-${{ github.sha }}:1h ./test.sh
```

Ready-to-use examples live in [`examples/`](examples/): a GitHub Actions workflow, a GitLab CI pipeline, and a shell script for one-off preview pushes.

Common patterns:

- **Pull-request previews** — push branch images with `:6h` or `:1d` so preview artifacts vanish after the review window.
- **Cross-runner handoff** — pass images between runners, regions, or self-hosted agents in the same pipeline.
- **Team sharing** — send a colleague a pull URL for a debug build; TTL handles the cleanup.
- **Demos and workshops** — publish tutorial images that shouldn't live forever.

## Works with any OCI client

The registry implements the standard Docker Registry HTTP API V2, so anything that speaks OCI works:

```bash
# docker
docker push ocihub.com/myimage:1h

# podman
podman push ocihub.com/myimage:1h

# crane / skopeo / oras — all work the same way
crane copy alpine:latest ocihub.com/alpine:30m
```

## Fair use

This service is free for CI artifacts and temporary images. Please don't use it for production releases, long-term storage, or as a mirror. Images may be removed at any time for abuse.

## FAQ

**Do I need an account?** No. Push and pull are anonymous.

**Can I delete an image early?** Just wait for the TTL — or push over the same tag; the newest push wins.

**What happens if I pull an expired image?** The pull fails with a standard "manifest unknown" error, exactly as if the tag never existed.

**Is my image private?** No. Anyone who knows the repository name and tag can pull it. Use a random name (UUID) if you want obscurity, and never push images containing secrets.