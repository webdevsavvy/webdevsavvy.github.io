import { githubStore } from "@/stores/github.store";
import type { Command } from "@/types/commands";

const availableCommands = ["clear", "whoami", "help", "ls"];

const commandDescriptions: Record<Command, string> = {
    clear: "Clear the terminal",
    whoami: "Show info about me",
    help: "Show this help message",
    ls: "List all of my publicly avilable repositories",
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

        while (terminalContent.firstChild !== inputLine) {
            terminalContent.removeChild(terminalContent.firstChild as Node);
        }
    }
}

function commandNotFoundCommand(command: string) {
    const errorOutput = document.createElement("div");
    errorOutput.classList.add("terminal-line");
    errorOutput.style.color = "red";
    errorOutput.textContent = `command not found: ${command}`;

    insertBeforeInputLine(errorOutput);
}

function whoamiCommand() {
    const whoamiOutput = document.createElement("div");
    whoamiOutput.classList.add("terminal-line");
    whoamiOutput.innerHTML =
        'Fullstack Web Developer | Distributed Systems | Linux Enthusiast | <a href="https://github.com/webdevsavvy" target="_blank">github.com/webdevsavvy</a>';

    insertBeforeInputLine(whoamiOutput);
}

function helpCommand() {
    const helpOutput = document.createElement("div");
    helpOutput.innerHTML = "The available commands:";
    helpOutput.innerHTML += availableCommands.reduce((acc, command) => {
        acc += `  <span class="bold">${command}</span>: ${
            commandDescriptions[command as Command]
        }<br>`;
        return acc;
    }, "<br>");

    insertBeforeInputLine(helpOutput);
}

function lsCommand() {
    const lsOutput = document.createElement("div");
    lsOutput.innerHTML = githubStore.repositories
        .filter(repo => repo.fork != true)
        .map(
            (repo) =>
                `<a href="${repo.html_url}">${repo.name}</a> - ${repo.description}`
        )
        .join('<br>');

    insertBeforeInputLine(lsOutput);
}

export {
    availableCommands,
    commandDescriptions,
    clearCommand,
    commandNotFoundCommand,
    whoamiCommand,
    helpCommand,
    lsCommand,
};
