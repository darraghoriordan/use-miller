import { GetServerSidePropsContext } from "next";
import { MenuSection } from "../../../../../components/LeftMenu.jsx";
import {
    CodeExplorerData,
    getCodeFileServerSideProps,
} from "../../../../../docs/codeReferenceService.js";
import dynamic from "next/dynamic";

import { useRouter } from "next/router.js";
import { LeftMenuWrappedContent } from "../../../../../components/LeftMenuWrappedContent.jsx";

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
}: {
    menuSections: MenuSection[];
    codeExplorerData: CodeExplorerData;
    productKey: string;
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
            menuHeaderTitle={"Docs"}
            menuHeaderHref={`/docs/${productKey}`}
        >
            <div className="max-h-[calc(100vh-106px)] min-h-[calc(100vh-300px)] flex flex-row w-full overflow-hidden">
                {codeComponent}
            </div>
        </LeftMenuWrappedContent>
    );
}
