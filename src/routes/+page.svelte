<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import PostCard from '$lib/components/PostCard.svelte';

	const identities = ['Jungin Yu', '유정인', 'a Software Developer'];
	let nameIdx = $state(0);

	setInterval(() => {
		nameIdx = (nameIdx + 1) % identities.length;
	}, 500);

	let { data } = $props();
	let posts = $derived(data.posts);
</script>

<div>
	<div class="mb-6 flex items-center gap-4">
		<h2 class="m-0!">I'm</h2>
		<Carousel.Root
			plugins={[
				Autoplay({
					delay: 5000
				})
			]}
			orientation="vertical"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="h-25">
				{#each identities as name (name)}
					<Carousel.Item class="basis-1">
						<h2 class="m-0! py-1">{name}.</h2>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>

	<article class="flex flex-col gap-0">
		<p class="m-0!">I like to solve problems in sneaky ways.</p>
	</article>

	<div class="flex flex-col gap-y-1">
		<h3>Posts</h3>
		<div class="grid grid-cols-1 gap-2">
			{#each posts as post (post.title)}
				<PostCard {...post} />
			{:else}
				<p>No posts yet.</p>
			{/each}
		</div>
	</div>
</div>
