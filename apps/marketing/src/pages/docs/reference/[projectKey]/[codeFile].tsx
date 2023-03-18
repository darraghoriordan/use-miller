import { GetServerSidePropsContext } from "next";
import { MenuSection } from "../../../../components/LeftMenu.jsx";
import {
    CodeExplorerData,
    getCodeFileServerSideProps,
} from "../../../../docs/codeReferenceService.js";
import dynamic from "next/dynamic";

import { useRouter } from "next/router.js";
import { LeftMenuWrappedContent } from "../../../../components/LeftMenuWrappedContent.jsx";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return getCodeFileServerSideProps(context);
}

const DynamicCodeExplorer = dynamic(
    () =>
        import("@use-miller/shared-frontend-tooling").then(
            (mod) => mod.CodeExplorer
        ),
    {
        loading: () => <p>Loading Code...</p>,
        ssr: false,
    }
);

export default function CodeFileHome({
    menuSections,
    codeExplorerData,
}: {
    menuSections: MenuSection[];
    codeExplorerData: CodeExplorerData;
}) {
    const router = useRouter();

    const setSelectedFile = (fileParam: string, projectKeyParam: string) => {
        router.push("/docs/reference/" + projectKeyParam + "/" + fileParam);
    };

    const {
        fileList,
        initialMarkdownFile: markdownFile,
        initialCodeFile: codeFileData,
        selectedFile: selectedFileX,
        slug: projectKeyX,
    } = codeExplorerData;

    let codeComponent = (
        <DynamicCodeExplorer
            projectKey={projectKeyX}
            fileList={fileList}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFileX}
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
            menuSections={menuSections}
            menuHeaderTitle={"Docs"}
            menuHeaderHref={"/docs"}
        >
            <div className="max-h-[calc(100vh-106px)] flex flex-row w-full overflow-hidden">
                {codeComponent}
            </div>
        </LeftMenuWrappedContent>
    );
}
