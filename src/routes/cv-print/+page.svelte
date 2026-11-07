<script lang="ts">
  import ClassicCvContent from "$lib/components/apps/ClassicCvContent.svelte";
  import { profile } from "$lib/cv/profile";
</script>

<svelte:head>
  <title>{profile.name} — CV</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<!-- Bare Classic CV for build-time PDF generation (and local checks). -->
<div class="cv-print-shell">
  <ClassicCvContent showDownload={false} compact />
</div>

<style>
  /*
   * App shell uses height:100% + overflow:hidden (desktop OS UI).
   * That clips Playwright’s PDF to one viewport — undo it here.
   */
  :global(html),
  :global(body) {
    margin: 0 !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
    background: #fff !important;
  }

  :global(#svelte-body) {
    height: auto !important;
  }

  .cv-print-shell {
    background: #fff;
  }

  @media print {
    @page {
      size: A4;
      margin: 10mm;
    }
  }
</style>
