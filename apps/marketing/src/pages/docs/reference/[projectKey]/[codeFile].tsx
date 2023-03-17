import Layout from "../../../../components/Layout.jsx";
import { Container } from "../../../../components/Container.jsx";
import { GetServerSidePropsContext } from "next";
import { createMenu } from "../../../../docs/leftMenu.js";
import {
    LeftMenu,
    MenuSection,
} from "../../../../docs/components/LeftMenu.jsx";
import {
    CodeExplorerData,
    getCodeExplorerData,
} from "../../../../docs/referenceDocs.js";
import dynamic from "next/dynamic";

import { useRouter } from "next/router.js";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const projectKey = context.params?.projectKey as string,
        codeFile = context.params?.codeFile as string;
    const session = await getSession(context.req, context.res);
    let accessToken = null;
    if (session) {
        console.log("session", { session });
        const atResponse = await getAccessToken(context.req, context.res, {
            scopes: ["openid", "email", "profile", "offline_access"],
        });
        accessToken = atResponse.accessToken;
        console.log("access token", { accessToken });
    }
    if (!projectKey || !codeFile) {
        throw new Error(
            "Missing projectKey or codeFile - params strike again!"
        );
    }

    const initialData = await getCodeExplorerData(
        projectKey,
        codeFile,
        accessToken
    );
    const menuSections = await createMenu();

    return {
        props: {
            menuSections,
            codeExplorerData: initialData,
        }, // will be passed to the page component as props
    };
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

    let codeComp = (
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
        codeComp = <p className="text-2xl text-neutral-100">Loading...</p>;
    }

    return (
        <Layout>
            <Container className="w-full min-w-full mx-auto bg-neutral-900 mb-16">
                <div className="flex items-stretch">
                    <LeftMenu menuSections={menuSections} />
                    <div className="max-h-[calc(100vh-106px)] flex flex-row w-full overflow-hidden">
                        {codeComp}
                    </div>
                </div>
            </Container>
        </Layout>
    );
}
