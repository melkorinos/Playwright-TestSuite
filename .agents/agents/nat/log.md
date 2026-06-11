# Nat — Log

> Running activity log. Most recent at the top.
> Append an entry after every significant task or session.

---

## 2026-06-11 — Claude Code setup + skeleton bootstrap

**Done:** Added Matt Pocock skills (16) to `.agents/skills/`, tracked in `skills-lock.json`. Created `.claude/commands/` with one file per skill — slash commands now work in Claude Code. Merged ai-helper context into nat (goals, memory updated). Removed `.claude/ai-helper/` and `.github/prompts/` (VS Code Copilot approach replaced by Claude Code). Added `.claude/settings.json` read-only bash allowlist. Artifacts folder at `.agents/agents/nat/artifacts/`.

**Decisions:** Claude Code + `.claude/commands/` replaces VS Code Copilot prompt files. Single AI interface going forward.

---

## 2026-05-04 — Full agent audit + contradiction fixes

**Done:** Audited all three agent souls + memory files against README. Fixed every contradiction:
- PR Reviewer: manual fallback paths, permitted writes, skill references table, operating rules, workflow output paths (all `docs/reviews/` → `temp/reviews/`), Repository Overview `[PATH]` placeholders filled in, gitignore hygiene check updated, Delivery section
- Test Healer: header path, Step 1 workflow, skill references table (all `docs/playwright-skills/` → `.agents/skills/playwright-cli/`), permitted writes, factory method `instance()` → `create()
- PR Reviewer memory.md: `docs/reviews/` → `temp/reviews/`
- README: removed stale `docs/` entry from repo structure; updated What's included skills library description
- Nat soul.md: added skills install/update commands to operating rules
- goals.md: cleared PR reviewer `[PATH]` placeholder backlog item (now filled in)

---

## 2026-05-04 — Moved playwright-cli skills to .agents/, README to root

**Done:** Re-ran `playwright-cli install --skills agents` — skills now in `.agents/skills/playwright-cli/` (not `.claude/`). Deleted `.claude/` folder. Moved `docs/README.md` —> `README.md` (root); deleted `docs/` folder. Updated all paths: 3 prompt files (`README.md` ref), `soul.md` (operating rules + skill table), README repo structure, `memory.md`.

**Decisions:** `--skills agents` flag routes playwright-cli output to `.agents/skills/` — all tool-managed skills now in one folder.

---

## 2026-05-04 — Replaced lackeyjb/playwright-skill with Microsoft playwright-cli

**Done:** Removed lackeyjb/playwright-skill (Claude Code-only, wrong tool). Installed `@playwright/cli` globally (`npm install -g @playwright/cli@latest`). Ran `playwright-cli install --skills` — landed in `.claude/skills/playwright-cli/` (SKILL.md + 10 reference files). Removed lackeyjb entry from `skills-lock.json`. Updated `soul.md` operating rules + skill table to new paths. Updated README repo structure (added `.claude/skills/`) and AI agents section (install + update commands for both skill sources). Updated `memory.md`.

**Decisions:** `.claude/skills/` is tool-managed by playwright-cli — same rule as `.agents/skills/` (never edit manually). Update CLI with `npm install -g @playwright/cli@latest`, then `playwright-cli install --skills` to refresh skills.

---

## 2026-05-04 — Agent consolidation into .agents/agents/

**Done:** Moved all agent folders from `docs/agent-templates/` into `.agents/agents/` (`nat`, `pr-reviewer`, `test-healer`). Removed `docs/agent-templates/` and `docs/playwright-skills/`. Updated all relative paths: 3 prompt files, `soul.md` skill table (replaced per-file breakdown with `.agents/skills/` references + lackeyjb install note), `.gitignore` (personal-memory path), README repo structure, `memory.md`.

**Decisions:** `.agents/` is the single home for all AI files — `agents/` (hand-authored) and `skills/` (npx-managed) side by side. `docs/playwright-skills/` removed — skill reference now points to `.agents/skills/` once lackeyjb is installed via npx.

---

## 2026-05-04 — AI folder consolidation discussion

**Done:**
- Mapped all AI-related file locations and their move constraints
- Proposed 3 consolidation options; recommended Option A (`ai/` top-level folder)
- Condensed log — collapsed older entries into summaries

---

## 2026-05-01 — Docs audit + report consolidation + repo hygiene

**Done:** Audited Nat docs — fixed 2 stale memory facts (`webAgents.ts` → `browserAgents.ts`, `sets[]` → `workerSlots`); removed stale `instanceCache` entry; added `.agents/skills/` note (tool-managed, never move). Redirected all Playwright outputs to `temp/` (`outputDir`, HTML report, JUnit XML). Cleaned `.gitignore` (removed redundant `test-results/` and `playwright-report/` — covered by `temp/`). Added `.vscode` and `.nvmrc` documentation to README.

**Decisions:** `.vscode/settings.json` committed — required for agent slash commands. All report artifacts under `temp/` (already gitignored).

---

## 2026-05-01 — README trim and .env.example fix

**Done:** Removed sections (env vars, test structure rules, projects, reports, resources, tech debt). Shortened Run, Pipelines, Docker. Rewrote How it works as 6 numbered steps. Updated AI agents table (removed `/nat`, added mattpocock/skills + lackeyjb/playwright-skill links). Fixed `.env.example` (`PASS` → `AGENT1_PASSWORD` / `AGENT2_PASSWORD` with comments).

---

## 2026-04-30 — README full review and update

**Done:** Updated env vars, repo structure, How it works (workerSlots, getWorkerSlot, fixture merge, browser/service agent sections), Pipelines (secrets, `secrets: inherit`), Docker.

---

## 2026-04-xx — Fixture and service refactor

**Done:** Removed static singleton `instanceCache`; replaced `instance()` with `create(baseUrl, token?)` factory. Added worker-scoped `servicesAgent1`/`servicesAgent2` with `AgentServices` type. Created `fixtures/browserAgents.ts` (`browserAgent1` wraps built-in `page`; `browserAgent2` independent browser). Deleted `webPages.ts`, `webComponents.ts`, `browserHelper.ts`. Updated `fixtures.ts` (lazy init — API tests never spawn browser).

**Decisions:** Worker scope for services (tokens last 2h, safe). `tokenService` always included per agent. `browserAgent2` gets own browser process. No env var guard — let 401 surface naturally.

---

## 2026-04-20 — Personal memory + private repo + README pipelines/docker + package updates

**Done:** Created `personal-memory.md` (gitignored, private repo `myAgents`). Rewrote Pipelines and Docker README sections. Updated all packages to latest; resolved 7 audit vulnerabilities.

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
