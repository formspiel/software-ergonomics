'use strict';

/* ------------------------------------------------------------ *
 * Display Character Size Calculator
 * ------------------------------------------------------------ */

const STORAGE_KEY = 'tool-display-legibility:custom-presets';

/* Cap-height-to-em ratios from published font metrics.
 * cap_height_px = font_size_css_px × capRatio
 * Hinting quality: 'excellent' | 'good' | 'verify' | 'issues'  */
const FONTS = [
	{ name: 'system-ui',     cssFamily: 'system-ui, sans-serif',
	                         capRatio: 0.700, hinting: 'excellent', notes: 'Platform default UI font: San Francisco (macOS/iOS), Segoe UI (Windows), Roboto (Android). Cap ratio 0.700 matches SF and Segoe; Roboto is slightly higher (0.711). Use Measure & verify to confirm on your platform.' },
	{ name: 'Segoe UI',      capRatio: 0.700, hinting: 'excellent', notes: 'x-axis hinted; primary Windows UI font.' },
	{ name: 'San Francisco', capRatio: 0.700, hinting: 'good',      notes: 'macOS / iOS system font.' },
	{ name: 'Roboto',        capRatio: 0.711, hinting: 'verify',    notes: 'Android default; web rendering varies.' },
	{ name: 'Helvetica',     capRatio: 0.717, hinting: 'verify',    notes: 'macOS native; less optimised on Windows.' },
	{ name: 'Arial',         capRatio: 0.716, hinting: 'good',      notes: 'Well-hinted for Windows.' },
	{ name: 'Verdana',       capRatio: 0.728, hinting: 'good',      notes: 'Designed for on-screen readability.' },
	{ name: 'Calibri',       capRatio: 0.638, hinting: 'good',      notes: 'ClearType-optimised.' },
	{ name: 'Tahoma',        capRatio: 0.725, hinting: 'verify',    notes: 'Older Windows screen font; verify on target.' },
	{ name: 'Aptos',         capRatio: 0.694, hinting: 'verify',    notes: 'Modern Microsoft default; verify rendering at small sizes.' },
	{ name: 'Consolas',      capRatio: 0.633, hinting: 'good',      notes: 'Monospace; well-hinted for code.' },
	{ name: 'Times New Roman', capRatio: 0.662, hinting: 'verify',  notes: 'Serif; verify rendering at small sizes.' },
	{ name: 'Georgia',       capRatio: 0.692, hinting: 'good',      notes: 'Serif designed for screen.' },
];

const HINTING_BADGES = {
	excellent: { cls: 'badge-ok',   text: 'Excellent' },
	good:      { cls: 'badge-ok',   text: 'Good' },
	verify:    { cls: 'badge-warn', text: 'Verify' },
	issues:    { cls: 'badge-err',  text: 'Known issues' },
};

const CATEGORY_DISTANCE = {
	'Office Display': 50,
	'Laptop': 40,
	'Tablet': 40,
	'Smartphone': 30,
};

const DOM = {
	form:            document.getElementById('config-form'),
	sourceBtns:      document.querySelectorAll('.source-btn'),
	panelDetect:     document.getElementById('panel-detect'),
	panelPreset:     document.getElementById('panel-preset'),
	dViewport:       document.getElementById('d-viewport'),
	dResolution:     document.getElementById('d-resolution'),
	dDpr:            document.getElementById('d-dpr'),
	dDepth:          document.getElementById('d-depth'),
	detectDiag:      document.getElementById('detect-diag'),
	detectDiagError: document.getElementById('detect-diag-error'),
	useDetectedBtn:  document.getElementById('use-detected'),
	preset:          document.getElementById('preset'),
	displayFields:   document.getElementById('display-fields'),
	width:           document.getElementById('width'),
	height:          document.getElementById('height'),
	diagonal:        document.getElementById('diagonal'),
	dpr:             document.getElementById('dpr'),
	distance:        document.getElementById('distance'),
	shortcutBtns:    document.querySelectorAll('.distance-shortcuts button'),
	savePresetBtns:  document.querySelectorAll('.save-preset-btn'),
	resetBtn:        document.getElementById('reset-btn'),
	error:           document.getElementById('error'),
	results:         document.getElementById('results'),

	statPpi:        document.getElementById('stat-ppi'),
	statPpiClass:   document.getElementById('stat-ppi-class'),
	statPitch:      document.getElementById('stat-pitch'),
	statDpr:        document.getElementById('stat-dpr'),

	arcDistDisplay: document.getElementById('arc-dist-display'),
	arcTbody:       document.getElementById('arc-tbody'),
	rangeTbody:     document.getElementById('range-tbody'),
	zoomTable:      document.getElementById('zoom-table'),
	zoomTbody:      document.getElementById('zoom-tbody'),
	zoomCaption:    document.getElementById('zoom-caption'),
	lineheightGrid: document.getElementById('lineheight-grid'),

	fontName:       document.getElementById('font-name'),
	fontSize:       document.getElementById('font-size'),
	fontUnit:       document.getElementById('font-unit'),
	fontResult:     document.getElementById('font-result'),
	fontOutput:     document.getElementById('font-output'),
	fontHint:       document.getElementById('font-hint'),

	validateChar:   document.getElementById('validate-char'),
	validateLabel:  document.getElementById('validate-render-label'),
	measureInput:   document.getElementById('measure-capheight'),
	verifyBtn:      document.getElementById('verify-btn'),
	verifyResult:   document.getElementById('verify-result'),

	stickyBar:    document.getElementById('sticky-bar'),
	stickyDevice: document.getElementById('sticky-device'),
	stickyStats:  document.getElementById('sticky-stats'),

	copyLink:       document.getElementById('copy-link'),
	copyShot:       document.getElementById('copy-screenshot'),
	downloadShot:   document.getElementById('download-screenshot'),
	exportStatus:   document.getElementById('export-status'),
};

