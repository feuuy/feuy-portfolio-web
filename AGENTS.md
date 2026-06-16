## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage uses the default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context layout with one root `CONTEXT.md` and `docs/adr/`. See `docs/agents/domain.md`.

### Design Context

Design strategy lives in `PRODUCT.md` and the visual system lives in `DESIGN.md`. Use both before making frontend changes; `PRODUCT.md` sets voice and anti-references, while `DESIGN.md` sets tokens, component rules, and guardrails.
