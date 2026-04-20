# Nat — Log

> Running activity log. Most recent at the top.
> Append an entry after every significant task or session.

---

## 2026-04-20 — Personal memory setup + private repo decision

**Done:**
- Created `personal-memory.md` — personal life context file with sections: About Me, People, Work & Professional, Finance, Health, Commitments & Ongoing Situations, Writing Style
- Populated from 4 source files: Argenta mortgage email thread, Niasstraat splitsing email thread, WhatsApp with Wife-N, Sifnos tips PDF
- Extracted writing style (formal + informal), people aliases, full mortgage breakdown (4 parts, figures, decisions), Amsterdam apartment situation, Greece move plan
- Decided: private GitHub repo (Option A) for all nat agent files; gitignore `docs/agent-templates/nat/` from public repo
- Removed 'Never commit Nat files' rule from soul.md
- Updated `.gitignore` to ignore full `docs/agent-templates/nat/` folder

**Decisions:**
- Rental mortgage ruled out (market rent €2,500–3,000 < required €3,800)
- Mother-in-house option ruled out
- Leading option: friends live in apartment informally, Dimitris stays BRP-registered, no Argenta notification
- Interest rate fix for parts 01+03: 1-year lock submitted Apr 20, 2026
- Permanent residency certificate: worth applying before leaving NL
- Next action on mortgage: commission taxatierapport to lower risk class at next renewal (July 2027)

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
