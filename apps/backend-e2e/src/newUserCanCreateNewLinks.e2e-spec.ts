import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When setting up links", () => {
    const { receivedRolesApi, filterSettingsApi, sharingLinksApi } =
        ApiClientFactory.getAll();

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
    });

    it("there are no links", async () => {
        const response = await sharingLinksApi.sharingLinksControllerGetAll();

        expect(response.length).toBe(0);
    });

    it("i can generate a link", async () => {
        const response =
            await sharingLinksApi.sharingLinksControllerGenerateNew();

        expect(response.uuid).toBeDefined();
        expect(response.id).toBeDefined();
    });

    it("there is a link now", async () => {
        const response = await sharingLinksApi.sharingLinksControllerGetAll();

        expect(response.length).toBe(1);
        expect(response[0].uuid).toBeDefined();
    });

    it("i can generate another link", async () => {
        const response =
            await sharingLinksApi.sharingLinksControllerGenerateNew();

        expect(response.uuid).toBeDefined();
        expect(response.id).toBeDefined();

        const getResponse =
            await sharingLinksApi.sharingLinksControllerGetAll();

        expect(getResponse.length).toBe(2);
    });
});
