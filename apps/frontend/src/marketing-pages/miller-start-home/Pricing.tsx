import { Container } from "../../components/Container";
import { UserDto } from "@use-miller/shared-api-client";
import { TwitterCTA } from "../components/TwitterCTA.jsx";
import { Price } from "./Price.jsx";
import { FreePrice } from "./FreePrice.jsx";

const learnerBenefits = [
    "Direct access to the GitHub repositories",
    "Expert documentation",
    "Access to support community",
];

const builderBenefits = [
    "All the benefits of the Learner plan",
    "Prioritised support for paying customers",
    "8 hours of consulting time from Me!",
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
                            <FreePrice
                                title="Learner Package"
                                productKey="miller-start"
                                benefits={learnerBenefits}
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
                        <div>
                            <p className="text-sm text-center">
                                <a
                                    href={
                                        "/docs/miller-start/support/license-terms"
                                    }
                                    className="text-sm hover:underline hover:cursor-pointer"
                                >
                                    License Terms
                                </a>
                            </p>
                        </div>
                        <TwitterCTA />
                    </div>
                </div>
            </div>
        </Container>
    );
}
