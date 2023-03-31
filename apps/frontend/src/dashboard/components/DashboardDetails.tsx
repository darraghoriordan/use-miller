import {
    Organisation,
    OrganisationSubscriptionRecord,
    SubscriptionAsset,
    UserDto,
} from "@use-miller/shared-api-client";
import { GithubUserForm } from "./GithubUserForm.jsx";
import NoSubscriptions from "./NoSubscriptions.jsx";
import { Subscriptions } from "./Subscriptions.jsx";

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
            m.roles?.some((r) => r.name === "owner")
    );
    let subsComponent = <Subscriptions subs={subs} subAssets={subAssets} />;

    if (subs.length === 0) {
        subsComponent = (
            <div className="flex flex-col space-y-8">
                <h2 className="text-3xl font-bold text-white w-full">
                    Your Products and Subscriptions
                </h2>
                <NoSubscriptions
                    productName="Miller Start"
                    productKey="miller-start"
                    isOrganisationOwner={isOwner}
                />
                <NoSubscriptions
                    productName="Dev Shell"
                    productKey="dev-shell"
                    isOrganisationOwner={isOwner}
                />
            </div>
        );
    }

    return (
        <div className="ml-16">
            <h1 className="text-4xl font-bold text-white mb-8">
                {currentOrg.name}
            </h1>
            <GithubUserForm ghUsername={ghUsername} orgUuid={currentOrg.uuid} />
            <div className="mt-16 mb-32">{subsComponent}</div>
        </div>
    );
};
