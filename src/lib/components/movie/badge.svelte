<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	const {
		children,
		class: className
	}: {
		children: Snippet;
		class: ClassValue;
	} = $props();
</script>

<span
	class={[
		className,
		'inline-flex h-7 items-center gap-1 rounded-full border border-zinc-200/20 bg-zinc-950/80 px-2 text-sm leading-none font-semibold shadow-md backdrop-blur-sm'
	]}
>
	{@render children()}
</span>
