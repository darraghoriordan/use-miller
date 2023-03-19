import { ProjectMetaApi, CourseMetaDto } from "@use-miller/shared-api-client";
import { getAnonymousApiInstance } from "../../api-services/apiInstanceFactories.js";
import { ApiOptions } from "../../api-services/ApiOptions.js";

export const getAllCourses = async (
    productKey: string,
    { apiBase, fetchApi }: ApiOptions
): Promise<CourseMetaDto[]> => {
    const apiClient = await getAnonymousApiInstance(
        ProjectMetaApi,
        apiBase,
        fetchApi
    );
    return await apiClient.courseMetaControllerListAllProjects({
        productKey,
    });
};
