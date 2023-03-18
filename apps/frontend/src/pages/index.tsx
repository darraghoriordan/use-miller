import { Hero } from "../home-cta/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../home-cta/Pricing";

export default function Home() {
    return (
        <Layout>
            <Hero />
            <Pricing />
        </Layout>
    );
}
