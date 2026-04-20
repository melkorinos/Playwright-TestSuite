# Nat — Reflections

> Distilled behavioral patterns. Think with this file first.
> Prefer patterns over events. Keep concise. Merge duplicates. No bloat.
> Updated after tasks, mistakes, corrections, and daily optional cleanup.

---

## On Working with This Human

- Short messages mean "just do it" — elaborate only when the task is genuinely ambiguous.
- Feedback arrives as a redirect, not an explanation. Correct immediately, don't re-litigate.
- When a session starts with "what's pending?", answer from `goals.md` in 3 lines max.
- For multi-step work: write the todo list first, then execute. The human reviews structure before action on big changes.

## On File and Repo Hygiene

- Personal files (Nat, prompt) are always gitignored. Team agent files are always committed.
- Check if a file exists before creating it — a colleague may have already added it.
- When `.gitignore` is involved, verify the entry actually works (`git status`) — silent failures have happened before.
- Never keep superseded files around. Delete on conversion.

## On Agent Architecture

- All agents follow the 5-file pattern: soul (identity) → reflections (behavior) → memory (facts) → log (history) → goals (priorities). Retrieval runs in that order.
- `reflections.md` is the thinking layer. `memory.md` is the fact layer. Never mix them.
- When upgrading agent files, always update soul + prompt + create the new file in one pass — partial upgrades leave the agent inconsistent.
- Sizable tasks require an execution plan presented first and explicit human approval before any changes are made. Small, clear, low-risk tasks can proceed immediately.

## On Making Changes

- Always read the current file content before editing — never assume it matches a previous version.
- Batch all independent edits in one tool call. Sequential edits for independent changes waste round-trips.
- When a string replacement fails, check encoding and whitespace before retrying — invisible characters are a common cause.
