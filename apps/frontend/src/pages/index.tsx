import { Hero } from "../marketing-pages/index-home/Hero";
import Layout from "../components/Layout";

export default function Home() {
    return (
        <Layout
            seoDescription="Developer tools for secure teams: local-first utilities, reproducible dev environments, and a production-ready NestJS starter."
            seoTitle="Developer Tools for Secure Teams"
            canonicalUrl="https://usemiller.dev/"
            headerTitle="Miller Dev Tools"
            themeColor="violet"
        >
            <Hero />
        </Layout>
    );
}
