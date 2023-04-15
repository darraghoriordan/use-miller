import { Container } from "../components/Container.jsx";
import Layout from "../components/Layout.jsx";

export default function Home() {
    return (
        <Layout
            seoDescription="Miller dev tools save you time so you can focus on building your product and helping your customers."
            seoTitle={`Dev tools to save you time`}
            headerTitle="Miller Dev Tools"
            themeColor="violet"
        >
            <Container>
                <article className="prose prose-lg prose-invert mx-auto">
                    <h1>About Miller</h1>
                    <p>Hi! Thanks for checking out the Miller products. </p>
                    <p>
                        I'm Darragh ORiordan, I make all the tools that are
                        available here. I'm a software engineer and people
                        leader. I currently live in sunny Sydney, Australia.
                    </p>
                    <p>
                        You can read more about me on my main website{" "}
                        <a href="https://www.darraghoriordan.com/about/">
                            https://www.darraghoriordan.com/about/
                        </a>
                        .
                    </p>
                    <p>
                        You can always reach me on{" "}
                        <a href="https://twitter.com/darraghor">Twitter</a> or{" "}
                        <a href="https://www.linkedin.com/in/darraghoriordan/">
                            LinkedIn
                        </a>
                        .
                    </p>
                </article>
            </Container>
        </Layout>
    );
}
