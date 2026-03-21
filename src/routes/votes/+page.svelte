<script lang="ts">
	import StatMovieCard from '$lib/components/movie/stat-movie-card.svelte';
	import { onMount } from 'svelte';
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	onMount(() => {
		const interval = setInterval(() => {
			invalidateAll();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="container mx-auto p-4">
	<div class="flex flex-wrap justify-center gap-4">
		{#each data.movies as movie}
			<StatMovieCard {movie} />
		{/each}
	</div>
</div>
