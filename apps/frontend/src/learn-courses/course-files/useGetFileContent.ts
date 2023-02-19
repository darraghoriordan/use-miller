import wellKnownQueries from "./wellKnownQueries";
import { CourseFilesApi, FileMetaDto } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";

const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>,
    courseKey: string,
    filePath: string
): Promise<FileMetaDto> => {
    const apiClient = await getAuthenticatedApiInstance(
        CourseFilesApi,
        apiBase,
        getAccessTokenSilently
    );

    if (!filePath || filePath === "") {
        return {
            contents: "// Welcome to Miller!",
            fileLocation: "/",
        } as FileMetaDto;
    }
    const filePathBase64 = btoa(filePath);
    return await apiClient.courseFilesControllerGetFile({
        courseName: courseKey,
        b64Path: filePathBase64,
    });
};

export default function useGetFileContent(courseKey: string, filePath: string) {
    const { getAccessTokenSilently } = useAuth0();
    return useQuery(
        [wellKnownQueries.getCourseFileContent, courseKey, filePath],
        () => apiCall(getAccessTokenSilently, courseKey, filePath),
        { refetchOnWindowFocus: false }
    );
}
