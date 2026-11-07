<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import DiApple from "svelte-icons/di/DiApple.svelte";
  import IoIosWifi from "svelte-icons/io/IoIosWifi.svelte";
  import IoIosBatteryCharging from 'svelte-icons/io/IoIosBatteryCharging.svelte'

  let time = "";
  let interval: ReturnType<typeof setInterval>;

  function tick() {
    // e.g. "Thu 5 November 23.45" — English date, Finnish 24h clock
    const now = new Date();
    const tz = "Europe/Helsinki";
    const date = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      weekday: "short",
      day: "numeric",
      month: "long",
    })
      .format(now)
      .replace(",", "");
    const clock = new Intl.DateTimeFormat("fi-FI", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
    time = `${date} ${clock}`;
  }

  onMount(() => {
    tick();
    interval = setInterval(tick, 30_000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<header
  class="glass-menubar absolute top-0 right-0 left-0 z-40 flex h-7 items-center justify-between px-2.5 text-[13px] leading-none select-none"
  style="font-family: var(--font-system)"
>
  <div class="flex h-full items-center">
    <button
      type="button"
      class="flex h-5.5 items-center rounded-[5px] px-2.5 text-[15px] hover:bg-black/10 active:bg-[#0a84ff] active:text-white"
      aria-label="Apple menu"
    >
      <DiApple />
    </button>
    <button
      type="button"
      class="flex h-5.5 items-center rounded-[5px] px-2.5 font-bold hover:bg-black/10 active:bg-[#0a84ff] active:text-white"
    >
      Georgy Pokazeev
    </button>
    <button
      type="button"
      class="flex h-5.5 items-center rounded-[5px] px-2.5 hover:bg-black/10 active:bg-[#0a84ff] active:text-white"
    >
      File
    </button>
    <button
      type="button"
      class="flex h-5.5 items-center rounded-[5px] px-2.5 hover:bg-black/10 active:bg-[#0a84ff] active:text-white"
    >
      Edit
    </button>
    <button
      type="button"
      class="hidden h-5.5 items-center rounded-[5px] px-2.5 hover:bg-black/10 active:bg-[#0a84ff] active:text-white sm:flex"
    >
      View
    </button>
    <button
      type="button"
      class="hidden h-5.5 items-center rounded-[5px] px-2.5 hover:bg-black/10 active:bg-[#0a84ff] active:text-white md:flex"
    >
      Window
    </button>
    <button
      type="button"
      class="hidden h-5.5 items-center rounded-[5px] px-2.5 hover:bg-black/10 active:bg-[#0a84ff] active:text-white lg:flex"
    >
      Help
    </button>
  </div>

  <div class="flex h-full items-center gap-1.5 text-[12.5px]">
    <!-- Control Center–style glyphs -->
    <span class="flex items-center gap-2 px-1 opacity-90" aria-hidden="true">
      <div class="flex items-center justify-center w-5">
        <IoIosWifi />
      </div>
      <div class="flex items-center justify-center w-6">
        <IoIosBatteryCharging />
      </div>
    </span>
    <span class="rounded-sm px-1.5 py-0.5 tabular-nums hover:bg-black/10"
      >{time}</span
    >
  </div>
</header>
