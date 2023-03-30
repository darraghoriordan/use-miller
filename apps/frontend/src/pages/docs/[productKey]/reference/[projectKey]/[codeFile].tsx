import { GetServerSidePropsContext } from "next";
import { MenuSection } from "../../../../../components/LeftMenu.jsx";
import {
    CodeExplorerData,
    getCodeFileServerSideProps,
} from "../../../../../docs/codeReferenceService.js";
import dynamic from "next/dynamic";

import { useRouter } from "next/router.js";
import { LeftMenuWrappedContent } from "../../../../../components/LeftMenuWrappedContent.jsx";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return getCodeFileServerSideProps(context);
}

const DynamicCodeExplorer = dynamic(
    () => import("../../../../../docs/components/code-explorer/CodeExplorer"),
    {
        loading: () => <p>Loading Code...</p>,
        ssr: false,
    }
);

export default function CodeFileHome({
    menuSections,
    codeExplorerData,
    productKey,
    menuHeaderTitle,
    headerTitle,
}: {
    menuSections: MenuSection[];
    codeExplorerData: CodeExplorerData;
    productKey: string;
    menuHeaderTitle: string;
    headerTitle: string;
}) {
    const router = useRouter();

    const setSelectedFile = (fileParam: string, projectKeyParam: string) => {
        router.push(
            `/docs/${productKey}/reference/${projectKeyParam}/${fileParam}`
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
        >
            <div className="flex flex-col w-full overflow-hidden">
                {
                    // This is one of the hackiest things in the app. Harmless tho. Will fix later
                    // need to actually check that the users access to the product(s)
                    markdownFile?.data?.contents?.includes(
                        "Purchase Notice"
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
                                will see clipped code files. After purchase you
                                will see full files here, and on GitHub.
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
