<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Toggle from '$lib/components/ui/toggle';
	import { setDarkModeContext } from '$lib/dark-mode.svelte';
	import { resolve } from '$app/paths';
	import { Github, Instagram, Moon, Sun } from 'lucide-svelte';
	import * as Button from '$lib/components/ui/button';

	let { children } = $props();

	let darkModeContext = setDarkModeContext();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header
	class="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-lg select-none"
>
	<Toggle.Root
		size="lg"
		variant="outline"
		onPressedChange={() => darkModeContext.toggleDarkMode()}
		pressed={darkModeContext.getDarkMode()}
		class="cursor-pointer"
	>
		{#if darkModeContext.getDarkMode()}
			<Moon />
		{:else}
			<Sun />
		{/if}
	</Toggle.Root>

	<a href={resolve('/')} class="text-4xl"> BLOG </a>

	<div class="flex items-center gap-x-1">
		<Button.Root
			href="https://github.com/jannabiforever"
			target="_blank"
			variant="ghost"
			size="icon-lg"
		>
			<Github class="size-6" />
		</Button.Root>
		<Button.Root
			href="https://instagram.com/4ortis_mane"
			target="_blank"
			variant="ghost"
			size="icon-lg"
		>
			<Instagram class="size-6" />
		</Button.Root>
	</div>
</header>

<main class="m-0! flex min-h-screen w-full justify-center px-10 pt-10">
	<div class="container! prose lg:prose-xl dark:prose-invert">
		{@render children()}
	</div>
</main>
