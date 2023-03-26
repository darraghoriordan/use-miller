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
            colorVariant: "violet" as ThemeColor,
            title: "Miller Start",
            blurb: "Learn full-stack web development with a NextJS frontend and a NestJS backend.",
            image: millerStartLogo,
            link: "/miller-start",
            benefits: [
                "Accelerate your product development with practical examples",
                "Modules for orgs, memberships, authz payments, queues, twitter, emails, and much more",
                "Detailed open API docs to support OpenAPI plugin development, auto-generated client libraries",
                "Pre-built Terraform scripts for managing IaC, Auth0, Stripe all from your terminal",
            ],
        },
        {
            title: "Local Dev Tools",
            blurb: "Utilities for developers, keep your business data safe and local.",
            image: devToolsLogo,
            link: "/local-dev-tools",
            benefits: [
                "Forget random tools websites - encode and decode data offline",
                "Utilities for git repository management",
                "Perpetual licence and ownership",
                "Works on Mac and Windows",
            ],
            colorVariant: "cyan" as ThemeColor,
        },
        {
            title: "Miller Dev Shell",
            blurb: "Setup a beautiful, modern terminal environment with one command. All tools included.",
            image: devShellLogo,
            link: "/dev-shell",
            benefits: [
                "14+ well tested, re-runnable shell scripts",
                "50+ of the best modern developer tools",
                "Perpetual licence and updates",
                "Designed for a consistent shell on Mac and Windows",
            ],
            colorVariant: "green" as ThemeColor,
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
                                    Tools for busy developers and teams
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg tracking-tight text-gray-400 md:mx-0">
                                    Miller software tools save you time so you
                                    can focus on helping your customers. Built
                                    by developers for developers.
                                </p>
                            </div>
                            <div className="intro-image-rotation md:relative w-1/2 md:w-full mt-20 md:mt-0 md:mb-0 hidden md:block">
                                <div>
                                    <Image
                                        priority
                                        alt="admin image"
                                        src={adminImage}
                                        className="intro-image absolute md:-translate-y-16 md:translate-x-14 -translate-y-4 translate-x-2"
                                    />
                                    <Image
                                        priority
                                        alt="product image"
                                        src={codeImage}
                                        className="intro-image absolute md:-translate-x-7 translate-x-7"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-col space-y-16 mb-32 mt-16 md:mt-52"
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
