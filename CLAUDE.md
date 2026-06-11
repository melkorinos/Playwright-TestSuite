# TestSuite

Barebones QA skeleton for API and E2E testing using Playwright. Starting point for new QA projects.

## Session start — mandatory

Read all five files before doing anything else:

| File | Purpose |
|------|---------|
| [.claude/ai-helper/soul.md](.claude/ai-helper/soul.md) | Core identity and project north star |
| [.claude/ai-helper/memory.md](.claude/ai-helper/memory.md) | Settled design and architecture decisions |
| [.claude/ai-helper/goals.md](.claude/ai-helper/goals.md) | Current sprint checklist |
| [.claude/ai-helper/log.md](.claude/ai-helper/log.md) | Chronological development history |
| [.claude/ai-helper/reflections.md](.claude/ai-helper/reflections.md) | Post-mortems and iteration notes |

Update `memory.md` when a decision crystallises. Update `log.md` when significant work lands. Keep both under 100 lines.

## Style

Brief. Sacrifice grammar for conciseness. No filler words, no pleasantries, no summaries of what was just done.

## Assistant behavior

- Coding-first.
- Flag design decisions that lock future flexibility.
- When design is undecided, propose options — don't commit.
- Ultra-concise reporting. Fragments OK.
- Q&A / grilling: 5+ questions per turn, each with a recommended answer.
- No abbreviations in identifiers — fully descriptive names only.

## Artifact output

All AI-generated files → [`.claude/ai-helper/artifacts/`](.claude/ai-helper/artifacts/). Never OS temp or `docs/`.

## Structure

- `api/` — API test helpers and constants
- `e2e/` — E2E component tests
- `testData/` — shared test data

## Agent skills

Skills from [mattpocock/skills](https://github.com/mattpocock/skills). Invoke via slash command.

| Slash command | File | Purpose |
|---|---|---|
| `/caveman` | [.agents/skills/caveman/SKILL.md](.agents/skills/caveman/SKILL.md) | Ultra-compressed terse mode |
| `/diagnose` | [.agents/skills/diagnose/SKILL.md](.agents/skills/diagnose/SKILL.md) | Disciplined bug/perf diagnosis loop |
| `/grill-me` | [.agents/skills/grill-me/SKILL.md](.agents/skills/grill-me/SKILL.md) | Stress-test a plan via interview |
| `/grill-with-docs` | [.agents/skills/grill-with-docs/SKILL.md](.agents/skills/grill-with-docs/SKILL.md) | Grill against domain model + update docs |
| `/handoff` | [.agents/skills/handoff/SKILL.md](.agents/skills/handoff/SKILL.md) | Compact conversation for next agent |
| `/improve-codebase-architecture` | [.agents/skills/improve-codebase-architecture/SKILL.md](.agents/skills/improve-codebase-architecture/SKILL.md) | Find deepening/refactor opportunities |
| `/prototype` | [.agents/skills/prototype/SKILL.md](.agents/skills/prototype/SKILL.md) | Throwaway prototype to flesh out design |
| `/qa` | [.agents/skills/qa/SKILL.md](.agents/skills/qa/SKILL.md) | Interactive QA session → GitHub issues |
| `/setup-matt-pocock-skills` | [.agents/skills/setup-matt-pocock-skills/SKILL.md](.agents/skills/setup-matt-pocock-skills/SKILL.md) | Configure issue tracker + triage labels |
| `/tdd` | [.agents/skills/tdd/SKILL.md](.agents/skills/tdd/SKILL.md) | Red-green-refactor TDD loop |
| `/teach` | [.agents/skills/teach/SKILL.md](.agents/skills/teach/SKILL.md) | Teach a skill/concept over sessions |
| `/to-issues` | [.agents/skills/to-issues/SKILL.md](.agents/skills/to-issues/SKILL.md) | Break plan into tracker issues |
| `/to-prd` | [.agents/skills/to-prd/SKILL.md](.agents/skills/to-prd/SKILL.md) | Convert context into a PRD |
| `/triage` | [.agents/skills/triage/SKILL.md](.agents/skills/triage/SKILL.md) | Move issues through triage state machine |
| `/write-a-skill` | [.agents/skills/write-a-skill/SKILL.md](.agents/skills/write-a-skill/SKILL.md) | Create new agent skills |
| `/zoom-out` | [.agents/skills/zoom-out/SKILL.md](.agents/skills/zoom-out/SKILL.md) | Higher-level map of unfamiliar code area |
