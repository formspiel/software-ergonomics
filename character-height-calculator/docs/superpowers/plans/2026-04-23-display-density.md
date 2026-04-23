# Display Density Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add device pixel ratio (DPR) to all device presets and a Scale Factor input, then surface effective CSS pixel pitch in the results and a CSS px column in the arc-minute table.

**Architecture:** All changes are in two files: `presets.json` (data) and `index.html` (HTML structure + JS). No build system exists; the page is opened directly in a browser. Changes are purely additive — the character-height table is untouched.

**Tech Stack:** Vanilla HTML/CSS/JavaScript, no framework, no test runner. Verification is done in the browser DevTools console.

---

## Task 1: Add `dpr` to every device in presets.json and add MacBook Air M5

**Files:**

- Modify: `character-height-calculator/presets.json`

- [ ] **Step 1: Replace presets.json with the complete updated version**

Write the following as the entire file content of `character-height-calculator/presets.json`:

```json
[
  {
    "category": "Office Display",
    "devices": [
      { "key": "dell_u2720q",       "label": "Dell 27\" 4K",                        "width": 3840, "height": 2160, "diagonal": 27,   "dpr": 1 },
      { "key": "lg_ultrafine_24",   "label": "LG UltraFine 24\"",                   "width": 3840, "height": 2160, "diagonal": 24,   "dpr": 2 },
      { "key": "hp_elitedisplay_23","label": "HP EliteDisplay 23\"",                "width": 1920, "height": 1080, "diagonal": 23,   "dpr": 1 },
      { "key": "benq_gw2780",       "label": "BenQ GW2780 27\"",                    "width": 1920, "height": 1080, "diagonal": 27,   "dpr": 1 },
      { "key": "asus_proart_32",    "label": "ASUS ProArt 32\"",                    "width": 3840, "height": 2160, "diagonal": 32,   "dpr": 1 },
      { "key": "fujitsu_b24w6",     "label": "Fujitsu B24W-6 LED 24\"",             "width": 1920, "height": 1200, "diagonal": 24,   "dpr": 1 },
      { "key": "fujitsu_b278",      "label": "Fujitsu B27-8 TE Pro 27\"",           "width": 1920, "height": 1200, "diagonal": 27,   "dpr": 1 },
      { "key": "nec_2690wuxi",      "label": "NEC 2690WUXI 26\"",                   "width": 1920, "height": 1200, "diagonal": 26,   "dpr": 1 },
      { "key": "nec_b228",          "label": "NEC B22-8 WE Neo 22\"",               "width": 1680, "height": 1050, "diagonal": 22,   "dpr": 1 },
      { "key": "nec_lcd2170nx",     "label": "NEC LCD2170NX 21.3\"",                "width": 1600, "height": 1200, "diagonal": 21.3, "dpr": 1 },
      { "key": "nec_lcd225wnx",     "label": "NEC LCD225WNX 22\"",                  "width": 1680, "height": 1050, "diagonal": 22,   "dpr": 1 },
      { "key": "nec_ea261wm",       "label": "NEC MultiSync EA261WM 26\" (old)",    "width": 1920, "height": 1200, "diagonal": 26,   "dpr": 1 },
      { "key": "nec_ea273wmi",      "label": "NEC MultiSync EA273WMi 27\"",         "width": 1920, "height": 1080, "diagonal": 27,   "dpr": 1 },
      { "key": "nec_ea294wmi_29",   "label": "NEC MultiSync EA294WMi 29\"",         "width": 2560, "height": 1080, "diagonal": 29,   "dpr": 1 },
      { "key": "nec_ea294wmi_30",   "label": "NEC MultiSync EA294WMi 30\"",         "width": 2560, "height": 1600, "diagonal": 30,   "dpr": 1 }
    ]
  },
  {
    "category": "Laptop",
    "devices": [
      { "key": "fujitsu_u747_hd",   "label": "Fujitsu Lifebook U747 14\" HD",        "width": 1366, "height": 768,  "diagonal": 14,   "dpr": 1 },
      { "key": "fujitsu_u747_fhd",  "label": "Fujitsu Lifebook U747 14\" FHD",       "width": 1920, "height": 1080, "diagonal": 14,   "dpr": 1 },
      { "key": "fujitsu_u747_vpro", "label": "Fujitsu Lifebook U747 V Pro Touch 14\"","width": 1920, "height": 1080, "diagonal": 14,   "dpr": 1 },
      { "key": "fujitsu_u757",      "label": "Fujitsu Lifebook U757 15.6\"",          "width": 1920, "height": 1080, "diagonal": 15.6, "dpr": 1 },
      { "key": "hp_850g5",          "label": "HP EliteBook 850 G5 15.6\"",            "width": 1920, "height": 1080, "diagonal": 15.6, "dpr": 1 },
      { "key": "hp_8570w",          "label": "HP Mobile Workstation 8570W 15.6\"",    "width": 1920, "height": 1080, "diagonal": 15.6, "dpr": 1 },
      { "key": "hp_840_hd",         "label": "HP Notebook 840 14\" HD",               "width": 1366, "height": 768,  "diagonal": 14,   "dpr": 1 },
      { "key": "hp_840_hdplus",     "label": "HP Notebook 840 14\" HD+",              "width": 1600, "height": 900,  "diagonal": 14,   "dpr": 1 },
      { "key": "lenovo_helix2",     "label": "Lenovo Helix 2 Gen 11.6\"",             "width": 1920, "height": 1080, "diagonal": 11.6, "dpr": 1 },
      { "key": "lenovo_t460",       "label": "Lenovo ThinkPad T460 14\"",             "width": 1366, "height": 768,  "diagonal": 14,   "dpr": 1 },
      { "key": "lenovo_x380_yoga",  "label": "Lenovo X380 Yoga 13.3\"",               "width": 1920, "height": 1080, "diagonal": 13.3, "dpr": 1 },
      { "key": "samsung_np600b4b",  "label": "Samsung NP600B4B 14\"",                 "width": 1366, "height": 768,  "diagonal": 14,   "dpr": 1 },
      { "key": "macbook_air_m5_13", "label": "MacBook Air M5 13.6\"",                 "width": 2560, "height": 1666, "diagonal": 13.6, "dpr": 2 }
    ]
  },
  {
    "category": "Tablet",
    "devices": [
      { "key": "ipad_pro_12_9",     "label": "iPad Pro 12.9\"",                      "width": 2048, "height": 2732, "diagonal": 12.9, "dpr": 2 },
      { "key": "ipad_air_10_9",     "label": "iPad Air 10.9\"",                      "width": 1640, "height": 2360, "diagonal": 10.9, "dpr": 2 },
      { "key": "galaxy_tab_s8",     "label": "Galaxy Tab S8 11\"",                   "width": 1600, "height": 2560, "diagonal": 11,   "dpr": 2 },
      { "key": "surface_pro_9",     "label": "Surface Pro 9 13\"",                   "width": 2880, "height": 1920, "diagonal": 13,   "dpr": 2 },
      { "key": "lenovo_tab_p11",    "label": "Lenovo Tab P11 11\"",                  "width": 1200, "height": 2000, "diagonal": 11,   "dpr": 1 },
      { "key": "ipad_pro_9_7",      "label": "Apple iPad Pro 9.7\"",                 "width": 1536, "height": 2048, "diagonal": 9.7,  "dpr": 2 }
    ]
  },
  {
    "category": "Smartphone",
    "devices": [
      { "key": "iphone_12_pro",     "label": "iPhone 12 Pro 6.1\"",                  "width": 1170, "height": 2532, "diagonal": 6.1,  "dpr": 3 },
      { "key": "galaxy_s22",        "label": "Galaxy S22 6.1\"",                     "width": 1080, "height": 2340, "diagonal": 6.1,  "dpr": 3 },
      { "key": "pixel_7",           "label": "Pixel 7 6.3\"",                        "width": 1080, "height": 2400, "diagonal": 6.3,  "dpr": 3 },
      { "key": "oneplus_10_pro",    "label": "OnePlus 10 Pro 6.7\"",                 "width": 1440, "height": 3216, "diagonal": 6.7,  "dpr": 3 },
      { "key": "sony_xperia_1_iv",  "label": "Sony Xperia 1 IV 6.5\"",              "width": 1644, "height": 3840, "diagonal": 6.5,  "dpr": 3 },
      { "key": "iphone_se",         "label": "Apple iPhone SE 4\" (old)",            "width": 640,  "height": 1136, "diagonal": 4,    "dpr": 2 },
      { "key": "iphone_xs_max",     "label": "Apple iPhone XS Max 6.5\"",            "width": 1242, "height": 2688, "diagonal": 6.5,  "dpr": 3 },
      { "key": "iphone_12_pro_max", "label": "Apple iPhone 12 Pro Max 6.7\"",        "width": 1284, "height": 2778, "diagonal": 6.7,  "dpr": 3 },
      { "key": "iphone_13_mini",    "label": "Apple iPhone 13 mini 5.4\"",           "width": 1080, "height": 2340, "diagonal": 5.4,  "dpr": 3 },
      { "key": "pixel_6",           "label": "Google Pixel 6 6.4\"",                 "width": 1080, "height": 2400, "diagonal": 6.4,  "dpr": 3 },
      { "key": "nokia_x30",         "label": "Nokia X30 5G 6.43\"",                  "width": 1080, "height": 2400, "diagonal": 6.43, "dpr": 3 },
      { "key": "galaxy_s21",        "label": "Samsung Galaxy S21 5G 6.2\"",          "width": 1080, "height": 2400, "diagonal": 6.2,  "dpr": 3 },
      { "key": "galaxy_j5_2016",    "label": "Samsung Galaxy J5 2016 5.2\"",         "width": 720,  "height": 1280, "diagonal": 5.2,  "dpr": 2 }
    ]
  }
]
```

