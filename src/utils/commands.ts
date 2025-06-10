const availableCommands = ["clear", "whoami", "help"] as const;
type Command = typeof availableCommands[number];

const commandDescriptions: Record<Command, string> = {
    "clear": "Clear the terminal",
    "whoami": "Show info about me",
    "help": "Show this help message"
};

function insertBeforeInputLine(el: HTMLElement) {
    const inputLine = document.getElementById("input-terminal-line");
    if (inputLine && inputLine.parentElement) {
        inputLine.parentElement.insertBefore(el, inputLine);
    }
}

function clearCommand() {
    const inputLine = document.getElementById("input-terminal-line");
    if (inputLine && inputLine.parentElement) {
        const terminalContent = inputLine.parentElement;

        while(terminalContent.firstChild !== inputLine) {
            terminalContent.removeChild(terminalContent.firstChild as Node);
        }
    }
}

function commandNotFoundCommand(command: string) {
    const errorLine = document.createElement('div');
    errorLine.classList.add("terminal-line");
    errorLine.style.color = "red";
    errorLine.textContent = `command not found: ${command}`;

    insertBeforeInputLine(errorLine);
}

function whoamiCommand() {
    const whoamiLine = document.createElement("div");
    whoamiLine.classList.add("terminal-line");
    whoamiLine.innerHTML =
        'Fullstack Web Developer | Distributed Systems | Linux Enthusiast | <a href="https://github.com/webdevsavvy" target="_blank">github.com/webdevsavvy</a>';

    insertBeforeInputLine(whoamiLine);
}
function helpCommand() {
    const helpLine = document.createElement('div');
    helpLine.innerHTML = "The available commands:";
    helpLine.innerHTML += availableCommands.reduce((acc, command) => {
        acc += `  <span class="bold">${command}</span>: ${commandDescriptions[command as Command]}<br>`;
        return acc;
    }, '<br>');

    insertBeforeInputLine(helpLine);
}


export {
    availableCommands,
    commandDescriptions,
    clearCommand,
    commandNotFoundCommand,
    whoamiCommand,
    helpCommand,
}
