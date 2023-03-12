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
    UserApiKey,
    UserApiKeyFromJSON,
    UserApiKeyFromJSONTyped,
    UserApiKeyToJSON,
} from './';

/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {number}
     * @memberof User
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    uuid: string;
    /**
     * 
     * @type {boolean}
     * @memberof User
     */
    emailVerified: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof User
     */
    blocked: boolean;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    familyName?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    givenName?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    picture?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    auth0UserId?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    username?: string;
    /**
     * 
     * @type {Array<OrganisationMembership>}
     * @memberof User
     */
    memberships: Array<OrganisationMembership>;
    /**
     * 
     * @type {Array<UserApiKey>}
     * @memberof User
     */
    apiKeys: Array<UserApiKey>;
    /**
     * 
     * @type {Date}
     * @memberof User
     */
    createdDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof User
     */
    updateDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof User
     */
    deletedDate: Date;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
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
        'apiKeys': ((json['apiKeys'] as Array<any>).map(UserApiKeyFromJSON)),
        'createdDate': (new Date(json['createdDate'])),
        'updateDate': (new Date(json['updateDate'])),
        'deletedDate': (new Date(json['deletedDate'])),
    };
}

export function UserToJSON(value?: User | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
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
        'apiKeys': ((value.apiKeys as Array<any>).map(UserApiKeyToJSON)),
        'createdDate': (value.createdDate.toISOString()),
        'updateDate': (value.updateDate.toISOString()),
        'deletedDate': (value.deletedDate.toISOString()),
    };
}


