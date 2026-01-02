import type { components } from "../shared/types/api-specs";
type StripeCheckoutSessionRequestDto =
    components["schemas"]["StripeCheckoutSessionRequestDto"];
type StripeCheckoutSessionResponseDto =
    components["schemas"]["StripeCheckoutSessionResponseDto"];
import { useMutation } from "@tanstack/react-query";

export function useGetPaymentLink() {
    return useMutation({
        mutationKey: ["getCheckoutSession"],
        mutationFn: async (
            variables: StripeCheckoutSessionRequestDto,
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
        },
    });
}
