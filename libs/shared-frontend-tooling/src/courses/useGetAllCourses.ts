import wellKnownQueries from "./wellKnownQueries";
import { CourseMetaApi, CourseMetaDto } from "@use-miller/shared-api-client";
import { useQuery } from "@tanstack/react-query";
import { ApiOptions } from "../api/ApiOptions.js";
import { getAnonymousApiInstance } from "../api/apiInstanceFactories.js";

export const getAllCourses = async ({
    apiBase,
    fetchApi,
}: ApiOptions): Promise<CourseMetaDto[]> => {
    const apiClient = await getAnonymousApiInstance(
        CourseMetaApi,
        apiBase,
        fetchApi
    );
    return await apiClient.courseMetaControllerListAllCourses();
};

export default function useGetAllCourses(options: ApiOptions) {
    return useQuery(
        [wellKnownQueries.getAllCourses],
        () => getAllCourses(options),
        {
            refetchOnWindowFocus: false,
        }
    );
}
