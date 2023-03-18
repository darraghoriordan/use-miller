import {
    PaymentsApi,
    StripeCheckoutSessionRequestDto,
    StripeCheckoutSessionResponseDto,
} from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useMutation } from "@tanstack/react-query";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";

export async function getStripeCheckoutLink(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const requestBody = req.body as StripeCheckoutSessionRequestDto;
    const atResponse = await getAccessToken(req, res, {
        scopes: ["openid", "email", "profile", "offline_access"],
    });
    const apiClient = await getAuthenticatedApiInstance(
        PaymentsApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH!,
        atResponse.accessToken!,
        fetch
    );

    return await apiClient.stripeCheckoutControllerCreateCheckoutSession({
        stripeCheckoutSessionRequestDto: requestBody,
    });
}

export function useGetPaymentLink() {
    return useMutation(
        ["getCheckoutSession"],
        async (
            variables: StripeCheckoutSessionRequestDto
        ): Promise<StripeCheckoutSessionResponseDto> => {
            const response = await fetch("/api/stripe/checkout-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(variables),
            });
            const result =
                (await response.json()) as StripeCheckoutSessionResponseDto;
            return result;
        }
    );
}
