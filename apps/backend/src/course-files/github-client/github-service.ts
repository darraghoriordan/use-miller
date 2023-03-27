import { Inject, Injectable, Logger } from "@nestjs/common";
import { Octokit } from "@octokit/rest";

/**
 * Facading this to reduce number of exposed methods
 */
@Injectable()
export class GithubClientService {
    private readonly logger = new Logger(GithubClientService.name);
    constructor(
        @Inject("GithubClient")
        private readonly clientInstance: Octokit
    ) {
        this.logger.log("Setting up github client");
    }

    public async addCollaborator(request: {
        owner: string;
        repo: string;
        username: string;
    }): Promise<void> {
        const result = await this.clientInstance.rest.repos.addCollaborator(
            request
        );
        if (result.status !== 201) {
            throw new Error(
                `Failed to add collaborator ${request.username} to ${request.owner}/${request.repo}`
            );
        }
    }

    public async checkCollaborator(request: {
        owner: string;
        repo: string;
        username: string;
    }): Promise<boolean> {
        const result = await this.clientInstance.rest.repos.checkCollaborator(
            request
        );
        return result.status === 204;
    }

    public async removeCollaborator(request: {
        owner: string;
        repo: string;
        username: string;
    }): Promise<boolean> {
        const result = await this.clientInstance.rest.repos.removeCollaborator(
            request
        );
        return result.status === 204;
    }
}
