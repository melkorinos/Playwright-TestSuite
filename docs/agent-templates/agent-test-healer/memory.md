# Test Healer — Memory

> Stable knowledge accumulated from healing sessions.
> Update after every session: add new failure patterns, repo knowledge, fix approaches.
> Max 10 entries per section. Prune or merge to stay under.

---

## Failure Patterns Seen

| Pattern | Cause | Fix |
|---|---|---|
| `toBeOK can be only used with APIResponse object` | `expect(response.status())` passes a number instead of the `APIResponse` | Change to `expect(response).toBeOK()` |

---

## Repo-Specific Fix Knowledge

- `getEndpoint()` and `postEndpoint()` in `api/services/someService.ts` both return `Promise<APIResponse>` — always assert with `expect(response.status(), { message: await response.text() }).toBe(200)` (explicit status + failure context)
- Never use `toBeOK()` — it accepts 200–299, too broad; a 204 where 200 is expected would silently pass
- The `{ message: await response.text() }` option surfaces the response body in the failure output — always include it on status assertions
- CI uses 2 retries — a test failing all 3 attempts is a genuine code bug, not flakiness

---

## Things to Watch For

- Any status assertion missing `{ message: await response.text() }` — flag and add it
- If a test passes locally but fails in CI, check env var injection (dotenvx messages visible in logs indicate `.env` is being read)
