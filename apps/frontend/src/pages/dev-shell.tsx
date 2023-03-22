import { Hero } from "../home-ctas/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../home-ctas/Pricing";

export default function Home() {
    return (
        <Layout
            seoDescription="Modern, powerful, and beautiful shells across all your machines - Supports Windows and Mac."
            seoTitle="Miller - Dev Shell"
            headerTitle="Miller // Dev Shell"
            productKey="dev-shell"
            successRedirectPath="/payment-init/dev-shell"
        >
            <Hero />
            <Pricing />
        </Layout>
    );
}
