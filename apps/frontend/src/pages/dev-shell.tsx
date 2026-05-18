import { Hero } from "../marketing-pages/dev-shell-home/Hero";
import Layout from "../components/Layout";
import { Pricing } from "../marketing-pages/dev-shell-home/Pricing";
import { Container } from "../components/Container";

export default function Home() {
    return (
        <Layout
            seoDescription="Dev Shell gives you a reproducible developer environment for macOS and Windows with shell setup, tooling, fonts, VS Code config, and dotfiles."
            seoTitle="Developer Environment Setup Scripts"
            canonicalUrl="https://usemiller.dev/dev-shell"
            headerTitle="Miller // Dev Shell"
            productKey="dev-shell"
            themeColor="violet"
        >
            <Container>
                <Hero />
                <Pricing />
            </Container>
        </Layout>
    );
}
