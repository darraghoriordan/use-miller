import {
    StripeCustomerPortalRequestDto,
    StripeCustomerPortalResponseDto,
} from "@use-miller/shared-api-client";
import { useMutation } from "@tanstack/react-query";

export function useGetCustomerPortalSession() {
    return useMutation({
        mutationKey: ["getCustomerPortalSession"],
        mutationFn: async (
            variables: StripeCustomerPortalRequestDto,
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
        },
    });
}
