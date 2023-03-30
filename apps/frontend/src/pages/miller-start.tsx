import { Hero } from "../marketing-pages/miller-start-home/Hero-learner";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../marketing-pages/miller-start-home/Pricing";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps.js";
import { UserDto } from "@use-miller/shared-api-client";
import { Container } from "../components/Container.jsx";

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="A working full-stack web app with a NextJs frontend and a NestJs backend."
            seoTitle="Miller Start - Learn NestJs and NextJs by example"
            headerTitle="Miller // Start"
            productKey="miller-start"
            themeColor="violet"
        >
            <Container>
                <Hero user={user} />
                <Pricing user={user} />
            </Container>
        </Layout>
    );
}
