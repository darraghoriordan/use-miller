import { GetServerSidePropsContext } from "next";
import { MenuSection } from "../../../../../components/LeftMenu";
import {
    CodeExplorerData,
    getCodeFileServerSideProps,
} from "../../../../../docs/codeReferenceService";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { LeftMenuWrappedContent } from "../../../../../components/LeftMenuWrappedContent";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return getCodeFileServerSideProps(context);
}

const DynamicCodeExplorer = dynamic(
    () => import("../../../../../docs/components/code-explorer/CodeExplorer"),
    {
        loading: () => <p>Loading Code...</p>,
        ssr: false,
    },
);

export default function CodeFileHome({
    menuSections,
    codeExplorerData,
    errorMessage,
    productKey,
    menuHeaderTitle,
    headerTitle,
}: {
    menuSections: MenuSection[];
    codeExplorerData: CodeExplorerData | null;
    errorMessage?: string | null;
    productKey: string;
    menuHeaderTitle: string;
    headerTitle: string;
}) {
    const router = useRouter();

    if (!codeExplorerData) {
        return (
            <LeftMenuWrappedContent
                productKey={productKey}
                menuSections={menuSections}
                menuHeaderTitle={menuHeaderTitle}
                menuHeaderHref={`/docs/${productKey}`}
                headerTitle={headerTitle}
                canonicalUrl={`https://usemiller.dev/docs/${productKey}`}
                seoTitle={`${headerTitle} Code Reference`}
                seoDescription={`Browse the ${headerTitle} code reference explorer for project structure and implementation details.`}
                noIndex
            >
                <div className="ml-12 lg:ml-24 mt-8 mr-4 max-w-3xl prose prose-lg prose-docs">
                    <h1 className="font-display text-security-light text-3xl md:text-4xl mb-6 tracking-tight">
                        Code reference unavailable
                    </h1>
                    <p>
                        The code reference explorer could not load its backend
                        data source.
                    </p>
                    {errorMessage ? <p>{errorMessage}</p> : null}
                    <p>
                        In local development, make sure the backend API is
                        running and `NEXT_PUBLIC_API_BASE_PATH` points to it.
                    </p>
                </div>
            </LeftMenuWrappedContent>
        );
    }

    const setSelectedFile = (fileParam: string, projectKeyParam: string) => {
        router.push(
            `/docs/${productKey}/reference/${projectKeyParam}/${fileParam}`,
        );
    };

    const {
        fileList,
        initialMarkdownFile: markdownFile,
        initialCodeFile: codeFileData,
        selectedFile,
        slug: projectKey,
    } = codeExplorerData;

    let codeComponent = (
        <DynamicCodeExplorer
            projectKey={projectKey}
            fileList={fileList}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            codeFile={codeFileData}
            markdownFile={markdownFile}
        />
    );
    if (
        !codeFileData.data ||
        codeFileData.isLoading ||
        !fileList.data ||
        fileList.isLoading ||
        !markdownFile.data ||
        markdownFile.isLoading
    ) {
        codeComponent = <p className="text-2xl text-neutral-100">Loading...</p>;
    }

    return (
        <LeftMenuWrappedContent
            productKey={productKey}
            menuSections={menuSections}
            menuHeaderTitle={menuHeaderTitle}
            menuHeaderHref={`/docs/${productKey}`}
            headerTitle={headerTitle}
            canonicalUrl={`https://usemiller.dev/docs/${productKey}`}
            seoTitle={`${headerTitle} Code Reference`}
            seoDescription={`Browse the ${headerTitle} code reference explorer for project structure and implementation details.`}
            noIndex
        >
            <div className="flex flex-col w-full overflow-hidden">
                {
                    // This is one of the hackiest things in the app. Harmless tho. Will fix later
                    // need to actually check that the users access to the product(s)
                    markdownFile?.data?.contents?.includes(
                        "Purchase Notice",
                    ) && (
                        <div className="bg-yellow-50 text-yellow-800">
                            <ExclamationTriangleIcon
                                className="inline h-5 w-5 mr-3 text-yellow-400"
                                aria-hidden="true"
                            />
                            <span className="text-sm">
                                <span className="font-semibold">
                                    Thanks for visiting!{" "}
                                </span>
                                It looks like you haven't purchased yet. You can
                                explore the full project structure here, but you
                                will see scrambled code files. After purchasing
                                you will see full file content here, and get
                                full access on GitHub.
                            </span>
                        </div>
                    )
                }
                <div className="max-h-[calc(100vh-106px)] min-h-[calc(100vh-300px)] flex flex-row w-full overflow-hidden">
                    {codeComponent}
                </div>
            </div>
        </LeftMenuWrappedContent>
    );
}
