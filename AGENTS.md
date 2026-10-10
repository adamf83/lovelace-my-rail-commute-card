# AGENTS.md

This file helps AI agents understand how to work effectively in this repository.

## Working Agreements

Unless the user asks otherwise:

1. **Answer questions from the code.** If the user asks a question, always refer to the code (read the relevant files) instead of guessing or answering from memory.
2. **Code changes go through a PR, then merge.** For any code change, create a branch, open a pull request, and merge it. There are no CI tests in this repo, so there is nothing to wait for before merging. Report back once merged.
3. **Never close GitHub issues.** When working on a GitHub issue, do not close it (including via closing keywords like `Fixes #123` / `Closes #123` in PRs or commits, or by using the issue tools) unless the user explicitly asks. The user prefers to close issues manually. Reference issues without closing keywords instead (e.g. `Refs #123`, `Related to #123`).

## Project Overview

**My Rail Commute Card** is a custom Lovelace card for Home Assistant that displays departure information from the [My Rail Commute](https://github.com/adamf83/my-rail-commute) integration. Installable via [HACS](https://hacs.xyz/).

## Repository Layout

```
src/my-rail-commute-card.js   # Main card (entry point for the build)
src/editor.js                 # Card editor UI
src/styles.js                 # Card styles
src/utils.js                  # Shared helpers
dist/my-rail-commute-card.js  # Built bundle (committed; what HACS serves)
rollup.config.js              # Build config (Rollup + Babel + Terser)
hacs.json                     # HACS metadata
examples/                     # Example Lovelace configs
.github/workflows/            # hacs.yaml, release.yaml (no tests)
```

## Build

```bash
npm install
npm run build   # rollup -c: src/my-rail-commute-card.js -> dist/my-rail-commute-card.js
npm run watch   # rebuild on change
```

The `dist/` bundle is committed, so rebuild it and include it in the PR whenever `src/` changes.

## Conventions

- Built with [Lit](https://lit.dev/) and `custom-card-helpers`.
- Update `CHANGELOG.md` (and the `package.json` version) for user-visible changes.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `docs`, `chore`, ...).

## Further Reading

- `README.md` — configuration options and usage
- `QUICKSTART.md` — getting started
