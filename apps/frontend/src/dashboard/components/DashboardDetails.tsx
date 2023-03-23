import {
    Organisation,
    OrganisationSubscriptionRecord,
    UserDto,
} from "@use-miller/shared-api-client";
import NoSubscriptions from "./NoSubscriptions.jsx";
import { Subscriptions } from "./Subscriptions.jsx";

export const DashboardDetails = ({
    currentOrg,
    subs,
    currentUser,
}: {
    currentOrg: Organisation;
    subs: OrganisationSubscriptionRecord[];
    currentUser: UserDto;
}) => {
    const isOwner = currentUser.memberships.some(
        (m) =>
            m.organisationId === currentOrg.id &&
            m.roles?.some((r) => r.name === "owner")
    );
    let subsComponent = <Subscriptions subs={subs} />;

    if (subs.length === 0) {
        subsComponent = (
            <>
                <NoSubscriptions
                    productName="Miller Start"
                    isOrganisationOwner={isOwner}
                />
                <NoSubscriptions
                    productName="Dev Shell"
                    isOrganisationOwner={isOwner}
                />
            </>
        );
    }

    return (
        <div className="ml-16">
            <h1 className="text-4xl font-bold text-white">{currentOrg.name}</h1>
            <div className="mt-16 mb-32">{subsComponent}</div>
        </div>
    );
};
