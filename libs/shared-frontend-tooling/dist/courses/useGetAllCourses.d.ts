import { CourseMetaDto } from "@use-miller/shared-api-client";
import { ApiOptions } from "../api/ApiOptions.js";
export declare const getAllCourses: ({ apiBase, fetchApi, }: ApiOptions) => Promise<CourseMetaDto[]>;
export default function useGetAllCourses(options: ApiOptions): import("@tanstack/react-query").UseQueryResult<CourseMetaDto[], unknown>;
