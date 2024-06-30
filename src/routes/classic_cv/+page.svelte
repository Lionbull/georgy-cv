<script>
  import { onMount } from "svelte";

  let name = "Georgy Pokazeev";
  let title = "Software Engineer";
  let contactInfo = {
    phone: "+358456043575",
    email: "geo1529@yahoo.com",
    address: "Humalniementie 5 C 24, 00840 Helsinki, Finland",
  };

  let experiences = [
    {
      role: "Full Stack Developer",
      company: "Visitory Oy",
      duration: "Jan 2022 - Present",
      details:
        "Main product provides statistics mainly on social media and tourism. Worked with data processing, data visualisation, web development, design, large SQL pipelines (part of data processing), databases, ",
    },
    {
      role: "Junior Developer",
      company: "Web Solutions",
      duration: "Jun 2018 - Dec 2019",
      details:
        "Worked on web development projects and maintained existing applications.",
    },
  ];

  let education = [
    {
      degree: "B.Sc. in Computer Science",
      institution: "Anytown University",
      duration: "2014 - 2018",
    },
  ];

  let skills = ["JavaScript", "Svelte", "HTML", "CSS", "Node.js"];

  onMount(() => {});
</script>

<div class="cv-container">
  <header class="header">
    <div class="header-info-section">
      <h1 id="name-title">{name}</h1>
      <h2>{title}</h2>
      <p><i class="fas fa-phone-alt"></i> {contactInfo.phone}</p>
      <p><i class="fas fa-envelope"></i> {contactInfo.email}</p>
      <p><i class="fas fa-map-marker-alt"></i> {contactInfo.address}</p>
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
    <h2>Career Overview</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
      expedita voluptate nulla magnam dolorum eos nihil quo, fugiat libero in,
      deleniti nobis perspiciatis nemo numquam similique! Sequi quis suscipit
      officiis.
    </p>
  </section>

  <body>
    <div class="left-content">
        <h2>Education</h2>
        <p>
            M.Sc. (Software Engineering)
        </p>
        <p>
            LUT University of Technology | 2023 - 2025
        </p>
        <p>
            B.Sc. (Software Engineering)
        </p>
        <p>
            LUT University of Technology | 2020 - 2023
        </p>
        <h2>Skills</h2>
        <ul>
            {#each skills as skill}
              <li><i class="fas fa-check"></i> {skill}</li>
            {/each}
          </ul>
        <h2>Reference</h2>
        <p>Antti Honkanen</p>
        <p>CEO | Visitory Oy</p>
        <p>antti.honkanen@visitory.io</p>
        <p>+3581234567</p>
    </div>
    <div class="right-content">
        <h2>Experience</h2>
        <h4>Full Stack Developer</h4>
        <p>Visitory Oy | 2022 - Present</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat expedita fuga animi ipsa delectus, sapiente at aliquid debitis pariatur adipisci est voluptas molestias veniam, cumque sequi voluptatem nobis nihil maxime!</p>

        <h4>Full Stack Developer</h4>
        <p>ByteTyde Oy | 2024 - Present</p>
        <p>Self-employed<br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat expedita fuga animi ipsa delectus, sapiente at aliquid debitis pariatur adipisci est voluptas molestias veniam, cumque sequi voluptatem nobis nihil maxime!</p>
        
        <h4>Student Assistant</h4>
        <p>LUT University | 2021 - 2022</p>
        <p>Self-employed<br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat expedita fuga animi ipsa delectus, sapiente at aliquid debitis pariatur adipisci est voluptas molestias veniam, cumque sequi voluptatem nobis nihil maxime!</p>
    </div>
  </body>
</div>

<button>Download as PDF</button>

<style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
  @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

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

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    margin: 5px 0;
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
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
