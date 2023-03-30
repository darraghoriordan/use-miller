import { Container } from "../../components/Container";
import dynamic from "next/dynamic.js";
import { UserDto } from "@use-miller/shared-api-client";
import { TwitterCTA } from "../components/TwitterCTA.jsx";

const DynamicGumRoad = dynamic(() => import("../components/GumRoadWrapper"), {
    loading: () => <p>Loading Gumroad embedded...</p>,
    ssr: false,
});

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
                <div id="pricing" className="mt-16 text-gray-200 w-full">
                    <p className="my-8 max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                        Buy Now
                    </p>
                    <p className="mt-4 text-left font-display text-lg font-medium tracking-tight ">
                        Simple pricing, pay once and use forever.
                    </p>
                    <p className="mt-4 text-left font-display text-lg font-medium tracking-tight ">
                        I use Gumroad to handle licenses. You will receive an
                        email with a license key after purchase.
                    </p>
                    <TwitterCTA />
                    <div className=" mb-10">
                        <DynamicGumRoad productUrl="https://darraghoriordan.gumroad.com/l/localtools" />
                    </div>
                </div>
            </div>
        </Container>
    );
}
