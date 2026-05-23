# Font Size Visualisation Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `tool-character-size-visualisation/index.html` with a redesigned version using the project's design system, and create `style.css` for tool-specific layout.

**Architecture:** Two files — `style.css` handles tool-specific layout (centred max-width 960px, 3-column grid, column headers, size rows, mobile tabs); `index.html` holds all markup, `@font-face` declarations, Google Fonts `<link>`, and inline JS. No build step — open directly in a browser.

**Tech Stack:** Vanilla HTML/CSS/JS, `../shared.css` CSS variables, `light-dark()` theming, Google Fonts CDN, `@font-face` from `https://amh.me/allianz/fonts/`.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `tool-character-size-visualisation/style.css` | Layout, grid, column headers, size rows, mobile tabs |
| Replace | `tool-character-size-visualisation/index.html` | Markup, font loading, inline JS |
| Modify | `index.html` (root) | Add project card |

---

### Task 1: Create style.css

**Files:**
- Create: `tool-character-size-visualisation/style.css`

- [ ] **Step 1: Create the file with the complete CSS**

```css
body {
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--muted);
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

fieldset {
  margin-bottom: 1.5rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  padding-top: 0.5rem;
}

.sample-wrap {
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.weight-group {
  display: flex;
  gap: 0.5rem;
}

.weight-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}

.weight-btn[aria-pressed="true"] {
  background: light-dark(rgba(0, 102, 153, 0.12), rgba(0, 191, 217, 0.15));
  border-color: var(--accent);
  color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.col {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border);
}
.col:last-child {
  border-right: none;
}

.col-head {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.col-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rows {
  display: flex;
  flex-direction: column;
}

.size-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 1rem;
  border-bottom: 1px solid var(--border);
  min-height: 2.25rem;
}
.size-row:last-child {
  border-bottom: none;
}

.size-lbl {
  font-family: ui-monospace, 'Courier New', monospace;
  font-size: 0.7rem;
  color: var(--muted);
  min-width: 2.5rem;
  flex-shrink: 0;
  line-height: 1;
}

.sample-text {
  flex: 1;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--text);
}

.tab-strip {
  display: none;
  border: 1px solid var(--border);
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  margin-bottom: 0;
}

.tab-btn {
  flex: 1;
  background: var(--surface);
  border: none;
  border-right: 1px solid var(--border);
  color: var(--muted);
  padding: 0.6em 0.5em;
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.tab-btn:last-child {
  border-right: none;
}
.tab-btn[aria-selected="true"] {
  background: var(--accent);
  color: #fff;
}

@media (max-width: 640px) {
  body { padding: 1rem; }

  .tab-strip { display: flex; }

  .grid {
    grid-template-columns: 1fr;
    border-radius: 0 0 6px 6px;
  }

  .col {
    display: none;
    border-right: none;
  }
  .col.active { display: flex; }
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls "tool-character-size-visualisation/style.css"
```
Expected: file listed with no error.

- [ ] **Step 3: Commit**

```bash
git add tool-character-size-visualisation/style.css
git commit -m "feat(tool-character-size-visualisation): add style.css"
```

---

### Task 2: Rewrite index.html — markup and font loading

**Files:**
- Replace: `tool-character-size-visualisation/index.html`

