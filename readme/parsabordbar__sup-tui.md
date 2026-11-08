<img width="1905" height="1079" alt="image" src="https://github.com/user-attachments/assets/acb5999b-c1c1-4eda-a9f6-d2a0ac2d7de3" />

# sup (What's up?)

A terminal reader for developer news. It merges Hacker News, Lobsters, and
dev.to into a single feed, opens stories and their comment threads inline, and
never leaves the keyboard.


## Install

```sh
cargo install sup-news        # crates.io
```

The crate is `sup-news` because `sup` was already taken on crates.io; the command
it installs is `sup` either way.

Prebuilt binaries for macOS, Linux, and Windows are attached to each
[release](https://github.com/ParsaBordbar/dorehami-tui-client/releases).

From source — needs a Rust toolchain (2024 edition, so 1.85 or newer):

```sh
cargo install --path .
sup
```

No API keys, no config file, no account. Every source it reads is public.

## Sources

Press <kbd>s</kbd> to cycle: **all → hacker news → lobste.rs → dev.to → all**.
Your filter or search query follows you across the switch, so the view only
changes along one axis at a time.

| Source | Feed | Search | Notes |
| --- | --- | --- | --- |
| Hacker News | Algolia mirror of HN | full text | `search_by_date` for newest, points-ranked `search` for popular |
| Lobsters | `/newest.json`, `/hottest.json` | full text | tags become the topic label |
| dev.to | `/articles/latest`, `/articles?top=7` | **tags only** | dev.to has no public full-text search, so a query is slugified into a tag |

In the merged view, all three are fetched **concurrently** and round-robined
together, so each site keeps its own internal ranking but none of them owns the
top of the page. If one site is down or slow to fail, the others still render —
you only get an error when every source fails.

## Keys

### Everywhere

| Key | Action |
| --- | --- |
| <kbd>q</kbd>, <kbd>ctrl</kbd>+<kbd>c</kbd> | quit |
| <kbd>r</kbd> | reload the current view |
| <kbd>o</kbd>, <kbd>h</kbd> | open the selected story in your browser |

### List

| Key | Action |
| --- | --- |
| <kbd>↑</kbd>/<kbd>↓</kbd>, <kbd>k</kbd>/<kbd>j</kbd> | move |
| <kbd>pgup</kbd>/<kbd>pgdn</kbd> | move ten |
| <kbd>home</kbd>/<kbd>end</kbd> | first / last |
| <kbd>enter</kbd>, <kbd>space</kbd> | open the story |
| <kbd>←</kbd>/<kbd>→</kbd> | previous / next page |
| <kbd>s</kbd> | cycle source |
| <kbd>f</kbd> | toggle newest ↔ popular |
| <kbd>1</kbd> / <kbd>2</kbd> | newest / popular |
| <kbd>/</kbd> | search |
| <kbd>esc</kbd> | clear the search, or quit if there is none |

### Story

| Key | Action |
| --- | --- |
| <kbd>↑</kbd>/<kbd>↓</kbd>, <kbd>k</kbd>/<kbd>j</kbd> | scroll |
| <kbd>pgup</kbd>/<kbd>pgdn</kbd> | scroll ten |
| <kbd>home</kbd> | back to the top |
| <kbd>tab</kbd> | switch between article and comments |
| <kbd>t</kbd> / <kbd>c</kbd> | jump to article / comments |
| <kbd>←</kbd>/<kbd>→</kbd> | previous / next story, crossing pages as needed |
| <kbd>esc</kbd>, <kbd>backspace</kbd> | back to the list |

### Search

<kbd>enter</kbd> submits, <kbd>esc</kbd> cancels. Search results are a single
page — paging is disabled until you clear the query.

## Layout

The window adapts down to 30×8. Above 24 rows the story screen stacks the
article and its comments; below that they become one pane you flip with
<kbd>tab</kbd>. Panes are never placed side by side, because a vertical border
between mixed left-to-right and right-to-left text is exactly what terminal
bidi reordering scrambles.

## How it fits together

```
src/
  main.rs              terminal setup, panic-safe restore, the draw/read loop
  app.rs               all state; queues one Job per keypress, runs it, redraws
  events.rs            key → App method
  fetch_data.rs        the shared model: Provider, Feed, Filter, Source, Post…
  fetch_data/
    hackernews.rs      Algolia mirror
    lobsters.rs        lobste.rs JSON
    devto.rs           Forem API
  ui.rs                frame, header, footer, the responsive key legend
  ui/
    list.rs            feed screen
    post.rs            story screen
    text.rs            width-aware wrap / truncate / clamp
    theme.rs           colors
    paragraph.rs       small styled-paragraph helper
```

Adding a fourth source means writing one module with a `list` and a `post`
function and adding a variant to `Provider` — the compiler will point at the
three match arms that need it.

Notes on the shape of things:

- **Ids are `(provider, id)` pairs.** Story ids only have to be unique per site,
  so `PostRef` carries both halves and every post stores its own `permalink`
  rather than deriving one from a base URL.
- **Fetches are blocking and run on the UI loop.** A pending job is drained
  before the next `event::read()`, so the loading popup paints before the
  request starts. The merged feed is the one place that spawns threads.
- **Timestamps are parsed by hand.** Three endpoints, three formats, no date
  crate: `parse_timestamp` handles `Z` and `±HH:MM` offsets, `ago` renders the
  result.
- **HTML is still parsed.** All three APIs return comment and article bodies as
  HTML fragments, so `scraper` survived the move off scraping.

## Tests

```sh
cargo test              # offline: parsing, merging, and rendering
cargo test -- --ignored # hits the live APIs
```

The rendering tests draw every screen at nine terminal sizes and assert that
nothing leaks past a border and that two panes never share a row — the failures
that CJK, RTL, and full-width text tend to cause.

**Known gap:** the Lobsters module has never been run against a live payload —
lobste.rs was unreachable from the machine it was written on. Its structs accept
both known spellings of the fields that have drifted over the years
(`submitter_user` as a string or an object, comment depth as `indent_level` or
`depth`, search results bare or wrapped in `{"stories": …}`), but that is
defensiveness, not verification. If `--ignored` fails on the Lobsters leg, check
whether you can reach the site at all before assuming the parser is wrong.

## Prior life

This started as a TUI client for [dorehami.dev](https://dorehami.dev), a Persian
developer community, and scraped its HTML with CSS selectors. The Persian
interface strings stayed through the rebrand; the scraping did not.