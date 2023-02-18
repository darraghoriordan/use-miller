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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface StripeCustomerPortalResponseDto
 */
export interface StripeCustomerPortalResponseDto {
    /**
     * 
     * @type {string}
     * @memberof StripeCustomerPortalResponseDto
     */
    sessionUrl: string;
}

export function StripeCustomerPortalResponseDtoFromJSON(json: any): StripeCustomerPortalResponseDto {
    return StripeCustomerPortalResponseDtoFromJSONTyped(json, false);
}

export function StripeCustomerPortalResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): StripeCustomerPortalResponseDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sessionUrl': json['sessionUrl'],
    };
}

export function StripeCustomerPortalResponseDtoToJSON(value?: StripeCustomerPortalResponseDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'sessionUrl': value.sessionUrl,
    };
}


