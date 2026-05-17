# Repo Cleanup & GitHub Issues Setup

**Date:** 2026-05-17
**Status:** Approved

## Goal

Rename all sub-project folders to a consistent convention, move related docs, remove stale files, and convert all open todos into tracked GitHub issues. Feature work follows in a separate cycle.

## Naming Convention

| Prefix | Meaning |
|--------|---------|
| `tool-` | Interactive tool with real utility |
| `demo-` | Demonstration or prototype |

## Phase 1: Folder Renames & File Moves

All renames use `git mv` to preserve history.

| From | To |
|------|----|
| `character-height-calculator/` | `tool-display-legibility/` |
| `character-height-checker/` | `tool-character-size/` |
| `theming/` | `demo-theming/` |

**Files updated after rename:**
- `index.html` (root): update two hrefs (`character-height-calculator/index.html` → `tool-display-legibility/index.html`, `theming/index.html` → `demo-theming/index.html`)
- `CLAUDE.md` (root): update all paths referencing the old folder names

**Files deleted:**
- `tool-display-legibility/CLAUDE.md` — superseded by root `CLAUDE.md`

**Docs preserved:**
- `tool-display-legibility/docs/` stays in place after the folder rename (no extra move needed)

All changes land in a single commit: `chore: rename folders to tool-/demo- convention`.

## Phase 2: GitHub Issues

**Labels to create:**
- `tool-display-legibility`
- `tool-character-size`

**Issues to file:**

| # | Title | Label |
|---|-------|-------|
| 1 | Include arc-minute results in screenshot export | `tool-display-legibility` |
| 2 | Auto-calculate on all input changes | `tool-display-legibility` |
| 3 | Translate remaining German content | `tool-display-legibility` |
| 4 | Expand README | `tool-display-legibility` |
| 5 | Separate character-height check from full assessment script | `tool-character-size` |
| 6 | Translate script and README to English | `tool-character-size` |
| 7 | Add CSS styling | `tool-character-size` |
| 8 | Decide on delivery method (extension, bookmarklet, npm, build pipeline) | `tool-character-size` |

**README cleanup (single commit after issues are filed):**
- `tool-character-size/README.md`: remove TODO lists; keep description, feature list, and how-it-works sections
- `tool-display-legibility/CLAUDE.md`: already deleted in Phase 1 — Phase 2+ todos migrate to issues

## Out of Scope

- Feature implementation (separate brainstorm + plan per feature)
- Top-level README (deferred)
- GitHub project board, milestones, branch protection
