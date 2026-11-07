/** svelte-icons ships no .d.ts; treat icon .svelte files as components. */
declare module "svelte-icons/*" {
	import type { SvelteComponentTyped } from "svelte";
	export default class Icon extends SvelteComponentTyped<
		Record<string, never>
	> {}
}
