import useGetCustomerPortalSession from "./payments/useGetCustomerPortalSession";
import StyledButton from "@use-miller/shared-frontend-tooling/src/components/StyledButton";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
const ManageBillingLink = ({
    subscriptionUuid,
    paymentProvider,
}: {
    subscriptionUuid: string;
    paymentProvider: string;
}) => {
    const { mutateAsync } = useGetCustomerPortalSession();
    let linkClick = async (uuid: string) => {
        const url = new URL(window.location.href);

        const link = await mutateAsync({
            returnUrl: url.pathname,
            subscriptionRecordUuid: uuid,
        });
        window.location.href = link.sessionUrl;
    };

    return (
        <StyledButton onClick={() => linkClick(subscriptionUuid)}>
            Manage Billing {paymentProvider ? "on " + paymentProvider : ""}
            <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
        </StyledButton>
    );
};

export default ManageBillingLink;
