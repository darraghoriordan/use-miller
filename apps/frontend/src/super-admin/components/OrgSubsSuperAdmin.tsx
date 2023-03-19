import { OrganisationSubscriptionRecord } from "@use-miller/shared-api-client";
import React from "react";
import { useFormattedDate } from "../../hooks/useFormattedDate.js";

const ProductLink = ({ sp }: { sp: OrganisationSubscriptionRecord }) => {
    if (sp.paymentSystemName === "stripe") {
        return (
            <a
                href={`https://dashboard.stripe.com/products/${sp.paymentSystemProductId}`}
                target="_blank"
                className="underline"
                rel="noreferrer"
            >
                {sp.paymentSystemProductId}
            </a>
        );
    }
    return <>{sp.paymentSystemProductId}</>;
};

const TransactionLink = ({ sp }: { sp: OrganisationSubscriptionRecord }) => {
    if (sp.paymentSystemName === "stripe") {
        if (sp.paymentSystemTransactionId.startsWith("sub_")) {
            return (
                <a
                    href={`https://dashboard.stripe.com/subscriptions/${sp.paymentSystemTransactionId}`}
                    target="_blank"
                    className="underline"
                    rel="noreferrer"
                >
                    {sp.paymentSystemTransactionId}
                </a>
            );
        }
        if (sp.paymentSystemTransactionId.startsWith("pi_")) {
            return (
                <a
                    href={`https://dashboard.stripe.com/payments/${sp.paymentSystemProductId}`}
                    target="_blank"
                    className="underline"
                    rel="noreferrer"
                >
                    {sp.paymentSystemProductId}
                </a>
            );
        }
    }
    return <>{sp.paymentSystemProductId}</>;
};

const CustomerLink = ({ sp }: { sp: OrganisationSubscriptionRecord }) => {
    if (sp.paymentSystemName === "stripe") {
        return (
            <a
                href={`https://dashboard.stripe.com/customers/${sp.paymentSystemCustomerId}`}
                target="_blank"
                className="underline"
                rel="noreferrer"
            >
                {sp.paymentSystemCustomerId}
            </a>
        );
    }
    return <>{sp.paymentSystemCustomerId}</>;
};

const OrgSubsSuperAdmin = ({
    allSubs,
    title,
}: {
    allSubs: OrganisationSubscriptionRecord[];
    title: string;
}) => {
    return (
        <div className="ml-16">
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <div className="mt-8 flow-root">
                <div className="-mx-6 -my-2 overflow-x-auto lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="pl-6 pr-3 text-sm font-semibold text-left text-white py-3.5 sm:pl-0"
                                    >
                                        Created
                                    </th>
                                    <th
                                        scope="col"
                                        className="pl-6 pr-3 text-sm font-semibold text-left text-white py-3.5 sm:pl-0"
                                    >
                                        Valid Until
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Customer Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Provider
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Product Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Transaction Id
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {allSubs &&
                                    allSubs.map((sp) => {
                                        const createdDate = useFormattedDate(
                                            sp.createdDate
                                        );
                                        const validUntil = useFormattedDate(
                                            sp.validUntil
                                        );
                                        return (
                                            <tr key={sp.id}>
                                                <td className="py-4 pl-6 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0">
                                                    {createdDate}
                                                </td>
                                                <td className="py-4 pl-6 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0">
                                                    {validUntil}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {sp.productDisplayName}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {
                                                        sp.paymentSystemCustomerEmail
                                                    }
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    <CustomerLink sp={sp} />
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {sp.paymentSystemMode}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {sp.paymentSystemName}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    <ProductLink sp={sp} />
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    <TransactionLink sp={sp} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgSubsSuperAdmin;
