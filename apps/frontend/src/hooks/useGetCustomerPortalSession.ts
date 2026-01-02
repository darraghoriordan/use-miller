import type { components } from "../shared/types/api-specs";
import { useMutation } from "@tanstack/react-query";

type StripeCustomerPortalRequestDto =
    components["schemas"]["StripeCustomerPortalRequestDto"];
type StripeCustomerPortalResponseDto =
    components["schemas"]["StripeCustomerPortalResponseDto"];

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
