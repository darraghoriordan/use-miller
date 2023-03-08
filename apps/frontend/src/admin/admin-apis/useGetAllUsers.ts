import wellKnownQueries from "./wellKnownQueries";
import { UserDto, UsersApi } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<UserDto[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        UsersApi,
        apiBase,
        getAccessTokenSilently
    );

    return await apiClient.userControllerFindAll();
};

export default function useGetAllUsers() {
    const { getAccessTokenSilently } = useAuth0();
    return useQuery(
        [wellKnownQueries.getAllUsers],
        () => apiCall(getAccessTokenSilently),
        { refetchOnWindowFocus: false }
    );
}
