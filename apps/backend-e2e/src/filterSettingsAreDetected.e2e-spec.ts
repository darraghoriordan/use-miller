/* eslint-disable jest/expect-expect */
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import DefaultNewUserFilterSettings from "./commonDataModels/DefaultNewUserFilterSettings";
import { validOfferSubmission } from "./commonDataModels/validOfferSubmission";

describe("When setting up settings", () => {
    let sharingLinkUuid: string;
    const {
        submittedRolesApi,
        receivedRolesApi,
        filterSettingsApi,
        sharingLinksApi,
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
    });

    afterEach(async () => {
        try {
            void (await receivedRolesApi.receivedOffersControllerDeleteAll());
        } catch {
            /* empty */
        }
    });

    it("I can save a valid setting", async () => {
        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: DefaultNewUserFilterSettings.getDefault(),
        });
    });

    it("i can generate a link", async () => {
        const response =
            await sharingLinksApi.sharingLinksControllerGenerateNew();

        expect(response.uuid).toBeDefined();
        expect(response.id).toBeDefined();

        sharingLinkUuid = response.uuid;
    });

    it("attempting to submit a valid offer works ok", async () => {
        const linkCreation =
            await sharingLinksApi.sharingLinksControllerGenerateNew();

        sharingLinkUuid = linkCreation.uuid;

        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(0);
    });
});
