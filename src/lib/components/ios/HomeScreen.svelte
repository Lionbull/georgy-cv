<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { apps, AppKind, dockApps, type AppId } from "$lib/stores/apps";
  import { clickApp, pickMenuLink, stopMenuPointer } from "$lib/apps/launch";
  import AppIcon, { IconSize } from "$lib/components/mac/AppIcon.svelte";
  import LinkMenu, { MenuPlacement } from "$lib/components/mac/LinkMenu.svelte";

  let time = "";
  let date = "";
  let interval: ReturnType<typeof setInterval>;
  let menuFor: AppId | null = null;

  function updateClock() {
    const now = new Date();
    time = now.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    date = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  function open(id: AppId) {
    menuFor = clickApp(id, menuFor);
  }

  onMount(() => {
    updateClock();
    interval = setInterval(updateClock, 30_000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div
  class="relative flex h-full flex-col px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
>
  <div class="mb-10 pt-12 text-center text-white drop-shadow-md">
    <div class="text-[64px] leading-none font-thin tracking-tight tabular-nums">
      {time}
    </div>
    <div class="mt-2 text-[19px] font-medium tracking-wide text-white/90">{date}</div>
  </div>

  <div
    class="mx-auto grid w-full max-w-sm grid-cols-4 gap-x-5 gap-y-7"
    aria-label="Apps"
  >
    {#each dockApps as id}
      {@const meta = apps.getMeta(id)}
      <div class="relative flex flex-col items-center">
        <button
          type="button"
          class="flex flex-col items-center gap-1.5"
          aria-label={meta.kind === AppKind.Menu
            ? `${meta.label} profiles`
            : meta.kind === AppKind.Link
              ? `Open ${meta.label} in a new tab`
              : meta.label}
          aria-haspopup={meta.kind === AppKind.Menu ? "menu" : undefined}
          aria-expanded={meta.kind === AppKind.Menu ? menuFor === id : undefined}
          on:pointerdown={(e) => stopMenuPointer(e, id)}
          on:click={() => open(id)}
        >
          <AppIcon {id} size={IconSize.Lg} />
          <span
            class="text-center text-[11px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
          >
            {meta.label}
          </span>
        </button>
        <LinkMenu
          open={menuFor === id}
          links={meta.links ?? []}
          placement={MenuPlacement.Below}
          onSelect={(link) => {
            pickMenuLink(link.href);
            menuFor = null;
          }}
          onClose={() => (menuFor = null)}
        />
      </div>
    {/each}
  </div>
</div>
