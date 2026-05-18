// ---- Modal dialogs (native <dialog>) -----------------------------------

// Restore focus to the trigger element when any dialog closes
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => dialog._trigger?.focus());
});

// Open a dialog — any button with data-dialog-open="<id>"
document.querySelectorAll('[data-dialog-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const dialog = document.getElementById(btn.dataset.dialogOpen);
    dialog._trigger = btn;
    dialog.showModal();
  });
});

// ---- Browser popup window ----------------------------------------------

document.getElementById('open-popup-window').addEventListener('click', () => {
  window.open(
    'newWindow.html',
    'popUpWindow',
    'height=350,width=600,resizable=yes,scrollbars=yes,noopener=yes'
  );
});

// ---- ARIA live region alert --------------------------------------------

document.getElementById('trigger-alert').addEventListener('click', () => {
  const container = document.getElementById('alert-container');
  // Clear first so the same text re-triggers an announcement
  container.textContent = '';
  requestAnimationFrame(() => {
    container.textContent =
      'Alert: this message was injected into a role="alert" element. ' +
      'Screen readers announce it immediately, without the user navigating here.';
  });
});

// ---- Native browser alert ----------------------------------------------

document.getElementById('trigger-native-alert').addEventListener('click', () => {
  alert('This is a native browser alert. Its text and appearance cannot be customised by the page.');
});
