# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build system — all tools are standalone HTML files opened directly in a browser. There are no dependencies to install, no bundler, and no test suite.

To run locally: open any `index.html` in a browser. Because `tool-display-legibility/index.html` fetches `presets.json` via `fetch()`, it needs a local HTTP server (e.g. `python3 -m http.server 8080` from the repo root) rather than a `file://` URL.

## Repository Structure

The root `index.html` is a project index linking to all tools and demos. `shared.css` provides base styles (CSS variables, typography, status badges, `.back` link) used by every page.

**`tool-display-legibility/`** — the primary tool. Calculates minimum character sizes for ergonomic screen legibility (ISO 9241-303). Key files:
- `index.html` — all logic is inline JS; no external scripts except `html2canvas` CDN
- `presets.json` — 46 device presets in 4 categories (`Office Display`, `Laptop`, `Tablet`, `Smartphone`), schema: `{ key, label, width, height, diagonal, dpr? }`
- `style.css` — styling; uses `light-dark()` CSS function for auto dark mode

**`tool-character-size-visualisation/`** — side-by-side font comparison tool. Renders sample text at 8–24 px across three columns (System, Google, Allianz Neo W04) to judge rendering quality at small sizes. Key files:
- `index.html` — all markup and inline JS; Google Fonts CDN link; `@font-face` rules loading Allianz Neo from `https://amh.me/allianz/fonts/`; no external scripts
- `style.css` — tool-specific layout; `shared.css` handles base styles and theming
- Controls: sample text input (default `E aecg · Il1ij · 0Oo · bd · rn/m — Hamburgefons`), Regular/Bold weight toggle (affects System and Google columns only; Allianz weight comes from its select)
- Mobile (≤ 640 px): controls collapse into a `<details>` disclosure element; tab strip switches between columns; subtitle and Draft badge hidden

**`tool-character-size/`** — a JS bookmarklet for in-browser accessibility checks based on ISO 9241-303. Key files:
- `bookmarklet.js` — the script; paste its contents into a browser bookmark URL field to install
- `index.html` — landing page with installation instructions

**`demo-accessible-svg/`** — five variants of a paper plane SVG demonstrating different accessibility techniques: no markup, inline `<title>` with ARIA, inline CSS with legacy high-contrast support, and external CSS via XML processing instruction. Four SVG files (`paper-plane-optimised.svg`, `paper-plane-with-title.svg`, `paper-plane-with-title-css.svg`, `paper-plane-with-title-ext-css.svg`) plus `svg.css` for the external-CSS variant.

**`demo-flickering/`** — interactive WCAG 2.3.1 demo. A flicker box plays on demand; two zone-coded sliders (frequency 0.5–8 Hz, duration 0.2–5 s) show which settings pass or fail the 3 flashes-per-second threshold. Escape stops playback immediately.

**`demo-high-contrast/`** — reference page for CSS `forced-colors` (Windows Contrast Themes). Covers detection, `<picture>` image swapping, inline SVG adaptation via `currentColor`, the full system colour keyword table, practical patterns, related media queries, and JS detection.

**`demo-modals/`** — six dialog and pop-up patterns using native `<dialog>`, the Popover API, ARIA alerts, and a new-window variant. Includes `newWindow.html` opened via `window.open()`. Key files:
- `index.html` — all six patterns with AT behaviour notes
- `scripts.js` — focus trapping, ESC handling, nested dialog support
- `style.css`, `newWindow.html`

**`demo-prevent-tab-close/`** — demonstrates `beforeunload`-based tab-close prevention on a two-page form flow (`index.html` → `form.html`). Key files:
- `form.html` — email/password form; loads `scripts.js`
- `scripts.js` — flag-based approach: one `beforeunload` listener on `window` controlled by a `hasUnsavedData` boolean; a single `input` listener on `<form>` uses event delegation to catch all child fields via bubbling; `form.elements` evaluates dirty state per control type (`el.checked` for checkboxes/radios, `el.value` for everything else). Submit handler clears the flag so no warning appears on intentional navigation.
- Browser limitation: the `beforeunload` dialog text and appearance cannot be customised — browsers block this to prevent phishing. The native dialog is always shown.

**`demo-theming/`** — a joke generator demonstrating the `light-dark()` CSS function with manual theme switching (Auto / Light / Dark) via `localStorage`.

## Calculator Architecture

All calculator logic lives in `tool-display-legibility/index.html`:

- **Presets** loaded via `fetch('presets.json')` into `allPresets[]` and `presetMap{}`. Selecting a preset auto-fills display fields, sets viewing distance, checks the matching screen-type radio, and triggers auto-calculate.
- **Zoom table** — shows physical character sizes (mm) for 8–11 dpx at 100–200% zoom. Target is 3.2 mm; ±10% tolerance determines green/yellow/red coloring. Each cell shows: `N dpx (M CSS px) · X.XX mm`.
- **Arc-minute section** — shown only when viewing distance is provided. Calculates minimum dpx for 16′/20′/22′ thresholds using: `arcMin = (2 * atan((n * pixelPitch / 2) / distMm) * 180 / PI) * 60`. CSS px = `ceil(dpx / dpr)`.
- **DPR (Scale Factor)** — entered manually; affects CSS px display but not the physical mm calculation.
- **Screenshot export** — uses `html2canvas` CDN to copy/download the zoom table as PNG.

## Adding Device Presets

Edit `tool-display-legibility/presets.json` directly. Use portrait orientation (height > width) for phones and tablets; landscape for monitors and laptops. The `dpr` field is optional (defaults to 1).
