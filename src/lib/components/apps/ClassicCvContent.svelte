<script lang="ts">
  import FaLinkedin from "svelte-icons/fa/FaLinkedin.svelte";
  import { profile } from "$lib/cv/profile";

  export let showDownload = true;
  /** Tighter type/spacing so the CV fits a single A4 page (PDF export). */
  export let compact = false;

  const { contact, classicSkills, education, experience, references, overview } =
    profile;
  const classicJobs = experience.filter((job) => job.classic);
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600&family=Roboto:wght@400;500&display=swap"
  />
</svelte:head>

<div
  class="mx-auto flex w-full max-w-5xl flex-col items-stretch {compact
    ? 'p-0'
    : 'px-3 py-4 sm:px-6'}"
>
  {#if showDownload}
    <div class="mb-4 flex justify-center">
      <a href="/georgy_pokazeev_cv.pdf" download="Georgy_Pokazeev_CV.pdf">
        <button
          type="button"
          class="rounded-md bg-[#4caf50] px-5 py-2.5 text-base text-white transition hover:bg-[#45a049]"
        >
          Download as PDF
        </button>
      </a>
    </div>
  {/if}

  <article
    class="w-full rounded-sm bg-white text-[#333] shadow-md {compact
      ? 'p-0 shadow-none'
      : 'p-5 sm:p-8 md:p-10'}"
    style="font-family: Roboto, sans-serif"
  >
    <header
      class="flex items-center border-b-2 border-[#444] {compact
        ? 'mb-3.5 flex-row gap-5 pb-2.5'
        : 'mb-5 flex-col-reverse gap-6 pb-4 sm:flex-row sm:items-center'}"
    >
      <div
        class="w-full text-left"
        style="font-family: Montserrat, sans-serif; flex: 3"
      >
        <h1
          class="m-0 text-[#333] {compact
            ? 'text-[48px] leading-none'
            : 'text-4xl sm:text-5xl md:text-6xl'}"
          style="font-family: 'Bebas Neue', sans-serif"
        >
          {profile.name}
        </h1>
        <h2
          class="font-semibold tracking-wide {compact
            ? 'mt-1 text-[16px]'
            : 'mt-1 text-lg'}"
        >
          {profile.headline}
        </h2>
        <p class={compact ? "my-0.5 text-[14px] leading-snug" : "my-1 text-base leading-7 sm:text-lg"}>
          <i class="fas fa-phone-alt"></i>
          {contact.phone}
        </p>
        <p class={compact ? "my-0.5 text-[14px] leading-snug" : "my-1 text-base leading-7 sm:text-lg"}>
          <i class="fas fa-envelope"></i>
          {contact.email}
        </p>
        <p class={compact ? "my-0.5 text-[14px] leading-snug" : "my-1 text-base leading-7 sm:text-lg"}>
          <i class="fas fa-map-marker-alt"></i>
          {contact.address}
        </p>
        <div class="mt-1 flex flex-row items-center gap-1">
          <div class={compact ? "h-4.5 w-4.5" : "h-5 w-5"}><FaLinkedin /></div>
          <p class="m-0 {compact ? 'text-[14px]' : ''}">
            <a
              class="text-[#333] underline"
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile
            </a>
          </p>
        </div>
      </div>
      <div class="flex shrink-0 justify-center">
        <picture>
          <source srcset="/headshot_georgy.webp" type="image/webp" />
          <img
            src="/headshot_georgy.jpg"
            alt={profile.name}
            width="240"
            height="240"
            decoding="async"
            fetchpriority="high"
            class="object-cover {compact
              ? 'h-50 w-50'
              : 'h-40 w-40 sm:h-52 sm:w-52 md:h-60 md:w-60'}"
          />
        </picture>
      </div>
    </header>

    <section class="border-b-2 border-[#444] {compact ? 'mb-3.5 pb-2.5' : 'mb-5 pb-3'}">
      <h2 class="font-semibold {compact ? 'mb-1.5 text-[17px]' : 'mb-2 text-xl'}">
        CAREER OVERVIEW
      </h2>
      <p class={compact ? "text-[13.5px] leading-[1.4]" : "text-base leading-7 sm:text-lg"}>
        {overview}
      </p>
    </section>

    <div
      class="border-b-2 border-[#444] {compact
        ? 'flex flex-row gap-7 pb-2'
        : 'flex flex-col gap-8 pb-4 md:flex-row md:gap-10'}"
    >
      <div class="flex-1 text-left">
        <div class={compact ? "mb-3.5" : "mb-8"}>
          <h2 class="font-semibold {compact ? 'mb-2 text-[17px]' : 'mb-3 text-xl'}">
            EDUCATION
          </h2>
          {#each education as edu}
            <div class={compact ? "mb-2.5" : "mb-5"}>
              <p class={compact ? "my-0.5 text-[14px] leading-snug" : "my-2 text-base leading-7 sm:text-lg"}>
                {edu.degree}
              </p>
              <p class={compact ? "my-0.5 text-[14px] leading-snug" : "my-2 text-base leading-7 sm:text-lg"}>
                {edu.school} | {edu.years}
              </p>
            </div>
          {/each}
        </div>

        <div class={compact ? "mb-3.5" : "mb-8"}>
          <h2 class="font-semibold {compact ? 'mb-2 text-[17px]' : 'mb-3 text-xl'}">
            SKILLS
          </h2>
          <ul class="list-none p-0">
            {#each classicSkills as skill}
              <li
                class="text-[#333] {compact
                  ? 'my-1 text-[14px] leading-snug'
                  : 'my-2 text-base sm:text-lg'}"
              >
                <i class="fas fa-check mr-2 text-[#4caf50]"></i>
                {skill}
              </li>
            {/each}
          </ul>
        </div>

        <div class={compact ? "mb-0" : "mb-4"}>
          <h2 class="font-semibold {compact ? 'mb-2 text-[17px]' : 'mb-3 text-xl'}">
            REFERENCE
          </h2>
          {#each references as ref}
            <div class={compact ? "mb-2.5" : "mb-5"}>
              <p class={compact ? "my-0 text-[14px] leading-snug font-medium" : "my-2 text-base leading-7 sm:text-lg"}>
                {ref.name}
              </p>
              <p class={compact ? "my-0 text-[13.5px] leading-snug" : "my-2 text-base leading-7 sm:text-lg"}>
                {ref.title}
              </p>
              <p class={compact ? "my-0 text-[13.5px] leading-snug" : "my-2 text-base leading-7 sm:text-lg"}>
                {ref.email}
              </p>
              <p class={compact ? "my-0 text-[13.5px] leading-snug" : "my-2 text-base leading-7 sm:text-lg"}>
                {ref.phone}
              </p>
            </div>
          {/each}
        </div>
      </div>

      <div class="flex-1 text-left">
        <h2 class="font-semibold {compact ? 'mb-1.5 text-[17px]' : 'mb-2 text-xl'}">
          EXPERIENCE
        </h2>

        {#each classicJobs as job}
          <h3
            class="font-semibold underline decoration-2 {compact
              ? 'mt-3 text-[15px]'
              : 'mt-6 text-lg sm:text-xl'}"
          >
            {job.role}
          </h3>
          <p class={compact ? "my-0.5 text-[13.5px] leading-snug" : "my-1 text-base leading-7 sm:text-lg"}>
            {job.company} | {job.periodShort}
          </p>
          <p class={compact ? "text-[13px] leading-[1.4]" : "text-base leading-7 sm:text-lg"}>
            {job.summary}
          </p>
        {/each}
      </div>
    </div>
  </article>
</div>
