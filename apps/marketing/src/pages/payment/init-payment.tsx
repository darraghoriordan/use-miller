import { PaymentsApi } from "@use-miller/shared-api-client";
import Head from "next/head";
import { useEffect } from "react";
import { getAnonymousApiInstance } from "../../api-setup/api-factory";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function PaymentFailure() {
    const redirectGetCheckoutLinkAndRedirectToStripeCheckout = async () => {
        const apiClient = getAnonymousApiInstance(PaymentsApi);
        const apiResponse =
            await apiClient.stripeUnauthenticatedCheckoutControllerCreateCheckoutSession(
                {
                    stripeCheckoutSessionRequestDto: {
                        lineItems: [
                            {
                                price:
                                    process.env
                                        .NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID ||
                                    "error",
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

    // just call this the one time
    useEffect(() => {
        redirectGetCheckoutLinkAndRedirectToStripeCheckout();
    }, []);

    return (
        <>
            <Head>
                <title>Miller - A product kit for makers</title>
                <meta
                    name="description"
                    content="Have an idea for a product? Skip straight to the good stuff - providing valuable features to your customers. Miller has all the technology sorted."
                />
            </Head>
            <Header />
            <main>
                <div>Initialising payment..df.sdf....</div>
            </main>
            <Footer />
        </>
    );
}
