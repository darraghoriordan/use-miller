import {
    ProjectFilesApi,
    FileMetaDto,
    FileStructureDto,
} from "@use-miller/shared-api-client";
import { GetServerSidePropsContext } from "next";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { createMenu, mapMenuTitle } from "./leftMenuGeneration.js";
import {
    getAnonymousApiInstance,
    getAuthenticatedApiInstance,
} from "../api-services/apiInstanceFactories.js";
//import { getAllCourses } from "./courses/useGetAllCourses.js";

export type CodeExplorerData = {
    slug: string;
    fileList: {
        data: FileStructureDto;
        isError: boolean;
        isLoading: boolean;
        error: unknown;
    };
    initialCodeFile: {
        data: FileMetaDto;
        isError: boolean;
        isLoading: boolean;
        error: unknown;
    };
    initialMarkdownFile: {
        data: FileMetaDto;
        isError: boolean;
        isLoading: boolean;
        error: unknown;
    };
    selectedFile: string;
};
export const defaultProjectKey = "miller-web";
export const defaultCodeFile = btoa("/README.md");

export async function getCodeExplorerData(
    productKey: string,
    projectKey: string,
    codeFile: string,
    accessToken: string | null | undefined
): Promise<CodeExplorerData> {
    codeFile;

    if (
        !projectKey ||
        projectKey === "index" ||
        projectKey === "" ||
        projectKey === "/"
    ) {
        projectKey = defaultProjectKey;
    }

    if (
        !codeFile ||
        codeFile === "index" ||
        codeFile === "" ||
        codeFile === "/"
    ) {
        codeFile = defaultCodeFile;
    }
    let apiClient: ProjectFilesApi;
    if (!accessToken) {
        apiClient = await getAnonymousApiInstance(
            ProjectFilesApi,
            process.env.NEXT_PUBLIC_API_BASE_PATH,
            fetch
        );
    } else {
        apiClient = await getAuthenticatedApiInstance(
            ProjectFilesApi,
            process.env.NEXT_PUBLIC_API_BASE_PATH,
            accessToken,
            fetch
        );
    }

    const fileList = await apiClient.courseFilesControllerListProjectFiles({
        productKey,
        projectKey,
    });
    let initialCodeFile: FileMetaDto;
    let initialMarkdownFile: FileMetaDto;
    if (!accessToken) {
        initialCodeFile = await apiClient.openCourseFilesControllerGetFile({
            productKey,
            projectKey,
            b64Path: codeFile,
        });
        initialMarkdownFile =
            await apiClient.openCourseFilesControllerGetMarkdownFileAsHtml({
                productKey,
                projectKey,
                markdownB64Path:
                    initialCodeFile.nearestReadmeLocation || defaultCodeFile,
            });
    } else {
        initialCodeFile = await apiClient.courseFilesControllerGetFile({
            productKey,
            projectKey,
            b64Path: codeFile,
        });
        initialMarkdownFile =
            await apiClient.courseFilesControllerGetMarkdownFileAsHtml({
                productKey,
                projectKey,
                markdownB64Path:
                    initialCodeFile.nearestReadmeLocation || defaultCodeFile,
            });
    }

    const serialisedFileList = JSON.parse(JSON.stringify(fileList));
    return {
        slug: projectKey,
        fileList: {
            data: serialisedFileList,
            isLoading: false,
            isError: false,
            error: null,
        },

        initialCodeFile: {
            data: initialCodeFile,
            isLoading: false,
            isError: false,
            error: null,
        },
        initialMarkdownFile: {
            data: initialMarkdownFile,
            isLoading: false,
            isError: false,
            error: null,
        },
        selectedFile: codeFile,
    };
}
export async function getCodeFileServerSideProps(
    context: GetServerSidePropsContext
) {
    const projectKey = context.params?.projectKey as string;
    const codeFile = context.params?.codeFile as string;
    const productKey = context.params?.productKey as string;

    const session = await getSession(context.req, context.res);
    let accessToken = null;
    if (session) {
        const atResponse = await getAccessToken(context.req, context.res, {
            scopes: ["openid", "email", "profile", "offline_access"],
        });
        accessToken = atResponse.accessToken;
    }
    if (!projectKey || !codeFile) {
        throw new Error(
            "Missing projectKey or codeFile - params strike again!"
        );
    }

    const codeExplorerData = await getCodeExplorerData(
        productKey,
        projectKey,
        codeFile,
        accessToken
    );
    const menuSections = await createMenu(productKey);
    const headerTitle = mapMenuTitle(productKey);
    return {
        props: {
            productKey,
            menuSections,
            codeExplorerData,
            headerTitle,
        }, // will be passed to the page component as props
    };
}
