import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import ApiError from "../api/ApiError";
import ApiLoading from "../api/ApiLoading";
import useGetLatestSharingLink from "../sharingLinks/useGetLatestSharingLink";
import { OfferResult } from "./OfferResult";
import useGetSubmittedOffers from "./useGetSubmittedOffers";

const SubmittedOffers = (): JSX.Element => {
    const { data, status } = useGetSubmittedOffers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: latestSharingLinkData, status: latestSharingLinkStatus } =
        useGetLatestSharingLink();
    if (status === "loading") {
        return <ApiLoading />;
    }
    if (status === "error") {
        return <ApiError />;
    }

    if (data && (data as any).statusCode === 401) {
        return <ApiError message="You are not logged in to the api" />;
    }

    if (data && data.length === 0) {
        return (
            <ApiLoading message="You haven't submitted any roles yet.">
                <p>
                    This is where a recruiter could see the roles they sent to
                    candidates and why they were unacceptable.
                </p>
                <p>
                    If you like you can submit a job to yourself to see what
                    will happen when your filters are used.
                </p>
                <Link
                    to={`/submit/${latestSharingLinkData?.uuid}`}
                    className="flex-none block w-full px-6 py-3 text-lg font-semibold border border-transparent sm:w-auto bg-main-brand text-light-shade leading-6 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                >
                    Test your own filters now
                </Link>
            </ApiLoading>
        );
    }
    return (
        <div className="mb-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <div className="px-4 py-5 sm:px-6">
                    <h1 className="pb-6 text-3xl font-bold text-dark-shade">
                        Submitted Roles
                    </h1>
                    <p className="pb-6">
                        These are the roles you've submitted to candidate's
                        links.
                    </p>
                    <ul className="divide-y divide-gray-200">
                        {data &&
                            data
                                .sort(function (a, b) {
                                    return +b.createdDate! - +a.createdDate!;
                                })
                                .map((offer) => {
                                    return (
                                        <li key={offer.id}>
                                            <Link
                                                to={`/submitted-roles/${offer.id}`}
                                                className="block hover:bg-gray-50"
                                            >
                                                <div className="flex items-center px-4 py-4 sm:px-6">
                                                    <div className="flex items-center flex-1 min-w-0">
                                                        <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                            <div>
                                                                <p className="text-sm font-medium text-indigo-600 truncate">
                                                                    {
                                                                        offer.roleTitle
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="hidden md:block">
                                                                <div>
                                                                    <p className="text-sm text-gray-900">
                                                                        Submitted
                                                                        on{" "}
                                                                        <time
                                                                            dateTime={offer.createdDate!.toString()}
                                                                        >
                                                                            {offer.createdDate.toLocaleDateString()}
                                                                        </time>
                                                                    </p>
                                                                    <p className="flex items-center mt-2 text-sm text-gray-500">
                                                                        <OfferResult
                                                                            result={offer.questionResultSections.every(
                                                                                (
                                                                                    x
                                                                                ) =>
                                                                                    x.didPassAllFilters
                                                                            )}
                                                                        />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChevronRightIcon
                                                            className="w-5 h-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SubmittedOffers;
