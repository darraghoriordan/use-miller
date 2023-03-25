import Script from "next/script";

export default function GumRoadWrapper({ productUrl }: { productUrl: string }) {
    return (
        <div>
            <Script src="https://gumroad.com/js/gumroad-embed.js"></Script>
            <div className="gumroad-product-embed">
                <a href={productUrl}>Loading...</a>
            </div>
        </div>
    );
}
