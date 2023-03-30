import { Hero } from "../marketing-pages/index-home/Hero";
import Layout from "../components/Layout.jsx";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps.js";
import { UserDto } from "@use-miller/shared-api-client";

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Miller builds tools for busy developers. Learn NestJs and NextJs, enrich your shell, get useful local dev tools, and more."
            seoTitle="Miller - Tools for busy devs!"
            headerTitle="Miller Dev Tools"
            themeColor="violet"
        >
            <Hero user={user} />
        </Layout>
    );
}
