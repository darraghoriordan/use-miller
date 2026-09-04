import { Hero } from "../marketing-pages/dev-shell-home/Hero";
import Layout from "../components/Layout";
import { Pricing } from "../marketing-pages/dev-shell-home/Pricing";
import { Container } from "../components/Container";

export default function Home() {
    return (
        <Layout
            seoDescription="Set up a reproducible dev shell on macOS and Windows WSL with tested scripts for Zsh, CLI tools, VS Code, fonts, Git, and dotfiles."
            seoTitle="Dev Shell Setup Scripts for Mac and Windows"
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
