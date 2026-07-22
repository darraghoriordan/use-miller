import { Hero } from "../marketing-pages/index-home/Hero";
import SEO from "../components/SEO";

export default function Home() {
    return (
        <>
            <SEO
                title="Miller | The production app foundation your AI agent can operate"
                description="Build on authentication, billing, jobs, email, observability, and an explicit agent contract. Miller is the production TypeScript foundation agents can extend and verify."
                canonicalUrl="https://usemiller.dev/"
            />
            <Hero />
        </>
    );
}
