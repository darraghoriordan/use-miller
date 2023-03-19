/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    InvitationsApi,
    ApplicationSupportApi,
    OrganisationsApi,
} from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "./commonDataModels/AuthenticationTokenManager";

describe("When inviting users", () => {
    const applicationSupportApi = ApiClientFactory.getAuthenticatedApiInstance(
        ApplicationSupportApi,
        TestUserAccounts.SUPER_USER
    );
    const orgsApi = ApiClientFactory.getAuthenticatedApiInstance(
        OrganisationsApi,
        TestUserAccounts.SUPER_USER
    );
    const invitationsApi = ApiClientFactory.getAuthenticatedApiInstance(
        InvitationsApi,
        TestUserAccounts.SUPER_USER
    );

    it("Super user has an account with an organisation", async () => {
        const response =
            await applicationSupportApi.appControllerGetHelloSuperAdmin();
        expect(response).toEqual("Healthy and running");

        const orgs = await orgsApi.organisationControllerFindAllForUser();
        expect(orgs.length).toBe(1);
        expect(orgs[0].name).toEqual("Super's Organisation");
    });

    it("can invite a user to join org", async () => {
        const orgs = await orgsApi.organisationControllerFindAllForUser();
        try {
            const createInvResponse =
                await invitationsApi.invitationControllerCreate({
                    createInvitationDto: {
                        emailAddress: "some@email.com",
                        givenName: "NextUser",
                        organisationId: orgs[0].id,
                    },
                });
            expect(createInvResponse.acceptedOn).toBeUndefined();
            expect(createInvResponse.emailAddress).toBe("some@email.com");
            expect(createInvResponse.givenName).toBe("NextUser");
            expect(createInvResponse.uuid).toBeDefined();
            expect(createInvResponse.notificationSent).toBeDefined();
            expect(createInvResponse.expiresOn).toBeDefined();
            expect(createInvResponse.organisationMembership).toBeDefined();
            expect(
                createInvResponse.organisationMembership.roles?.[0]
            ).toMatchObject({
                name: "invited",
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("Cannot invite the same user while existing invite is valid", async () => {
        const orgs = await orgsApi.organisationControllerFindAllForUser();

        await expect(() =>
            invitationsApi.invitationControllerCreate({
                createInvitationDto: {
                    emailAddress: "some@email.com",
                    givenName: "NextUser",
                    organisationId: orgs[0].id,
                },
            })
        ).rejects.toMatchObject({ status: 400, statusText: "Bad Request" });
    });

    it("Cannot accept invite if existing membership of organisation exists", async () => {
        const orgs = await orgsApi.organisationControllerFindAllForUser();
        const invitations =
            await invitationsApi.invitationControllerGetAllForOrg({
                orgId: orgs[0].uuid,
            });
        expect(invitations.length).toBe(1);

        await expect(() =>
            invitationsApi.invitationControllerAccept({
                invitationId: invitations[0].uuid,
            })
        ).rejects.toMatchObject({ status: 400, statusText: "Bad Request" });
    });

    it("Users with non-verified emails are blocked from joining", async () => {
        const orgs = await orgsApi.organisationControllerFindAllForUser();
        const invitations =
            await invitationsApi.invitationControllerGetAllForOrg({
                orgId: orgs[0].uuid,
            });

        // get invitations api client for the non-verified user
        const invitationsApiForNonVerifiedUser =
            ApiClientFactory.getAuthenticatedApiInstance(
                InvitationsApi,
                TestUserAccounts.EMAIL_NOT_VERIFIED_USER
            );

        await expect(() =>
            invitationsApiForNonVerifiedUser.invitationControllerAccept({
                invitationId: invitations[0].uuid,
            })
        ).rejects.toMatchObject({
            status: 400,
            statusText: "Bad Request",
        });
    });

    it("Normal new user can accept invitation", async () => {
        const orgs = await orgsApi.organisationControllerFindAllForUser();
        const invitations =
            await invitationsApi.invitationControllerGetAllForOrg({
                orgId: orgs[0].uuid,
            });

        // get invitations api client for the normal user
        const invitationsApiForNormalUser =
            ApiClientFactory.getAuthenticatedApiInstance(
                InvitationsApi,
                TestUserAccounts.BASIC_USER
            );

        // accept the invitation
        await invitationsApiForNormalUser.invitationControllerAccept({
            invitationId: invitations[0].uuid,
        });
        const postInviteInvitations =
            await invitationsApi.invitationControllerGetAllForOrg({
                orgId: orgs[0].uuid,
            });

        expect(postInviteInvitations.length).toBe(1);
        expect(postInviteInvitations[0].acceptedOn).toBeDefined();
    });

    it("Normal new user cannot invite other users", async () => {
        const orgs = await orgsApi.organisationControllerFindAllForUser();

        // get invitations api client for the normal user
        const invitationsApiForNormalUser =
            ApiClientFactory.getAuthenticatedApiInstance(
                InvitationsApi,
                TestUserAccounts.BASIC_USER
            );

        await expect(() =>
            invitationsApiForNormalUser.invitationControllerCreate({
                createInvitationDto: {
                    emailAddress: "somenewperson@email.com",
                    givenName: "NextUser",
                    organisationId: orgs[0].id,
                },
            })
        ).rejects.toMatchObject({
            status: 403,
            statusText: "Forbidden",
        });
    });

    afterAll(async () => {
        const applicationSupportApi =
            ApiClientFactory.getAuthenticatedApiInstance(
                ApplicationSupportApi,
                TestUserAccounts.SUPER_USER
            );
        await applicationSupportApi.superPowersControllerResetDatabase();
    });
});
