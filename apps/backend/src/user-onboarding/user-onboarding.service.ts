import { Injectable, Logger } from "@nestjs/common";
import { ProductActivationDto } from "./product-activation.dto.js";
import { Repository } from "typeorm";
import { OrgGithubUser } from "./org-github-user.js";
import { InjectRepository } from "@nestjs/typeorm";
import { GithubClientService } from "../course-files/github-client/github-service.js";

@Injectable()
export class UserOnboardingService {
    constructor(
        @InjectRepository(OrgGithubUser)
        private readonly orgGhUserRepo: Repository<OrgGithubUser>,
        private ghService: GithubClientService
    ) {}
    private readonly logger = new Logger(UserOnboardingService.name);

    public async updateGithubAccess(
        event: ProductActivationDto
    ): Promise<void> {
        this.logger.debug(
            {
                event,
            },
            "Handling queued item"
        );
        // check the customer has access to the product(s)
        const orgGhUsers = await this.orgGhUserRepo.find({
            where: {
                orgUuid: event.organisationUuid,
            },
        });
        // ensure access has been granted or removed
        const requests = this.mapRepoRequests(
            event.productKey,
            orgGhUsers.map((u) => u.ghUsername)
        );

        for (const r of requests) {
            const isCollaborator = await this.ghService.checkCollaborator(r);

            if (event.active && !isCollaborator) {
                await this.ghService.addCollaborator(r);
            }

            if (!event.active && isCollaborator) {
                await this.ghService.removeCollaborator(r);
            }
        }
    }

    private mapRepoRequests(
        productKey: string,
        usernames: string[]
    ): {
        owner: string;
        repo: string;
        username: string;
    }[] {
        const result = [];
        switch (productKey) {
            case "miller-start": {
                for (const u of usernames) {
                    result.push(
                        {
                            owner: "darraghoriordan",
                            repo: "nest-backend-libs",
                            username: u,
                        },
                        {
                            owner: "darraghoriordan",
                            repo: "use-miller",
                            username: u,
                        }
                    );
                }
                break;
            }
            case "dev-shell": {
                for (const u of usernames) {
                    result.push({
                        owner: "darraghoriordan",
                        repo: "mac-setup-scripts",
                        username: u,
                    });
                }
                break;
            }
            default: {
                break;
            }
        }
        return result;
    }
}
