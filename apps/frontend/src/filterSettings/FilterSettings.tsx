import React, { useState } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import useSaveFilterSettings from "./useSaveFilterSettings";
import useGetLatestFilterSettings from "./useGetLatestFilterSettings";
import ApiLoading from "../api/ApiLoading";
import ApiError from "../api/ApiError";
import { ToggleCheckbox } from "../submitOffer/ToggleCheckbox";
import { Fieldset } from "../submitOffer/Fieldset";
import { Link } from "react-router-dom";
import {
    ApplicantRole,
    CompanyAudience,
    CompanyFunding,
    JobResponsibility,
    QuestionMeta,
    QuestionSection,
    QuestionType,
    RemoteAllowance,
} from "@use-miller/shared-api-client";

const flattenFilterValues = (data: QuestionSection[] | undefined) => {
    const result = {} as any;
    if (data === undefined) {
        return result;
    }
    for (const section of data) {
        for (const question of section.questions) {
            result[question.questionKey] = question.filterValue;
            result[question.askQuestionKey] = question.shouldAskQuestion;
        }
    }
    console.log("flatten result", result);
    return result;
};
const mapField = (questionMeta: QuestionMeta) => {
    switch (questionMeta.questionType) {
        case QuestionType.CURRENCY:
            return (
                <Field
                    type="number"
                    name={questionMeta.questionKey}
                    id={questionMeta.questionKey}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 md:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
            );
        case QuestionType.BOOLEAN:
            return (
                <>
                    <ToggleCheckbox
                        name={questionMeta.questionKey}
                        id={questionMeta.questionKey}
                    />
                </>
            );
        case QuestionType.NUMBER:
        case QuestionType.PERCENT:
            return (
                <Field
                    type="number"
                    name={questionMeta.questionKey}
                    id={questionMeta.questionKey}
                    className="block w-1/2 px-3 py-2 mt-1 border border-gray-300 md:w-1/4 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
            );
        case QuestionType.SELECT_APPLICANT_ROLE:
        case QuestionType.SELECT_BUSINESS_TYPE:
        case QuestionType.SELECT_COMPANY_FUNDING:
        case QuestionType.SELECT_PRIMARY_RESPONSIBILITY:
        case QuestionType.SELECT_REMOTE_WORK_ALLOWANCE:
            console.log(
                "FIELDSET",
                questionMeta.questionKey,
                questionMeta.selectOptions
            );
            return (
                <Fieldset
                    legend={questionMeta.questionDisplay}
                    name={questionMeta.questionKey}
                    id={questionMeta.questionKey}
                    className="block w-full px-3 py-4 mt-4 border border-gray-300 md:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                    fieldSetConfig={questionMeta.selectOptions?.concat(
                        questionMeta.additionalFilterSectionSelectOptions || []
                    )}
                />
            );

        case QuestionType.SHORT_TEXT:
            return undefined;
        case QuestionType.TEXT:
            return undefined;
    }
};

