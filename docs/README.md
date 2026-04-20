# Playwright Test Suite — Boilerplate

A generic, ready-to-adapt Playwright test suite. Clone it, point it at your app, and you have a working API + E2E automation framework from day one.

---

## Table of Contents

- [What's included](#whats-included)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Update](#update)
- [Environment variables](#environment-variables)
- [Run](#run)
- [VS Code extensions](#vs-code-extensions)
- [Repo structure](#repo-structure)
- [How it works](#how-it-works)
- [Pipelines](#pipelines)
- [Docker](#docker)
- [AI agents](#ai-agents)
- [Resources](#resources)
- [Tech debt](#tech-debt)

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

---

## Environment variables

| Variable | Description |
|---|---|
| `SERVER` | Selects the active environment from `config/config.ts` (e.g. `example`) |
| `PASS` | Password used for authentication in token/service setup |

Copy `.env.example` to `.env` and set both values before running tests.

---

## Run

### Run all API tests
```sh
npm run test:api
```

### Run all E2E tests
```sh
npm run test:e2e
```

### Run a single test by name
```sh
npx playwright test -g "test title here"
```

### Run with Playwright UI (interactive mode)
```sh
npx playwright test --ui
```

### Run in VS Code

Install the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension. Use the **Testing** panel to run, debug, and watch tests. If the green run arrow is missing, reload the window: `Ctrl+Shift+P` → `Developer: Reload Window`. If it persists, open the **Testing** tab, expand the Playwright container and verify the correct project is checked.

---

## VS Code extensions

### Required
- **Playwright Test for VS Code** — test runner integration
- **Prettier** — formatter. Set as default: `Ctrl+Shift+P` → `Format Document With` → `Configure Default Formatter` → Prettier.

### Recommended
- [Pretty TS Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) — readable TypeScript error display
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) — browse all `TODO` and `FIXME` markers: `Ctrl+Shift+P` → `highlight`

---

## Repo structure

```
.github/
  prompts/            <- VS Code slash-command AI agents
  workflows/          <- CI pipeline templates
api/
  constants/          <- Shared API constants
  models/             <- TypeScript interfaces for response bodies
  services/           <- API service clients (static async factory pattern)
  tests/              <- API test files
  utils/              <- Utility runners (matched by apiUtils Playwright project)
config/
  config.ts           <- Named environments: url + parallel worker sets
  configHelper.ts     <- Reads SERVER env var, resolves active config + parallel set
docs/
  README.md           <- This file
  agent-templates/    <- AI agent files (soul, memory, reflections, log, goals)
  playwright-skills/  <- Playwright best-practice reference library
e2e/
  components/         <- Page Object Model: pages and reusable components
  tests/              <- E2E browser test files
fixtures/
  fixtures.ts         <- Merges all fixtures; extends expect with custom matchers
  services.ts         <- API service fixture (setup + teardown)
  webComponents.ts    <- UI component fixture
  webPages.ts         <- Page object fixture
helpers/
  browserHelper.ts    <- Utilities for spawning additional browser contexts
  customFunctions.ts  <- Shared helper functions
  customMatchers.ts   <- Custom matcher implementations
testData/             <- Static test data files
```

---

## How it works

### Config and parallel execution

The active environment is selected by the `SERVER` env variable. Each environment in `config/config.ts` defines a `url` and a `sets` array. Each set is a property bag consumed by one parallel worker. Max workers = number of sets (currently 2).

`TEST_PARALLEL_INDEX` (injected by Playwright) selects the correct set per worker via `getConfigSetByParallelIndex()` in `configHelper.ts`.

### Fixtures

`fixtures/fixtures.ts` merges three fixture files into the base `test` object:
- `services.ts` — instantiates API service clients (token fetch → service factory → `use` → teardown)
- `webPages.ts` — instantiates page objects bound to the current `page`
- `webComponents.ts` — instantiates reusable UI component objects

Custom matchers are added to `expect` via `baseExpect.extend(...)`.

### Services

All API services follow the **static async factory** pattern:
```ts
public static async instance(token?: string): Promise<MyService>
```
No constructors with side effects. Tests never call HTTP directly — always through service methods.

### Test structure rules

- Every test title must start with a `[TestCaseId]` prefix.
- Tests with 3+ actions must use `test.step`.
- No nested `test.step`.
- Every HTTP call must assert the response status.
- Cleanup goes in `afterAll`, wrapped in `try/catch/finally`.

### Playwright projects

| Project | Test directory | Match pattern |
|---|---|---|
| `api` | `api/tests/` | `**/*.test.ts` |
| `e2e` | `e2e/tests/` | `**/*.test.ts` |
| `apiUtils` | `api/utils/` | `**/*.utils.ts` |

### Reports

| Environment | Format |
|---|---|
| Local | HTML (auto-opens) |
| CI | List + JUnit XML (`reports/results.xml`) + HTML (never auto-opens) |

CI retries: 2. Local retries: 0.

---

## Pipelines

Pipeline files live in `.github/workflows/`. The design uses a **reusable template** (`api-test-template.yml`) called by a **trigger workflow** (`api-tests.yaml`).

### Trigger workflow — `api-tests.yaml`

Runs on:
- Every push to `main`
- Manual trigger from the GitHub Actions UI (**Actions** tab → select workflow → **Run workflow**)

Calls the template once per environment. A second environment job is commented out — uncomment and set the `env:` value to add it.

### Template — `api-test-template.yml`

Each job in the template runs on `ubuntu-latest` and does the following:

| Step | What happens |
|---|---|
| Checkout | `actions/checkout@v4` |
| Node.js | Version read from `.nvmrc` via `actions/setup-node@v4` |
| Install deps | `npm ci` |
| Install browsers | `npx playwright install --with-deps chromium` — also installs required OS libraries |
| Run tests | `npm run test:api` with `CI=true`, `SERVER` from workflow input, `PASS` from repo secret |
| Upload artifacts | HTML report (`playwright-report/`) + JUnit XML (`reports/`) — retained for 14 days |

### Secrets required

| Secret | Where to set |
|---|---|
| `PASS` | GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** |

### Adding an environment

In `api-tests.yaml`, uncomment the `test-someOtherEnv` job block and update the `env:` value to match a key in `config/config.ts`.

---

## Docker

Use Docker when you want a self-contained, reproducible run without touching your local Node or browser setup. The image is built from the official Playwright base (`mcr.microsoft.com/playwright:v1.59.1-noble`) which includes Ubuntu Noble, the correct Node version, and all browser system dependencies — no extra install steps needed.

### Build and run

```sh
# Build the image only
docker-compose build

# Build (if needed) and run the default command (test:api)
docker-compose up
```

### Override the command or environment at runtime

```sh
# Run E2E tests instead
docker-compose run playwright-tests npm run test:e2e

# Override the target environment
docker-compose run -e SERVER=custom_server playwright-tests

# Override both
docker-compose run -e SERVER=custom_server playwright-tests npm run test:e2e
```

### Environment variables

`docker-compose.yaml` reads from `.env` automatically. Copy `.env.example` to `.env` and set `SERVER` and `PASS` before running. `PASS` can also be passed at runtime with `-e PASS=...` — never hardcode a real value in `Dockerfile` or `docker-compose.yaml`.

### Why the `node_modules` volume exists

`docker-compose.yaml` mounts the repo root into the container so local source changes are picked up without a full rebuild. The anonymous volume on `/app/node_modules` prevents the host mount from overwriting the container-built `node_modules`, which contains Linux binaries incompatible with a Windows host.

---

## AI agents

Three agents are available as VS Code slash commands. In Copilot Chat (agent mode), type the command to activate.

| Command | Agent | Purpose |
|---|---|---|
| `/nat` | Personal assistant | Knows this repo deeply. Plans, edits, reviews architecture. |
| `/pr-review` | PR Reviewer | Reads a PR diff or local branch diff and produces a structured code review. |
| `/test-healer` | Test Healer | Reads a Playwright HTML failure report, diagnoses root causes, and fixes failing tests. |

Agent files (soul, memory, reflections, log, goals) live in `docs/agent-templates/`. All agents consult `docs/playwright-skills/` for testing best practices.

**Setup:** ensure `.vscode/settings.json` contains `"chat.promptFiles": true`.

### Nat — private context repo

Nat has a companion private repository ([myAgents](https://github.com/melkorinos/myAgents)) that stores `personal-memory.md` — personal life context that is gitignored from this public repo.

The file lives at `docs/agent-templates/nat/personal-memory.md` locally. It is loaded automatically when `/nat` is activated.

**On a new machine:**
```sh
# After cloning this repo, initialise the private repo inside the nat folder
cd docs/agent-templates/nat
git init
git remote add origin https://github.com/melkorinos/myAgents.git
git pull origin main
```

**Saving personal context changes:**
```sh
cd docs/agent-templates/nat
git add .
git commit -m "update personal context"
git push
```

---

## Resources

### Playwright official docs
- [Best practices](https://playwright.dev/docs/best-practices)
- [Locators](https://playwright.dev/docs/locators)
- [Fixtures](https://playwright.dev/docs/api/class-fixtures)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Custom matchers](https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend)

### This repo's skill library (`docs/playwright-skills/`)
- `core/` — locators, assertions & waiting, fixtures & hooks, POM, test data, suite structure, annotations
- `debugging/` — flaky tests, debugging, error testing, console errors
- `architecture/` — POM vs fixtures, test architecture, when to mock
- `advanced/` — authentication, authentication flows
- `infrastructure-ci-cd/` — CI/CD, reporting
- `testing-patterns/` — API testing

---

## Tech debt

Code is marked with two conventions. Browse them with the [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) extension (`Ctrl+Shift+P` → `highlight`).

- `// TODO:` — general improvements and tech debt
- `// FIXME:` — skipped or in-progress tests, with explanation

Current known items:
- Replace `console.log` in `api/services/someService.ts` with a proper logger
- Test skipping with tabs — not yet implemented
- File upload test — not yet implemented