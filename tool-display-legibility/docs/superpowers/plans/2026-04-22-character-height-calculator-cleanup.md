# Character Height Calculator — Cleanup & Feature Merge

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate three overlapping versions into one complete calculator inside `character-height-calculator/`, preserving all features from both active versions.

**Architecture:** Single `index.html` with inline `<script>` (existing pattern). All device data lives in `presets.json`. No build system, no external JS files — open directly in browser.

**Tech Stack:** Vanilla HTML/CSS/JS, `html2canvas` CDN for screenshot, no test framework — all testing is manual in-browser.

---

## File map

| File | Action | Notes |
|---|---|---|
| `character-height-calculator/presets.json` | **Replace** | Add all devices from root `screens.js` |
| `character-height-calculator/index.html` | **Modify** | Add HTML + JS for distance, radios, arc-minutes, bug fixes |
| `character-height-calculator/style.css` | **Minor modify** | One rule for `.screen-types` layout |
| `README.md` | **Update** | Remove stale TODOs |
| `character-height-calculator copy 2/` | **Delete** | Entirely |
| `index.html` (root) | **Delete** | — |
| `styles.css` (root) | **Delete** | — |
| `screens.js` (root) | **Delete** | — |
| `screen-management.js` (root) | **Delete** | — |
| `character-height-calculator.js` (root) | **Delete** | — |

---

## Task 1: Merge device presets into presets.json

**Files:**
- Replace: `character-height-calculator/presets.json`

- [ ] **Step 1.1: Replace presets.json with merged version**

Write the full file — adds all devices from root `screens.js`, keeps all existing entries, adds new Laptop category:

