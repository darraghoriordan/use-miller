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
    // need a path here for the anonymous user
    const apiClient = await getAnonymousApiInstance(CourseFilesApi, apiOptions.apiBase, apiOptions.fetchApi);
    return await apiClient.openCourseFilesControllerGetFile({
        courseName: courseKey,
        b64Path: filePath,
    });
};
export default function useGetFileContent(courseKey, filePath, enabled, apiOptions) {
    return useQuery([wellKnownQueries.getCourseFileContent, courseKey, filePath], () => apiCall(courseKey, filePath, apiOptions), { refetchOnWindowFocus: false, enabled });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlR2V0RmlsZUNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY291cnNlcy91c2VHZXRGaWxlQ29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2pELE9BQU8sZ0JBQWdCLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFekUsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFDeEIsU0FBaUIsRUFDakIsUUFBZ0IsRUFDaEIsVUFBc0IsRUFDRixFQUFFO0lBQ3RCLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxLQUFLLEVBQUUsRUFBRTtRQUM5QixPQUFPO1lBQ0gsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxZQUFZLEVBQUUsR0FBRztTQUNMLENBQUM7S0FDcEI7SUFDRCwwQ0FBMEM7SUFFMUMsTUFBTSxTQUFTLEdBQUcsTUFBTSx1QkFBdUIsQ0FDM0MsY0FBYyxFQUNkLFVBQVUsQ0FBQyxPQUFPLEVBQ2xCLFVBQVUsQ0FBQyxRQUFRLENBQ3RCLENBQUM7SUFDRixPQUFPLE1BQU0sU0FBUyxDQUFDLGdDQUFnQyxDQUFDO1FBQ3BELFVBQVUsRUFBRSxTQUFTO1FBQ3JCLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQ3JDLFNBQWlCLEVBQ2pCLFFBQWdCLEVBQ2hCLE9BQWdCLEVBQ2hCLFVBQXNCO0lBRXRCLE9BQU8sUUFBUSxDQUNYLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxFQUM1RCxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFDOUMsRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQzNDLENBQUM7QUFDTixDQUFDIn0=