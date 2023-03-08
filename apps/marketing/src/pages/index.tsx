import { Hero } from "../components/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../components/Pricing";

export default function Home() {
    return (
        <Layout>
            <Hero />
            <Pricing />
        </Layout>
    );
}