let presetData = [];
const presetMap = {};

let currentSource   = 'detect';
let detectDiagUnit  = 'in';
let manualDiagUnit  = 'in';
let measureUnit     = 'csspx';

/* Roving tabindex + arrow key navigation for exclusive button groups.
 * Follows the ARIA tabs / radio group keyboard pattern:
 * ArrowRight/Down → next, ArrowLeft/Up → prev, Home → first, End → last.
 * Calls onArrow(btn) immediately (automatic activation). */
function rovingGroup(nodeList, onArrow) {
	const btns = [...nodeList];
	btns.forEach(btn => {
		btn.addEventListener('keydown', e => {
			const i = btns.indexOf(btn);
			let next = -1;
			if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  next = (i + 1) % btns.length;
			if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    next = (i - 1 + btns.length) % btns.length;
			if (e.key === 'Home') next = 0;
			if (e.key === 'End')  next = btns.length - 1;
			if (next === -1) return;
			e.preventDefault();
			btns.forEach((b, j) => b.setAttribute('tabindex', j === next ? '0' : '-1'));
			btns[next].focus();
			onArrow(btns[next]);
		});
	});
}

/* ------------------------------------------------------------ *
 * Screen detection                                             *
 * ------------------------------------------------------------ */

function detectCurrentScreen() {
	const dpr   = window.devicePixelRatio || 1;
	const physW = Math.round(screen.width  * dpr);
	const physH = Math.round(screen.height * dpr);
	DOM.dViewport.textContent   = `${window.innerWidth} × ${window.innerHeight}`;
	DOM.dResolution.textContent = `${physW} × ${physH}`;
	DOM.dDpr.textContent        = `${dpr}×`;
	DOM.dDepth.textContent      = `${screen.colorDepth}-bit`;
}

function switchSource(source) {
	currentSource = source;
	DOM.sourceBtns.forEach(btn => {
		const active = btn.dataset.source === source;
		btn.setAttribute('aria-selected', active ? 'true' : 'false');
		btn.setAttribute('tabindex',      active ? '0'    : '-1');
	});
	DOM.panelDetect.hidden   = source !== 'detect';
	DOM.panelPreset.hidden   = source !== 'preset';
	DOM.displayFields.hidden = source !== 'manual';
}

function useDetectedValues() {
	const diagRaw = parseFloat(DOM.detectDiag.value);
	if (!diagRaw || diagRaw <= 0) {
		DOM.detectDiagError.hidden = false;
		DOM.detectDiag.focus();
		return;
	}
	DOM.detectDiagError.hidden = true;

	const diagIn = detectDiagUnit === 'mm' ? diagRaw / 25.4 : diagRaw;
	const dpr    = window.devicePixelRatio || 1;
	const physW  = Math.round(screen.width  * dpr);
	const physH  = Math.round(screen.height * dpr);

	DOM.width.value    = physW;
	DOM.height.value   = physH;
	DOM.diagonal.value = diagIn.toFixed(3);
	DOM.dpr.value      = dpr;

	calculate();
}

/* ------------------------------------------------------------ *
 * Math                                                          *
 * ------------------------------------------------------------ */

function pixelPitchMm(width, height, diagonal) {
	const pxDiag = Math.sqrt(width * width + height * height);
	return (diagonal * 25.4) / pxDiag;
}

function ppi(width, height, diagonal) {
	const pxDiag = Math.sqrt(width * width + height * height);
	return pxDiag / diagonal;
}

