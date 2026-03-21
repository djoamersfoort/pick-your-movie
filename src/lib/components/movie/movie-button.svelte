<script lang="ts">
	import StartIcon from '@lucide/svelte/icons/star';
	import Badge from './badge.svelte';
	import { getAgeColor } from './ageColor';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { UIMovie } from '$lib/server/vote/types';

	const { movie, ...restProps }: { movie: UIMovie } & HTMLButtonAttributes = $props();

	const ageClasses = $derived(getAgeColor(movie.ageRating));
</script>

<button
	class={[
		'relative w-full max-w-md overflow-hidden rounded-xl border bg-secondary shadow-lg',
		'transition-all hover:scale-[1.01] hover:-rotate-[0.25deg] hover:brightness-110 odd:hover:rotate-[0.25deg]',
		{
			'scale-[1.02]! border-green-500 odd:rotate-[0.5deg]! even:-rotate-[0.5deg]!': movie.voted,
			'pointer-events-none opacity-20 blur-sm': !movie.appropriate
		}
	]}
	disabled={!movie.appropriate}
	{...restProps}
>
	<img src={movie.image} alt={movie.title} class="w-full" />

	<!-- badges -->
	{#if movie.ageRating}
		<Badge class={['absolute top-2 left-2 font-bold!', ageClasses]}>
			{movie.ageRating}+
		</Badge>
	{/if}

	<Badge class="absolute top-2 right-2 text-zinc-50">
		{movie.score / 10}
		<StartIcon class="aspect-square w-4 text-amber-300" />
	</Badge>

	<!-- movie name -->
	<div class="border-t p-2 text-center font-bold">
		{movie.title}
	</div>

	<!-- selected outline -->
	<div
		class={[
			'absolute inset-0 h-full w-full bg-green-500/50 opacity-0 transition-opacity',
			{ 'opacity-100': movie.voted }
		]}
	></div>
</button>
