import ManageBillingLink from "./ManageBillingLink";
import NoSubscriptions from "./NoSubscriptions";
import useGetSubscriptions from "./subscriptions/useGetSubscriptions";

export const Subscriptions = ({ orgId }: { orgId: number }) => {
    const { data: subsData, isLoading, isError } = useGetSubscriptions(orgId);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error getting subscriptions</div>;
    }

    if (subsData && subsData?.length === 0) {
        return <NoSubscriptions />;
    }
    return (
        <>
            {subsData?.map((subscription) => {
                return (
                    <div>
                        <div>{subscription.productDisplayName}</div>
                        <div>{subscription.paymentSystemMode}</div>
                        <ManageBillingLink
                            subscriptionUuid={subscription.uuid}
                        />
                    </div>
                );
            })}
        </>
    );
};