function ppiClassification(p) {
	if (p < 96)  return 'Low-PPI office display — font hinting is critical';
	if (p < 160) return 'Mid-range — standard recommendations apply';
	if (p < 220) return 'High-DPI — rendering artefacts reduce significantly';
	return 'Retina / HiDPI — sub-pixel considerations change';
}

function arcMinDpx(pitchMm, distCm, thresholdArcMin) {
	const distMm = distCm * 10;
	for (let n = 1; n < 200; n++) {
		const charMm = n * pitchMm;
		const arcMin = (2 * Math.atan(charMm / 2 / distMm) * 180 / Math.PI) * 60;
		if (arcMin > thresholdArcMin) return n;
	}
	return null;
}

/* ------------------------------------------------------------ *
 * Presets                                                       *
 * ------------------------------------------------------------ */

function loadCustomPresets() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveCustomPresets(list) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function populatePresetSelect() {
	DOM.preset.innerHTML = '';

	const blank = document.createElement('option');
	blank.value = 'custom';
	blank.textContent = '— Custom (enter values below) —';
	DOM.preset.appendChild(blank);

	const customs = loadCustomPresets();
	if (customs.length) {
		const og = document.createElement('optgroup');
		og.label = 'Saved (this browser)';
		customs.forEach(d => {
			const o = document.createElement('option');
			o.value = d.key;
			o.textContent = d.label;
			og.appendChild(o);
			presetMap[d.key] = d;
		});
		DOM.preset.appendChild(og);
	}

	presetData.forEach(cat => {
		const og = document.createElement('optgroup');
		og.label = cat.category;
		cat.devices.forEach(d => {
			const o = document.createElement('option');
			o.value = d.key;
			o.textContent = d.label;
			og.appendChild(o);
			presetMap[d.key] = { ...d, category: cat.category };
		});
		DOM.preset.appendChild(og);
	});
}

function applyPreset(key) {
	if (key === 'custom') {
		switchSource('manual');
		return;
	}
	const p = presetMap[key];
	if (!p) return;
	DOM.width.value    = p.width;
	DOM.height.value   = p.height;
	DOM.diagonal.value = p.diagonal;
	DOM.dpr.value      = p.dpr || 1;

	const dist = CATEGORY_DISTANCE[p.category];
	if (dist) {
		DOM.distance.value = dist;
		updateShortcutButtons();
	}
	calculate();
}

function saveCurrentAsPreset() {
	if (currentSource === 'detect') {
		const diagRaw = parseFloat(DOM.detectDiag.value);
		if (!diagRaw || diagRaw <= 0) {
			DOM.detectDiagError.hidden = false;
			DOM.detectDiag.focus();
			return;
		}
	}
	const label = prompt('Name for this preset:');
	if (!label) return;
	const cfg = readConfig();
	if (!cfg) {
		setError('Fill in display fields before saving a preset.');
		return;
	}
	const list = loadCustomPresets();
	const key = 'custom_' + Date.now();
	list.push({
		key, label,
		width: cfg.width, height: cfg.height,
		diagonal: cfg.diagonal, dpr: cfg.dpr,
		category: 'Custom',
	});
	saveCustomPresets(list);
	populatePresetSelect();
	DOM.preset.value = key;
}

/* ------------------------------------------------------------ *
 * Permalink                                                     *
 * ------------------------------------------------------------ */

function encodePermalink(cfg) {
	const params = new URLSearchParams({
		w: cfg.width, h: cfg.height,
		d: cfg.diagonal, s: cfg.dpr,
		v: cfg.distance,
	});
	return `${location.origin}${location.pathname}#${params.toString()}`;
}

function applyPermalinkFromHash() {
	if (!location.hash || location.hash.length < 2) return false;
	const params = new URLSearchParams(location.hash.slice(1));
	if (!params.has('w')) return false;
	DOM.width.value    = params.get('w') || '';
	DOM.height.value   = params.get('h') || '';
	DOM.diagonal.value = params.get('d') || '';
	DOM.dpr.value      = params.get('s') || 1;
	DOM.distance.value = params.get('v') || 50;
	switchSource('manual');
	updateShortcutButtons();
	return true;
}

/* ------------------------------------------------------------ *
 * Reading / validation                                          *
 * ------------------------------------------------------------ */

function readConfig() {
	const width    = parseInt(DOM.width.value, 10);
	const height   = parseInt(DOM.height.value, 10);
	let   diagonal = parseFloat(DOM.diagonal.value);
	const dpr      = parseFloat(DOM.dpr.value) || 1;
	const distance = parseFloat(DOM.distance.value) || 0;

	if (currentSource === 'manual' && manualDiagUnit === 'mm') {
		diagonal = diagonal / 25.4;
	}

	if (!width || !height || !diagonal || width <= 0 || height <= 0 || diagonal <= 0) {
		return null;
	}
	return { width, height, diagonal, dpr, distance };
}

