import { Container } from "../../components/Container";
import dynamic from "next/dynamic";
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
    "Mac and Windows desktop apps",
    "Perpetual license with 1 year of updates",
    "30-day money-back guarantee",
];

const licenseOptions = [
    { computers: 5, price: "$29" },
    { computers: 10, price: "$49" },
    { computers: 20, price: "$79" },
];

export function Pricing() {
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
                            Choose the number of computers you need. Prices are
                            in USD and the app remains usable after the update
                            period ends.
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

                        <div className="mt-10 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-security-border bg-security-border sm:grid-cols-3">
                            {licenseOptions.map((option) => (
                                <div
                                    key={option.computers}
                                    className="bg-security-dark px-5 py-6"
                                >
                                    <p className="font-display text-3xl font-semibold tracking-tight text-security-light">
                                        {option.price}
                                    </p>
                                    <p className="mt-2 text-sm text-security-text">
                                        {option.computers} computers
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 text-security-text">
                            Gumroad handles payment and emails your license key.
                            Existing customers keep their current license terms.
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
