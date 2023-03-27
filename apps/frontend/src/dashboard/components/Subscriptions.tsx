import {
    OrganisationSubscriptionRecord,
    SubscriptionAsset,
} from "@use-miller/shared-api-client";
import { SingleProduct } from "./SingleProduct.jsx";
import { SingleSubscription } from "./SingleSubscription.jsx";

export const Subscriptions = ({
    subs,
    subAssets,
}: {
    subs: OrganisationSubscriptionRecord[];
    subAssets: SubscriptionAsset[];
}) => {
    return (
        <div className=" border-white">
            <h2 className="text-3xl font-bold text-white w-full">
                Your Products and Subscriptions
            </h2>

            <div className="mt-16 mb-32 flex flex-col space-y-8">
                {subs.map((sub) => {
                    const singleSubAssets = subAssets?.filter(
                        (sa) => sa.internalSku === sub.internalSku
                    );
                    const isSubscription =
                        sub.paymentSystemMode === "subscription";

                    if (isSubscription) {
                        return (
                            <SingleSubscription
                                key={sub.id}
                                subscriptionRecord={sub}
                                subscriptionAssets={singleSubAssets}
                            />
                        );
                    }
                    return (
                        <SingleProduct
                            key={sub.id}
                            subscriptionRecord={sub}
                            subscriptionAssets={singleSubAssets}
                        />
                    );
                })}
            </div>
        </div>
    );
};
