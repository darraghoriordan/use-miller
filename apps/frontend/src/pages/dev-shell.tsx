import { Hero } from "../marketing-pages/dev-shell-home/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../marketing-pages/dev-shell-home/Pricing";
import { UserDto } from "@use-miller/shared-api-client";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps.js";

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Modern, powerful, and beautiful shells across all your machines - Supports Windows and Mac."
            seoTitle="Miller - Dev Shell"
            headerTitle="Miller // Dev Shell"
            productKey="dev-shell"
            themeColor="violet"
        >
            <Hero user={user} />
            <Pricing user={user} />
        </Layout>
    );
}
