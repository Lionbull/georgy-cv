<script lang="ts">
  import { onMount, tick } from "svelte";
  import { apps, AppId } from "$lib/stores/apps";
  import { profile, terminalCopy } from "$lib/cv/profile";

  let input = "";
  let commandHistory: Array<string> = [];
  let historyIndex = -1;
  let output = "";
  let outputElement: HTMLDivElement;
  let terminalElement: HTMLDivElement;
  let inputElement: HTMLInputElement;

  const copy = terminalCopy();
  let commands: { [key: string]: string } = {
    help: "",
    ...copy,
    whotohire: `Are you serious?\n${profile.name} of course!\n`,
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
    <span class="text-terminal-green">{profile.name}</span>!<br />
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
