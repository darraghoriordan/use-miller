import { getAnonymousApiInstance } from "../../api-services/apiInstanceFactories.js";
import { ApiOptions } from "../../api-services/ApiOptions.js";
import type { components } from "../../shared/types/api-specs";

type CourseMetaDto = components["schemas"]["CourseMetaDto"];

export const getAllCourses = async (
    productKey: string,
    { apiBase, fetchApi }: ApiOptions,
): Promise<CourseMetaDto[]> => {
    const apiClient = getAnonymousApiInstance({
        apiBase,
        fetchApi,
    });

    const { data, error } = await apiClient.GET("/project-meta/{productKey}", {
        params: { path: { productKey } },
    });

    if (error || !data) {
        throw new Error("Failed to fetch courses");
    }

    return data;
};
