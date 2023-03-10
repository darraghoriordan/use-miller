import StyledLink from "./StyledLink";
import { Container } from "./Container";

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
                        <p className="my-8 max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            Pricing
                        </p>
                        <p className="mt-4 text-left font-display text-lg font-medium tracking-tight ">
                            Simple pricing, pay once and use forever.
                        </p>
                        <ul>
                            <li className="mt-4 ml-8 list-disc text-lg ">
                                All the features
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg ">
                                All the time-saving
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg ">
                                Updates for 1 year
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg ">
                                Access to chat forum
                            </li>
                        </ul>
                        <p className="text-6xl py-16 text-center">
                            $199<span className="text-base">USD</span>
                        </p>
                        <div className="mx-auto flex gap-x-6 md:mx-0 mb-10">
                            <StyledLink
                                href={"/payment/init-payment"}
                                color="cyan"
                                className={`w-full rounded-lg justify-center text-xl px-14 py-4 hover:shadow-lg border-white`}
                            >
                                Buy now
                            </StyledLink>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}