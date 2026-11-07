<script lang="ts">
  import FaLinkedin from "svelte-icons/fa/FaLinkedin.svelte";
  import { profile } from "$lib/cv/profile";

  export let showDownload = true;

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

<div class="mx-auto flex w-full max-w-5xl flex-col items-stretch px-3 py-4 sm:px-6">
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
    class="w-full rounded-sm bg-white p-5 text-[#333] shadow-md sm:p-8 md:p-10"
    style="font-family: Roboto, sans-serif"
  >
    <header
      class="mb-5 flex flex-col-reverse items-center gap-6 border-b-2 border-[#444] pb-4 sm:flex-row sm:items-center"
    >
      <div class="flex-3 w-full text-left" style="font-family: Montserrat, sans-serif; flex: 3">
        <h1
          class="m-0 text-4xl text-[#333] sm:text-5xl md:text-6xl"
          style="font-family: 'Bebas Neue', sans-serif"
        >
          {profile.name}
        </h1>
        <h2 class="mt-1 text-lg font-semibold tracking-wide">{profile.headline}</h2>
        <p class="my-1 text-base leading-7 sm:text-lg">
          <i class="fas fa-phone-alt"></i>
          {contact.phone}
        </p>
        <p class="my-1 text-base leading-7 sm:text-lg">
          <i class="fas fa-envelope"></i>
          {contact.email}
        </p>
        <p class="my-1 text-base leading-7 sm:text-lg">
          <i class="fas fa-map-marker-alt"></i>
          {contact.address}
        </p>
        <div class="mt-1 flex flex-row items-center gap-1">
          <div class="h-5 w-5"><FaLinkedin /></div>
          <p class="m-0">
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
            class="h-40 w-40 object-cover sm:h-52 sm:w-52 md:h-60 md:w-60"
          />
        </picture>
      </div>
    </header>

    <section class="mb-5 border-b-2 border-[#444] pb-3">
      <h2 class="mb-2 text-xl font-semibold">CAREER OVERVIEW</h2>
      <p class="text-base leading-7 sm:text-lg">
        {overview}
      </p>
    </section>

    <div
      class="flex flex-col gap-8 border-b-2 border-[#444] pb-4 md:flex-row md:gap-10"
    >
      <div class="flex-1 text-left">
        <div class="mb-8">
          <h2 class="mb-3 text-xl font-semibold">EDUCATION</h2>
          {#each education as edu}
            <div class="mb-5">
              <p class="my-2 text-base leading-7 sm:text-lg">{edu.degree}</p>
              <p class="my-2 text-base leading-7 sm:text-lg">
                {edu.school} | {edu.years}
              </p>
            </div>
          {/each}
        </div>

        <div class="mb-8">
          <h2 class="mb-3 text-xl font-semibold">SKILLS</h2>
          <ul class="list-none p-0">
            {#each classicSkills as skill}
              <li class="my-2 text-base text-[#333] sm:text-lg">
                <i class="fas fa-check mr-2 text-[#4caf50]"></i>
                {skill}
              </li>
            {/each}
          </ul>
        </div>

        <div class="mb-4">
          <h2 class="mb-3 text-xl font-semibold">REFERENCE</h2>
          {#each references as ref}
            <div class="mb-5">
              <p class="my-2 text-base leading-7 sm:text-lg">{ref.name}</p>
              <p class="my-2 text-base leading-7 sm:text-lg">{ref.title}</p>
              <p class="my-2 text-base leading-7 sm:text-lg">{ref.email}</p>
              <p class="my-2 text-base leading-7 sm:text-lg">{ref.phone}</p>
            </div>
          {/each}
        </div>
      </div>

      <div class="flex-1 text-left">
        <h2 class="mb-2 text-xl font-semibold">EXPERIENCE</h2>

        {#each classicJobs as job}
          <h3 class="mt-6 text-lg font-semibold underline decoration-2 sm:text-xl">
            {job.role}
          </h3>
          <p class="my-1 text-base leading-7 sm:text-lg">
            {job.company} | {job.periodShort}
          </p>
          <p class="text-base leading-7 sm:text-lg">
            {job.summary}
          </p>
        {/each}
      </div>
    </div>
  </article>
</div>
