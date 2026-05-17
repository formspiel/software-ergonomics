# Character Height Calculator — Cleanup & Feature Merge

**Date:** 2026-04-22
**Status:** Approved

## Goal

Consolidate three overlapping versions of the character height calculator into one clean, complete tool. Preserve all features. No UX changes, no new features — pure cleanup and merge.

## Source Versions

| Version | Location | Status |
|---|---|---|
| Old German | `character-height-calculator copy 2/` | Delete entirely |
| Intermediate English | root `index.html` + `screens.js` + `screen-management.js` + `character-height-calculator.js` + `styles.css` | Delete after merging features |
| Polished English | `character-height-calculator/` | **Keep — becomes the single source of truth** |

The `character-height-checker/` tool has already been moved out of the folder by the user and is out of scope.

## Target Structure

```
character-size/
├── character-height-calculator/
│   ├── index.html      ← merged UI (see below)
│   ├── style.css       ← unchanged except minor additions if needed
│   └── presets.json    ← real corporate device data merged in
└── README.md           ← updated
```

## Features to Merge (root → `character-height-calculator/`)

The polished version is missing these features from the root version:

1. **Viewing distance input** — numeric field in cm
2. **Screen type shortcuts** — radio buttons (Monitor 50 cm / Laptop 40 cm / Tablet 40 cm / Phone 30 cm) that auto-fill the distance field; typing in the distance field clears the radio selection
3. **Arc-minute thresholds** — after calculating, show minimum character size in dpx for 16', 20', and 22' arc minutes at the entered viewing distance. Displayed as a second results section below the existing zoom table.
4. **Auto-calculate on preset selection** — selecting a preset from the dropdown triggers the calculation immediately (root version already does this)

**Dropped feature:** "Add new screen" JSON generator. This was a workaround for the old JS-based screen data. With `presets.json` in place, users edit the file directly. Not worth porting.

## Arc-Minute Calculation

From the root `character-height-calculator.js`:

```
pixel_pitch_mm = physical_height_mm / screen_height_px
arc_minutes(n_px) = (2 * atan((n_px * pixel_pitch_mm / 2) / viewing_distance_mm) * 180 / PI) * 60
```

Find the smallest integer n (1–99) where `arc_minutes(n) > threshold` for thresholds 16, 20, 22.

Viewing distance is entered in cm; multiply by 10 for mm.

## presets.json — Device Data Migration

Add all devices from `screens.js` to `presets.json`, normalising to the existing schema:
`{ "key": string, "label": string, "width": number, "height": number, "diagonal": number }`

**Office Display category** — add from `screens.js` group "1":
- Fujitsu B24W-6 LED 24" (1920×1200)
- Fujitsu B27-8 TE Pro 27" (1920×1200)
- NEC 2690WUXI 26" (1920×1200)
- NEC B22-8 WE Neo 22" (1680×1050)
- NEC LCD2170NX 21.3" (1600×1200)
- NEC LCD225WNX 22" (1680×1050)
- NEC MultiSync EA261WM 26" (1920×1200)
- NEC MultiSync EA273WMi 27" (1920×1080)
- NEC MultiSync EA294WMi 29" (2560×1080)
- NEC MultiSync EA294WMi 30" (2560×1600)

**Laptop category** (new category) — from `screens.js` group "2":
- Fujitsu Lifebook U747 14" FHD (1920×1080)
- Fujitsu Lifebook U747 14" HD (1366×768)
- Fujitsu Lifebook U747 V Pro Touch 14" (1920×1080)
- Fujitsu Lifebook U757 15.6" (1920×1080)
- HP EliteBook 850 G5 15.6" (1920×1080)
- HP Mobile Workstation 8570W 15.6" (1920×1080)
- HP Notebook 840 14" HD (1366×768)
- HP Notebook 840 14" HD+ (1600×900)
- Lenovo Helix 2 Gen 11.6" (1920×1080)
- Lenovo ThinkPad T460 14" (1366×768)
- Lenovo X380 Yoga 13.3" (1920×1080)
- Samsung NP600B4B 14" (1366×768)

**Tablet category** — add from `screens.js` group "3":
- Apple iPad Pro 9.7" (2048×1536) — note: screens.js group 3 was empty in old copy 2 but present in root

**Smartphone category** — add from `screens.js` group "4":
- Apple iPhone SE 4" (1136×640)
- Apple iPhone XS Max 6.5" (2688×1242)
- Apple iPhone 12 Pro Max 6.7" (2778×1284)
- Apple iPhone 13 mini 6.1" (1170×2532)
- Google Pixel 6 6.4" (1080×2400)
- Nokia X30 5G 6.43" (1080×2400)
- Samsung Galaxy S21 5G 6.2" (1080×2400)
- Samsung Galaxy J5 2016 5.2" (720×1280)

Note: duplicate device names in `screens.js` (e.g. two "HP Notebook-PC 840 14"" entries) are disambiguated by resolution in the label.

## Bug Fix

`resetBtn` event handler references `document.getElementById('presetCustom')` which does not exist. Replace with `select.value = 'custom'` and call `updateFieldsetDisabled()`.

## Deletion List

Once the merge is done and verified:
- `character-height-calculator copy 2/` (entire folder)
- `index.html` (root)
- `styles.css` (root)
- `screens.js` (root)
- `screen-management.js` (root)
- `character-height-calculator.js` (root)

## Out of Scope (Phase 2+)

- UI/UX improvements
- Adding the arc-minute results into the screenshot
- Translating remaining German content
- Making the "Calculate" button optional (auto-calculate on all input changes)
- README content improvements
