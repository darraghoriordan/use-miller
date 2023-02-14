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
 * @interface BooleanResult
 */
export interface BooleanResult {
    /**
     * 
     * @type {boolean}
     * @memberof BooleanResult
     */
    result: boolean;
}

export function BooleanResultFromJSON(json: any): BooleanResult {
    return BooleanResultFromJSONTyped(json, false);
}

export function BooleanResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): BooleanResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'result': json['result'],
    };
}

export function BooleanResultToJSON(value?: BooleanResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'result': value.result,
    };
}


