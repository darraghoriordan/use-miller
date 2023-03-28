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
 * @interface OrgGithubUserDto
 */
export interface OrgGithubUserDto {
    /**
     * 
     * @type {string}
     * @memberof OrgGithubUserDto
     */
    ghUsername: string;
    /**
     * 
     * @type {string}
     * @memberof OrgGithubUserDto
     */
    orgUuid: string;
}

export function OrgGithubUserDtoFromJSON(json: any): OrgGithubUserDto {
    return OrgGithubUserDtoFromJSONTyped(json, false);
}

export function OrgGithubUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrgGithubUserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ghUsername': json['ghUsername'],
        'orgUuid': json['orgUuid'],
    };
}

export function OrgGithubUserDtoToJSON(value?: OrgGithubUserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ghUsername': value.ghUsername,
        'orgUuid': value.orgUuid,
    };
}


