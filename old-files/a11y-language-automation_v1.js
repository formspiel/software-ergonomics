/**
* a11y-language-automation.js v1.0 -- Chrome API with Efficient Language Detector library fallback
* 
* Accessibility utility widget for Chrome/Firefox/Safari.
* This snippet tries to use the native browser APIs for language detection 
* (such as Chrome's experimental LanguageDetector or Local LLM) and falls back 
* to the Efficient Language Detector (ELD) via CDN if not available.
* 
* 1. Automatically detects the primary language of the page content.
* 2. Sets the <html lang="..."> attribute accordingly if missing or incorrect.
* 3. Scans for hidden text attributes (alt, aria-label, aria-description, title).
* 4. Highlights elements and logs a warning if their hidden language differs from the main page.
*/

(async function () {
    try {
        console.log("%c[A11y] Initializing language detection...", "color: #3b82f6; font-weight: bold;");

        let detectorFn = null;
        let detectorName = "";

        // ==== Strategy 1: Chrome Native LanguageDetector API ====
        if (!detectorFn && 'LanguageDetector' in self) {
            try {
                // Determine if model is available before trying to create
                const caps = self.LanguageDetector.capabilities ? await self.LanguageDetector.capabilities() : { available: 'readily' };
                if (caps.available !== 'no') {
                    const detector = await self.LanguageDetector.create();
                    detectorFn = async (text) => {
                        const results = await detector.detect(text);
                        if (results && results.length > 0 && results[0].confidence > 0.4) {
                            return results[0].detectedLanguage;
                        }
                        return null;
                    };
                    detectorName = "Chrome LanguageDetector API";
                }
            } catch (e) {
                console.warn("%c[A11y] LanguageDetector API failed to init. Trying fallback...", "color: #f97316;", e);
            }
        }

        // ==== Strategy 2: Chrome Local LLM (window.ai) ====
        if (!detectorFn && 'ai' in self && 'languageModel' in self.ai) {
            try {
                const caps = await self.ai.languageModel.capabilities();
                if (caps.available !== 'no') {
                    const session = await self.ai.languageModel.create({
                        systemPrompt: "You are an AI language detection tool. You will be given a short snippet of text. Respond only with the 2-letter ISO 639-1 language code of that text (e.g. 'en', 'es', 'fr', 'de'). Do not output any other words, punctuation, or explanations."
                    });
                    detectorFn = async (text) => {
                        const resp = await session.prompt(text);
                        const code = resp.trim().toLowerCase();
                        if (code.length === 2 || code.length === 3) {
                            return code.substring(0, 2);
                        }
                        return null;
                    };
                    detectorName = "Chrome Native LLM (window.ai)";
                }
            } catch (e) {
                console.warn("%c[A11y] Local LLM API failed to init. Trying fallback...", "color: #f97316;", e);
            }
        }

        // ==== Strategy 3: N-Gram Library Fallback (ELD via jsDelivr) ====
        if (!detectorFn) {
            try {
                console.log("%c[A11y] No native AI found. Falling back to Efficient Language Detector library via CDN...", "color: #3b82f6;");
                const { eld } = await import('https://cdn.jsdelivr.net/npm/eld@latest/dist/entries/static.medium.mjs');
                detectorFn = async (text) => {
                    const result = eld.detect(text);
                    if (result.isReliable() && result.language) {
                        return result.language;
                    }
                    return null;
                };
                detectorName = "ELD Library (Fallback)";
            } catch (e) {
                console.error("%c[A11y] Failed to load ELD library fallback.", "color: #ef4444;", e);
                return;
            }
        }

        console.log(`%c[A11y] Using engine: ${detectorName}`, "color: #10b981; font-weight: bold;");

        // ==== 1. Detect Main Page Language ====
        const mainText = document.body.innerText;
        if (!mainText || mainText.trim().length < 50) {
            console.warn("%c[A11y] Not enough text on the page to accurately detect the main language.", "color: #eab308;");
            return;
        }

        const mainLang = await detectorFn(mainText);

        if (!mainLang) {
            console.warn(`%c[A11y] Main language detection failed or is unreliable. Aborting to prevent false positives.`, "color: #ef4444;");
            return;
        }

        console.log(`%c[A11y] Main page language successfully detected: "${mainLang}"`, "color: #10b981; font-weight: bold;");

        // ==== 2. Set HTML Lang Attribute ====
        const htmlElem = document.documentElement;
        if (htmlElem.lang !== mainLang) {
            console.log(`%c[A11y] Updating <html> lang attribute from "${htmlElem.lang}" to "${mainLang}".`, "color: #3b82f6;");
            htmlElem.lang = mainLang;
        } else {
            console.log(`%c[A11y] <html> lang attribute is already correct ("${mainLang}").`, "color: #10b981;");
        }

        // ==== 3. Check Hidden Texts ====
        const hiddenTextSelectors = [
            '[alt]:not([alt=""])',
            '[aria-label]:not([aria-label=""])',
            '[aria-description]:not([aria-description=""])',
            '[title]:not([title=""])'
        ];

        const elements = document.querySelectorAll(hiddenTextSelectors.join(', '));
        let flaggedCount = 0;

        console.log(`%c[A11y] Scanning ${elements.length} elements with hidden text attributes...`, "color: #8b5cf6;");

        // Use Promise.all to handle the async detect calls properly
        const checks = Array.from(elements).map(async (el) => {
            const textsToCheck = [];

            if (el.hasAttribute('alt') && el.getAttribute('alt').trim() !== '') {
                textsToCheck.push({ type: 'alt', text: el.getAttribute('alt') });
            }
            if (el.hasAttribute('aria-label') && el.getAttribute('aria-label').trim() !== '') {
                textsToCheck.push({ type: 'aria-label', text: el.getAttribute('aria-label') });
            }
            if (el.hasAttribute('aria-description') && el.getAttribute('aria-description').trim() !== '') {
                textsToCheck.push({ type: 'aria-description', text: el.getAttribute('aria-description') });
            }
            if (el.hasAttribute('title') && el.getAttribute('title').trim() !== '') {
                textsToCheck.push({ type: 'title', text: el.getAttribute('title') });
            }

            for (const item of textsToCheck) {
                // Short snippets are ambiguous (e.g. "Home", "Menu", "OK"). 
                // We skip highly short text blocks to avoid false positives.
                if (item.text.trim().length < 8) continue;

                const itemLang = await detectorFn(item.text);

                // If detected explicitly and differs from the page language
                if (itemLang && itemLang !== mainLang) {
                    flaggedCount++;

                    const logMsg = `%c[A11y] Language Mismatch Warning!\nElement: <${el.tagName.toLowerCase()}>\nAttribute: ${item.type}\nText: "${item.text}"\nDetected Lang: "${itemLang}" (Expected: "${mainLang}")`;
                    console.warn(logMsg, "color: #f97316; font-size: 1.1em;", el);

                    // Visually highlight the element
                    el.style.outline = '4px dashed #f43f5e';
                    el.style.outlineOffset = '3px';

                    if (!el.hasAttribute('title') || item.type !== 'title') {
                        el.setAttribute('title', `A11y Issue: ${item.type} detected as '${itemLang}'`);
                    }
                }
            }
        });

        await Promise.all(checks);

        console.log(`%c[A11y] Audit complete. Flagged ${flaggedCount} potential mismatches.`, "color: #10b981; font-weight: bold;");

    } catch (e) {
        console.error("%c[A11y] Failed to run language automation.", "color: #ef4444; font-weight: bold;", e);
    }
})();
