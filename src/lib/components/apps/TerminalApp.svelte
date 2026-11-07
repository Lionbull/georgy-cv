<script lang="ts">
  import { onMount, tick } from "svelte";
  import { apps, AppId } from "$lib/stores/apps";

  let input = "";
  let commandHistory: Array<string> = [];
  let historyIndex = -1;
  let output = "";
  let outputElement: HTMLDivElement;
  let terminalElement: HTMLDivElement;
  let inputElement: HTMLInputElement;

  let commands: { [key: string]: string } = {
    help: "",
    aboutme: `Currently, I'm working as a Full Stack Developer at Rantalainen Oy and running own project named Wave.
I have over four years of experience as a Full Stack Developer doing data processing and visualization, web development and design, automation, database optimization, cyber security, and algorithms. Known for being a team player, I am always ready to help my colleagues. I am looking for new opportunities to grow as a professional and to contribute to the success of the company.
I am confident that my reliability, responsibility, and eagerness to learn and tackle new challenges make me the right person to hire. I am a very communicative person and I easily find a common language with everyone. I am fluent in Finnish and English.
`,
    skills:
      "Languages: Python, JavaScript, TypeScript, SQL, PostgreSQL, CSS\nFrameworks: Django, Angular, Svelte, React, Tailwind\nOther: Databricks, PrimeNg, Git\n",
    experience: `1. Rantalainen Oy - Full Stack Developer (Feb 2025 - Present)

Being a part of the biggest financial management company in Finland while also a part of a relatively small development team, I have the opportunity to work on a wide range of projects and technologies. My responsibilities include developing and maintaining web applications, working with databases, and collaborating with cross-functional teams to deliver high-quality software solutions.

2. Visitory Oy - Full Stack Developer (May 2022 - Feb 2025)

Main product provides a high range of statistics and statistical reports on tourism and social media. With no set hierarchy or strict role divisions in our development team, I gained hands-on experience in nearly every aspect of software development. I worked with Python (Django), PostgreSQL, Svelte, JavaScript, TypeScript, SQL pipelines as a part of data processing, CSS, Databricks, AWS, and Heroku.

3. Bytetyde - Full Stack Software Developer (Mar 2024 - Feb 2026)

As a small side-hustle alongside my main work and Master's studies, me and my friends started developing an app called Wave for hairstyle recommendations using machine learning. We took the project from an idea to something that's now in regular use at a hair salon at the Jumbo shopping center.

4. LUT University - Study Assistant (Sep 2021 - Jan 2022)

Assisting students in "Basics of Software Development"-named university course. My responsibilities included keeping practice sessions (helping with assignments and projects) and grading deliverables afterwards.\n`,
    education:
      "M.Sc. (Software Engineering) - LUT University (2023 - 2025)\nB.Sc. (Software Engineering) - LUT University (2020 - 2023)\n",
    contact:
      'Phone: +358456043575\nEmail: <a class="text-white underline" href="mailto:georgy@pokazeev.com" target="_blank">georgy@pokazeev.com</a>\nLinkedIn: <a class="text-white underline" href="https://www.linkedin.com/in/georgy-pokazeev-6a1381199/" target="_blank">https://www.linkedin.com/in/georgy-pokazeev-6a1381199/</a>\n',
    reference: `Marja Nurkka, Product Owner | Visitory Oy
Email: marjanurkka@gmail.com
Phone: 0405598053

Antti Honkanen, CEO | Visitory Oy
Email: antti.honkanen@visitory.io
Phone: 0505416890\n`,
    github:
      'First account: <a class="text-white underline" href="https://github.com/GeorgyPk" target="_blank">https://github.com/GeorgyPk</a>\nSecond account: <a class="text-white underline" href="https://github.com/Lionbull" target="_blank">https://github.com/Lionbull</a>\n',
    whotohire: "Are you serious?\nGeorgy Pokazeev of course!\n",
    openclassiccv: "Opening Classic CV…\n",
  };

  const handleCommand = (command: string) => {
    if (command === "openclassiccv") {
      output += `$ ${command}\nOpening Classic CV…\n\n`;
      apps.openApp(AppId.ClassicCV);
      return;
    }
    if (command in commands) {
      output += `$ ${command}\n${commands[command]}\n\n`;
    } else {
      output += `$ ${command}\nCommand not found. Type 'help' for a list of supported commands.\n\n`;
    }
  };

  const generateHelpCommand = () => {
    const keys =
      Object.keys(commands)
        .filter((key) => key !== "help")
        .join(", ") + ", help";
    commands["help"] = "Supported commands: \n" + keys;
  };

  const executeCommand = () => {
    handleCommand(input.toLowerCase().trim());
    commandHistory.push(input.toLowerCase().trim());
    historyIndex = commandHistory.length;
    input = "";
    scrollToBottom();
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      executeCommand();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input = commandHistory[historyIndex];
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input = commandHistory[historyIndex];
      } else {
        input = "";
        historyIndex = commandHistory.length;
      }
    }
  };

  const scrollToBottom = async () => {
    await tick();
    if (terminalElement && outputElement) {
      terminalElement.scrollTop = terminalElement.scrollHeight;
    }
  };

  const focusInput = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      inputElement?.focus();
    }
  };

  onMount(async () => {
    await tick();
    generateHelpCommand();
    focusInput();
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={terminalElement}
  class="h-full overflow-y-auto bg-black p-3 font-mono text-sm leading-relaxed wrap-break-word text-terminal-green md:p-5 md:text-base"
  style="font-family: var(--font-mono)"
  on:click={focusInput}
>
  <div class="text-white">
    =======================================<br />
    Welcome to the CV of
    <span class="text-terminal-green">Georgy Pokazeev</span>!<br />
    This interactive terminal will provide you all the professional information
    about me.<br />
    You can start with the <span class="text-terminal-green">"help"</span>
    command.<br /><br />
    <span class="text-terminal-green">NOTE:</span> Prefer a classic resume? Open
    the <span class="text-terminal-green">Classic CV</span> app from the dock /
    home screen, or type
    <span class="text-terminal-green">"openclassiccv"</span>.<br />
    =======================================<br />
  </div>
  <div class="whitespace-pre-wrap text-terminal-green" bind:this={outputElement}>
    {@html output}
  </div>
  <div class="flex">
    <span class="shrink-0 text-terminal-green">$&nbsp;</span>
    <!-- svelte-ignore a11y-autofocus -->
    <input
      bind:this={inputElement}
      bind:value={input}
      on:keydown={handleKeyDown}
      class="min-w-0 flex-1 border-none bg-transparent font-mono text-white outline-none"
      style="font-family: var(--font-mono)"
      type="text"
      aria-label="Terminal command"
      autofocus
    />
  </div>
</div>
