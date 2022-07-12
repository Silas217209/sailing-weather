<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/translations';
	import {page} from '$app/stores'

	let haslocation: boolean = false;
	let positionwaiting: boolean = false;
	let positionerror: boolean = false;
	let query: string = '';
	const lang = $page.params.lang

	$: towns = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&language=${lang}`)
		.then((response) => response.json())
		.then((res) => {
			return res.results;
		}) || []

	const success = (position: { coords: { latitude: any; longitude: any } }) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		haslocation = true;
		positionwaiting = false;
		positionerror = false;
		goto(`${$page.params.lang}/forecast/${latitude.toFixed(2)}/${longitude.toFixed(2)}`);
	};

	const error = (err: any) => {
		positionwaiting = false;
		positionerror = true;
	};

	function getLocation() {
		positionwaiting = true;
		navigator.geolocation.getCurrentPosition(success, error);
	}

	function navigate(route: string): void {
		goto(`/${$page.params.lang}/${route}`);
	}
</script>

<div class="flex justify-center w-full flex-col items-center">
	<div class="m-8 flex flex-col w-full justify-center items-center">
		<div class="flex">
			<input
				bind:value={query}
				type="text"
				placeholder={$t('all.search')}
				class="input input-bordered w-full max-w-xs mb-8"
			/>
			<button
			name="current-location"
			aria-label="current-location"
				class="btn btn-circle btn-outline ml-4 flex items-center justify-center"
				on:click={getLocation}
			>
				{#if positionwaiting}
					<svg
						class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600 flex items-center justify-center"
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
				{:else if positionerror}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="currentcolor"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path
							d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
						/>
						<circle cx="12" cy="9" r="2.5" />
					</svg>
				{/if}
			</button>
		</div>
		<div class="overflow-x-auto w-full m-8 lg:w-1/2">
			{#await towns}
				<table class="table table-compact w-full" />
			{:then towns}
				<table class="table table-compact w-full">
					<thead>
						<tr>
							<th />
							<th>{$t('all.name')}</th>
							<th>{$t('all.details')}</th>
							<th>{$t('all.country')}</th>
						</tr>
					</thead>
					<tbody>
						{#each towns as item, index}
							<tr class="hover:active" on:click={navigate(`forecast/${item.id}`)}>
								<th>{index + 1}</th>
								<td>
									{item.name}
								</td>
								<td>{item.admin1}</td>
								<td>{item.country}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:catch error}
				<p>Ein Fehler ist aufgetreten: überprüfe deine Internetverbindung</p>
			{/await}
		</div>
	</div>
</div>
