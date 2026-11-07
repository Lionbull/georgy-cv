<script lang="ts">
  import { apps, type WindowAppId } from "$lib/stores/apps";

  export let appId: WindowAppId;
  export let title: string;
  export let darkChrome = false;

  $: app = $apps[appId];

  function close() {
    apps.closeApp(appId);
  }
</script>

{#if app.open}
  <!-- Keep mounted while minimized so app content state survives restore -->
  <div
    class="sheet-in absolute inset-0 z-50 flex flex-col"
    class:hidden={app.minimized}
    style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"
    role="dialog"
    aria-modal={!app.minimized}
    aria-label={title}
    aria-hidden={app.minimized}
    inert={app.minimized || undefined}
  >
    <div
      class="glass-panel m-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px]"
    >
      <header
        class="relative flex h-12 shrink-0 items-center justify-between border-b border-white/20 px-3"
        style="background: linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.12));"
      >
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-white/35 text-black/70 shadow-sm backdrop-blur-md"
          aria-label="Close"
          on:click={close}
        >
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <h2
          class="absolute left-1/2 max-w-[50%] -translate-x-1/2 truncate text-[15px] font-semibold text-black/75"
        >
          {title}
        </h2>
        <span class="h-8 w-8" aria-hidden="true"></span>
      </header>
      <div
        class="min-h-0 flex-1 overflow-hidden {darkChrome ? 'bg-black' : 'bg-[#f2f2f7]'}"
      >
        <slot />
      </div>
    </div>
  </div>
{/if}
