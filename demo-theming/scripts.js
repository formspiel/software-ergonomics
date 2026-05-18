const THEME_KEY = 'theme-preference';

function applyTheme(pref) {
    /* Setting colorScheme directly on the root element overrides the
       stylesheet value, so light-dark() resolves correctly everywhere.
       Empty string removes the override and lets the OS preference win. */
    document.documentElement.style.colorScheme = pref === 'auto' ? '' : pref;
}

function initThemeSwitcher() {
    const select = document.getElementById('theme-select');
    if (!select) return;
    const stored = localStorage.getItem(THEME_KEY) || 'auto';
    select.value = stored;
    applyTheme(stored);

    select.addEventListener('change', (e) => {
        localStorage.setItem(THEME_KEY, e.target.value);
        applyTheme(e.target.value);
    });
}

async function fetchJoke(random = false) {
    const category = document.getElementById('joke-category').value;
    const url = random
        ? 'https://official-joke-api.appspot.com/jokes/random'
        : `https://official-joke-api.appspot.com/jokes/${category}/random`;

    setLoadingState();

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        updateJokeContent(random ? data : data[0]);
    } catch (error) {
        handleError(error);
    }
}

function setLoadingState() {
    document.getElementById('joke-type').textContent = 'Loading…';
    document.getElementById('joke-setup').textContent = 'Loading…';
    document.getElementById('joke-blockquote').setAttribute('cite', '');
    resetPunchline('Loading…');
}

function updateJokeContent(joke) {
    document.getElementById('joke-type').textContent = joke.type;
    document.getElementById('joke-setup').textContent = joke.setup;
    document.getElementById('joke-blockquote').setAttribute('cite',
        `https://official-joke-api.appspot.com/jokes/${joke.id}`);
    resetPunchline(joke.punchline);
}

function handleError(error) {
    console.error('Error fetching joke:', error);
    document.getElementById('joke-setup').textContent = 'Failed to load joke. Please try again.';
    document.getElementById('joke-blockquote').setAttribute('cite', '');
    resetPunchline('');
}

function resetPunchline(text) {
    const el = document.getElementById('joke-punchline');
    const clone = el.cloneNode(false);
    clone.textContent = text;
    el.replaceWith(clone);
}

document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    document.getElementById('btn-category').addEventListener('click', () => fetchJoke());
    document.getElementById('btn-random').addEventListener('click', () => fetchJoke(true));
    fetchJoke();
});
