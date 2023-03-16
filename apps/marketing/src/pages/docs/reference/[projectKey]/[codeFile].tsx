import Layout from "../../../../components/Layout.jsx";
import { Container } from "../../../../components/Container.jsx";
import { GetStaticPaths } from "next";
import { createMenu } from "../../../../docs/leftMenu.js";
import {
    LeftMenu,
    MenuSection,
} from "../../../../docs/components/LeftMenu.jsx";
import {
    CodeExplorerData,
    getCodeExplorerData,
    getStaticReferenceDocsPageSlugs,
} from "../../../../docs/referenceDocs.js";
import dynamic from "next/dynamic";
import {
    useGetFileContent,
    useGetFiles,
    useGetMarkdownContent,
} from "@use-miller/shared-frontend-tooling";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";

export async function getStaticProps({
    params,
}: {
    params: { projectKey: string; codeFile: string };
}) {
    const initialData = await getCodeExplorerData(
        params.projectKey,
        params.codeFile
    );
    const menuSections = await createMenu();
    return {
        props: {
            menuSections,
            codeExplorerData: initialData,
        },
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    return getStaticReferenceDocsPageSlugs();
};

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

    const { projectKey, codeFile } = router.query;

    // const projectKey = rawPk ? (rawPk as string) : "miller";
    // const codeFile = rawCf ? (rawCf as string) : btoa("/README.md");

    const apiOptions = {
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH,
    };

    const [selectedFile, setSelectedFile] = useState(codeFile as string);
    useEffect(() => {
        if (codeFile) {
            setSelectedFile(codeFile as string);
        }
    }, [codeFile]);

    const codeFileData = useGetFileContent(
        projectKey as string,
        selectedFile,
        selectedFile !== undefined && projectKey !== undefined,
        apiOptions
    );
    const clientFileList = useGetFiles(
        projectKey as string,
        projectKey !== undefined,
        apiOptions
    );
    const fileList = codeExplorerData?.fileList || clientFileList;

    const markdownFile = useGetMarkdownContent(
        projectKey as string,
        codeFileData.data?.nearestReadmeLocation || "",
        codeFileData.data?.nearestReadmeLocation !== undefined,
        apiOptions
    );

    useEffect(() => {
        if (selectedFile) {
            window.history.replaceState(
                null,
                `${projectKey} File`,
                `/docs/reference/${projectKey}/${selectedFile}`
            );
        }
    }, [selectedFile]);

    let codeComp = (
        <DynamicCodeExplorer
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
        codeComp = <p className="text-2xl text-neutral-100">Loading...</p>;
    }

    return (
        <Layout>
            <Container className="w-full min-w-full mx-auto bg-neutral-900 mb-16">
                <div className="flex items-stretch">
                    <LeftMenu menuSections={menuSections} />
                    {codeComp}
                </div>
            </Container>
        </Layout>
    );
}
