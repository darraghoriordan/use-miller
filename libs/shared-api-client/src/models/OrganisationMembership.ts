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
    MembershipRole,
    MembershipRoleFromJSON,
    MembershipRoleFromJSONTyped,
    MembershipRoleToJSON,
} from './';

/**
 * 
 * @export
 * @interface OrganisationMembership
 */
export interface OrganisationMembership {
    /**
     * 
     * @type {number}
     * @memberof OrganisationMembership
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof OrganisationMembership
     */
    uuid: string;
    /**
     * 
     * @type {number}
     * @memberof OrganisationMembership
     */
    personId: number;
    /**
     * 
     * @type {number}
     * @memberof OrganisationMembership
     */
    organisationId: number;
    /**
     * 
     * @type {Array<MembershipRole>}
     * @memberof OrganisationMembership
     */
    roles: Array<MembershipRole>;
    /**
     * 
     * @type {Date}
     * @memberof OrganisationMembership
     */
    createdDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof OrganisationMembership
     */
    updateDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof OrganisationMembership
     */
    deletedDate: Date;
}

export function OrganisationMembershipFromJSON(json: any): OrganisationMembership {
    return OrganisationMembershipFromJSONTyped(json, false);
}

export function OrganisationMembershipFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrganisationMembership {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'uuid': json['uuid'],
        'personId': json['personId'],
        'organisationId': json['organisationId'],
        'roles': ((json['roles'] as Array<any>).map(MembershipRoleFromJSON)),
        'createdDate': (new Date(json['createdDate'])),
        'updateDate': (new Date(json['updateDate'])),
        'deletedDate': (new Date(json['deletedDate'])),
    };
}

export function OrganisationMembershipToJSON(value?: OrganisationMembership | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'uuid': value.uuid,
        'personId': value.personId,
        'organisationId': value.organisationId,
        'roles': ((value.roles as Array<any>).map(MembershipRoleToJSON)),
        'createdDate': (value.createdDate.toISOString()),
        'updateDate': (value.updateDate.toISOString()),
        'deletedDate': (value.deletedDate.toISOString()),
    };
}


