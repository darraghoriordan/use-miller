import wellKnownQueries from "./wellKnownQueries";
import {
    PaymentsApi,
    StripeCheckoutEvent,
} from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<StripeCheckoutEvent[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        PaymentsApi,
        apiBase,
        getAccessTokenSilently
    );

    return await apiClient.stripeEventsControllerGetLastEvents({
        skip: 0,
        take: 20,
    });
};

export default function useGetAllPaymentEvents() {
    const { getAccessTokenSilently } = useAuth0();
    return useQuery(
        [wellKnownQueries.getAllSubscriptions],
        () => apiCall(getAccessTokenSilently),
        { refetchOnWindowFocus: false }
    );
}
