import {
    getAllCourses,
    getAnonymousApiInstance,
    getAuthenticatedApiInstance,
} from "@use-miller/shared-frontend-tooling";
import {
    CourseFilesApi,
    FileMetaDto,
    FileStructureDto,
} from "@use-miller/shared-api-client";

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
export const defaultProjectKey = "miller";
export const defaultCodeFile = btoa("/README.md");

export async function getCodeExplorerData(
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
    let apiClient: CourseFilesApi;
    if (!accessToken) {
        apiClient = await getAnonymousApiInstance(
            CourseFilesApi,
            process.env.NEXT_PUBLIC_API_BASE_PATH,
            fetch
        );
    } else {
        apiClient = await getAuthenticatedApiInstance(
            CourseFilesApi,
            process.env.NEXT_PUBLIC_API_BASE_PATH,
            accessToken,
            fetch
        );
    }

    const fileList = await apiClient.courseFilesControllerListCourseFiles({
        courseName: projectKey,
    });
    let initialCodeFile: FileMetaDto;
    if (!accessToken) {
        initialCodeFile = await apiClient.openCourseFilesControllerGetFile({
            courseName: projectKey,
            b64Path: codeFile,
        });
    } else {
        initialCodeFile = await apiClient.courseFilesControllerGetFile({
            courseName: projectKey,
            b64Path: codeFile,
        });
    }
    const initialMarkdownFile =
        await apiClient.openCourseFilesControllerGetMarkdownFileAsHtml({
            courseName: projectKey,
            markdownB64Path:
                initialCodeFile.nearestReadmeLocation || defaultCodeFile,
        });
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

export async function getStaticReferenceDocsPageSlugs(): Promise<{
    paths: {
        params: {
            projectKey: string;
            codeFile: string;
        };
    }[];
    fallback: boolean;
}> {
    const allReferenceProjects = await getAllCourses({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH,
        fetchApi: fetch,
    });

    const paths = [
        ...allReferenceProjects.map((course) => {
            return {
                params: {
                    projectKey: `${course.key}`,
                    codeFile: defaultCodeFile,
                },
            };
        }),
    ];

    return {
        paths,
        fallback: true,
    };
}
