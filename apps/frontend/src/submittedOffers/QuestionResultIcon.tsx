import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { FunctionComponent } from "react";

type QuestionResultIconProps = {
    result: boolean;
};
export const QuestionResultIcon: FunctionComponent<QuestionResultIconProps> = ({
    result,
}) => {
    if (result) {
        return (
            <CheckCircleIcon
                className="flex-shrink-0 w-5 h-5 text-green-400 mr-1.5"
                aria-hidden="true"
            />
        );
    }

    return (
        <XCircleIcon
            className="flex-shrink-0 w-5 h-5 text-red-400 mr-1.5"
            aria-hidden="true"
        />
    );
};
