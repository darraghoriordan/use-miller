import { Hero } from "../marketing-pages/miller-start-home/Hero-learner";
import Layout from "../components/Layout";
import { Pricing } from "../marketing-pages/miller-start-home/Pricing";
import { Container } from "../components/Container";

export default function Home() {
    return (
        <Layout
            seoDescription="Miller Start is a production-ready NestJS and Next.js starter with self-hosted authentication, Stripe, PostgreSQL, Terraform, and agent-ready operations."
            seoTitle="NestJS and Next.js Starter Template"
            canonicalUrl="https://usemiller.dev/miller-start"
            headerTitle="Miller // Start"
            productKey="miller-start"
            themeColor="violet"
        >
            <Container>
                <Hero />
                <Pricing />
            </Container>
        </Layout>
    );
}
