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

// for (const key of Object.keys(TestUserAccounts)) {
//     console.log(
//         `Using ${key} token: \r%s\r\r`,
//         AuthenticationTokenManager.getAccessToken(
//             TestUserAccounts[key as keyof typeof TestUserAccounts]
//         )
//     );
// }

export {};
