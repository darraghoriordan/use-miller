/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
} from "@nestjs/common";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock TypeORM decorators to avoid entity initialization issues
vi.mock("typeorm", async (importOriginal) => {
    const original = await importOriginal<typeof import("typeorm")>();
    return {
        ...original,
        Entity: () => () => {},
        Column: () => () => {},
        PrimaryGeneratedColumn: () => () => {},
        CreateDateColumn: () => () => {},
        UpdateDateColumn: () => () => {},
    };
});

vi.mock("@nestjs/swagger", () => ({
    ApiProperty: () => () => {},
    ApiPropertyOptional: () => () => {},
}));

vi.mock("@nestjs/typeorm", () => ({
    InjectRepository: () => () => {},
}));

// Helper to create mock RequestUser
const createMockRequestUser = (orgUuid: string, isOwner = true) => ({
    uuid: "user-uuid-123",
    email: "test@test.com",
    memberships: [
        {
            organisation: { uuid: orgUuid, name: "Test Org" },
            roles: isOwner ? [{ name: "owner" }] : [{ name: "member" }],
        },
    ],
});

// Mock repository factory
const createMockOrgGhUserRepo = () => ({
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
});

const createMockOrgSubscriptionRepo = () => ({
    find: vi.fn(),
});

const createMockGhService = () => ({
    checkUserExists: vi.fn(),
    checkCollaborator: vi.fn(),
    addCollaborator: vi.fn(),
    removeCollaborator: vi.fn(),
});

// Import service after mocks are set up
const { UserOnboardingService } = await import("./user-onboarding.service.js");

