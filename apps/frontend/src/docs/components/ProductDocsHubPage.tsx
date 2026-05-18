import Link from "next/link";
import { DocsPageSummary } from "../docParser";

export function ProductDocsHubPage({ product }: { product: DocsPageSummary }) {
    return (
        <div className="ml-12 lg:ml-24 mt-8 mr-4 max-w-4xl prose prose-lg prose-docs">
            <h1 className="font-display text-security-light text-3xl md:text-4xl mb-6 tracking-tight">
                {product.productLabel} documentation
            </h1>
            <p>
                Start with the section that matches what you are trying to do,
                then drill into the individual guides for details.
            </p>
            {product.sections.map((section) => (
                <section key={section.sectionSlug} className="mt-10">
                    <h2>{section.sectionDisplayName}</h2>
                    <p>
                        {section.pages.length} guide
                        {section.pages.length === 1 ? "" : "s"} in this section.
                    </p>
                    <p>
                        <Link
                            href={`/docs/${product.productKey}/${section.sectionSlug}`}
                        >
                            View the {section.sectionDisplayName.toLowerCase()}{" "}
                            section
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
                </section>
            ))}
        </div>
    );
}
