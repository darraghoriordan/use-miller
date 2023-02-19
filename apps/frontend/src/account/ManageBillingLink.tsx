import useGetCustomerPortalSession from "./payments/useGetCustomerPortalSession";

const ManageBillingLink = ({
    subscriptionUuid,
}: {
    subscriptionUuid: string;
}) => {
    const { mutateAsync } = useGetCustomerPortalSession();
    let linkClick = async (uuid: string) => {
        const link = await mutateAsync({
            returnUrl: window.location.href,
            subscriptionRecordUuid: uuid,
        });
        window.location.href = link.sessionUrl;
    };

    return (
        <button onClick={() => linkClick(subscriptionUuid)}>
            Manage Billing
        </button>
    );
};

export default ManageBillingLink;
