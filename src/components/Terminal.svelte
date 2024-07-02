<script lang="ts">
    import { onMount, tick } from "svelte";

    let input = "";
    let commandHistory: Array<string> = [];
    let historyIndex = -1;
    let output = "";
    let outputElement: any;
    
    let commands: {[key: string]: string} = {
        "help": "",
        "aboutme": `Currently, I'm working as a Full Stack Developer at Visitory Oy and running own startup named Wave (ByteTyde Oy).
I have over two years of experience as a Full Stack Developer doing data processing and visualization (social media data, tourism data), web development and design, automation, database optimization, cyber security, and algorithms.
Known for being a team player, I am always ready to help my colleagues.
I am looking for new opportunities to grow as a professional and to contribute to the success of the company.
I am confident that my reliability, responsibility, and eagerness to learn and tackle new challenges make me the right person to hire.
My communication skills are on a high level, as I easily find a common language with everyone and I am fluent in Finnish, English, and Russian.
`,
        "skills": "Languages: Python, Svelte, SQL, JavaScript, TypeScript, CSS\nFrameworks: Django, React\nOther: Databricks, Git\n",
        "experience": `1. Visitory Oy - Full Stack Developer (May 2022 - Present)

Main product provides a high range of statistics and statistical reports on tourism and social media. Since there was no hierarchy or role division in development team, I got experience in nearly every aspect of software development that you can imagine. I worked with Python (Django), PostgreSQL, Svelte, JavaScript, TypeScript, SQL pipelines as a part of data processing, CSS, Databricks, AWS, and Heroku.

2. Bytetyde - Full Stack Software Developer (Mar 2024 - Present)

We, as ByteTyde Oy, founded the company and are currently developing an application for making choosing hairstyles easier for everyone using Svelte and Python. It includes computer vision, web development, and data processing. We won two startup competitions which are IdeaRace (1st place) and *ship (3rd place) that was sponsored by Google.

3. LUT University - Study Assistant (Sep 2021 - Jan 2022)

Assisting students in "Basics of Software Development"-named university course. My responsibilities included keeping practice sessions (helping with assignments and projects) and grading deliverables afterwards.\n`,
        "education": "M.Sc. (Software Engineering) - LUT University (2023 - 2025)\nB.Sc. (Software Engineering) - LUT University (2020 - 2023)\n",
        "contact": 'Phone: +358456043575\nEmail: <a style="color: #FFFFFF;" href="mailto:geo1529@yahoo.com" target="_blank">geo1529@yahoo.com</a>\nLinkedIn: <a style="color: #FFFFFF;" href="https://www.linkedin.com/in/georgy-pokazeev-6a1381199/" target="_blank">https://www.linkedin.com/in/georgy-pokazeev-6a1381199/</a>\n',
        "reference": `Marja Nurkka, Product Owner | Visitory Oy
Email: marjanurkka@gmail.com
Phone: 0405598053

Antti Honkanen, CEO | Visitory Oy
Email: antti.honkanen@visitory.io
Phone: 0505416890\n`,
        "github": 'First account: <a style="color: #FFFFFF;" href="https://github.com/GeorgyPk" target="_blank">https://github.com/GeorgyPk</a>\nSecond account: <a style="color: #FFFFFF;" href="https://github.com/Lionbull" target="_blank">https://github.com/Lionbull</a>\n',
        "whotohire": "Are you serious?\nGeorgy Pokazeev of course!\n",
    };

    const handleCommand = (command: string) => {
        /**
         * Generates the output for the command
        */
        if (commands.hasOwnProperty(command)) {
            output += `$ ${command}\n${commands[command]}\n\n`;
        } else {
            output += `$ ${command}\nCommand not found. Type 'help' for a list of supported commands.\n\n`;
        }
    };

    const generateHelpCommand = () => {
        /**
         * Function for a dymamic composition of the help command output
         * Simplifies the process of adding new commands to the terminal
         */
        let helpCommandOutput = commands["help"];
        helpCommandOutput = Object.keys(commands).filter(key => key !== "help").join(", ") + ", help";
        commands["help"] = helpCommandOutput;
        commands["help"] = "Supported commands: \n" + commands["help"];
    };

    const executeCommand = () => {
        /**
         * Function to execute the command
         * Pushes the command to the history and resets the input
        */
        handleCommand(input.toLowerCase());
        commandHistory.push(input.toLowerCase());
        historyIndex = commandHistory.length;
        input = "";
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
        scrollToBottom();   
    };

    const handleKeyDown = async (event: KeyboardEvent) => {
        /**
         * Function to keyboard manipulation of the terminal
         * @param event: KeyboardEvent
        */
        if (event.key === "Enter") {
            executeCommand();
            scrollToBottom();
        } else if (event.key === "ArrowUp") {
            if (historyIndex > 0) {
                historyIndex--;
                input = commandHistory[historyIndex];
            }
        } else if (event.key === "ArrowDown") {
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
        /**
         * Function to scroll the terminal to the bottom when the output is too long 
        */
        await tick();
        const terminalElement = document.getElementById("terminal");
        setTimeout(() => {
            if (terminalElement)
                terminalElement.scrollTop = outputElement.scrollHeight;
        }, 0);
    };

    const focusInput = () => {
        /**
         * Function to focus the input when the terminal is clicked
        */
        let selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
            document.getElementById("input")?.focus();
        }
    };

    onMount(async() => {
        await tick();
        generateHelpCommand();
        focusInput();
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="terminal" on:click={focusInput}>
    <div class="introduction-text">
        =======================================<br>
        Welcome to the CV of <span class="intext-highlight">Georgy Pokazeev</span>!<br>
        This interactive terminal will provide you all the professional information about me.<br>
        You can start with the <span class="intext-highlight">"help"</span> command.<br><br>
        <span class="intext-highlight">NOTE:</span> If you are not much of a terminal user, please press the link to a <a href="/classic_cv" target="_blank">Classic CV here</a> or above the terminal.<br>
        =======================================<br>
    </div>
    <div id="output" bind:this={outputElement}>{@html output}</div>
    <div id="input-line">
        <span id="prompt">$&nbsp;</span>
        <!-- svelte-ignore a11y-autofocus -->
        <input type="text" id="input" bind:value={input} on:keydown={handleKeyDown} autofocus>
    </div>
</div>

<style lang="scss">
    :global(body) {
        background-color: #1e1e1e;
        color: #00ff00;
        font-family: 'Courier New', Courier, monospace;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    #terminal {
        width: 80%;
        max-width: 1000px;
        height: 60%;
        background-color: #000;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        overflow-y: auto;
    }

    #output {
        white-space: pre-wrap;
        line-height: 1.3;
    }

    #input-line {
        display: flex;
        line-height: 1.3;
    }

    #prompt {
        flex-shrink: 0;
        line-height: 1.3;
    }

    #input {
        background: none;
        border: none;
        color: white;
        font: inherit;
        outline: none;
        flex-grow: 1;
    }

    .introduction-text {
        margin-top: 0;
        color: white;
        line-height: 1.3;
    }

    .intext-highlight {
        color: #00ff00;
    }

    a {
        color: #00ff00;
    }
</style>
