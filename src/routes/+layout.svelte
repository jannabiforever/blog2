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
	class="sticky top-0 z-50 flex h-16 items-center justify-center border-b backdrop-blur-lg select-none"
>
	<div class="container flex items-center justify-between">
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
	</div>
</header>

<main class="m-0! flex min-h-[calc(100vh-128px)] w-full justify-center px-4 pt-10 sm:px-6 lg:px-10">
	<div class="prose w-full max-w-3xl lg:prose-xl dark:prose-invert">
		{@render children()}
	</div>
</main>

<footer class="flex h-16 w-full items-center justify-center border-t">
	<div class="container">© 2026 Jungin Yu.</div>
</footer>
