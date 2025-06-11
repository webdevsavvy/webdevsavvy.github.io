export type CommandHistoryStore = {
    history: Array<string>;
    historyIndex: number | null;
    addCommandToHistory: Function;
    previousCommand: Function;
    nextCommand: Function;
};

export type Command = "clear" | "whoami" | "help" | "ls";
