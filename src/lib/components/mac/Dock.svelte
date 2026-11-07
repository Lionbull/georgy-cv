<script lang="ts">
  import {
    apps,
    AppKind,
    dockApps,
    windowDockApps,
    linkDockApps,
    type AppId,
  } from "$lib/stores/apps";
  import { clickApp, pickMenuLink, stopMenuPointer } from "$lib/apps/launch";
  import AppIcon, { IconSize } from "./AppIcon.svelte";
  import LinkMenu, { MenuPlacement } from "./LinkMenu.svelte";

  let hovered: AppId | null = null;
  let menuFor: AppId | null = null;

  function scaleFor(index: number): number {
    if (!hovered) return 1;
    const hi = dockApps.indexOf(hovered);
    const dist = Math.abs(index - hi);
    if (dist === 0) return 1.55;
    if (dist === 1) return 1.28;
    if (dist === 2) return 1.1;
    return 1;
  }

  function onClick(id: AppId) {
    menuFor = clickApp(id, menuFor, { toggle: true });
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<nav
  class="pointer-events-auto absolute bottom-2 left-1/2 z-50 -translate-x-1/2 pb-[env(safe-area-inset-bottom)]"
  aria-label="Dock"
  on:mouseleave={() => (hovered = null)}
>
  <div class="glass-dock relative rounded-[22px]">
    <div class="glass-dock-bg" aria-hidden="true"></div>

    <ul class="relative z-10 flex items-end gap-1.5 px-3 pt-3.5 pb-1.5">
      {#each windowDockApps as id}
        {@const meta = apps.getMeta(id)}
        {@const app = $apps[id]}
        {@const index = dockApps.indexOf(id)}
        {@const scale = scaleFor(index)}
        <li class="relative flex w-15 flex-col items-center justify-end">
          <button
            type="button"
            class="group relative flex origin-bottom items-end justify-center pb-0.5 transition-transform duration-150 ease-out"
            class:dock-bounce={app.bouncing}
            style="transform: scale({scale}); height: {52 * scale}px;"
            aria-label={meta.label}
            on:mouseenter={() => (hovered = id)}
            on:focus={() => (hovered = id)}
            on:click={() => onClick(id)}
          >
            <AppIcon {id} size={IconSize.Md} />
            <span
              class="dock-tooltip pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              {meta.label}
            </span>
          </button>
          <span
            class="mb-0.5 h-1 w-1 rounded-full {app.open
              ? 'bg-black/55'
              : 'bg-transparent'}"
            aria-hidden="true"
          ></span>
        </li>
      {/each}

      <li
        class="mx-1 mb-3 h-10 w-px shrink-0 self-center bg-black/25"
        aria-hidden="true"
      ></li>

      {#each linkDockApps as id}
        {@const meta = apps.getMeta(id)}
        {@const app = $apps[id]}
        {@const index = dockApps.indexOf(id)}
        {@const scale = scaleFor(index)}
        <li class="relative flex w-15 flex-col items-center justify-end">
          <div class="relative flex flex-col items-center">
            <LinkMenu
              open={menuFor === id}
              links={meta.links ?? []}
              placement={MenuPlacement.Above}
              onSelect={(link) => {
                pickMenuLink(link.href);
                menuFor = null;
              }}
              onClose={() => (menuFor = null)}
            />
            <button
              type="button"
              class="group relative flex origin-bottom items-end justify-center pb-0.5 transition-transform duration-150 ease-out"
              class:dock-bounce={app.bouncing}
              style="transform: scale({scale}); height: {52 * scale}px;"
              aria-label={meta.kind === AppKind.Menu
                ? `${meta.label} profiles`
                : `Open ${meta.label} in a new tab`}
              aria-haspopup={meta.kind === AppKind.Menu ? "menu" : undefined}
              aria-expanded={meta.kind === AppKind.Menu ? menuFor === id : undefined}
              on:mouseenter={() => (hovered = id)}
              on:focus={() => (hovered = id)}
              on:pointerdown={(e) => stopMenuPointer(e, id)}
              on:click={() => onClick(id)}
            >
              <AppIcon {id} size={IconSize.Md} />
              {#if menuFor !== id}
                <span
                  class="dock-tooltip pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {meta.label}
                </span>
              {/if}
            </button>
          </div>
          <span class="mb-0.5 h-1 w-1" aria-hidden="true"></span>
        </li>
      {/each}
    </ul>
  </div>
</nav>
