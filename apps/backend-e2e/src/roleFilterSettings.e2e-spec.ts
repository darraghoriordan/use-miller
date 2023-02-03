/* eslint-disable jest/expect-expect */
import {
    JobResponsibility,
    QuestionCategory,
    RemoteAllowance,
} from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import DefaultNewUserFilterSettings from "./commonDataModels/DefaultNewUserFilterSettings";
import { validOfferSubmission } from "./commonDataModels/validOfferSubmission";

describe("When filtering on role", () => {
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

    it("I can turn on the job responsibility filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutPrimaryResponsibility = true;

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

    it("attempting to submit offer with wrong job responsibility fails", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.primaryResponsibility = JobResponsibility.PEOPLE_LEADER;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(1);
        expect(failedSections[0].category).toBe(QuestionCategory.Role);
    });

    it("I can turn OFF the job responsibility filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutPrimaryResponsibility = false;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit default offer passes", async () => {
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

    it("I can turn on the remote allowance filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutRemoteAllowance = true;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit offer with less remote allowance fails", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.remoteAllowance = RemoteAllowance.NO_REMOTE;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(1);
        expect(failedSections[0].category).toBe(QuestionCategory.Role);
    });

    it("attempting to submit offer with more remote allowance is success", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.remoteAllowance = RemoteAllowance.REMOTE_WORLDWIDE;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(0);
    });

    it("I can turn OFF the remote allowance filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutRemoteAllowance = false;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit offer with less remote allowance passes", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.remoteAllowance = RemoteAllowance.NO_REMOTE;

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
