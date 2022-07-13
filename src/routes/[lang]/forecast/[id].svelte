<script context="module">
	export async function load({ params, fetch }) {
		try {
			const id = params.id;
			const url = `https://geocoding-api.open-meteo.com/v1/get?id=${id}`;
			const loc = await fetch(url);
			return {
				status: loc.status,
				props: {
					locationdata: loc.ok && (await loc.json())
				}
			};
		} catch (e) {
			return {
				status: 404,
			}
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Forecast from '$lib/Forecast.svelte';
	import MobileForecast from '$lib/MobileForecast.svelte';
	import Stats from '$lib/Stats.svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/translations';

	let weatherdata: {
		elevation: number;
		hourly_units: {
			windgusts_10m: string;
			temperature_2m: string;
			relativehumidity_2m: string;
			precipitation: string;
			surface_pressure: string;
			winddirection_10m: string;
			weathercode: string;
			windspeed_10m: string;
			time: string;
		};
		generationtime_ms: number;
		latitude: number;
		utc_offset_seconds: number;
		hourly: {
			windgusts_10m: number[];
			temperature_2m: number[];
			precipitation: number[];
			relativehumidity_2m: number[];
			surface_pressure: number[];
			winddirection_10m: number[];
			weathercode: number[];
			windspeed_10m: number[];
			time: string[];
		};
		current_weather: {
			weathercode: number;
			temperature: number;
			windspeed: number;
			time: string;
			winddirection: number;
		};
		longitude: number;
	};

	export let locationdata;

	onMount(async () => {
		const lat = locationdata.latitude;
		const lon = locationdata.longitude;
		const timezone = locationdata.timezone;
		const res = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,surface_pressure,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&current_weather=true&windspeed_unit=kn&timezone=${timezone}`
		);
		weatherdata = await res.json();
	});

	let title = locationdata.name;
	let route = $page.url.pathname;

	function geticon(weathercode: number, night: boolean, animated = false) {
		let baseurl;
		let fileext = '.webp';
		if (night) {
			baseurl = '/weathericons/static/night/';
			if (animated) {
				baseurl = '/weathericons/animated/night/';
				fileext = '.svg';
			}
		} else {
			baseurl = '/weathericons/static/day/';
			if (animated) {
				baseurl = '/weathericons/animated/day/';
				fileext = '.svg';
			}
		}

		let icon;

		switch (weathercode) {
			case 0:
				icon = 'clear-sky';
				break;
			case 1:
				icon = 'mainly-clear';
				break;
			case 2:
				icon = 'partly-cloudy';
				break;
			case 3:
				icon = 'overcast';
				break;
			case 45:
			case 48:
				icon = 'fog';
				break;
			case 51:
			case 53:
			case 55:
			case 56:
			case 57:
				icon = 'drizzle';
				break;
			case 61:
			case 63:
			case 65:
			case 66:
			case 67:
				icon = 'rain';
				break;
			case 71:
			case 73:
			case 75:
			case 77:
				icon = 'snow';
				break;
			case 80:
			case 81:
			case 82:
				icon = 'rain-showers';
				break;
			case 85:
			case 86:
				icon = 'snow-showers';
				break;
			case 95:
				icon = 'thunderstorm';
				break;
			case 96:
			case 99:
				icon = 'thunderstorm-hail';
				break;
			default:
				icon = 'clear-sky';
		}
		return baseurl + icon + fileext;
	}
</script>

<svelte:head>
	<title>Wetter für {title}</title>
	<meta property="og:title" content={$t('all.heading') + title} />
	<meta property="og:url" content={'https://www.sailing-weather.de' + route} />
	<meta property="og:description" content={$t('all.title') + title} />
	<meta
		property="twitter:url"
		content={'https://www.sailing-weather.de/' + $page.params.lang + route}
	/>
	<meta property="twitter:title" content={$t('all.heading') + title} />
	<meta property="twitter:description" content={$t('all.title') + title} />
</svelte:head>

<div class="w-full flex flex-col items-center">
	{#if !weatherdata}
		<svg
			class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 flex items-center justify-center"
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor"
			/>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill"
			/>
		</svg>
	{:else}
		<h1 class="text-2xl mb-1">{$t('all.heading')}</h1>
		<h1 class="text-2xl mb-2">{title}</h1>
		<Stats weatherdata={weatherdata} />

		<div class="hidden lg:flex lg:flex-col lg:items-center">
			<Forecast data={weatherdata} day={0} class="my-6" />
			<Forecast data={weatherdata} day={1} class="my-6" />
			<Forecast data={weatherdata} day={2} class="my-6" />
			<div class="alert alert-info shadow-lg max-w-xl m-6">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current flex-shrink-0 w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{$t('all.warning')}</span>
				</div>
			</div>
			<Forecast data={weatherdata} day={3} class="my-6" />
			<Forecast data={weatherdata} day={4} class="my-6" />
			<Forecast data={weatherdata} day={5} class="my-6" />
			<Forecast data={weatherdata} day={6} class="my-6" />
		</div>
		<div class="flex flex-col items-center w-full lg:hidden">
			<MobileForecast data={weatherdata} day={0} class="my-6" />
			<MobileForecast data={weatherdata} day={1} class="my-6" />
			<MobileForecast data={weatherdata} day={2} class="my-6" />
			<div class="alert alert-info shadow-lg max-w-xl m-6">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current flex-shrink-0 w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{$t('all.warning')}</span>
				</div>
			</div>
			<MobileForecast data={weatherdata} day={3} class="my-6" />
			<MobileForecast data={weatherdata} day={4} class="my-6" />
			<MobileForecast data={weatherdata} day={5} class="my-6" />
			<MobileForecast data={weatherdata} day={6} class="my-6" />
		</div>
	{/if}
</div>
