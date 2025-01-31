import { CheckIcon } from "@heroicons/react/24/outline";
import { GoToGithub } from "../../components/GoToGithub.jsx";

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
        <div className="flex flex-col basis-1/2">
            <p className="mt-4 text-left font-display text-3xl font-medium tracking-tight ">
                {title}
            </p>

            <div className="mt-8 font-semibold grow  text-white">
                <ul className="space-y-4">
                    {benefits.map((benefit, i) => (
                        <li className="flex items-center" key={i}>
                            <CheckIcon
                                className="mr-6 h-5 w-5 text-green-500"
                                aria-hidden="true"
                            />
                            {benefit}
                        </li>
                    ))}
                </ul>
            </div>

            <p className="text-6xl pt-16 text-center pb-16">Free!</p>

            <div className="mx-auto w-full flex gap-x-6 md:mx-0 mb-10">
                <GoToGithub
                    productKey={productKey}
                    color="cyan"
                    className="w-full"
                />
            </div>
        </div>
    );
}
