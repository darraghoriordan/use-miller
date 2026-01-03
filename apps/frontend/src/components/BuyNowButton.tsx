import type { components } from "../shared/types/api-specs";
type UserDto = components["schemas"]["UserDto"];
import clsx from "clsx";
import { ThemeColor } from "../styles/themeColors";
import StyledButton from "./StyledButton";
import { useGetPaymentLink } from "../hooks/useGetPaymentLink";

// might pass this in as a param later
const productMapping = [
    {
        productKey: "miller-start",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID,
        mode: "subscription",
    },
    {
        productKey: "miller-start-consulting",
        stripePriceId:
            process.env.NEXT_PUBLIC_STRIPE_MILLER_CONSULTING_PRICE_ID,
        mode: "subscription",
    },

    {
        productKey: "dev-shell",
        stripePriceId:
            process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRICE_NO_RECURRENCE_ID,
        mode: "payment",
    },
];
/**
 * Logged in users go to payment
 * Logged out users go to sign up
 * @param param0
 * @returns
 */
export function BuyNowButton({
    user,
    productKey,
    color,
    className,
    text,
}: {
    user: UserDto;
    productKey: string;
    color: ThemeColor;
    className?: string;
    text?: string;
}) {
    const { mutateAsync } = useGetPaymentLink();

    const orgUuid = user?.memberships?.find((m) =>
        m.roles?.some((r) => r.name === "owner"),
    )?.organisation?.uuid;

    const product = productMapping.find((p) => p.productKey === productKey);
    if (!product) {
        throw new Error(`Product ${productKey} not found`);
    }

    if (!orgUuid) {
        throw new Error("User must be an owner of an organisation to purchase");
    }

    const onClick = async () => {
        const link = await mutateAsync({
            successFrontendPath: "/dashboard",
            cancelFrontendPath: "/dashboard",
            lineItems: [
                {
                    price: product.stripePriceId,
                    quantity: 1,
                },
            ],
            mode: product.mode,
            organisationUuid: orgUuid,
        });
        window.location.href = link.stripeSessionUrl;
    };

    return (
        <StyledButton
            onClick={onClick}
            color={color}
            className={clsx(
                "rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white",
                className,
            )}
        >
            {text || "Buy now"}
        </StyledButton>
    );
}
