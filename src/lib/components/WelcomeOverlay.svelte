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
            <!-- Hershey vertices smoothed with Catmull–Rom → cubic Béziers -->
            <!-- h -->
            <path
              class="hello-stroke"
              style="--i: 0"
              d="M31.5 158 C44.1 176.8 63 201.6 94.5 252 C126 302.4 163.9 366 189 410 C214.1 454 207.4 440.6 220 472 C232.6 503.4 245.6 535.4 252 567 C258.4 598.6 258.4 611 252 630 C245.6 649 238.8 662 220 662 C201.2 662 176.8 649 158 630 C139.2 611 138.7 604.8 126 567 C113.3 529.2 107.1 504 94.5 441 C81.9 378 75.6 340.2 63 252 C50.4 163.8 37.8 50.4 31.5 0 M31.5 0 C37.8 18.9 50.4 62.9 63 94.5 C75.6 126.1 75.5 126.5 94.5 158 C113.5 189.5 132.9 226.8 158 252 C183.1 277.2 194.8 277.6 220 284 C245.2 290.4 265 290.4 284 284 C303 277.6 308.8 271 315 252 C321.2 233 321.2 220.5 315 189 C308.8 157.5 290.2 126 284 94.5 C277.8 63 277.8 50.4 284 31.5 C290.2 12.6 302.6 6.3 315 0 C327.4 -6.3 327 -6.3 346 0 C365 6.3 391 18.9 410 31.5 C429 44.1 422.2 37.7 441 63 C459.8 88.3 491.4 139 504 158"
              pathLength="1"
            />
            <!-- e -->
            <path
              class="hello-stroke"
              style="--i: 1"
              transform="translate(460 0)"
              d="M63 63 C75.6 69.3 107 81.9 126 94.5 C145 107.1 145.4 107.1 158 126 C170.6 144.9 182.8 163.8 189 189 C195.2 214.2 195.2 233 189 252 C182.8 271 170.6 277.6 158 284 C145.4 290.4 145 290.4 126 284 C107 277.6 81.9 271 63 252 C44.1 233 37.8 220.5 31.5 189 C25.2 157.5 25.2 126 31.5 94.5 C37.8 63 44.1 50.4 63 31.5 C81.9 12.6 100.8 6.3 126 0 C151.2 -6.3 163.8 -6.3 189 0 C214.2 6.3 233 18.9 252 31.5 C271 44.1 265.2 37.7 284 63 C302.8 88.3 333.6 139 346 158"
              pathLength="1"
            />
            <!-- l -->
            <path
              class="hello-stroke"
              style="--i: 2"
              transform="translate(760 0)"
              d="M31.5 158 C44.1 176.8 63 201.6 94.5 252 C126 302.4 163.9 366 189 410 C214.1 454 207.4 440.6 220 472 C232.6 503.4 245.6 535.4 252 567 C258.4 598.6 258.4 611 252 630 C245.6 649 238.8 662 220 662 C201.2 662 176.8 649 158 630 C139.2 611 138.7 604.8 126 567 C113.3 529.2 107.1 510.4 94.5 441 C81.9 371.6 69.3 301.9 63 220 C56.7 138.1 56.7 75.5 63 31.5 C69.3 -12.5 81.9 6.3 94.5 0 C107.1 -6.3 107.1 -6.3 126 0 C144.9 6.3 170.2 18.9 189 31.5 C207.8 44.1 201 37.7 220 63 C239 88.3 271.2 139 284 158"
              pathLength="1"
            />
            <!-- l -->
            <path
              class="hello-stroke"
              style="--i: 3"
              transform="translate(1000 0)"
              d="M31.5 158 C44.1 176.8 63 201.6 94.5 252 C126 302.4 163.9 366 189 410 C214.1 454 207.4 440.6 220 472 C232.6 503.4 245.6 535.4 252 567 C258.4 598.6 258.4 611 252 630 C245.6 649 238.8 662 220 662 C201.2 662 176.8 649 158 630 C139.2 611 138.7 604.8 126 567 C113.3 529.2 107.1 510.4 94.5 441 C81.9 371.6 69.3 301.9 63 220 C56.7 138.1 56.7 75.5 63 31.5 C69.3 -12.5 81.9 6.3 94.5 0 C107.1 -6.3 107.1 -6.3 126 0 C144.9 6.3 170.2 18.9 189 31.5 C207.8 44.1 201 37.7 220 63 C239 88.3 271.2 139 284 158"
              pathLength="1"
            />
            <!-- o -->
            <path
              class="hello-stroke"
              style="--i: 4"
              transform="translate(1240 0)"
              d="M220 284 C207.6 284 183.1 290.4 158 284 C132.9 277.6 113.5 264.8 94.5 252 C75.5 239.2 75.6 238.8 63 220 C50.4 201.2 37.8 183.1 31.5 158 C25.2 132.9 25.2 119.8 31.5 94.5 C37.8 69.2 44.1 50.4 63 31.5 C81.9 12.6 100.8 6.3 126 0 C151.2 -6.3 163.8 -6.3 189 0 C214.2 6.3 233 18.9 252 31.5 C271 44.1 271.4 44.1 284 63 C296.6 81.9 308.8 100.8 315 126 C321.2 151.2 321.2 163.8 315 189 C308.8 214.2 303 233 284 252 C265 271 239 284 220 284 C201 284 195.2 271 189 252 C182.8 233 182.8 214.2 189 189 C195.2 163.8 201 144.9 220 126 C239 107.1 252.4 100.8 284 94.5 C315.6 88.2 346.6 88.2 378 94.5 C409.4 100.8 422.2 113.3 441 126 C459.8 138.7 465.8 151.6 472 158"
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

