import {
    CourseFilesApi,
    FileStructureDto,
} from "@use-miller/shared-api-client";
import { useQuery } from "@tanstack/react-query";
import { ApiOptions } from "../api/ApiOptions.js";
import { getAnonymousApiInstance } from "../api/apiInstanceFactories.js";
import wellKnownQueries from "./wellKnownQueries.js";

export const apiCall = async (
    courseKey: string,
    apiOptions: ApiOptions
): Promise<FileStructureDto> => {
    const apiClient = await getAnonymousApiInstance(
        CourseFilesApi,
        apiOptions.apiBase,
        apiOptions.fetchApi
    );

    return await apiClient.courseFilesControllerListCourseFiles({
        courseName: courseKey,
    });
};

export default function useGetFiles(
    courseKey: string,
    enabled: boolean = true,
    apiOptions: ApiOptions
) {
    return useQuery(
        [wellKnownQueries.getCourseFiles, courseKey],
        () => apiCall(courseKey, apiOptions),
        { refetchOnWindowFocus: false, enabled }
    );
}
