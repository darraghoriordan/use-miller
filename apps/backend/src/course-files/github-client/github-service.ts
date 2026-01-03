/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Octokit } from "@octokit/rest";
import { OKTO_KIT } from "./GithubClientProvider.js";

/**
 * Facade this to reduce number of exposed methods
 */
@Injectable()
export class GithubClientService {
    private readonly logger = new Logger(GithubClientService.name);
    constructor(
        @Inject(OKTO_KIT)
        private readonly clientInstance: Octokit,
    ) {
        this.logger.debug("Setting up github client");
    }

    public async addCollaborator(request: {
        owner: string;
        repo: string;
        username: string;
    }): Promise<void> {
        this.logger.debug(
            { repo: request.repo, username: request.username },
            "Adding collaborator to repo",
        );
        try {
            const result =
                await this.clientInstance.rest.repos.addCollaborator(request);
            this.logger.debug({ result: result.data }, "add result data");
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (result.status !== 201) {
                throw new Error(
                    `Failed to add collaborator ${request.username} to ${request.owner}/${request.repo}`,
                );
            }
        } catch (error: any) {
            this.logger.error(error);
            throw error;
        }
    }

    public async checkCollaborator(request: {
        owner: string;
        repo: string;
        username: string;
    }): Promise<boolean> {
        this.logger.debug(
            { repo: request.repo, username: request.username },
            "Checking collaborator is in repo",
        );
        try {
            const ghResult =
                await this.clientInstance.rest.repos.checkCollaborator(request);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            const hasCollaborator = ghResult.status === 204;
            this.logger.debug(
                { hasCollaborator, result: ghResult },
                "check result data",
            );
            return hasCollaborator;
        } catch (error: any) {
            const oktokitError = error as { status: number } & Error;
            if (oktokitError.status === 404) {
                return false;
            }
            throw error;
        }
    }

    public async removeCollaborator(request: {
        owner: string;
        repo: string;
        username: string;
    }): Promise<boolean> {
        this.logger.debug(
            {
                repo: request.repo,
                username: request.username,
                client: this.clientInstance,
            },
            "Removing collaborator from repo",
        );
        try {
            const result =
                await this.clientInstance.rest.repos.removeCollaborator(
                    request,
                );
            this.logger.debug({ result: result.data }, "remove result data");
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            return result.status === 204;
        } catch (error: any) {
            this.logger.error(error);
            throw error;
        }
    }

    /**
     * Check if a GitHub user exists by their username
     * @param username - The GitHub username to check
     * @returns true if the user exists, false otherwise
     */
    public async checkUserExists(username: string): Promise<boolean> {
        this.logger.debug({ username }, "Checking if GitHub user exists");
        try {
            const result = await this.clientInstance.rest.users.getByUsername({
                username,
            });
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            const didFindUser = result.status === 200;
            this.logger.debug(
                { didFindUser, login: result.data.login },
                "GitHub user check result",
            );
            return didFindUser;
        } catch (error: any) {
            const oktokitError = error as { status: number } & Error;
            if (oktokitError.status === 404) {
                this.logger.debug(
                    { username },
                    "GitHub user does not exist (404)",
                );
                return false;
            }
            this.logger.error(error);
            throw error;
        }
    }
}
