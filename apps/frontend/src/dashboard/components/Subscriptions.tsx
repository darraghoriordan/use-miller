"use client";

import type { components } from "../../shared/types/api-specs";
type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];
type SubscriptionAsset = components["schemas"]["SubscriptionAsset"];
import { SingleProduct } from "./SingleProduct";
import { SingleSubscription } from "./SingleSubscription";
import {
    FadeInOnScroll,
    StaggerContainer,
    StaggerItem,
} from "../../components/Animations";

export const Subscriptions = ({
    subs,
    subAssets,
}: {
    subs: OrganisationSubscriptionRecord[];
    subAssets: SubscriptionAsset[];
}) => {
    return (
        <div>
            <FadeInOnScroll>
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-display text-2xl md:text-3xl text-security-light">
                        Your Products and Subscriptions
                    </h2>
                    <div className="h-px flex-1 bg-security-border" />
                </div>
            </FadeInOnScroll>

            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                {subs.map((sub) => {
                    const singleSubAssets = subAssets?.filter(
                        (sa) => sa.internalSku === sub.internalSku,
                    );
                    const isSubscription =
                        sub.paymentSystemMode === "subscription";

                    if (isSubscription) {
                        return (
                            <StaggerItem key={sub.id}>
                                <SingleSubscription
                                    subscriptionRecord={sub}
                                    subscriptionAssets={singleSubAssets}
                                />
                            </StaggerItem>
                        );
                    }
                    return (
                        <StaggerItem key={sub.id}>
                            <SingleProduct
                                subscriptionRecord={sub}
                                subscriptionAssets={singleSubAssets}
                            />
                        </StaggerItem>
                    );
                })}
            </StaggerContainer>
        </div>
    );
};
