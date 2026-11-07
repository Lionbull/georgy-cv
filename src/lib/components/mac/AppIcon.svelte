<script lang="ts" context="module">
  export const IconSize = {
    Sm: "sm",
    Md: "md",
    Lg: "lg",
  } as const;

  export type IconSize = (typeof IconSize)[keyof typeof IconSize];
</script>

<script lang="ts">
  import { AppId, type AppId as AppIdType } from "$lib/stores/apps";

  export let id: AppIdType;
  export let size: IconSize = IconSize.Md;

  // Unique gradient ids when the same icon is mounted twice (home + dock)
  const uid = Math.random().toString(36).slice(2, 9);

  const sizes: Record<IconSize, string> = {
    [IconSize.Sm]: "h-12 w-12",
    [IconSize.Md]: "h-[52px] w-[52px]",
    [IconSize.Lg]: "h-[68px] w-[68px]",
  };
</script>

<span class="app-icon inline-flex {sizes[size]} shrink-0" aria-hidden="true">
  {#if id === AppId.Terminal}
    <!-- Terminal–inspired icon -->
    <svg viewBox="0 0 100 100" class="h-full w-full">
      <defs>
        <linearGradient id="termBg-{uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3a3a3c" />
          <stop offset="100%" stop-color="#1c1c1e" />
        </linearGradient>
        <linearGradient id="termScreen-{uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a1a1c" />
          <stop offset="100%" stop-color="#0a0a0b" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#termBg-{uid})" />
      <rect
        x="12"
        y="16"
        width="76"
        height="68"
        rx="8"
        fill="url(#termScreen-{uid})"
        stroke="#2c2c2e"
        stroke-width="1"
      />
      <path
        d="M28 38 L42 50 L28 62"
        fill="none"
        stroke="#32d74b"
        stroke-width="5.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="48"
        y1="62"
        x2="72"
        y2="62"
        stroke="#32d74b"
        stroke-width="5.5"
        stroke-linecap="round"
      />
    </svg>
  {:else if id === AppId.ClassicCV}
    <!-- Classic CV document icon -->
    <svg viewBox="0 0 100 100" class="h-full w-full">
      <defs>
        <linearGradient id="prevBg-{uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#5ac8fa" />
          <stop offset="45%" stop-color="#007aff" />
          <stop offset="100%" stop-color="#5856d6" />
        </linearGradient>
        <linearGradient id="prevPic-{uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7ec8ff" />
          <stop offset="55%" stop-color="#4cd964" />
          <stop offset="100%" stop-color="#34c759" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#prevBg-{uid})" />
      <rect x="18" y="14" width="64" height="72" rx="6" fill="white" />
      <rect
        x="24"
        y="22"
        width="52"
        height="40"
        rx="3"
        fill="url(#prevPic-{uid})"
      />
      <circle cx="36" cy="34" r="5" fill="#ffe08a" />
      <path
        d="M24 54 L38 42 L48 50 L58 40 L76 54 Z"
        fill="#1d7a3a"
        opacity="0.85"
      />
      <rect x="28" y="70" width="32" height="3.5" rx="1.5" fill="#c7c7cc" />
      <rect x="28" y="77" width="22" height="3.5" rx="1.5" fill="#d1d1d6" />
    </svg>
  {:else if id === AppId.LinkedIn}
    <!-- Official LinkedIn "in" bug (® cropped; letters filled white) -->
    <img
      src="/linkedin-in-bug.png"
      alt=""
      class="h-full w-full object-cover"
      draggable="false"
    />
  {:else if id === AppId.GitHub}
    <!-- Official Invertocat (white) on GitHub black -->
    <span class="flex h-full w-full items-center justify-center bg-[#181717]">
      <img
        src="/GitHub_Invertocat_White_Clearspace.svg"
        alt=""
        class="h-full w-full"
        draggable="false"
      />
    </span>
  {/if}
</span>
