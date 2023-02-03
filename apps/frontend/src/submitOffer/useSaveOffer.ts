import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

import {
    OfferSubmission,
    SubmittedOffer,
    SubmittedRolesApi,
} from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

import wellKnownQueries from "./wellKnownQueries";

type SaveOfferSubmissionMutationVariables = {
    model: OfferSubmission;
};
const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    model: OfferSubmission
): Promise<SubmittedOffer> => {
    const apiClient = await getAuthenticatedApiInstance(
        SubmittedRolesApi,
        getAccessTokenSilently
    );
    return apiClient.submittedOffersControllerSaveOffer({
        offerSubmission: model,
    });
};

export default function useSaveOffer() {
    const { getAccessTokenSilently } = useAuth0();

    return useMutation(
        wellKnownQueries.submitOffer,
        async (variables: SaveOfferSubmissionMutationVariables) =>
            apiRequest(getAccessTokenSilently, variables.model)
    );
}
