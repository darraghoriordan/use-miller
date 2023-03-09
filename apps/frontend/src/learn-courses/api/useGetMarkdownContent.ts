import wellKnownQueries from "@use-miller/shared-frontend-tooling/src/courses/wellKnownQueries";
import { CourseFilesApi, FileMetaDto } from "@use-miller/shared-api-client";
import { getAnonymousApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";

const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    courseKey: string,
    filePath: string
): Promise<FileMetaDto> => {
    if (!filePath || filePath === "") {
        return {
            contents: "// Welcome to Miller!",
            fileLocation: "/",
        } as FileMetaDto;
    }

    const apiClient = await getAnonymousApiInstance(CourseFilesApi, apiBase);
    return await apiClient.openCourseFilesControllerGetMarkdownFileAsHtml({
        courseName: courseKey,
        markdownB64Path: filePath,
    });
};

export default function useGetMarkdownContent(
    courseKey: string,
    filePath: string,
    enabled: boolean
) {
    return useQuery(
        [wellKnownQueries.getCourseMarkdownContent, courseKey, filePath],
        () => apiCall(courseKey, filePath),
        { refetchOnWindowFocus: false, enabled }
    );
}
