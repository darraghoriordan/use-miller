/* tslint:disable */
/* eslint-disable */
/**
 * Use Miller BE
 * Describes the backend api
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    StripeCheckoutSessionRequestDto,
    StripeCheckoutSessionRequestDtoFromJSON,
    StripeCheckoutSessionRequestDtoToJSON,
    StripeCheckoutSessionResponseDto,
    StripeCheckoutSessionResponseDtoFromJSON,
    StripeCheckoutSessionResponseDtoToJSON,
} from '../models';

export interface StripeCheckoutControllerCreateCheckoutSessionRequest {
    stripeCheckoutSessionRequestDto: StripeCheckoutSessionRequestDto;
}

/**
 * PaymentsApi - interface
 * 
 * @export
 * @interface PaymentsApiInterface
 */
export interface PaymentsApiInterface {
    /**
     * 
     * @param {StripeCheckoutSessionRequestDto} stripeCheckoutSessionRequestDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiInterface
     */
    stripeCheckoutControllerCreateCheckoutSessionRaw(requestParameters: StripeCheckoutControllerCreateCheckoutSessionRequest): Promise<runtime.ApiResponse<StripeCheckoutSessionResponseDto>>;

    /**
     */
    stripeCheckoutControllerCreateCheckoutSession(requestParameters: StripeCheckoutControllerCreateCheckoutSessionRequest): Promise<StripeCheckoutSessionResponseDto>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiInterface
     */
    stripeCustomerPortalControllerCreateCustomerPortalSessionRaw(): Promise<runtime.ApiResponse<object>>;

    /**
     */
    stripeCustomerPortalControllerCreateCustomerPortalSession(): Promise<object>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiInterface
     */
    stripeWebhookControllerWebhookReceiverRaw(): Promise<runtime.ApiResponse<void>>;

    /**
     */
    stripeWebhookControllerWebhookReceiver(): Promise<void>;

}

/**
 * 
 */
export class PaymentsApi extends runtime.BaseAPI implements PaymentsApiInterface {

    /**
     */
    async stripeCheckoutControllerCreateCheckoutSessionRaw(requestParameters: StripeCheckoutControllerCreateCheckoutSessionRequest): Promise<runtime.ApiResponse<StripeCheckoutSessionResponseDto>> {
        if (requestParameters.stripeCheckoutSessionRequestDto === null || requestParameters.stripeCheckoutSessionRequestDto === undefined) {
            throw new runtime.RequiredError('stripeCheckoutSessionRequestDto','Required parameter requestParameters.stripeCheckoutSessionRequestDto was null or undefined when calling stripeCheckoutControllerCreateCheckoutSession.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/payments/stripe/checkout-session`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: StripeCheckoutSessionRequestDtoToJSON(requestParameters.stripeCheckoutSessionRequestDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => StripeCheckoutSessionResponseDtoFromJSON(jsonValue));
    }

    /**
     */
    async stripeCheckoutControllerCreateCheckoutSession(requestParameters: StripeCheckoutControllerCreateCheckoutSessionRequest): Promise<StripeCheckoutSessionResponseDto> {
        const response = await this.stripeCheckoutControllerCreateCheckoutSessionRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async stripeCustomerPortalControllerCreateCustomerPortalSessionRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/payments/stripe/customer-portal-session`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async stripeCustomerPortalControllerCreateCustomerPortalSession(): Promise<object> {
        const response = await this.stripeCustomerPortalControllerCreateCustomerPortalSessionRaw();
        return await response.value();
    }

    /**
     */
    async stripeWebhookControllerWebhookReceiverRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/payments/stripe/webhook-receiver`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async stripeWebhookControllerWebhookReceiver(): Promise<void> {
        await this.stripeWebhookControllerWebhookReceiverRaw();
    }

}
