import React from "react";
import StyledHeader1 from "../components/StyledHeader1";
import { Container } from "../layout/Container";
import useGetAllSubscriptions from "./admin-apis/useGetAllSubscriptions";

const PaymentsSuperAdmin = () => {
    const { isLoading, isError, data } = useGetAllSubscriptions();

    return (
        <Container>
            <StyledHeader1>Payments and Subscriptions</StyledHeader1>

            <div className="mt-8 flow-root">
                <div className="-mx-6 -my-2 overflow-x-auto lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="pl-6 pr-3 text-sm font-semibold text-left text-gray-900 py-3.5 sm:pl-0"
                                    >
                                        Created
                                    </th>
                                    <th
                                        scope="col"
                                        className="pl-6 pr-3 text-sm font-semibold text-left text-gray-900 py-3.5 sm:pl-0"
                                    >
                                        Valid Until
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Cust Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Payment
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        ProductId
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Transaction
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data &&
                                    data.map((sp) => (
                                        <tr key={sp.id}>
                                            <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                                                {sp.createdDate.toLocaleDateString()}
                                            </td>
                                            <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                                                {sp.validUntil.toLocaleDateString()}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {sp.productDisplayName}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {sp.paymentSystemCustomerEmail}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {sp.paymentSystemCustomerId}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {sp.paymentSystemMode}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {sp.paymentSystemName}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {sp.paymentSystemProductId}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {sp.paymentSystemTransactionId}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PaymentsSuperAdmin;
