'use strict';

/* ------------------------------------------------------------ *
 * Display Character Size Calculator
 * ------------------------------------------------------------ */

const STORAGE_KEY = 'tool-display-legibility:custom-presets';

const CATEGORY_DISTANCE = {
	'Office Display': 50,
	'Laptop': 40,
	'Tablet': 40,
	'Smartphone': 30,
};

const DOM = {
	form:           document.getElementById('config-form'),
	preset:         document.getElementById('preset'),
	displayFields:  document.getElementById('display-fields'),
	width:          document.getElementById('width'),
	height:         document.getElementById('height'),
	diagonal:       document.getElementById('diagonal'),
	dpr:            document.getElementById('dpr'),
	distance:       document.getElementById('distance'),
	shortcutBtns:   document.querySelectorAll('.distance-shortcuts button'),
	savePresetBtn:  document.getElementById('save-preset'),
	resetBtn:       document.getElementById('reset-btn'),
	error:          document.getElementById('error'),
	results:        document.getElementById('results'),

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

	copyLink:       document.getElementById('copy-link'),
	copyShot:       document.getElementById('copy-screenshot'),
	downloadShot:   document.getElementById('download-screenshot'),
	exportStatus:   document.getElementById('export-status'),
};

let presetData = [];
const presetMap = {};

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
		DOM.displayFields.disabled = false;
		return;
	}
	const p = presetMap[key];
	if (!p) return;
	DOM.width.value    = p.width;
	DOM.height.value   = p.height;
	DOM.diagonal.value = p.diagonal;
	DOM.dpr.value      = p.dpr || 1;
	DOM.displayFields.disabled = true;

	const dist = CATEGORY_DISTANCE[p.category];
	if (dist) {
		DOM.distance.value = dist;
		updateShortcutButtons();
	}
	calculate();
}

function saveCurrentAsPreset() {
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
	DOM.preset.value = 'custom';
	DOM.displayFields.disabled = false;
	DOM.width.value    = params.get('w') || '';
	DOM.height.value   = params.get('h') || '';
	DOM.diagonal.value = params.get('d') || '';
	DOM.dpr.value      = params.get('s') || 1;
	DOM.distance.value = params.get('v') || 50;
	updateShortcutButtons();
	return true;
}

/* ------------------------------------------------------------ *
 * Reading / validation                                          *
 * ------------------------------------------------------------ */

function readConfig() {
	const width    = parseInt(DOM.width.value, 10);
	const height   = parseInt(DOM.height.value, 10);
	const diagonal = parseFloat(DOM.diagonal.value);
	const dpr      = parseFloat(DOM.dpr.value) || 1;
	const distance = parseFloat(DOM.distance.value) || 0;

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

	const { pitch } = renderProfile(cfg);
	renderArcTable(pitch, cfg);
	renderRangeTable(pitch, cfg);
	renderZoomTable(pitch, cfg);
	renderLineHeight(pitch, cfg);

	DOM.results.hidden = false;
}

/* ------------------------------------------------------------ *
 * UI wiring                                                     *
 * ------------------------------------------------------------ */

function updateShortcutButtons() {
	const v = parseInt(DOM.distance.value, 10);
	DOM.shortcutBtns.forEach(btn => {
		const match = parseInt(btn.dataset.dist, 10) === v;
		btn.setAttribute('aria-pressed', match ? 'true' : 'false');
	});
}

DOM.preset.addEventListener('change', () => {
	applyPreset(DOM.preset.value);
});

DOM.shortcutBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		DOM.distance.value = btn.dataset.dist;
		updateShortcutButtons();
		if (DOM.width.value && DOM.height.value && DOM.diagonal.value) calculate();
	});
});

DOM.distance.addEventListener('input', updateShortcutButtons);

DOM.form.addEventListener('submit', e => {
	e.preventDefault();
	calculate();
});

DOM.savePresetBtn.addEventListener('click', saveCurrentAsPreset);

DOM.resetBtn.addEventListener('click', () => {
	DOM.form.reset();
	DOM.preset.value = 'custom';
	DOM.displayFields.disabled = false;
	DOM.results.hidden = true;
	setError('');
	history.replaceState(null, '', location.pathname);
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

updateShortcutButtons();
