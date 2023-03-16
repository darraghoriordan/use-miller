import { CourseFilesApi, } from "@use-miller/shared-api-client";
import { useQuery } from "@tanstack/react-query";
import { getAnonymousApiInstance } from "../api/apiInstanceFactories.js";
import wellKnownQueries from "./wellKnownQueries.js";
export const apiCall = async (courseKey, apiOptions) => {
    const apiClient = await getAnonymousApiInstance(CourseFilesApi, apiOptions.apiBase, apiOptions.fetchApi);
    return await apiClient.courseFilesControllerListCourseFiles({
        courseName: courseKey,
    });
};
export default function useGetFiles(courseKey, enabled = true, apiOptions) {
    return useQuery([wellKnownQueries.getCourseFiles, courseKey], () => apiCall(courseKey, apiOptions), { refetchOnWindowFocus: false, enabled });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlR2V0RmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY291cnNlcy91c2VHZXRGaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsY0FBYyxHQUVqQixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RSxPQUFPLGdCQUFnQixNQUFNLHVCQUF1QixDQUFDO0FBRXJELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQ3hCLFNBQWlCLEVBQ2pCLFVBQXNCLEVBQ0csRUFBRTtJQUMzQixNQUFNLFNBQVMsR0FBRyxNQUFNLHVCQUF1QixDQUMzQyxjQUFjLEVBQ2QsVUFBVSxDQUFDLE9BQU8sRUFDbEIsVUFBVSxDQUFDLFFBQVEsQ0FDdEIsQ0FBQztJQUVGLE9BQU8sTUFBTSxTQUFTLENBQUMsb0NBQW9DLENBQUM7UUFDeEQsVUFBVSxFQUFFLFNBQVM7S0FDeEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLFNBQWlCLEVBQ2pCLFVBQW1CLElBQUksRUFDdkIsVUFBc0I7SUFFdEIsT0FBTyxRQUFRLENBQ1gsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLEVBQzVDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQ3BDLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUMzQyxDQUFDO0FBQ04sQ0FBQyJ9