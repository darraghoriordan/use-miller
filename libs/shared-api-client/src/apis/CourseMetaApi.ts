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


import * as runtime from '../runtime';
import {
    CourseMetaDto,
    CourseMetaDtoFromJSON,
    CourseMetaDtoToJSON,
} from '../models';

/**
 * CourseMetaApi - interface
 * 
 * @export
 * @interface CourseMetaApiInterface
 */
export interface CourseMetaApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CourseMetaApiInterface
     */
    courseMetaControllerListAllCoursesRaw(): Promise<runtime.ApiResponse<Array<CourseMetaDto>>>;

    /**
     */
    courseMetaControllerListAllCourses(): Promise<Array<CourseMetaDto>>;

}

/**
 * 
 */
export class CourseMetaApi extends runtime.BaseAPI implements CourseMetaApiInterface {

    /**
     */
    async courseMetaControllerListAllCoursesRaw(): Promise<runtime.ApiResponse<Array<CourseMetaDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/course-meta`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CourseMetaDtoFromJSON));
    }

    /**
     */
    async courseMetaControllerListAllCourses(): Promise<Array<CourseMetaDto>> {
        const response = await this.courseMetaControllerListAllCoursesRaw();
        return await response.value();
    }

}
