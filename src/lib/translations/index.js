import { init } from 'svelte/internal';
import getLocaleFromNavigator from 'sveltekit-i18n';
import i18n from 'sveltekit-i18n';
import lang from './lang.json';
/** @type {import('sveltekit-i18n').Config} */
const config = {
	fallbackLocale: 'de',
	translations: {
		en: { lang },
		de: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'all',
			loader: async () => (await import('./en.json')).default
		},
		{
			locale: 'de',
			key: 'all',
			loader: async () => (await import('./de.json')).default
		},
		{
			locale: 'fr',
			key: 'all',
			loader: async () => (await import('./fr.json')).default
		}
	]
};

export const defaultLocale = 'en';

export const { t, locale, locales, loading, loadTranslations, translations } = new i18n(config);
