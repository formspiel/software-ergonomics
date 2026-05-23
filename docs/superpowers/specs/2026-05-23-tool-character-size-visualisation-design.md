# Design: tool-character-size-visualisation

**Date:** 2026-05-23  
**Status:** Draft  
**Folder:** `tool-character-size-visualisation/`

## Goal

Redesign the font size visualisation tool to match the project's design system (shared.css, CSS variables, `light-dark()` theming) while preserving its core value: a 3-column side-by-side comparison of System, Google, and Allianz Neo fonts rendered at a range of sizes.

## Files

| File | Purpose |
|---|---|
| `index.html` | All markup and inline JS — no external scripts |
| `style.css` | Tool-specific layout; shared.css handles base styles |

`index.html` links `../shared.css` then `./style.css`.

## Page Structure

```
<h1>Font Size Visualisation <span class="status status-draft">Draft</span></h1>
<p class="subtitle">Compare how System, Google, and Allianz Neo fonts render at small sizes — spot counter clarity and character confusion at a glance.</p>
<fieldset>          ← sample text input + weight toggle
<div class="grid">  ← 3-column full-width comparison grid
  <section>         ← System font column
  <section>         ← Google Font column
  <section>         ← Allianz Neo W04 column
<a class="back" href="../index.html">← Back to projects</a>
```

## Controls (fieldset)

- **Sample text** — `<input type="text">`, default: `E aecg · Il1ij · 0Oo · bd · rn/m — Hamburgefons`. Updates all columns live on `input`.
- **Weight toggle** — two buttons (Regular / Bold) with `aria-pressed`. Applies to System and Google columns only; Allianz column weight is encoded in its select value.

## Grid Layout

- CSS grid: `repeat(3, 1fr)`, full viewport width, small horizontal padding
- Each column: sticky header (scrolls with page, not fixed) + size rows
- Column borders: `1px solid var(--border)`
- Column header background: `var(--surface)`
- Mobile (< 640px): grid collapses to single column; tab strip above switches between System / Google / Allianz

## Columns

### Column 1 — System Font

`<select>` with no external requests:

- **Sans-serif:** Arial, Helvetica, Verdana, Trebuchet MS, Tahoma, System UI
- **Serif:** Georgia, Times New Roman, Palatino
- **Monospace:** Courier New

### Column 2 — Google Font

Loaded via a single Google Fonts CDN `<link>`:

- **Sans-serif:** Open Sans, Roboto, Noto Sans, Lato, Source Sans 3, DM Sans
- **Serif:** Playfair Display, Merriweather, Libre Baskerville

### Column 3 — Allianz Neo W04

`@font-face` declarations load from `https://amh.me/allianz/fonts/` (external server, not in repo).

Select encodes `family|weight|style`:

- **Regular:** Light (300/normal), Light Italic (300/italic), Regular (400/normal), Italic (400/italic), SemiBold (600/normal), SemiBold Italic (600/italic), Bold (700/normal), Bold Italic (700/italic)
- **Condensed:** Condensed Light (300/normal), Condensed Regular (400/normal), Condensed Bold (700/normal)

Column header shows a small badge: "Allianz Neo W04".

## Size Rows

Sizes: **8, 10, 12, 14, 16, 18, 20, 24 px**

Each row:
- Left: px label in `var(--muted)`, monospace, fixed width
- Right: sample text in the column's selected font/weight/style

All updates are live — no calculate button.

## Design Tokens

All colours and surfaces use shared.css variables:

| Token | Usage |
|---|---|
| `--bg` | Page background |
| `--surface` | Column header background |
| `--text` | Sample text |
| `--border` | Column dividers, row separators |
| `--muted` | Size px labels, column sub-labels |
| `--accent` | h1, selected weight button state |

Theming: `light-dark()` CSS function throughout. No custom dark mode toggle. OS preference only.

## Accessibility

- Each column `<section>` has `aria-labelledby` pointing to its heading
- Weight toggle buttons use `aria-pressed`
- All `<select>` elements have associated `<label>`
- `:focus-visible` outline inherited from shared.css

## What Is Removed from the Current File

- Custom dark mode toggle button and `body.dark` / `body.light` classes
- `@media (prefers-color-scheme: dark)` block (shared.css handles this)
- Allianz `@font-face` pointing to local woff2 files (replaced with `https://amh.me/allianz/fonts/`)
- Resize-based row height recalculation (CSS `min-height` is sufficient)
- Own CSS variable definitions (replaced by shared.css tokens)
