# session-log

A Claude Code plugin that logs every session's **name**, **start date**, and
**last-modified date** to a single JSON file, so you can always find a past
session.

It works by hooking `SessionStart` (records the start time, and generates a
name if the session doesn't have a title yet), and `Stop` / `SessionEnd`
(keeps `last_modified` current as you work).

## Requirements

- [Claude Code](https://code.claude.com) with plugin support
- [`jq`](https://jqlang.org/) installed and on your `PATH`

## Install

```
/plugin marketplace add aryakvn/claude-session-log
/plugin install session-log@session-log-marketplace
```

Or from the CLI directly:

```
claude plugin marketplace add aryakvn/claude-session-log
claude plugin install session-log@session-log-marketplace
```

## Usage

Once installed, it works automatically in the background. To check on it:

- Ask Claude something like *"what sessions have I had recently?"* — a bundled
  skill teaches Claude to read the log.
- Or run the bundled command: `/session-log:list-sessions`
- Or query the log file yourself:

  ```bash
  jq -r 'to_entries | sort_by(.value.last_modified) | reverse | .[] |
    "\(.value.last_modified)  \(.value.name)  [\(.value.project)]"' \
    ~/.claude/session-log.json
  ```

## Log format

By default the log lives at `~/.claude/session-log.json` (override with the
`CLAUDE_SESSION_LOG_FILE` environment variable). It's a JSON object keyed by
session ID:

```json
{
  "abc123": {
    "name": "my-project-20260801-153000",
    "project": "my-project",
    "cwd": "/Users/you/code/my-project",
    "started": "2026-08-01T15:30:00Z",
    "last_modified": "2026-08-01T16:45:12Z"
  }
}
```

## Repo layout

```
.claude-plugin/
  marketplace.json          # marketplace catalog (this repo = one marketplace)
plugins/
  session-log/
    .claude-plugin/
      plugin.json            # plugin manifest
    hooks/
      hooks.json             # SessionStart / Stop / SessionEnd wiring
    scripts/
      session-log.sh         # the actual logging logic
    skills/session-log/
      SKILL.md                # teaches Claude to read the log when relevant
    commands/
      list-sessions.md        # /session-log:list-sessions
```

## License

Copyright (c) 2026 Arya Kavian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.