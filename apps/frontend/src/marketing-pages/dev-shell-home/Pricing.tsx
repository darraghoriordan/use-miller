import { Container } from "../../components/Container";
import { UserDto } from "@use-miller/shared-api-client";
import { CheckIcon } from "@heroicons/react/24/outline";
import { SignUpBuyNowButton } from "../../components/SignupBuyNow.jsx";

const buyBenefits = [
    "Mac and Windows dev environment setup in 1 command",
    "Direct access to the GitHub repository",
    "Lifetime license - get all future updates for free",
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
                            Pricing
                        </p>
                        <p className="mt-4 text-left font-display text-lg font-medium ">
                            Simple pricing, pay once and use forever.
                        </p>

                        <div className="mt-8 font-semibold  text-white">
                            <ul className="space-y-4">
                                {buyBenefits.map((benefit, i) => (
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

                        <p className="text-6xl py-16 text-center">
                            $29<span className="text-base">USD</span>
                        </p>
                        <div className="mx-auto flex gap-x-6 md:mx-0 mb-10">
                            <SignUpBuyNowButton
                                user={user}
                                productKey="dev-shell"
                                color="cyan"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
