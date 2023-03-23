import Script from "next/script";

export default function GumRoadWrapper() {
    return (
        <>
            <Script src="https://gumroad.com/js/gumroad-embed.js"></Script>
            <div className="gumroad-product-embed">
                <a href="https://darraghoriordan.gumroad.com/l/devshell">
                    Loading...
                </a>
            </div>
        </>
    );
}
