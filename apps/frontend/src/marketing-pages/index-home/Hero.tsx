import { Container } from "../../components/Container";
import devToolsLogo from "./logos/devToolsLogo.png";
import devShellLogo from "./logos/devShellLogo.webp";
import millerStartLogo from "./logos/millerStart.png";
import adminImage from "../miller-start-home/intro-media/dashboard.png";
import codeImage from "../miller-start-home/intro-media/code.png";
import Image from "next/image";
import { UserDto } from "@use-miller/shared-api-client";
import { SingleProductCard } from "./SingleProductCard.jsx";
import { ThemeColor } from "../../styles/themeColors.js";

export function Hero({ user }: { user: UserDto }) {
    const products = [
        {
            title: "Miller Dev Shell",
            blurb: "Say Goodbye to manual dev environment configuration",
            image: devShellLogo,
            learnMoreLink: "/dev-shell",
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
            learnMoreLink: "/local-dev-tools",
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
            learnMoreLink: "/miller-start",
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
                                    Code Safer. <br></br>Code Faster.
                                </h1>
                                <p className="mx-auto mt-12 max-w-2xl text-left text-lg text-gray-400 md:mx-0">
                                    Miller makes dev tools that save you time so
                                    you can focus on building your product and
                                    helping your customers.
                                </p>
                            </div>
                            <div className="intro-image-rotation md:relative w-1/2 md:w-full mt-20 md:mt-0 md:mb-0 hidden md:block">
                                <div>
                                    <Image
                                        priority
                                        alt="admin image"
                                        src={adminImage}
                                        className="md:max-w-md intro-image absolute md:-translate-y-16 md:translate-x-14 -translate-y-4 translate-x-2"
                                    />
                                    <Image
                                        priority
                                        alt="product image"
                                        src={codeImage}
                                        className="md:max-w-md intro-image absolute md:-translate-x-7 translate-x-7"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-col space-y-16 mb-32 mt-16 md:mt-16"
                        id="features"
                    >
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
