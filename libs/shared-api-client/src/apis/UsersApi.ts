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
    BooleanResult,
    BooleanResultFromJSON,
    BooleanResultToJSON,
    UserDto,
    UserDtoFromJSON,
    UserDtoToJSON,
} from '../models';

export interface UserControllerFindOneRequest {
    uuid: string;
}

export interface UserControllerRemoveRequest {
    uuid: string;
}

export interface UserControllerUpdateRequest {
    uuid: string;
    body: object;
}

/**
 * UsersApi - interface
 * 
 * @export
 * @interface UsersApiInterface
 */
export interface UsersApiInterface {
    /**
     * 
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    userControllerFindOneRaw(requestParameters: UserControllerFindOneRequest): Promise<runtime.ApiResponse<UserDto>>;

    /**
     */
    userControllerFindOne(requestParameters: UserControllerFindOneRequest): Promise<UserDto>;

    /**
     * Limited to Super Admin role or the user themselves.
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    userControllerRemoveRaw(requestParameters: UserControllerRemoveRequest): Promise<runtime.ApiResponse<BooleanResult>>;

    /**
     * Limited to Super Admin role or the user themselves.
     */
    userControllerRemove(requestParameters: UserControllerRemoveRequest): Promise<BooleanResult>;

    /**
     * Limited to Super Admin role or the user themselves.
     * @param {string} uuid 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    userControllerUpdateRaw(requestParameters: UserControllerUpdateRequest): Promise<runtime.ApiResponse<BooleanResult>>;

    /**
     * Limited to Super Admin role or the user themselves.
     */
    userControllerUpdate(requestParameters: UserControllerUpdateRequest): Promise<BooleanResult>;

}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI implements UsersApiInterface {

    /**
     */
    async userControllerFindOneRaw(requestParameters: UserControllerFindOneRequest): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling userControllerFindOne.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/user/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     */
    async userControllerFindOne(requestParameters: UserControllerFindOneRequest): Promise<UserDto> {
        const response = await this.userControllerFindOneRaw(requestParameters);
        return await response.value();
    }

    /**
     * Limited to Super Admin role or the user themselves.
     */
    async userControllerRemoveRaw(requestParameters: UserControllerRemoveRequest): Promise<runtime.ApiResponse<BooleanResult>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling userControllerRemove.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/user/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BooleanResultFromJSON(jsonValue));
    }

    /**
     * Limited to Super Admin role or the user themselves.
     */
    async userControllerRemove(requestParameters: UserControllerRemoveRequest): Promise<BooleanResult> {
        const response = await this.userControllerRemoveRaw(requestParameters);
        return await response.value();
    }

    /**
     * Limited to Super Admin role or the user themselves.
     */
    async userControllerUpdateRaw(requestParameters: UserControllerUpdateRequest): Promise<runtime.ApiResponse<BooleanResult>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling userControllerUpdate.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling userControllerUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/user/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BooleanResultFromJSON(jsonValue));
    }

    /**
     * Limited to Super Admin role or the user themselves.
     */
    async userControllerUpdate(requestParameters: UserControllerUpdateRequest): Promise<BooleanResult> {
        const response = await this.userControllerUpdateRaw(requestParameters);
        return await response.value();
    }

}