function setError(msg) {
	if (!msg) {
		DOM.error.hidden = true;
		DOM.error.textContent = '';
		return;
	}
	DOM.error.hidden = false;
	DOM.error.textContent = msg;
}

/* ------------------------------------------------------------ *
 * Rendering                                                     *
 * ------------------------------------------------------------ */

const ARC_LEVELS = [
	{ arcMin: 16, label: '16′', meaning: 'Secondary / non-work information' },
	{ arcMin: 20, label: '20′', meaning: 'Minimum (ISO 9241-303)' },
	{ arcMin: 22, label: '22′', meaning: 'Recommended for prolonged reading' },
];

const RANGE_DISTANCES = [30, 40, 50, 60, 70, 80];

function renderProfile(cfg) {
	const pitch = pixelPitchMm(cfg.width, cfg.height, cfg.diagonal);
	const p     = ppi(cfg.width, cfg.height, cfg.diagonal);

	DOM.statPpi.textContent      = p.toFixed(1);
	DOM.statPpiClass.textContent = ppiClassification(p);
	DOM.statPitch.textContent    = pitch.toFixed(3);
	DOM.statDpr.textContent      = `${cfg.dpr}×`;

	return { pitch, p };
}

function renderArcTable(pitch, cfg) {
	DOM.arcDistDisplay.textContent = cfg.distance;
	DOM.arcTbody.innerHTML = '';

	ARC_LEVELS.forEach(({ arcMin, label, meaning }) => {
		const dpx = arcMinDpx(pitch, cfg.distance, arcMin);
		const tr = document.createElement('tr');
		if (dpx === null) {
			tr.innerHTML = `
				<td>${label}</td><td>${meaning}</td>
				<td>—</td><td>—</td><td>—</td>
				<td><span class="badge badge-err">N/A</span></td>`;
			DOM.arcTbody.appendChild(tr);
			return;
		}
		const cssPx = Math.ceil(dpx / cfg.dpr);
		const mm    = (dpx * pitch).toFixed(2);
		const matrixOk = dpx >= 9;
		const badge = matrixOk
			? '<span class="badge badge-ok">7×9 OK</span>'
			: `<span class="badge badge-warn">Below 9 px</span>`;
		tr.innerHTML = `
			<td>${label}</td>
			<td>${meaning}</td>
			<td>${dpx}</td>
			<td>${cssPx}</td>
			<td>${mm}</td>
			<td>${badge}</td>`;
		DOM.arcTbody.appendChild(tr);
	});
}

function renderRangeTable(pitch, cfg) {
	DOM.rangeTbody.innerHTML = '';
	RANGE_DISTANCES.forEach(d => {
		const dpx20 = arcMinDpx(pitch, d, 20);
		const dpx22 = arcMinDpx(pitch, d, 22);
		const tr = document.createElement('tr');
		if (d === Math.round(cfg.distance)) tr.classList.add('current-distance');
		const fmt = v => v === null ? '—'
			: `${v} dpx · ${Math.ceil(v / cfg.dpr)} CSS px`;
		tr.innerHTML = `
			<td>${d} cm</td>
			<td>${fmt(dpx20)}</td>
			<td>${fmt(dpx22)}</td>`;
		DOM.rangeTbody.appendChild(tr);
	});
}

function renderZoomTable(pitch, cfg) {
	const zooms = [1, 1.25, 1.5, 1.75, 2];
	const zoomLabels = ['100%', '125%', '150%', '175%', '200%'];
	const dpxs = [8, 9, 10, 11];
	const target = 3.2;
	const tolerance = 0.10;

	DOM.zoomTbody.innerHTML = '';
	const acceptable9 = [];

	dpxs.forEach(dpx => {
		const tr = document.createElement('tr');
		const th = document.createElement('th');
		th.scope = 'row';
		th.textContent = `${dpx} dpx`;
		tr.appendChild(th);

		zooms.forEach((zoom, i) => {
			const mm = pitch * dpx * zoom;
			const lower = target * (1 - tolerance);
			let cls = 'cell-err', state = 'below';
			if (mm >= target)       { cls = 'cell-ok';   state = 'ok'; }
			else if (mm >= lower)   { cls = 'cell-warn'; state = 'acceptable'; }
			const td = document.createElement('td');
			td.className = cls;
			const effectiveDpx = Math.round(dpx * zoom);
			const cssPx        = Math.ceil(effectiveDpx / cfg.dpr);
			td.innerHTML = `<strong>${mm.toFixed(2)} mm</strong><br>
				<small>${effectiveDpx} dpx · ${cssPx} CSS px</small>`;
			tr.appendChild(td);
			if (dpx === 9 && state !== 'below') acceptable9.push(zoomLabels[i]);
		});
		DOM.zoomTbody.appendChild(tr);
	});

	DOM.zoomCaption.textContent = acceptable9.length
		? `Acceptable character size for 9 dpx starts at ${acceptable9[0]} zoom.`
		: `No zoom level in this table achieves the 3.2 mm target for 9 dpx.`;
}

