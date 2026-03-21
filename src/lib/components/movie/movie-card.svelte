<script lang="ts">
	import StartIcon from '@lucide/svelte/icons/star';
	import Badge from './badge.svelte';
	import { getAgeColor } from './ageColor';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Movie } from '$lib/server/db/schema';

	const {
		movie,
		children,
		class: className,
		...restProps
	}: { movie: Movie } & HTMLAttributes<HTMLDivElement> = $props();

	const ageClasses = $derived(getAgeColor(movie.ageRating));
</script>

<div
	class={[
		'relative w-full max-w-md overflow-hidden rounded-xl border bg-secondary shadow-lg',
		className
	]}
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

	{@render children?.()}
</div>
