import { Container } from "../../components/Container";
import { TwitterCTA } from "../components/TwitterCTA";
import { Price } from "./Price";
import { FreePrice } from "./FreePrice";

const learnerBenefits = [
    "Complete NestJS and Next.js source",
    "Agent-ready setup and verification commands",
    "Documentation and community support",
];

const builderBenefits = [
    "Architecture and production-readiness review",
    "Up to 8 hours of focused implementation support",
    "Written risks, decisions, and next-step plan",
    "7 days of follow-up after the working session",
];

const launchSprintEnquiryHref =
    "mailto:info@usemiller.dev?subject=Miller%20Production%20Launch%20Sprint&body=Tell%20me%20briefly%20about%20the%20product%2C%20your%20team%2C%20and%20what%20you%20need%20to%20get%20into%20production.";

export function Pricing() {
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
                        <h2 className="my-8 max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            Start with the code. Bring in an expert when the
                            stakes get higher.
                        </h2>
                        <p className="mb-12 max-w-3xl text-lg leading-8 text-security-text">
                            Miller Start is free to use. The fixed-price Launch
                            Sprint is for teams that want hands-on help turning
                            their application into a production-ready system.
                        </p>
                        <div className="grid max-w-7xl gap-12 md:grid-cols-2 md:gap-16">
                            <FreePrice
                                title="Miller Start Community"
                                productKey="miller-start"
                                benefits={learnerBenefits}
                            />
                            <Price
                                title="Production Launch Sprint"
                                currency="usd"
                                price="$2,500"
                                benefits={builderBenefits}
                                description="A paid design-partner engagement for technical founders and small TypeScript teams preparing to launch or repair an agent-built application."
                                enquiryHref={launchSprintEnquiryHref}
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
                                    Service and license terms
                                </a>
                            </p>
                        </div>
                        <div className="mt-12">
                            <TwitterCTA />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
