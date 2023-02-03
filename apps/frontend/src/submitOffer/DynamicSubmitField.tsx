import { Field } from "formik";
import React from "react";
import { QuestionMeta, QuestionType } from "@use-miller/shared-api-client";
import { Fieldset } from "./Fieldset";
import { ToggleCheckbox } from "./ToggleCheckbox";

interface DynamicFieldProps {
    questionMeta: QuestionMeta;
}

const DynamicSubmitField = ({
    questionMeta,
}: DynamicFieldProps): JSX.Element => {
    switch (questionMeta.questionType) {
        case QuestionType.CURRENCY:
            return (
                <Field
                    type="number"
                    step="20000"
                    name={questionMeta.answerKey}
                    id={questionMeta.answerKey}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 md:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
            );
        case QuestionType.BOOLEAN:
            return (
                <ToggleCheckbox
                    name={questionMeta.answerKey}
                    id={questionMeta.answerKey}
                />
            );
        case QuestionType.NUMBER:
        case QuestionType.PERCENT:
            return (
                <Field
                    type="number"
                    name={questionMeta.answerKey}
                    id={questionMeta.answerKey}
                    step="10"
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
                    name={questionMeta.answerKey}
                    id={questionMeta.answerKey}
                    className="block w-full px-3 py-4 mt-4 border border-gray-300 md:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                    fieldSetConfig={questionMeta.selectOptions}
                />
            );

        case QuestionType.SHORT_TEXT:
            return (
                <Field
                    type="text"
                    name={questionMeta.answerKey}
                    id={questionMeta.answerKey}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 md:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
            );
        case QuestionType.TEXT:
            return (
                <Field
                    type="text"
                    component="textarea"
                    rows="4"
                    name={questionMeta.answerKey}
                    id={questionMeta.answerKey}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 md:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
            );
    }
};

export default DynamicSubmitField;
