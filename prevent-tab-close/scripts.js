// Warn the user before closing the tab or navigating away when the form has
// unsaved data. The dialog text is controlled by the browser and cannot be
// customised by the application.

// Tracks whether the form contains data the user has not yet submitted.
let hasUnsavedData = false;

// Register the listener once. The flag controls whether the dialog appears.
window.addEventListener("beforeunload", (event) => {
	// event.preventDefault() is the modern, standards-compliant way to trigger
	// the browser's "Leave site?" dialog. Setting event.returnValue (legacy) is
	// no longer required by current browsers.
	if (hasUnsavedData) {
		event.preventDefault();
	}
}, { capture: true });
// { capture: true } registers the listener in the capture phase,
// which is required for beforeunload to fire reliably across browsers.

const form = document.querySelector("form");

// A single input listener on the form catches events from every field inside
// it via event bubbling — no need to list fields individually. Fields added
// dynamically to the form are covered automatically.
form.addEventListener("input", () => {
	// form.elements is a built-in browser collection of all form controls.
	// It updates automatically as fields are added or removed from the form.
	hasUnsavedData = Array.from(form.elements).some(el => {
		// Checkboxes and radio buttons are considered modified when checked.
		if (el.type === "checkbox" || el.type === "radio") return el.checked;
		// Submit and button controls are not data fields; skip them.
		if (el.type === "submit" || el.type === "button") return false;
		// All other fields (text, email, password, select, textarea, …)
		// are considered modified when they contain a value.
		return el.value !== "";
	});
});

// Clear the flag before an intentional form submission so the browser
// does not show the "Leave site?" dialog when the user deliberately submits.
form.addEventListener("submit", (event) => {
	hasUnsavedData = false;

	// Remove the line below in a real application so the form submits normally.
	event.preventDefault();
});
