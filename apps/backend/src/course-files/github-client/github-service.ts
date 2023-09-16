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
            return result.status === 204;
        } catch (error: any) {
            this.logger.error(error);
            throw error;
        }
    }
}
