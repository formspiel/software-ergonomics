# Display Density Feature Design

**Date:** 2026-04-23  
**Status:** Approved

## Summary

Add device pixel ratio (DPR) support to the character height calculator so that hi-DPI devices (iPhones, MacBooks, Retina tablets) are represented correctly. PPI is already computed from geometry; DPR cannot be derived from hardware specs alone and is stored in device presets. Together they yield the effective CSS pixel pitch, which bridges physical display measurements to the CSS `px` unit developers actually use.

## Data Layer

### presets.json

Each device entry gains a `dpr` field (device pixel ratio, integer or 0.25-step decimal):

```json
{ "key": "iphone_12_pro", "label": "iPhone 12 Pro 6.1\"", "width": 1170, "height": 2532, "diagonal": 6.1, "dpr": 3 }
```

**DPR assignments by category:**

| Category | DPR |
| -------- | --- |
| Office displays (all) | 1 — except LG UltraFine 24" → 2 (Apple display) |
| Laptops (existing) | 1 — corporate standard-DPI hardware |
| MacBook Air M5 13.6" *(new)* | 2 — Retina 2× |
| Tablets: iPad Pro 12.9", iPad Air 10.9", Galaxy Tab S8, Surface Pro 9, iPad Pro 9.7" | 2 |
| Tablet: Lenovo Tab P11 | 1 |
| Phones: iPhone SE | 2 |
| Phones: all other iPhones, Galaxy S21/S22, Pixel 6/7, OnePlus 10 Pro, Sony Xperia 1 IV, Nokia X30 | 3 |
| Phone: Galaxy J5 2016 | 2 |

### New device: MacBook Air M5 13.6"

```json
{ "key": "macbook_air_m5_13", "label": "MacBook Air M5 13.6\"", "width": 2560, "height": 1666, "diagonal": 13.6, "dpr": 2 }
```

Added to the Laptop category.

## Input Field

A `Scale Factor (DPR)` number input is added to the Display Parameters fieldset alongside pixel width/height/diagonal.

- `id="scaleFactor"`, `type="number"`, `min="1"`, `max="4"`, `step="0.25"`, `value="1"`
- Auto-filled from preset `dpr` on device selection
- Disabled (locked) when a non-Custom preset is selected — same behaviour as pixel width/height/diagonal
- Editable when "Custom" is selected
- Resets to 1 on Reset button click

## Calculation

One new derived value, computed in the submit handler alongside pixel pitch and PPI:

```js
cssPixelPitch = pixelPitch × dpr   // mm per CSS px
```

No changes to the character-height table. The table rows (8, 9, 10, 11 dpx) continue to represent physical pixels — dpx is the unit that matters for the table.

## Results Block

The existing results line is extended:

```text
Pixel Pitch: 0.112 mm   PPI: 226.4   Scale Factor: 2×   CSS px pitch: 0.224 mm
```

All four values on one line, consistent with the current two-value layout.

## Arc-Minute Table

A fourth column `Min. char height (CSS px)` is added:

| Arc minutes | Min. char height (dpx) | Min. char height (CSS px) |
| ----------- | ---------------------- | ------------------------- |
| 16′ | N dpx | ceil(N / dpr) CSS px |
| 20′ | N dpx | ceil(N / dpr) CSS px |
| 22′ | N dpx | ceil(N / dpr) CSS px |

`Math.ceil` is used so the threshold is never rounded down (conservative). At DPR=1 the two columns are identical.

The arc-minute section heading paragraph is updated to reference the viewing distance as before; no other prose changes.

## Out of Scope

- Fractional DPR display in the character-height table
- Changing the table row labels from "dpx" to "CSS px"
- Auto-detecting DPR from PPI thresholds for Custom input
- Adding more devices beyond MacBook Air M5 13.6"
