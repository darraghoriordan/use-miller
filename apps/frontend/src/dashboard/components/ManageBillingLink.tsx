import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../components/StyledButton";
import { useGetCustomerPortalSession } from "../../hooks/useGetCustomerPortalSession";
import { ThemeColor } from "../../styles/themeColors";

const ManageBillingLink = ({
    subscriptionUuid,
    paymentProvider,
    productColor = "primary",
}: {
    subscriptionUuid: string;
    paymentProvider: string;
    productColor?: ThemeColor;
}) => {
    const { mutateAsync } = useGetCustomerPortalSession();
    let linkClick = async (uuid: string) => {
        const url = new URL(window.location.href);

        const link = await mutateAsync({
            returnUrl: url.pathname,
            subscriptionRecordUuid: uuid,
        });
        // redirect to it
        window.location.href = link.sessionUrl;
    };

    return (
        <StyledButton
            onClick={() => linkClick(subscriptionUuid)}
            color={productColor}
        >
            Manage Billing {paymentProvider ? "on " + paymentProvider : ""}
            <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
        </StyledButton>
    );
};

export default ManageBillingLink;
