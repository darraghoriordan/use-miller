import NoSubscriptions from "./NoSubscriptions";
import useGetSubscriptions from "./subscriptions/useGetSubscriptions";
import SubscriptionActionCard from "./SubscriptionsActionsCard";

export const Subscriptions = ({
    orgId,
    orgUuid,
}: {
    orgId: number;
    orgUuid: string;
}) => {
    const { data: subsData, isLoading, isError } = useGetSubscriptions(orgId);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error getting subscriptions</div>;
    }

    if (subsData && subsData?.length === 0) {
        return <NoSubscriptions organisationUuid={orgUuid} />;
    }
    return (
        <div className="grid grid-cols-2 gap-20">
            {subsData?.map((subscription) => {
                return (
                    <SubscriptionActionCard
                        key={subscription.uuid}
                        subscriptionRecord={subscription}
                        colorVariant="green"
                    />
                );
            })}
        </div>
    );
};
