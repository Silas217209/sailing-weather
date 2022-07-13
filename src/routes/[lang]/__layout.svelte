<script context="module">
	import { locale, loadTranslations } from '$lib/translations';
	import kofi from '$lib/assets/kofi.webp';

	// @ts-ignore
	export const load = async ({ url, params }) => {
		const { pathname } = url;
		const defaultLocale = params.lang || 'en';

		const initLocale = locale.get() || defaultLocale; // set default if no locale already set

		await loadTranslations(initLocale, pathname); // keep this just before the `return`

		return {
			cache: {
				maxage: 600,
				private: false
			}
		};
	};
</script>

<script>
	import '../../app.css';
	import { t } from '$lib/translations';
</script>

<svelte:head>
	<title>{$t('all.site-title')}</title>
	<meta
		name="keywords"
		content="Wind, Segeln, windvorhersage, Wettervorhersage, sailing-weather, sailing, weather, forecast"
	/>
	<meta name="description" content={$t('all.site-description')} />
</svelte:head>
<div class="h-full">
	<header class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">{$t('all.page-title')}</a>
		</div>
		<div class="flex-2">
			<a href="https://ko-fi.com/Z8Z1DR6HR" target="_blank">
				<img
					height="36"
					width="231"
					style="border:0px;height:36px;"
					src={kofi}
					alt="Buy Me a Coffee at ko-fi.com"
				/>
			</a>
		</div>
	</header>
	<main>
		<slot />
	</main>
	<footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
		<a class="pb-0 mb-0 link-hover" href="https://open-meteo.com/">Weather data by Open-Meteo.com</a
		>
		<div class="grid grid-flow-col gap-4">
			<a href="/impressum" class="link link-hover">Impressum</a>
			<a href="/datenschutz" class="link link-hover">Datenschutz</a>
			<a href="/haftungsausschluss" class="link link-hover">Haftungsauschluss</a>
		</div>
		<div>
			<p>Copyright © {new Date().getFullYear()} - Silas Pachali</p>
		</div>
	</footer>
</div>
