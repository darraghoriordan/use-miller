"use client";

import type { components } from "../../shared/types/api-specs";
type Organisation = components["schemas"]["Organisation"];
type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];
type SubscriptionAsset = components["schemas"]["SubscriptionAsset"];
type UserDto = components["schemas"]["UserDto"];
import { GithubUserForm } from "./GithubUserForm";
import NoSubscriptions from "./NoSubscriptions";
import { Subscriptions } from "./Subscriptions";
import { FadeInOnScroll } from "../../components/Animations";

export const DashboardDetails = ({
    currentOrg,
    subs,
    subAssets,
    currentUser,
    ghUsername,
}: {
    currentOrg: Organisation;
    subs: OrganisationSubscriptionRecord[];
    subAssets: SubscriptionAsset[];
    currentUser: UserDto;
    ghUsername: string | undefined;
}) => {
    const isOwner = currentUser.memberships.some(
        (m) =>
            m.organisationId === currentOrg.id &&
            m.roles?.some((r) => r.name === "owner"),
    );

    let subsComponent = <Subscriptions subs={subs} subAssets={subAssets} />;

    if (subs.length === 0) {
        subsComponent = (
            <div className="space-y-6">
                <FadeInOnScroll>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light">
                            Your Products and Subscriptions
                        </h2>
                        <div className="h-px flex-1 bg-security-border" />
                    </div>
                </FadeInOnScroll>
                <FadeInOnScroll delay={0.1}>
                    <NoSubscriptions
                        productName="Miller Start"
                        productKey="miller-start"
                        isOrganisationOwner={isOwner}
                    />
                </FadeInOnScroll>
                <FadeInOnScroll delay={0.2}>
                    <NoSubscriptions
                        productName="Dev Shell"
                        productKey="dev-shell"
                        isOrganisationOwner={isOwner}
                    />
                </FadeInOnScroll>
            </div>
        );
    }

    return (
        <div className="flex-1 py-8 px-8 md:px-12">
            <FadeInOnScroll>
                <h1 className="font-display text-3xl md:text-4xl text-security-light mb-2">
                    {currentOrg.name}
                </h1>
                <p className="text-security-muted text-sm mb-12">
                    Manage your organization settings and subscriptions
                </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
                <GithubUserForm
                    ghUsername={ghUsername}
                    orgUuid={currentOrg.uuid}
                />
            </FadeInOnScroll>

            <div className="mt-12">{subsComponent}</div>
        </div>
    );
};
