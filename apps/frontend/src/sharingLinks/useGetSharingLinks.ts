import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { SharingLink, SharingLinksApi } from "@use-miller/shared-api-client";

import wellKnownQueries from "./wellKnownQueries";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

const getGetSharingLinks = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<SharingLink[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        SharingLinksApi,
        getAccessTokenSilently
    );

    return apiClient.sharingLinksControllerGetAll();
};

export default function useSharingLinks() {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery(wellKnownQueries.sharingLinksGetAll, () =>
        getGetSharingLinks(getAccessTokenSilently)
    );
}
