import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
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

    if (isError) {
        return <Error message={"Error finding your subscriptions"} />;
    }
    if (isLoading) {
        return <Loading />;
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
