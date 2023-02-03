import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "react-query";

import { SharingLink, SharingLinksApi } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";
import wellKnownQueries from "./wellKnownQueries";

const addSharingLink = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<SharingLink> => {
    const apiClient = await getAuthenticatedApiInstance(
        SharingLinksApi,
        getAccessTokenSilently
    );

    return apiClient.sharingLinksControllerGenerateNew();
};

export default function useAddSharingLink() {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();
    return useMutation(
        wellKnownQueries.sharingLinksAddOne,
        () => addSharingLink(getAccessTokenSilently),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(
                    wellKnownQueries.sharingLinksGetAll
                );
                queryClient.invalidateQueries(
                    wellKnownQueries.sharingLinksGetLatest
                );
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );
}