- [ ] **Step 2: Verify JSON is valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('character-height-calculator/presets.json','utf8')); console.log('OK')"
```

Expected output: `OK`

- [ ] **Step 3: Commit**

```bash
git add character-height-calculator/presets.json
git commit -m "feat: add dpr field to all presets, add MacBook Air M5 13.6\""
```

---

## Task 2: Add Scale Factor input to the Display Parameters fieldset

**Files:**

- Modify: `character-height-calculator/index.html`

- [ ] **Step 1: Add the input inside `displayFieldset`**

In `index.html`, inside the `<fieldset id="displayFieldset">` block, after the `diagonal` label/input and before the closing `</fieldset>`, add:

```html
      <label for="scaleFactor">
        Scale Factor (DPR):
        <input type="number" id="scaleFactor" min="1" max="4" step="0.25" value="1">
      </label>
```

The fieldset should look like this when done:

```html
    <fieldset id="displayFieldset">
      <legend>Display Parameters:</legend>
      <label for="pixelWidth">
        Pixel Width:
        <input type="number" id="pixelWidth" min="1" required>
      </label>
      <label for="pixelHeight">
        Pixel Height:
        <input type="number" id="pixelHeight" min="1" required>
      </label>
      <label for="diagonal">
        Diagonal (inches):
        <input type="number" id="diagonal" step="0.01" min="1" required>
      </label>
      <label for="scaleFactor">
        Scale Factor (DPR):
        <input type="number" id="scaleFactor" min="1" max="4" step="0.25" value="1">
      </label>
    </fieldset>
