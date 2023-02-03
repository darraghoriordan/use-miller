import {
    FilterSettingDto,
    JobResponsibility,
    RemoteAllowance,
    CompanyAudience,
    CompanyFunding,
    ApplicantRole,
} from "@use-miller/shared-api-client";

// eslint-disable-next-line unicorn/no-static-only-class
export default class DefaultNewUserFilterSettings {
    static getDefault = (): FilterSettingDto => ({
        // basics
        applicantRole: ApplicantRole.DONT_CARE,
        // salary
        minimumSalary: 120_000,
        minimumTotalCompensation: 120_000,
        mustIncludeSuper: true,
        mustProvidesSomeMedicalBenefit: false,
        // Role
        primaryResponsibility: JobResponsibility.INDIVIDUAL_CONTRIBUTOR,
        remoteAllowance: RemoteAllowance.PARTIAL_WEEK_REMOTE_IN_CITY,

        // Culture
        minimumLearningTimePercentPerMonth: 10,

        rejectIfOvertimeExpected: false,
        mustBeFamilyFriendly: false,

        // Diversity
        requireActiveDiversityProgram: true,

        // Company
        companyAudience: CompanyAudience.DONT_CARE,
        companyFunding: CompanyFunding.DONT_CARE,
        rejectIfMustSignNonCompete: false,
        // meta
        lodgementsAllowedPerDay: 2,
        allowUnlimitedSelfLodgements: false,

        askAboutSalary: true,
        askAboutTotalCompensation: false,
        askAboutIncludeSuper: false,
        askAboutProvidesSomeMedicalBenefit: false,
        askAboutPrimaryResponsibility: false,
        askAboutRemoteAllowance: false,
        askAboutRoleLocation: false,
        askAboutTellMeWho: false,
        askAboutDescribeAPieceOfWork: false,
        askAboutWhyInternalExternal: false,
        askAboutMinimumLearningTimePercentPerMonth: false,
        askMoreAboutLearningTime: false,
        askAboutOngoingChallenges: false,
        askTechnicalPrincipals: false,
        askAboutOvertimeExpected: false,
        askFamilyFriendlyPolicies: false,
        askMoreDetailsAboutFamilyFriendlyEnvironment: false,
        askAboutDiversityProgram: false,
        askMoreAboutDiversity: false,
        askAboutCompanyAudience: false,
        askAboutCompanyFunding: false,
        askAboutCompetitiveAdvantage: false,
        askAboutNonCompete: false,
        askAboutRoleOfSubmitter: false,
        askAboutNameOfCompany: false,
    });
}
