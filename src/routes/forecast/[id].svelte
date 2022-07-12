<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
  
	function getlang() {
		const languages = navigator.languages;
		const translations = ['de', 'fr', 'en'];

		for (let i in languages) {
			if (translations.includes(languages[i].split('-')[0])) {
				return languages[i].split('-')[0];
			}
		}
		return 'en';
	}
	onMount(() => {
		if (browser) {
			goto(`/${getlang()}/forecast/${$page.params.id}`);
		}
	});
</script>
