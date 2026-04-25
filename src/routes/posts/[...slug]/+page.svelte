<script lang="ts">
	import { onMount, tick, type Component } from 'svelte';
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';
	import * as Badge from '$lib/components/ui/badge';
	import Link from '$lib/components/Link.svelte';
	import { loadPostWithComponent } from '$lib/posts/loader';

	let { data }: { data: PageData } = $props();

	let PostComponent: Component | null = $state(null);
	let loading = $state(true);
	let error: string | null = $state(null);
	let bodyEl: HTMLDivElement | undefined = $state();
	let tocItems: Array<{ level: number; text: string; id: string }> = $state([]);

	onMount(async () => {
		try {
			if (data.component) {
				PostComponent = data.component;
			} else {
				// Fallback: use existing utility function
				const post = await loadPostWithComponent(data.slug);
				if (post?.component) {
					PostComponent = post.component;
				} else {
					throw new Error('Post component not found');
				}
			}
		} catch (err) {
			console.error('Error loading post component:', err);
			error = 'Failed to load post content';
		} finally {
			loading = false;
		}
	});

	$effect(() => {
		if (!PostComponent || !bodyEl) return;
		tick().then(() => {
			if (!bodyEl) return;
			const headings = bodyEl.querySelectorAll<HTMLElement>('h1, h2, h3');
			const items: Array<{ level: number; text: string; id: string }> = [];
			headings.forEach((h) => {
				const text = h.textContent?.trim() ?? '';
				if (!text) return;
				const slug = slugify(text);
				h.id = slug;
				items.push({ level: parseInt(h.tagName[1]), text, id: slug });
			});
			tocItems = items;
		});
	});

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^\p{L}\p{N}\s-]/gu, '')
			.trim()
			.replace(/\s+/g, '-');
	}

	// Format date for display
	function formatDate(dateString: string): string {
		try {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return dateString;
		}
	}
</script>

<svelte:head>
	{#if data.metadata}
		<title>{data.metadata.title}</title>
		{#if data.metadata.summary}
			<meta name="description" content={data.metadata.summary} />
		{/if}
		{#if data.metadata.tags}
			<meta name="keywords" content={data.metadata.tags.join(', ')} />
		{/if}
		<meta property="og:title" content={data.metadata.title} />
		{#if data.metadata.summary}
			<meta property="og:description" content={data.metadata.summary} />
		{/if}
	{/if}
</svelte:head>

<div class="relative mx-auto w-full max-w-3xl py-8">
	<aside class="absolute inset-y-8 right-full mr-8 hidden w-44 xl:block">
		{#if tocItems.length > 0}
			<nav class="not-prose sticky top-24">
				<h3 class="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
					What's in this post
				</h3>
				<ul class="space-y-1.5 text-sm">
					{#each tocItems as item (item.id)}
						<li style="padding-left: {(item.level - 1) * 0.75}rem">
							<a
								href="#{item.id}"
								class="text-muted-foreground transition-colors hover:text-foreground"
							>
								{item.text}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</aside>

	<article class="w-full">
		{#if data.metadata}
			<!-- Post Header -->
			<div class="not-prose mb-8 border-b border-border pb-8">
				<h1 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{data.metadata.title}</h1>

				<div
					class="mb-4 flex flex-col text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4"
				>
					<time datetime={data.metadata.date}>
						{formatDate(data.metadata.date)}
					</time>
					<span class="italic">by Jungin Yu</span>
				</div>

				{#if data.metadata.summary}
					<p class="mb-4 text-lg text-muted-foreground italic">
						{data.metadata.summary}
					</p>
				{/if}

				{#if data.metadata.tags && data.metadata.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each data.metadata.tags as tag (tag)}
							<Badge.Badge variant="secondary">#{tag}</Badge.Badge>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Post Content -->
		<main>
			{#if loading}
				<div class="flex flex-col items-center justify-center py-12">
					<div class="mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-border"></div>
					<p class="text-muted-foreground">Loading post content...</p>
				</div>
			{:else if error}
				<div class="py-12 text-center">
					<h2 class="text-xl font-bold text-destructive">Error Loading Post</h2>
					<p class="text-muted-foreground">{error}</p>
					<Link href={resolve('/')} arrowDir="left">Back to all posts</Link>
				</div>
			{:else if PostComponent}
				<div
					bind:this={bodyEl}
					class="prose max-w-none lg:prose-lg dark:prose-invert prose-h1:text-2xl sm:prose-h1:text-3xl"
				>
					<PostComponent />
				</div>
			{:else}
				<div class="py-12 text-center">
					<h2 class="text-xl font-bold text-muted-foreground">Post Not Found</h2>
					<p class="text-muted-foreground">The requested post content could not be loaded.</p>
					<Link href={resolve('/')} arrowDir="left">Back to all posts</Link>
				</div>
			{/if}
		</main>

		<!-- Post Footer -->
		<footer class="not-prose mt-12 border-t border-border pt-8">
			<Link href={resolve('/')} arrowDir="left">Back to home</Link>
		</footer>
	</article>
</div>
