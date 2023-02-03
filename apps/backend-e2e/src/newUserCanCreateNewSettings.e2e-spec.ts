/* eslint-disable jest/expect-expect */
import { QuestionCategory } from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import DefaultNewUserFilterSettings from "./commonDataModels/DefaultNewUserFilterSettings";

describe("When setting up settings", () => {
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

    it("there are no existing settings", async () => {
        return expect(() =>
            filterSettingsApi.filterSettingsControllerGetLatest()
        ).rejects.toMatchObject({ status: 404 });
    });

    it("Validation fails to save my first setting", async () => {
        const settings = DefaultNewUserFilterSettings.getDefault();
        settings.minimumSalary = -100;

        await expect(() =>
            filterSettingsApi.filterSettingsControllerSaveLatestRaw({
                filterSettingDto: settings,
            })
        ).rejects.toMatchObject({ status: 400 });
    });

    it("can save my first valid setting", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.minimumSalary = 100_000;
        await filterSettingsApi.filterSettingsControllerSaveLatest({
            filterSettingDto: validFilterSettingModel,
        });
    });

    it("there is now a setting", async () => {
        const response =
            await filterSettingsApi.filterSettingsControllerGetLatest();
        const compSection = response.find(
            (q) => q.category === QuestionCategory.Compensation
        );
        const salaryQuestion = compSection?.questions.find(
            (x) => x.questionKey === "minimumSalary"
        );
        expect(salaryQuestion?.filterValue).toBe(100_000);
    });

    it("can update and save settings", async () => {
        const validFilterSettingModel =
            DefaultNewUserFilterSettings.getDefault();
        validFilterSettingModel.minimumSalary = 800_000;
        const saveSettings =
            await filterSettingsApi.filterSettingsControllerSaveLatest({
                filterSettingDto: validFilterSettingModel,
            });

        expect(saveSettings.minimumSalary).toBe(800_000);

        const response =
            await filterSettingsApi.filterSettingsControllerGetLatest();
        const compSection = response.find(
            (q) => q.category === QuestionCategory.Compensation
        );
        const salaryQuestion = compSection?.questions.find(
            (x) => x.questionKey === "minimumSalary"
        );
        expect(salaryQuestion?.filterValue).toBe(800_000);
    });
});
