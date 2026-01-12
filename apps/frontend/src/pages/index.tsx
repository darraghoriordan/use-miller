import { Hero } from "../marketing-pages/index-home/Hero";
import Layout from "../components/Layout";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps";
import type { components } from "../shared/types/api-specs";

type UserDto = components["schemas"]["UserDto"];

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Miller dev tools save you time so you can focus on building your product and helping your customers."
            seoTitle={`Dev tools to save you time`}
            canonicalUrl="https://usemiller.dev/"
            headerTitle="Miller Dev Tools"
            themeColor="violet"
        >
            <Hero user={user} />
        </Layout>
    );
}
