<script lang="ts" context="module">
  export const MenuPlacement = {
    Above: "above",
    Below: "below",
  } as const;

  export type MenuPlacement = (typeof MenuPlacement)[keyof typeof MenuPlacement];
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { AppLink } from "$lib/stores/apps";

  export let links: AppLink[] = [];
  export let open = false;
  /** Dock sits at the bottom → menu opens upward; home screen can open downward */
  export let placement: MenuPlacement = MenuPlacement.Above;
  export let onSelect: (link: AppLink) => void = () => {};
  export let onClose: () => void = () => {};

  let root: HTMLDivElement;

  function select(link: AppLink) {
    onSelect(link);
    onClose();
  }

  function onDocPointer(e: PointerEvent) {
    if (!open || !root) return;
    if (!root.contains(e.target as Node)) onClose();
  }

  function onKey(e: KeyboardEvent) {
    if (open && e.key === "Escape") onClose();
  }

  function getPlacementClass(placement: MenuPlacement): string {
    switch (placement) {
      case MenuPlacement.Above:
        return "bottom-full mb-2";
      case MenuPlacement.Below:
        return "top-full mt-2";
    }
  }

  onMount(() => {
    document.addEventListener("pointerdown", onDocPointer, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointer, true);
      document.removeEventListener("keydown", onKey);
    };
  });
</script>

{#if open}
  <div
    bind:this={root}
    class="dock-link-menu absolute left-1/2 z-50 min-w-37.5 -translate-x-2/3 overflow-hidden rounded-xl md:-translate-x-1/2 {getPlacementClass(placement)}"
    role="menu"
    aria-label="GitHub profiles"
  >
    {#each links as link}
      <button
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-black/85 hover:bg-[#0a84ff] hover:text-white"
        on:click|stopPropagation={() => select(link)}
      >
        <span class="truncate">@{link.label}</span>
      </button>
    {/each}
  </div>
{/if}

<style>
  .dock-link-menu {
    background: rgba(246, 246, 248, 0.92);
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    border: 0.5px solid rgba(255, 255, 255, 0.55);
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.65);
  }
</style>
