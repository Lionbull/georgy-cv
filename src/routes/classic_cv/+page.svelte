<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { AppId } from "$lib/stores/apps";

  onMount(() => {
    if (browser) {
      sessionStorage.setItem("openApp", AppId.ClassicCV);
      goto(`/?app=${AppId.ClassicCV}`, { replaceState: true });
    }
  });
</script>

<div class="flex min-h-screen items-center justify-center bg-[#0b1220] text-white">
  Opening Classic CV…
</div>
