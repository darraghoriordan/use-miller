import wellKnownQueries from "./wellKnownQueries";
import {
    PaymentsApi,
    StripeCustomerPortalRequestDto,
    StripeCustomerPortalResponseDto,
} from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useMutation } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>,
    model: StripeCustomerPortalRequestDto
): Promise<StripeCustomerPortalResponseDto> => {
    const apiClient = await getAuthenticatedApiInstance(
        PaymentsApi,
        apiBase,
        getAccessTokenSilently
    );

    return await apiClient.stripeCustomerPortalControllerCreateCustomerPortalSession(
        {
            stripeCustomerPortalRequestDto: model,
        }
    );
};

export default function useGetCustomerPortalSession() {
    const { getAccessTokenSilently } = useAuth0();
    return useMutation(
        [wellKnownQueries.getCustomerPortalSession],
        async (
            variables: StripeCustomerPortalRequestDto
        ): Promise<StripeCustomerPortalResponseDto> =>
            apiCall(getAccessTokenSilently, variables)
    );
}
