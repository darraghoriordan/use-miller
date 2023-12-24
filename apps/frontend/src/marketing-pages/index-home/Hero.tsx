import { Container } from "../../components/Container";
import devToolsLogo from "./logos/devToolsLogo.png";
import devShellLogo from "./logos/devShellLogo.webp";
import millerStartLogo from "./logos/millerStart.png";
import homeHero from "../miller-start-home/intro-media/home-hero.jpg";
import Image, { StaticImageData } from "next/image";
import { UserDto } from "@use-miller/shared-api-client";
import { SingleProductCard } from "./SingleProductCard.jsx";
import { ThemeColor } from "../../styles/themeColors.js";

export interface HeroProduct {
    colorVariant: ThemeColor;
    title: string;
    blurb: string;
    benefits: string[];
    image: StaticImageData;
    learnMoreLinkUrl: string;
    learnMoreLinkText: string;
    altLinkText: string;
    altLink: string;
    githubUrl?: string;
}

export function Hero({ user }: { user: UserDto }) {
    const products: HeroProduct[] = [
        {
            title: "Miller Dev Shell",
            blurb: "Say Goodbye to manual dev environment configuration",
            image: devShellLogo,
            learnMoreLinkUrl: "/dev-shell",
            learnMoreLinkText: "Save hours with DevShell",
            altLinkText: "Preview the code now",

            altLink:
                "/docs/dev-shell/reference/dev-shell-scripts/L1JFQURNRS5tZA==",
            benefits: [
                "Set up a new machine in minutes, not hours",
                "Well tested, re-runnable configuration scripts",
                "50+ of the best modern developer tools, pre-configured",
                "Designed for a consistent shell on Mac and Windows WSL",
                "Perpetual licence and updates",
            ],
            colorVariant: "green" as ThemeColor,
        },
        {
            title: "Local Dev Tools",
            blurb: "Local dev utilities to keep your business data safe",
            image: devToolsLogo,
            learnMoreLinkUrl: "/local-dev-tools",
            learnMoreLinkText: "Try dev tools for free!",

            githubUrl:
                "https://github.com/darraghoriordan/ssh-tool-new-electron",
            altLinkText: "Download now",
            altLink: "/local-dev-tools#download",
            benefits: [
                "Keep your business data safe from random tools websites",
                "Local utilities for Git repository management",
                "Not a SaaS! - Perpetual licence and ownership",
                "Universal app - Mac and Windows",
            ],
            colorVariant: "cyan" as ThemeColor,
        },
        {
            colorVariant: "violet" as ThemeColor,
            title: "Miller Start",
            blurb: "Master full-stack web development by example",
            image: millerStartLogo,
            githubUrl: "https://github.com/darraghoriordan/use-miller",
            learnMoreLinkUrl: "/miller-start",
            learnMoreLinkText: "Try Miller Start for free!",

            altLinkText: "Preview the code now",
            altLink: "/docs/miller-start/reference/miller-web/L1JFQURNRS5tZA==",
            benefits: [
                "Become a pro with NextJs, NestJs, tailwind, PostgreSQL, Redis and more",
                "Accelerate your product development with a fully featured, full-stack app starter",
                "Setup a new full-stack app in minutes with scripts and terraform",
                "Advance your learning from beginner tutorials",
            ],
        },
    ];

    return (
        <Container className="pt-20 text-left ">
            <div className="flex ">
                <div className="flex flex-col">
                    <div
                        style={{
                            background:
                                "linear-gradient(#d2a8ff, #a371f7 10%, #196c2e 70%, #2ea043 80%, #56d364)",
                        }}
                        className="mr-4 h-full w-[2px] lg:mr-12"
                    >
                        &nbsp;
                    </div>
                </div>
                <div>
                    <div id="hero">
                        <div className="md:flex">
                            <div className="mr-8">
                                <h1 className="leading-snug mx-auto max-w-2xl font-display text-6xl font-medium tracking-tight text-white md:mx-0">
                                    Use Miller tools to be a more effective
                                    developer
                                </h1>
                                <p className="mx-auto mt-12 max-w-2xl text-left text-lg text-gray-400 md:mx-0">
                                    Hi! I'm Darragh 👋, I make all the tools
                                    here.
                                </p>
                                <p className="mx-auto mt-4 max-w-2xl text-left text-lg text-gray-400 md:mx-0">
                                    I've been a dev for 15 years, and I believe
                                    every dev can be more effective with great
                                    tools. These are mine.
                                </p>
                                <p className="mx-auto mt-4 max-w-2xl text-left text-lg text-gray-400 md:mx-0">
                                    Take a look around. Use the chat on the
                                    bottom right if you have any questions!
                                </p>
                            </div>
                            <div className="md:relative w-1/2 md:w-full mt-10 md:mt-0 md:mb-0 hidden md:block">
                                <div>
                                    <Image
                                        priority
                                        alt="admin image"
                                        src={homeHero}
                                        className="md:max-w-mlg "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-col space-y-16 mb-32 mt-16 md:mt-16"
                        id="features"
                    >
                        <h2 className="pt-8 leading-snug mx-auto max-w-2xl font-display text-4xl font-medium tracking-tight text-white md:mx-0">
                            Check out the tools
                        </h2>
                        {products.map((product) => (
                            <SingleProductCard
                                key={product.title}
                                {...product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}
