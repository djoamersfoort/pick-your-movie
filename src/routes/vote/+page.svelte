<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import VoteMovieButton from '$lib/components/movie/vote-movie-button.svelte';

	const { data, form }: PageProps = $props();
</script>

<div class="container mx-auto flex flex-col gap-4 p-4">
	<div
		class="fixed top-0 left-0 z-10 h-32 w-full bg-linear-to-t from-transparent to-background"
	></div>

	<div
		class="sticky top-4 z-10 flex items-center justify-between rounded-lg border-b bg-accent/80 px-4 py-3 text-accent-foreground backdrop-blur-2xl"
	>
		<div class="font-semibold capitalize">
			{data.user.name}
		</div>

		<div>
			<span class="font-bold text-green-500">{data.voteCount}</span>
			<span class="text-muted-foreground">/ {data.maxVotes}</span>
		</div>

		<Button variant="destructive" href="/logout">
			<LogOutIcon />
			<span class="sr-only md:not-sr-only">Logout</span>
		</Button>
	</div>

	<form method="POST" use:enhance>
		<div class="flex flex-wrap justify-center gap-4">
			{#each data.movies as movie}
				<VoteMovieButton
					{movie}
					formaction={movie.voted ? '?/deregister' : '?/register'}
					name="movieId"
					value={movie.bkey}
					type="submit"
				/>
			{/each}
		</div>
	</form>
</div>
