<script lang="ts">
	import type { StatMovie } from '$lib/server/vote/types';
	import type { HTMLAttributes } from 'svelte/elements';
	import MovieCard from './movie-card.svelte';

	const { movie }: { movie: StatMovie } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<MovieCard {movie}>
	<div class="absolute inset-0 flex h-full w-full items-center justify-center">
		<span
			class="rounded-lg border border-zinc-200/20 bg-zinc-950/80 px-4 py-2 text-3xl leading-none font-bold text-green-500 shadow-md backdrop-blur-sm"
		>
			{movie.votes} Vote{#if movie.votes > 1}s{/if}
		</span>
	</div>
</MovieCard>
