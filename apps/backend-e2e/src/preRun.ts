import dotenv from "dotenv";
import { AuthenticationTokenManager } from "./miller-tests/commonDataModels/AuthenticationTokenManager";
dotenv.config();
// This is a hack for tests
import { TextEncoder, TextDecoder } from "util";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.TextDecoder = TextDecoder as any;
// End of hack

// loads our auth token once into the static class we use to build requests
await AuthenticationTokenManager.init();
console.log(
    "Using basic token",
    AuthenticationTokenManager.validBasicUserToken
);
console.log(
    "Using super token",
    AuthenticationTokenManager.validSuperUserToken
);
export {};
