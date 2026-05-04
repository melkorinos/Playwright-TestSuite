# PR Reviewer — Memory

> Stable knowledge accumulated from past review sessions.
> Update after every review: add new entries, prune duplicates, max 10 entries per section.

---

## .gitignore and Tracked Files

- Adding a path to `.gitignore` does NOT remove already-tracked files. The full fix requires both `git rm -r <path>/` and a commit. A PR that only adds the `.gitignore` entry still has a 🔴 issue.
- `.playwright-mcp/` contains timestamped YAML snapshots generated on every `browser_snapshot` call. They accumulate rapidly and must always be gitignored.
- `docs/reviews/` is AI reviewer output — local scratch, never source.

---

## PR Process Norms

- Commit messages are never reviewed — explicitly excluded, regardless of quality.
- Re-reviews open with a status table: ✅ Fixed / ⚠️ Partial / ❌ Still open — then new findings.
- A partial fix is still flagged at original severity if the root problem persists. Credit the partial fix explicitly so the author knows what they got right.

---

## GitHub PR Access

- Use GitHub MCP to read PR details, list files, and fetch diffs. Post review comment via MCP `create_pull_request_review` or equivalent.
- After posting, confirm the comment appeared on the PR before reporting success.
- `docs/reviews/` is AI reviewer output — local scratch, never committed.

---

## Repo Patterns

_No entries yet — populated as reviews run. Add repo-specific conventions, anti-patterns seen, and fix approaches._
