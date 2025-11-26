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
    const handleSystemChange = () => {
        if ((localStorage.getItem(THEME_KEY) || 'auto') === 'auto') {
            applyTheme('auto');
        }
    };
    if (mql.addEventListener) mql.addEventListener('change', handleSystemChange);
    else mql.addListener(handleSystemChange);
}

async function fetchJoke() {
    /* Official Joke API by https://github.com/15Dkatz/official_joke_api */
    const category = document.getElementById('joke-category').value;
    const apiUrl = `https://official-joke-api.appspot.com/jokes/${category}/random`;

    setLoadingState();

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const joke = data[0];

        updateJokeContent(joke);
    } catch (error) {
        handleError();
    }
}

async function fetchRandomJoke() {
    const apiUrl = 'https://official-joke-api.appspot.com/jokes/random';

    setLoadingState();

    try {
        const response = await fetch(apiUrl);
        const joke = await response.json();

        updateJokeContent(joke);
    } catch (error) {
        handleError();
    }
}

function setLoadingState() {
    document.getElementById('joke-type').textContent = 'Loading...';
    document.getElementById('joke-setup').textContent = 'Loading...';
    document.getElementById('joke-punchline').textContent = 'Loading...';
    document.getElementById('joke-blockquote').setAttribute('cite', '');
}

function updateJokeContent(joke) {
    document.getElementById('joke-type').textContent = joke.type;
    document.getElementById('joke-setup').textContent = joke.setup;
    document.getElementById('joke-punchline').textContent = joke.punchline;
    document.getElementById('joke-blockquote').setAttribute('cite', `https://official-joke-api.appspot.com/jokes/${joke.id}`);
}

function handleError() {
    console.error('Error fetching joke');
    document.getElementById('joke-setup').textContent = 'Failed to load joke.';
    document.getElementById('joke-punchline').textContent = '';
    document.getElementById('joke-blockquote').setAttribute('cite', '');
}

// Fetch initial joke on page load
// Initialize theme UI and then fetch initial joke
document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    fetchJoke();
});
