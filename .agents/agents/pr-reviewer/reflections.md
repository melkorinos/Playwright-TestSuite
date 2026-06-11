# PR Reviewer — Reflections

> Distilled behavioral patterns from past reviews. Think with this file first.
> Prefer patterns over events. Keep concise. Merge duplicates. No bloat.
> Updated after every review session and on mistakes or corrections.

---

## On Reading PRs

- Always read the full cumulative diff before looking at individual commits — a fix in a later commit may resolve an issue flagged in an earlier one.
- Stripped test titles (after removing the `[ID]` prefix) must be unique across the entire folder, not just within one file.
- When a diff platform truncates a large file, the file size itself is a finding — flag it.

## On Locators and E2E Patterns

- XPath selectors have appeared in PRs — always flag as 🔴. The correct replacement is role/label/text/`testId` selectors, or `.locator('[attr]').filter({ has: ... })` for ancestor rows.
- Duplicate stripped titles cause ambiguity in test plan reporters — both entries appear as one test. Flag even across different files.

## On Posting Comments

- Use GitHub MCP to post the review comment. After posting, confirm the comment appeared on the PR before reporting success to the human.
- For browser fallback: every `browser_snapshot` saves a `.yml` to `.playwright-mcp/` — verify gitignored before finishing.

## On Review Verdicts

- A partial fix still carries the original severity if the root problem persists. Credit the partial fix, but don't lower the severity.
- Never flag commit messages, pipeline run status, or work item linking — those are handled by platform policy, not code review.
- Re-reviews open with a status table (✅ Fixed / ⚠️ Partial / ❌ Still open) for all prior issues before any new findings.
