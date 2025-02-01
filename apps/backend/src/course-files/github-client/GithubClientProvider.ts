import { GithubClientConfigurationService } from "./GithubClientConfigurationService.js";
import { Octokit } from "@octokit/rest";
import { Logger } from "@nestjs/common";

export const OKTO_KIT = "OktokitClient";
const logger = new Logger(OKTO_KIT);
export const GithubClientProvider = {
    provide: OKTO_KIT,
    // eslint-disable-next-line @typescript-eslint/require-await
    useFactory: async (
        config: GithubClientConfigurationService,
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

        return fullClient;
    },
    inject: [GithubClientConfigurationService],
};