```

- [ ] **Step 2: Verify in browser**

Open `character-height-calculator/index.html` in a browser (served via a local server). The Display Parameters fieldset should now show a fourth input labelled "Scale Factor (DPR)" with default value 1. Selecting a non-Custom preset should disable all four inputs including Scale Factor.

- [ ] **Step 3: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "feat: add Scale Factor (DPR) input to Display Parameters fieldset"
```

---

## Task 3: Auto-fill Scale Factor when a preset is selected

**Files:**

- Modify: `character-height-calculator/index.html`

- [ ] **Step 1: Update the preset change handler**

Find this block in the `presetSelect` change listener (the `else` branch):

```javascript
        const preset = presetMap[this.value];
        document.getElementById('pixelWidth').value = preset.width;
        document.getElementById('pixelHeight').value = preset.height;
        document.getElementById('diagonal').value = preset.diagonal;
```

Add one line immediately after `preset.diagonal`:

```javascript
        document.getElementById('scaleFactor').value = preset.dpr || 1;
```

The block should look like this when done:

```javascript
        const preset = presetMap[this.value];
        document.getElementById('pixelWidth').value = preset.width;
        document.getElementById('pixelHeight').value = preset.height;
        document.getElementById('diagonal').value = preset.diagonal;
        document.getElementById('scaleFactor').value = preset.dpr || 1;
```

- [ ] **Step 2: Verify in browser**

Open DevTools console. Select "MacBook Air M5 13.6\"" from the dropdown. Run:

```javascript
document.getElementById('scaleFactor').value
```

Expected: `"2"`

Select "iPhone 12 Pro 6.1\"". Run the same. Expected: `"3"`

Select "Dell 27\" 4K". Run the same. Expected: `"1"`

- [ ] **Step 3: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "feat: auto-fill Scale Factor from preset dpr on device selection"
```

---

## Task 4: Compute CSS pixel pitch and display it in the results block

**Files:**

- Modify: `character-height-calculator/index.html`

- [ ] **Step 1: Read DPR and compute cssPixelPitch in the submit handler**

Find this exact code in the submit handler (inside `displayForm` submit listener):

```javascript
      const pixelPitch = calcPixelPitch(width, height, diagonal);
      const ppi = calcPPI(width, height, diagonal);
      document.getElementById('result').innerHTML =
        `<strong>Pixel Pitch:</strong> ${pixelPitch.toFixed(3)} mm<br>
         <strong>PPI:</strong> ${ppi.toFixed(1)}`;
