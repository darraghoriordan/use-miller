import {
    getAuthenticatedApiInstance,
    throwIfError,
    type ApiClient,
} from "../commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "../commonDataModels/AuthenticationTokenManager";

describe("When inviting users", () => {
    const superUserApi: ApiClient = getAuthenticatedApiInstance(
        TestUserAccounts.SUPER_USER,
    );

    it("Super user has an account with an organisation", async () => {
        const { data: response, error } = await superUserApi.GET(
            "/admin/health/is-super-admin",
        );
        throwIfError(error);
        expect(response).toEqual("Healthy and running");

        const { data: orgs, error: orgsError } =
            await superUserApi.GET("/organisation");
        throwIfError(orgsError);
        expect(orgs.length).toBe(1);
        expect(orgs[0].name).toEqual("Super's Organisation");
    });

    it("can invite a user to join org", async () => {
        const { data: orgs, error: orgsError } =
            await superUserApi.GET("/organisation");
        throwIfError(orgsError);
        try {
            const { data: createInvResponse, error } = await superUserApi.POST(
                "/invitations",
                {
                    body: {
                        emailAddress: "some@email.com",
                        givenName: "NextUser",
                        organisationId: orgs[0].id,
                    },
                },
            );
            throwIfError(error);
            expect(createInvResponse.acceptedOn).toBeUndefined();
            expect(createInvResponse.emailAddress).toBe("some@email.com");
            expect(createInvResponse.givenName).toBe("NextUser");
            expect(createInvResponse.uuid).toBeDefined();
            expect(createInvResponse.notificationSent).toBeDefined();
            expect(createInvResponse.expiresOn).toBeDefined();
            expect(createInvResponse.organisationMembership).toBeDefined();
            expect(
                createInvResponse.organisationMembership.roles?.[0],
            ).toMatchObject({
                name: "invited",
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("Cannot invite the same user while existing invite is valid", async () => {
        const { data: orgs, error: orgsError } =
            await superUserApi.GET("/organisation");
        throwIfError(orgsError);

        const { response } = await superUserApi.POST("/invitations", {
            body: {
                emailAddress: "some@email.com",
                givenName: "NextUser",
                organisationId: orgs[0].id,
            },
        });
        expect(response.status).toBe(400);
        expect(response.statusText).toBe("Bad Request");
    });

    it("Cannot accept invite if existing membership of organisation exists", async () => {
        const { data: orgs, error: orgsError } =
            await superUserApi.GET("/organisation");
        throwIfError(orgsError);
        const { data: invitations, error: invError } = await superUserApi.GET(
            "/invitations/{orgId}",
            {
                params: { path: { orgId: orgs[0].uuid } },
            },
        );
        throwIfError(invError);
        expect(invitations.length).toBe(1);

        const { response } = await superUserApi.POST("/invitations/accept", {
            params: { query: { invitationId: invitations[0].uuid } },
        });
        expect(response.status).toBe(400);
        expect(response.statusText).toBe("Bad Request");
    });

    it("Users with non-verified emails are blocked from joining", async () => {
        const { data: orgs, error: orgsError } =
            await superUserApi.GET("/organisation");
        throwIfError(orgsError);
        const { data: invitations, error: invError } = await superUserApi.GET(
            "/invitations/{orgId}",
            {
                params: { path: { orgId: orgs[0].uuid } },
            },
        );
        throwIfError(invError);

        // get invitations api client for the non-verified user
        const nonVerifiedUserApi: ApiClient = getAuthenticatedApiInstance(
            TestUserAccounts.EMAIL_NOT_VERIFIED_USER,
        );

        const { response } = await nonVerifiedUserApi.POST(
            "/invitations/accept",
            {
                params: { query: { invitationId: invitations[0].uuid } },
            },
        );
        expect(response.status).toBe(400);
        expect(response.statusText).toBe("Bad Request");
    });

    it("Normal new user can accept invitation", async () => {
        const { data: orgs, error: orgsError } =
            await superUserApi.GET("/organisation");
        throwIfError(orgsError);
        const { data: invitations, error: invError } = await superUserApi.GET(
            "/invitations/{orgId}",
            {
                params: { path: { orgId: orgs[0].uuid } },
            },
        );
        throwIfError(invError);

        // get invitations api client for the normal user
        const normalUserApi: ApiClient = getAuthenticatedApiInstance(
            TestUserAccounts.BASIC_USER,
        );

        // accept the invitation
        const { error: acceptError } = await normalUserApi.POST(
            "/invitations/accept",
            {
                params: { query: { invitationId: invitations[0].uuid } },
            },
        );
        throwIfError(acceptError);

        const { data: postInviteInvitations, error: postInvError } =
            await superUserApi.GET("/invitations/{orgId}", {
                params: { path: { orgId: orgs[0].uuid } },
            });
        throwIfError(postInvError);

        expect(postInviteInvitations.length).toBe(1);
        expect(postInviteInvitations[0].acceptedOn).toBeDefined();
    });

    it("Normal new user cannot invite other users", async () => {
        const { data: orgs, error: orgsError } =
            await superUserApi.GET("/organisation");
        throwIfError(orgsError);

        // get invitations api client for the normal user
        const normalUserApi: ApiClient = getAuthenticatedApiInstance(
            TestUserAccounts.BASIC_USER,
        );

        const { response } = await normalUserApi.POST("/invitations", {
            body: {
                emailAddress: "somenewperson@email.com",
                givenName: "NextUser",
                organisationId: orgs[0].id,
            },
        });
        expect(response.status).toBe(403);
        expect(response.statusText).toBe("Forbidden");
    });

    it("Invited users membership can be removed", async () => {
        const { data: orgs, error: orgsError } =
            await superUserApi.GET("/organisation");
        throwIfError(orgsError);
        const { data: memberships, error: memError } = await superUserApi.GET(
            "/organisation/{orgUuid}/memberships",
            {
                params: { path: { orgUuid: orgs[0].uuid } },
            },
        );
        throwIfError(memError);
        const nonOwner = memberships.filter((m) =>
            m.roles?.some((r) => r.name !== "owner"),
        );
        if (nonOwner.length !== 1) {
            //unexpected
            throw new Error("Unexpected number of non-owner memberships");
        }
        const { data: isRemoved, error: removeError } =
            await superUserApi.DELETE(
                "/organisation/{orgUuid}/memberships/{membershipUuid}",
                {
                    params: {
                        path: {
                            orgUuid: orgs[0].uuid,
                            membershipUuid: nonOwner[0].uuid,
                        },
                    },
                },
            );
        throwIfError(removeError);
        expect(isRemoved).toStrictEqual({ result: true });
    });
});
