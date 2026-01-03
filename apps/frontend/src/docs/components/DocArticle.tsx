import { FullDoc } from "../docParser";

export const DocArticle = ({ article }: { article: FullDoc }) => {
    return (
        <div className="ml-12 lg:ml-24 mt-8 mr-4 max-w-4xl">
            <h1 className="font-display text-security-light text-3xl md:text-4xl mb-8 tracking-tight">
                {article?.title}
            </h1>

            <article
                className="mb-4 prose prose-lg prose-docs"
                dangerouslySetInnerHTML={{
                    __html: article?.html,
                }}
            ></article>
        </div>
    );
};
