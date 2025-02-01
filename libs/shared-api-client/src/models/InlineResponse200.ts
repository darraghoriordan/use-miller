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
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse200
     */
    status?: string;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: object; }; }}
     * @memberof InlineResponse200
     */
    info?: { [key: string]: { [key: string]: object; }; } | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: object; }; }}
     * @memberof InlineResponse200
     */
    error?: { [key: string]: { [key: string]: object; }; } | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: object; }; }}
     * @memberof InlineResponse200
     */
    details?: { [key: string]: { [key: string]: object; }; };
}

export function InlineResponse200FromJSON(json: any): InlineResponse200 {
    return InlineResponse200FromJSONTyped(json, false);
}

export function InlineResponse200FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': !exists(json, 'status') ? undefined : json['status'],
        'info': !exists(json, 'info') ? undefined : json['info'],
        'error': !exists(json, 'error') ? undefined : json['error'],
        'details': !exists(json, 'details') ? undefined : json['details'],
    };
}

export function InlineResponse200ToJSON(value?: InlineResponse200 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
        'info': value.info,
        'error': value.error,
        'details': value.details,
    };
}


