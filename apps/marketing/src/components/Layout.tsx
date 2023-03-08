import { PropsWithChildren } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import SEO from "../components/SEO";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen">
            <SEO title="Home" />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
