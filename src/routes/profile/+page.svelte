<script lang="ts">
	import { resolve } from '$app/paths';
	import Link from '$lib/components/Link.svelte';
	import StackItem from '$lib/components/StackItem.svelte';
	import StackRow from '$lib/components/StackRow.svelte';
	import { getDarkModeContext } from '$lib/dark-mode.svelte';

	let context = getDarkModeContext();
</script>

<div class="mb-4 flex">
	<Link href={resolve('/')} arrowDir="left">Back to Home</Link>
</div>

<h2>유정인 / Jungin Yu</h2>

<h3>Affiliation</h3>
<ul>
	<li>Seoul National University - Physics and Astronomy</li>
</ul>

<h3>Stacks / Tools</h3>

<div class="grid grid-flow-row-dense grid-cols-[200px_auto]">
	<StackRow title="Languages">
		<StackItem src="https://rust-lang.org/logos/rust-logo-512x512.png" name="Rust" />
		<StackItem
			src="https://www.typescriptlang.org/icons/icon-48x48.png?v=8944a05a8b601855de116c8a56d3b3ae"
			name="TypeScript"
		/>
	</StackRow>

	<StackRow title="FP">
		<StackItem src="https://effect.website/favicon.png" name="Effect-ts" />
	</StackRow>

	<StackRow title="Frontend">
		<StackItem src="https://svelte.dev/favicon.png" name="Svelte" />
		<StackItem src="https://tailwindcss.com/favicons/favicon-32x32.png?v=4" name="TailwindCSS" />
	</StackRow>

	<StackRow title="Backend">
		<StackItem src="https://supabase.com/favicon/favicon-32x32.png" name="Supabase" />
		<StackItem src="https://www.meilisearch.com/favicon.ico" name="Meilisearch" />
	</StackRow>

	<StackRow title="DB">
		<StackItem src="https://www.postgresql.org/favicon.ico" name="PostgreSQL" />
		<StackItem
			src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xml:space='preserve'%20viewBox='0%200%20840%20979.9'%3e%3clinearGradient%20id='a'%20x1='203.348'%20x2='636.696'%20y1='-25.413'%20y2='725.168'%20gradientTransform='translate(0%20140.11)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20style='stop-color:%23ff00a0'/%3e%3cstop%20offset='1'%20style='stop-color:%239600ff'/%3e%3c/linearGradient%3e%3cpath%20d='M420%20257.8%20653.3%20387v-51.8L420%20206.3c-34.7%2019.2-202.4%20111.9-233.3%20128.9%2028.7%2015.9%20330.1%20182.4%20513.3%20283.6v51.6c-24.9%2013.8-280%20154.7-280%20154.7-69.8-38.5-210.3-116.1-280-154.7V515.7l280%20154.7%2046.7-25.8L93.3%20438.4v257.9L420%20876.7c32.2-17.8%20302.8-167.3%20326.6-180.5V593.1L280%20335.2zM93.3%20283.6v103.2l466.6%20257.9-140%2077.4-233.3-129.2v51.8l233.3%20128.9c34.7-19.2%20202.4-111.9%20233.3-128.9-28.7-15.9-330-182.4-513.2-283.7v-51.6c24.9-13.8%20280-154.7%20280-154.7%2069.7%2038.6%20210.2%20116.2%20280%20154.7v154.7L420%20309.4l-46.7%2025.8%20373.3%20206.3V283.6L420%20103.1C387.7%20121%20117.2%20270.5%2093.3%20283.6M420%200%200%20232.1v515.7l420%20232.1%20420-232V232.1zm373.2%20722L420%20928.3%2046.7%20722V257.9L420%2051.6l373.3%20206.3z'%20style='fill:url(%23a)'/%3e%3c/svg%3e"
			name="SurrealDB"
		/>
		<StackItem src="https://diesel.rs/assets/images/diesel_logo_favicon_32.png" name="Diesel" />
	</StackRow>

	<StackRow title="Development">
		<StackItem src="https://nixos.wiki/favicon.png" name="Nix" />
		<StackItem
			src="https://www.docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-32x32.png"
			name="Docker"
		/>
		<StackItem src="https://git-scm.com/favicon.ico" name="Git" />
		<StackItem src="https://containers.dev/img/favicon.ico" name="Devcontainer" />
	</StackRow>

	<StackRow title="Build">
		<StackItem
			src="https://www.gstatic.com/devrel-devsite/prod/v4d7086213de4a88af46437fe81d3213e3e0b7f024ec300b3813c1a681a622c28/bazel/images/favicon-prod.png"
			name="Bazel"
		/>
		<StackItem src="https://ko.vite.dev/logo.svg" name="Vite" />
	</StackRow>

	<StackRow title="CI/CD">
		<StackItem src="https://github.com/fluidicon.png" name="Github Actions" />
	</StackRow>

	<StackRow title="Editor">
		<StackItem
			src="https://zed.dev/favicon_white_32.png"
			name="Zed"
			hidden={!context.getDarkMode()}
		/>
		<StackItem
			src="https://zed.dev/favicon_black_32.png"
			name="Zed"
			hidden={context.getDarkMode()}
		/>
		<StackItem
			src="data:image/png;base64,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"
			name="Neovim"
		/>
		<StackItem src="https://obsidian.md/favicon.ico" name="Obsidian" />
	</StackRow>
</div>
