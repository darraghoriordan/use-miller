import { Container } from "../../components/Container";
import { UserDto } from "@use-miller/shared-api-client";
import { TwitterCTA } from "../components/TwitterCTA.jsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import { SignUpBuyNowButton } from "../../components/SignupBuyNow.jsx";
import { Price } from "./Price.jsx";
import build from "next/dist/build/index.js";

const learnerBenefits = [
    "Full ownership, you own the code you have forever",
    "Direct access to the GitHub repositories while subscribed",
    "Subscription includes one year of updates",
    "Expert documentation",
    "Access to support community",
];

const builderBenefits = [
    "All the benefits of the Learner plan",
    "Prioritised support for builders",
    "8 hours of consulting time from the Miller team",
];

export function Pricing({ user }: { user: UserDto }) {
    return (
        <Container className="pb-16 text-left">
            <div className="flex ">
                <div className="flex flex-col">
                    <div
                        style={{
                            background: "linear-gradient(#56d364, #00bcd4)",
                        }}
                        className="mr-4 h-full w-[2px] lg:mr-12"
                    >
                        &nbsp;
                    </div>
                </div>
                <div>
                    <div id="pricing" className="mt-16 text-gray-200">
                        <p className="my-8 max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            Simple pricing, pay once and use forever.
                        </p>
                        <div className="md:flex md:space-x-32 max-w-7xl">
                            <Price
                                user={user}
                                title="Learner Package"
                                currency="usd"
                                productKey="miller-start"
                                price="249"
                                benefits={learnerBenefits}
                                licenceUrl="/docs/miller-start/support/license-terms"
                            />
                            <Price
                                user={user}
                                title="Builder Package"
                                productKey="miller-start-consulting"
                                currency="usd"
                                price="1649"
                                benefits={builderBenefits}
                                licenceUrl="/docs/miller-start/support/license-terms"
                            />
                        </div>
                        <TwitterCTA />
                    </div>
                </div>
            </div>
        </Container>
    );
}
