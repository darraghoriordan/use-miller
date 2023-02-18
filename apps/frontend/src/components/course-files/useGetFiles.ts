import wellKnownQueries from "./wellKnownQueries";
import {
    CourseFilesApi,
    FileStructureDto,
} from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";

const apiCall = async (
    token: string,
    courseKey: string
): Promise<FileStructureDto> => {
    const apiClient = await getAuthenticatedApiInstance(
        CourseFilesApi,
        token,
        process.env.NEXT_PUBLIC_API_BASE_PATH
    );

    return await apiClient.courseFilesControllerListCourseFiles({
        courseName: courseKey,
    });
};

export default function useGetFiles(apiToken: string, courseKey: string) {
    return useQuery(
        [wellKnownQueries.getCourseFiles, courseKey],
        () => apiCall(apiToken, courseKey),
        { refetchOnWindowFocus: false }
    );
}
