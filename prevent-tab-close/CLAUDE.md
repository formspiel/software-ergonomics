# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A vanilla HTML/CSS/JS prototype demonstrating browser tab-close prevention via the `beforeunload` event. No build tools, no dependencies, no package manager — open files directly in a browser.

## Architecture

- `index.html` — Landing page with a link to the form (tests browser back-button behavior)
- `form.html` — The form page with email/password inputs; loads `scripts.js`
- `scripts.js` — Registers a single `beforeunload` listener controlled by a `hasUnsavedData` flag; uses event delegation on the `<form>` element and `form.elements` to track all fields automatically
- `style.css` — Shared styles with CSS custom properties for light/dark/forced-color themes

### Key behavior in `scripts.js`

- **Flag-based approach** — one `beforeunload` listener is registered once on `window`; the `hasUnsavedData` boolean controls whether the dialog appears. Resetting the flag (e.g. after an autosave) is all that is needed to suppress the warning.
- **Event delegation** — a single `input` listener on the `<form>` element catches events from all child fields via bubbling. New fields added to the form require no JS changes.
- **`form.elements`** — the browser's built-in collection of all form controls, used to evaluate dirty state. Handles each control type: `el.checked` for checkboxes/radios, `el.value` for all other fields, skipping submit/button controls.
- **Submit handling** — the `submit` listener clears `hasUnsavedData` before the form submits so no warning appears on intentional navigation. In a real application, remove `event.preventDefault()` from that handler.

### Browser limitation

The `beforeunload` dialog text and appearance cannot be customised by the application. Browsers intentionally blocked this to prevent phishing sites from mimicking system prompts. The native browser dialog is always shown, regardless of browser or OS.

## Code Style

Follow `.editorconfig`: tabs for indentation (size 2), LF line endings, UTF-8, trim trailing whitespace.
