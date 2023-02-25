import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import useGetPaymentLink from "./payments/useGetPaymentLink";
import StyledButton from "@use-miller/shared-frontend-tooling/src/components/StyledButton";

export default function NoSubscriptions({
    organisationUuid,
}: {
    organisationUuid?: string;
}) {
    const { mutateAsync } = useGetPaymentLink();

    const onClick = async () => {
        const link = await mutateAsync({
            successFrontendPath: "/account",
            cancelFrontendPath: "/account",
            lineItems: [
                {
                    price: import.meta.env
                        .VITE_STRIPE_REGULAR_PRICE_ID as string,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            organisationId: organisationUuid,
        });

        window.location.href = link.stripeSessionUrl;
    };

    return (
        <div className="p-8 bg-dark-accent rounded-md">
            <h3 className="text-lg font-medium text-white">
                You have no subscriptions.
            </h3>
            <p className="mt-6 text-sm text-gray-200">
                Get started with Miller by subscribing.
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
