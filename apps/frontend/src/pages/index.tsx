import { Hero } from "../marketing-pages/index-home/Hero";
import Layout from "../components/Layout.jsx";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps.js";
import { UserDto } from "@use-miller/shared-api-client";

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Miller dev tools save you time so you can focus on building your product and helping your customers."
            seoTitle={`Dev tools to save you time`}
            headerTitle="Miller Dev Tools"
            themeColor="violet"
        >
            <Hero user={user} />
        </Layout>
    );
}
