import React from "react";
import { BackLink } from "../components/BackLink";
import StyledHeader1 from "../components/StyledHeader1";
import { Container } from "../layout/Container";
import useGetAllPaymentEvents from "./admin-apis/useGetAllPaymentEvents";

const PaymentEventsSuperAdmin = () => {
    const { isLoading, isError, data } = useGetAllPaymentEvents();
    console.log("data:", data);
    return (
        <Container>
            <BackLink to={"/super-admin"} />

            <StyledHeader1>Payments Events</StyledHeader1>
            <p className="my-4">
                Payment events are the webhooks that have been processed by your
                app. You can use these for quick debugging and to see what is
                happening. For more details log into your database or check the
                payment provider's dashboard.
            </p>
            <div className="-mx-6 -my-2 overflow-x-auto lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    {data &&
                        data.map((sp) => {
                            return (
                                <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <>
                                            <div className="">
                                                <dt className="font-medium text-gray-500 text-md">
                                                    Created At
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {sp.createdDate.toLocaleString()}
                                                </dd>
                                            </div>
                                            <div className="">
                                                <dt className="font-medium text-gray-500 text-md">
                                                    Client Reference
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {sp.clientReferenceId}
                                                </dd>
                                            </div>

                                            <div className="col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Event Data
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {" "}
                                                    <pre>
                                                        <code>
                                                            {
                                                                sp.stripeDataAsString
                                                            }
                                                        </code>
                                                    </pre>
                                                </dd>
                                            </div>
                                        </>
                                    </dl>{" "}
                                </div>
                            );
                        })}
                </div>
            </div>
        </Container>
    );
};

export default PaymentEventsSuperAdmin;