const FilterSettings = (): JSX.Element => {
    const { data, status } = useGetLatestFilterSettings();

    const saveFilterSettingMutation = useSaveFilterSettings();
    const [formSubmitting, toggleSubmitting] = useState(false);
    console.log("filtersettings", data);
    if (status === "loading" || data === undefined) {
        return <ApiLoading />;
    }
    if (status === "error") {
        return <ApiError />;
    }

    if (data && (data as any).statusCode === 401) {
        return <ApiError message="You are not logged in to the api" />;
    }

    return (
        <Formik
            initialValues={flattenFilterValues(data)}
            validationSchema={Yup.object({
                minimumSalary: Yup.number()
                    .integer()
                    .min(1, "Must be at least 1. This one is important!")
                    .max(999999999, "Max is 999999999"),
                minimumTotalCompensation: Yup.number()
                    .integer()
                    .min(1, "Must be at least 1. This one is important!")
                    .max(999999999, "Max is 999999999"),

                minimumLearningTimePercentPerMonth: Yup.number()
                    .integer()
                    .min(0, "Must be value between 0 and 100.")
                    .max(100, "Must be value between 0 and 100."),

                lodgementsAllowedPerDay: Yup.number()
                    .integer()
                    .min(0, "Must be value between 0 and 100.")
                    .max(100, "Must be value between 0 and 100."),
            })}
            onSubmit={(values, { setSubmitting }) => {
                toggleSubmitting(true);
                saveFilterSettingMutation.mutate({
                    model: {
                        // hmm might have to change these ones
                        id: 0,
                        createdDate: new Date(),
                        askForRoleTitle: true, // this is always true
                        askAboutSalary: values.askAboutSalary || false,
                        minimumSalary: values.minimumSalary || 0,

                        askAboutTotalCompensation:
                            values.askAboutTotalCompensation || false,
                        minimumTotalCompensation:
                            values.minimumTotalCompensation || 0,

                        askAboutIncludeSuper:
                            values.askAboutIncludeSuper || false,
                        mustIncludeSuper: values.mustIncludeSuper || false,

                        askAboutProvidesSomeMedicalBenefit:
                            values.askAboutProvidesSomeMedicalBenefit || false,
                        mustProvidesSomeMedicalBenefit:
                            values.mustProvidesSomeMedicalBenefit || false,

                        // Role
                        askAboutPrimaryResponsibility:
                            values.askAboutPrimaryResponsibility || false,
                        primaryResponsibility:
                            values.primaryResponsibility ||
                            JobResponsibility.INDIVIDUAL_CONTRIBUTOR,

                        askAboutRemoteAllowance:
                            values.askAboutRemoteAllowance || false,
                        remoteAllowance:
                            values.remoteAllowance ||
                            RemoteAllowance.PARTIAL_WEEK_REMOTE_IN_CITY,

                        askAboutRoleLocation:
                            values.askAboutRoleLocation || false,
                        askAboutTellMeWho: values.askAboutTellMeWho || false,
                        askAboutDescribeAPieceOfWork:
                            values.askAboutDescribeAPieceOfWork || false,
                        askAboutWhyInternalExternal:
                            values.askAboutWhyInternalExternal || false,

                        // Culture

                        askAboutMinimumLearningTimePercentPerMonth:
                            values.askAboutMinimumLearningTimePercentPerMonth ||
                            false,
                        minimumLearningTimePercentPerMonth:
                            values.minimumLearningTimePercentPerMonth || 0,

                        askMoreAboutLearningTime: false, // not used :)

                        askAboutOvertimeExpected:
                            values.askAboutOvertimeExpected || false,
                        rejectIfOvertimeExpected:
                            values.rejectIfOvertimeExpected || false,

                        askFamilyFriendlyPolicies:
                            values.askFamilyFriendlyPolicies || false,
                        mustBeFamilyFriendly:
                            values.mustBeFamilyFriendly || false,

                        askMoreDetailsAboutFamilyFriendlyEnvironment:
                            values.askMoreDetailsAboutFamilyFriendlyEnvironment ||
                            false,
                        askAboutOngoingChallenges:
                            values.askAboutOngoingChallenges || false,
                        askTechnicalPrincipals:
                            values.askTechnicalPrincipals || false,
                        // Diversity
                        askAboutDiversityProgram:
                            values.askAboutDiversityProgram || false,
                        requireActiveDiversityProgram:
                            values.requireActiveDiversityProgram || false,

                        askMoreAboutDiversity:
                            values.askMoreAboutDiversity || false,

                        // Company
                        askAboutCompanyAudience:
                            values.askAboutCompanyAudience || false,
                        companyAudience:
                            values.companyAudience || CompanyAudience.B_TO_B,

                        askAboutCompanyFunding:
                            values.askAboutCompanyFunding || false,
                        companyFunding:
                            values.companyFunding || CompanyFunding.DONT_CARE,

                        askAboutCompetitiveAdvantage:
                            values.askAboutCompetitiveAdvantage || false,

                        askAboutNonCompete: values.askAboutNonCompete || false,
                        rejectIfMustSignNonCompete:
                            values.rejectIfMustSignNonCompete,

                        askAboutNameOfCompany:
                            values.askAboutNameOfCompany || false,
                        // meta
                        askAboutRoleOfSubmitter:
                            values.askAboutRoleOfSubmitter || false,
                        applicantRole:
                            values.applicantRole || ApplicantRole.DONT_CARE,

                        lodgementsAllowedPerDay:
                            values.lodgementsAllowedPerDay || 0,
                        allowUnlimitedSelfLodgements:
                            values.allowUnlimitedSelfLodgements || false,
                    },
                });
                toggleSubmitting(false);
                setSubmitting(false);
            }}
        >
            <Form>
                <div className="mb-8">
                    <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                        <h1 className="pb-2 text-3xl font-bold text-dark-shade">
                            Filter Setup
                        </h1>
                        <p className="pb-4 mt-1 text-sm ">
                            This is where you set up your custom job filters.
                            Any role submissions made by recruiters to your
                            sharing link will be filtered with these values.
                        </p>
                        <p className="pb-4 mt-1 text-sm ">
                            We will only show the questions you include.
                        </p>
                        <p className="pb-8 mt-1 text-sm">
                            You will only hear about the roles that meet or
                            exceed your filters and recruiters can't see your
                            specific filter values.
                        </p>

                        <p>
                            <Link
                                to={"/"}
                                className="font-bold text-light-accent info-link"
                            >
                                get your sharing link
                            </Link>
                        </p>
                    </div>
                </div>

                {data &&
                    data.map((section) => {
                        return (
                            <div className="mb-8" key={section.title}>
                                <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                                    <div className="grid grid-cols-12 gap-6">
                                        <h2 className="text-2xl col-span-12">
                                            {section.title} Filters
                                        </h2>
                                        {section.questions
                                            .filter((x) => x.userCanCustomize)
                                            .map((question) => {
                                                return (
                                                    <React.Fragment
                                                        key={
                                                            question.questionKey
                                                        }
                                                    >
                                                        <div className="col-span-4 md:col-span-2">
                                                            {question.userCanCustomizeAsking && (
                                                                <>
                                                                    <label
                                                                        htmlFor={
                                                                            question.askQuestionKey
                                                                        }
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Include
                                                                        this
                                                                        question
                                                                    </label>
                                                                    <ToggleCheckbox
                                                                        name={
                                                                            question.askQuestionKey
                                                                        }
                                                                        id={
                                                                            question.askQuestionKey
                                                                        }
                                                                    />

                                                                    <ErrorMessage
                                                                        name={
                                                                            question.askQuestionKey
                                                                        }
                                                                    >
                                                                        {(
                                                                            msg
                                                                        ) => (
                                                                            <div className="text-red-500">
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </div>
                                                                        )}
                                                                    </ErrorMessage>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="col-span-8 md:col-span-10">
                                                            <label
                                                                htmlFor={
                                                                    question.questionKey
                                                                }
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                {question.filterDisplay ||
                                                                    question.questionDisplay}
                                                            </label>
                                                            {mapField(question)}
                                                            <ErrorMessage
                                                                name={
                                                                    question.questionKey
                                                                }
                                                            >
                                                                {(msg) => (
                                                                    <div className="text-red-500">
                                                                        {msg}
                                                                    </div>
                                                                )}
                                                            </ErrorMessage>
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            })}

                                        <div className="col-span-12">
                                            <div className="flex py-4 pb-2 mt-4 space-x-4">
                                                {formSubmitting ? (
                                                    <p>Saving...</p>
                                                ) : (
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-gray-300 bg-dark-shade rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                                <button
                                                    type="reset"
                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            <div>
                                                {saveFilterSettingMutation.isError && (
                                                    <p>Error!</p>
                                                )}
                                                {saveFilterSettingMutation.isSuccess && (
                                                    <p>Saved!</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                {/* <div className="mb-8">
          <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
            <div className=" grid grid-cols-12 gap-6">
              <h2 className="text-2xl col-span-12">Privacy Settings</h2>
              <div className="col-span-12">
                <label
                  htmlFor="lodgementsAllowedPerDay"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lodgements Allowed per Recruiter per Day
                </label>
                <Field
                  type="number"
                  name="lodgementsAllowedPerDay"
                  id="lodgementsAllowedPerDay"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
                <ErrorMessage name="lodgementsAllowedPerDay">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="col-span-12">
                <div className="flex py-4 pb-2 mt-4 space-x-4">
                  {formSubmitting ? (
                    <p>Saving...</p>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-gray-300 bg-dark-shade rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                    >
                      Save
                    </button>
                  )}
                  <button
                    type="reset"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  {saveFilterSettingMutation.isSuccess && <p>Saved!</p>}
                </div>
              </div>
            </div>
          </div>
        </div> */}
            </Form>
        </Formik>
    );
};

export default FilterSettings;
