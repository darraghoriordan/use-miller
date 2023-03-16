import { CourseFilesApi, FileMetaDto } from "@use-miller/shared-api-client";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0, User } from "@auth0/auth0-react";
import { ApiOptions } from "../api/ApiOptions.js";
import wellKnownQueries from "./wellKnownQueries.js";
import { getAnonymousApiInstance } from "../api/apiInstanceFactories.js";

export const apiCall = async (
    courseKey: string,
    filePath: string,
    apiOptions: ApiOptions
): Promise<FileMetaDto> => {
    if (!filePath || filePath === "") {
        return {
            contents: "// Welcome to Miller!",
            fileLocation: "/",
        } as FileMetaDto;
    }
    // need a path here for the anonymous user

    const apiClient = await getAnonymousApiInstance(
        CourseFilesApi,
        apiOptions.apiBase,
        apiOptions.fetchApi
    );
    return await apiClient.openCourseFilesControllerGetFile({
        courseName: courseKey,
        b64Path: filePath,
    });
};

export default function useGetFileContent(
    courseKey: string,
    filePath: string,
    enabled: boolean,
    apiOptions: ApiOptions
) {
    return useQuery(
        [wellKnownQueries.getCourseFileContent, courseKey, filePath],
        () => apiCall(courseKey, filePath, apiOptions),
        { refetchOnWindowFocus: false, enabled }
    );
}
