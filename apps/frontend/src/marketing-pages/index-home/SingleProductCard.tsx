import { StaticImageData } from "next/image.js";
import StyledLink from "../../components/StyledLink.jsx";
import { colorVariants, ThemeColor } from "../../styles/themeColors.js";
import Image from "next/image";
import clsx from "clsx";

export const SingleProductCard = ({
    colorVariant,
    title,
    blurb,
    benefits,
    image,
    learnMoreLink,
    altLinkText,
    altLink,
}: {
    colorVariant: ThemeColor;
    title: string;
    blurb: string;
    benefits: string[];
    image: StaticImageData;
    learnMoreLink: string;
    altLinkText: string;
    altLink: string;
}) => {
    return (
        <div
            className={clsx(
                "p-8 overflow-hidden rounded-md text-light-accent bg-dark-accent hover:shadow-lg",
                colorVariants[colorVariant].hoverShadow,
                "group"
            )}
        >
            <div className="flex flex-col md:flex-row space-y-8 justify-between items-center">
                <Image
                    alt={"product logo"}
                    className="object-scale-down rounded-lg"
                    src={image}
                    width={300}
                    height={300}
                />

                <div className="flex flex-col items-left space-y-6 md:w-2/3 md:ml-8">
                    <h3 className={clsx("text-4xl font-medium ")}>{title}</h3>
                    <p
                        className={clsx(
                            colorVariants[colorVariant].groupHoverForeground
                        )}
                    >
                        {blurb}
                    </p>
                    <ul className="list-disc list-inside ml-8">
                        {benefits.map((benefit) => (
                            <li key={benefit}>{benefit}</li>
                        ))}
                    </ul>
                    <div className="flex items-center space-x-8">
                        <StyledLink
                            href={learnMoreLink}
                            color={colorVariant}
                            className={" border-white border"}
                        >
                            Learn more &rarr;
                        </StyledLink>
                        <StyledLink
                            href={altLink}
                            color={colorVariant}
                            className={""}
                        >
                            {altLinkText} &rarr;
                        </StyledLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
