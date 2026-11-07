<script lang="ts">
  import FaLinkedin from "svelte-icons/fa/FaLinkedin.svelte";

  export let showDownload = true;

  const contactInfo = {
    phone: "+358456043575",
    email: "georgy@pokazeev.com",
    address: "Helsinki, Finland",
  };

  const skills: Array<string> = [
    "Python",
    "Svelte",
    "Angular",
    "Node.JS",
    "PrimeNg",
    "JavaScript/Typescript",
    "CSS/SCSS/TailwindCSS",
    "Databricks",
    "SQL",
    "Django",
  ];
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
          Georgy Pokazeev
        </h1>
        <h2 class="mt-1 text-lg font-semibold tracking-wide">SOFTWARE ENGINEER</h2>
        <p class="my-1 text-base leading-7 sm:text-lg">
          <i class="fas fa-phone-alt"></i>
          {contactInfo.phone}
        </p>
        <p class="my-1 text-base leading-7 sm:text-lg">
          <i class="fas fa-envelope"></i>
          {contactInfo.email}
        </p>
        <p class="my-1 text-base leading-7 sm:text-lg">
          <i class="fas fa-map-marker-alt"></i>
          {contactInfo.address}
        </p>
        <div class="mt-1 flex flex-row items-center gap-1">
          <div class="h-5 w-5"><FaLinkedin /></div>
          <p class="m-0">
            <a
              class="text-[#333] underline"
              href="https://www.linkedin.com/in/georgy-pokazeev-6a1381199/"
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
            alt="Georgy Pokazeev"
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
        Currently, I'm working as a Full Stack Developer at Rantalainen Oy and running own
        project named Wave. I have over four years of experience as a Full Stack Developer
        doing data processing and visualization (social media data, tourism data), web
        development and design, automation, database optimization, cyber security, and
        algorithms. Known for being a team player, I am always ready to help my colleagues. I
        am looking for new opportunities to grow as a professional and to contribute to the
        success of the company. I am confident that my reliability, responsibility, and
        eagerness to learn and tackle new challenges make me the right person to hire. I am a
        very communicative person and I easily find a common language with everyone. I am
        fluent in Finnish and English.
      </p>
    </section>

    <div
      class="flex flex-col gap-8 border-b-2 border-[#444] pb-4 md:flex-row md:gap-10"
    >
      <div class="flex-1 text-left">
        <div class="mb-8">
          <h2 class="mb-3 text-xl font-semibold">EDUCATION</h2>
          <div class="mb-5">
            <p class="my-2 text-base leading-7 sm:text-lg">M.Sc. (Software Engineering)</p>
            <p class="my-2 text-base leading-7 sm:text-lg">
              LUT University of Technology | 2023 - 2025
            </p>
          </div>
          <div class="mb-5">
            <p class="my-2 text-base leading-7 sm:text-lg">B.Sc. (Software Engineering)</p>
            <p class="my-2 text-base leading-7 sm:text-lg">
              LUT University of Technology | 2020 - 2023
            </p>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="mb-3 text-xl font-semibold">SKILLS</h2>
          <ul class="list-none p-0">
            {#each skills as skill}
              <li class="my-2 text-base text-[#333] sm:text-lg">
                <i class="fas fa-check mr-2 text-[#4caf50]"></i>
                {skill}
              </li>
            {/each}
          </ul>
        </div>

        <div class="mb-4">
          <h2 class="mb-3 text-xl font-semibold">REFERENCE</h2>
          <div class="mb-5">
            <p class="my-2 text-base leading-7 sm:text-lg">Marja Nurkka</p>
            <p class="my-2 text-base leading-7 sm:text-lg">Product Owner | Visitory Oy</p>
            <p class="my-2 text-base leading-7 sm:text-lg">marjanurkka@gmail.com</p>
            <p class="my-2 text-base leading-7 sm:text-lg">0405598053</p>
          </div>
          <div class="mb-5">
            <p class="my-2 text-base leading-7 sm:text-lg">Antti Honkanen</p>
            <p class="my-2 text-base leading-7 sm:text-lg">CEO | Visitory Oy</p>
            <p class="my-2 text-base leading-7 sm:text-lg">antti.honkanen@visitory.io</p>
            <p class="my-2 text-base leading-7 sm:text-lg">0505416890</p>
          </div>
        </div>
      </div>

      <div class="flex-1 text-left">
        <h2 class="mb-2 text-xl font-semibold">EXPERIENCE</h2>

        <h3 class="mt-6 text-lg font-semibold underline decoration-2 sm:text-xl">
          Full Stack Developer
        </h3>
        <p class="my-1 text-base leading-7 sm:text-lg">Rantalainen Oy | 2025 - Present</p>
        <p class="text-base leading-7 sm:text-lg">
          As a Full Stack Developer at Rantalainen Oy, I am responsible for developing and
          maintaining web applications, working with databases, and collaborating with
          cross-functional teams to deliver high-quality software solutions.
        </p>

        <h3 class="mt-6 text-lg font-semibold underline decoration-2 sm:text-xl">
          Full Stack Developer
        </h3>
        <p class="my-1 text-base leading-7 sm:text-lg">Visitory Oy | 2022 - 2025</p>
        <p class="text-base leading-7 sm:text-lg">
          Main product provides a high range of statistics and statistical reports on tourism
          and social media. With no set hierarchy or strict role divisions in our development
          team, I gained hands-on experience in nearly every aspect of software development. I
          worked with Python (Django), PostgreSQL, Svelte, JavaScript, TypeScript, SQL
          pipelines as a part of data processing, CSS, Databricks, AWS, and Heroku.
        </p>

        <h3 class="mt-6 text-lg font-semibold underline decoration-2 sm:text-xl">
          Full Stack Developer
        </h3>
        <p class="my-1 text-base leading-7 sm:text-lg">ByteTyde Oy | 2024 - 2026</p>
        <p class="text-base leading-7 sm:text-lg">
          As a small side-hustle alongside my main work and Master's studies, me and my friends
          started developing an app called Wave for hairstyle recommendations using machine
          learning. We took the project from an idea to something that's now in regular use at
          a hair salon at the Jumbo shopping center.
        </p>
      </div>
    </div>
  </article>
</div>
