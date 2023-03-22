import { Hero } from "../home-ctas/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../home-ctas/Pricing";

export default function Home() {
    return (
        <Layout
            seoDescription="A working full-stack web app with a NextJs frontend and a NestJs backend."
            seoTitle="Miller Start - Learn NestJs and NextJs by example"
            headerTitle="Miller // Start"
            productKey="miller-start"
            successRedirectPath="/payment-init/miller-start"
            themeColor="violet"
        >
            <Hero />
            <Pricing />
        </Layout>
    );
}
