import type { components } from "../shared/types/api-specs";
import { GetServerSidePropsContext } from "next";
import { auth0 } from "../lib/auth0";
import { createMenu, mapTitles } from "./leftMenuGeneration";
import {
    getAnonymousApiInstance,
    getAuthenticatedApiInstance,
} from "../api-services/apiInstanceFactories";

type FileMetaDto = components["schemas"]["FileMetaDto"];
type FileStructureDto = components["schemas"]["FileStructureDto"];

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
    accessToken: string | null | undefined,
): Promise<CodeExplorerData> {
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

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
    const apiClient = accessToken
        ? getAuthenticatedApiInstance({
              apiBase,
              authToken: accessToken,
              fetchApi: fetch,
          })
        : getAnonymousApiInstance({ apiBase, fetchApi: fetch });

    // Fetch file list
    const fileListResponse = await apiClient.GET(
        "/project-files/{productKey}/{projectKey}",
        {
            params: {
                path: {
                    productKey,
                    projectKey,
                },
            },
        },
    );

    if (!fileListResponse.data) {
        console.error(
            "Error fetching file list for",
            { productKey, projectKey, apiBase },
            fileListResponse.error,
        );
        throw new Error(
            `Failed to fetch file list for ${productKey}/${projectKey}: ${JSON.stringify(fileListResponse.error)}`,
        );
    }

    // Fetch initial code file - use open endpoint for anonymous, authenticated endpoint for logged in
    let initialCodeFile: FileMetaDto;
    let initialMarkdownFile: FileMetaDto;

    if (!accessToken) {
        // Anonymous user - use open endpoints
        const codeFileResponse = await apiClient.GET(
            "/project-files/{productKey}/open/{projectKey}/contents/{b64Path}",
            {
                params: {
                    path: {
                        productKey,
                        projectKey,
                        b64Path: codeFile,
                    },
                },
            },
        );

        if (!codeFileResponse.data) {
            console.error("Error fetching code file", codeFileResponse);
            throw new Error("Failed to fetch code file");
        }

        initialCodeFile = codeFileResponse.data;

        const markdownResponse = await apiClient.GET(
            "/project-files/{productKey}/open/{projectKey}/contents-markdown/{markdownB64Path}",
            {
                params: {
                    path: {
                        productKey,
                        projectKey,
                        markdownB64Path:
                            initialCodeFile.nearestReadmeLocation ||
                            defaultCodeFile,
                    },
                },
            },
        );

        if (!markdownResponse.data) {
            console.error("Error fetching markdown file", markdownResponse);
            throw new Error("Failed to fetch markdown file");
        }

        initialMarkdownFile = markdownResponse.data;
    } else {
        // Authenticated user - use protected endpoints
        const codeFileResponse = await apiClient.GET(
            "/project-files/{productKey}/{projectKey}/contents/{b64Path}",
            {
                params: {
                    path: {
                        productKey,
                        projectKey,
                        b64Path: codeFile,
                    },
                },
            },
        );

        if (!codeFileResponse.data) {
            console.error("Error fetching code file", codeFileResponse);
            throw new Error("Failed to fetch code file");
        }

        initialCodeFile = codeFileResponse.data;

        const markdownResponse = await apiClient.GET(
            "/project-files/{productKey}/{projectKey}/contents-markdown/{markdownB64Path}",
            {
                params: {
                    path: {
                        productKey,
                        projectKey,
                        markdownB64Path:
                            initialCodeFile.nearestReadmeLocation ||
                            defaultCodeFile,
                    },
                },
            },
        );

        if (!markdownResponse.data) {
            console.error("Error fetching markdown file", markdownResponse);
            throw new Error("Failed to fetch markdown file");
        }

        initialMarkdownFile = markdownResponse.data;
    }

    const serialisedFileList = JSON.parse(
        JSON.stringify(fileListResponse.data),
    );

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
    context: GetServerSidePropsContext,
) {
    const projectKey = context.params?.projectKey as string;
    const codeFile = context.params?.codeFile as string;
    const productKey = context.params?.productKey as string;

    let accessToken: string | null = null;
    try {
        const atResponse = await auth0.getAccessToken(context.req, context.res);
        accessToken = atResponse?.token ?? null;
    } catch {
        // No session available, user is not authenticated
        accessToken = null;
    }
    if (!projectKey || !codeFile) {
        throw new Error(
            "Missing projectKey or codeFile - params strike again!",
        );
    }

    const codeExplorerData = await getCodeExplorerData(
        productKey,
        projectKey,
        codeFile,
        accessToken,
    );
    const menuSections = await createMenu(productKey);
    const titles = mapTitles(productKey);

    return {
        props: {
            productKey,
            menuSections,
            codeExplorerData,
            ...titles,
        },
    };
}