let currentPitch = null;
let currentCfg = null;

function populateFontSelect() {
	DOM.fontName.innerHTML = '';
	FONTS.forEach(f => {
		const o = document.createElement('option');
		o.value = f.name;
		o.textContent = f.name;
		DOM.fontName.appendChild(o);
	});
}

function renderFontSection() {
	if (!currentPitch || !currentCfg) return;
	const font = FONTS.find(f => f.name === DOM.fontName.value);
	if (!font) return;

	const sizeRaw = parseFloat(DOM.fontSize.value);
	if (!sizeRaw || sizeRaw <= 0) {
		DOM.fontResult.innerHTML = '';
		DOM.fontOutput.innerHTML = '';
		DOM.fontHint.textContent = '';
		DOM.validateLabel.textContent = 'Enter a font size in the Font compliance section above.';
		return;
	}

	const sizeCssPx = DOM.fontUnit.value === 'pt' ? sizeRaw * 1.333 : sizeRaw;
	const capCssPx  = sizeCssPx * font.capRatio;
	const capDpx    = capCssPx * currentCfg.dpr;
	const capMm     = capDpx * currentPitch;

	// Compliance against each arc-minute threshold
	const rows = ARC_LEVELS.map(({ arcMin, label, meaning }) => {
		const requiredDpx = arcMinDpx(currentPitch, currentCfg.distance, arcMin);
		let badge;
		if (requiredDpx === null) badge = '<span class="badge badge-err">N/A</span>';
		else if (capDpx >= requiredDpx) badge = '<span class="badge badge-ok">Pass</span>';
		else badge = '<span class="badge badge-err">Fail</span>';
		return `<tr>
			<td>${label}</td>
			<td>${meaning}</td>
			<td>${requiredDpx === null ? '—' : requiredDpx + ' dpx'}</td>
			<td>${badge}</td>
		</tr>`;
	}).join('');

	const hintBadge = HINTING_BADGES[font.hinting];

	DOM.fontResult.innerHTML = `
		<div class="stats-grid">
			<div class="stat">
				<span class="stat-value">${capCssPx.toFixed(1)}</span>
				<span class="stat-unit">CSS px cap height</span>
				<span class="stat-label">${font.name} at ${sizeRaw} ${DOM.fontUnit.value}</span>
			</div>
			<div class="stat">
				<span class="stat-value">${capDpx.toFixed(1)}</span>
				<span class="stat-unit">dpx cap height</span>
				<span class="stat-label">CSS px × DPR ${currentCfg.dpr}</span>
			</div>
			<div class="stat">
				<span class="stat-value">${capMm.toFixed(2)}</span>
				<span class="stat-unit">mm cap height</span>
				<span class="stat-label">Target ≥ 3.2 mm</span>
			</div>
		</div>
		<div class="table-wrap">
			<table class="arc-table">
				<thead><tr>
					<th>Threshold</th><th>Meaning</th><th>Required</th><th>Status</th>
				</tr></thead>
				<tbody>${rows}</tbody>
			</table>
		</div>
		<div class="hinting-row">
			<span class="hinting-label">Hinting quality:</span>
			<span class="badge ${hintBadge.cls}">${hintBadge.text}</span>
			<span class="hinting-notes">${font.notes}</span>
		</div>`;

	// CSS output
	const sizeCssPxRounded = Math.round(sizeCssPx * 100) / 100;
	const rem = (sizeCssPx / 16).toFixed(3).replace(/\.?0+$/, '');
	const tooSmall = sizeCssPx < 9;
	const cssFamily = font.cssFamily || `"${font.name}", sans-serif`;
	DOM.fontOutput.innerHTML = `
		<h3>CSS output</h3>
		<pre><code>font-family: ${cssFamily};
font-size: ${sizeCssPxRounded}px;   /* or ${rem}rem at 16 px root */
/* Cap height: ${capCssPx.toFixed(2)} CSS px · ${capDpx.toFixed(2)} dpx · ${capMm.toFixed(2)} mm */</code></pre>
		${tooSmall ? '<p class="font-warning">⚠ Below the 9 CSS px floor that some browsers enforce as a minimum render size.</p>' : ''}`;

	// Suggested minimum
	const required20 = arcMinDpx(currentPitch, currentCfg.distance, 20);
	if (required20 !== null) {
		const minCssPx = required20 / currentCfg.dpr / font.capRatio;
		const minPt = minCssPx / 1.333;
		DOM.fontHint.innerHTML = capDpx >= required20
			? `<strong>OK.</strong> ${font.name} at ${sizeRaw} ${DOM.fontUnit.value} meets the 20′ minimum on this screen.`
			: `<strong>Suggested minimum:</strong> to meet the 20′ ISO minimum, set ${font.name} to at least <strong>${minCssPx.toFixed(1)} CSS px</strong> (${minPt.toFixed(1)} pt).`;
	} else {
		DOM.fontHint.textContent = '';
	}

	// Update validation render target
	DOM.validateChar.style.fontFamily = font.cssFamily || `"${font.name}", sans-serif`;
	DOM.validateChar.style.fontSize   = sizeCssPx + 'px';
	DOM.validateLabel.textContent     = `${font.name} · ${sizeRaw} ${DOM.fontUnit.value} = ${sizeCssPx.toFixed(1)} CSS px`;
	DOM.verifyResult.innerHTML        = '';
}

