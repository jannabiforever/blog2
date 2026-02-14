<script lang="ts">
	type Props = {
		name: string;
		src: string;
		hidden?: boolean;
	};

	let { name, src, hidden }: Props = $props();
</script>

<div class="flex items-center gap-x-1" {hidden}>
	<img {src} alt="{name} Logo" height="16" width="16" />
	<span>{name}</span>
</div>
