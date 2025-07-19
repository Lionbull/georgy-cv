<script lang="ts">
  import { onMount } from "svelte";
  import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte'

  let contactInfo = {
    phone: "+358456043575",
    email: "geo1529@yahoo.com",
    address: "Helsinki, Finland",
  };

  let skills: Array<string> = ["Python", "Django", "Angular", "Svelte", "TypeScript", "PostgreSQL", "CSS", "Tailwind", "Databricks", "PrimeNg"];

  onMount(() => {});
</script>

<div class="global-wrapper">

    <div class="top-buttons">
      <a href="georgy_pokazeev_cv.pdf" download="Georgy_Pokazeev_CV.pdf">
        <button>Download as PDF</button>
      </a>
    </div>

    <div class="cv-container">
    <header class="header">
        <div class="header-info-section">
        <h1 id="name-title">Georgy Pokazeev</h1>
        <h2>SOFTWARE ENGINEER</h2>
        <p><i class="fas fa-phone-alt"></i> {contactInfo.phone}</p>
        <p><i class="fas fa-envelope"></i> {contactInfo.email}</p>
        <p><i class="fas fa-map-marker-alt"></i> {contactInfo.address}</p>
        <div class="contact-custom-icon"><div class="custom-icon"><FaLinkedin/></div><p><a href="https://www.linkedin.com/in/georgy-pokazeev-6a1381199/">LinkedIn Profile</a></p></div>
        </div>
        <div class="photo-container">
        <img
            src="headshot_georgy.jpg"
            alt="Georgy Pokazeev"
            class="profile-photo"
        />
        </div>
    </header>

    <section class="career-overview">
        <h2>CAREER OVERVIEW</h2>
        <p>
          Currently, I'm working as a Full Stack Developer at Rantalainen Oy and running own project named Wave.
          I have over four years of experience as a Full Stack Developer doing data processing and visualization (social media data, tourism data), web development and design, automation, database optimization, cyber security, and algorithms. Known for being a team player, I am always ready to help my colleagues. I am looking for new opportunities to grow as a professional and to contribute to the success of the company.
          I am confident that my reliability, responsibility, and eagerness to learn and tackle new challenges make me the right person to hire. I am a very communicative person and I easily find a common language with everyone. I am fluent in Finnish and English.
        </p>
    </section>

    <body>
        <div class="left-content">
            <div class="subsection">
                <h2>EDUCATION</h2>
                <div class="tight-text">
                    <p>
                        M.Sc. (Software Engineering)
                    </p>
                    <p>
                        LUT University of Technology | 2023 - 2025
                    </p>
                </div>
                <div class="tight-text">
                    <p>
                        B.Sc. (Software Engineering)
                    </p>
                    <p>
                        LUT University of Technology | 2020 - 2023
                    </p>
                </div>
            </div>
            <div class="subsection">
                <h2>SKILLS</h2>
                <ul>
                    {#each skills as skill}
                    <li><i class="fas fa-check"></i> {skill}</li>
                    {/each}
                </ul>
            </div>
            <div class="subsection">
                <h2>REFERENCE</h2>

                <div class="tight-text">
                    <p>Marja Nurkka</p>
                    <p>Product Owner | Visitory Oy</p>
                    <p>marjanurkka@gmail.com</p>
                    <p>0405598053</p>
                </div>

                <div class="tight-text">
                    <p>Antti Honkanen</p>
                    <p>CEO | Visitory Oy</p>
                    <p>antti.honkanen@visitory.io</p>
                    <p>0505416890</p>
                </div>

            </div>
        </div>
        <div class="right-content">
            <h2>EXPERIENCE</h2>

            <h3>Full Stack Developer</h3>
            <p>Rantalainen Oy | 2025 - Present</p>
            <p>As a Full Stack Developer at Rantalainen Oy, I am responsible for developing and maintaining web applications, working with databases, and collaborating with cross-functional teams to deliver high-quality software solutions.</p>

            <h3>Full Stack Developer</h3>
            <p>Visitory Oy | 2022 - 2025</p>
            <p>Main product provides a high range of statistics and statistical reports on tourism and social media. With no set hierarchy or strict role divisions in our development team, I gained hands-on experience in nearly every aspect of software development. I worked with Python (Django), PostgreSQL, Svelte, JavaScript, TypeScript, SQL pipelines as a part of data processing, CSS, Databricks, AWS, and Heroku.</p>

            <h3>Full Stack Developer</h3>
            <p>ByteTyde Oy | 2024 - Present</p>
            <p>As a small side-hustle alongside my main work and Master's studies, me and my friends started developing an app called Wave for hairstyle recommendations using machine learning. We took the project from an idea to something that's now in regular use at a hair salon at the Jumbo shopping center.</p>
        </div>
    </body>
    </div>
</div>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
  @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

  .top-buttons{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    text-decoration: none;
  }
    .global-wrapper {
        display: flex;
        width: 100vw;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
  .header-info-section {
    font-family: "Montserrat";
    flex: 3;
    text-align: left;
    color: #333;
  }

  #name-title {
    font-family: "Bebas Neue";
    font-size: 4rem;
    margin: 0;
    color: #333;
  }

  .career-overview {
    margin-bottom: 20px;
    border-bottom: 2px solid #444444;
  }

  body {
    display: flex;
    flex-direction: row;
    font-family: "Roboto", sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
    border-bottom: 2px solid #444444;
  }

  .left-content {
    flex: 1;
    text-align: left;
  }

  .right-content {
    flex: 1;
    text-align: left;
  }

  .cv-container {
    width: 297mm;
    padding: 20mm;
    box-sizing: border-box;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
  }

  .header {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #444444;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .photo-container {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .profile-photo {
    width: 250px;
    height: 250px;
    object-fit: cover;
  }

  .subsection {
    margin-bottom: 35px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    margin: 10px 0;
    font-size: 1.2rem;
    color: #333;
  }

  ul li i {
    color: #4caf50;
    margin-right: 10px;
  }

  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

  a {
    text-decoration: none;
  }

  h2 {
    padding-bottom: 0;
  }

  h3 {
    padding-bottom: 0px;
    margin: 0;
    font-size: 1.3rem;
    margin-top: 30px;
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.75rem;
  }

  .tight-text {
    margin-bottom: 20px;

    & p {
      margin: 10px 0;
    }
  }

  .button-link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }

    & .button-icon {
      width: 15px;
      height: 15px;
      margin-right: 10px;
    }
  }

  .contact-custom-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 0;

    p {
      margin: 0;
      margin-left: 2px;
      padding: 0;
    }

    a {
      text-decoration: underline;
      color: #333;
    }
  }
  
  .custom-icon {
    width: 20px;
    height: 20px;
  }
</style>
