import { GithubClientConfigurationService } from "./GithubClientConfigurationService.js";
import { Octokit } from "@octokit/rest";

export const GithubClientProvider = {
    provide: "GithubClient",
    useFactory: (config: GithubClientConfigurationService): Octokit => {
        const fullClient: Octokit = new Octokit({
            auth: config.accessToken,
        });

        return fullClient;
    },
    inject: [GithubClientConfigurationService],
};
