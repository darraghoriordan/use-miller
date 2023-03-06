import wellKnownQueries from "./wellKnownQueries";
import {
    CourseFilesApi,
    FileStructureDto,
} from "@use-miller/shared-api-client";
import { getAnonymousApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";

const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (courseKey: string): Promise<FileStructureDto> => {
    const apiClient = await getAnonymousApiInstance(CourseFilesApi, apiBase);

    return await apiClient.courseFilesControllerListCourseFiles({
        courseName: courseKey,
    });
};

export default function useGetFiles(courseKey: string) {
    return useQuery(
        [wellKnownQueries.getCourseFiles, courseKey],
        () => apiCall(courseKey),
        { refetchOnWindowFocus: false }
    );
}
