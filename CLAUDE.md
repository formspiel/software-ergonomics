# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build system — all tools are standalone HTML files opened directly in a browser. There are no dependencies to install, no bundler, and no test suite.

To run locally: open any `index.html` in a browser. Because `tool-display-legibility/index.html` fetches `presets.json` via `fetch()`, it needs a local HTTP server (e.g. `python3 -m http.server 8080` from the repo root) rather than a `file://` URL.

## Repository Structure

The root `index.html` is a project index linking to all tools and demos:

**`tool-display-legibility/`** — the primary tool. Calculates minimum character sizes for ergonomic screen legibility (ISO 9241-303). Key files:
- `index.html` — all logic is inline JS; no external scripts except `html2canvas` CDN
- `presets.json` — 46 device presets in 4 categories (`Office Display`, `Laptop`, `Tablet`, `Smartphone`), schema: `{ key, label, width, height, diagonal, dpr? }`
- `style.css` — styling; uses `light-dark()` CSS function for auto dark mode

**`tool-character-size/`** — a separate, unfinished JS bookmarklet/extension script (`coc-assessement.js`) for in-browser accessibility checks. Partially in German, not integrated with the calculator.

**`demo-modals/`** — showcases and compares modal, pop-up, and dialog interaction patterns. ARIA-compliant `Dialog` class with focus trapping, nested dialogs, and ESC handling. Includes a `Pro vs Con/` subpage comparing dialog approaches side-by-side.

**`demo-prevent-tab-close/`** — demonstrates browser tab-close prevention via the `beforeunload` event. Flag-based approach with event delegation on a form.

**`demo-theming/`** — a demo joke generator demonstrating the `light-dark()` CSS function with manual theme switching (Auto/Light/Dark) via `localStorage`.

## Calculator Architecture

All calculator logic lives in `tool-display-legibility/index.html`:

- **Presets** loaded via `fetch('presets.json')` into `allPresets[]` and `presetMap{}`. Selecting a preset auto-fills display fields, sets viewing distance, checks the matching screen-type radio, and triggers auto-calculate.
- **Zoom table** — shows physical character sizes (mm) for 8–11 dpx at 100–200% zoom. Target is 3.2 mm; ±10% tolerance determines green/yellow/red coloring. Each cell shows: `N dpx (M CSS px) · X.XX mm`.
- **Arc-minute section** — shown only when viewing distance is provided. Calculates minimum dpx for 16′/20′/22′ thresholds using: `arcMin = (2 * atan((n * pixelPitch / 2) / distMm) * 180 / PI) * 60`. CSS px = `ceil(dpx / dpr)`.
- **DPR (Scale Factor)** — entered manually; affects CSS px display but not the physical mm calculation.
- **Screenshot export** — uses `html2canvas` CDN to copy/download the zoom table as PNG.

## Adding Device Presets

Edit `tool-display-legibility/presets.json` directly. Use portrait orientation (height > width) for phones and tablets; landscape for monitors and laptops. The `dpr` field is optional (defaults to 1).
