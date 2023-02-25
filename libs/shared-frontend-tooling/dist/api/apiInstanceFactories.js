import { Configuration } from "@use-miller/shared-api-client";
export const getAuthenticatedApiInstance = async (apiService, apiBase, getAccessTokenSilently) => {
    const authToken = await getAccessTokenSilently();
    const apiConfig = new Configuration({
        basePath: apiBase,
        accessToken: authToken,
    });
    return new apiService(apiConfig);
};
export const getAnonymousApiInstance = (apiService, apiBase) => {
    const apiConfig = new Configuration({
        basePath: apiBase,
    });
    return new apiService(apiConfig);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpSW5zdGFuY2VGYWN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2FwaUluc3RhbmNlRmFjdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBVyxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV2RSxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxLQUFLLEVBQzVDLFVBRUMsRUFDRCxPQUFlLEVBQ2Ysc0JBQTZDLEVBQy9DLEVBQUU7SUFDQSxNQUFNLFNBQVMsR0FBRyxNQUFNLHNCQUFzQixFQUFFLENBQUM7SUFFakQsTUFBTSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUM7UUFDaEMsUUFBUSxFQUFFLE9BQU87UUFDakIsV0FBVyxFQUFFLFNBQVM7S0FDekIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxDQUNuQyxVQUVDLEVBQ0QsT0FBZSxFQUNkLEVBQUU7SUFDSCxNQUFNLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQztRQUNoQyxRQUFRLEVBQUUsT0FBTztLQUNwQixDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyJ9