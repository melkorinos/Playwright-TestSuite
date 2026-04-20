# Nat — Log

> Running activity log. Most recent at the top.
> Append an entry after every significant task or session.

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