function renderVerifyResult() {
	if (!currentPitch || !currentCfg) return;
	const raw = parseFloat(DOM.measureInput.value);
	if (!raw || raw <= 0) {
		DOM.verifyResult.innerHTML = '<p class="font-warning">Enter a measured pixel height to verify.</p>';
		return;
	}

	const capCssPx = measureUnit === 'dpx' ? raw / currentCfg.dpr : raw;
	const capDpx   = capCssPx * currentCfg.dpr;
	const capMm    = capDpx * currentPitch;

	const font      = FONTS.find(f => f.name === DOM.fontName.value);
	const sizeRaw   = parseFloat(DOM.fontSize.value);
	const sizeCssPx = DOM.fontUnit.value === 'pt' ? sizeRaw * 1.333 : sizeRaw;
	const measuredRatio = (font && sizeCssPx > 0) ? capCssPx / sizeCssPx : null;

	const rows = ARC_LEVELS.map(({ arcMin, label, meaning }) => {
		const requiredDpx = arcMinDpx(currentPitch, currentCfg.distance, arcMin);
		let badge;
		if (requiredDpx === null) badge = '<span class="badge badge-err">N/A</span>';
		else if (capDpx >= requiredDpx) badge = '<span class="badge badge-ok">Pass</span>';
		else badge = '<span class="badge badge-err">Fail</span>';
		return `<tr>
			<td>${label}</td><td>${meaning}</td>
			<td>${requiredDpx === null ? '—' : requiredDpx + ' dpx'}</td>
			<td>${badge}</td>
		</tr>`;
	}).join('');

	const ratioNote = measuredRatio !== null
		? `<p class="font-hint">Measured cap ratio: <strong>${measuredRatio.toFixed(3)}</strong>` +
		  (font ? ` &nbsp;· estimate for ${font.name}: ${font.capRatio.toFixed(3)}` : '') + `</p>`
		: '';

	DOM.verifyResult.innerHTML = `
		<div class="stats-grid">
			<div class="stat">
				<span class="stat-value">${capCssPx.toFixed(1)}</span>
				<span class="stat-unit">CSS px cap height</span>
				<span class="stat-label">Measured (from screenshot)</span>
			</div>
			<div class="stat">
				<span class="stat-value">${capDpx.toFixed(1)}</span>
				<span class="stat-unit">dpx cap height</span>
				<span class="stat-label">CSS px × DPR ${currentCfg.dpr}</span>
			</div>
			<div class="stat">
				<span class="stat-value">${capMm.toFixed(2)}</span>
				<span class="stat-unit">mm cap height</span>
				<span class="stat-label">Target ≥ 3.2 mm</span>
			</div>
		</div>
		<div class="table-wrap">
			<table class="arc-table">
				<thead><tr>
					<th>Threshold</th><th>Meaning</th><th>Required</th><th>Status</th>
				</tr></thead>
				<tbody>${rows}</tbody>
			</table>
		</div>
		${ratioNote}`;
}

