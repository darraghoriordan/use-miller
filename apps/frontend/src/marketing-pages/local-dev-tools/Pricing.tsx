import { Container } from "../../components/Container";
import dynamic from "next/dynamic";
import type { components } from "../../shared/types/api-specs";
type UserDto = components["schemas"]["UserDto"];
import { TwitterCTA } from "../components/TwitterCTA";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FadeInOnScroll } from "../../components/Animations";

const DynamicGumRoad = dynamic(() => import("../components/GumRoadWrapper"), {
    loading: () => (
        <div className="h-14 w-48 bg-security-dark animate-pulse rounded-md" />
    ),
    ssr: false,
});

const buyBenefits = [
    "Mac and Windows electron apps",
    "Docs and notes on usage",
    "Lifetime license + get 1 year of updates for free",
];

export function Pricing({ user }: { user: UserDto }) {
    return (
        <div className="relative">
            {/* Background accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-product-localtools/50 via-accent/30 to-transparent" />

            <Container className="pb-16 text-left">
                <FadeInOnScroll>
                    <div id="pricing" className="pt-16 pl-8 md:pl-12">
                        <h2 className="font-display text-3xl md:text-4xl text-security-light tracking-tight">
                            Buy once, use forever.
                        </h2>

                        <p className="mt-4 text-lg text-security-text">
                            Simple pricing, pay once and use forever.
                        </p>

                        <div className="mt-8">
                            <ul className="space-y-4">
                                {buyBenefits.map((benefit, i) => (
                                    <li
                                        className="flex items-center text-security-light"
                                        key={i}
                                    >
                                        <CheckIcon
                                            className="mr-4 h-5 w-5 text-product-localtools flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="mt-8 text-security-text">
                            I use Gumroad to handle licenses. You will receive
                            an email with a license key after purchase.
                        </p>

                        <div className="mt-8">
                            <DynamicGumRoad
                                productUrl="https://gumroad.usemiller.dev/l/localtools"
                                buttonText="Purchase License"
                            />
                        </div>

                        <TwitterCTA />
                    </div>
                </FadeInOnScroll>
            </Container>
        </div>
    );
}
