import { FileMetaDto } from "@use-miller/shared-api-client";
import { ApiOptions } from "../api/ApiOptions.js";
export declare const apiCall: (courseKey: string, filePath: string, apiOptions: ApiOptions) => Promise<FileMetaDto>;
export default function useGetMarkdownContent(courseKey: string, filePath: string, enabled: boolean, apiOptions: ApiOptions): import("@tanstack/react-query").UseQueryResult<FileMetaDto, unknown>;
