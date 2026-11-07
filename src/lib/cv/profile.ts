/** Single source of CV facts. Views format this for their own layout. */

export const profile = {
  name: "Georgy Pokazeev",
  headline: "SOFTWARE ENGINEER",
  contact: {
    phone: "+358456043575",
    email: "georgy@pokazeev.com",
    address: "Porvoo, Finland",
    linkedin: "https://www.linkedin.com/in/georgy-pokazeev-6a1381199/",
  },
  github: [
    { label: "GeorgyPk", href: "https://github.com/GeorgyPk" },
    { label: "Lionbull", href: "https://github.com/Lionbull" },
  ],
  overview: `Currently, I'm working as a Full Stack Developer at Rantalainen Oy and running own project named Wave. I have over four years of experience as a Full Stack Developer doing data processing and visualization (social media data, tourism data), web development and design, automation, database optimization, cyber security, and algorithms. Known for being a team player, I am always ready to help my colleagues. I am looking for new opportunities to grow as a professional and to contribute to the success of the company. I am confident that my reliability, responsibility, and eagerness to learn and tackle new challenges make me the right person to hire. I am a very communicative person and I easily find a common language with everyone. I am fluent in Finnish and English.`,
  education: [
    {
      degree: "M.Sc. (Software Engineering)",
      school: "LUT University",
      years: "2023 - 2025",
    },
    {
      degree: "B.Sc. (Software Engineering)",
      school: "LUT University",
      years: "2020 - 2023",
    },
  ],
  /** Ordered for the A4 classic layout — keep this list short. */
  classicSkills: [
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
  ],
  skillGroups: {
    Languages: ["Python", "JavaScript", "TypeScript", "SQL", "PostgreSQL", "CSS"],
    Frameworks: ["Django", "Angular", "Svelte", "React", "Tailwind"],
    Other: ["Databricks", "PrimeNg", "Git"],
  },
  experience: [
    {
      role: "Full Stack Developer",
      company: "Rantalainen Oy",
      period: "Feb 2025 - Present",
      periodShort: "2025 - Present",
      classic: true,
      summary:
        "As a Full Stack Developer at Rantalainen Oy, I am responsible for developing and maintaining web applications, working with databases, and collaborating with cross-functional teams to deliver high-quality software solutions.",
      // Longer than summary - terminal uses this
      detail:
        "Being a part of the biggest financial management company in Finland while also a part of a relatively small development team, I have the opportunity to work on a wide range of projects and technologies. My responsibilities include developing and maintaining web applications, working with databases, and collaborating with cross-functional teams to deliver high-quality software solutions.",
    },
    {
      role: "Full Stack Developer",
      company: "Visitory Oy",
      period: "May 2022 - Feb 2025",
      periodShort: "2022 - 2025",
      classic: true,
      summary:
        "Main product provides a high range of statistics and statistical reports on tourism and social media. With no set hierarchy or strict role divisions in our development team, I gained hands-on experience in nearly every aspect of software development. I worked with Python (Django), PostgreSQL, Svelte, JavaScript, TypeScript, SQL pipelines as a part of data processing, CSS, Databricks, AWS, and Heroku.",
    },
    {
      role: "Full Stack Developer",
      company: "ByteTyde Oy",
      period: "Mar 2024 - Feb 2026",
      periodShort: "2024 - 2026",
      classic: true,
      summary:
        "As a small side-hustle alongside my main work and Master's studies, me and my friends started developing an app called Wave for hairstyle recommendations using machine learning. We took the project from an idea to something that's now in regular use at a hair salon at the Jumbo shopping center.",
    },
    {
      role: "Study Assistant",
      company: "LUT University",
      period: "Sep 2021 - Jan 2022",
      periodShort: "2021 - 2022",
      classic: false,
      summary:
        'Assisting students in "Basics of Software Development"-named university course. My responsibilities included keeping practice sessions (helping with assignments and projects) and grading deliverables afterwards.',
    },
  ],
  references: [
    {
      name: "Marja Nurkka",
      title: "Product Owner | Visitory Oy",
      email: "marjanurkka@gmail.com",
      phone: "0405598053",
    },
    {
      name: "Antti Honkanen",
      title: "CEO | Visitory Oy",
      email: "antti.honkanen@visitory.io",
      phone: "0505416890",
    },
  ],
} as const;

export type Experience = (typeof profile.experience)[number];

export function jobDetail(job: Experience): string {
  return "detail" in job && job.detail ? job.detail : job.summary;
}

/** Plain-text / light-HTML blobs for the terminal commands. */
export function terminalCopy() {
  const { contact, github, overview, education, skillGroups, experience, references } =
    profile;

  const link = (href: string, label = href) =>
    `<a class="text-white underline" href="${href}" target="_blank">${label}</a>`;

  const skills = Object.entries(skillGroups)
    .map(([group, items]) => `${group}: ${items.join(", ")}`)
    .join("\n");

  const jobs = experience
    .map(
      (job, i) =>
        `${i + 1}. ${job.company} - ${job.role} (${job.period})\n\n${jobDetail(job)}`
    )
    .join("\n\n");

  const edu = education
    .map((e) => `${e.degree} - ${e.school} (${e.years})`)
    .join("\n");

  const refs = references
    .map((r) => `${r.name}, ${r.title}\nEmail: ${r.email}\nPhone: ${r.phone}`)
    .join("\n\n");

  const gh = github
    .map((g, i) => {
      const n = i === 0 ? "First" : i === 1 ? "Second" : `${i + 1}.`;
      return `${n} account: ${link(g.href)}`;
    })
    .join("\n");

  return {
    aboutme: overview + "\n",
    skills: skills + "\n",
    experience: jobs + "\n",
    education: edu + "\n",
    contact:
      [
        `Phone: ${contact.phone}`,
        `Email: ${link(`mailto:${contact.email}`, contact.email)}`,
        `LinkedIn: ${link(contact.linkedin)}`,
      ].join("\n") + "\n",
    reference: refs + "\n",
    github: gh + "\n",
  };
}
