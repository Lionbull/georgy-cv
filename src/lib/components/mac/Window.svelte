<script lang="ts">
  import { apps, type WindowAppId } from "$lib/stores/apps";

  export let appId: WindowAppId;
  export let title: string;
  /** Dark title bar (Terminal); light for document apps */
  export let darkChrome = false;

  const DOCK_CLEARANCE = 88;
  const MENUBAR = 28;
  const MIN_W = 360;
  const MIN_H = 240;

  const RESIZE_HANDLES = [
    { dir: "n", class: "absolute top-0 left-0 h-1.5 w-full cursor-n-resize" },
    { dir: "s", class: "absolute bottom-0 left-0 h-1.5 w-full cursor-s-resize" },
    { dir: "w", class: "absolute top-0 left-0 h-full w-1.5 cursor-w-resize" },
    { dir: "e", class: "absolute top-0 right-0 h-full w-1.5 cursor-e-resize" },
    { dir: "nw", class: "absolute top-0 left-0 h-3 w-3 cursor-nw-resize" },
    { dir: "ne", class: "absolute top-0 right-0 h-3 w-3 cursor-ne-resize" },
    { dir: "sw", class: "absolute bottom-0 left-0 h-3 w-3 cursor-sw-resize" },
    { dir: "se", class: "absolute right-0 bottom-0 h-3 w-3 cursor-se-resize" },
  ];

  let dragging = false;
  let resizing = false;
  let resizeDir = "";
  let startX = 0;
  let startY = 0;
  let startRect = { x: 0, y: 0, width: 0, height: 0 };

  $: app = $apps[appId];
  $: style = app.maximized
    ? `left:0;top:${MENUBAR}px;width:100%;height:calc(100% - ${MENUBAR + DOCK_CLEARANCE}px);z-index:${app.zIndex};border-radius:0;`
    : `left:${app.rect.x}px;top:${app.rect.y}px;width:${app.rect.width}px;height:${app.rect.height}px;z-index:${app.zIndex};`;
  $: titlebarClass = darkChrome ? "glass-titlebar-dark" : "glass-titlebar";
  $: titleClass = darkChrome ? "text-white/80" : "text-black/55";

  function onFocus() {
    apps.focusApp(appId);
  }

  function onClose(e: MouseEvent) {
    e.stopPropagation();
    apps.closeApp(appId);
  }

  function onMinimize(e: MouseEvent) {
    e.stopPropagation();
    apps.minimizeApp(appId);
  }

  function onMaximize(e: MouseEvent) {
    e.stopPropagation();
    apps.toggleMaximize(appId);
  }

  function startDrag(e: MouseEvent) {
    if (app.maximized) return;
    if ((e.target as HTMLElement).closest(".traffic-lights")) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startRect = { ...app.rect };
    apps.focusApp(appId);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function startResize(e: MouseEvent, dir: string) {
    if (app.maximized) return;
    e.stopPropagation();
    e.preventDefault();
    resizing = true;
    resizeDir = dir;
    startX = e.clientX;
    startY = e.clientY;
    startRect = { ...app.rect };
    apps.focusApp(appId);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(e: PointerEvent) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const maxW = window.innerWidth;
    const maxH = window.innerHeight - DOCK_CLEARANCE;

    if (dragging) {
      const x = Math.max(0, Math.min(startRect.x + dx, maxW - 120));
      const y = Math.max(MENUBAR, Math.min(startRect.y + dy, maxH - 40));
      apps.setRect(appId, { x, y });
      return;
    }

    if (resizing) {
      let { x, y, width, height } = startRect;
      if (resizeDir.includes("e")) width = Math.max(MIN_W, startRect.width + dx);
      if (resizeDir.includes("s")) height = Math.max(MIN_H, startRect.height + dy);
      if (resizeDir.includes("w")) {
        width = Math.max(MIN_W, startRect.width - dx);
        x = startRect.x + (startRect.width - width);
      }
      if (resizeDir.includes("n")) {
        height = Math.max(MIN_H, startRect.height - dy);
        y = startRect.y + (startRect.height - height);
        if (y < MENUBAR) {
          height -= MENUBAR - y;
          y = MENUBAR;
        }
      }
      width = Math.min(width, maxW - x);
      height = Math.min(height, maxH - y);
      apps.setRect(appId, { x, y, width, height });
    }
  }

  function onPointerUp() {
    dragging = false;
    resizing = false;
    resizeDir = "";
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }
</script>

{#if app.open}
  <!-- Keep mounted while minimized so app content state survives restore -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div
    class="window-in macos-window absolute flex flex-col"
    class:is-focused={app.focused}
    class:hidden={app.minimized}
    style={style}
    on:mousedown={onFocus}
    role="dialog"
    aria-label={title}
    aria-hidden={app.minimized}
    inert={app.minimized || undefined}
  >
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="relative flex h-9 shrink-0 cursor-default items-center px-3 select-none {titlebarClass}"
      on:mousedown={startDrag}
    >
      <div class="traffic-lights z-10 flex items-center gap-2">
        <button
          type="button"
          class="traffic-light red"
          aria-label="Close"
          on:click={onClose}
          on:mousedown|stopPropagation
        ></button>
        <button
          type="button"
          class="traffic-light yellow"
          aria-label="Minimize"
          on:click={onMinimize}
          on:mousedown|stopPropagation
        ></button>
        <button
          type="button"
          class="traffic-light green"
          aria-label="Maximize"
          on:click={onMaximize}
          on:mousedown|stopPropagation
        ></button>
      </div>
      <div
        class="pointer-events-none absolute left-1/2 max-w-[calc(100%-140px)] -translate-x-1/2 truncate text-center text-[13px] font-medium {titleClass}"
        style="font-family: var(--font-system)"
      >
        {title}
      </div>
    </div>

    <div class="min-h-0 flex-1 overflow-hidden">
      <slot />
    </div>

    {#if !app.maximized}
      {#each RESIZE_HANDLES as handle}
        <div
          class={handle.class}
          on:mousedown={(e) => startResize(e, handle.dir)}
          role="presentation"
        ></div>
      {/each}
    {/if}
  </div>
{/if}
