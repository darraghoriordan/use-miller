import Head from "next/head";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Pricing } from "../components/Pricing";

export default function Home() {
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
                <Hero />
                <Pricing />
            </main>
            <Footer />
        </>
    );
}
