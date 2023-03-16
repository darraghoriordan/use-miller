import { CourseFilesApi } from "@use-miller/shared-api-client";
import { useQuery } from "@tanstack/react-query";
import wellKnownQueries from "./wellKnownQueries.js";
import { getAnonymousApiInstance } from "../api/apiInstanceFactories.js";
export const apiCall = async (courseKey, filePath, apiOptions) => {
    if (!filePath || filePath === "") {
        return {
            contents: "// Welcome to Miller!",
            fileLocation: "/",
        };
    }
    const apiClient = await getAnonymousApiInstance(CourseFilesApi, apiOptions.apiBase, apiOptions.fetchApi);
    return await apiClient.openCourseFilesControllerGetMarkdownFileAsHtml({
        courseName: courseKey,
        markdownB64Path: filePath,
    });
};
export default function useGetMarkdownContent(courseKey, filePath, enabled, apiOptions) {
    return useQuery([wellKnownQueries.getCourseMarkdownContent, courseKey, filePath], () => apiCall(courseKey, filePath, apiOptions), { refetchOnWindowFocus: false, enabled });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlR2V0TWFya2Rvd25Db250ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvdXJzZXMvdXNlR2V0TWFya2Rvd25Db250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxnQkFBZ0IsTUFBTSx1QkFBdUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV6RSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUN4QixTQUFpQixFQUNqQixRQUFnQixFQUNoQixVQUFzQixFQUNGLEVBQUU7SUFDdEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLEtBQUssRUFBRSxFQUFFO1FBQzlCLE9BQU87WUFDSCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFlBQVksRUFBRSxHQUFHO1NBQ0wsQ0FBQztLQUNwQjtJQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sdUJBQXVCLENBQzNDLGNBQWMsRUFDZCxVQUFVLENBQUMsT0FBTyxFQUNsQixVQUFVLENBQUMsUUFBUSxDQUN0QixDQUFDO0lBQ0YsT0FBTyxNQUFNLFNBQVMsQ0FBQyw4Q0FBOEMsQ0FBQztRQUNsRSxVQUFVLEVBQUUsU0FBUztRQUNyQixlQUFlLEVBQUUsUUFBUTtLQUM1QixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLHFCQUFxQixDQUN6QyxTQUFpQixFQUNqQixRQUFnQixFQUNoQixPQUFnQixFQUNoQixVQUFzQjtJQUV0QixPQUFPLFFBQVEsQ0FDWCxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFDaEUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQzlDLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUMzQyxDQUFDO0FBQ04sQ0FBQyJ9