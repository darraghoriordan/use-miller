import { Container } from "../../components/Container";
import { UserDto } from "@use-miller/shared-api-client";
import { BuyNowButton } from "../../components/BuyNowButton.jsx";
import { TwitterCTA } from "../components/TwitterCTA.jsx";

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
                        <p className="mt-4 text-left font-display text-lg font-medium tracking-tight ">
                            Simple pricing, pay once and use forever.
                        </p>
                        <div className="prose prose-md text-white mt-8 ml-8">
                            <ul>
                                <li>1 year of updates</li>
                                <li>
                                    Access to support chat (see license terms)
                                </li>
                                <li>Access to the github repository</li>
                            </ul>
                        </div>
                        <TwitterCTA />
                        <p className="text-6xl pt-16 text-center">
                            $1149<span className="text-base">USD</span>
                        </p>
                        <p className="text-sm text-center pb-16">
                            <a
                                href="/docs/miller-start/support/license-terms"
                                className="text-sm hover:underline hover:cursor-pointer"
                            >
                                License Terms
                            </a>
                        </p>
                        <p className="text-smtext-center"></p>
                        <div className="mx-auto flex gap-x-6 md:mx-0 mb-10">
                            <BuyNowButton
                                user={user}
                                productKey="miller-start"
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
