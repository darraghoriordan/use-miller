import React, { FunctionComponent } from "react";
import { QuestionResultIcon } from "./QuestionResultIcon";

type OfferResultProps = {
    result: boolean;
};
export const OfferResult: FunctionComponent<OfferResultProps> = ({
    result,
}) => {
    const message = result ? "Passed All Filters" : "Failed Filters";

    return (
        <span className="flex">
            <QuestionResultIcon result={result} />
            {message}
        </span>
    );
};
