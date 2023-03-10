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
 * @interface CourseMetaDto
 */
export interface CourseMetaDto {
    /**
     * 
     * @type {string}
     * @memberof CourseMetaDto
     */
    key: string;
    /**
     * 
     * @type {string}
     * @memberof CourseMetaDto
     */
    rootNodeName: string;
    /**
     * 
     * @type {string}
     * @memberof CourseMetaDto
     */
    rootLocation: string;
    /**
     * 
     * @type {string}
     * @memberof CourseMetaDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CourseMetaDto
     */
    color: string;
}

export function CourseMetaDtoFromJSON(json: any): CourseMetaDto {
    return CourseMetaDtoFromJSONTyped(json, false);
}

export function CourseMetaDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseMetaDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': json['key'],
        'rootNodeName': json['rootNodeName'],
        'rootLocation': json['rootLocation'],
        'name': json['name'],
        'color': json['color'],
    };
}

export function CourseMetaDtoToJSON(value?: CourseMetaDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
        'rootNodeName': value.rootNodeName,
        'rootLocation': value.rootLocation,
        'name': value.name,
        'color': value.color,
    };
}