function renderLineHeight(pitch, cfg) {
	DOM.lineheightGrid.innerHTML = '';
	const dpx20 = arcMinDpx(pitch, cfg.distance, 20);
	if (dpx20 === null) {
		DOM.lineheightGrid.innerHTML = '<p class="section-intro">Unable to compute — distance too large or screen too dense.</p>';
		return;
	}
	const cards = [
		{ ratio: 1.4, label: 'Minimum',     note: 'Lower bound — acceptable for short labels' },
		{ ratio: 1.5, label: 'Recommended', note: 'Sustained reading, body text' },
		{ ratio: 1.6, label: 'Comfortable', note: 'Long-form text, manuals' },
	];
	cards.forEach(({ ratio, label, note }) => {
		const lhDpx = Math.ceil(dpx20 * ratio);
		const lhCss = Math.ceil(lhDpx / cfg.dpr);
		const card = document.createElement('div');
		card.className = 'lineheight-card';
		card.innerHTML = `
			<div class="lh-label">${label} · ${ratio}×</div>
			<div class="lh-value">${lhDpx} dpx · ${lhCss} CSS px</div>
			<div class="lh-note">${note}</div>`;
		DOM.lineheightGrid.appendChild(card);
	});
}

function updateStickyBar(cfg, ppiValue) {
	let device;
	if (currentSource === 'preset' && DOM.preset.value !== 'custom') {
		device = presetMap[DOM.preset.value]?.label ?? 'Preset';
	} else if (currentSource === 'detect') {
		device = 'This screen';
	} else {
		device = `${cfg.width} × ${cfg.height} px`;
	}
	DOM.stickyDevice.textContent = device;

	const stats = [
		`${ppiValue.toFixed(0)} PPI`,
		`${cfg.width} × ${cfg.height}`,
		`DPR ${cfg.dpr}×`,
		`${cfg.distance} cm`,
	];
	DOM.stickyStats.innerHTML = stats.map(s => `<span>${s}</span>`).join('');
}

/* ------------------------------------------------------------ *
 * Calculate                                                     *
 * ------------------------------------------------------------ */

function calculate() {
	const cfg = readConfig();
	if (!cfg) {
		setError('Please fill in display width, height, and diagonal with valid numbers.');
		DOM.results.hidden = true;
		return;
	}
	if (!cfg.distance || cfg.distance <= 0) {
		setError('Please provide a viewing distance.');
		DOM.results.hidden = true;
		return;
	}
	setError('');

	const { pitch, p } = renderProfile(cfg);
	renderArcTable(pitch, cfg);
	renderRangeTable(pitch, cfg);
	renderZoomTable(pitch, cfg);
	renderLineHeight(pitch, cfg);

	currentPitch = pitch;
	currentCfg = cfg;
	renderFontSection();
	updateStickyBar(cfg, p);

	DOM.results.hidden = false;
}

/* ------------------------------------------------------------ *
 * UI wiring                                                     *
 * ------------------------------------------------------------ */

DOM.sourceBtns.forEach(btn => {
	btn.addEventListener('click', () => switchSource(btn.dataset.source));
});
rovingGroup(DOM.sourceBtns, btn => switchSource(btn.dataset.source));

DOM.useDetectedBtn.addEventListener('click', useDetectedValues);

// Diagonal unit toggles
function activateDiagUnit(btn, panel) {
	if (panel === 'detect') detectDiagUnit = btn.dataset.unit;
	else                    manualDiagUnit = btn.dataset.unit;
	const siblings = [...document.querySelectorAll(
		`${panel === 'detect' ? '#panel-detect' : '#display-fields'} .diag-unit-btn`
	)];
	siblings.forEach(b => {
		b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
		b.setAttribute('tabindex',     b === btn ? '0'    : '-1');
	});
}

document.querySelectorAll('#panel-detect .diag-unit-btn').forEach(btn => {
	btn.addEventListener('click', () => activateDiagUnit(btn, 'detect'));
});
rovingGroup(
	document.querySelectorAll('#panel-detect .diag-unit-btn'),
	btn => activateDiagUnit(btn, 'detect')
);

document.querySelectorAll('#display-fields .diag-unit-btn').forEach(btn => {
	btn.addEventListener('click', () => activateDiagUnit(btn, 'manual'));
});
rovingGroup(
	document.querySelectorAll('#display-fields .diag-unit-btn'),
	btn => activateDiagUnit(btn, 'manual')
);

// Live viewport update
window.addEventListener('resize', () => {
	DOM.dViewport.textContent = `${window.innerWidth} × ${window.innerHeight}`;
});

function updateShortcutButtons() {
	const v = parseInt(DOM.distance.value, 10);
	let hasMatch = false;
	DOM.shortcutBtns.forEach(btn => {
		if (parseInt(btn.dataset.dist, 10) === v) hasMatch = true;
	});
	DOM.shortcutBtns.forEach((btn, i) => {
		const match = parseInt(btn.dataset.dist, 10) === v;
		btn.setAttribute('aria-pressed', match ? 'true' : 'false');
		btn.setAttribute('tabindex', (match || (!hasMatch && i === 0)) ? '0' : '-1');
	});
}

DOM.preset.addEventListener('change', () => {
	applyPreset(DOM.preset.value);
});

DOM.distance.addEventListener('input', updateShortcutButtons);

