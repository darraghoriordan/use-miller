import wellKnownQueries from "./wellKnownQueries";
import { Organisation, OrganisationsApi } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<Organisation[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        OrganisationsApi,
        apiBase,
        getAccessTokenSilently
    );

    return await apiClient.organisationControllerFindAllForUser();
};

export default function useGetOrgs() {
    const { getAccessTokenSilently } = useAuth0();
    return useQuery(
        [wellKnownQueries.getOrgs],
        () => apiCall(getAccessTokenSilently),
        { refetchOnWindowFocus: false }
    );
}
