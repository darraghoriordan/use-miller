import {
    OfferSubmission,
    ApplicantRole,
    JobResponsibility,
    RemoteAllowance,
    CompanyAudience,
    CompanyFunding,
} from "@use-miller/shared-api-client";

export const validOfferSubmission = (): OfferSubmission => ({
    offerUuid: "",
    applicantName: "Darragh ORiordan",
    applicantRole: ApplicantRole.RECRUITER,

    applicantEmail: "darragh.oriordan@gmail.com",
    roleTitle: "Senior unicorn",
    roleLocation: "Space",
    // The input fields - these will have custom validation for the most part.
    // we always demand a salary though. it's so basic!
    salary: 120_000,
    totalCompensation: 200_000,
    inclusiveOfPension: true,
    providesSomeMedicalBenefit: false,
    // Role Details
    primaryResponsibility: JobResponsibility.INDIVIDUAL_CONTRIBUTOR,
    remoteAllowance: RemoteAllowance.FULLY_REMOTE_IN_COUNTRY,
    tellMeAboutWhoWillIBeWorkingWith: "",
    describeHowAPieceOfWorkGoesFromIdeaToProduct: "",

    // Culture Details
    whyNotFilledInternally: "Growing too fast!",
    learningTimePercentPerMonth: 20,
    isOvertimeExpected: true,
    whatAreSomeOngoingChallengesYouHaveYetToResolve: "",
    isFamilyFriendly: true,
    familyFriendlyTellMeMore: "",
    tellMeAboutTechnicalPrincipalsOrVision: "",

    // Diversity Details
    hasActiveDiversityProgram: true,
    tellMeMoreAboutDiversity: "",
    // Company Details
    companyAudience: CompanyAudience.B_TO_B,

    companyName: "valid company name",
    companyFunding: CompanyFunding.SELF_FUNDED,
    whatIsYourCompetitiveAdvantage: "",
    nonCompeteAgreementRequired: false,
});
