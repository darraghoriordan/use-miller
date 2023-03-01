import wellKnownQueries from "./wellKnownQueries";
import {
    CourseFilesApi,
    FileStructureDto,
} from "@use-miller/shared-api-client";
import { getAnonymousApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>,

    courseKey: string
): Promise<FileStructureDto> => {
    const apiClient = await getAnonymousApiInstance(CourseFilesApi, apiBase);

    return await apiClient.courseFilesControllerListCourseFiles({
        courseName: courseKey,
    });
};

export default function useGetFiles(courseKey: string) {
    const { getAccessTokenSilently } = useAuth0();
    return useQuery(
        [wellKnownQueries.getCourseFiles, courseKey],
        () => apiCall(getAccessTokenSilently, courseKey),
        { refetchOnWindowFocus: false }
    );
}