```json
[
  {
    "category": "Office Display",
    "devices": [
      { "key": "dell_u2720q",       "label": "Dell 27\" 4K",                        "width": 3840, "height": 2160, "diagonal": 27   },
      { "key": "lg_ultrafine_24",   "label": "LG UltraFine 24\"",                   "width": 3840, "height": 2160, "diagonal": 24   },
      { "key": "hp_elitedisplay_23","label": "HP EliteDisplay 23\"",                "width": 1920, "height": 1080, "diagonal": 23   },
      { "key": "benq_gw2780",       "label": "BenQ GW2780 27\"",                    "width": 1920, "height": 1080, "diagonal": 27   },
      { "key": "asus_proart_32",    "label": "ASUS ProArt 32\"",                    "width": 3840, "height": 2160, "diagonal": 32   },
      { "key": "fujitsu_b24w6",     "label": "Fujitsu B24W-6 LED 24\"",             "width": 1920, "height": 1200, "diagonal": 24   },
      { "key": "fujitsu_b278",      "label": "Fujitsu B27-8 TE Pro 27\"",           "width": 1920, "height": 1200, "diagonal": 27   },
      { "key": "nec_2690wuxi",      "label": "NEC 2690WUXI 26\"",                   "width": 1920, "height": 1200, "diagonal": 26   },
      { "key": "nec_b228",          "label": "NEC B22-8 WE Neo 22\"",               "width": 1680, "height": 1050, "diagonal": 22   },
      { "key": "nec_lcd2170nx",     "label": "NEC LCD2170NX 21.3\"",                "width": 1600, "height": 1200, "diagonal": 21.3 },
      { "key": "nec_lcd225wnx",     "label": "NEC LCD225WNX 22\"",                  "width": 1680, "height": 1050, "diagonal": 22   },
      { "key": "nec_ea261wm",       "label": "NEC MultiSync EA261WM 26\"",          "width": 1920, "height": 1200, "diagonal": 26   },
      { "key": "nec_ea273wmi",      "label": "NEC MultiSync EA273WMi 27\"",         "width": 1920, "height": 1080, "diagonal": 27   },
      { "key": "nec_ea294wmi_29",   "label": "NEC MultiSync EA294WMi 29\"",         "width": 2560, "height": 1080, "diagonal": 29   },
      { "key": "nec_ea294wmi_30",   "label": "NEC MultiSync EA294WMi 30\"",         "width": 2560, "height": 1600, "diagonal": 30   }
    ]
  },
  {
    "category": "Laptop",
    "devices": [
      { "key": "fujitsu_u747_hd",   "label": "Fujitsu Lifebook U747 14\" HD",       "width": 1366, "height": 768,  "diagonal": 14   },
      { "key": "fujitsu_u747_fhd",  "label": "Fujitsu Lifebook U747 14\" FHD",      "width": 1920, "height": 1080, "diagonal": 14   },
      { "key": "fujitsu_u747_vpro", "label": "Fujitsu Lifebook U747 V Pro Touch 14\"","width": 1920, "height": 1080, "diagonal": 14  },
      { "key": "fujitsu_u757",      "label": "Fujitsu Lifebook U757 15.6\"",         "width": 1920, "height": 1080, "diagonal": 15.6 },
      { "key": "hp_850g5",          "label": "HP EliteBook 850 G5 15.6\"",           "width": 1920, "height": 1080, "diagonal": 15.6 },
      { "key": "hp_8570w",          "label": "HP Mobile Workstation 8570W 15.6\"",   "width": 1920, "height": 1080, "diagonal": 15.6 },
      { "key": "hp_840_hd",         "label": "HP Notebook 840 14\" HD",              "width": 1366, "height": 768,  "diagonal": 14   },
      { "key": "hp_840_hdplus",     "label": "HP Notebook 840 14\" HD+",             "width": 1600, "height": 900,  "diagonal": 14   },
      { "key": "lenovo_helix2",     "label": "Lenovo Helix 2 Gen 11.6\"",            "width": 1920, "height": 1080, "diagonal": 11.6 },
      { "key": "lenovo_t460",       "label": "Lenovo ThinkPad T460 14\"",            "width": 1366, "height": 768,  "diagonal": 14   },
      { "key": "lenovo_x380_yoga",  "label": "Lenovo X380 Yoga 13.3\"",              "width": 1920, "height": 1080, "diagonal": 13.3 },
      { "key": "samsung_np600b4b",  "label": "Samsung NP600B4B 14\"",                "width": 1366, "height": 768,  "diagonal": 14   }
    ]
  },
  {
    "category": "Tablet",
    "devices": [
      { "key": "ipad_pro_12_9",     "label": "iPad Pro 12.9\"",                     "width": 2048, "height": 2732, "diagonal": 12.9 },
      { "key": "ipad_air_10_9",     "label": "iPad Air 10.9\"",                     "width": 1640, "height": 2360, "diagonal": 10.9 },
      { "key": "galaxy_tab_s8",     "label": "Galaxy Tab S8 11\"",                  "width": 1600, "height": 2560, "diagonal": 11   },
      { "key": "surface_pro_9",     "label": "Surface Pro 9 13\"",                  "width": 2880, "height": 1920, "diagonal": 13   },
      { "key": "lenovo_tab_p11",    "label": "Lenovo Tab P11 11\"",                 "width": 1200, "height": 2000, "diagonal": 11   },
      { "key": "ipad_pro_9_7",      "label": "Apple iPad Pro 9.7\"",                "width": 1536, "height": 2048, "diagonal": 9.7  }
    ]
  },
  {
    "category": "Smartphone",
    "devices": [
      { "key": "iphone_12_pro",     "label": "iPhone 12 Pro 6.1\"",                 "width": 1170, "height": 2532, "diagonal": 6.1  },
      { "key": "galaxy_s22",        "label": "Galaxy S22 6.1\"",                    "width": 1080, "height": 2340, "diagonal": 6.1  },
      { "key": "pixel_7",           "label": "Pixel 7 6.3\"",                       "width": 1080, "height": 2400, "diagonal": 6.3  },
      { "key": "oneplus_10_pro",    "label": "OnePlus 10 Pro 6.7\"",                "width": 1440, "height": 3216, "diagonal": 6.7  },
      { "key": "sony_xperia_1_iv",  "label": "Sony Xperia 1 IV 6.5\"",             "width": 1644, "height": 3840, "diagonal": 6.5  },
      { "key": "iphone_se",         "label": "Apple iPhone SE 4\" (old)",           "width": 640,  "height": 1136, "diagonal": 4    },
      { "key": "iphone_xs_max",     "label": "Apple iPhone XS Max 6.5\"",           "width": 1242, "height": 2688, "diagonal": 6.5  },
      { "key": "iphone_12_pro_max", "label": "Apple iPhone 12 Pro Max 6.7\"",       "width": 1284, "height": 2778, "diagonal": 6.7  },
      { "key": "iphone_13_mini",    "label": "Apple iPhone 13 mini 6.1\"",          "width": 1170, "height": 2532, "diagonal": 6.1  },
      { "key": "pixel_6",           "label": "Google Pixel 6 6.4\"",                "width": 1080, "height": 2400, "diagonal": 6.4  },
      { "key": "nokia_x30",         "label": "Nokia X30 5G 6.43\"",                 "width": 1080, "height": 2400, "diagonal": 6.43 },
      { "key": "galaxy_s21",        "label": "Samsung Galaxy S21 5G 6.2\"",         "width": 1080, "height": 2400, "diagonal": 6.2  },
      { "key": "galaxy_j5_2016",    "label": "Samsung Galaxy J5 2016 5.2\"",        "width": 720,  "height": 1280, "diagonal": 5.2  }
    ]
  }
]
```

