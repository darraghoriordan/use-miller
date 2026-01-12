import Link from "next/link";
import { Container } from "../components/Container";
import Layout from "../components/Layout";

export default function Home() {
    return (
        <Layout
            seoDescription="Review the license terms for each Miller product and find links to the specific terms for Miller Start, Dev Shell, and Local Dev Tools."
            seoTitle={`Dev tools to save you time`}
            canonicalUrl="https://usemiller.dev/terms"
            headerTitle="Miller Dev Tools"
            themeColor="violet"
        >
            <Container>
                <article className="prose prose-lg prose-invert mx-auto">
                    <h1>Terms</h1>
                    <p>
                        There are different licenses for each product. Please
                        read the page specific to the product you're interested
                        in. If you have any questions please get in touch.
                    </p>
                    <ul>
                        <li>
                            Miller Start -{" "}
                            <Link
                                href="/docs/miller-start/support/license-terms"
                                className=""
                            >
                                License Terms
                            </Link>
                        </li>
                        <li>
                            Dev Shell -{" "}
                            <Link
                                href="/docs/dev-shell/support/license-terms"
                                className=""
                            >
                                License Terms
                            </Link>
                        </li>
                        <li>
                            Local Dev Tools -{" "}
                            <Link
                                href="/docs/local-dev-tools/support/license-terms"
                                className=""
                            >
                                License Terms
                            </Link>
                        </li>
                    </ul>
                </article>
            </Container>
        </Layout>
    );
}
