import { useField } from "formik";
import React from "react";

export const ToggleCheckbox = ({ label, ...props }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta, helpers] = useField<boolean>(props);
    return (
        <button
            type="button"
            className={`relative inline-flex flex-shrink-0 h-6 ${
                field.value ? "bg-green-500" : "bg-gray-200"
            } border-2 mt-2 border-transparent rounded-full cursor-pointer w-11 transition-colors ease-in-out duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500`}
            aria-pressed="false"
            onClick={() => {
                helpers.setTouched(true);
                helpers.setValue(!field.value);
            }}
            aria-labelledby="privacy-option-2-label"
            aria-describedby="privacy-option-2-description"
        >
            <span className="sr-only">{props.label}</span>
            {/* <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" --> */}
            <span
                aria-hidden="true"
                className={`inline-block w-5 h-5 bg-white rounded-full shadow ${
                    field.value ? "translate-x-5" : "translate-x-0"
                } transform ring-0 transition ease-in-out duration-100`}
            ></span>
        </button>
    );
};
