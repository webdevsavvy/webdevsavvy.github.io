<script setup lang="ts">
import { ref } from 'vue';
import { commandHistoryStore } from '@/stores/commandHistory.store';
import { availableCommands, clearCommand, commandNotFoundCommand, helpCommand, lsCommand, whoamiCommand } from '@/utils/commands';

const terminalInput = ref<HTMLElement | null>(null);
const terminalContent = ref<HTMLElement | null>(null);

const focusTerminalInput = () => terminalInput.value?.focus();

const terminalPrompt = 'webdevsavvy@github.com:~$&nbsp;';

// Function to auto-scroll the terminal to the bottom
const scrollToBottom = async () => {
    // Use a small timeout to ensure DOM is fully updated
    setTimeout(() => {
        if (terminalContent.value) {
            const targetElement = terminalContent.value;
            targetElement.scrollTo({
                top: targetElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, 10);
};

const handleTerminalInputKeyDown = (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement;

    if (event.key == "Enter") {
        const command = input.value;

        // Create a new terminal line with the entered command
        const newLine = document.createElement('div');
        newLine.classList.add('terminal-line');

        const promptSpan = document.createElement('span');
        promptSpan.classList.add('prompt');
        promptSpan.innerHTML = terminalPrompt;

        const commandText = document.createTextNode(command);

        newLine.appendChild(promptSpan);
        newLine.appendChild(commandText);

        // Insert the new line before the current input line
        const inputLine = terminalInput.value?.closest('.terminal-line');
        if (inputLine && inputLine.parentElement) {
            inputLine.parentElement.insertBefore(newLine, inputLine);

            scrollToBottom();
        }

        if (command) runCommand(input.value);

        // Clear the input
        input.value = '';

        event.preventDefault();
    }

    if (event.key == "ArrowUp") {
        input.value = commandHistoryStore.previousCommand() ?? input.value;
        event.preventDefault();
    }

    if (event.key == "ArrowDown") {
        input.value = commandHistoryStore.nextCommand() ?? input.value;
        event.preventDefault();
    }

    if (event.key == "Tab") {
        // Handle tab completion
        event.preventDefault();
        const input = event.target as HTMLInputElement;
        const partialCommand = input.value.toLowerCase();

        if (partialCommand.length > 0) {
            // Find commands that start with the partial input
            const matchingCommands = availableCommands.filter(cmd =>
                cmd.toLowerCase().startsWith(partialCommand)
            );

            if (matchingCommands.length === 1) {
                // Single match - complete the command
                input.value = matchingCommands[0];
            } else if (matchingCommands.length > 1) {
                // Multiple matches - display options
                const newLine = document.createElement('div');
                newLine.classList.add('terminal-line');
                newLine.textContent = matchingCommands.join('  ');

                // Insert the matches list before the input line
                const inputLine = terminalInput.value?.closest('.terminal-line');
                if (inputLine && inputLine.parentElement) {
                    inputLine.parentElement.insertBefore(newLine, inputLine);

                    // Re-display prompt with current input
                    const promptLine = document.createElement('div');
                    promptLine.classList.add('terminal-line');

                    const promptSpan = document.createElement('span');
                    promptSpan.classList.add('prompt');
                    promptSpan.innerHTML = terminalPrompt;

                    promptLine.appendChild(promptSpan);
                    promptLine.appendChild(document.createTextNode(input.value));

                    inputLine.parentElement.insertBefore(promptLine, inputLine);
                }
            }
        }
    }
};

const runCommand = async (command: string) => {
    commandHistoryStore.addCommandToHistory(command);

    switch (command) {
        case "clear": clearCommand(); break;
        case "whoami": whoamiCommand(); break;
        case "help": helpCommand(); break;
        case "ls": await lsCommand(); break;
        default: commandNotFoundCommand(command); break;
    }

    scrollToBottom();
};

</script>

<template>
    <div class="terminal-container" @click="focusTerminalInput">
        <div class="terminal-content" ref="terminalContent">
            <div class="terminal-line" id="input-terminal-line">
                <span class="prompt" v-html="terminalPrompt"></span>
                <input class="terminal-input" value="" type="text" ref="terminalInput" autocomplete="off"
                    autocorrect="off" autocapitalize="off" spellcheck="false" @keydown="handleTerminalInputKeyDown">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.terminal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 800px;
    width: 1200px;
    background-color: #000;
    border-radius: 8px;
    padding: 16px;
    color: #0f0;
    font-family: monospace;
    overflow: hidden;
    /* Change from auto to hidden */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    text-align: left;
    transition: box-shadow 0.3s ease;
    user-select: none;

    &:focus-within {
        box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
        outline: none;
    }
}

.terminal-content {
    caret-color: #0f0;
    height: 100%;
    text-align: left;
    white-space: pre-wrap;
    word-break: break-all;
    user-select: text;
    overflow-y: auto;
    padding-right: 5px;
    scroll-behavior: smooth;
    /* Add smooth scrolling */

    &:focus {
        outline: none;
    }
}

.terminal-line {
    display: flex;
    min-height: 1.2em;

    &.continuation {
        padding-left: 0;
    }
}

.prompt {
    color: #0f0;
    font-weight: bold;
    user-select: none;
}

.terminal-input {
    background: transparent;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    margin: 0;
    outline: none;
    flex-grow: 1;
    caret-color: #0f0;
}
</style>
