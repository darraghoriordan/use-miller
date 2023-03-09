import wellKnownQueries from "@use-miller/shared-frontend-tooling/src/courses/wellKnownQueries";
import { CourseFilesApi, FileMetaDto } from "@use-miller/shared-api-client";
import {
    getAnonymousApiInstance,
    getAuthenticatedApiInstance,
} from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0, User } from "@auth0/auth0-react";

const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>,
    courseKey: string,
    user: User | undefined,
    filePath: string
): Promise<FileMetaDto> => {
    if (!filePath || filePath === "") {
        return {
            contents: "// Welcome to Miller!",
            fileLocation: "/",
        } as FileMetaDto;
    }
    // need a path here for the anonymous user
    if (!user) {
        const apiClient = await getAnonymousApiInstance(
            CourseFilesApi,
            apiBase
        );
        return await apiClient.openCourseFilesControllerGetFile({
            courseName: courseKey,
            b64Path: filePath,
        });
    }

    const apiClient = await getAuthenticatedApiInstance(
        CourseFilesApi,
        apiBase,
        getAccessTokenSilently
    );
    return await apiClient.courseFilesControllerGetFile({
        courseName: courseKey,
        b64Path: filePath,
    });
};

export default function useGetFileContent(
    courseKey: string,
    filePath: string,
    enabled: boolean
) {
    const { getAccessTokenSilently, user } = useAuth0();
    return useQuery(
        [wellKnownQueries.getCourseFileContent, courseKey, filePath],
        () => apiCall(getAccessTokenSilently, courseKey, user, filePath),
        { refetchOnWindowFocus: false, enabled }
    );
}
