import { CheckIcon } from "@heroicons/react/24/outline";
import { SignUpBuyNowButton } from "../../components/SignupBuyNow.jsx";
import { UserDto } from "@use-miller/shared-api-client";

export function Price({
    title,
    benefits,
    price,
    currency,
    licenceUrl,
    user,
    productKey,
}: {
    title: string;
    benefits: string[];
    price: string;
    currency: string;
    licenceUrl: string;
    user: UserDto;
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

            <p className="text-6xl pt-16 text-center pb-16">
                {price}
                <span className="text-base">{currency.toUpperCase()}</span>
            </p>

            <div className="mx-auto w-full flex gap-x-6 md:mx-0 mb-10">
                <SignUpBuyNowButton
                    user={user}
                    productKey={productKey}
                    color="cyan"
                    className="w-full"
                />
            </div>
        </div>
    );
}
