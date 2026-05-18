import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import StyledButton from "../../components/StyledButton";
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
    const [isLoading, setIsLoading] = useState(false);

    let linkClick = async (uuid: string) => {
        setIsLoading(true);
        const url = new URL(window.location.href);

        const response = await fetch("/api/stripe/customer-portal-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                returnUrl: url.pathname,
                subscriptionRecordUuid: uuid,
            }),
        });

        if (!response.ok) {
            setIsLoading(false);
            throw new Error("Failed to create customer portal session");
        }

        const link = (await response.json()) as {
            sessionUrl: string;
        };

        // redirect to it
        window.location.href = link.sessionUrl;
    };

    return (
        <StyledButton
            onClick={() => void linkClick(subscriptionUuid)}
            color={productColor}
            disabled={isLoading}
        >
            {isLoading ? "Loading..." : "Manage Billing"}
            {!isLoading && paymentProvider ? " on " + paymentProvider : ""}
            <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
        </StyledButton>
    );
};

export default ManageBillingLink;
