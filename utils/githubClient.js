// await octokit.request("GET /repos/{owner}/{repo}/issues", {
//     owner: "octocat",
//     repo: "Spoon-Knife"
//   });
const { Octokit } = require("@octokit/core");
const config = require("../config");

const octokit = new Octokit({
    auth: `${config.owner.githubToken}`,
  })


class githubClient {
    constructor() {
        this.octokit = octokit;
    }

    async getIssues() {
        const issues = await this.octokit.request("GET /repos/{owner}/{repo}/issues", {
            owner: "akenolol",
            repo: "akenodev.xyz",
        });
        return issues.data;
    }

    async getPullRequests(){
        const pullRequests = await this.octokit.request("GET /repos/{owner}/{repo}/pulls", {
            owner: "akenolol",
            repo: "akenodev.xyz",
        });
        return pullRequests.data;
    }
}

module.exports = githubClient;
