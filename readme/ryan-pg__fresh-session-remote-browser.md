# Remote Browser Platform

A web app that gives you a real, fully interactive Chromium browser running on a
server, isolated per session and destroyed completely when you close it.

You open the app in an ordinary browser, click **New Session**, type a URL, and
drive the remote browser directly — mouse, keyboard, scrolling, navigation. The
remote browser is not a screenshot poller: frames come from Chromium's own
compositor over the Chrome DevTools Protocol, and your input is dispatched as
real input events.

> **Isolation, not anonymity.** Each session is isolated from every other session.
> That is a different thing from being anonymous to the sites you visit — see
> [Limitations](#limitations).

---

## Screenshots

**New Session** — the dashboard. A session has been created and is `READY`; the
New Session dialog takes an optional start URL and a per-session proxy.

![Dashboard with the New Session dialog open and one READY session listed](assets/Remote%20Browser%20Platform%20-%20Session%20Making.png)

**Session open** — the same session open in the viewer. The remote Chromium is
rendering a real page, with back/forward/reload and a URL bar above it. The
status line underneath reports the proxy route, viewport, stream mode and frame
rate.

![A live remote browser session rendering a real page inside the viewer](assets/Remote%20Browser%20Platform%20-%20Session%20Openning.png)

Both screenshots are of the same dashboard; the Isolation & limitations panel is
part of the UI, not just this README.

---

## Quick start

```bash
npm install
npx playwright install chromium     # downloads the browser
npm run verify:chromium             # confirms it can actually launch
npm start                           # http://127.0.0.1:3000
```

If `verify:chromium` reports a missing shared library and you don't have root:

```bash
npm run setup:chromium-libs         # unpacks the libraries into ~/.cache, no sudo
```

Then open <http://127.0.0.1:3000>.

### Running without a browser

To exercise the whole lifecycle with no Chromium at all (useful on a CI box):

```bash
BROWSER_DRIVER=fake npm start
```

---

## Reaching it from another machine

By default the server listens on **127.0.0.1 only**, so nothing outside the host
can reach it. Before you change that, know what you'd be publishing: this app
hands the caller a real Chromium running as your user, on your server's IP
address, with your server's network reach. There is exactly one credential
between a stranger and that browser, and it is the access token.

The server refuses to start on a non-loopback address without one.

### Option A — SSH tunnel (no exposure at all)

The safest option, and enough for personal use. Leave `HOST` alone and forward
the port:

```bash
ssh -N -L 3000:127.0.0.1:3000 you@your-server
```

Then open <http://127.0.0.1:3000> on your own machine. Nothing is listening on
the server's public interface, no token is required, and no firewall rule
changes.

### Option B — token + reverse proxy with TLS (public URL)

For access from a phone or a shared link. Set a token and bind publicly:

```bash
ACCESS_TOKEN=$(openssl rand -hex 24) HOST=0.0.0.0 PORT=3000 npm start
```

Print the token once and keep it somewhere safe — it is not recoverable from the
server. Then put TLS in front of it (Caddy is the shortest path):

```
# /etc/caddy/Caddyfile
browser.example.com {
    reverse_proxy 127.0.0.1:3000
}
```

Caddy obtains a certificate automatically. Two things to get right behind a
proxy:

```bash
TRUST_PROXY=true      # so the login throttle sees real client IPs, not the proxy's
SECURE_COOKIE=true    # once the URL is https, so the session cookie is TLS-only
```

**WebSockets must be proxied too**, or you get a dashboard with a dead view.
Caddy and nginx's default `proxy_pass` upgrade transparently; with nginx you need
the `Upgrade`/`Connection` headers spelled out.

Visitors land on `/login`, enter the token, and get an HttpOnly session cookie
(12 h by default). Wrong tokens are throttled per source address.

If TLS terminates somewhere that authenticates on its own — a VPN, an
authenticating proxy, Cloudflare Access — set `ALLOW_INSECURE_BIND=true` and skip
the token. Only do that when something else is genuinely doing the access
control; it is an explicit "I know what I'm doing" switch, not a convenience.

### Option C — private network only

Bind to a VPN or Tailscale interface address rather than `0.0.0.0`:

```bash
HOST=100.x.y.z npm start
```

The bind guard only knows about loopback, so it will still demand a token or
`ALLOW_INSECURE_BIND=true` here. `/api/health` is public on that network — check
it before assuming the interface is unreachable from outside.

### Before you expose it

* **Set a real token.** 24 random bytes from `openssl rand -hex 24`, not a word.
  The login endpoint is the only door, and a guessable token is the whole
  security model gone.
* **Cap the sessions.** Each live session is a Chromium process: roughly 250–400 MB
  and real CPU. `MAX_SESSIONS` defaults to 4 for a small host; on 1 vCPU /
  1.9 GB that is already generous.
* **Understand the network reach.** A page inside a session can reach anything the
  host can — including link-local metadata endpoints and internal services. If
  the host sits inside a private network, that network is reachable through this
  app by anyone holding the token.
* **Prefer `HOST=127.0.0.1` plus a proxy** over `0.0.0.0` where you can, so the
  raw port is never directly exposed.

---

## How it works

```
user's browser ──REST /api/*──────► API layer ──► Session Manager
               ──WebSocket /ws────► Stream gateway      │
                                          │            ├─► Browser Manager (one Chromium per session)
                                    frames out         ├─► Proxy / Network Manager
                                    input in           └─► Session store (per-session temp dir)
```

Opening a session attaches a WebSocket that carries two things in each direction:

* **out** — a JSON frame header followed by a binary JPEG, straight from
  `Page.startScreencast`. Frames are coalesced: if your browser can't keep up the
  older frame is dropped, because for live browsing only the newest pixels matter.
* **in** — `mouse`, `key`, `wheel`, `resize`, `text`, and navigation events, mapped
  onto Playwright's input primitives.

Full detail, including the session state machine and the wire protocol, is in
[`ARCHITECTURE.md`](./ARCHITECTURE.md). Build status and known gaps are in
[`PROGRESS.md`](./PROGRESS.md).

## What is actually isolated

Each session gets its own Chromium **`--user-data-dir`**. That one directory is
what separates sessions, and it holds:

cookies · localStorage · sessionStorage · IndexedDB · Cache Storage ·
service workers · HTTP cache · HSTS · history · autofill

plus its own proxy configuration, its own downloads and uploads directories, and
its own process tree.

**Destroy is verified, not assumed.** Closing a session marks it closing, closes
the stream, shuts the browser down gracefully, force-kills the process group as a
backstop, deletes the directory, and then **re-stats it to confirm it is gone** —
retrying, and reporting leftovers rather than claiming success if anything
survives. A session whose cleanup fails is reported as failed, because a silent
half-delete would break the promise that the next session starts fresh.

## Configuration

Everything is environment-driven; see `src/config.js`.

| Variable | Default | Meaning |
|---|---|---|
| `PORT` / `HOST` | `3000` / `127.0.0.1` | HTTP listen address |
| `ACCESS_TOKEN` | — (auth off) | Shared token. **Required to bind off-loopback.** |
| `ALLOW_INSECURE_BIND` | `false` | Permit a public bind with no token — only behind a VPN or authenticating proxy |
| `SESSION_TTL_MS` | `43200000` | Session cookie lifetime (12 h) |
| `SECURE_COOKIE` | `false` | Set once you serve over HTTPS |
| `TRUST_PROXY` | `false` | Trust `X-Forwarded-*` — set behind a reverse proxy |
| `DATA_DIR` | `$TMPDIR/mmd-browser-app` | Where session directories live |
| `MAX_SESSIONS` | `4` | Concurrent session ceiling |
| `SESSION_IDLE_TIMEOUT_MS` | `900000` | Reap unwatched, idle sessions after this |
| `DEFAULT_PROXY` | — | Fallback proxy for sessions that don't specify one |
| `PROXY_STRICT` | `false` | Reject a session whose proxy config is invalid |
| `HEADLESS` | `true` | Run Chromium headless |
| `BROWSER_CHANNEL` | `chromium` | Playwright channel, e.g. `chrome` for system Chrome |
| `VIEWPORT_WIDTH` / `VIEWPORT_HEIGHT` | `1280` / `720` | Default remote viewport |
| `SCREENCAST_QUALITY` | `70` | JPEG quality of the frame stream |
| `JS_HEAP_MB` | `0` (off) | Per-session JS heap cap |
| `CHROME_NO_SANDBOX` | `false` | **Reduces isolation** — only when the host blocks Chromium's sandbox |
| `BROWSER_DRIVER` | `playwright` | `fake` runs with no browser |
| `LOG_LEVEL` | `info` | `error` \| `warn` \| `info` \| `debug` |

Per-session proxies can also be set in the New Session dialog
(`http://user:pass@host:8080`, `socks5://host:1080`). Credentials are never
returned by the API or written to logs.

## API

Every endpoint below sits behind the token once `ACCESS_TOKEN` is set. Without a
token the whole surface is open, which is only safe on loopback.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/login` | public | Login page |
| `POST` | `/api/auth/login` | public | Exchange the token for a session cookie (throttled) |
| `POST` | `/api/auth/logout` | required | Clear the session cookie |
| `GET` | `/api/health` | required | Liveness and capacity |
| `GET` | `/api/config` | required | Viewport, limits, streaming mode, limitations |
| `GET` | `/api/sessions` | required | List sessions |
| `POST` | `/api/sessions` | required | Create — `{ startUrl?, proxy?, viewport? }` |
| `GET` | `/api/sessions/:id` | required | One session (`410` once destroyed) |
| `DELETE` | `/api/sessions/:id` | required | Close and destroy |
| `POST` | `/api/sessions/:id/navigate` | required | Navigate without the WebSocket |
| `GET` | `/api/sessions/:id/debug` | required | Driver introspection |

Authentication is a cookie (`mmd_session`, HttpOnly, SameSite=Lax) or, for
scripting, `Authorization: Bearer <token>`. The cookie is a signed, expiring
payload — not the token — so rotating `ACCESS_TOKEN` invalidates every session.
Odd as it looks, the session cookie is **anonymous** and reusable; there is one
user of this app, and the token is the whole identity model.

WebSocket: `/ws?sessionId=<id>` — protocol documented at the top of
`src/stream/StreamGateway.js`. The upgrade is authenticated with the same cookie;
a `?token=` is also accepted there because browsers cannot set headers on a
WebSocket handshake, and only there — never on ordinary HTTP, so a token can't
leak into access logs or a `Referer` header.

## Tests

```bash
npm test              # store · proxy · API · auth · stream protocol · real browser
npm run verify:chromium
```

Real-browser tests skip with an explicit reason on a host where Chromium can't
run, so the suite stays green on CI without a browser.

## Limitations

These are real and are surfaced in the UI as well as here.

* **Every session shares this host's IP** unless you configure a per-session
  proxy. Isolation between sessions is not anonymity on the network.
* **Chromium is fingerprintable.** Canvas, WebGL, fonts, timing, TLS fingerprints
  and headless-specific behaviours let a site distinguish this from a normal
  desktop browser. Nothing here spoofs them.
* **No claim of undetectability**, and none should be inferred from the isolation
  described above.
* **Sessions are not a security boundary against a malicious page.** Containing
  an escaped renderer relies on Chromium's own sandbox and on OS-level
  confinement this project does not add. Running with `CHROME_NO_SANDBOX=true`
  removes even Chromium's sandbox.
* **Streaming is a JPEG frame stream**, not lossless video. Quality and scale are
  trade-offs; bandwidth and frame rate are limited by the host's CPU.
* **Destroyed session data is unrecoverable locally**, but anything already sent
  to a site you visited obviously cannot be recalled.
* **One shared token is the entire identity model.** There are no accounts, no
  per-user isolation and no audit trail beyond the server log. Anyone with the
  token has the same powers as anyone else with it, and there is no way to revoke
  one holder without rotating the token and so evicting everybody.
* **The control plane is plain HTTP** unless you put TLS in front of it. Without
  `SECURE_COOKIE=true` over HTTPS, the session cookie and the token itself travel
  in the clear.