/* eslint-disable tailwind/class-order */
import { useField } from "formik";
import React from "react";

export type FieldSetConfigItem = {
    value: string;
    title: string;
    description: string;
};
export const Fieldset = ({ legend, fieldSetConfig, ...props }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta, helpers] = useField(props);
    return (
        <fieldset>
            <legend className="sr-only">{legend}</legend>

            {fieldSetConfig.map(
                (fieldSetConfigItem: FieldSetConfigItem, index: number) => {
                    const isLastItem = index === fieldSetConfig.length - 1;
                    const isFirstItem = index === 0;

                    return (
                        <div
                            key={fieldSetConfigItem.value}
                            className="bg-white rounded-md -space-y-px md:w-1/2"
                        >
                            {/* <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" --> */}
                            <div
                                className={`relative border ${
                                    isLastItem
                                        ? "rounded-bl-md rounded-br-md"
                                        : ""
                                } ${
                                    isFirstItem
                                        ? "rounded-tl-md rounded-tr-md"
                                        : ""
                                }  p-4 flex ${
                                    field.value === fieldSetConfigItem.value
                                        ? "bg-indigo-50 border-indigo-200 z-10"
                                        : "border-gray-200"
                                }`}
                            >
                                <div className="flex items-center h-5">
                                    <input
                                        id={`${field.name}-option-${index}`}
                                        name={field.name}
                                        type="radio"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
                                        checked={
                                            field.value ===
                                            fieldSetConfigItem.value
                                        }
                                        onChange={() => {
                                            helpers.setTouched(true);
                                            helpers.setValue(
                                                fieldSetConfigItem.value
                                            );
                                        }}
                                    />
                                </div>
                                <label
                                    htmlFor={`${field.name}-option-${index}`}
                                    className="ml-3 flex flex-col cursor-pointer"
                                >
                                    {/* <!-- On: "text-indigo-900", Off: "text-gray-900" --> */}
                                    <span
                                        className={`block text-sm font-medium ${
                                            field.value ===
                                            fieldSetConfigItem.value
                                                ? "text-indigo-900"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        {fieldSetConfigItem.title}
                                    </span>
                                    {/* <!-- On: "text-indigo-700", Off: "text-gray-500" --> */}
                                    <span
                                        className={`block text-sm ${
                                            field.value ===
                                            fieldSetConfigItem.value
                                                ? "text-indigo-700"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {fieldSetConfigItem.description}
                                    </span>
                                </label>
                            </div>
                        </div>
                    );
                }
            )}
        </fieldset>
    );
};
