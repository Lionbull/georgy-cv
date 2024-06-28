<script lang="ts">
    import { onMount, tick } from "svelte";

    let input = "";
    let commandHistory: Array<string> = [];
    let historyIndex = -1;
    let output = "";
    let outputElement: any;
    
    let commands: {[key: string]: string} = {
        "help": "Supported commands: \n",
        "aboutme": `As a software developer passionate about creating innovative solutions, I have over two years of experience as a Fullstack Developer with Python (Django), Svelte, JavaScript, SQL (data processing), and PostgreSQL.\nKnown for being a team player, I am always ready to help my colleagues. I am looking for new opportunities to grow as a professional and to contribute to the success of the company.\nI am confident that my reliability, responsibility, and eagerness to learn and tackle new challenges make me the right person to hire.
        `,
        "skills": "Languages: Python, Svelte, SQL, JavaScript, TypeScript, CSS\nFrameworks: Django, React\nOther: Databricks, Git",
        "experience": `1. Visitory Oy - Full Stack Software Developer (May 2022 - Present)\n2. Bytetyde - Full Stack Software Developer (Mar 2024 - Present)\n3. LUT University - Study Assistant (Sep 2021 - Jan 2022)`,
        "education": "M.Sc. (Software Engineering) - LUT University (2023 - 2025)\nB.Sc. (Software Engineering) - LUT University (2020 - 2023)",
        "contact": 'Phone: +358456043575\nEmail: <a style="color: #FFFFFF;" href="mailto:geo1529@yahoo.com" target="_blank">geo1529@yahoo.com</a>\nLinkedIn: <a style="color: #FFFFFF;" href="https://www.linkedin.com/in/georgy-pokazeev-6a1381199/" target="_blank">https://www.linkedin.com/in/georgy-pokazeev-6a1381199/</a>',
        "github": 'First account: <a style="color: #FFFFFF;" href="https://github.com/GeorgyPk" target="_blank">https://github.com/GeorgyPk</a>\nSecond account: <a style="color: #FFFFFF;" href="https://github.com/Lionbull" target="_blank">https://github.com/Lionbull</a>',
        "whotohire": "Are you serious?\nGeorgy Pokazeev of course!",
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
    };

    const executeCommand = () => {
        /**
         * Function to execute the command
         * Pushes the command to the history and resets the input
        */
        handleCommand(input);
        commandHistory.push(input);
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
        <span class="intext-highlight">NOTE:</span> If you are not much of a terminal user, please press the link to a <a href="https://www.linkedin.com/in/georgy-pokazeev-6a1381199/" target="_blank">Classic CV here</a> or above the terminal.<br>
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
        max-width: 800px;
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
