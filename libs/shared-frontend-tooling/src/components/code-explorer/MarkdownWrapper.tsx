import Loading from "../Loading.js";

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
            <div className="inset-0 z-10 overflow-y-auto">
                <div className="flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8">
                    <div className="max-w-lg text-lg text-white">
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
            <div className="flex bg-dark-mid">
                <div className="inline-block px-4 py-2 text-sm text-orange-300 border-b border-orange-300 bg-dark-shade">
                    Notes for code section
                </div>
            </div>
            <article
                className="mx-4 mt-2 mb-4 prose prose-sm prose-invert"
                dangerouslySetInnerHTML={{
                    __html: data || firstContents,
                }}
            ></article>
        </>
    );
};

export default MarkdownWrapper;
