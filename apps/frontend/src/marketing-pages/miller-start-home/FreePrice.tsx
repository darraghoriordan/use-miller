import { CheckIcon } from "@heroicons/react/24/outline";
import { GoToGithub } from "../../components/GoToGithub";

export function FreePrice({
    title,
    benefits,
    productKey,
}: {
    title: string;
    benefits: string[];
    productKey: string;
}) {
    return (
        <section className="flex min-w-0 flex-col border-t border-security-border pt-6">
            <h3 className="text-left font-display text-3xl font-medium tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-3 max-w-xl leading-7 text-security-text">
                Build on the complete application foundation at your own pace.
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
                Free
            </p>

            <div className="mt-8 w-full">
                <GoToGithub
                    productKey={productKey}
                    color="cyan"
                    className="w-full px-6 py-4 text-base sm:w-auto"
                />
            </div>
        </section>
    );
}