- [ ] **Step 1.2: Verify in browser**

Open `character-height-calculator/index.html` in a browser (use a local server or open directly).
- Dropdown shows 4 groups: Office Display, Laptop, Tablet, Smartphone
- Laptop group appears (new)
- Each group has the expected devices listed
- Selecting any device populates the three number fields

- [ ] **Step 1.3: Commit**

```bash
git add character-height-calculator/presets.json
git commit -m "feat: merge all device presets from screens.js into presets.json"
```

---

## Task 2: Add HTML elements — viewing distance fieldset + arc-minute results section

**Files:**
- Modify: `character-height-calculator/index.html`
- Modify: `character-height-calculator/style.css`

- [ ] **Step 2.1: Add viewing distance fieldset to the form**

Inside `<form id="displayForm">`, after the closing `</fieldset>` of `displayFieldset` and before `<button type="submit">`, insert:

```html
    <fieldset id="viewingFieldset">
      <legend>Viewing Distance:</legend>
      <label for="viewingDistance">
        Distance (cm):
        <input type="number" id="viewingDistance" min="10" max="300" step="1" placeholder="e.g. 50">
      </label>
      <div class="screen-types">
        <label><input type="radio" name="screenType" value="50" data-category="Office Display"> Monitor (50 cm)</label>
        <label><input type="radio" name="screenType" value="40" data-category="Laptop"> Laptop (40 cm)</label>
        <label><input type="radio" name="screenType" value="40" data-category="Tablet"> Tablet (40 cm)</label>
        <label><input type="radio" name="screenType" value="30" data-category="Smartphone"> Phone (30 cm)</label>
      </div>
    </fieldset>
```

- [ ] **Step 2.2: Add arc-minute results section**

After the closing `</div>` of `<div class="table-wrapper">` and before `<div id="accessibility">`, insert:

```html
  <div id="arcMinuteResults" style="display:none;">
    <h2>Arc-Minute Thresholds</h2>
    <p>Minimum character height at <span id="arcDistDisplay"></span> cm viewing distance (ISO 9241-303):</p>
    <div class="table-wrapper">
      <table id="arcTable">
        <thead>
          <tr>
            <th>Arc minutes</th>
            <th>Min. character height (dpx)</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>16′</td>
            <td id="arc16"></td>
            <td>Secondary / non-work information</td>
          </tr>
          <tr>
            <td>20′</td>
            <td id="arc20"></td>
            <td>Minimum character size</td>
          </tr>
          <tr>
            <td>22′</td>
            <td id="arc22"></td>
            <td>Recommended character size</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
```

- [ ] **Step 2.3: Add `.screen-types` layout rule to style.css**

At the end of `character-height-calculator/style.css`, append:

```css
/* Viewing distance screen type shortcuts */
.screen-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 1.5em;
  margin-top: 0.5em;
}
```

- [ ] **Step 2.4: Verify structure in browser**

Open/reload the page.
- New "Viewing Distance" fieldset appears below Display Parameters, with a number input and 4 radio buttons
- Arc-minute section is hidden (correct — no data yet)
- Existing zoom table and accessibility section still work

- [ ] **Step 2.5: Commit**

```bash
git add character-height-calculator/index.html character-height-calculator/style.css
git commit -m "feat: add viewing distance form fields and arc-minute results HTML"
```

---

## Task 3: Add `calcArcMinuteThreshold` function + store category in presetMap

**Files:**
- Modify: `character-height-calculator/index.html` (inline `<script>`)

- [ ] **Step 3.1: Add `calcArcMinuteThreshold` function**

In the `<script>` block, after the `calcPPI` function (currently ends around `return pixelDiagonal / diagonal;`), add:

