import StyledLink from "../../components/StyledLink.jsx";
import { colorVariants } from "../../styles/themeColors.js";
import Image from "next/image";
import clsx from "clsx";
import { HeroProduct } from "./Hero.jsx";
import { GitHubIcon } from "../../components/GithubIcon.jsx";

export const GithubLink = ({ githubUrl }: { githubUrl: string }) => {
    return (
        <a href={githubUrl}>
            <div className="flex items-center space-x-8 hover:underline underline-offset-4 text-white">
                <GitHubIcon className="w-12 h-12 fill-white pr-3" />
                View on GitHub
            </div>
        </a>
    );
};
export const SingleProductCard = ({
    colorVariant,
    title,
    blurb,
    benefits,
    image,
    learnMoreLink,
    altLinkText,
    altLink,
    githubUrl,
}: HeroProduct) => {
    return (
        <div
            className={clsx(
                "p-8 overflow-hidden rounded-md text-light-accent bg-dark-accent hover:shadow-lg",
                colorVariants[colorVariant].hoverShadow,
                "group",
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
                            colorVariants[colorVariant].groupHoverForeground,
                        )}
                    >
                        {blurb}
                    </p>
                    <ul className="list-disc list-inside ml-8">
                        {benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
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

                        {githubUrl ? (
                            <GithubLink githubUrl={githubUrl} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
