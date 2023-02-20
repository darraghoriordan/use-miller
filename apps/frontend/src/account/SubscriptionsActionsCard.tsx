import { OrganisationSubscriptionRecord } from "@use-miller/shared-api-client";
import ManageBillingLink from "./ManageBillingLink";

export default function SubscriptionActionCard({
    subscriptionRecord,
    colorVariant,
}: {
    subscriptionRecord: OrganisationSubscriptionRecord;
    colorVariant: "green" | "red" | "amber" | "cyan" | "violet" | "pink";
}) {
    const colorVariants = {
        green: {
            hoverShadow: "hover:shadow-green-500/30",
            foreground: "text-green-500",
            hoverForeground: "hover:text-green-500",
        },
        red: {
            hoverShadow: "hover:shadow-red-500/30",
            foreground: "text-red-500",
            hoverForeground: "hover:text-red-500",
        },
        amber: {
            hoverShadow: "hover:shadow-amber-500/30",
            foreground: "text-amber-500",
            hoverForeground: "hover:text-amber-500",
        },
        cyan: {
            hoverShadow: "hover:shadow-cyan-500/30",
            foreground: "text-cyan-500",
            hoverForeground: "hover:text-cyan-500",
        },
        violet: {
            hoverShadow: "hover:shadow-violet-500/30",
            foreground: "text-violet-500",
            hoverForeground: "hover:text-violet-500",
        },
        pink: {
            hoverShadow: "hover:shadow-pink-500/30",
            foreground: "text-pink-500",
            hoverForeground: "hover:text-pink-500",
        },
    };

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
                        {`Your subscription is valid until ${subscriptionRecord.validUntil.toLocaleDateString()}`}
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
