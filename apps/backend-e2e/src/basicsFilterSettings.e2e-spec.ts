import { ApplicantRole, QuestionCategory } from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import DefaultNewUserFilterSettings from "./commonDataModels/DefaultNewUserFilterSettings";
import { validOfferSubmission } from "./commonDataModels/validOfferSubmission";
// eslint-disable-next-line unicorn/import-style
import util from "util";

describe("When filtering on basics", () => {
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
    it("I can turn on the submitter role filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutRoleOfSubmitter = true;
        validFilterSettingModel.applicantRole = ApplicantRole.DONT_CARE;

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

    it("attempting to submit offer when the don't care filter is set, will still pass", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.applicantRole = ApplicantRole.HIRING_MANAGER;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        console.log(util.inspect(failedSections, undefined, 4));
        expect(failedSections.length).toEqual(0);
    });

    it("I can set the submitter role filter to a specific value", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.applicantRole = ApplicantRole.HIRING_MANAGER;
        validFilterSettingModel.askAboutRoleOfSubmitter = true;

        const saveFilterResult =
            await filterSettingsApi.filterSettingsControllerSaveLatest({
                filterSettingDto: validFilterSettingModel,
            });

        expect(saveFilterResult.applicantRole).toBe(
            ApplicantRole.HIRING_MANAGER
        );
    });

    it("attempting to submit offer when a specific filter is set, will fail", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.applicantRole = ApplicantRole.RECRUITER;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });
        console.log("response", util.inspect(response));
        const failedSections = response.questionResultSections.filter(
            (q) => q.didPassAllFilters === false
        );
        expect(failedSections.length).toEqual(1);
        expect(failedSections[0].category).toBe(QuestionCategory.Basics);
    });

    // eslint-disable-next-line jest/expect-expect
    it("I can turn OFF the filter", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.askAboutRoleOfSubmitter = false;

        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("attempting to submit offer with wrong filter setting passes again", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        validOffer.applicantRole = ApplicantRole.RECRUITER;

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
