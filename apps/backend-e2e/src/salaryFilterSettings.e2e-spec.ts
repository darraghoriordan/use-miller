/* eslint-disable jest/expect-expect */
import { QuestionCategory } from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import DefaultNewUserFilterSettings from "./commonDataModels/DefaultNewUserFilterSettings";
import { validOfferSubmission } from "./commonDataModels/validOfferSubmission";

describe("When filtering on salary", () => {
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

    it("I can turn on the salary filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutSalary = true;

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

    it("attempting to submit offer with a low salary fails", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.salary = 200;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(1);
        expect(failedSections[0].category).toBe(QuestionCategory.Compensation);
    });

    it("attempting to submit offer with a passing salary passes OK", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.salary = 200_000;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(0);
    });

    it("I can turn OFF the salary filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutSalary = false;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit offer with a low salary passes", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.salary = 200;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(0);
    });

    it("I can turn on the tc filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutTotalCompensation = true;
        validFilterSettingModel.minimumTotalCompensation = 300;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit offer with a low tc fails", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.totalCompensation = 299;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(1);
        expect(failedSections[0].category).toBe(QuestionCategory.Compensation);
    });

    it("attempting to submit offer with a passing tc passes OK", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.totalCompensation = 300;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(0);
    });

    it("I can turn OFF the tc filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutTotalCompensation = false;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit offer with a low tc passes", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.totalCompensation = 200;

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
