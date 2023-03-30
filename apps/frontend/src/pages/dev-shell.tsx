import { Hero } from "../marketing-pages/dev-shell-home/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../marketing-pages/dev-shell-home/Pricing";
import { UserDto } from "@use-miller/shared-api-client";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps.js";
import { Container } from "../components/Container.jsx";

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Your full dev environment configured with one command"
            seoTitle="Miller - Dev Shell"
            headerTitle="Miller // Dev Shell"
            productKey="dev-shell"
            themeColor="violet"
        >
            <Container>
                <Hero user={user} />
                <Pricing user={user} />
            </Container>
        </Layout>
    );
}
