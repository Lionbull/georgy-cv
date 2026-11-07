<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { apps, AppId, windowDockApps } from "$lib/stores/apps";
  import { WINDOW_APPS } from "$lib/apps/windowApps";
  import MenuBar from "$lib/components/mac/MenuBar.svelte";
  import Dock from "$lib/components/mac/Dock.svelte";
  import Window from "$lib/components/mac/Window.svelte";
  import HomeScreen from "$lib/components/ios/HomeScreen.svelte";
  import AppSheet from "$lib/components/ios/AppSheet.svelte";
  import WelcomeOverlay from "$lib/components/WelcomeOverlay.svelte";

  const MQ = "(min-width: 768px)";
  let isDesktop = false;
  let mounted = false;
  let welcomeDone = false;
  let deepLinkClassicCV = false;

  function syncMode() {
    isDesktop = window.matchMedia(MQ).matches;
  }

  function enterAfterWelcome() {
    if (deepLinkClassicCV) {
      apps.openClassicCVOnly();
      return;
    }
    // Desktop defaults to Terminal; mobile stays on the home screen
    if (isDesktop) apps.openApp(AppId.Terminal);
  }

  function onWelcomeDone() {
    welcomeDone = true;
    enterAfterWelcome();
  }

  function syncVisualViewport() {
    const vv = window.visualViewport;
    if (!vv) return;
    // iOS keyboard resizes the visual viewport; keep sheets above it
    document.documentElement.style.setProperty("--vv-height", `${vv.height}px`);
    document.documentElement.style.setProperty("--vv-offset-top", `${vv.offsetTop}px`);
  }

  onMount(() => {
    syncMode();
    mounted = true;
    syncVisualViewport();

    const mql = window.matchMedia(MQ);
    const handler = () => {
      const wasDesktop = isDesktop;
      syncMode();
      if (!welcomeDone) return;

      if (!wasDesktop && isDesktop) {
        const anyOpen = windowDockApps.some(
          (id) => $apps[id].open && !$apps[id].minimized
        );
        if (!anyOpen) apps.openApp(AppId.Terminal);
      }
      if (wasDesktop && !isDesktop) {
        for (const id of windowDockApps) apps.closeApp(id);
      }
    };
    mql.addEventListener("change", handler);

    const vv = window.visualViewport;
    vv?.addEventListener("resize", syncVisualViewport);
    vv?.addEventListener("scroll", syncVisualViewport);

    const params = $page.url.searchParams;
    deepLinkClassicCV =
      params.get("app") === AppId.ClassicCV ||
      (browser && sessionStorage.getItem("openApp") === AppId.ClassicCV);
    if (deepLinkClassicCV) {
      sessionStorage.removeItem("openApp");
    }

    return () => {
      mql.removeEventListener("change", handler);
      vv?.removeEventListener("resize", syncVisualViewport);
      vv?.removeEventListener("scroll", syncVisualViewport);
    };
  });
</script>

<div class="wallpaper relative h-dvh min-h-dvh w-full overflow-hidden">
  {#if !mounted}
    <div class="flex h-full items-center justify-center bg-black text-white/70">Loading…</div>
  {:else}
    {#if welcomeDone}
      {#if isDesktop}
        <MenuBar />
        <!-- isolate + z-10: window zIndexes stay below MenuBar (z-40) / Dock (z-50) -->
        <div class="absolute inset-0 z-10 isolate pt-7 pb-24">
          {#each WINDOW_APPS as entry}
            <Window
              appId={entry.id}
              title={apps.getMeta(entry.id).title}
              darkChrome={!!entry.darkChrome}
            >
              <svelte:component this={entry.component} />
            </Window>
          {/each}
        </div>
        <Dock />
      {:else}
        {@const sheetOpen = windowDockApps.some(
          (id) => $apps[id].open && !$apps[id].minimized
        )}
        <div class="absolute inset-0" inert={sheetOpen || undefined}>
          <HomeScreen />
        </div>
        {#each WINDOW_APPS as entry}
          <AppSheet
            appId={entry.id}
            title={apps.getMeta(entry.id).label}
            darkChrome={!!entry.darkChrome}
          >
            <svelte:component this={entry.component} />
          </AppSheet>
        {/each}
      {/if}
    {/if}

    <WelcomeOverlay desktop={isDesktop} on:done={onWelcomeDone} />
  {/if}
</div>
