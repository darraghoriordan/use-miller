import { CheckIcon } from "@heroicons/react/24/outline";
import StyledLink from "../../components/StyledLink";
import { trackAnalyticsEvent } from "../../lib/analytics";

export function Price({
    title,
    benefits,
    price,
    currency,
    description,
    enquiryHref,
}: {
    title: string;
    benefits: string[];
    price: string;
    currency: string;
    description: string;
    enquiryHref: string;
}) {
    return (
        <section className="flex min-w-0 flex-col border-t border-security-border pt-6">
            <h3 className="text-left font-display text-3xl font-medium tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-3 max-w-xl leading-7 text-security-text">
                {description}
            </p>

            <div className="mt-8 grow font-semibold text-white">
                <ul className="space-y-4">
                    {benefits.map((benefit, i) => (
                        <li className="flex items-center" key={i}>
                            <CheckIcon
                                className="mr-4 h-5 w-5 shrink-0 text-green-500"
                                aria-hidden="true"
                            />
                            {benefit}
                        </li>
                    ))}
                </ul>
            </div>

            <p className="pt-12 text-left font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {price}
                <span className="ml-2 font-mono text-sm font-medium tracking-normal text-security-muted">
                    {currency.toUpperCase()} one-time
                </span>
            </p>

            <div className="mt-8 w-full">
                <StyledLink
                    href={enquiryHref}
                    color="cyan"
                    className="w-full px-6 py-4 text-base sm:w-auto"
                    onClick={() =>
                        trackAnalyticsEvent("miller_launch_sprint_enquiry", {
                            offer: "miller-production-launch-sprint",
                        })
                    }
                >
                    Apply for a Launch Sprint
                </StyledLink>
                <p className="mt-4 max-w-xl text-sm leading-6 text-security-muted">
                    We will confirm fit, scope, and availability before you pay.
                </p>
            </div>
        </section>
    );
}
