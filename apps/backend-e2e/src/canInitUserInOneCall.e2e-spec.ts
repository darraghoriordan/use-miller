/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When initialising a new user", () => {
    const {
        personApi,
        receivedRolesApi,
        filterSettingsApi,
        sharingLinksApi,
        applicationSupportApi,
    } = ApiClientFactory.getAll();
    afterAll(async () => {
        try {
            void (await receivedRolesApi.receivedOffersControllerDeleteAll());
        } catch {
            /* empty */
        }
        try {
            void (await filterSettingsApi.filterSettingsControllerDeleteAll());
        } catch {
            /* empty */
        }
        try {
            void (await sharingLinksApi.sharingLinksControllerDeleteAll());
        } catch {
            /* empty */
        }
        const person = await personApi.personControllerFindSelf();
        await personApi.personControllerRemove({
            uuid: person.uuid.toString(),
        });
    });
    let sharingLinkId: number;

    it("there are no existing entries for filters or links", async () => {
        await expect(
            filterSettingsApi.filterSettingsControllerGetLatest()
        ).rejects.toThrow();
        await expect(() =>
            sharingLinksApi.sharingLinksControllerGetLatest()
        ).rejects.toThrow();
    });

    it("I can init the user", async () => {
        const response = await applicationSupportApi.appControllerInitUser();

        expect(response.userWasInitialised).toEqual(true);
    });

    it("the filter and link were generated", async () => {
        const filterResponse =
            await filterSettingsApi.filterSettingsControllerGetLatest();
        const linksResponse =
            await sharingLinksApi.sharingLinksControllerGetLatest();

        expect(filterResponse.length).toBeGreaterThan(0);
        expect(linksResponse.id).toBeDefined();

        sharingLinkId = linksResponse.id;
    });

    it("I can init the user again", async () => {
        const response = await applicationSupportApi.appControllerInitUser();

        expect(response.userWasInitialised).toEqual(false);
    });

    it("the same ids are returned (new entities were not created)", async () => {
        const linksResponse =
            await sharingLinksApi.sharingLinksControllerGetLatest();

        expect(linksResponse.id).toEqual(sharingLinkId);
    });
});
