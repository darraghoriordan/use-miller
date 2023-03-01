import { OrganisationSubscriptionRecord } from "@use-miller/shared-api-client";
import { colorVariants } from "@use-miller/shared-frontend-tooling";
import ManageBillingLink from "./ManageBillingLink";

export default function SubscriptionActionCard({
    subscriptionRecord,
    colorVariant,
}: {
    subscriptionRecord: OrganisationSubscriptionRecord;
    colorVariant: "green" | "red" | "amber" | "cyan" | "violet" | "pink";
}) {
    return (
        <div
            className={`p-8 overflow-hidden rounded-md text-gray-500 bg-dark-accent hover:shadow-lg ${colorVariants[colorVariant].hoverShadow} ${colorVariants[colorVariant].hoverForeground}`}
        >
            <div className="flex flex-col items-center space-y-6">
                <h3 className="text-4xl font-medium text-light-accent">
                    {subscriptionRecord.productDisplayName}
                </h3>
                {subscriptionRecord.paymentSystemMode === "subscription" && (
                    <p className="text-sm text-gray-500">
                        {`Your subscription is valid until ${subscriptionRecord.validUntil?.toLocaleDateString()}`}
                    </p>
                )}

                <ManageBillingLink
                    subscriptionUuid={subscriptionRecord.uuid}
                    paymentProvider={subscriptionRecord.paymentSystemName}
                />
            </div>
        </div>
    );
}
