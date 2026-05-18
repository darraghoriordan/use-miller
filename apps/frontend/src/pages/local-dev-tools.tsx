import { Hero } from "../marketing-pages/local-dev-tools/Hero";
import Layout from "../components/Layout";
import { Pricing } from "../marketing-pages/local-dev-tools/Pricing";
import { Container } from "../components/Container";

export default function Home() {
    return (
        <Layout
            seoDescription="Local Dev Tools is an offline toolkit for developers with JSON, JWT, Base64, regex, timestamps, curl, color, and local AI utilities for Mac and Windows."
            seoTitle="Offline Developer Utilities for Mac and Windows"
            canonicalUrl="https://usemiller.dev/local-dev-tools"
            headerTitle="Miller // Local Dev Tools"
            productKey="local-dev-tools"
            themeColor="violet"
        >
            <Container>
                <Hero />
                <Pricing />
            </Container>
        </Layout>
    );
}
