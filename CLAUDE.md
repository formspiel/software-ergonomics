# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build system — all tools are standalone HTML files opened directly in a browser. There are no dependencies to install, no bundler, and no test suite.

To run locally: open any `index.html` in a browser. Because `tool-display-legibility/index.html` fetches `presets.json` via `fetch()`, it needs a local HTTP server (e.g. `python3 -m http.server 8080` from the repo root) rather than a `file://` URL.

## Repository Structure

The root `index.html` is a project index linking to all tools and demos. `shared.css` provides base styles (CSS variables, typography, status badges, `.back` link) used by every page.

**`tool-display-legibility/`** — the primary tool. Calculates minimum character sizes for ergonomic screen legibility (ISO 9241-303). Key files:
- `index.html` — semantic markup; input form + results sections populated by `scripts.js`; Notes section at bottom
- `scripts.js` — all calculator logic (no inline JS); loads presets and renders eight results sections
- `presets.json` — 27 device presets in 4 categories (`Office Display`, `Laptop`, `Tablet`, `Smartphone`), schema: `{ key, label, width, height, diagonal, dpr? }`; generics listed first within each category, named devices sorted by diagonal
- `style.css` — page-specific styles; uses `light-dark()` CSS function for auto dark mode

**`tool-character-size-visualisation/`** — side-by-side font comparison tool. Renders sample text at 8–24 px across three columns (System, Google, Allianz Neo W04) to judge rendering quality at small sizes. Key files:
- `index.html` — all markup and inline JS; Google Fonts CDN link; `@font-face` rules loading Allianz Neo from `https://fonts.cdn.allianz.com/allianz-neo/` (official Allianz CDN, requires network access); no external scripts
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

**`demo-teaser/`** — three patterns for making teaser cards with embedded media clickable. The core tension: mouse users want click-anywhere; keyboard users need independent access to media controls. Key files:
- `index.html` — three pattern sections (heading link only, JS click delegation, CSS stretched link) each with a live demo stage and an AT behaviour `<details>` block
- `style.css` — teaser card styles; `.teaser--clickable` (JS pattern), `.teaser--stretched` (CSS pattern with `::after` overlay and `z-index: 2` on video)
- `article.html` + `article.css` — article detail page; all three teasers link here for real navigation flow testing
- Pattern B JS: `e.target.closest(INTERACTIVE)` guard skips navigation when clicking video controls; `aria-hidden="true" tabindex="-1"` removes the "Read more" duplicate from the AT tree

**`demo-duplicate-id/`** — (draft) demonstrates how duplicate `id` attributes break `aria-labelledby` references. Currently contains `duplicate-id-test.html` as a seed; full demo not yet built.

## Calculator Architecture

All calculator logic lives in `tool-display-legibility/scripts.js`. The page has a **Screen** input section, a Calculate / Reset action row, nine rendered results sections, and a permanent **Notes** section at the bottom.

### Input section — Screen

Three source modes selected via a button group (`currentSource: 'detect' | 'preset' | 'manual'`):

- **This screen** (`#panel-detect`) — reads `screen.width/height`, `window.devicePixelRatio`, `screen.colorDepth`, `window.innerWidth/Height` (viewport updates live on resize). Displays four stat cards. User must supply the screen diagonal (in or mm toggle; `detectDiagUnit` state). "Use these values" converts diagonal to inches, fills the hidden `#width/#height/#dpr/#diagonal` inputs, and calls `calculate()`. "Save as preset" checks diagonal first before prompting for a name. Note: on most platforms `screen.width × devicePixelRatio` equals the hardware resolution; iPhone Pro/Pro Max is an exception (see Notes section on the page).
- **Preset** (`#panel-preset`) — dropdown populated from `presets.json` via `fetch()` into `presetData[]` / `presetMap{}`. Selecting a preset fills the hidden inputs, sets viewing distance by category (`CATEGORY_DISTANCE`), and auto-calculates. Selecting "custom" switches to Manual mode. Custom presets persist in `localStorage` under `tool-display-legibility:custom-presets`.
- **Manual** (`#display-fields`) — direct entry of width, height, diagonal (in/mm toggle; `manualDiagUnit` state), DPR. `readConfig()` applies mm→in conversion only in this mode. "Save as preset" available here too.

Viewing distance fieldset sits below the source panels inside the same `<section>`. Shortcut buttons set `aria-pressed` and trigger `calculate()` if display values are already present.

### Results sections

