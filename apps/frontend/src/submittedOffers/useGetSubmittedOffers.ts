import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import {
    SubmittedOffer,
    SubmittedRolesApi,
} from "@use-miller/shared-api-client";
import wellKnownQueries from "./wellKnownQueries";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<SubmittedOffer[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        SubmittedRolesApi,
        getAccessTokenSilently
    );

    return apiClient.submittedOffersControllerGetAll();
};

export default function useGetSubmittedOffers() {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery(wellKnownQueries.submittedOffersGetAll, () =>
        apiCall(getAccessTokenSilently)
    );
}
