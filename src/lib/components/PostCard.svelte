<script lang="ts">
	import type { ValidatedPost } from '$lib/posts/meta';
	import * as Badge from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	type Props = ValidatedPost;

	let { title, date, summary, tags, slug }: Props = $props();
</script>

<div class="flex">
	<Card.Root
		class="w-full cursor-pointer transition-colors ease-in-out hover:border-primary"
		onclick={() => goto(resolve(`/posts/${slug}`))}
	>
		<Card.Header>
			<Card.Title>{title}</Card.Title>
			<Card.Description>{summary}</Card.Description>
		</Card.Header>
		<Card.Footer class="justify-between gap-2">
			<div class="flex gap-x-1">
				{#each tags as tag (tag)}
					<Badge.Badge variant="secondary">#{tag}</Badge.Badge>
				{/each}
			</div>
			<span class="text-end text-xs text-muted-foreground">{date}</span>
		</Card.Footer>
	</Card.Root>
</div>
