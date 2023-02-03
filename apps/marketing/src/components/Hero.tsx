import { PaymentsApi } from "@use-miller/shared-api-client";
import { getAnonymousApiInstance } from "../api-setup/api-factory";
import { Container } from "./Container";

export function Hero() {
    const features = [
        "Subscriptions and payments built in",
        "Organisations and users built in",
        "Pre-built modular Integrations for useful APIs like Twitter and running stable diffusion (requires expensive VM with graphics card!)",
        "Queues for async jobs already setup for use",
        "Send emails using popular providers (twillio, mailgun, fastmail etc) via smtp",
        "Bring your ideas to life in minutes with custom tooling to initialise SaaS projects",
    ];

    const redirectGetCheckoutLinkAndRedirectToStripeCheckout = async () => {
        const apiClient = getAnonymousApiInstance(PaymentsApi);
        const apiResponse =
            await apiClient.stripeUnauthenticatedCheckoutControllerCreateCheckoutSession(
                {
                    stripeCheckoutSessionRequestDto: {
                        lineItems: [
                            {
                                price: "price_1MVa3fCZhqgg93xWmuuA1nZc",
                                quantity: 1,
                            },
                        ],
                        mode: "subscription",
                        successFrontendPath:
                            "/payment/success?session_id={CHECKOUT_SESSION_ID}",
                        cancelFrontendPath: "/payment/cancel",
                    },
                }
            );
        /*
on success
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);
*/
        window.location.href = apiResponse.stripeSessionUrl;
    };

    return (
        <Container className="pt-20 pb-16 text-left lg:pt-32">
            <div className="flex ">
                <div className="flex flex-col">
                    <div
                        style={{
                            background:
                                "linear-gradient(#d2a8ff, #a371f7 10%, #196c2e 70%, #2ea043 80%, #56d364)",
                        }}
                        className="mr-4 h-full w-[2px] lg:mr-12"
                    >
                        &nbsp;
                    </div>
                </div>
                <div>
                    <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-white sm:text-7xl md:mx-0">
                        The product development kit for makers
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-left text-lg tracking-tight text-gray-400 md:mx-0">
                        Skip straight to the good stuff - providing valuable
                        features to your customers. Miller has all of your
                        technology sorted.
                    </p>
                    <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                        <button
                            onClick={() => {
                                redirectGetCheckoutLinkAndRedirectToStripeCheckout();
                            }}
                            className="w-full max-w-md rounded-lg bg-violet-700 text-lg"
                        >
                            Get a demo today
                        </button>
                    </div>
                    <div className="mt-32" id="features">
                        <p className=" max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            What you get
                        </p>
                        <ul>
                            {features.map((feature, key) => (
                                <li
                                    key={key}
                                    className="mt-4 ml-8 list-disc text-lg text-gray-400"
                                >
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    );
}
