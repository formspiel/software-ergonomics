# Repo Cleanup & GitHub Issues — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename sub-project folders to the `tool-`/`demo-` convention, update cross-references, delete the superseded inner CLAUDE.md, then create GitHub labels and file 8 tracked issues. Clean up the README in the same pass.

**Architecture:** No build system. All changes are file renames, text edits, and GitHub API calls. The two HTML tools continue to work after the rename because the only external reference is the root `index.html` href, which is updated in the same commit.

**Spec:** `docs/superpowers/specs/2026-05-17-repo-cleanup-design.md`

---

## Task 1: Rename folders and update cross-references (Phase 1)

All renames, edits, and the one deletion land in a single commit.

**Files touched:**
- Rename: `character-height-calculator/` → `tool-display-legibility/`
- Rename: `character-height-checker/` → `tool-character-size/`
- Rename: `theming/` → `demo-theming/`
- Modify: `index.html` (root) — update two hrefs
- Modify: `CLAUDE.md` (root) — update all folder-name references
- Delete: `tool-display-legibility/CLAUDE.md` (was `character-height-calculator/CLAUDE.md`)

---

- [ ] **Step 1.1: Rename the three folders with `git mv`**

Run each command from the repo root:

```bash
git mv character-height-calculator tool-display-legibility
git mv character-height-checker tool-character-size
git mv theming demo-theming
```

- [ ] **Step 1.2: Delete the superseded inner CLAUDE.md**

```bash
git rm tool-display-legibility/CLAUDE.md
```

- [ ] **Step 1.3: Update the root `index.html` hrefs**

In `index.html`, replace:

```html
        <a href="character-height-calculator/index.html" class="project-card">
```

with:

```html
        <a href="tool-display-legibility/index.html" class="project-card">
```

And replace:

```html
        <a href="theming/index.html" class="project-card">
```

with:

```html
        <a href="demo-theming/index.html" class="project-card">
```

- [ ] **Step 1.4: Update the root `CLAUDE.md` folder references**

Apply these replacements in `CLAUDE.md`:

| Old text | New text |
|----------|----------|
| `character-height-calculator/index.html` | `tool-display-legibility/index.html` |
| `**\`character-height-calculator/\`**` | `**\`tool-display-legibility/\`**` |
| `character-height-calculator/index.html` (in Calculator Architecture section) | `tool-display-legibility/index.html` |
| `character-height-calculator/presets.json` | `tool-display-legibility/presets.json` |
| `**\`character-height-checker/\`**` | `**\`tool-character-size/\`**` |
| `**\`theming/\`**` | `**\`demo-theming/\`**` |
| `Edit \`character-height-calculator/presets.json\`` | `Edit \`tool-display-legibility/presets.json\`` |

The updated text in `CLAUDE.md` should read:

```
To run locally: open any `index.html` in a browser. Because `tool-display-legibility/index.html` fetches `presets.json` via `fetch()`, it needs a local HTTP server (e.g. `python3 -m http.server 8080` from the repo root) rather than a `file://` URL.

...

**`tool-display-legibility/`** — the primary tool. Calculates minimum character sizes for ergonomic screen legibility (ISO 9241-303). Key files:
- `index.html` — all logic is inline JS; no external scripts except `html2canvas` CDN
- `presets.json` — 46 device presets in 4 categories (`Office Display`, `Laptop`, `Tablet`, `Smartphone`), schema: `{ key, label, width, height, diagonal, dpr? }`
- `style.css` — styling; uses `light-dark()` CSS function for auto dark mode

**`tool-character-size/`** — a separate, unfinished JS bookmarklet/extension script (`coc-assessement.js`) for in-browser accessibility checks. Partially in German, not integrated with the calculator.

**`demo-theming/`** — a demo joke generator demonstrating the `light-dark()` CSS function with manual theme switching (Auto/Light/Dark) via `localStorage`.

## Calculator Architecture

All calculator logic lives in `tool-display-legibility/index.html`:

...

## Adding Device Presets

Edit `tool-display-legibility/presets.json` directly. ...
```

- [ ] **Step 1.5: Verify the rename is clean**

```bash
find . -not -path './.git/*' -type f | sort
```

Confirm:
- `tool-display-legibility/index.html`, `tool-display-legibility/presets.json`, `tool-display-legibility/style.css` all present
- `tool-display-legibility/CLAUDE.md` is gone
- `tool-display-legibility/docs/` subtree is intact
- `tool-character-size/README.md` and `tool-character-size/coc-assessement.js` present
- `demo-theming/index.html`, `demo-theming/script.js`, `demo-theming/styles.css` present
- No remaining references to `character-height-calculator/`, `character-height-checker/`, or `theming/` in tracked files

- [ ] **Step 1.6: Commit**

```bash
git add -A
git commit -m "chore: rename folders to tool-/demo- convention"
```

---

## Task 2: Create GitHub labels

Labels must exist before issues can be filed.

- [ ] **Step 2.1: Create label `tool-display-legibility`**

Use the GitHub MCP tool `mcp__github__issue_write` (or equivalent label-creation endpoint) to create a label on `formspiel/software-ergonomics`:

- Name: `tool-display-legibility`
- Color: `#0075ca` (standard blue)
- Description: `Issues for the Display Legibility Calculator tool`

