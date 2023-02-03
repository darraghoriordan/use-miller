import React from "react";
import ApiLoading from "../api/ApiLoading";
import ApiError from "../api/ApiError";

import useAddSharingLink from "./useAddSharingLink";
import useGetLatestSharingLink from "./useGetLatestSharingLink";
import { Link } from "react-router-dom";

const SharingLinks = (): JSX.Element => {
    const { data, status } = useGetLatestSharingLink();
    const addSharingLinkMutation = useAddSharingLink();

    if (status === "loading") {
        return <ApiLoading />;
    }
    if (status === "error") {
        return <ApiError />;
    }

    if (data && (data as any).statusCode === 401) {
        return <ApiError message="You are not logged in to the api" />;
    }

    const sharingLink = data;
    return (
        <>
            <div className="mb-8">
                <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                    <h1 className=" pb-2 text-3xl font-bold text-dark-shade">
                        Your sharing link
                    </h1>
                    <p className="pb-4">
                        Copy this text and use it to respond to any recruiters
                    </p>
                    {sharingLink && (
                        <>
                            {" "}
                            <table className="min-w-full mb-4 border divide-y divide-gray-200 border-dark-accent">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr key={sharingLink.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <pre
                                                id="sharingLinkMessage"
                                                className="text-xs whitespace-pre-line"
                                            >
                                                {sharingLink.sharingMessage}
                                            </pre>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-gray-300 bg-dark-shade rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        sharingLink.sharingMessage
                                    );
                                }}
                            >
                                <svg
                                    className="w-6 h-6 mr-2 -ml-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                    />
                                </svg>
                                Copy to Clipboard
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="mb-8">
                <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                    <h2 className="text-2xl ">What is this?</h2>
                    <p className="my-4">
                        Your unique filtered:reduced link will take the
                        recruiter to a form.
                    </p>
                    <p className="my-4">
                        The recruiter can take the time to enter submit details
                        about their role or ignore your message.
                    </p>
                    <p className="my-4">
                        This job will be passed through your specific filters.
                    </p>
                    <p className="my-4">
                        If the job passes your filters you will be notified.
                        Otherwise you won't hear about it.
                    </p>
                    <p className="mb-8">
                        You can reuse the same link with as many recruiters as
                        you like. They will always get a new, empty form.
                    </p>
                    <p>
                        <Link
                            to={"/settings"}
                            className="font-bold text-light-accent info-link"
                        >
                            go to your filter setup
                        </Link>{" "}
                        to configure your personal filters
                    </p>
                </div>
            </div>
            <div className="mb-8">
                <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                    <h2 className="text-2xl ">Testing your sharing link</h2>
                    <p className="my-4">
                        You can use your own link to "submit" offers to
                        yourself!
                    </p>
                    <p className="mb-8">
                        This is useful if you want to see what the form looks
                        like or if you just want to use Filtered Reduced as a
                        note taking tool during your in-person interviews.
                    </p>
                    <p>
                        <Link
                            to={`/submit/${sharingLink?.uuid}`}
                            className="font-bold text-light-accent info-link"
                        >
                            test your sharing link
                        </Link>
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                    <h2 className="mb-4 text-2xl">
                        Generate a new sharing link
                    </h2>

                    <p className="mb-8">
                        You can generate a new link any time. Please note: The
                        old link will not work anymore. This is useful if you're
                        getting spam of any kind from a single recruiter, but it
                        also means your old link will be gone.
                    </p>
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                        onClick={(event) => {
                            event.preventDefault();
                            addSharingLinkMutation.mutate();
                        }}
                    >
                        Generate new sharing link
                    </button>
                </div>
            </div>
        </>
    );
};

export default SharingLinks;
