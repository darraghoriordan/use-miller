import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import {
    ReceivedRolesApi,
    SubmittedOffer,
} from "@use-miller/shared-api-client";
import wellKnownQueries from "./wellKnownQueries";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<SubmittedOffer[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        ReceivedRolesApi,
        getAccessTokenSilently
    );

    return apiClient.receivedOffersControllerGetAll();
};

export default function useGetReceivedOffers() {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery(
        wellKnownQueries.receivedOffersGetAll,
        () => apiCall(getAccessTokenSilently),
        { refetchOnWindowFocus: false }
    );
}
