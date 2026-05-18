import Link from "next/link";
import { DocsPageSummary, Section } from "../docParser";

export function SectionDocsHubPage({
    product,
    section,
}: {
    product: DocsPageSummary;
    section: Section;
}) {
    return (
        <div className="ml-12 lg:ml-24 mt-8 mr-4 max-w-4xl prose prose-lg prose-docs">
            <h1 className="font-display text-security-light text-3xl md:text-4xl mb-6 tracking-tight">
                {section.sectionDisplayName}
            </h1>
            <p>
                Browse the {section.sectionDisplayName.toLowerCase()} guides for{" "}
                {product.productLabel}.
            </p>
            <p>
                <Link href={`/docs/${product.productKey}`}>
                    Back to {product.productLabel} docs
                </Link>
            </p>
            <ul>
                {section.pages.map((page) => (
                    <li key={page.slug}>
                        <Link
                            href={`/docs/${product.productKey}/${section.sectionSlug}/${page.slug}`}
                        >
                            {page.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
