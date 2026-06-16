# Issue tracker

Issues for this repository live in GitHub Issues.

## Workflow

Use the GitHub CLI (`gh`) to read and write issues for this repo.

Examples:
- List open issues: `gh issue list`
- View an issue: `gh issue view <number>`
- Create an issue: `gh issue create`
- Edit an issue: `gh issue edit <number>`
- Comment on an issue: `gh issue comment <number> --body "..."`

## Notes for agent skills

Skills that create or triage issues should assume GitHub is the source of truth.

When a skill needs to create structured work items, it should create or update GitHub issues rather than local markdown files.

If the repository remote is configured later, GitHub issues should still remain the default tracker unless this file is changed.
