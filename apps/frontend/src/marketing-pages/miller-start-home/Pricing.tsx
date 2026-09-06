import Image from "next/image";
import { Container } from "../../components/Container";
import StyledLink from "../../components/StyledLink";
import portraitImage from "../../images/profile-pic.jpg";
import { trackAnalyticsEvent } from "../../lib/analytics";
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

const broaderConsultingHref =
    "https://www.darraghoriordan.com/hire?utm_source=usemiller.dev&utm_medium=referral&utm_campaign=launch_sprint";

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
                        <section
                            aria-labelledby="launch-sprint-lead"
                            className="mt-16 grid max-w-5xl gap-6 border-y border-security-border py-10 sm:grid-cols-[7rem_1fr] sm:items-center sm:gap-8"
                        >
                            <Image
                                src={portraitImage}
                                alt="Darragh O'Riordan"
                                sizes="112px"
                                className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
                            />
                            <div>
                                <h3
                                    id="launch-sprint-lead"
                                    className="font-display text-2xl font-medium tracking-tight text-white"
                                >
                                    Hi, I'm Darragh 👋
                                </h3>
                                <p className="mt-3 max-w-3xl leading-7 text-security-text">
                                    I'm a hands-on engineering leader with 15+
                                    years of experience. Examples of my recent
                                    platform work include reducing AWS spend by
                                    25%, DB spend by 30%, modernising 15 nodejs
                                    applications into a modern monorepo for AI,
                                    reducing user-facing 500 errors by 60%, and
                                    the engineering leadership for SOC 2
                                    compliance.
                                </p>
                                <StyledLink
                                    href={broaderConsultingHref}
                                    color="millerstart"
                                    variant="ghost"
                                    className="mt-5 px-0"
                                    onClick={() =>
                                        trackAnalyticsEvent(
                                            "miller_consulting_services_click",
                                            { source: "launch_sprint_pricing" },
                                        )
                                    }
                                >
                                    Need a larger engagement? See consulting
                                    options
                                </StyledLink>
                            </div>
                        </section>
                        <div className="mt-8">
                            <p className="text-left text-sm">
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
                    </div>
                </div>
            </div>
        </Container>
    );
}
