import { FullDoc } from "../docParser.js";

export const DocArticle = ({ article }: { article: FullDoc }) => {
    return (
        <div className="ml-24 mt-[1em] mr-4">
            <h1 className="text-white font-medium text-4xl mb-8">
                {article?.title}
            </h1>

            <article
                className="mb-4 prose prose-lg prose-invert"
                dangerouslySetInnerHTML={{
                    __html: article?.html,
                }}
            ></article>
        </div>
    );
};
