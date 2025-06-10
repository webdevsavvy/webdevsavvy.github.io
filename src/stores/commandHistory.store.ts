import { reactive } from "vue";

type CommandHistoryStore = {
    history: Array<string>;
    historyIndex: number | null;
    addCommandToHistory: Function;
    previousCommand: Function;
    nextCommand: Function;
};

export const commandHistoryStore = reactive<CommandHistoryStore>({
    history: [],
    historyIndex: null,
    addCommandToHistory(command: string) {
        this.history.push(command);
        this.historyIndex = null;
    },
    previousCommand() {
        if (this.history.length == 0) return;

        if (this.historyIndex == null) {
            this.historyIndex = this.history.length - 1;
            return this.history[this.historyIndex]
        }

        if (this.historyIndex > 0) {
            this.historyIndex--;
            return this.history[this.historyIndex];
        }

        return this.history[this.historyIndex];
    },
    nextCommand() {
        if (this.history.length == 0) return;

        if (this.historyIndex == null) {
            this.historyIndex = 0;
            return this.history[this.historyIndex];
        }

        if (this.historyIndex < this.history.length) {
            this.historyIndex++;
            return this.history[this.historyIndex];
        }

        return this.history[this.historyIndex];
    },
});
