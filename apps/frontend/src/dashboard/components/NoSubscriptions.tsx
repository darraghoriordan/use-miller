import StyledLink from "../../components/StyledLink";
import { colorVariants, getProductColor } from "../../styles/themeColors";
import clsx from "clsx";

export default function NoSubscriptions({
    productName,
    productKey,
    isOrganisationOwner,
}: {
    productName: string;
    productKey: string;
    isOrganisationOwner: boolean;
}) {
    const productColor = getProductColor(productKey);
    const colorVariant = colorVariants[productColor];

    return (
        <div
            className={clsx(
                "relative overflow-hidden rounded-lg",
                "bg-security-dark border border-security-border",
                "transition-all duration-300",
                colorVariant.hoverBorder,
            )}
        >
            {/* Product color accent bar */}
            <div
                className={clsx(
                    "absolute left-0 top-0 bottom-0 w-1",
                    colorVariant.background,
                    "opacity-50",
                )}
            />

            <div className="p-6 pl-8">
                <h3
                    className={clsx(
                        "font-display text-lg mb-2",
                        colorVariant.foreground,
                    )}
                >
                    {productName}
                </h3>
                <p className="text-security-text text-sm">
                    Your organization has no active subscription for this
                    product.
                </p>

                {!isOrganisationOwner && (
                    <p className="text-security-muted text-sm mt-4">
                        Contact the owner of your organization to subscribe.
                    </p>
                )}

                {isOrganisationOwner && (
                    <div className="mt-6">
                        <StyledLink
                            color={productColor}
                            href={`/${productKey}#pricing`}
                        >
                            Get {productName}
                        </StyledLink>
                    </div>
                )}
            </div>
        </div>
    );
}
