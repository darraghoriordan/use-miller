/* eslint-disable tailwind/class-order */
import React, { FunctionComponent } from "react";

type ApiLoadingProps = {
    message?: string;
    children?: React.ReactNode;
};
const ApiLoading: FunctionComponent<ApiLoadingProps> = ({
    message,
    children,
}): JSX.Element => {
    return (
        <div className="flex items-end justify-center md:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
            >
                &#8203;
            </span>
            <div
                className="inline-block align-bottom bg-dark-shade text-light-shade rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-main-brand">
                        {/* <!-- Heroicon name: outline/check --> */}

                        <svg
                            className="h-6 w-6 text-light-accent"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-5 space-y-8">
                        <h3
                            className="text-lg leading-6 font-medium inline-block"
                            id="modal-headline"
                        >
                            {message || `Loading data...`}
                        </h3>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiLoading;
