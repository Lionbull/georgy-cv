<script lang="ts">
    import { onMount, tick } from "svelte";

    let input = "";
    let commandHistory: Array<string> = [];
    let historyIndex = -1;
    let output = "";
    let outputElement: any;
    
    let commands: {[key: string]: string} = {
        "help": "",
        "aboutme": `Currently, I'm working as a Full Stack Developer at Rantalainen Oy and running own project named Wave.
I have over four years of experience as a Full Stack Developer doing data processing and visualization, web development and design, automation, database optimization, cyber security, and algorithms. Known for being a team player, I am always ready to help my colleagues. I am looking for new opportunities to grow as a professional and to contribute to the success of the company.
I am confident that my reliability, responsibility, and eagerness to learn and tackle new challenges make me the right person to hire. I am a very communicative person and I easily find a common language with everyone. I am fluent in Finnish and English.
`,
        "skills": "Languages: Python, JavaScript, TypeScript, SQL, PostgreSQL, CSS\nFrameworks: Django, Angular, Svelte, React, Tailwind\nOther: Databricks, PrimeNg, Git\n",
        "experience": `1. Rantalainen Oy - Full Stack Developer (Feb 2025 - Present)

Being a part of the biggest financial management company in Finland while also a part of a relatively small development team, I have the opportunity to work on a wide range of projects and technologies. My responsibilities include developing and maintaining web applications, working with databases, and collaborating with cross-functional teams to deliver high-quality software solutions.

2. Visitory Oy - Full Stack Developer (May 2022 - Feb 2025)

Main product provides a high range of statistics and statistical reports on tourism and social media. With no set hierarchy or strict role divisions in our development team, I gained hands-on experience in nearly every aspect of software development. I worked with Python (Django), PostgreSQL, Svelte, JavaScript, TypeScript, SQL pipelines as a part of data processing, CSS, Databricks, AWS, and Heroku.

3. Bytetyde - Full Stack Software Developer (Mar 2024 - Present)

As a small side-hustle alongside my main work and Master's studies, me and my friends started developing an app called Wave for hairstyle recommendations using machine learning. We took the project from an idea to something that's now in regular use at a hair salon at the Jumbo shopping center.

4. LUT University - Study Assistant (Sep 2021 - Jan 2022)

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
<div id="terminal-window">
    <div id="window-header">
        <div class="traffic-lights">
            <div class="traffic-light red"></div>
            <div class="traffic-light yellow"></div>
            <div class="traffic-light green"></div>
        </div>
        <div class="window-title">Terminal — Georgy Pokazeev CV</div>
    </div>
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

    #terminal-window {
        display: flex;
        flex-direction: column;
        width: 80%;
        max-width: 1100px;
        height: 70%;
        background-color: #000;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08);
        border: 0.5px solid rgb(87, 87, 87);
        
        @media (max-width: 768px) {
            width: 95%;
            height: 80%;
            border-radius: 8px;
        }
        
        @media (max-width: 480px) {
            width: 100%;
            height: 100%;
            border-radius: 0;
            box-shadow: none;
            border: none;
        }
    }

    #window-header {
        background: rgba(40, 40, 40, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        height: 32px;
        min-height: 32px;
        max-height: 32px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
        position: relative;
        flex-shrink: 0;
        
        @media (max-width: 768px) {
            padding: 0 16px;
            height: 36px;
            min-height: 36px;
            max-height: 36px;
        }
        
        @media (max-width: 480px) {
            padding: 0 12px;
            height: 40px;
            min-height: 40px;
            max-height: 40px;
        }
    }

    .traffic-lights {
        display: flex;
        gap: 8px;
        z-index: 1;
        
        @media (max-width: 480px) {
            gap: 6px;
        }
    }

    .traffic-light {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.15s ease;
        position: relative;
        
        @media (max-width: 480px) {
            width: 10px;
            height: 10px;
        }
        
        &:hover {
            transform: scale(1.1);
        }
        
        &:active {
            transform: scale(0.95);
        }
    }

    .traffic-light.red {
        background: #ff5f56;
        box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.12);
        
        &:hover::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 1px;
            background: rgba(0, 0, 0, 0.7);
            transform: translate(-50%, -50%);
        }
    }

    .traffic-light.yellow {
        background: #ffbd2e;
        box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.12);
        
        &:hover::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 1px;
            background: rgba(0, 0, 0, 0.7);
            transform: translate(-50%, -50%);
        }
    }

    .traffic-light.green {
        background: #27c93f;
        box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.12);
        
        &:hover::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .window-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: #ffffff;
        font-size: 13px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100% - 160px);
        
        @media (max-width: 768px) {
            font-size: 12px;
            max-width: calc(100% - 120px);
        }
        
        @media (max-width: 480px) {
            font-size: 11px;
            max-width: calc(100% - 80px);
        }
    }

    #terminal {
        flex-grow: 1;
        padding: 20px;
        overflow-y: auto;
        background-color: #000;
        word-wrap: break-word;
        overflow-wrap: break-word;
        
        @media (max-width: 768px) {
            padding: 16px;
        }
        
        @media (max-width: 480px) {
            padding: 12px;
            font-size: 14px;
        }
    }

    #output {
        white-space: pre-wrap;
        line-height: 1.3;
        word-wrap: break-word;
        overflow-wrap: break-word;
        max-width: 100%;
        
        @media (max-width: 480px) {
            line-height: 1.4;
        }
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
        word-wrap: break-word;
        overflow-wrap: break-word;
        
        @media (max-width: 480px) {
            line-height: 1.4;
            font-size: 14px;
        }
    }

    .intext-highlight {
        color: #00ff00;
    }

    a {
        color: #00ff00;
    }
</style>
