import type { GithubStore, ListUserReposResponse } from "@/types/github";
import { reactive } from "vue";

const githubStore = reactive<GithubStore>({
    repositories: [],
    async fetchRepositories() {
        try {
            const response = await fetch("https://api.github.com/users/webdevsavvy/repos");
            const data = await response.json();
            console.log(data);
            this.repositories = data as ListUserReposResponse;
        } catch (error) {
            console.error("Failed to fetch repositories:", error);
            return [];
        }
    }
});

export {
    githubStore
};
