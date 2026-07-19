// Warn the user before closing the tab or navigating away when the form has
// unsaved data. The dialog text is controlled by the browser and cannot be
// customised by the application.

let hasUnsavedData = false;

// Register the listener once. The flag controls whether the dialog appears.
window.addEventListener('beforeunload', (event) => {
	// event.preventDefault() is the modern, standards-compliant way to trigger
	// the browser's "Leave site?" dialog.
	if (hasUnsavedData) event.preventDefault();
}, { capture: true });
// { capture: true } is required for beforeunload to fire reliably across browsers.

const form = document.querySelector('form');
const indicator = document.getElementById('unsaved-indicator');

function setUnsaved(dirty) {
	hasUnsavedData = dirty;
	indicator.classList.toggle('hidden', !dirty);
}

// A single input listener on the form catches events from every field via
// event bubbling — no need to wire fields individually.
form.addEventListener('input', () => {
	// form.elements is a live browser collection of all form controls.
	const dirty = Array.from(form.elements).some(el => {
		if (el.type === 'checkbox' || el.type === 'radio') return el.checked;
		// Skip elements without a real value (fieldset, submit/button, output, etc.);
		// `<fieldset>.value` is undefined, which would spuriously test truthy below.
		return typeof el.value === 'string' && el.value !== '' && el.type !== 'submit' && el.type !== 'button';
	});
	setUnsaved(dirty);
});

// Clear the flag on intentional submit so the browser allows navigation freely.
form.addEventListener('submit', (event) => {
	event.preventDefault();
	setUnsaved(false);
	window.location.assign('index.html?submitted=1');
});
