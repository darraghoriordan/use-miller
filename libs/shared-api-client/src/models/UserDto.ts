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
    OrganisationMembership,
    OrganisationMembershipFromJSON,
    OrganisationMembershipFromJSONTyped,
    OrganisationMembershipToJSON,
} from './';

/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * Is the user a super user. Only set if the user is the current user. Will not be set for list responses.
     * @type {boolean}
     * @memberof UserDto
     */
    isSuper?: boolean;
    /**
     * 
     * @type {number}
     * @memberof UserDto
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    uuid: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserDto
     */
    emailVerified: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserDto
     */
    blocked: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    familyName?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    givenName?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    picture?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    auth0UserId?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    username?: string;
    /**
     * 
     * @type {Array<OrganisationMembership>}
     * @memberof UserDto
     */
    memberships: Array<OrganisationMembership>;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserDto
     */
    activeSubscriptionProductKeys: Array<string>;
    /**
     * 
     * @type {Date}
     * @memberof UserDto
     */
    createdDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof UserDto
     */
    updateDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof UserDto
     */
    deletedDate?: Date;
}

export function UserDtoFromJSON(json: any): UserDto {
    return UserDtoFromJSONTyped(json, false);
}

export function UserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isSuper': !exists(json, 'isSuper') ? undefined : json['isSuper'],
        'id': json['id'],
        'email': json['email'],
        'uuid': json['uuid'],
        'emailVerified': json['emailVerified'],
        'blocked': json['blocked'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'familyName': !exists(json, 'familyName') ? undefined : json['familyName'],
        'givenName': !exists(json, 'givenName') ? undefined : json['givenName'],
        'picture': !exists(json, 'picture') ? undefined : json['picture'],
        'auth0UserId': !exists(json, 'auth0UserId') ? undefined : json['auth0UserId'],
        'username': !exists(json, 'username') ? undefined : json['username'],
        'memberships': ((json['memberships'] as Array<any>).map(OrganisationMembershipFromJSON)),
        'activeSubscriptionProductKeys': json['activeSubscriptionProductKeys'],
        'createdDate': (new Date(json['createdDate'])),
        'updateDate': (new Date(json['updateDate'])),
        'deletedDate': !exists(json, 'deletedDate') ? undefined : (new Date(json['deletedDate'])),
    };
}

export function UserDtoToJSON(value?: UserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'isSuper': value.isSuper,
        'id': value.id,
        'email': value.email,
        'uuid': value.uuid,
        'emailVerified': value.emailVerified,
        'blocked': value.blocked,
        'name': value.name,
        'familyName': value.familyName,
        'givenName': value.givenName,
        'picture': value.picture,
        'auth0UserId': value.auth0UserId,
        'username': value.username,
        'memberships': ((value.memberships as Array<any>).map(OrganisationMembershipToJSON)),
        'activeSubscriptionProductKeys': value.activeSubscriptionProductKeys,
        'createdDate': (value.createdDate.toISOString()),
        'updateDate': (value.updateDate.toISOString()),
        'deletedDate': value.deletedDate === undefined ? undefined : (value.deletedDate.toISOString()),
    };
}