```js
    function calcArcMinuteThreshold(pixelPitchMm, viewingDistCm, thresholdArcMin) {
      const distMm = viewingDistCm * 10;
      for (let n = 1; n < 100; n++) {
        const charMm = n * pixelPitchMm;
        const arcMin = (2 * Math.atan(charMm / 2 / distMm) * 180 / Math.PI) * 60;
        if (arcMin > thresholdArcMin) return n;
      }
      return '>99';
    }
```

- [ ] **Step 3.2: Store category in presetMap**

In `populatePresetSelect()`, find the line:
```js
      presetMap[device.key] = device;
```
Replace it with:
```js
      presetMap[device.key] = { ...device, category: category.category };
```

- [ ] **Step 3.3: Verify function exists in browser console**

Open browser console on the page and run:
```js
calcArcMinuteThreshold(0.265, 50, 20)
```
Expected result: `11` (at 50 cm with a typical 0.265 mm/px pitch, 20 arc minutes ≈ 11 dpx).

- [ ] **Step 3.4: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "feat: add calcArcMinuteThreshold function and store category in presetMap"
```

---

## Task 4: Wire screen type radios ↔ distance field

**Files:**
- Modify: `character-height-calculator/index.html` (inline `<script>`)

- [ ] **Step 4.1: Add radio → distance listener**

In the `<script>` block, after the existing `charTable.addEventListener('keydown', ...)` block, add:

```js
    // Screen type radio → auto-fill distance
    document.querySelectorAll('input[name="screenType"]').forEach(radio => {
      radio.addEventListener('change', function () {
        document.getElementById('viewingDistance').value = this.value;
      });
    });

    // Typing in distance → clear radio selection
    document.getElementById('viewingDistance').addEventListener('input', function () {
      document.querySelectorAll('input[name="screenType"]').forEach(r => r.checked = false);
    });
```

- [ ] **Step 4.2: Verify in browser**

- Click "Monitor (50 cm)" radio → distance field shows `50`
- Click "Phone (30 cm)" radio → distance field shows `30`
- Type `65` in the distance field → all radios become unchecked

- [ ] **Step 4.3: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "feat: wire screen type radios to viewing distance field"
```

---

## Task 5: Wire preset selection → auto-fill distance + radio + auto-calculate

**Files:**
- Modify: `character-height-calculator/index.html` (inline `<script>`)

- [ ] **Step 5.1: Update the presetSelect change listener**

Find the existing `presetSelect` change listener:
```js
    document.getElementById('presetSelect').addEventListener('change', function() {
      if (this.value === "custom") {
        document.getElementById('displayForm').reset();
      } else {
        const preset = presetMap[this.value];
        document.getElementById('pixelWidth').value = preset.width;
        document.getElementById('pixelHeight').value = preset.height;
        document.getElementById('diagonal').value = preset.diagonal;
      }
      updateFieldsetDisabled();
    });
```

Replace it with:
```js
    const categoryDistMap = {
      'Office Display': 50,
      'Laptop': 40,
      'Tablet': 40,
      'Smartphone': 30
    };

    document.getElementById('presetSelect').addEventListener('change', function () {
      if (this.value === 'custom') {
        document.getElementById('displayForm').reset();
        document.getElementById('arcMinuteResults').style.display = 'none';
      } else {
        const preset = presetMap[this.value];
        document.getElementById('pixelWidth').value = preset.width;
        document.getElementById('pixelHeight').value = preset.height;
        document.getElementById('diagonal').value = preset.diagonal;

        // Auto-fill distance and matching radio
        const dist = categoryDistMap[preset.category];
        if (dist !== undefined) {
          document.getElementById('viewingDistance').value = dist;
          document.querySelectorAll('input[name="screenType"]').forEach(r => {
            r.checked = r.dataset.category === preset.category;
          });
        }

        // Auto-calculate
        document.getElementById('displayForm').dispatchEvent(
          new Event('submit', { cancelable: true })
        );
      }
      updateFieldsetDisabled();
    });
```

- [ ] **Step 5.2: Verify in browser**

- Select "NEC MultiSync EA273WMi 27\"" from the dropdown
  - Fields populate: 1920 × 1080, diagonal 27
  - Distance fills to 50, "Monitor" radio checked
  - Zoom table appears automatically
