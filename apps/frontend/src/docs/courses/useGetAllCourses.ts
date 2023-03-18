import { CourseMetaApi, CourseMetaDto } from "@use-miller/shared-api-client";
import { getAnonymousApiInstance } from "../../api-services/apiInstanceFactories.js";
import { ApiOptions } from "../../api-services/ApiOptions.js";

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

// export default function useGetAllCourses(options: ApiOptions) {
//     return useQuery(
//         [wellKnownQueries.getAllCourses],
//         () => getAllCourses(options),
//         {
//             refetchOnWindowFocus: false,
//         }
//     );
// }