DOM.form.addEventListener('submit', e => {
	e.preventDefault();
	calculate();
});

DOM.savePresetBtns.forEach(btn => btn.addEventListener('click', saveCurrentAsPreset));

[DOM.fontName, DOM.fontSize, DOM.fontUnit].forEach(el => {
	el.addEventListener('input', renderFontSection);
	el.addEventListener('change', renderFontSection);
});

const measureUnitBtns = document.querySelectorAll('.measure-unit-btn');
measureUnitBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		measureUnit = btn.dataset.unit;
		measureUnitBtns.forEach(b => {
			b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
			b.setAttribute('tabindex',     b === btn ? '0'    : '-1');
		});
	});
});
rovingGroup(measureUnitBtns, btn => btn.click());

DOM.verifyBtn.addEventListener('click', renderVerifyResult);

DOM.shortcutBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		DOM.distance.value = btn.dataset.dist;
		updateShortcutButtons();
		if (DOM.width.value && DOM.height.value && DOM.diagonal.value) calculate();
	});
});
rovingGroup(DOM.shortcutBtns, btn => btn.click());

DOM.resetBtn.addEventListener('click', () => {
	DOM.form.reset();
	DOM.detectDiag.value = '';
	DOM.detectDiagError.hidden = true;
	DOM.results.hidden = true;
	setError('');
	DOM.stickyBar.classList.remove('sticky-visible');
	DOM.verifyResult.innerHTML = '';
	DOM.validateLabel.textContent = 'Configure the Font compliance section above first.';
	DOM.validateChar.removeAttribute('style');
	history.replaceState(null, '', location.pathname);
	// Reset unit toggle states
	detectDiagUnit = 'in';
	manualDiagUnit = 'in';
	measureUnit    = 'csspx';
	[...document.querySelectorAll('.diag-unit-btn, .measure-unit-btn')].forEach(b => {
		const isDefault = b.dataset.unit === 'in' || b.dataset.unit === 'csspx';
		b.setAttribute('aria-pressed', isDefault ? 'true' : 'false');
		b.setAttribute('tabindex',     isDefault ? '0'    : '-1');
	});
	switchSource('detect');
	detectCurrentScreen();
	updateShortcutButtons();
});

/* ---- Export ---- */

DOM.copyLink.addEventListener('click', async () => {
	const cfg = readConfig();
	if (!cfg) return;
	const url = encodePermalink(cfg);
	history.replaceState(null, '', '#' + url.split('#')[1]);
	try {
		await navigator.clipboard.writeText(url);
		DOM.exportStatus.textContent = 'Permalink copied to clipboard.';
	} catch {
		DOM.exportStatus.textContent = 'Permalink in address bar — copy manually.';
	}
});

function captureResults() {
	return window.html2canvas(DOM.results, {
		backgroundColor: getComputedStyle(document.body).backgroundColor,
		logging: false,
		useCORS: true,
	});
}

DOM.copyShot.addEventListener('click', async () => {
	if (typeof window.html2canvas !== 'function') return;
	try {
		const canvas = await captureResults();
		canvas.toBlob(blob => {
			navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
				.then(() => DOM.exportStatus.textContent = 'Screenshot copied to clipboard.')
				.catch(() => DOM.exportStatus.textContent = 'Could not copy — try Download instead.');
		});
	} catch {
		DOM.exportStatus.textContent = 'Screenshot failed.';
	}
});

DOM.downloadShot.addEventListener('click', async () => {
	if (typeof window.html2canvas !== 'function') return;
	const canvas = await captureResults();
	const link = document.createElement('a');
	link.download = 'display-legibility-result.png';
	link.href = canvas.toDataURL('image/png');
	link.click();
	DOM.exportStatus.textContent = 'Screenshot downloaded.';
});

if (typeof navigator.clipboard?.write !== 'function') {
	DOM.copyShot.hidden = true;
}

/* ------------------------------------------------------------ *
 * Init                                                          *
 * ------------------------------------------------------------ */

fetch('presets.json')
	.then(r => r.json())
	.then(data => {
		presetData = data;
		populatePresetSelect();
		const fromHash = applyPermalinkFromHash();
		if (fromHash) calculate();
	})
	.catch(err => {
		console.error('Failed to load presets:', err);
		setError('Could not load presets.json — make sure you are using a local HTTP server.');
	});

populateFontSelect();
updateShortcutButtons();
detectCurrentScreen();

/* Sticky bar: show when the form scrolls out of view and results exist */
new IntersectionObserver(([entry]) => {
	DOM.stickyBar.classList.toggle('sticky-visible',
		!entry.isIntersecting && currentCfg !== null);
}, { threshold: 0 }).observe(DOM.form);
