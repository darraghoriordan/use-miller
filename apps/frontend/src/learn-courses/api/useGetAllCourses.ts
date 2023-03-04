import wellKnownQueries from "./wellKnownQueries";
import { CourseFilesApi, FileMetaDto } from "@use-miller/shared-api-client";
import {
    getAnonymousApiInstance,
    getAuthenticatedApiInstance,
} from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";

const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
): Promise<FileMetaDto> => {

        const apiClient = await getAnonymousApiInstance(
            CourseFilesApi,
            apiBase
        );
        return await apiClient.({
            courseName: courseKey,
            b64Path: filePathBase64,
        });

};

export default function useGetAllCourses() {
    return useQuery(
        [wellKnownQueries.getAllCourses],
        () => apiCall(),
        { refetchOnWindowFocus: false }
    );
}
