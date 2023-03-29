import { GithubClientConfigurationService } from "./GithubClientConfigurationService.js";
import { Octokit } from "@octokit/rest";
import { Logger } from "@nestjs/common";

export const OKTO_KIT = "OktokitClient";
const logger = new Logger(OKTO_KIT);
export const GithubClientProvider = {
    provide: OKTO_KIT,
    useFactory: async (
        config: GithubClientConfigurationService
    ): Promise<Octokit> => {
        const fullClient: Octokit = new Octokit({
            auth: config.accessToken,
            log: {
                debug: (message) => {
                    logger.debug(message);
                },
                error: (message) => {
                    logger.error(message);
                },
                info: (message) => {
                    logger.log(message);
                },
                warn: (message) => {
                    logger.warn(message);
                },
            },
        });
        try {
            const response = await fullClient.rest.repos.checkCollaborator({
                owner: "darraghoriordan",
                repo: "use-miller",
                username: "darraghoriordan-roam",
            });
            logger.debug(
                { data: response.data, status: response.status },
                "Github client initialised"
            );
        } catch (error) {
            logger.error(error, "Failed to initialise github client");
        }

        return fullClient;
    },
    inject: [GithubClientConfigurationService],
};
