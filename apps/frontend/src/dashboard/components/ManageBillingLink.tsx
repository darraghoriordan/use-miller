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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    let linkClick = async (uuid: string) => {
        setIsLoading(true);
        setErrorMessage(null);
        const url = new URL(window.location.href);
        try {
            const response = await fetch("/api/stripe/customer-portal-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Idempotency-Key": globalThis.crypto.randomUUID(),
                },
                body: JSON.stringify({
                    returnUrl: url.pathname,
                    subscriptionRecordUuid: uuid,
                }),
            });

            if (!response.ok) {
                throw new Error("Unable to open billing right now.");
            }

            const link = (await response.json()) as {
                sessionUrl: string;
            };
            window.location.href = link.sessionUrl;
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to open billing right now.",
            );
            setIsLoading(false);
        }
    };

    return (
        <div>
            <StyledButton
                onClick={() => void linkClick(subscriptionUuid)}
                color={productColor}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Manage Billing"}
                {!isLoading && paymentProvider ? " on " + paymentProvider : ""}
                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
            </StyledButton>
            {errorMessage && (
                <p className="mt-2 text-sm text-red-200" role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default ManageBillingLink;
