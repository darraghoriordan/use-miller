import { OrganisationSubscriptionRecord } from "@use-miller/shared-api-client";
import { useFormattedDate } from "../../hooks/useFormattedDate.js";
import { colorVariants } from "../../styles/themeColors.js";
import ManageBillingLink from "./ManageBillingLink.jsx";

export const SingleProduct = ({
    subscriptionRecord,
}: {
    subscriptionRecord: OrganisationSubscriptionRecord;
}) => {
    // const expiryDate = useFormattedDate(subscriptionRecord.validUntil);
    const createdDate = useFormattedDate(subscriptionRecord.createdDate);
    const colorVariant = "green";
    return (
        <div
            className={`overflow-hidden p-8 rounded-md text-gray-500 bg-dark-accent hover:shadow-lg ${colorVariants[colorVariant].hoverShadow} ${colorVariants[colorVariant].hoverForeground}`}
        >
            <div className="flex flex-col items-center space-y-6">
                <h3 className="text-4xl font-medium text-light-accent">
                    {subscriptionRecord.productDisplayName}
                </h3>
                <div className="flex justify-between w-3/4">
                    <div className="">
                        <p className="mb-1 font-bold text-white">
                            Purchased on
                        </p>
                        <p className="text-white">{createdDate}</p>
                    </div>
                </div>
                <div className="w-3/4">
                    <p className="mb-1 font-bold text-white">
                        Last Transaction Id
                    </p>
                    <p className="text-white break-all">
                        {subscriptionRecord.paymentSystemTransactionId}
                    </p>
                </div>

                <ManageBillingLink
                    subscriptionUuid={subscriptionRecord.uuid}
                    paymentProvider={subscriptionRecord.paymentSystemName}
                />
            </div>
        </div>
    );
};