- [ ] **Step 2.2: Create label `tool-character-size`**

- Name: `tool-character-size`
- Color: `#e4e669` (standard yellow)
- Description: `Issues for the Character Size Checker tool`

- [ ] **Step 2.3: Verify both labels appear in the repo's Labels page**

---

## Task 3: File GitHub issues

File all 8 issues in order. Use the label created in Task 2 for each.

**Issues for `tool-display-legibility`:**

- [ ] **Step 3.1** — Title: `Include arc-minute results in screenshot export`
  Label: `tool-display-legibility`
  Body:
  ```
  The "Copy Screenshot" and "Download Screenshot" buttons capture only the zoom table.
  The arc-minute thresholds section (shown when a viewing distance is provided) is excluded.

  Both sections should be captured together in a single screenshot.
  ```

- [ ] **Step 3.2** — Title: `Auto-calculate on all input changes`
  Label: `tool-display-legibility`
  Body:
  ```
  Currently the user must click Calculate after changing any field.
  The tool should recalculate automatically whenever any input changes (pixel width, height, diagonal, scale factor, viewing distance).
  The Calculate button can remain for explicit triggering but should not be required.
  ```

- [ ] **Step 3.3** — Title: `Translate remaining German content`
  Label: `tool-display-legibility`
  Body:
  ```
  The accessibility section at the bottom of the page contains German text (labels, descriptions, alt-text hint).
  All user-facing content should be in English.
  ```

- [ ] **Step 3.4** — Title: `Expand README`
  Label: `tool-display-legibility`
  Body:
  ```
  The current README covers basic usage and preset editing.
  Expand it to include:
  - What the tool calculates and why (ISO 9241-303 context)
  - Explanation of the zoom table (dpx, CSS px, mm, colour coding)
  - Explanation of the arc-minute section and thresholds (16′/20′/22′)
  - Scale Factor / DPR field explanation
  - Screenshot export instructions
  ```

**Issues for `tool-character-size`:**

- [ ] **Step 3.5** — Title: `Separate character-height check from full assessment script`
  Label: `tool-character-size`
  Body:
  ```
  `coc-assessement.js` is a full accessibility audit script; the character-height check is just one part.
  Extract the character-height logic into a standalone, focused script.
  ```

- [ ] **Step 3.6** — Title: `Translate script and README to English`
  Label: `tool-character-size`
  Body:
  ```
  The script and README contain German text (comments, output labels, how-to sections).
  All user-facing content and code comments should be in English.
  ```

- [ ] **Step 3.7** — Title: `Add CSS styling`
  Label: `tool-character-size`
  Body:
  ```
  The tool has no visual styling.
  Add CSS (inline or a linked stylesheet) to make the output readable in a browser context.
  ```

- [ ] **Step 3.8** — Title: `Decide on delivery method (extension, bookmarklet, npm, build pipeline)`
  Label: `tool-character-size`
  Body:
  ```
  The current script works as an Edge extension or bookmarklet (see README), but delivery method hasn't been decided.
  Options to evaluate: browser extension, bookmarklet, npm package, build pipeline integration.
  Pick one and document it as the target before further development.
  ```

---

## Task 4: Clean up tool-character-size README (Phase 2 wrap-up)

- [ ] **Step 4.1: Remove TODO lists from `tool-character-size/README.md`**

The TODO items in the README are now tracked as GitHub issues (filed in Task 3). Remove:
- The top-level `# TODO` section and its 4 checklist items
- The `### TODO` subsection under "Unterstützte Schriftarten" and its 1 checklist item

Keep all other content: description, the blockquote, feature list ("Was kann geprüft werden"), how-to sections ("Anleitung zur Einbindung", "Anleitung zur Verwendung"), and the font details.

The file after editing should start with `# CoC Character Height checker` and the introductory paragraph, then the blockquote, then jump directly to `# How It Works`.

- [ ] **Step 4.2: Commit**

```bash
git add tool-character-size/README.md
git commit -m "docs: remove TODO lists from tool-character-size README (tracked as issues)"
```

---

## Task 5: Push

- [ ] **Step 5.1: Push the branch**

```bash
git push -u origin claude/write-implementation-plan-hdHxx
```
