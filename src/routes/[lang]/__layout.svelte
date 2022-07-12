<script context="module">
	import { locale, loadTranslations } from '$lib/translations';
	import kofi from '$lib/assets/kofi.webp'
	
	// @ts-ignore
	export const load = async ({ url, params }) => {
		const { pathname } = url;
		const defaultLocale = params.lang || 'en';

		const initLocale = locale.get() || defaultLocale; // set default if no locale already set

		await loadTranslations(initLocale, pathname); // keep this just before the `return`

		return {};
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
	<link rel="manifest" crossorigin="use-credentials" href="/manifest.json" />

	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://sailing-weather.de/preview.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content="https://sailing-weather.de/preview.png" />

	{#each [16, 20, 29, 32, 40, 57, 58, 60, 64, 72, 76, 80, 87, 100, 114, 120, 128, 144, 152, 167, 180, 192, 256, 512, 1024] as s}
		<link
			rel="apple-touch-icon"
			sizes={s + 'x' + s}
			href={'/appicons/ios/' + s + '.png'}
		/>
	{/each}
</svelte:head>
<div class="h-full">
	<header class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">{$t('all.page-title')}</a>
		</div>
		<div class="flex-2">
			<a href="https://ko-fi.com/Z8Z1DR6HR" target="_blank">
				<img
					height="36px"
					width="230.77px"
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
