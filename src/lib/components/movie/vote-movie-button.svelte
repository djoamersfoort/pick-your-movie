<script lang="ts">
	import MovieCard from './movie-card.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { VoteMovie } from '$lib/server/vote/types';

	const {
		movie,
		class: className,
		...restProps
	}: { movie: VoteMovie } & HTMLButtonAttributes = $props();
</script>

<button
	class={[
		'rounded-lg',
		'transition-all hover:scale-[1.01] hover:-rotate-[0.25deg] hover:brightness-110 odd:hover:rotate-[0.25deg]',
		{
			'scale-[1.02]! odd:rotate-[0.5deg]! even:-rotate-[0.5deg]!': movie.voted,
			'pointer-events-none opacity-20 blur-sm': !movie.appropriate
		},
		className
	]}
	disabled={!movie.appropriate}
	{...restProps}
>
	<MovieCard {movie}>
		<div
			class={[
				'absolute inset-0 h-full w-full bg-green-500/50 opacity-0 transition-opacity',
				{ 'opacity-100': movie.voted }
			]}
		></div>
	</MovieCard>
</button>
