import Layout from "../components/Layout.jsx";

export default function Home() {
    return (
        <Layout
            seoDescription="Miller builds tools for busy developers. Learn NestJs and NextJs, enrich your shell, get useful local dev tools, and more."
            seoTitle="Miller - Tools for busy devs!"
            headerTitle="Miller"
            productKey="miller-start"
            themeColor="violet"
        >
            <article className="prose prose-lg prose-invert mx-auto">
                <h1>Terms</h1>
                <p>
                    There are different licenses for each product. Please read
                    the page specific to the product you're interested in. If
                    you have any questions please get in touch.
                </p>
                <ul>
                    <li>
                        Miller Start -{" "}
                        <a
                            href="/docs/miller-start/support/license-terms"
                            className=""
                        >
                            License Terms
                        </a>
                    </li>
                    <li>
                        Dev Shell -{" "}
                        <a
                            href="/docs/dev-shell/support/license-terms"
                            className=""
                        >
                            License Terms
                        </a>
                    </li>
                    <li>
                        Local Dev Tools -{" "}
                        <a
                            href="/docs/local-dev-tools/support/license-terms"
                            className=""
                        >
                            License Terms
                        </a>
                    </li>
                </ul>
            </article>
        </Layout>
    );
}
