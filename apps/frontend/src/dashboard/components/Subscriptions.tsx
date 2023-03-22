import { OrganisationSubscriptionRecord } from "@use-miller/shared-api-client";
import { SingleProduct } from "./SingleProduct.jsx";
import { SingleSubscription } from "./SingleSubscription.jsx";

export const Subscriptions = ({
    subs,
}: {
    subs: OrganisationSubscriptionRecord[];
}) => {
    return (
        <div className=" border-white">
            <h2 className="text-3xl font-bold text-white w-full">
                Your Products and Subscriptions
            </h2>

            <div className="mt-16 mb-32 flex flex-col space-y-8">
                {subs.map((sub) => {
                    const isSubscription =
                        sub.paymentSystemMode === "subscription";

                    if (isSubscription) {
                        <SingleSubscription
                            key={sub.id}
                            subscriptionRecord={sub}
                        />;
                    }
                    return (
                        <SingleProduct key={sub.id} subscriptionRecord={sub} />
                    );
                })}
            </div>
        </div>
    );
};
