import {
    PaymentsApi,
    StripeCheckoutSessionRequestDto,
    StripeCheckoutSessionResponseDto,
} from "@use-miller/shared-api-client";
import { useMutation } from "@tanstack/react-query";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories.js";

export async function getStripeCheckoutLink(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("called BE next api");
    try {
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
        console.log("calling BE BE api!");
        const data =
            await apiClient.stripeCheckoutControllerCreateCheckoutSession({
                stripeCheckoutSessionRequestDto: requestBody,
            });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");
        res.end(JSON.stringify(data));
    } catch (error) {
        res.json(error);
        res.status(500).end();
    }
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