- Select "Fujitsu Lifebook U747 14\" FHD"
  - Fields: 1920 × 1080, diagonal 14
  - Distance fills to 40, "Laptop" radio checked
  - Zoom table appears automatically
- Select "Custom" → all fields clear, table hides

- [ ] **Step 5.3: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "feat: auto-fill distance and auto-calculate when preset is selected"
```

---

## Task 6: Hook arc-minute calculation into the form submit handler

**Files:**
- Modify: `character-height-calculator/index.html` (inline `<script>`)

- [ ] **Step 6.1: Read viewingDistance in the submit handler**

Find the submit handler opening:
```js
    document.getElementById('displayForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const width = parseInt(document.getElementById('pixelWidth').value, 10);
      const height = parseInt(document.getElementById('pixelHeight').value, 10);
      const diagonal = parseFloat(document.getElementById('diagonal').value);
```

Add one line immediately after the three existing `const` declarations:
```js
      const viewingDist = parseFloat(document.getElementById('viewingDistance').value) || 0;
```

- [ ] **Step 6.2: Display arc-minute results after the table is built**

Find the line that shows the table (currently near the end of the submit handler):
```js
      charTable.style.display = '';
      updateActionButtons();
```

Insert the arc-minute block immediately before `charTable.style.display = ''`:
```js
      // Arc-minute thresholds (only if viewing distance is provided)
      const arcSection = document.getElementById('arcMinuteResults');
      if (viewingDist > 0) {
        const pixelPitch = calcPixelPitch(width, height, diagonal);
        document.getElementById('arc16').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 16) + ' dpx';
        document.getElementById('arc20').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 20) + ' dpx';
        document.getElementById('arc22').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 22) + ' dpx';
        document.getElementById('arcDistDisplay').textContent = viewingDist;
        arcSection.style.display = '';
      } else {
        arcSection.style.display = 'none';
      }

```

Note: `pixelPitch` is already computed earlier in the handler — you are reusing the same value, not recomputing. Find where `const pixelPitch = calcPixelPitch(...)` is declared in the handler and remove the duplicate declaration inside the arc-minute block, replacing it with just the variable reference.

The relevant section of the submit handler after both edits should read:

```js
      const pixelPitch = calcPixelPitch(width, height, diagonal);
      const ppi = calcPPI(width, height, diagonal);
      document.getElementById('result').innerHTML =
        `<strong>Pixel Pitch:</strong> ${pixelPitch.toFixed(3)} mm<br>
         <strong>PPI:</strong> ${ppi.toFixed(1)}`;

      // ... table building code (unchanged) ...

      charTable.style.display = '';

      // Arc-minute thresholds
      const arcSection = document.getElementById('arcMinuteResults');
      if (viewingDist > 0) {
        document.getElementById('arc16').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 16) + ' dpx';
        document.getElementById('arc20').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 20) + ' dpx';
        document.getElementById('arc22').textContent = calcArcMinuteThreshold(pixelPitch, viewingDist, 22) + ' dpx';
        document.getElementById('arcDistDisplay').textContent = viewingDist;
        arcSection.style.display = '';
      } else {
        arcSection.style.display = 'none';
      }

      updateActionButtons();
```

- [ ] **Step 6.3: Verify in browser**

- Select "Dell 27\" 4K" from dropdown
  - Zoom table appears
  - Arc-minute section appears below table showing "At 50 cm viewing distance"
  - 16′ row: should show `15 dpx`, 20′ row: `19 dpx`, 22′ row: `21 dpx` (±1 due to rounding)
    (Dell 27" 4K: pixel pitch ≈ 0.156 mm. High-DPI screens need more pixels per arc minute.)
- Manually enter values with an **empty** distance field → arc-minute section stays hidden
- Manually enter values with `50` in distance field → arc-minute section appears

- [ ] **Step 6.4: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "feat: show arc-minute thresholds (16/20/22) when viewing distance is set"
```

---

## Task 7: Fix reset handler

**Files:**
- Modify: `character-height-calculator/index.html` (inline `<script>`)

- [ ] **Step 7.1: Replace the reset handler**

Find the existing reset handler:
```js
    document.getElementById('resetBtn').addEventListener('click', function() {
      document.getElementById('displayForm').reset();
      document.getElementById('result').innerHTML = '';
      charTable.style.display = 'none';
      altTextInput.value = '';
      document.getElementById('presetCustom').checked = true;
      updateFieldsetDisabled();
      updateActionButtons();
    });
```

