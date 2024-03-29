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
import {
    OrganisationSubscriptionRecord,
    OrganisationSubscriptionRecordFromJSON,
    OrganisationSubscriptionRecordFromJSONTyped,
    OrganisationSubscriptionRecordToJSON,
} from './';

/**
 * 
 * @export
 * @interface Organisation
 */
export interface Organisation {
    /**
     * 
     * @type {number}
     * @memberof Organisation
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof Organisation
     */
    uuid: string;
    /**
     * 
     * @type {Array<OrganisationSubscriptionRecord>}
     * @memberof Organisation
     */
    subscriptionRecords?: Array<OrganisationSubscriptionRecord>;
    /**
     * 
     * @type {string}
     * @memberof Organisation
     */
    name: string;
    /**
     * 
     * @type {Date}
     * @memberof Organisation
     */
    createdDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof Organisation
     */
    updateDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof Organisation
     */
    deletedDate?: Date;
}

export function OrganisationFromJSON(json: any): Organisation {
    return OrganisationFromJSONTyped(json, false);
}

export function OrganisationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Organisation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'uuid': json['uuid'],
        'subscriptionRecords': !exists(json, 'subscriptionRecords') ? undefined : ((json['subscriptionRecords'] as Array<any>).map(OrganisationSubscriptionRecordFromJSON)),
        'name': json['name'],
        'createdDate': (new Date(json['createdDate'])),
        'updateDate': (new Date(json['updateDate'])),
        'deletedDate': !exists(json, 'deletedDate') ? undefined : (new Date(json['deletedDate'])),
    };
}

export function OrganisationToJSON(value?: Organisation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'uuid': value.uuid,
        'subscriptionRecords': value.subscriptionRecords === undefined ? undefined : ((value.subscriptionRecords as Array<any>).map(OrganisationSubscriptionRecordToJSON)),
        'name': value.name,
        'createdDate': (value.createdDate.toISOString()),
        'updateDate': (value.updateDate.toISOString()),
        'deletedDate': value.deletedDate === undefined ? undefined : (value.deletedDate.toISOString()),
    };
}


