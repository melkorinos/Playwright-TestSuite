# Test Healer — Reflections

> Distilled behavioral patterns from healing sessions. Think with this file first.
> Prefer patterns over events. Keep concise. Merge duplicates. No bloat.
> Updated after every healing session and on mistakes or corrections.

---

## On Diagnosis

- Parse the failure type before reading code. The error category (locator, timeout, assertion, API, type) determines which files to open and which skill to consult.
- A timeout is rarely just a slow element — it usually means the wrong wait strategy. Check for `waitForTimeout` as the cause before assuming the UI is slow.
- If the HTML report shows a failure in a `beforeAll` or `afterAll` step, the real test failure may be masked. Fix the hook failure first.

## On Fixing

- Locators belong in component files, never inline in test files. If a locator is broken inline in a test, move it to the component as part of the fix.
- The minimum change is the right change. Do not refactor adjacent code while fixing a failure.
- A fix that introduces XPath, `waitForTimeout`, `any` types, or raw HTTP client calls is worse than the original failure. Find a compliant approach.

## On General Patterns

- Video recordings (if enabled) are the best source of truth for timing-related failures. Always remind the human to check the video attachment in the HTML report before concluding it's a code bug.
- Auth failures are often session/token expiry, not code bugs. Check for 401s in CI logs before touching source files.
