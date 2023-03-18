import { CourseFilesApi, FileMetaDto } from "@use-miller/shared-api-client";
import { useQuery } from "@tanstack/react-query";
import wellKnownQueries from "./wellKnownQueries.js";
import { ApiOptions } from "../api/ApiOptions.js";
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

    const apiClient = await getAnonymousApiInstance(
        CourseFilesApi,
        apiOptions.apiBase,
        apiOptions.fetchApi
    );
    return await apiClient.openCourseFilesControllerGetMarkdownFileAsHtml({
        courseName: courseKey,
        markdownB64Path: filePath,
    });
};

export default function useGetMarkdownContent(
    courseKey: string,
    filePath: string,
    enabled: boolean,
    apiOptions: ApiOptions
) {
    return useQuery(
        [wellKnownQueries.getCourseMarkdownContent, courseKey, filePath],
        () => apiCall(courseKey, filePath, apiOptions),
        { refetchOnWindowFocus: false, enabled }
    );
}
