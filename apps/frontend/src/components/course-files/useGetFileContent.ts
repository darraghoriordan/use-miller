import wellKnownQueries from "./wellKnownQueries";
import { CourseFilesApi, FileMetaDto } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";

const apiCall = async (
    token: string,
    courseKey: string,
    filePath: string
): Promise<FileMetaDto> => {
    const apiClient = await getAuthenticatedApiInstance(
        CourseFilesApi,
        token,
        process.env.NEXT_PUBLIC_API_BASE_PATH
    );

    const filePathBase64 = Buffer.from(filePath).toString("base64");
    return await apiClient.courseFilesControllerGetFile({
        courseName: courseKey,
        b64Path: filePathBase64,
    });
};

export default function useGetFileContent(
    apiToken: string,
    courseKey: string,
    filePath: string
) {
    return useQuery(
        [wellKnownQueries.getCourseFileContent, courseKey, filePath],
        () => apiCall(apiToken, courseKey, filePath),
        { refetchOnWindowFocus: false }
    );
}
