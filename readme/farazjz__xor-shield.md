# XOR Shield — deployable XOR obfuscator (single-file webapp)

**Live demo:** <https://farazjz.github.io/XOR-shield/> · Licensed MIT

![XOR Shield in action — paste a worker, press Protect, the round-trip verify passes](assets/demo.gif)

*Drag in a Cloudflare Worker (ready-made sample: [`examples/demo-worker.js`](examples/demo-worker.js)) → a fresh key XOR-packs every string into one table → the round-trip check proves byte-identical output → download the protected file.*

`index.html` is the entire app: open it directly in any modern browser
(double-click — no server, no internet needed). Everything runs client-side.

## What it does
Protects ES-module JavaScript (e.g. Cloudflare Worker `worker.js`) by
**XOR-encoding string literals** at build time and restoring them at runtime
via an embedded helper — **no `eval()` / `new Function()`** (whole-file wrappers
that eval the decoded text cannot compile ES-module syntax like
`import`/`export` — the classic cause of error 1101). The output stays a valid
ES module; follow the deploy checklist below for compatibility flags and
bindings.

- **Protect** — drag&drop (or paste) code → auto-generated 32-byte key per
  run → all qualifying string literals are packed into one hex/base64 table
  and replaced with `_<name>(index)` calls. Options: min string length,
  table format, banner + decoy marker.
- **Verify** — the round-trip check (runs automatically after Protect):
  re-parses the protected output, extracts its embedded table + key, decodes
  every record and byte-compares against the originals → PASS/FAIL.
- **Inspect** — decode any file produced by this tool (locates the table and
  embedded key itself) to audit hidden strings or export them as JSON.
- **Help** — in-app docs.

## Tested against `worker.js` (~1.3 MB)
- 4 029 of 7 132 string literals protected (the rest are short strings,
  templates with `${}`, property keys, directives — skipped by design)
- round-trip verify: PASS (all records byte-identical)
- output ~1.62 MB (+28.2%), gzip ≈ 606 KB (reference only), cold-start decode ≈ 5 ms
- protected module imports in Node with the same export shape
  (`{ fetch, scheduled }`), so it is syntactically ready for `wrangler dev` /
  Cloudflare dashboard deploy
- **behavioral differential test**: original vs protected handler served 13
  identical request paths (panel HTML, assets, 404s, API errors, POSTs) —
  all responses matched byte-for-byte; the only textual differences were
  stack-trace coordinates inside error pages, which necessarily differ
  because the protected file has a different layout
- **BPB panel worker (~404 KB)**: 2 070 strings protected, including the
  ~100 KB embedded panel assets (`SOURCE_CONTENT` gzip blob); 12/12
  differential request paths matched (panel, login POST, sub, qrcode,
  proxy-ip, telegram, dns-query, 404, vless, websocket upgrade). It imports
  `node:crypto`, so the app flags **`nodejs_compat`** as required.
- **Fixed in v1.1.0 (critical)**: choosing the *base64* table format produced
  a runtime-broken worker — the injected decoder applied the base64 loader to
  the hex-encoded key too, so every string decoded to garbage and Cloudflare
  returned error 1101. The hex format was unaffected. The round-trip verify
  could not catch this (it decodes with the correct key bytes directly); a new
  regression gate now **executes the generated decoder** for both formats.

## Deploy checklist (the verify step cannot check these)
1. Deploy as a **module** worker (dashboard default).
2. If the source imports `node:*` modules (e.g. `node:async_hooks`), enable the
   **`nodejs_compat`** compatibility flag and set compatibility date ≥ 2024-09-23 —
   otherwise the Worker dies at startup with **error 1101** ("No such module").
   The app detects `node:*` imports and shows this warning under **Deploy notes**
   after every Protect run (v1.1.0+).
3. Attach KV / D1 / R2 bindings and secrets exactly as before — the tool never
   touches binding names.
4. Size: the limit is **64 MiB uncompressed on all plans** since 2026-09-04
   (error 10027). The old compressed 3 MB / 10 MB limits are retired.
5. Service-Worker-format sources (`addEventListener("fetch", ...)` with no
   import/export) are **rejected** by v1.1.0+ — convert to module format first.

Running `node app-src/test.js` also produces `worker.protected.js` next to
the tool (not committed to this repo). If the original `worker.js` is not in
the folder, the test suite generates a synthetic worker-like module instead —
protect your real file in the app to get the real protected worker.

## Honest limitation
The XOR key lives inside the file (there is no `eval` to keep it separate),
so this is **obfuscation, not encryption**: it defeats casual skimming and
bulk copy-paste, not a determined reverse-engineer.

## License
MIT — see [LICENSE](LICENSE). The embedded JavaScript parser is
[acorn](https://github.com/acornjs/acorn) (MIT © Marijn Haverbeke, Ingvar
Stepanyan, and contributors), bundled unmodified from its UMD build.

## Development
- `app-src/` holds the readable sources (`engine.js`, `ui.js`, `ui.html`,
  `style.css`, `template.html`, `acorn.js`), `build.ps1` and `build.mjs`.
- Rebuild the single file:
  - Windows: `powershell -ExecutionPolicy Bypass -File app-src\build.ps1`
  - any OS: `node app-src/build.mjs`
- Run the engine test suite (needs Node ≥ 18): `node app-src\test.js`
  (edge-case corpus + big worker-like round-trip + Node import smoke test;
  falls back to a synthetic source when `worker.js` is absent)
- Run the UI smoke test (jsdom, needs `npm install` once inside `app-src/`):
  `node app-src\ui-test.js` — loads `index.html` in a simulated browser,
  clicks the Protect flow including the empty-source path, Verify tab, and
  Inspect tab, and fails on any uncaught error
- Regenerate the README animation: `node app-src\make-demo-gif.js`
  (dev-only; install its extra deps first: `npm install puppeteer pngjs gifenc`)