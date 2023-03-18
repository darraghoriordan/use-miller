import { OrganisationSubscriptionRecord } from "@use-miller/shared-api-client";
import { SingleSubscription } from "./SingleSubscription.jsx";

export const Subscriptions = ({
    subs,
}: {
    subs: OrganisationSubscriptionRecord[];
}) => {
    return (
        <div className=" border-white">
            <h2 className="text-3xl font-bold text-white w-full">
                Your Subscriptions
            </h2>

            <div className="mt-16 mb-32 flex flex-col space-y-8">
                {subs.map((sub) => {
                    return (
                        <SingleSubscription
                            key={sub.id}
                            subscriptionRecord={sub}
                        />
                    );
                })}
            </div>
        </div>
    );
};
