<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	import * as Card from '$lib/components/ui/card';
	import * as Field from '$lib/components/ui/field';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let { form }: PageProps = $props();
</script>

<div class="flex min-h-screen w-full items-center justify-center p-2">
	<Card.Root class="w-full max-w-xl">
		<Card.Content>
			<form method="POST" use:enhance>
				<Field.Group>
					<Field.Field>
						<Field.Label for="name">Full Name</Field.Label>

						<Input
							id="name"
							type="text"
							name="name"
							value={form?.name ?? ''}
							aria-invalid={!!form?.error}
							required
							placeholder="henk de vries"
							class="capitalize"
						/>

						{#if form?.error}
							<Field.Error>{form.error}</Field.Error>
						{/if}

						<Field.Description>The name you used to sign up for the event.</Field.Description>
					</Field.Field>

					<Field.Field>
						<Button type="submit">Login</Button>
					</Field.Field>
				</Field.Group>
			</form>
		</Card.Content>
	</Card.Root>
</div>
