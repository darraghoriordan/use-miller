import type { components } from "../../shared/types/api-specs";
type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];
type SubscriptionAsset = components["schemas"]["SubscriptionAsset"];
import { useFormattedDate } from "../../hooks/useFormattedDate";
import {
    colorVariants,
    getProductColorFromSku,
} from "../../styles/themeColors";
import ManageBillingLink from "./ManageBillingLink";
import clsx from "clsx";

export const SingleProduct = ({
    subscriptionRecord,
    subscriptionAssets,
}: {
    subscriptionRecord: OrganisationSubscriptionRecord;
    subscriptionAssets: SubscriptionAsset[];
}) => {
    const createdDate = useFormattedDate(subscriptionRecord.createdDate);
    const productColor = getProductColorFromSku(subscriptionRecord.internalSku);
    const colorVariant = colorVariants[productColor];

    return (
        <div
            className={clsx(
                "relative overflow-hidden rounded-lg",
                "bg-security-dark border border-security-border",
                "hover:border-opacity-70 transition-all duration-300",
                colorVariant.hoverBorder,
                colorVariant.hoverGlow,
            )}
        >
            {/* Product color accent bar */}
            <div
                className={clsx(
                    "absolute left-0 top-0 bottom-0 w-1",
                    colorVariant.background,
                )}
            />

            <div className="p-6 pl-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3
                            className={clsx(
                                "font-display text-xl",
                                colorVariant.foreground,
                            )}
                        >
                            {subscriptionRecord.productDisplayName}
                        </h3>
                        <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                            One-time Purchase
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className="mb-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-security-muted mb-1">
                        Purchased On
                    </p>
                    <p className="text-security-light">{createdDate}</p>
                </div>

                {/* Transaction ID */}
                <div className="mb-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-security-muted mb-1">
                        Transaction ID
                    </p>
                    <p className="text-security-text text-sm break-all font-mono">
                        {subscriptionRecord.paymentSystemTransactionId}
                    </p>
                </div>

                {/* Assets */}
                {subscriptionAssets.length > 0 && (
                    <div className="mb-6 space-y-3">
                        <p className="font-mono text-xs uppercase tracking-wider text-security-muted">
                            Resources
                        </p>
                        {subscriptionAssets.map((asset) => (
                            <div key={asset.id} className="flex flex-col gap-1">
                                <span className="text-security-light text-sm font-medium">
                                    {asset.displayName}
                                </span>
                                <a
                                    href={asset.uri}
                                    className={clsx(
                                        "text-sm transition-colors",
                                        colorVariant.foreground,
                                        "hover:underline underline-offset-2",
                                    )}
                                >
                                    {asset.description}
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* Action */}
                <div className="pt-4 border-t border-security-border">
                    <ManageBillingLink
                        subscriptionUuid={subscriptionRecord.uuid}
                        paymentProvider={subscriptionRecord.paymentSystemName}
                        productColor={productColor}
                    />
                </div>
            </div>
        </div>
    );
};
