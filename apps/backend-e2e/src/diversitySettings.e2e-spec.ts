/* eslint-disable jest/expect-expect */
import { QuestionCategory } from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import DefaultNewUserFilterSettings from "./commonDataModels/DefaultNewUserFilterSettings";
import { validOfferSubmission } from "./commonDataModels/validOfferSubmission";

describe("When filtering on culture", () => {
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
    let sharingLinkUuid = "";
    it("I can turn on diversity program setting", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutDiversityProgram = true;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("i can generate a link", async () => {
        const response =
            await sharingLinksApi.sharingLinksControllerGenerateNew();

        expect(response.uuid).toBeDefined();
        expect(response.id).toBeDefined();

        sharingLinkUuid = response.uuid;
    });

    it("attempting to submit offer with no diversity program fails", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.hasActiveDiversityProgram = false;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(1);
        expect(failedSections[0].category).toBe(QuestionCategory.Diversity);
    });

    it("attempting to submit offer with diversity program true passes", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.hasActiveDiversityProgram = true;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(0);
    });

    it("I can turn OFF diversity program setting", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutDiversityProgram = false;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit offer with no diversity program passes", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.hasActiveDiversityProgram = false;

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
