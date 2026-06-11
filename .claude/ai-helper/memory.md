# Memory — Settled Decisions

## Architecture
- API tests under `api/` — helpers, constants, node configs
- E2E tests under `e2e/` — component-level, organized by site/feature
- Shared test data under `testData/`
- Matt Pocock skills under `.agents/skills/` — tracked via `skills-lock.json`
- AI context files under `.claude/ai-helper/` — soul, memory, goals, log, reflections

## Tooling
- Playwright for both API and E2E
- TypeScript throughout
- Skills from `mattpocock/skills` via GitHub

## Conventions
- Fully descriptive identifiers — no abbreviations (e.g. `responseTimeoutSeconds` not `respTimeout`)
- Terse, grammar-optional responses — brevity over completeness
- AI output artifacts go in `.claude/ai-helper/artifacts/`
