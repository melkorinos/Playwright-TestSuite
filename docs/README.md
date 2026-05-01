# Playwright Test Suite — Boilerplate

A generic, ready-to-adapt Playwright test suite. Clone it, point it at your app, and you have a working API + E2E automation framework from day one.

---

## Table of Contents

- [What's included](#whats-included)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Update](#update)
- [Run](#run)
- [VS Code extensions](#vs-code-extensions)
- [Repo structure](#repo-structure)
- [How it works](#how-it-works)
- [Pipelines](#pipelines)
- [Docker](#docker)
- [AI agents](#ai-agents)

---

## What's included

| Area | Description |
|---|---|
| API tests | Headless HTTP-level tests using Playwright's request context |
| E2E tests | Browser-driven tests using Playwright + Page Object Model |
| Typed fixtures | Merges services, pages, and components into the base `test` object |
| Service layer | Static async factory pattern — auth-aware API wrappers |
| Config system | Multi-environment, parallel-worker-aware config |
| Custom matchers | Extendable `expect` with project-specific assertions |
| CI pipeline | Example GitHub Actions / Azure DevOps pipeline templates |
| Docker support | Run tests in a container with a single command |
| AI agents | PR reviewer, test healer, and personal assistant — activated via VS Code slash commands |
| Skills library | Playwright best-practice reference docs in `docs/playwright-skills/` |

---

## Prerequisites

- [Node.js LTS](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

---

## Install

1. Clone the repo and open the root folder in VS Code.
2. Install TypeScript and ts-node globally:
   ```sh
   npm install -g ts-node typescript
   ```
3. Install dependencies (use `ci` to avoid unintended updates during regular work):
   ```sh
   npm ci
   ```
4. Download Playwright browser drivers:
   ```sh
   npx playwright install
   ```
5. Copy `.env.example` to `.env` and fill in the values:
   ```sh
   cp .env.example .env
   ```

---

## Update

1. Update Playwright to latest:
   ```sh
   npm install @playwright/test@latest
   npx playwright install
   ```
2. Verify the installed version matches `package.json`:
   ```sh
   npx playwright --version
   ```

### `.nvmrc`

Pins the Node.js version for this project. The CI pipeline reads it via `actions/setup-node@v4` to guarantee the same Node version runs locally and in CI. If you upgrade Node, update this file. If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the repo root to switch automatically.

---

## Run

```sh
npm run test:api       # all API tests
npm run test:e2e       # all E2E tests
npx playwright test -g "test title"   # single test by name
npx playwright test --ui              # interactive UI mode
```

**VS Code:** install the Playwright Test extension and use the **Testing** panel. If the run arrow is missing, reload the window: `Ctrl+Shift+P` → `Developer: Reload Window`.

---

## VS Code extensions

### Required
- **Playwright Test for VS Code** — test runner integration
- **Prettier** — formatter. Set as default: `Ctrl+Shift+P` → `Format Document With` → `Configure Default Formatter` → Prettier.

### Recommended
- [Pretty TS Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) — readable TypeScript error display
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) — browse all `TODO` and `FIXME` markers: `Ctrl+Shift+P` → `highlight`

> **Tech debt conventions:** `// TODO:` marks general improvements; `// FIXME:` marks skipped or in-progress tests. Use TODO Highlight to browse them.

### `.vscode/settings.json`

This file is committed intentionally. It contains `"chat.promptFiles": true`, which is required for VS Code Copilot Chat to discover the AI agent prompt files in `.github/prompts/` and expose them as slash commands (`/pr-review`, `/test-healer`). Without it, the agents are invisible to Copilot.

---

## Repo structure

```
.github/
  prompts/            <- VS Code slash-command AI agents
  workflows/          <- CI pipeline templates
api/
  constants/          <- Shared API constants
  models/             <- TypeScript interfaces for response bodies
  services/           <- API service clients (async create() factory pattern)
  tests/              <- API test files
  utils/              <- Utility runners (matched by apiUtils Playwright project)
config/
  config.ts           <- Named environments: url + workerSlots (one slot per parallel worker)
  configHelper.ts     <- Reads SERVER env var; exposes getUrl(), getConfigByServer(), getWorkerSlot()
docs/
  README.md           <- This file
  agent-templates/    <- AI agent files (soul, memory, reflections, log, goals)
  playwright-skills/  <- Playwright best-practice reference library
e2e/
  components/         <- Page Object Model: pages and reusable components
  tests/              <- E2E browser test files
fixtures/
  fixtures.ts         <- Merges all fixtures; extends expect with custom matchers
  services.ts         <- Worker-scoped API service fixtures (servicesAgent1, servicesAgent2)
  browserAgents.ts    <- Browser agent fixtures (browserAgent1, browserAgent2)
helpers/
  customFunctions.ts  <- Shared helper functions
  customMatchers.ts   <- Custom matcher implementations
testData/             <- Static test data files
```

---

## How it works

1. **Environment selected** — `SERVER` env var picks the active environment from `config/config.ts`. Each environment defines a `url` and a `workerSlots` array (one slot per parallel worker). `getWorkerSlot()` in `configHelper.ts` reads `TEST_PARALLEL_INDEX` (injected by Playwright) and returns the correct slot — ensuring parallel workers never collide on shared state.

2. **Fixtures merged** — `fixtures/fixtures.ts` merges `services.ts` and `browserAgents.ts` into the base `test` object, and extends `expect` with custom matchers. Fixtures are lazy — nothing is initialised until a test actually references it.

3. **Service agents initialised** — `servicesAgent1` and `servicesAgent2` are worker-scoped. Each calls `TokenService.create(baseUrl)` → `getToken(password)` → `SomeService.create(baseUrl, token)`. Credentials come from `AGENT1_PASSWORD` / `AGENT2_PASSWORD` env vars. No singletons — each agent owns its full lifecycle.

4. *(E2E only)* **Browser agents initialised** — `browserAgent1` wraps the built-in `page` fixture (inherits all project config). `browserAgent2` launches a fully independent browser process via the `playwright` fixture — use it when a test needs two simultaneous sessions. Each agent delivers `{ webPages, webComponents }`.

5. **Tests run** — always through service methods or page objects; never raw HTTP calls or inline locators.

6. **Worker teardown** — service agents are disposed after all tests in a worker finish. Browser agents are torn down by Playwright automatically.

---

## Pipelines

Pipeline files live in `.github/workflows/`. A **trigger workflow** (`api-tests.yaml`) calls a **reusable template** (`api-test-template.yml`). The trigger runs on every push to `main` and supports manual dispatch from the GitHub Actions UI.

Each template job checks out the repo, installs Node (version from `.nvmrc`), runs `npm ci`, installs Playwright browsers (`--with-deps chromium`), runs API and E2E tests, then uploads the HTML report and JUnit XML as artifacts (retained 14 days). Secrets (`AGENT1_PASSWORD`, `AGENT2_PASSWORD`) are passed via `secrets: inherit` — set them under **Settings → Secrets and variables → Actions**.

To add an environment: uncomment the second job block in `api-tests.yaml` and update the `env:` value to match a key in `config/config.ts`.

---

## Docker

Built from `mcr.microsoft.com/playwright` — includes Ubuntu Noble, the correct Node version, and all browser dependencies. See inline comments in `Dockerfile` and `docker-compose.yaml` for details.

```sh
docker-compose build                                           # build image
docker-compose up                                              # run default (test:api)
docker-compose run playwright-tests npm run test:e2e           # run E2E instead
docker-compose run -e SERVER=custom_server playwright-tests    # override environment
```

Copy `.env.example` to `.env` and fill in values — `docker-compose.yaml` reads it automatically. Credentials can also be passed at runtime with `-e AGENT1_PASSWORD=...`. Never hardcode real values in `Dockerfile` or `docker-compose.yaml`.

---

## AI agents

Two agents are available as VS Code slash commands. In Copilot Chat (agent mode), type the command to activate.

| Command | Agent | Purpose |
|---|---|---|
| `/pr-review` | PR Reviewer | Reads a PR diff or local branch diff and produces a structured code review. |
| `/test-healer` | Test Healer | Reads a Playwright HTML failure report, diagnoses root causes, and fixes failing tests. |

Agent files (soul, memory, reflections, log, goals) live in `docs/agent-templates/`. All agents consult `docs/playwright-skills/` for testing best practices.

**Setup:** ensure `.vscode/settings.json` contains `"chat.promptFiles": true`. Then open Copilot Chat in **Agent mode** and type `/pr-review` or `/test-healer`.

### Skills libraries

The agents and skill docs are informed by two external reference libraries:

- [mattpocock/skills](https://github.com/mattpocock/skills) — TypeScript and general engineering skills
- [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) — Playwright-specific best practices
