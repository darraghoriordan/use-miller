import { Configuration } from "@use-miller/shared-api-client";
export const getAuthenticatedApiInstance = async (apiService, apiBase, authToken, fetchApi) => {
    const apiConfig = new Configuration({
        basePath: apiBase,
        accessToken: authToken,
        fetchApi,
    });
    return new apiService(apiConfig);
};
export const getAnonymousApiInstance = (apiService, apiBase, fetchApi) => {
    const apiConfig = new Configuration({
        basePath: apiBase,
        fetchApi,
    });
    return new apiService(apiConfig);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpSW5zdGFuY2VGYWN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2FwaUluc3RhbmNlRmFjdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBVyxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV2RSxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxLQUFLLEVBQzVDLFVBRUMsRUFDRCxPQUFlLEVBQ2YsU0FBaUIsRUFDakIsUUFBYyxFQUNoQixFQUFFO0lBQ0EsTUFBTSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUM7UUFDaEMsUUFBUSxFQUFFLE9BQU87UUFDakIsV0FBVyxFQUFFLFNBQVM7UUFDdEIsUUFBUTtLQUNYLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsQ0FDbkMsVUFFQyxFQUNELE9BQWUsRUFDZixRQUFjLEVBQ2IsRUFBRTtJQUNILE1BQU0sU0FBUyxHQUFHLElBQUksYUFBYSxDQUFDO1FBQ2hDLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVE7S0FDWCxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyJ9