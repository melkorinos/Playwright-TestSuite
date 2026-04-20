# Nat — Memory

> Stable facts learned over time. Updated when prompted or after large tasks.
> Project-specific — start fresh when moving to a new project.
> Max 10 entries per section. Prune or merge to stay under.

---

## How This Human Works

- Gives short, dense instructions — assume the full intent and execute. Ask only about genuine ambiguities.
- Answers questions in numbered lists matching the original question numbers — no padding.
- Corrects by redirect, not explanation. Adjust immediately.
- Expects an execution plan before large changes; approves before work starts.

---

## Workflow Preferences

- Batch all independent edits in one tool call — never sequential.
- Agent files live in `docs/agent-templates/[agent-name]/` (5-file pattern per agent).
- Prompt files live in `.github/prompts/` — this is required for VS Code slash commands to work.
- `chat.promptFiles: true` must be set in `.vscode/settings.json` for slash commands to activate.

---

## Repo Architecture Knowledge

- **Repo:** `Playwright-TestSuite` — a generic boilerplate Playwright test suite, not tied to any specific product. Meant to be cloned and adapted.
- **Base branch:** `main`
- **Two test types:** API tests (`api/tests/`) via Playwright request context; E2E tests (`e2e/tests/`) via browser.
- **Three Playwright projects:** `api`, `e2e`, `apiUtils` (utility runners matching `**/*.utils.ts`).
- **Fixtures:** `fixtures/` merges services + webPages + webComponents into the base `test` object. Custom matchers extend `expect`.
- **Services:** static async factory pattern — `public static async instance(token?)`. Never raw HTTP calls in tests.
- **Config:** `config/config.ts` holds named environments, each with `sets[]` (for parallel workers) and `url`. `SERVER` env var selects the environment.
- **Parallel workers:** max workers = number of sets in the active config. `TEST_PARALLEL_INDEX` picks the correct set per worker.
- **Models:** TypeScript interfaces in `api/models/` — every response body must be typed, no `any`.
- **Components/Pages:** E2E page objects in `e2e/components/`. Locators belong there, never inline in tests.
- **Playwright skills library:** `docs/playwright-skills/` — consult for architecture decisions, locator patterns, fixture design, test data, debugging.
- **AI agents:** three agents in `docs/agent-templates/` — `nat` (personal), `agent-pr-reviewer` (code review), `agent-test-healer` (fix failing tests). Activated via `.github/prompts/`.
- **Env vars:** `SERVER` (selects config environment), `PASS` (auth password). Defined in `.env`, templated in `.env.example`.
- **Scripts:** `npm run test:api` and `npm run test:e2e` — both run with 2 workers.
- **Reports:** local → HTML; CI → list + JUnit XML + HTML (never opened). Retries: 2 on CI, 0 locally.

---

## Things to Watch For

- `console.log` still present in `someService.ts` — flagged but not yet removed (boilerplate code).
- The `instanceCache` on services is static — tests sharing a service instance must not mutate shared state.
- **API status assertion convention:** always `expect(response.status(), { message: await response.text() }).toBe(<code>)` — explicit status code, response body surfaced on failure. Never `toBeOK()`.
