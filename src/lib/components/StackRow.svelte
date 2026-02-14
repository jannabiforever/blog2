<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		children: Snippet<[]>;
	};

	let { title, children }: Props = $props();
</script>

<span>{title}</span>
<div class="flex h-9 items-center gap-x-6">
	{@render children()}
</div>
