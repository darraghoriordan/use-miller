import wellKnownQueries from "./wellKnownQueries";
import {
    OrganisationSubscriptionRecord,
    OrganisationSubscriptionsApi,
} from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>,
    organisationId: number
): Promise<OrganisationSubscriptionRecord[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        OrganisationSubscriptionsApi,
        apiBase,
        getAccessTokenSilently
    );

    return await apiClient.organisationSubscriptionsControllerFindAll({
        orgId: organisationId,
    });
};

export default function useGetSubscriptions(
    organisationId: number,
    enabled: boolean = true
) {
    const { getAccessTokenSilently } = useAuth0();
    return useQuery(
        [wellKnownQueries.getSubscriptions],
        () => apiCall(getAccessTokenSilently, organisationId),
        { refetchOnWindowFocus: false, enabled }
    );
}
