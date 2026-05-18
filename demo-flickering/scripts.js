'use strict';

const freqSlider  = document.getElementById('freq-slider');
const durSlider   = document.getElementById('dur-slider');
const freqDisplay = document.getElementById('freq-display');
const durDisplay  = document.getElementById('dur-display');
const freqCursor  = document.getElementById('freq-cursor');
const durCursor   = document.getElementById('dur-cursor');
const flickerBox  = document.getElementById('flicker-box');
const idleHint    = document.getElementById('idle-hint');
const playBtn     = document.getElementById('play-btn');
const wcagBadge   = document.getElementById('wcag-badge');
const wcagLabel   = document.getElementById('wcag-label');

let timer     = null;
let lit       = false;
let playStart = 0;

const getFreq = () => parseFloat(freqSlider.value);
const getDurMs = () => parseFloat(durSlider.value) * 1000;

function computeStatus() {
	const f = getFreq();
	const dSec = parseFloat(durSlider.value);

	if (f <= 3) {
		return { cls: 'pass', badge: 'Pass', label: 'Passes WCAG 2.3.1 — ≤ 3 flashes/s' };
	}

	// Above 3 Hz: check whether any one-second window can contain 3 flashes.
	// Worst case: if duration < 1 s, the longest window that overlaps the animation
	// equals the duration itself — so max flashes = f × duration.
	const maxFlashesInOneSecond = f * Math.min(dSec, 1);
	if (maxFlashesInOneSecond <= 3) {
		return {
			cls: 'caution',
			badge: 'Caution',
			label: 'Brief — fewer than 3 flashes in any 1-second window',
		};
	}

	return { cls: 'fail', badge: 'Fail', label: 'Fails WCAG 2.3.1 — > 3 flashes/s' };
}

function updateBadge() {
	const { cls, badge, label } = computeStatus();
	wcagBadge.textContent = badge;
	wcagBadge.className = `wcag-badge ${cls}`;
	wcagLabel.textContent = label;
}

function placeCursor(slider, cursor, min, max) {
	const pct = (parseFloat(slider.value) - min) / (max - min) * 100;
	cursor.style.left = `${pct}%`;
}

function stop() {
	clearTimeout(timer);
	timer = null;
	lit = false;
	flickerBox.classList.remove('lit', 'playing');
	idleHint.hidden = false;
	playBtn.textContent = 'Play';
	playBtn.setAttribute('aria-pressed', 'false');
}

function tick() {
	if (Date.now() - playStart >= getDurMs()) {
		stop();
		return;
	}
	lit = !lit;
	flickerBox.classList.toggle('lit', lit);
	// Half-period: 500 ms / Hz gives the time between each state change
	timer = setTimeout(tick, 500 / getFreq());
}

function play() {
	playStart = Date.now();
	idleHint.hidden = true;
	flickerBox.classList.add('playing');
	playBtn.textContent = 'Stop';
	playBtn.setAttribute('aria-pressed', 'true');
	tick();
}

playBtn.addEventListener('click', () => (timer ? stop : play)());

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') stop();
});

freqSlider.addEventListener('input', () => {
	freqDisplay.textContent = `${getFreq().toFixed(1)} Hz`;
	placeCursor(freqSlider, freqCursor, 0.5, 8);
	updateBadge();
});

durSlider.addEventListener('input', () => {
	durDisplay.textContent = `${parseFloat(durSlider.value).toFixed(1)} s`;
	placeCursor(durSlider, durCursor, 0.2, 5);
	updateBadge();
});

// Initialise
updateBadge();
placeCursor(freqSlider, freqCursor, 0.5, 8);
placeCursor(durSlider, durCursor, 0.2, 5);
