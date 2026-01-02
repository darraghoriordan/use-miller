import dotenv from "dotenv";
import {
    AuthenticationTokenManager,
    TestUserAccounts,
} from "./commonDataModels/AuthenticationTokenManager";
dotenv.config();
// This is a hack for tests
import { TextEncoder, TextDecoder } from "util";
import { getAuthenticatedApiInstance } from "./commonDataModels/ApiClientFactory";

global.TextEncoder = TextEncoder as any;

global.TextDecoder = TextDecoder as any;
// End of hack

// loads our auth token once into the static class we use to build requests
await AuthenticationTokenManager.init();

// resets the database to a known state
const superUserApi = getAuthenticatedApiInstance(TestUserAccounts.SUPER_USER);

const { error } = await superUserApi.POST("/super-powers/reset-database");
if (error) {
    console.error("Failed to reset database:", error);
    throw new Error("Failed to reset database");
}

export {};
