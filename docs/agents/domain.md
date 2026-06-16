# Domain docs

This repository uses a single-context documentation layout.

## Layout

- Root context document: `CONTEXT.md`
- Architecture decision records: `docs/adr/`

## Consumer rules

Skills that need project domain context should read `CONTEXT.md` first.

If a change is shaped by an existing architectural decision, skills should read the relevant files in `docs/adr/` before proposing or implementing changes.

If `CONTEXT.md` or `docs/adr/` does not exist yet, treat that as missing documentation rather than permission to guess. Call that out explicitly in the work.

## Notes

This is not a multi-context repo. Do not look for a root `CONTEXT-MAP.md` unless the repo is reconfigured later.
