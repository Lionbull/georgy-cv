<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let desktop = true;

  const dispatch = createEventDispatcher<{ done: void }>();
  const SESSION_KEY = "cv-hello-seen";

  let risen = false;
  let exiting = false;
  let gone = false;
  let timers: ReturnType<typeof setTimeout>[] = [];
  let reducedMotion = false;

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function markSeen() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function finish() {
    if (gone || exiting) return;
    clearTimers();
    exiting = true;
    markSeen();
    timers.push(
      setTimeout(() => {
        gone = true;
        dispatch("done");
      }, reducedMotion ? 120 : 900)
    );
  }

  onMount(() => {
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        gone = true;
        dispatch("done");
        return;
      }
    } catch {
      /* play animation */
    }

    if (reducedMotion) {
      risen = true;
      return clearTimers;
    }

    timers.push(setTimeout(() => (risen = true), 1750));
    return clearTimers;
  });
</script>

{#if !gone}
  <div class="welcome-overlay" class:is-risen={risen} class:is-exit={exiting}>
    <div class="welcome-veil" class:lifted={risen || exiting} aria-hidden="true"></div>

    <div class="welcome-stage" aria-live="polite">
      <div class="hello-mark">
        <!--
          Hershey Script 1-stroke glyphs (public domain).
          Originally created by Dr. A. V. Hershey at the U.S. National Bureau of Standards.
          Distribution format originally by James Hurt, Cognition, Inc.
        -->
        <svg
          class="hello-svg"
          viewBox="0 0 1780 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g
            transform="translate(24 680) scale(1 -1)"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <!-- h -->
            <path
              class="hello-stroke"
              style="--i: 0"
              d="M31.5 158 L94.5 252 L189 410 L220 472 L252 567 L252 630 L220 662 L158 630 L126 567 L94.5 441 L63 252 L31.5 0 M31.5 0 L63 94.5 L94.5 158 L158 252 L220 284 L284 284 L315 252 L315 189 L284 94.5 L284 31.5 L315 0 L346 0 L410 31.5 L441 63 L504 158"
              pathLength="1"
            />
            <!-- e -->
            <path
              class="hello-stroke"
              style="--i: 1"
              transform="translate(460 0)"
              d="M63 63 L126 94.5 L158 126 L189 189 L189 252 L158 284 L126 284 L63 252 L31.5 189 L31.5 94.5 L63 31.5 L126 0 L189 0 L252 31.5 L284 63 L346 158"
              pathLength="1"
            />
            <!-- l -->
            <path
              class="hello-stroke"
              style="--i: 2"
              transform="translate(760 0)"
              d="M31.5 158 L94.5 252 L189 410 L220 472 L252 567 L252 630 L220 662 L158 630 L126 567 L94.5 441 L63 220 L63 31.5 L94.5 0 L126 0 L189 31.5 L220 63 L284 158"
              pathLength="1"
            />
            <!-- l -->
            <path
              class="hello-stroke"
              style="--i: 3"
              transform="translate(1000 0)"
              d="M31.5 158 L94.5 252 L189 410 L220 472 L252 567 L252 630 L220 662 L158 630 L126 567 L94.5 441 L63 220 L63 31.5 L94.5 0 L126 0 L189 31.5 L220 63 L284 158"
              pathLength="1"
            />
            <!-- o -->
            <path
              class="hello-stroke"
              style="--i: 4"
              transform="translate(1240 0)"
              d="M220 284 L158 284 L94.5 252 L63 220 L31.5 158 L31.5 94.5 L63 31.5 L126 0 L189 0 L252 31.5 L284 63 L315 126 L315 189 L284 252 L220 284 L189 252 L189 189 L220 126 L284 94.5 L378 94.5 L441 126 L472 158"
              pathLength="1"
            />
          </g>
        </svg>
        <span class="sr-only">Hello</span>
      </div>

      <div class="welcome-panel" class:visible={risen && !exiting} class:leaving={exiting}>
        <p class="welcome-title">Welcome to Georgy Pokazeev’s CV</p>
        <p class="welcome-sub">
          {#if desktop}
            An interactive desktop — open apps from the Dock below.
          {:else}
            An interactive home screen — tap an app to explore.
          {/if}
        </p>
        <button type="button" class="glass-panel glass-continue" on:click={finish}>Continue</button>
      </div>
    </div>
  </div>
{/if}
<style>
  .welcome-overlay {
    position: absolute;
    inset: 0;
    z-index: 100;
    overflow: hidden;
    user-select: none;
  }

  .welcome-veil {
    position: absolute;
    inset: 0;
    background: #000;
    opacity: 1;
    transition: opacity 1.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .welcome-veil.lifted {
    opacity: 0.3;
  }

  .welcome-stage {
    position: absolute;
    inset: 0;
    z-index: 2;
    padding: 1.5rem 1.25rem;
    pointer-events: none;
  }

  .hello-mark {
    position: absolute;
    left: 50%;
    top: 50%;
    width: min(72vw, 22rem);
    color: #fff;
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(1);
    filter: drop-shadow(0 6px 22px rgba(0, 0, 0, 0.28));
    transition:
      transform 1.55s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform, opacity;
    z-index: 2;
  }

  .welcome-overlay.is-risen .hello-mark {
    transform: translate3d(-50%, calc(-50% - clamp(6.25rem, 15vh, 9.5rem)), 0) scale(0.56);
  }

  .welcome-overlay.is-exit .hello-mark {
    opacity: 0;
    transform: translate3d(-50%, calc(-50% - clamp(6.25rem, 15vh, 9.5rem) - 12px), 0) scale(0.54);
  }

  .hello-svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .hello-stroke {
    fill: none;
    stroke: currentColor;
    stroke-width: 32;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: hello-draw 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: calc(var(--i, 0) * 0.16s);
  }

  .welcome-overlay.is-risen .hello-stroke,
  .welcome-overlay.is-exit .hello-stroke {
    stroke-dashoffset: 0;
    animation: none;
  }

  @keyframes hello-draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .welcome-panel {
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: min(92vw, 28rem);
    padding: 0 0.25rem;
    text-align: center;
    color: #fff;
    opacity: 0;
    transform: translate3d(-50%, -2rem, 0);
    transition:
      opacity 1.35s cubic-bezier(0.22, 1, 0.36, 1) 0.35s,
      transform 1.45s cubic-bezier(0.22, 1, 0.36, 1) 0.28s;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.35);
    pointer-events: none;
    will-change: opacity, transform;
    z-index: 1;
  }

  .welcome-panel.visible {
    opacity: 1;
    transform: translate3d(-50%, -2.75rem, 0);
    pointer-events: auto;
  }

  .welcome-panel.leaving {
    opacity: 0;
    transform: translate3d(-50%, -3.25rem, 0);
    transition-delay: 0s;
  }

  .welcome-title {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI",
      system-ui, sans-serif;
    font-size: clamp(1.65rem, 4.8vw, 2.4rem);
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.15;
  }

  .welcome-sub {
    margin: 0.7rem 0 0;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI",
      system-ui, sans-serif;
    font-size: clamp(0.95rem, 2.4vw, 1.1rem);
    font-weight: 400;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.92);
  }

  .glass-continue {
    margin-top: 2.75rem;
    border-radius: 999px;
    padding: 0.5rem 1.85rem;
    color: rgba(255, 255, 255, 0.92);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI",
      system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    pointer-events: auto;
    transition:
      transform 0.2s ease,
      background 0.2s ease;
  }

  .glass-continue:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .glass-continue:active {
    transform: scale(0.97);
  }

  .welcome-overlay.is-exit {
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .welcome-veil,
    .hello-mark,
    .welcome-panel {
      transition-duration: 0.01ms !important;
      transition-delay: 0s !important;
    }

    .hello-stroke {
      animation: none;
      stroke-dashoffset: 0;
    }
  }
</style>

