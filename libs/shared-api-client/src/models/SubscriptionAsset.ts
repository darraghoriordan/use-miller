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
 * @interface SubscriptionAsset
 */
export interface SubscriptionAsset {
    /**
     * 
     * @type {number}
     * @memberof SubscriptionAsset
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof SubscriptionAsset
     */
    internalSku: string;
    /**
     * 
     * @type {string}
     * @memberof SubscriptionAsset
     */
    uri: string;
    /**
     * 
     * @type {string}
     * @memberof SubscriptionAsset
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof SubscriptionAsset
     */
    displayName: string;
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionAsset
     */
    createdDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionAsset
     */
    updateDate: Date;
}

export function SubscriptionAssetFromJSON(json: any): SubscriptionAsset {
    return SubscriptionAssetFromJSONTyped(json, false);
}

export function SubscriptionAssetFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubscriptionAsset {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'internalSku': json['internalSku'],
        'uri': json['uri'],
        'description': json['description'],
        'displayName': json['displayName'],
        'createdDate': (new Date(json['createdDate'])),
        'updateDate': (new Date(json['updateDate'])),
    };
}

export function SubscriptionAssetToJSON(value?: SubscriptionAsset | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'internalSku': value.internalSku,
        'uri': value.uri,
        'description': value.description,
        'displayName': value.displayName,
        'createdDate': (value.createdDate.toISOString()),
        'updateDate': (value.updateDate.toISOString()),
    };
}


