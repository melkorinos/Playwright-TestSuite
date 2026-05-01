# Nat — Log

> Running activity log. Most recent at the top.
> Append an entry after every significant task or session.

---

## 2026-05-01 — Docs audit + report consolidation + repo hygiene

**Done:**
- Audited all Nat docs — found and fixed two stale facts in `memory.md`: `webAgents.ts` → `browserAgents.ts`; config `sets[]` → `workerSlots`
- Removed stale `instanceCache` watch entry (singletons were removed in a prior session)
- Added `.agents/skills/` note to memory: tool-managed by npx mattpocock/skills, must not be moved
- Updated memory: reports now all under `temp/`, nat removed from public README agent table
- Redirected all Playwright outputs to `temp/`: `outputDir` → `temp/test-results`, HTML → `temp/playwright-report`, JUnit → `temp/reports/results.xml`
- Cleaned `.gitignore`: removed now-redundant `test-results/` and `playwright-report/` entries (covered by `temp/`)
- Answered: `.vscode` must stay — `settings.json` with `chat.promptFiles: true` is required for slash commands
- Answered: `.nvmrc` must stay — CI pipeline reads it via `actions/setup-node@v4`
- ESLint confirmed clean (exit 0) before committing

**Decisions:**
- Keep `.vscode/settings.json` committed — it's the activation mechanism for agent slash commands, not personal IDE config
- All report artifacts under `temp/` which is already gitignored — no extra gitignore entries needed

---

## 2026-05-01 — README trim and .env.example fix

**Done:**
- Removed sections: Environment variables, Test structure rules, Playwright projects, Reports, Resources, Tech debt
- Shortened: Run (inline code block), Pipelines (prose + removed table), Docker (4-line block replaces full section)
- Rewrote How it works as 6 numbered steps (step 4 marked E2E-only for browser agents)
- Updated VS Code extensions to include tech debt convention note
- Updated AI agents: removed `/nat` from public table, removed Nat private repo instructions, added mattpocock/skills and lackeyjb/playwright-skill links
- Updated `.env.example`: removed `PASS`, added `SERVER`, `AGENT1_PASSWORD`, `AGENT2_PASSWORD` with inline comments

---

## 2026-04-30 — README full review and update

**Done:**
- Updated env vars table: `PASS` → `AGENT1_PASSWORD` / `AGENT2_PASSWORD`
- Updated repo structure: removed `webPages.ts`, `webComponents.ts`, `browserHelper.ts`; added `browserAgents.ts`; fixed config descriptions
- Rewrote How it works: Config section (`sets` → `workerSlots`, `getConfigSetByParallelIndex` → `getWorkerSlot`); Fixtures section (two-file merge, lazy init); new Browser agents section; new Service agents section; Services section (`instance()` → `create()`)
- Updated Pipelines: template renamed, `PASS` → agent password secrets, E2E step added to table, `secrets: inherit` documented
- Updated Docker: removed `PASS` references

---


**Done:**
- Refactored `TokenService` and `SomeService`: removed static singleton `instanceCache`; replaced `instance()` with `create(baseUrl, token?)` factory pattern; `baseUrl` now injected, no ambient config reads inside services
- Replaced `services` fixture with worker-scoped `servicesAgent1` / `servicesAgent2` fixtures in `fixtures/services.ts`; each agent owns its full lifecycle; credentials from `AGENT1_PASSWORD` / `AGENT2_PASSWORD` env vars
- Introduced `AgentServices` type (`tokenService` + `someService`) — `tokenService` always included per agent for auth-behaviour testing
- Created `fixtures/webAgents.ts` with `BrowserAgent` type and `BrowserAgentFixtures`; `browserAgent1` wraps built-in `page` (inherits all project config); `browserAgent2` launches an independent browser process via `playwright` fixture
- Deleted `fixtures/webPages.ts` and `fixtures/webComponents.ts` — subsumed into `webAgents.ts`; `assembleBrowserAgent()` is the single assembly point
- Deleted `helpers/browserHelper.ts` — `getNewBrowser` replaced entirely by fixture system
- Removed module-level `let userB` from E2E test — was leaking state between tests
- Renamed `WebAgentFixtures` → `BrowserAgentFixtures` (name conflicted with a company product)
- Updated `fixtures/fixtures.ts`: now merges `webAgents` + `services`; Playwright lazily initialises fixtures so API tests never spawn a browser
- Updated `api/tests/someService/someService.test.ts` and `api/utils/someUtil.utils.ts` to use `servicesAgent1`
- README update deferred — user will request separately

**Decisions:**
- Worker scope for service fixtures: tokens last 2 hours, tests are always independent — worker scope safe and more efficient
- `tokenService` always included in every agent (not a separate fixture) — auth-behaviour tests need it, complexity is low
- `browserAgent2` gets its own browser process (not just a new context) for true isolation
- No env var guard for missing `AGENT_PASSWORD` — let Playwright surface a 401 naturally

---

## 2026-04-20 — Personal memory setup + private repo decision

**Done:**
- Created `personal-memory.md` — personal life context file (private, gitignored)
- Wired into nat prompt; loaded every session
- Decided: only `personal-memory.md` goes to private repo (`myAgents`); all other nat files stay public
- Updated `.gitignore` to ignore `docs/agent-templates/nat/personal-memory.md`
- Removed 'Never commit Nat files' rule from soul.md
- Updated README with private repo setup instructions

---

## 2026-04-20 — README: Pipelines and Docker sections

**Done:**
- Rewrote `## Pipelines` section — documents trigger workflow vs reusable template split, triggers (push to main + workflow_dispatch), steps table, secrets required, how to add an environment
- Rewrote `## Docker` section — documents image provenance, build/run commands, runtime override patterns, `.env` usage, node_modules volume explanation

---

## 2026-04-20 — Package updates

**Done:**
- Updated all packages to latest stable via `npm install @latest`
- Ran `npm audit fix` — resolved all 7 vulnerabilities, 0 remaining
- `package.json` updated: `@playwright/test` 1.54.2→1.59.1, `@types/node` 24.1.0→25.6.0, `dotenv` 17.2.1→17.4.2, `@typescript-eslint/eslint-plugin` 8.26.1→8.58.2, `eslint-plugin-playwright` 2.2.0→2.10.2

---

## 2026-04-20 — First session in Playwright-TestSuite

**Done:**
- Moved all 3 agent prompt files to `.github/prompts/` (required for VS Code slash commands)
- Fixed prompt file paths and `chat.promptFiles` setting
- Updated all 3 agent souls: added README consultation, playwright-skills consultation
- Added execution plan + question discipline rule to PR reviewer soul (with explicit PR review exemption)
- Removed gitignore rule from Nat soul (not applicable to this repo)
- Replaced fake factories rule in test-healer with repo-accurate paths (`api/models`, `e2e/components`)
- Removed ADO sections from PR reviewer; GitHub MCP only
- Replaced all `[REPO_NAME]`, `[MAIN_BRANCH]`, `[ORG_NAME]`, `[FAKE_FACTORIES_PATH]`, `[MODELS_PATH]`, `[COMPONENTS_PATH]` placeholders
- Populated Nat `memory.md` with full first-session repo knowledge
- Rewrote `docs/README.md` — full rewrite: added intro, what's included, env vars table, repo structure, how it works, AI agents section, skills library reference, cleaned tech debt section

**Decisions:**
- Nat files are NOT gitignored in this repo (human decision)
- ADO removed entirely (GitHub-only repo)
- Boilerplate framing throughout — no product-specific language
