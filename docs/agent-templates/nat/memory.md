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
- Personal life context lives in `personal-memory.md` (alongside `memory.md`) — loaded every session. All third-party names anonymised with consistent pseudonyms; sensitive data fully redacted.

---

## Repo Architecture Knowledge

- **Repo:** `Playwright-TestSuite` — a generic boilerplate Playwright test suite, not tied to any specific product. Meant to be cloned and adapted.
- **Base branch:** `main`
- **Two test types:** API tests (`api/tests/`) via Playwright request context; E2E tests (`e2e/tests/`) via browser.
- **Three Playwright projects:** `api`, `e2e`, `apiUtils` (utility runners matching `**/*.utils.ts`).
- **Fixtures:** `fixtures/fixtures.ts` merges `browserAgents` + `services` into the base `test` object. Playwright lazily initialises — API tests never spawn a browser. Custom matchers extend `expect`.
- **Service fixtures:** worker-scoped `servicesAgent1` / `servicesAgent2` in `fixtures/services.ts`. Each agent: `TokenService.create(baseUrl)` → `getToken(password)` → `SomeService.create(baseUrl, token)`. No singletons. Credentials from `AGENT1_PASSWORD` / `AGENT2_PASSWORD` env vars.
- **Browser fixtures:** `browserAgent1` (wraps built-in `page`, inherits all project config) and `browserAgent2` (independent browser process via `playwright` fixture) in `fixtures/browserAgents.ts`. Each agent delivers `{ webPages, webComponents }` sub-groups.
- **Services:** `create(baseUrl, token?)` factory pattern — no singletons, no ambient config reads inside service classes. `baseUrl` always injected.
- **Config:** `config/config.ts` holds named environments, each with `workerSlots[]` and `url`. `SERVER` env var selects the environment.
- **Parallel workers:** max workers = number of workerSlots in the active config. `TEST_PARALLEL_INDEX` picks the correct slot per worker.
- **Models:** TypeScript interfaces in `api/models/` — every response body must be typed, no `any`.
- **Components/Pages:** E2E page objects in `e2e/components/`. Locators belong there, never inline in tests. Organised into `webPages` (full pages with navigation) and `webComponents` (significant sub-components).
- **Playwright skills library:** `docs/playwright-skills/` — consult for architecture decisions, locator patterns, fixture design, test data, debugging.
- **AI agents:** `agent-pr-reviewer` and `agent-test-healer` are public agents. `nat` is personal, not listed in README agent table. All activated via `.github/prompts/`.
- **External skills:** `.agents/skills/` is managed by `npx skills@latest add mattpocock/skills` — do not move or manually edit; npx always writes back to `.agents/skills/`.
- **Env vars:** `SERVER` (selects config environment), `AGENT1_PASSWORD`, `AGENT2_PASSWORD` (auth credentials per agent). Defined in `.env`.
- **Scripts:** `npm run test:api` and `npm run test:e2e` — both run with 2 workers.
- **Reports:** all outputs go under `temp/` — `temp/test-results` (artifacts), `temp/playwright-report` (HTML), `temp/reports/results.xml` (JUnit CI). `temp/` is gitignored. Retries: 2 on CI, 0 locally.

---

## Things to Watch For

- `console.log` still present in `someService.ts` — flagged but not yet removed (boilerplate code).
- **API status assertion convention:** always `expect(response.status(), { message: await response.text() }).toBe(<code>)` — explicit status code, response body surfaced on failure. Never `toBeOK()`.
