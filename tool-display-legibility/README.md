# Character Height Calculator

A browser-based tool for calculating minimum character sizes for ergonomic screen legibility, based on ISO 9241-303.

## Usage

Open `character-height-calculator/index.html` in a browser.

1. Select a device from the preset dropdown, or enter display parameters manually.
2. Optionally enter a viewing distance (cm) — or click a screen type shortcut to auto-fill.
3. Click **Calculate**.
4. The zoom table shows physical character sizes (mm) for 8–11 dpx at zoom levels 100–200%.
5. If a viewing distance is provided, the arc-minute section shows minimum character heights for 16′, 20′, and 22′ thresholds.

## Adding device presets

Edit `character-height-calculator/presets.json` directly. Follow the existing schema:

```json
{ "key": "unique_key", "label": "Display label", "width": 1920, "height": 1080, "diagonal": 27 }
```

Use portrait orientation for phones and tablets (height > width). Use landscape for monitors and laptops.
