import { Hero } from "../marketing-pages/local-dev-tools/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../marketing-pages/local-dev-tools/Pricing";
import { UserDto } from "@use-miller/shared-api-client";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps.js";

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Keep your business data safe and secure by using local dev tools."
            seoTitle="Miller - Local Dev Tools"
            headerTitle="Miller // Local Dev Tools"
            productKey="local-dev-tools"
            themeColor="violet"
        >
            <Hero user={user} />
            <Pricing user={user} />
        </Layout>
    );
}
