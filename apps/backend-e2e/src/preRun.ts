import dotenv from "dotenv";
import {
    AuthenticationTokenManager,
    TestUserAccounts,
} from "./commonDataModels/AuthenticationTokenManager";
dotenv.config();
// This is a hack for tests
import { TextEncoder, TextDecoder } from "util";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import { ApplicationSupportApi } from "@use-miller/shared-api-client";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.TextDecoder = TextDecoder as any;
// End of hack

// loads our auth token once into the static class we use to build requests
await AuthenticationTokenManager.init();

// resets the database to a known state
const superUserAppSupportApi = ApiClientFactory.getAuthenticatedApiInstance(
    ApplicationSupportApi,
    TestUserAccounts.SUPER_USER
);

await superUserAppSupportApi.superPowersControllerResetDatabase();

export {};
