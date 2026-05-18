const THEME_KEY = 'theme-preference';

function applyTheme(pref) {
    const html = document.documentElement;
    if (pref === 'light') {
        html.setAttribute('data-theme', 'light');
    } else if (pref === 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
    }
}

function initThemeSwitcher() {
    const select = document.getElementById('theme-select');
    if (!select) return;
    const stored = localStorage.getItem(THEME_KEY) || 'auto';
    select.value = stored;
    applyTheme(stored);

    select.addEventListener('change', (e) => {
        const v = e.target.value;
        localStorage.setItem(THEME_KEY, v);
        applyTheme(v);
    });

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', () => {
        if ((localStorage.getItem(THEME_KEY) || 'auto') === 'auto') applyTheme('auto');
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
    /* Force animation replay by briefly removing the element from the DOM */
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
