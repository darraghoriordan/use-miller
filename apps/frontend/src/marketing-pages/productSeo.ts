import type { StructuredData } from "../components/SEO";

const siteUrl = "https://usemiller.dev";
const organizationId = `${siteUrl}/#organization`;
const founderId = `${siteUrl}/#founder`;

export const productSeo = {
    "miller-start": {
        markdownUrl: `${siteUrl}/products/miller-start.md`,
        structuredData: {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            "@id": `${siteUrl}/miller-start#software`,
            name: "Miller Start",
            description:
                "An agent-ready NestJS and Next.js application starter with authentication, billing, PostgreSQL, Terraform, and operational tooling.",
            url: `${siteUrl}/miller-start`,
            codeRepository: "https://github.com/darraghoriordan/use-miller",
            programmingLanguage: ["TypeScript", "JavaScript"],
            runtimePlatform: "Node.js 24",
            isAccessibleForFree: true,
            author: {
                "@id": founderId,
            },
            publisher: {
                "@id": organizationId,
            },
        },
    },
    "dev-shell": {
        markdownUrl: `${siteUrl}/products/dev-shell.md`,
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": `${siteUrl}/dev-shell#product`,
            name: "Miller Dev Shell",
            description:
                "Reproducible developer-machine setup scripts for macOS and Windows WSL.",
            url: `${siteUrl}/dev-shell`,
            category: "Developer tools",
            brand: {
                "@id": organizationId,
            },
            offers: {
                "@type": "Offer",
                price: "29",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: `${siteUrl}/dev-shell#pricing`,
            },
        },
    },
    "local-dev-tools": {
        markdownUrl: `${siteUrl}/products/local-dev-tools.md`,
        structuredData: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `${siteUrl}/local-dev-tools#software`,
            name: "Miller Local Dev Tools",
            description:
                "Local-first desktop utilities for JSON, JWTs, encoding, regular expressions, timestamps, Git, colors, and optional AI workflows.",
            url: `${siteUrl}/local-dev-tools`,
            downloadUrl: `${siteUrl}/local-dev-tools#download`,
            applicationCategory: "DeveloperApplication",
            operatingSystem: ["macOS", "Windows"],
            author: {
                "@id": founderId,
            },
            publisher: {
                "@id": organizationId,
            },
        },
    },
} satisfies Record<
    "miller-start" | "dev-shell" | "local-dev-tools",
    { markdownUrl: string; structuredData: StructuredData }
>;
