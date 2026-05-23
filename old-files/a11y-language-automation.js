/**
 * a11y-language-automation.js
 * 
 * Accessibility utility widget for Chrome/Firefox/Safari.
 * This version strictly uses an LLM approach (via Chrome's local window.ai) 
 * to smartly handle shared vocabulary and reduce false positives.
 * 
 * 1. Detects primary language of the page content via LLM.
 * 2. Sets the <html lang="..."> attribute accordingly.
 * 3. Asks the LLM to contextually evaluate hidden text attributes (alt, aria).
 * 4. Highlights elements and logs a warning only when the LLM deems it 
 *    definitively foreign to the main language.
 */

(async function() {
    try {
        console.log("%c[A11y] Initializing LLM-only language detection...", "color: #3b82f6; font-weight: bold;");
        
        if (!('ai' in self && 'languageModel' in self.ai)) {
            console.error("%c[A11y] Chrome Local LLM API (window.ai.languageModel) is not available. Please ensure the experimental flags are enabled.", "color: #ef4444;");
            return;
        }

        const caps = await self.ai.languageModel.capabilities();
        if (caps.available === 'no') {
            console.error("%c[A11y] Local LLM model is not available or hasn't been downloaded.", "color: #ef4444;");
            return;
        }

        // ==== 1. Detect Main Page Language ====
        const mainDetectSession = await self.ai.languageModel.create({
            systemPrompt: "You are an AI language detection tool. You will be given a webpage's main text content. Respond ONLY with the 2-letter ISO 639-1 language code (e.g., 'en', 'de', 'fr', 'es'). Do not output any other words or punctuation."
        });

        const mainText = document.body.innerText.trim();
        if (mainText.length < 50) {
            console.warn("%c[A11y] Not enough text on the page to accurately detect main language.", "color: #eab308;");
            return;
        }

        // Only send the first ~1500 chars to avoid exceeding context window
        let mainLang = await mainDetectSession.prompt(mainText.substring(0, 1500));
        mainLang = mainLang.trim().toLowerCase();
        
        // Clean up output just in case the LLM was chatty
        if (mainLang.length > 2) mainLang = mainLang.substring(0, 2);

        if (!mainLang || mainLang.length !== 2) {
            console.warn(`%c[A11y] Failed to determine main language. Output was: "${mainLang}". Aborting.`, "color: #ef4444;");
            return;
        }

        console.log(`%c[A11y] Main page language detected by LLM: "${mainLang}"`, "color: #10b981; font-weight: bold;");
        mainDetectSession.destroy(); // Free up memory

        // ==== 2. Set HTML Lang Attribute ====
        const htmlElem = document.documentElement;
        if (htmlElem.lang !== mainLang) {
            console.log(`%c[A11y] Updating <html> lang attribute from "${htmlElem.lang}" to "${mainLang}".`, "color: #3b82f6;");
            htmlElem.lang = mainLang;
        }

        // ==== 3. Check Hidden Texts contextually via LLM ====
        const hiddenTextSelectors = [
            '[alt]:not([alt=""])',
            '[aria-label]:not([aria-label=""])',
            '[aria-description]:not([aria-description=""])',
            '[title]:not([title=""])'
        ];

        const elements = document.querySelectorAll(hiddenTextSelectors.join(', '));
        console.log(`%c[A11y] Scanning ${elements.length} hidden text elements using LLM Context Evaluation...`, "color: #8b5cf6;");

        // We create a new session specifically instructed to be forgiving with shared vocabulary
        const auditSession = await self.ai.languageModel.create({
            systemPrompt: `You are an accessibility auditor reviewing hidden labels on a webpage. 
The main language of this webpage is '${mainLang}'. 
You will be provided with a short text label. Determine if this text is valid and understandable in '${mainLang}'. 
CRITICAL RULE: Many words (like 'navigation', 'email', 'internet', 'logo', 'ok', 'menu') are identical across languages. If it is a shared word that is valid in '${mainLang}', you must respond with 'VALID'.
Respond ONLY with 'VALID' if it belongs to or is acceptable in '${mainLang}'. 
If it is completely and definitively in a different language, respond ONLY with the 2-letter ISO 639-1 language code it belongs to.`
        });

        let flaggedCount = 0;

        for (const el of elements) {
            const textsToCheck = [];
            
            if (el.hasAttribute('alt') && el.getAttribute('alt').trim() !== '') textsToCheck.push({ type: 'alt', text: el.getAttribute('alt') });
            if (el.hasAttribute('aria-label') && el.getAttribute('aria-label').trim() !== '') textsToCheck.push({ type: 'aria-label', text: el.getAttribute('aria-label') });
            if (el.hasAttribute('aria-description') && el.getAttribute('aria-description').trim() !== '') textsToCheck.push({ type: 'aria-description', text: el.getAttribute('aria-description') });
            if (el.hasAttribute('title') && el.getAttribute('title').trim() !== '') textsToCheck.push({ type: 'title', text: el.getAttribute('title') });

            for (const item of textsToCheck) {
                // We still skip completely trivial strings like "X" or "A"
                if (item.text.trim().length <= 2) continue;

                try {
                    const response = await auditSession.prompt(`Text label: "${item.text}"`);
                    const result = response.trim().toUpperCase();

                    // If it isn't explicitly marked as VALID by the LLM
                    if (result !== 'VALID' && !result.includes('VALID')) {
                        flaggedCount++;
                        
                        let detectedLang = result;
                        if (detectedLang.length > 10) detectedLang = detectedLang.substring(0, 10) + '...'; // Cleanup chatty responses

                        const logMsg = `%c[A11y] LLM Mismatch Warning!\nElement: <${el.tagName.toLowerCase()}>\nAttribute: ${item.type}\nText: "${item.text}"\nLLM Response: "${detectedLang}" (Expected context: "${mainLang}")`;
                        console.warn(logMsg, "color: #f97316; font-size: 1.1em;", el);

                        el.style.outline = '4px dashed #f43f5e';
                        el.style.outlineOffset = '3px';
                        
                        if (!el.hasAttribute('title') || item.type !== 'title') {
                            el.setAttribute('title', `A11y LLM Flag: detected as '${detectedLang}' instead of '${mainLang}'`);
                        }
                    }
                } catch(e) {
                    console.warn(`%c[A11y] LLM evaluation failed for text: "${item.text}"`, "color: #ef4444;", e);
                }
            }
        }

        auditSession.destroy();
        console.log(`%c[A11y] Audit complete. Flagged ${flaggedCount} potential mismatches.`, "color: #10b981; font-weight: bold;");

    } catch (e) {
        console.error("%c[A11y] Failed to run LLM language automation.", "color: #ef4444; font-weight: bold;", e);
    }
})();
