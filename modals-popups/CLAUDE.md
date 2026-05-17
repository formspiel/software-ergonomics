# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A vanilla HTML/CSS/JavaScript demo project showcasing and comparing different modal, pop-up, and dialog interaction patterns for the web. No build tools, frameworks, or package manager — static files served directly.

## Running the Project

Open `index.html` in a browser. No build step required. The `Pro vs Con/` subdirectory is an alternate version comparing dialog approaches side-by-side.

## Architecture

### Core Files

- `index.html` — Main demo page with 6 dialog/popup examples
- `scripts.js` — All JavaScript (~500 lines), single file
- `style.css` — Component styles
- `coc-style.css` — Base theme (CSS variables, dark/light mode)
- `newWindow.html` — Content loaded into pop-up browser windows

### Dialog System (`scripts.js`)

The JS is organized around an `aria` namespace with two main pieces:

**`aria.Dialog` class** — ARIA-compliant modal implementation based on W3C WAI-ARIA patterns. Manages:
- Focus trapping within open dialogs (`trapFocus`)
- A stack (`aria.OpenDialogList`) to support nested/stacked dialogs
- ESC key handling via `aria.handleEscape()`
- Dialog lifecycle: `openDialog()`, `closeDialog()`, `replaceDialog()`

**`aria.Utils`** — Focus traversal helpers:
- `focusFirstDescendant()` / `focusLastDescendant()` — used to implement focus trapping

### Interaction Patterns Demonstrated

| Pattern | Key function | Mechanism |
|---|---|---|
| Modal Dialog | `openDialog()` | ARIA Dialog class with focus trap |
| Pop-up Window | `newPopup()` | `window.open()` |
| Simple Pop-up | `togglePopUp()` | CSS visibility toggle |
| Abbreviation tooltips | — | HTML `<abbr>` elements |
| Alert | — | Custom + native `alert()` |

### CSS Architecture

- CSS variables in `coc-style.css` drive theming (dark/light, high-contrast)
- Responsive breakpoint at 640px
- Accessibility-focused: explicit focus states, semantic HTML throughout

## Editor Config

`.editorconfig` enforces tabs (size 2) by default, 4-space indent for PHP, LF line endings, UTF-8 encoding.
