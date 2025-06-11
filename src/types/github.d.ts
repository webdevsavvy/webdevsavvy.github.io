import type { Endpoints } from "@octokit/types";

export type ListUserReposResponse = Endpoints["GET /users/{username}/repos"]["response"]["data"];

export type GithubStore = {
    repositories: ListUserReposResponse,
    fetchRepositories: Function
};
