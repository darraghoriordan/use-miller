import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ApiError from "../api/ApiError";
import ApiLoading from "../api/ApiLoading";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import useGetSubmitOfferQuestions from "./useGetSubmitOfferQuestions";
import useSaveOffer from "./useSaveOffer";
import { useAuth0 } from "@auth0/auth0-react";

import {
    ApplicantRole,
    CompanyAudience,
    CompanyFunding,
    JobResponsibility,
    RemoteAllowance,
} from "@use-miller/shared-api-client";
import DynamicSubmitField from "./DynamicSubmitField";

type RequestParams = {
    offerId: string;
};

const SubmitOffer = (): JSX.Element => {
    let { offerId } = useParams<RequestParams>();
    const { data: offerSettings, status } = useGetSubmitOfferQuestions(
        offerId || ""
    );

    const { isAuthenticated, user, loginWithRedirect } = useAuth0();

    const submitOfferMutation = useSaveOffer();
    const [formSubmitting, toggleSubmitting] = useState(false);
    if (submitOfferMutation) {
        console.log("submitState", submitOfferMutation);
    }
    if (!offerId) {
        return <ApiLoading />;
    }

    const authenticationStateChanges = isAuthenticated
        ? {
              email: user!.email,
              name: user!.name,
              signupMessage: null,
              disableSaveButton: false,
          }
        : {
              email: "",
              name: "",
              signupMessage: (
                  <div className="">
                      {" "}
                      <p className="my-4">
                          You must create an account to submit a job to this
                          candidate. This helps us protect candidates from spam
                          and enables us to send you the report afterwards.
                      </p>
                      <button
                          className="inline-flex self-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                          onClick={() =>
                              loginWithRedirect({
                                  appState: {
                                      returnTo: window.location.pathname,
                                  },
                              })
                          }
                      >
                          Log in or sign up now
                      </button>
                  </div>
              ),
              disableSaveButton: true,
          };

    if (status === "loading" || offerSettings === undefined) {
        return <ApiLoading />;
    }

    if (status === "error") {
        return <ApiError />;
    }

    if (offerSettings && (offerSettings as any).statusCode === 401) {
        return <ApiError message="You are not logged in" />;
    }

    if (
        submitOfferMutation.isSuccess &&
        (submitOfferMutation.data as any).statusCode === 429
    ) {
        return (
            <ApiError message="You have exceeded the number of applications from a single recruiter that this candidate allows per day. Please try again tomorrow." />
        );
    }

    if (offerSettings && (offerSettings as any).statusCode === 410) {
        return <ApiError message={(offerSettings as any).message} />;
    }

    return (
        <Formik
            initialValues={{
                offerUuid: offerId,

                // Applicant and Role
                applicantName: authenticationStateChanges.name,
                applicantRole: ApplicantRole.RECRUITER,
                applicantEmail: authenticationStateChanges.email, // going to remove this because it will be in the login

                // Role Details
                roleTitle: "",
                roleLocation: "",
                primaryResponsibility: JobResponsibility.INDIVIDUAL_CONTRIBUTOR,
                remoteAllowance: RemoteAllowance.NO_REMOTE,
                tellMeAboutWhoWillIBeWorkingWith: "",
                describeHowAPieceOfWorkGoesFromIdeaToProduct: "",

                // Salary
                salary: 0,
                totalCompensation: 0,
                inclusiveOfPension: false,
                providesSomeMedicalBenefit: false,

                // Culture Details
                whyNotFilledInternally: "",
                learningTimePercentPerMonth: 0,
                whatAreSomeOngoingChallengesYouHaveYetToResolve: "",
                tellMeAboutTechnicalPrincipalsOrVision: "",
                isFamilyFriendly: false,
                familyFriendlyTellMeMore: "",
                isOvertimeExpected: false,

                // Diversity Details
                hasActiveDiversityProgram: false,
                tellMeMoreAboutDiversity: "",
                // Company Details
                companyAudience: CompanyAudience.B_TO_C,
                companyFunding: CompanyFunding.SELF_FUNDED,

                companyName: "",
                whatIsYourCompetitiveAdvantage: "",
                nonCompeteAgreementRequired: false,
            }}
            validationSchema={Yup.object({
                applicantName: Yup.string()
                    .required("This is required")
                    .min(1, "This is required"),
                roleTitle: Yup.string()
                    .required("This is required")
                    .min(1, "This is required"),
                companyName: Yup.string().optional().min(1, "This is required"),
                salary: Yup.number()
                    .transform((num) => (num <= 0 ? undefined : num))
                    .integer()
                    .optional()
                    .min(1, "This one is required")
                    .max(999999999, "Max is 999999999"),
                totalCompensation: Yup.number()
                    .transform((num) => (num <= 0 ? undefined : num))
                    .integer()
                    .optional()
                    .min(1, "This one is required")
                    .max(999999999, "Max is 999999999"),
                learningTimePercentPerMonth: Yup.number()
                    .transform((num) => (num <= 0 ? undefined : num))
                    .integer()
                    .optional()
                    .min(0, "Should be between 0 and 100")
                    .max(100, "Should be between 0 and 100"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                toggleSubmitting(true);
                submitOfferMutation.mutate(
                    {
                        model: {
                            offerUuid: offerId || "",

                            // Applicant and Role
                            applicantName: values.applicantName || "",
                            applicantRole: values.applicantRole,
                            applicantEmail: values.applicantEmail,
                            roleTitle: values.roleTitle,
                            roleLocation: values.roleLocation,

                            // Salary
                            salary: values.salary,
                            totalCompensation: values.totalCompensation,

                            inclusiveOfPension: values.inclusiveOfPension,
                            providesSomeMedicalBenefit:
                                values.providesSomeMedicalBenefit,

                            // Role Details
                            primaryResponsibility: values.primaryResponsibility,
                            remoteAllowance: values.remoteAllowance,
                            tellMeAboutWhoWillIBeWorkingWith:
                                values.tellMeAboutWhoWillIBeWorkingWith,
                            describeHowAPieceOfWorkGoesFromIdeaToProduct:
                                values.describeHowAPieceOfWorkGoesFromIdeaToProduct,

                            // Culture Details
                            whyNotFilledInternally:
                                values.whyNotFilledInternally,
                            learningTimePercentPerMonth:
                                values.learningTimePercentPerMonth <= 0
                                    ? undefined
                                    : values.learningTimePercentPerMonth,
                            whatAreSomeOngoingChallengesYouHaveYetToResolve:
                                values.whatAreSomeOngoingChallengesYouHaveYetToResolve,
                            tellMeAboutTechnicalPrincipalsOrVision:
                                values.tellMeAboutTechnicalPrincipalsOrVision,
                            isFamilyFriendly: values.isFamilyFriendly,
                            familyFriendlyTellMeMore:
                                values.familyFriendlyTellMeMore,
                            isOvertimeExpected: values.isOvertimeExpected,

                            // Diversity Details
                            hasActiveDiversityProgram:
                                values.hasActiveDiversityProgram,
                            tellMeMoreAboutDiversity:
                                values.tellMeMoreAboutDiversity,
                            // Company Details
                            companyAudience: values.companyAudience,
                            companyFunding: values.companyFunding,

                            companyName: values.companyName,
                            whatIsYourCompetitiveAdvantage:
                                values.whatIsYourCompetitiveAdvantage,
                            nonCompeteAgreementRequired:
                                values.nonCompeteAgreementRequired,
                        },
                    },
                    { onError: (error) => console.log("custom:", error) }
                );

                toggleSubmitting(false);
                setSubmitting(false);
            }}
        >
            <Form>
                <div className="mb-8">
                    <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                        <h1 className="pb-2 text-3xl font-bold text-dark-shade">
                            Submit your role to this candidate
                        </h1>
                        <h2 className="text-2xl">What is this?</h2>
                        <p className="my-4">
                            Filtered:reduced allows you to submit your role
                            directly to a candidates and get a response every
                            time.
                        </p>

                        <h2 className="text-2xl">How does it work?</h2>
                        <p className="my-4">
                            After you submit the job we will immediately provide
                            you a report that compares your role to the
                            candidate's current preferences for their perfect
                            role.
                        </p>
                        <p className="my-4">
                            You get a 100% response rate and receive immediate
                            feedback!
                        </p>
                        {authenticationStateChanges.signupMessage}
                    </div>
                </div>
                <div className="mb-8">
                    <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                        <div className="grid grid-cols-12 gap-6">
                            <h2 className="text-2xl col-span-12">About you</h2>

                            {authenticationStateChanges.disableSaveButton ? (
                                <>
                                    <p className="text-base col-span-12">
                                        You must create an account to submit a
                                        job to this candidate. This helps us
                                        protect candidates from spam and enables
                                        us to send you the report afterwards.
                                    </p>
                                    <p className="text-base col-span-12">
                                        When you're{" "}
                                        <button
                                            className="font-bold info-link text-light-accent"
                                            onClick={(event) => {
                                                event?.preventDefault();
                                                loginWithRedirect({
                                                    appState: {
                                                        returnTo:
                                                            window.location
                                                                .pathname,
                                                    },
                                                });
                                            }}
                                        >
                                            signed in
                                        </button>{" "}
                                        we'll populate some of these fields for
                                        you.
                                    </p>
                                </>
                            ) : (
                                <div className="col-span-12">
                                    <div className="inline w-auto">
                                        {user && user.picture && (
                                            <img
                                                className="inline w-8 h-8 mr-5 rounded-full"
                                                src={user.picture}
                                                alt="My Profile Avatar"
                                            />
                                        )}
                                        <Field
                                            as="input"
                                            name="applicantName"
                                            disabled={true}
                                            id="applicantName"
                                            className="inline px-3 py-2 mt-1 border border-gray-300 w-80 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <ErrorMessage name="applicantName">
                                        {(msg) => (
                                            <div className="text-red-500">
                                                {msg}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {offerSettings.map((section) => {
                    if (
                        section.questions.every(
                            (q) => q.shouldAskQuestion === false
                        )
                    ) {
                        return undefined;
                    }
                    return (
                        <div className="mb-8" key={section.title}>
                            <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                                <div className="grid grid-cols-12 gap-6">
                                    <h2 className="text-2xl col-span-12">
                                        {section.title}
                                    </h2>
                                    {section.questions.map((question) => {
                                        return (
                                            <div
                                                key={question.questionKey}
                                                className={`col-span-12 ${
                                                    question.shouldAskQuestion
                                                        ? `block`
                                                        : `hidden`
                                                }`}
                                            >
                                                <label
                                                    htmlFor={question.answerKey}
                                                    className="block pb-4 text-sm font-medium text-gray-700"
                                                >
                                                    {question.questionDisplay}
                                                </label>
                                                <DynamicSubmitField
                                                    questionMeta={question}
                                                />
                                                <ErrorMessage
                                                    name={question.answerKey}
                                                >
                                                    {(msg) => (
                                                        <div className="text-red-500">
                                                            {msg}
                                                        </div>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="mb-8">
                    <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                        <div className="grid grid-cols-12 gap-6">
                            <h2 className="text-2xl col-span-12">
                                Submit the job
                            </h2>
                            <div className="col-span-12">
                                {authenticationStateChanges.signupMessage}
                            </div>{" "}
                            <div className="col-span-12 space-x-6">
                                {formSubmitting ? (
                                    <p>Saving...</p>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={
                                            authenticationStateChanges.disableSaveButton
                                        }
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50"
                                    >
                                        Click to submit this job to the
                                        candidate
                                    </button>
                                )}
                            </div>
                            <div className="col-span-12">
                                {submitOfferMutation.isSuccess && (
                                    <p>
                                        Success - Job submitted!{" "}
                                        <Link
                                            to={"/submitted-roles"}
                                            className="font-bold info-link text-dark-accent"
                                        >
                                            view submission results
                                        </Link>{" "}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default SubmitOffer;
