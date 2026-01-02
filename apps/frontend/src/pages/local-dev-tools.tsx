import { Hero } from "../marketing-pages/local-dev-tools/Hero";
import Layout from "../components/Layout";
import { Pricing } from "../marketing-pages/local-dev-tools/Pricing";
import type { components } from "../shared/types/api-specs";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps";
import { Container } from "../components/Container";

type UserDto = components["schemas"]["UserDto"];

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Keep your business data safe and secure with local dev utilities."
            seoTitle="Miller - Local Dev Tools"
            headerTitle="Miller // Local Dev Tools"
            productKey="local-dev-tools"
            themeColor="violet"
        >
            <Container>
                <Hero user={user} />
                <Pricing user={user} />
            </Container>
        </Layout>
    );
}
