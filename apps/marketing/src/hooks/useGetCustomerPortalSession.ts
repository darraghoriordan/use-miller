import {
    PaymentsApi,
    StripeCustomerPortalRequestDto,
    StripeCustomerPortalResponseDto,
} from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

// there is a bit of misdirection here so we can use the
// access token. We call the next api which in turn calls the
// backend api 🤷‍♂️
export async function getStripeCustomerPortalLink(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const requestBody = req.body as StripeCustomerPortalRequestDto;
    const atResponse = await getAccessToken(req, res, {
        scopes: ["openid", "email", "profile", "offline_access"],
    });
    const apiClient = await getAuthenticatedApiInstance(
        PaymentsApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH!,
        atResponse.accessToken!,
        fetch
    );

    return await apiClient.stripeCustomerPortalControllerCreateCustomerPortalSession(
        {
            stripeCustomerPortalRequestDto: requestBody,
        }
    );
}

export function useGetCustomerPortalSession() {
    return useMutation(
        ["getCustomerPortalSession"],
        async (
            variables: StripeCustomerPortalRequestDto
        ): Promise<StripeCustomerPortalResponseDto> => {
            const response = await fetch("/api/stripe/customer-portal-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(variables),
            });
            const result =
                (await response.json()) as StripeCustomerPortalResponseDto;
            return result;
        }
    );
}
