"use client";

import Script from "next/script";
import clsx from "clsx";

interface GumRoadWrapperProps {
    productUrl: string;
    buttonText?: string;
    className?: string;
}

export default function GumRoadWrapper({
    productUrl,
    buttonText = "Buy Now",
    className,
}: GumRoadWrapperProps) {
    const baseStyles =
        "inline-flex items-center justify-center px-8 py-4 font-mono text-base font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-security-black";

    const colorStyles =
        "bg-product-localtools text-security-black hover:bg-product-localtools/80 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] focus:ring-product-localtools/50";

    return (
        <div>
            {/* Gumroad overlay script (not embed script) */}
            <Script
                src="https://gumroad.com/js/gumroad.js"
                strategy="lazyOnload"
            />

            {/* Styled button that opens Gumroad overlay */}
            <a
                href={productUrl}
                className={clsx(
                    "gumroad-button",
                    baseStyles,
                    colorStyles,
                    className,
                )}
            >
                <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                </svg>
                {buttonText}
            </a>
        </div>
    );
}