- [ ] **Step 1: Replace the entire file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Font Size Visualisation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,700;1,400&family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&family=Noto+Sans:ital,wght@0,300;0,400;0,700;1,400&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Roboto:ital,wght@0,300;0,400;0,700;1,400&family=Source+Sans+3:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../shared.css">
  <link rel="stylesheet" href="style.css">
  <style>
    @font-face { font-family: 'AllianzNeo'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-Light.woff2') format('woff2'); font-weight: 300; font-style: normal; font-display: swap; }
    @font-face { font-family: 'AllianzNeo'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-LightItalic.woff2') format('woff2'); font-weight: 300; font-style: italic; font-display: swap; }
    @font-face { font-family: 'AllianzNeo'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-Regular.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
    @font-face { font-family: 'AllianzNeo'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-Italic.woff2') format('woff2'); font-weight: 400; font-style: italic; font-display: swap; }
    @font-face { font-family: 'AllianzNeo'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-SemiBold.woff2') format('woff2'); font-weight: 600; font-style: normal; font-display: swap; }
    @font-face { font-family: 'AllianzNeo'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-SemiBoldIt.woff2') format('woff2'); font-weight: 600; font-style: italic; font-display: swap; }
    @font-face { font-family: 'AllianzNeo'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-Bold.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }
    @font-face { font-family: 'AllianzNeo'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-BoldItalic.woff2') format('woff2'); font-weight: 700; font-style: italic; font-display: swap; }
    @font-face { font-family: 'AllianzNeoCondensed'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-CondLight.woff2') format('woff2'); font-weight: 300; font-style: normal; font-display: swap; }
    @font-face { font-family: 'AllianzNeoCondensed'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-Condensed.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
    @font-face { font-family: 'AllianzNeoCondensed'; src: url('https://amh.me/allianz/fonts/AllianzNeoW04-CondensedBold.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }
  </style>
</head>
<body>

<h1>Font Size Visualisation <span class="status status-draft">Draft</span></h1>
<p class="subtitle">Compare how System, Google, and Allianz Neo fonts render at small sizes — spot counter clarity and character confusion at a glance.</p>

<fieldset>
  <legend>Controls</legend>
  <div class="controls">
    <div class="sample-wrap">
      <label for="sampleInput">Sample text</label>
      <input type="text" id="sampleInput"
             value="E aecg · Il1ij · 0Oo · bd · rn/m — Hamburgefons"
             maxlength="120">
    </div>
    <div>
      <label id="weightLabel">Weight</label>
      <div class="weight-group" role="group" aria-labelledby="weightLabel">
        <button class="weight-btn" data-weight="400" aria-pressed="true">Regular</button>
        <button class="weight-btn" data-weight="700" aria-pressed="false">Bold</button>
      </div>
    </div>
  </div>
</fieldset>

<nav class="tab-strip" aria-label="Font column">
  <button class="tab-btn" data-col="0" aria-selected="true">System</button>
  <button class="tab-btn" data-col="1" aria-selected="false">Google</button>
  <button class="tab-btn" data-col="2" aria-selected="false">Allianz</button>
</nav>

<div class="grid">

  <section class="col active" id="col0" aria-labelledby="col0-label">
    <div class="col-head">
      <div class="col-label" id="col0-label">System font</div>
      <label class="visually-hidden" for="sysSelect">System font family</label>
      <select id="sysSelect">
        <optgroup label="Sans-serif">
          <option value="Arial, Helvetica, sans-serif" selected>Arial</option>
          <option value="Helvetica, Arial, sans-serif">Helvetica</option>
          <option value="Verdana, sans-serif">Verdana</option>
          <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
          <option value="Tahoma, sans-serif">Tahoma</option>
          <option value="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">System UI</option>
        </optgroup>
        <optgroup label="Serif">
          <option value="Georgia, serif">Georgia</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="Palatino, 'Palatino Linotype', serif">Palatino</option>
        </optgroup>
        <optgroup label="Monospace">
          <option value="'Courier New', monospace">Courier New</option>
        </optgroup>
      </select>
    </div>
    <div class="rows" id="rows0"></div>
  </section>

  <section class="col" id="col1" aria-labelledby="col1-label">
    <div class="col-head">
      <div class="col-label" id="col1-label">Google font</div>
      <label class="visually-hidden" for="gooSelect">Google font family</label>
      <select id="gooSelect">
        <optgroup label="Sans-serif">
          <option value="'Open Sans', sans-serif" selected>Open Sans</option>
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="'Noto Sans', sans-serif">Noto Sans</option>
          <option value="Lato, sans-serif">Lato</option>
          <option value="'Source Sans 3', sans-serif">Source Sans 3</option>
          <option value="'DM Sans', sans-serif">DM Sans</option>
        </optgroup>
        <optgroup label="Serif">
          <option value="'Playfair Display', serif">Playfair Display</option>
          <option value="Merriweather, serif">Merriweather</option>
          <option value="'Libre Baskerville', serif">Libre Baskerville</option>
        </optgroup>
      </select>
    </div>
    <div class="rows" id="rows1"></div>
  </section>

  <section class="col" id="col2" aria-labelledby="col2-label">
    <div class="col-head">
      <div class="col-label" id="col2-label">
        Corporate font
        <span class="status status-demo">Allianz Neo W04</span>
      </div>
      <label class="visually-hidden" for="azSelect">Allianz Neo variant</label>
      <select id="azSelect">
        <optgroup label="Regular">
          <option value="AllianzNeo|300|normal">Light</option>
          <option value="AllianzNeo|300|italic">Light Italic</option>
          <option value="AllianzNeo|400|normal" selected>Regular</option>
          <option value="AllianzNeo|400|italic">Italic</option>
          <option value="AllianzNeo|600|normal">SemiBold</option>
          <option value="AllianzNeo|600|italic">SemiBold Italic</option>
          <option value="AllianzNeo|700|normal">Bold</option>
          <option value="AllianzNeo|700|italic">Bold Italic</option>
        </optgroup>
        <optgroup label="Condensed">
          <option value="AllianzNeoCondensed|300|normal">Condensed Light</option>
          <option value="AllianzNeoCondensed|400|normal">Condensed Regular</option>
          <option value="AllianzNeoCondensed|700|normal">Condensed Bold</option>
        </optgroup>
      </select>
    </div>
    <div class="rows" id="rows2"></div>
  </section>

</div>

<a class="back" href="../index.html">← Back to projects</a>

<script>
const SIZES = [8, 10, 12, 14, 16, 18, 20, 24];
const DEFAULT_SAMPLE = 'E aecg · Il1ij · 0Oo · bd · rn/m — Hamburgefons';

let currentWeight = 400;
let currentSample = DEFAULT_SAMPLE;
let activeCol = 0;

const sampleInput = document.getElementById('sampleInput');
const sysSelect   = document.getElementById('sysSelect');
const gooSelect   = document.getElementById('gooSelect');
const azSelect    = document.getElementById('azSelect');

function parseAz() {
  const [fam, w, sty] = azSelect.value.split('|');
  return { family: `'${fam}', sans-serif`, weight: parseInt(w, 10), style: sty };
}

function getConfigs() {
  const az = parseAz();
  return [
    { rowsId: 'rows0', family: sysSelect.value, weight: currentWeight, style: 'normal' },
    { rowsId: 'rows1', family: gooSelect.value, weight: currentWeight, style: 'normal' },
    { rowsId: 'rows2', family: az.family,        weight: az.weight,    style: az.style  },
  ];
}

function buildRows(rowsId, family, weight, style) {
  const container = document.getElementById(rowsId);
  container.innerHTML = '';
  SIZES.forEach(size => {
    const row = document.createElement('div');
    row.className = 'size-row';

    const lbl = document.createElement('span');
    lbl.className = 'size-lbl';
    lbl.textContent = size + 'px';

    const txt = document.createElement('span');
    txt.className = 'sample-text';
    txt.style.cssText = `font-size:${size}px;font-family:${family};font-weight:${weight};font-style:${style}`;
    txt.textContent = currentSample;

    row.appendChild(lbl);
    row.appendChild(txt);
    container.appendChild(row);
  });
}

function buildAll() {
  getConfigs().forEach(c => buildRows(c.rowsId, c.family, c.weight, c.style));
}

function updateSamples() {
  getConfigs().forEach(({ rowsId, family, weight, style }) => {
    document.querySelectorAll(`#${rowsId} .sample-text`).forEach(el => {
      el.style.fontFamily = family;
      el.style.fontWeight = weight;
      el.style.fontStyle  = style;
      el.textContent      = currentSample;
    });
  });
}

// Weight toggle
document.querySelectorAll('.weight-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentWeight = parseInt(btn.dataset.weight, 10);
    document.querySelectorAll('.weight-btn').forEach(b => {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    updateSamples();
  });
});

// Font selects — each updates its own column via updateSamples()
sysSelect.addEventListener('change', updateSamples);
gooSelect.addEventListener('change', updateSamples);
azSelect.addEventListener('change',  updateSamples);

// Sample text
sampleInput.addEventListener('input', () => {
  currentSample = sampleInput.value || DEFAULT_SAMPLE;
  updateSamples();
});

// Mobile tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const cols    = document.querySelectorAll('.col');

function switchTab(idx) {
  activeCol = idx;
  cols.forEach((col, i) => col.classList.toggle('active', i === idx));
  tabBtns.forEach((btn, i) => btn.setAttribute('aria-selected', String(i === idx)));
}

tabBtns.forEach((btn, i) => btn.addEventListener('click', () => switchTab(i)));

buildAll();
</script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify layout**

Open `tool-character-size-visualisation/index.html` directly in a browser (no server needed — no fetch calls).

Check:
- h1 "Font Size Visualisation" with grey "Draft" badge
- Subtitle in muted colour beneath h1
- "Controls" fieldset with sample text input and Regular/Bold buttons
- Three columns side by side inside a rounded border, each with a header and a font select
- Allianz column header shows a blue "Allianz Neo W04" badge
- Size rows 8 px through 24 px visible in each column with the default sample text
- "← Back to projects" link at the bottom
- Light/dark follows OS preference — no toggle button on the page

- [ ] **Step 3: Verify interactivity**

- Type new text in the sample input → all three columns update immediately
- Click "Bold" → System and Google columns go bold; Allianz column is unaffected (weight comes from its select)
- Change the Allianz select to "SemiBold Italic" → col 3 shows SemiBold + italic rendering
- Change the System font select to "Verdana" → only col 1 updates

- [ ] **Step 4: Verify mobile layout**

Resize browser to below 640 px width (or use DevTools device emulation).

Expected:
- Tab strip appears (System / Google / Allianz)
- Only the System column is visible by default
- Clicking "Google" shows the Google column; System and Allianz hide

- [ ] **Step 5: Verify Allianz fonts load**

With an internet connection, inspect the Network tab in DevTools and confirm requests to `https://amh.me/allianz/fonts/AllianzNeoW04-Regular.woff2` return 200. The Allianz column text should render in a noticeably different typeface from Arial.

- [ ] **Step 6: Commit**

```bash
git add tool-character-size-visualisation/index.html
git commit -m "feat(tool-character-size-visualisation): rewrite with project design system"
```

---

### Task 3: Add card to project index

**Files:**
- Modify: `index.html` (root)

- [ ] **Step 1: Add the card inside `<div class="projects">`**

In the root `index.html`, add the following block as the last card inside `<div class="projects">`, after the closing `</a>` of the "Joke Generator" card:

```html
        <a href="tool-character-size-visualisation/index.html" class="project-card">
            <div class="card-header">
                <h2>Font Size Visualisation</h2>
                <span class="status status-draft">Draft</span>
            </div>
            <p>Compare System, Google, and Allianz Neo fonts side by side at 8–24 px. Spot counter clarity and character confusion at small sizes.</p>
            <span class="project-link">Open →</span>
        </a>
```

- [ ] **Step 2: Open root index.html in browser and verify**

Expected: "Font Size Visualisation" card appears in the project grid with a yellow "Draft" badge. Clicking it navigates to the tool.

- [ ] **Step 3: Commit and push**

```bash
git add index.html
git commit -m "feat(index): add Font Size Visualisation project card"
git push
```
