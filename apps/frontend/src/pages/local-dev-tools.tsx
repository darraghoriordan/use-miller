import { Hero } from "../home-ctas/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../home-ctas/Pricing";

export default function Home() {
    return (
        <Layout
            seoDescription="Keep your business data safe and secure by using local dev tools."
            seoTitle="Miller - Local Dev Tools"
            headerTitle="Miller // Local Dev Tools"
            productKey="local-dev-tools"
            successRedirectPath="/payment-init/local-dev-tools"
        >
            <Hero />
            <Pricing />
        </Layout>
    );
}
