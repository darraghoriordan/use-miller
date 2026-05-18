import Link from "next/link";
import { DocsPageSummary } from "../docParser";

export function DocsHubPage({ products }: { products: DocsPageSummary[] }) {
    return (
        <div className="ml-12 lg:ml-24 mt-8 mr-4 max-w-4xl prose prose-lg prose-docs">
            <h1 className="font-display text-security-light text-3xl md:text-4xl mb-6 tracking-tight">
                Miller documentation
            </h1>
            <p>
                Browse product docs, quick starts, support pages, and practical
                guides for the Miller tools published on usemiller.dev.
            </p>
            {products.map((product) => (
                <section key={product.productKey} className="mt-10">
                    <h2>{product.productLabel}</h2>
                    <p>
                        Explore {product.sections.length} section
                        {product.sections.length === 1 ? "" : "s"} for{" "}
                        {product.productLabel}.
                    </p>
                    <ul>
                        <li>
                            <Link href={`/docs/${product.productKey}`}>
                                View {product.productLabel} docs hub
                            </Link>
                        </li>
                        {product.sections.map((section) => (
                            <li key={section.sectionSlug}>
                                <Link
                                    href={`/docs/${product.productKey}/${section.sectionSlug}`}
                                >
                                    {section.sectionDisplayName}
                                </Link>{" "}
                                ({section.pages.length} page
                                {section.pages.length === 1 ? "" : "s"})
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
