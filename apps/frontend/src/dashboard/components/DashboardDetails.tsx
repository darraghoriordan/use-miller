import { OrganisationSubscriptionRecord } from "@use-miller/shared-api-client";
import NoSubscriptions from "./NoSubscriptions.jsx";
import { Subscriptions } from "./Subscriptions.jsx";

export const DashboardDetails = ({
    title,
    subs,
}: {
    title: string;
    subs: OrganisationSubscriptionRecord[];
}) => {
    let subsComponent = <Subscriptions subs={subs} />;
    if (subs.length === 0) {
        subsComponent = <NoSubscriptions />;
    }

    return (
        <div className="ml-16">
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <div className="mt-16 mb-32">{subsComponent}</div>
        </div>
    );
};
