/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */

import { QuestionCategory } from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

import DefaultNewUserFilterSettings from "./commonDataModels/DefaultNewUserFilterSettings";
import { validOfferSubmission } from "./commonDataModels/validOfferSubmission";

describe("When filtering on culture", () => {
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

    // eslint-disable-next-line jest/expect-expect
    it("I can turn on learning time setting", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutMinimumLearningTimePercentPerMonth =
            true;

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

    // culture details
    it("attempting to submit offer with low learning time fails", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.learningTimePercentPerMonth = 1;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(1);
        expect(failedSections[0].category).toBe(QuestionCategory.Culture);
    });

    it("attempting to submit offer with high learning time passes", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.learningTimePercentPerMonth = 99;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(0);
    });

    // eslint-disable-next-line jest/expect-expect
    it("I can turn OFF learning time setting", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutMinimumLearningTimePercentPerMonth =
            false;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit offer with low learning time passes", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.learningTimePercentPerMonth = 1;

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