```

Replace it with:

```javascript
      const pixelPitch = calcPixelPitch(width, height, diagonal);
      const ppi = calcPPI(width, height, diagonal);
      const dpr = parseFloat(document.getElementById('scaleFactor').value) || 1;
      const cssPixelPitch = pixelPitch * dpr;
      document.getElementById('result').innerHTML =
        `<strong>Pixel Pitch:</strong> ${pixelPitch.toFixed(3)} mm &nbsp;&nbsp;` +
        `<strong>PPI:</strong> ${ppi.toFixed(1)} &nbsp;&nbsp;` +
        `<strong>Scale Factor:</strong> ${dpr}× &nbsp;&nbsp;` +
        `<strong>CSS px pitch:</strong> ${cssPixelPitch.toFixed(3)} mm`;
```

- [ ] **Step 2: Verify in browser**

Select "MacBook Air M5 13.6\"" and click Calculate (it auto-calculates). The results line should show all four values. Open the console and verify:

```javascript
// MacBook Air M5: 2560×1664 @ 13.6"
// pixelDiag = sqrt(2560²+1664²) = sqrt(6553600+2768896) = sqrt(9322496) ≈ 3053.3
// pixelPitch = 13.6 × 25.4 / 3053.3 ≈ 345.44 / 3053.3 ≈ 0.1131 mm
// ppi = 3053.3 / 13.6 ≈ 224.5
// dpr = 2
// cssPixelPitch = 0.1131 × 2 ≈ 0.226 mm
document.getElementById('result').textContent
```

Expected to contain: `Scale Factor: 2×` and `CSS px pitch: 0.226 mm` (exact value may vary slightly by rounding).

- [ ] **Step 3: Verify DPR=1 devices are unchanged in appearance**

Select "Dell 27\" 4K" (DPR=1). The results should show `Scale Factor: 1×` and `CSS px pitch` equal to `Pixel Pitch` (same number).

- [ ] **Step 4: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "feat: compute and display CSS px pitch in results (pixelPitch × dpr)"
```

---

## Task 5: Add CSS px column to the arc-minute table

**Files:**

- Modify: `character-height-calculator/index.html`

- [ ] **Step 1: Update the arc-minute table HTML**

Find the entire `<table id="arcTable">` block and replace it with this:

```html
      <table id="arcTable">
        <thead>
          <tr>
            <th>Arc minutes</th>
            <th>Min. character height (dpx)</th>
            <th>Min. character height (CSS px)</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>16′</td>
            <td id="arc16"></td>
            <td id="arc16css"></td>
            <td>Secondary / non-work information</td>
          </tr>
          <tr>
            <td>20′</td>
            <td id="arc20"></td>
            <td id="arc20css"></td>
            <td>Minimum character size</td>
          </tr>
          <tr>
            <td>22′</td>
            <td id="arc22"></td>
            <td id="arc22css"></td>
            <td>Recommended character size</td>
          </tr>
        </tbody>
      </table>
```

- [ ] **Step 2: Update the JS that populates arc-minute cells**

Find this block in the submit handler (inside the `if (viewingDist > 0)` branch):

```javascript
        document.getElementById('arc16').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 16) + ' dpx';
        document.getElementById('arc20').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 20) + ' dpx';
        document.getElementById('arc22').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 22) + ' dpx';
```

Replace it with:

```javascript
        [
          { dpxId: 'arc16', cssId: 'arc16css', arcMin: 16 },
          { dpxId: 'arc20', cssId: 'arc20css', arcMin: 20 },
          { dpxId: 'arc22', cssId: 'arc22css', arcMin: 22 },
        ].forEach(({ dpxId, cssId, arcMin }) => {
          const dpxVal = calcArcMinuteThreshold(pixelPitch, viewingDist, arcMin);
          document.getElementById(dpxId).textContent = dpxVal + ' dpx';
          document.getElementById(cssId).textContent =
            typeof dpxVal === 'number' ? Math.ceil(dpxVal / dpr) + ' CSS px' : dpxVal;
        });
```

Note: `dpr` is already in scope from Task 4's change earlier in the same submit handler.

- [ ] **Step 3: Verify in browser**

Select "iPhone 12 Pro 6.1\"" (DPR=3). Set viewing distance to 30 cm (tap the Phone radio button). Click Calculate.

In the arc-minute section, the CSS px values should be roughly one-third of the dpx values. Open console and verify:

```javascript
document.getElementById('arc20').textContent   // e.g. "18 dpx"
document.getElementById('arc20css').textContent // e.g. "6 CSS px"  (ceil(18/3) = 6)
```

Select "Dell 27\" 4K" (DPR=1). Set viewing distance 50 cm. Calculate. Both columns should show identical numbers:

```javascript
document.getElementById('arc20').textContent   // e.g. "12 dpx"
document.getElementById('arc20css').textContent // "12 CSS px"
```

- [ ] **Step 4: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "feat: add CSS px column to arc-minute table (ceil(dpx / dpr))"
```
