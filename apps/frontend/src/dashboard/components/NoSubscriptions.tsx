import StyledLink from "../../components/StyledLink.jsx";
import { colorVariants } from "../../styles/themeColors.js";

export default function NoSubscriptions({
    productName,
    productKey,
    isOrganisationOwner,
}: {
    productName: string;
    productKey: string;
    isOrganisationOwner: boolean;
}) {
    const colorVariant = "green";
    return (
        <div
            className={`p-8 overflow-hidden text-center rounded-md text-gray-500 bg-dark-accent hover:shadow-lg ${colorVariants[colorVariant].hoverShadow} ${colorVariants[colorVariant].hoverForeground}`}
        >
            <h3 className="text-lg font-medium text-white">
                Your org has no subscriptions for <strong>{productName}</strong>
                .
            </h3>
            {!isOrganisationOwner && (
                <p className="mt-6 text-sm text-gray-200">
                    Contact the owner of your organisation to subscribe.
                </p>
            )}
            {isOrganisationOwner && (
                <>
                    <p className="mt-6 text-sm text-gray-200">
                        Get started by subscribing.
                    </p>
                    <div className="mt-6 md:w-1/2 mx-auto">
                        <StyledLink color="green" href={`/${productKey}`}>
                            Go to {productName}
                        </StyledLink>
                    </div>
                </>
            )}
        </div>
    );
}
