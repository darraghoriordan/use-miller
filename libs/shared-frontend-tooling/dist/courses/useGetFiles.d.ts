import { FileStructureDto } from "@use-miller/shared-api-client";
import { ApiOptions } from "../api/ApiOptions.js";
export declare const apiCall: (courseKey: string, apiOptions: ApiOptions) => Promise<FileStructureDto>;
export default function useGetFiles(courseKey: string, enabled: boolean | undefined, apiOptions: ApiOptions): import("@tanstack/react-query").UseQueryResult<FileStructureDto, unknown>;
