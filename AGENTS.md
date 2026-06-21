## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage uses the default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context layout with one root `CONTEXT.md` and `docs/adr/`. See `docs/agents/domain.md`.

### Design Context

Design strategy lives in `PRODUCT.md` and the visual system lives in `DESIGN.md`. Use both before making frontend changes; `PRODUCT.md` sets voice and anti-references, while `DESIGN.md` sets tokens, component rules, and guardrails.

### Session retrospectives

Periodic workflow-adherence audits of recent sessions are produced by the `retrospective` skill. Use the skill after non-trivial sessions — multi-agent delegations, large refactors, or anything that touched permissions. See `C:\Users\FEUY\.agents\skills\retrospective\SKILL.md`. Findings land in `C:\Users\FEUY\.config\opencode\` so they survive across sessions.

## Project conventions

### Stack

- **Framework:** Next.js 16 (app router, Server Components by default)
- **CMS:** PayloadCMS 3.85 (local API preferred, access control is security-critical)
- **Styling:** TailwindCSS 4 (use existing custom components; do not invent new design tokens)
- **Package manager:** pnpm
- **Runtime:** Node 18+

### Verification commands

Run these in order before declaring a change complete:

1. `pnpm typecheck`
2. `pnpm lint`
3. `pnpm test`

Use Playwright for browser/UI validation. Do NOT run `pnpm build` unless the change affects build-time behavior, Next.js config, Payload config, routing, middleware, or deployment-sensitive code.

### Test layout

- Unit tests: `tests/unit/` (Vitest)
- Integration tests: `tests/int/` (Vitest, hits Payload directly)
- E2E tests: `tests/e2e/` (Playwright)

### Key paths

- Collections: `src/collections/`
- Library code: `src/lib/`
- Frontend routes: `src/app/(frontend)/`
- Admin routes: `src/app/(payload)/`
- Components: `src/components/`
- Domain glossary: `CONTEXT.md`
- Architectural decisions: `docs/adr/`

### Domain

Read `CONTEXT.md` before any work that touches Projects, Case Studies, or the Work section. The glossary is the source of truth for terminology.

### Decision flow

- Domain term -> update `CONTEXT.md` (Tech Lead, with user approval)
- Architectural decision -> write `docs/adr/NNNN-title.md` (Tech Lead, with user approval)
- Work item -> create a GitHub issue (DevOps, via `to-issues` skill)