import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { SharingLink, SharingLinksApi } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

import wellKnownQueries from "./wellKnownQueries";

const getLatestSharingLink = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<SharingLink> => {
    const apiClient = await getAuthenticatedApiInstance(
        SharingLinksApi,
        getAccessTokenSilently
    );

    return apiClient.sharingLinksControllerGetLatest();
};

export default function useGetLatestSharingLink() {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery(wellKnownQueries.sharingLinksGetLatest, () =>
        getLatestSharingLink(getAccessTokenSilently)
    );
}
