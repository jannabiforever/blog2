<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';
	import type { Component } from 'svelte';
	import * as Badge from '$lib/components/ui/badge';
	import Link from '$lib/components/Link.svelte';
	import { loadPostWithComponent } from '$lib/posts/loader';

	export let data: PageData;

	let PostComponent: Component | null = null;
	let loading = true;
	let error: string | null = null;

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

<article class="px-4 py-8">
	{#if data.metadata}
		<!-- Post Header -->
		<div class="mb-8 border-b border-border pb-8">
			<h1>{data.metadata.title}</h1>

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
				<h2 class="font-bold text-destructive">Error Loading Post</h2>
				<p class="ext-muted-foreground">{error}</p>
				<Link href={resolve('/')} arrowDir="left">Back to all posts</Link>
			</div>
		{:else if PostComponent}
			<svelte:component this={PostComponent} />
		{:else}
			<div class="py-12 text-center">
				<h2 class="font-bold text-muted-foreground">Post Not Found</h2>
				<p class="text-muted-foreground">The requested post content could not be loaded.</p>
				<Link href={resolve('/')} arrowDir="left">Back to all posts</Link>
			</div>
		{/if}
	</main>

	<!-- Post Footer -->
	<footer class="mt-12 border-t border-border pt-8">
		<Link href={resolve('/')} arrowDir="left">Back to home</Link>
	</footer>
</article>
