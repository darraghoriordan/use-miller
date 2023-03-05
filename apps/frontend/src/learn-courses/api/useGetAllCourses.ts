import wellKnownQueries from "./wellKnownQueries";
import { CourseMetaApi, CourseMetaDto } from "@use-miller/shared-api-client";
import { getAnonymousApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";

const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (): Promise<CourseMetaDto[]> => {
    const apiClient = await getAnonymousApiInstance(CourseMetaApi, apiBase);
    return await apiClient.courseMetaControllerListAllCourses();
};

export default function useGetAllCourses() {
    return useQuery([wellKnownQueries.getAllCourses], () => apiCall(), {
        refetchOnWindowFocus: false,
    });
}
