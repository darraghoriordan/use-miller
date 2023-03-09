import wellKnownQueries from "./wellKnownQueries";
import { CourseMetaApi } from "@use-miller/shared-api-client";
import { useQuery } from "@tanstack/react-query";
import { getAnonymousApiInstance } from "../api/apiInstanceFactories.js";
export const getAllCourses = async ({ apiBase, fetchApi, }) => {
    const apiClient = await getAnonymousApiInstance(CourseMetaApi, apiBase, fetchApi);
    return await apiClient.courseMetaControllerListAllCourses();
};
export default function useGetAllCourses(options) {
    return useQuery([wellKnownQueries.getAllCourses], () => getAllCourses(options), {
        refetchOnWindowFocus: false,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlR2V0QWxsQ291cnNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3Vyc2VzL3VzZUdldEFsbENvdXJzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFpQixNQUFNLCtCQUErQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV6RSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLEVBQ2hDLE9BQU8sRUFDUCxRQUFRLEdBQ0MsRUFBNEIsRUFBRTtJQUN2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLHVCQUF1QixDQUMzQyxhQUFhLEVBQ2IsT0FBTyxFQUNQLFFBQVEsQ0FDWCxDQUFDO0lBQ0YsT0FBTyxNQUFNLFNBQVMsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO0FBQ2hFLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsT0FBbUI7SUFDeEQsT0FBTyxRQUFRLENBQ1gsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFDaEMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUM1QjtRQUNJLG9CQUFvQixFQUFFLEtBQUs7S0FDOUIsQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9