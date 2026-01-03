import Loading from "../../../components/Loading";

const MarkdownWrapper = (props: {
    error: unknown;
    isError: boolean;
    isLoading: boolean;
    data: string | undefined;
}) => {
    const { error, isError, isLoading, data } = props;
    const firstContents = "// Welcome to Miller!";

    if (isError) {
        return (
            <div className="inset-0 z-10 overflow-hidden bg-security-dark">
                <div className="flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8">
                    <div className="max-w-lg text-lg text-security-text">
                        {`Error loading file content ${error}`}
                    </div>
                </div>
            </div>
        );
    }
    if (isLoading) {
        return <Loading message="Loading nearest readme file..." />;
    }

    return (
        <>
            {/* don't make the parent of this a div, it breaks the flex col stretch from the parent */}
            <div className="flex bg-security-dark border-b border-security-border max-h-full">
                <div className="inline-block px-4 py-2 text-sm font-mono text-accent border-b-2 border-accent bg-security-darker">
                    Notes for section
                </div>
            </div>
            <div className="overflow-x-hidden overflow-y-scroll flex flex-col flex-auto code-scroll max-h-full bg-security-dark">
                <article
                    className="mx-4 mt-2 mb-4 prose prose-sm prose-docs max-w-none max-h-full"
                    dangerouslySetInnerHTML={{
                        __html: data || firstContents,
                    }}
                ></article>
            </div>
        </>
    );
};

export default MarkdownWrapper;
