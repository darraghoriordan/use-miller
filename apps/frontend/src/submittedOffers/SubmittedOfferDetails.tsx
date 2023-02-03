import React from "react";
import ApiError from "../api/ApiError";
import ApiLoading from "../api/ApiLoading";
import { useNavigate, useParams } from "react-router-dom";
import useGetSubmittedOffers from "./useGetSubmittedOffers";
import { OfferResult } from "./OfferResult";
import { QuestionResultIcon } from "./QuestionResultIcon";

const SubmittedOfferDetail = (): JSX.Element => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    let { offerId } = useParams();

    const { data, status } = useGetSubmittedOffers();

    const offer = data?.find((o) => o.id === parseInt(offerId || "", 10));

    if (!offer) {
        return <ApiError message="An offer with this id couldn't be found!" />;
    }

    if (status === "loading") {
        return <ApiLoading />;
    }

    if (status === "error") {
        return <ApiError />;
    }

    if (data && (data as any).statusCode === 401) {
        return <ApiError message="You are not logged in to the api" />;
    }

    if (data && (data as any).statusCode === 410) {
        return <ApiError message={(data as any).message} />;
    }

    return (
        <div className="mb-8">
            <button
                onClick={() => goBack()}
                className="font-bold underline text-dark-shade"
            >
                ← back to list
            </button>
            <div className="my-6 overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900 leading-6">
                        Submission Summary
                    </h3>
                </div>
                <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Role title
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {offer.roleTitle}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Result
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                <OfferResult
                                    result={offer.questionResultSections.every(
                                        (x) => x.didPassAllFilters
                                    )}
                                />
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Submitted on
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {" "}
                                <time dateTime={offer.createdDate!.toString()}>
                                    {offer.createdDate.toLocaleDateString()}
                                </time>
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Submitter Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {offer.applicantEmail}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Submitter Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {offer.applicantName}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            {offer.questionResultSections.every(
                (x) => x.didPassAllFilters === true
            ) && (
                <div className="mb-8 overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium text-gray-900 leading-6">
                            <span className="flex">
                                <QuestionResultIcon result={true} /> Your role
                                passed all filters and we have emailed the
                                recipient. It's up to them now!
                            </span>
                        </h3>
                    </div>
                </div>
            )}
            {offer.questionResultSections.map((section) => (
                <div
                    className="mb-8 overflow-hidden bg-white shadow sm:rounded-lg"
                    key={section.title}
                >
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium text-gray-900 leading-6">
                            <span className="flex">
                                {" "}
                                <QuestionResultIcon
                                    result={section.didPassAllFilters}
                                />{" "}
                                {section.title}
                            </span>
                        </h3>
                    </div>
                    <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            {section.questionResults.map((result) => (
                                <div
                                    className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                    key={result.questionMeta.answerKey}
                                >
                                    <dt className="text-sm font-medium text-gray-500">
                                        {result.questionMeta.questionDisplay}
                                    </dt>
                                    <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {result.answer.display}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubmittedOfferDetail;
