import Head from "next/head";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function PaymentFailure() {
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
                <div>payment cancelled</div>
            </main>
            <Footer />
        </>
    );
}