Replace it with:
```js
    document.getElementById('resetBtn').addEventListener('click', function () {
      document.getElementById('displayForm').reset();
      document.getElementById('result').innerHTML = '';
      charTable.style.display = 'none';
      document.getElementById('arcMinuteResults').style.display = 'none';
      altTextInput.value = '';
      document.getElementById('presetSelect').value = 'custom';
      document.querySelectorAll('input[name="screenType"]').forEach(r => r.checked = false);
      updateFieldsetDisabled();
      updateActionButtons();
    });
```

- [ ] **Step 7.2: Verify in browser**

- Select a preset → table and arc-minute section appear
- Click Reset
  - All form fields clear (including distance field)
  - All radios uncheck
  - Dropdown returns to Custom
  - Zoom table hides
  - Arc-minute section hides
  - No JS errors in console

- [ ] **Step 7.3: Commit**

```bash
git add character-height-calculator/index.html
git commit -m "fix: reset button clears distance/radios/arc-minutes, fix presetCustom bug"
```

---

## Task 8: Delete obsolete files

**Files:**
- Delete: `character-height-calculator copy 2/` (entire directory)
- Delete: root `index.html`, `styles.css`, `screens.js`, `screen-management.js`, `character-height-calculator.js`

- [ ] **Step 8.1: Delete the old German copy**

```bash
cd "character-size"
rm -r "character-height-calculator copy 2"
```

- [ ] **Step 8.2: Delete root-level files**

```bash
rm index.html styles.css screens.js screen-management.js character-height-calculator.js
```

- [ ] **Step 8.3: Verify only the right files remain**

```bash
find . -not -path './.git/*' -not -name '.DS_Store' -not -path './.nova/*' -type f | sort
```

Expected output:
```
./README.md
./character-height-calculator/index.html
./character-height-calculator/presets.json
./character-height-calculator/style.css
./docs/superpowers/plans/2026-04-22-character-height-calculator-cleanup.md
./docs/superpowers/specs/2026-04-22-character-height-calculator-cleanup-design.md
```

- [ ] **Step 8.4: Commit**

```bash
git add -A
git commit -m "chore: delete obsolete root files and old German copy"
```

---

## Task 9: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 9.1: Replace README content**

Replace the entire content of `README.md` with:

```markdown
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
```

- [ ] **Step 9.2: Commit**

```bash
git add README.md
git commit -m "docs: update README for consolidated project structure"
```

---

## Task 10: Final smoke test

No code changes — manual verification only.

- [ ] **Step 10.1: Full flow with preset selection**

Open `character-height-calculator/index.html`.
- Select "NEC MultiSync EA273WMi 27\"" → fields auto-fill (1920×1080, 27), distance=50, Monitor radio checked, zoom table appears, arc-minute section appears
- Arc-minute results: 16′ ≈ 8 dpx, 20′ ≈ 10 dpx, 22′ ≈ 11 dpx (±1 due to rounding)
  (NEC 27" 1080p: pixel pitch ≈ 0.311 mm at 50 cm viewing distance)

- [ ] **Step 10.2: Full flow with manual entry**

Click Reset. Enter manually: Width=2560, Height=1440, Diagonal=27, Distance=50.
- Click Calculate → zoom table appears, arc-minute section appears

- [ ] **Step 10.3: Full flow without distance**

Click Reset. Select "Dell 27\" 4K". Clear the distance field. Click Calculate.
- Zoom table appears
- Arc-minute section stays hidden

- [ ] **Step 10.4: Screenshot copy/download still works**

With a result showing:
- Click "Copy Screenshot to Clipboard" → success message appears (skip on Safari — button is hidden there by design)
- Click "Download Screenshot" → PNG file downloads

- [ ] **Step 10.5: Copy alt text still works**

With a result showing:
- Alt text field is populated
- Click the clipboard button → success message appears

- [ ] **Step 10.6: Keyboard navigation still works**

With the zoom table visible:
- Click the first table row → it receives focus
- Press ArrowDown → focus moves to next row
- Press ArrowUp → focus moves back

- [ ] **Step 10.7: Dark mode still works**

In OS/browser settings, switch to dark mode. Reload the page.
- All colours switch correctly (background, text, table headers, status colours)

- [ ] **Step 10.8: No console errors**

Open browser DevTools → Console. Perform a full calculation flow.
- Zero errors, zero uncaught exceptions