- **Screen profile** — PPI (classified: Low / Mid / High / Retina), pixel pitch in mm, DPR.
- **Compliance at distance** — minimum dpx for 16′/20′/22′ ISO thresholds. Formula: `arcMin = (2 × atan((n × pitchMm / 2) / distMm) × 180 / PI) × 60`. Each row shows dpx, CSS px = `ceil(dpx / dpr)`, mm, and 7×9 matrix badge (pass if dpx ≥ 9).
- **Across viewing distances** — 20′/22′ thresholds across 30–80 cm; configured distance row highlighted.
- **Character height by browser zoom** — physical mm for 8–11 dpx at 100–200% zoom. Target 3.2 mm ±10% determines cell colour.
- **Font compliance check** — font + size + unit (px/pt; 1 pt = 1.333 CSS px). Cap height in CSS px / dpx / mm checked against thresholds. Hinting badge (`excellent | good | verify | issues`). CSS output snippet. Suggested minimum size. Cap-height ratios in `FONTS[]` are published per-em estimates — not measured per platform. `system-ui` is listed first and uses `cssFamily: 'system-ui, sans-serif'` (unquoted CSS keyword); other fonts use `"FontName", sans-serif`.
- **Measure & verify** — live render of the legibility test string `E aecg · Il1ij · 0Oo · bd · rn/m` at the configured font/size (white background for screenshot clarity). User takes screenshot, measures capital E height in an image editor, enters the pixel count (CSS px / dpx toggle). Shows actual mm, ISO pass/fail per threshold, and measured cap-height ratio vs. stored estimate.
- **Recommended line height** — 1.4× / 1.5× / 1.6× based on 20′ cap height.
- **Visual reference** — CSS `mm`-unit bars at 2.5 / 3.2 / 5 mm; accurate only at 100% zoom on a correctly calibrated screen.
- **Share & export** — permalink (URL hash `w, h, d, s, v`; loads into Manual mode on page load). Screenshot copy/download via `html2canvas` CDN.

### Notes section

Permanent section below results (always visible). Contains collapsible `<details>` entries:
- **About this calculator** — explains dpx vs CSS px and the three arc-minute thresholds.
- **Apple iPhone Pro / Pro Max** — documents the three-layer rendering pipeline (CSS px → rendered buffer → physical panel) and why browser auto-detection under-reports resolution on these devices.

Add further device-specific entries here as `<details class="device-note">` elements.

## Planned Extensions

### Non-Latin script support (`tool-display-legibility`)

The calculator currently applies ISO 9241-303 Latin/Cyrillic/Greek thresholds only.
Planned additions when standards research is complete:

**Script selector UI** — Latin (default, active) / CJK / Arabic / Devanagari. Non-Latin options disabled initially; enabled as thresholds are confirmed.

**Per-script minimum pixel grids (research baseline):**
- CJK: 12×12 px legibility floor; 16×16 px historical minimum (GB/T 5199, 1985); 24×24 px recommended for complex characters
- Arabic: ≥ Latin 7×9 equivalent; dot diacritics require more; cursive contextual forms demand higher resolution
- Devanagari: ~16 px height minimum; shirorekha (horizontal bar) and conjunct consonants need clear separation
- Hebrew: Latin 7×9 generally sufficient for unpointed UI text
- Cyrillic and Greek: already within ISO 9241-303 scope

**Measure & verify integration per script:**
- Reference character: `E` (Latin), `国` (CJK — structurally complex, full em box), `ب` (Arabic baa — base letterform with dot), `क` (Devanagari ka — includes shirorekha)
- What to measure: cap height (Latin/Cyrillic/Greek), full em box height (CJK), baseline-to-top (Arabic), baseline-to-shirorekha (Devanagari)
- Cap-height ratio concept does not apply to CJK or Arabic; measurement is the primary compliance path, not a fallback from an estimate

**Standards gap:** No unified ISO pixel grid for non-Latin scripts. ISO 24509:2019 Annex F covers non-Latin minimum legible font sizes (purchase required). DIN 1450 covers Latin/Cyrillic legibility principles (stroke ratios, confusable pairs) but specifies no pixel grids and does not address non-Latin.

---

## Adding Device Presets

Edit `tool-display-legibility/presets.json` directly. Place generics before named devices within each category; sort named devices by diagonal size. Use portrait orientation (height > width) for phones and tablets; landscape for monitors and laptops. The `dpr` field is optional (defaults to 1).
