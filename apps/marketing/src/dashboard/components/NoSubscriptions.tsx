import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
    colorVariants,
    StyledButton,
} from "@use-miller/shared-frontend-tooling";
import { useGetPaymentLink } from "../../hooks/useGetPaymentLink.js";

export default function NoSubscriptions({
    organisationUuid,
}: {
    organisationUuid?: string;
}) {
    const { mutateAsync } = useGetPaymentLink();

    const onClick = async () => {
        const link = await mutateAsync({
            successFrontendPath: "/dashboard",
            cancelFrontendPath: "/dashboard",
            lineItems: [
                {
                    price: process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            organisationId: organisationUuid,
        });

        window.location.href = link.stripeSessionUrl;
    };
    const colorVariant = "green";
    return (
        <div
            className={`p-8 overflow-hidden rounded-md text-gray-500 bg-dark-accent hover:shadow-lg ${colorVariants[colorVariant].hoverShadow} ${colorVariants[colorVariant].hoverForeground}`}
        >
            <h3 className="text-lg font-medium text-white">
                You have no subscriptions.
            </h3>
            <p className="mt-6 text-sm text-gray-200">
                Get started by subscribing.
            </p>
            <div className="mt-6">
                <StyledButton onClick={onClick}>
                    <ShoppingBagIcon
                        className="w-5 h-5 mr-2 -ml-1"
                        aria-hidden="true"
                    />
                    Subscribe now
                </StyledButton>
            </div>
        </div>
    );
}