describe("UserOnboardingService", () => {
    let service: InstanceType<typeof UserOnboardingService>;
    let mockOrgGhUserRepo: ReturnType<typeof createMockOrgGhUserRepo>;
    let mockOrgSubscriptionRepo: ReturnType<
        typeof createMockOrgSubscriptionRepo
    >;
    let mockGhService: ReturnType<typeof createMockGhService>;

    beforeEach(() => {
        mockOrgGhUserRepo = createMockOrgGhUserRepo();
        mockOrgSubscriptionRepo = createMockOrgSubscriptionRepo();
        mockGhService = createMockGhService();

        service = new UserOnboardingService(
            mockOrgGhUserRepo as any,
            mockOrgSubscriptionRepo as any,
            mockGhService as any,
        );
    });

    describe("addOrgGithubUser", () => {
        const orgUuid = "org-uuid-123";

        it("should throw ForbiddenException if user is not org owner", async () => {
            const nonOwnerUser = createMockRequestUser(orgUuid, false);
            const request = { ghUsername: "testuser", orgUuid };

            await expect(
                 
                service.addOrgGithubUser(request, nonOwnerUser as any),
            ).rejects.toThrow(ForbiddenException);
        });

        it("should throw ForbiddenException if org already has a github user", async () => {
            const ownerUser = createMockRequestUser(orgUuid, true);
            const request = { ghUsername: "testuser", orgUuid };

            mockOrgGhUserRepo.find.mockResolvedValue([
                { id: 1, ghUsername: "existinguser" },
            ]);

            await expect(
                 
                service.addOrgGithubUser(request, ownerUser as any),
            ).rejects.toThrow(ForbiddenException);
        });

        it("should throw BadRequestException if GitHub user does not exist", async () => {
            const ownerUser = createMockRequestUser(orgUuid, true);
            const request = { ghUsername: "nonexistentuser", orgUuid };

            mockOrgGhUserRepo.find.mockResolvedValue([]);
            mockGhService.checkUserExists.mockResolvedValue(false);

            await expect(
                 
                service.addOrgGithubUser(request, ownerUser as any),
            ).rejects.toThrow(BadRequestException);
        });

        it("should normalize username to lowercase", async () => {
            const ownerUser = createMockRequestUser(orgUuid, true);
            const request = { ghUsername: "TestUser", orgUuid };

            mockOrgGhUserRepo.find.mockResolvedValue([]);
            mockGhService.checkUserExists.mockResolvedValue(true);
            mockOrgGhUserRepo.create.mockImplementation((data) => data);
            mockOrgGhUserRepo.save.mockImplementation((entity) =>
                Promise.resolve(entity),
            );
            mockOrgSubscriptionRepo.find.mockResolvedValue([]);

             
            await service.addOrgGithubUser(request, ownerUser as any);

            expect(mockOrgGhUserRepo.create).toHaveBeenCalledWith({
                ghUsername: "testuser",
                orgUuid,
            });
        });

        it("should grant access to existing subscriptions after adding user", async () => {
            const ownerUser = createMockRequestUser(orgUuid, true);
            const request = { ghUsername: "testuser", orgUuid };

            mockOrgGhUserRepo.find
                .mockResolvedValueOnce([]) // First call: check for existing user
                .mockResolvedValueOnce([{ ghUsername: "testuser" }]); // Second call: in updateGithubAccess
            mockGhService.checkUserExists.mockResolvedValue(true);
            mockOrgGhUserRepo.create.mockImplementation((data) => data);
            mockOrgGhUserRepo.save.mockImplementation((entity) =>
                Promise.resolve(entity),
            );
            mockOrgSubscriptionRepo.find.mockResolvedValue([
                {
                    internalSku: "miller-start",
                    validUntil: new Date(Date.now() + 86400000),
                },
            ]);
            mockGhService.checkCollaborator.mockResolvedValue(false);
            mockGhService.addCollaborator.mockResolvedValue(undefined);

             
            await service.addOrgGithubUser(request, ownerUser as any);

            expect(mockGhService.addCollaborator).toHaveBeenCalled();
        });
    });

    describe("removeOrgGithubUserById", () => {
        const orgUuid = "org-uuid-123";
        const ghUserId = 42;

        it("should throw ForbiddenException if user is not org owner", async () => {
            const nonOwnerUser = createMockRequestUser(orgUuid, false);

            await expect(
                service.removeOrgGithubUserById(
                    orgUuid,
                    ghUserId,
                    nonOwnerUser as any,
                ),
            ).rejects.toThrow(ForbiddenException);
        });

        it("should throw NotFoundException if github user not found", async () => {
            const ownerUser = createMockRequestUser(orgUuid, true);

            mockOrgGhUserRepo.findOne.mockResolvedValue(null);

            await expect(
                service.removeOrgGithubUserById(
                    orgUuid,
                    ghUserId,
                    ownerUser as any,
                ),
            ).rejects.toThrow(NotFoundException);
        });

        it("should remove user and revoke access to repos", async () => {
            const ownerUser = createMockRequestUser(orgUuid, true);
            const existingUser = {
                id: ghUserId,
                ghUsername: "testuser",
                orgUuid,
            };

            mockOrgGhUserRepo.findOne.mockResolvedValue(existingUser);
            mockOrgGhUserRepo.remove.mockResolvedValue(existingUser);
            mockOrgSubscriptionRepo.find.mockResolvedValue([
                {
                    internalSku: "miller-start",
                    validUntil: new Date(Date.now() + 86400000),
                },
            ]);
            mockGhService.checkCollaborator.mockResolvedValue(true);
            mockGhService.removeCollaborator.mockResolvedValue(true);

            const result = await service.removeOrgGithubUserById(
                orgUuid,
                ghUserId,
                ownerUser as any,
            );

            expect(result).toEqual({ result: true });
            expect(mockOrgGhUserRepo.remove).toHaveBeenCalledWith(existingUser);
            expect(mockGhService.removeCollaborator).toHaveBeenCalled();
        });
    });

    describe("updateGithubAccess", () => {
        const orgUuid = "org-uuid-123";

        it("should return early if no github users for org", async () => {
            mockOrgGhUserRepo.find.mockResolvedValue([]);

            await service.updateGithubAccess({
                productKey: "miller-start",
                organisationUuid: orgUuid,
                isActive: true,
            });

            expect(mockGhService.checkCollaborator).not.toHaveBeenCalled();
        });

        it("should return early if product key is unknown", async () => {
            mockOrgGhUserRepo.find.mockResolvedValue([
                { ghUsername: "testuser" },
            ]);

            await service.updateGithubAccess({
                productKey: "unknown-product",
                organisationUuid: orgUuid,
                isActive: true,
            });

            expect(mockGhService.checkCollaborator).not.toHaveBeenCalled();
        });

        it("should add collaborator for miller-start when isActive is true", async () => {
            mockOrgGhUserRepo.find.mockResolvedValue([
                { ghUsername: "testuser" },
            ]);
            mockGhService.checkCollaborator.mockResolvedValue(false);

            await service.updateGithubAccess({
                productKey: "miller-start",
                organisationUuid: orgUuid,
                isActive: true,
            });

            // miller-start maps to 2 repos
            expect(mockGhService.addCollaborator).toHaveBeenCalledTimes(2);
            expect(mockGhService.addCollaborator).toHaveBeenCalledWith({
                owner: "darraghoriordan",
                repo: "nest-backend-libs",
                username: "testuser",
            });
            expect(mockGhService.addCollaborator).toHaveBeenCalledWith({
                owner: "darraghoriordan",
                repo: "use-miller",
                username: "testuser",
            });
        });

        it("should remove collaborator when isActive is false and user is collaborator", async () => {
            mockOrgGhUserRepo.find.mockResolvedValue([
                { ghUsername: "testuser" },
            ]);
            mockGhService.checkCollaborator.mockResolvedValue(true);

            await service.updateGithubAccess({
                productKey: "miller-start",
                organisationUuid: orgUuid,
                isActive: false,
            });

            expect(mockGhService.removeCollaborator).toHaveBeenCalledTimes(2);
        });

        it("should handle dev-shell product key correctly", async () => {
            mockOrgGhUserRepo.find.mockResolvedValue([
                { ghUsername: "testuser" },
            ]);
            mockGhService.checkCollaborator.mockResolvedValue(false);

            await service.updateGithubAccess({
                productKey: "dev-shell",
                organisationUuid: orgUuid,
                isActive: true,
            });

            expect(mockGhService.addCollaborator).toHaveBeenCalledTimes(1);
            expect(mockGhService.addCollaborator).toHaveBeenCalledWith({
                owner: "darraghoriordan",
                repo: "mac-setup-scripts",
                username: "testuser",
            });
        });
    });
});
