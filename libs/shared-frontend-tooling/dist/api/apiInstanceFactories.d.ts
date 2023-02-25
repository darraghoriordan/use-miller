import { BaseAPI, Configuration } from "@use-miller/shared-api-client";
export declare const getAuthenticatedApiInstance: <T extends BaseAPI>(apiService: new (apiConfig: Configuration) => T, apiBase: string, getAccessTokenSilently: () => Promise<string>) => Promise<T>;
export declare const getAnonymousApiInstance: <T extends BaseAPI>(apiService: new (apiConfig: Configuration) => T, apiBase: string) => T;
