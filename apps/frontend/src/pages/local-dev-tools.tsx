import { Hero } from "../marketing-pages/local-dev-tools/Hero";
import Layout from "../components/Layout";
import { Pricing } from "../marketing-pages/local-dev-tools/Pricing";
import { Container } from "../components/Container";
import { productSeo } from "../marketing-pages/productSeo";

export default function Home() {
    return (
        <Layout
            seoDescription="Offline developer tools for Mac and Windows, plus installable AI agent skills for local JWT, JSON, encoding and more. Keep sensitive inputs out of chat."
            seoTitle="Offline Developer Utilities for Mac and Windows"
            canonicalUrl="https://usemiller.dev/local-dev-tools"
            headerTitle="Miller // Local Dev Tools"
            productKey="local-dev-tools"
            themeColor="violet"
            markdownUrl={productSeo["local-dev-tools"].markdownUrl}
            structuredData={productSeo["local-dev-tools"].structuredData}
        >
            <Container>
                <Hero />
                <Pricing />
            </Container>
        </Layout>
    );
}
