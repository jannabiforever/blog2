import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';

class DarkModeContext {
	isDarkMode = $state(false);

	constructor() {
		if (browser) {
			this.setMode(localStorage.getItem('theme') === 'dark');
		}
	}

	toggleDarkMode() {
		this.isDarkMode = !this.isDarkMode;
		if (this.isDarkMode) {
			this.setDarkMode();
		} else {
			this.setLightMode();
		}
	}

	getDarkMode() {
		return this.isDarkMode;
	}

	setMode(mode: boolean) {
		this.isDarkMode = mode;
		if (this.isDarkMode) {
			this.setDarkMode();
		} else {
			this.setLightMode();
		}
	}

	setDarkMode() {
		this.isDarkMode = true;
		if (browser) {
			localStorage.setItem('theme', 'dark');
			document.documentElement.classList.add('dark');
		}
	}

	setLightMode() {
		this.isDarkMode = false;
		if (browser) {
			localStorage.setItem('theme', 'light');
			document.documentElement.classList.remove('dark');
		}
	}
}

const DARK_MODE_KEY = Symbol.for('darkMode');

export function setDarkModeContext(): DarkModeContext {
	return setContext<DarkModeContext>(DARK_MODE_KEY, new DarkModeContext());
}

export function getDarkModeContext(): DarkModeContext {
	return getContext(DARK_MODE_KEY);
}
