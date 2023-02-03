/* eslint-disable sonarjs/no-duplicate-string */
import request from "supertest";

import { validOfferSubmission } from "./commonDataModels/validOfferSubmission";
import DefaultNewUserFilterSettings from "./commonDataModels/DefaultNewUserFilterSettings";
import { WellKnownUrls } from "./commonDataModels/WellKnownUrls";

import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When submitting offers", () => {
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

    it("there are no existing entries", async () => {
        const response =
            await receivedRolesApi.receivedOffersControllerGetAll();

        expect(response.length).toBe(0);
    });

    it("I can save a valid setting", async () => {
        const response =
            await filterSettingsApi.filterSettingsControllerSaveLatest({
                filterSettingDto: DefaultNewUserFilterSettings.getDefault(),
            });

        expect(response.applicantRole).toBe(
            DefaultNewUserFilterSettings.getDefault().applicantRole
        );
    });

    it("i can generate a new link", async () => {
        const response =
            await sharingLinksApi.sharingLinksControllerGenerateNew();

        expect(response.uuid).toBeDefined();
        expect(response.id).toBeDefined();

        sharingLinkUuid = response.uuid;
    });

    it("i can validate a link is suitable for use", async () => {
        await request(process.env.TEST_API_URL)
            .get(WellKnownUrls.offerLinksValidate())
            .set("content-type", "application/json")
            .query({ linkUuid: sharingLinkUuid })
            .expect(200);
    });

    it("i can invalidate a link by creating a new link", async () => {
        // create new link but don't update the shared variable
        const regenerateResponse =
            await sharingLinksApi.sharingLinksControllerGenerateNew();

        expect(regenerateResponse.uuid).toBeDefined();
        expect(regenerateResponse.id).toBeDefined();

        await request(process.env.TEST_API_URL)
            .get(WellKnownUrls.offerLinksValidate())
            .set("content-type", "application/json")
            .query({ linkUuid: sharingLinkUuid })
            .expect(400);
    });

    it("attempting to submit an offer without authentication fails", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        await request(process.env.TEST_API_URL)
            .post(WellKnownUrls.submittedRoles())
            .set("content-type", "application/json")
            .send(validOffer)
            .expect(401);
    });

    it("attempting to submit offer with an old invalid link fails", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;
        return expect(() =>
            submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            })
        ).rejects.toMatchObject({ status: 400 });
    });

    it("attempting to submit an offer with a valid link works ok", async () => {
        // set a new valid link id to the shared variable
        const linkCreation =
            await sharingLinksApi.sharingLinksControllerGenerateNew();
        sharingLinkUuid = linkCreation.uuid;

        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;

        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });

        expect(
            response.questionResultSections.every(
                (x) => x.didPassAllFilters === true
            )
        ).toBe(true);
    });

    it("attempting to submit three offers fails because of the limit", async () => {
        const validOffer = validOfferSubmission();
        validOffer.offerUuid = sharingLinkUuid;

        // submit the second offer
        const response =
            await submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            });

        expect(
            response.questionResultSections.every(
                (x) => x.didPassAllFilters === true
            )
        ).toBe(true);

        // the third offer should fail
        return expect(() =>
            submittedRolesApi.submittedOffersControllerSaveOffer({
                offerSubmission: validOffer,
            })
        ).rejects.toThrow();
    });

    it("confirm that i have two received offers now", async () => {
        const response =
            await receivedRolesApi.receivedOffersControllerGetAll();

        expect(response.length).toEqual(2);
        expect(
            response.some((x) =>
                x.questionResultSections.some(
                    (x) => x.didPassAllFilters === true
                )
            )
        ).toBeTruthy();
        expect(
            response.some((x) =>
                x.questionResultSections.every(
                    (x) => x.didPassAllFilters === false
                )
            )
        ).toBeTruthy();
    });
});
