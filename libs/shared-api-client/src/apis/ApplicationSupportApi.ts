/* tslint:disable */
/* eslint-disable */
/**
 * Miller App BE
 * Describes the backend api
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";

/**
 * ApplicationSupportApi - interface
 *
 * @export
 * @interface ApplicationSupportApiInterface
 */
export interface ApplicationSupportApiInterface {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationSupportApiInterface
     */
    appControllerGetHelloRaw(): Promise<runtime.ApiResponse<string>>;

    /**
     */
    appControllerGetHello(): Promise<string>;

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationSupportApiInterface
     */
    appControllerGetHelloAuthorizedRaw(): Promise<runtime.ApiResponse<string>>;

    /**
     */
    appControllerGetHelloAuthorized(): Promise<string>;
}

/**
 *
 */
export class ApplicationSupportApi
    extends runtime.BaseAPI
    implements ApplicationSupportApiInterface
{
    /**
     */
    async appControllerGetHelloRaw(): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/`,
            method: "GET",
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async appControllerGetHello(): Promise<string> {
        const response = await this.appControllerGetHelloRaw();
        return await response.value();
    }

    /**
     */
    async appControllerGetHelloAuthorizedRaw(): Promise<
        runtime.ApiResponse<string>
    > {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString =
                typeof token === "function" ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/authorise`,
            method: "GET",
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async appControllerGetHelloAuthorized(): Promise<string> {
        const response = await this.appControllerGetHelloAuthorizedRaw();
        return await response.value();
    }
}
