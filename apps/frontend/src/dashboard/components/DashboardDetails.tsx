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
}: {
    currentOrg: Organisation;
    subs: OrganisationSubscriptionRecord[];
    subAssets: SubscriptionAsset[];
    currentUser: UserDto;
}) => {
    const isOwner = currentUser.memberships.some(
        (m) =>
            m.organisationId === currentOrg.id &&
            m.roles?.some((r) => r.name === "owner")
    );
    let subsComponent = <Subscriptions subs={subs} subAssets={subAssets} />;

    if (subs.length === 0) {
        subsComponent = (
            <>
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
            </>
        );
    }

    return (
        <div className="ml-16">
            <h1 className="text-4xl font-bold text-white mb-8">
                {currentOrg.name}
            </h1>
            <GithubUserForm />
            <div className="mt-16 mb-32">{subsComponent}</div>
        </div>
    );
};
