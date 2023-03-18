import React, { FunctionComponent } from "react";

type ApiErrorProps = {
    message?: string;
    children?: React.ReactNode;
};
const ApiError: FunctionComponent<ApiErrorProps> = ({
    message,
    children,
}): JSX.Element => {
    return (
        <div className="flex items-end justify-center px-4 pt-4 pb-20 text-center md:min-h-screen sm:block sm:p-0">
            <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
            >
                &#8203;
            </span>
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                        {/* <!-- Heroicon name: outline/check --> */}

                        <svg
                            className="w-6 h-6 text-red-600"
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                        <h3
                            className="text-lg font-medium text-gray-900 leading-6"
                            id="modal-headline"
                        >
                            {message || `Error - try refreshing your browser`}
                        </h3>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiError;
