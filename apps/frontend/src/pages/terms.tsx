import { Hero } from "../home-ctas/Hero";
import Layout from "../components/Layout.jsx";
import { Pricing } from "../home-ctas/Pricing";

export default function Home() {
    return (
        <Layout
            seoDescription="Miller builds tools for busy developers. Learn NestJs and NextJs, enrich your shell, get useful local dev tools, and more."
            seoTitle="Miller - Tools for busy devs!"
            headerTitle="Miller"
            productKey="miller-start"
            successRedirectPath="/payment-init/miller-start"
            themeColor="violet"
        >
            <Hero />
            <Pricing />
        </Layout>
    );
}
