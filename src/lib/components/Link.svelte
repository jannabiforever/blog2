<script lang="ts">
	import * as Button from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		arrowDir?: 'left' | 'right' | 'up-right';
		children: Snippet<[]>;
	};

	let { href, arrowDir = 'up-right', children }: Props = $props();

	let linkHovered = $state(false);

	let iconPosition: 'left' | 'right' = $derived.by(() => {
		if (arrowDir === 'left') return 'left';
		return 'right';
	});
</script>

{#snippet icon()}
	{#if arrowDir === 'left'}
		<ArrowLeft
			size={12}
			class={cn(
				'transition-transform ease-in-out',
				linkHovered ? 'translate-x-0' : 'translate-x-0.5'
			)}
		/>
	{:else if arrowDir === 'right'}
		<ArrowRight
			size={12}
			class={cn(
				'transition-transform ease-in-out',
				linkHovered ? '-translate-x-0.5' : '-translate-x-1'
			)}
		/>
	{:else}
		<ArrowUpRight
			size={12}
			class={cn(
				'transition-transform ease-in-out',
				linkHovered ? '-translate-x-0.5 -translate-y-0.5' : '-translate-x-1'
			)}
		/>
	{/if}
{/snippet}

<Button.Root
	{href}
	class="flex items-center p-0!"
	variant="link"
	size="sm"
	onmouseenter={() => (linkHovered = true)}
	onmouseleave={() => (linkHovered = false)}
>
	{#if iconPosition === 'right'}
		<span>{@render children()}</span>
		{@render icon()}
	{:else}
		{@render icon()}
		<span>{@render children()}</span>
	{/if}
</Button.Root>
