import {
    ForbiddenException,
    Injectable,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { MoreThan, Repository } from "typeorm";
import { OrgGithubUser } from "./org-github-user.js";
import { InjectRepository } from "@nestjs/typeorm";
import { GithubClientService } from "../course-files/github-client/github-service.js";
import { OrgGithubUserDto } from "./orgGhUser.dto.js";
import {
    OrganisationSubscriptionRecord,
    RequestUser,
} from "@darraghor/nest-backend-libs";

@Injectable()
export class UserOnboardingService {
    constructor(
        @InjectRepository(OrgGithubUser)
        private readonly orgGhUserRepo: Repository<OrgGithubUser>,
        @InjectRepository(OrganisationSubscriptionRecord)
        private readonly orgSubscriptionRepo: Repository<OrganisationSubscriptionRecord>,
        private ghService: GithubClientService
    ) {}
    private readonly logger = new Logger(UserOnboardingService.name);

    public async get(
        orgUuid: string,
        currentUser: RequestUser
    ): Promise<OrgGithubUser[]> {
        this.isOwner(currentUser, orgUuid);
        return this.orgGhUserRepo.find({
            where: {
                orgUuid: orgUuid,
            },
        });
    }

    public async addOrgGithubUser(
        request: OrgGithubUserDto,
        currentUser: RequestUser
    ): Promise<OrgGithubUser> {
        // check the user is an owner of the org
        this.isOwner(currentUser, request.orgUuid);
        const existing = await this.orgGhUserRepo.find({
            where: {
                orgUuid: request.orgUuid,
            },
        });
        if (existing.length > 0) {
            throw new ForbiddenException(
                "You have already added a github user to this organisation. Contact support to change"
            );
        }
        const ghUserEntity = this.orgGhUserRepo.create(request);
        const savedGhUser = await this.orgGhUserRepo.save(ghUserEntity);
        // what about existing product subs?
        const existingSubs = await this.orgSubscriptionRepo.find({
            where: {
                validUntil: MoreThan(new Date()),
                organisation: {
                    uuid: request.orgUuid,
                },
            },
        });
        for (const sub of existingSubs) {
            await this.updateGithubAccess({
                productKey: sub.internalSku,
                organisationUuid: request.orgUuid,
                isActive: true,
            });
        }

        return savedGhUser;
    }

    public async removeOrgGithubUser(
        request: OrgGithubUserDto,
        currentUser: RequestUser
    ): Promise<OrgGithubUser> {
        // check the user is an owner of the org
        this.isOwner(currentUser, request.orgUuid);
        const existing = await this.orgGhUserRepo.find({
            where: {
                orgUuid: request.orgUuid,
                ghUsername: request.ghUsername,
            },
        });
        if (existing.length === 0) {
            throw new NotFoundException(
                "Couldn't find the github user you are trying to remove. Contact support to change"
            );
        }

        const removedUser = await this.orgGhUserRepo.remove(existing[0]);
        // what about existing product subs?
        const existingSubs = await this.orgSubscriptionRepo.find({
            where: {
                validUntil: MoreThan(new Date()),
                organisation: {
                    uuid: request.orgUuid,
                },
            },
        });
        for (const sub of existingSubs) {
            await this.updateGithubAccess({
                productKey: sub.internalSku,
                organisationUuid: request.orgUuid,
                isActive: false,
            });
        }

        return removedUser;
    }

    public async updateGithubAccess(accessRequest: {
        productKey: string;
        organisationUuid: string;
        isActive: boolean;
    }): Promise<void> {
        this.logger.debug(
            {
                event,
            },
            "Handling queued item"
        );
        // check the customer has access to the product(s)
        const orgGhUsers = await this.orgGhUserRepo.find({
            where: {
                orgUuid: accessRequest.organisationUuid,
            },
        });
        // ensure access has been granted or removed
        const requests = this.mapRepoRequests(
            accessRequest.productKey,
            orgGhUsers.map((u) => u.ghUsername)
        );

        for (const r of requests) {
            const isCollaborator = await this.ghService.checkCollaborator(r);

            if (accessRequest.isActive && !isCollaborator) {
                await this.ghService.addCollaborator(r);
            }

            if (!accessRequest.isActive && isCollaborator) {
                await this.ghService.removeCollaborator(r);
            }
        }
    }

    private isOwner(currentUser: RequestUser, orgUuid: string) {
        const isOwner = currentUser.memberships?.some(
            (m) =>
                m.organisation.uuid === orgUuid &&
                m.roles?.some((r) => r.name === "owner")
        );
        this.logger.debug({ currentUser }, "Adding github user to org");
        if (!isOwner) {
            throw new ForbiddenException(
                "You must be the organisation owner to add a github user"
            );
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
