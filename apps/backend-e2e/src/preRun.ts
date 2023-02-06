import dotenv from "dotenv";
import { AuthenticatedRequests } from "./miller-tests/commonDataModels/AuthenticatedRequests";
dotenv.config();
// This is a hack for tests
import { TextEncoder, TextDecoder } from "util";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.TextDecoder = TextDecoder as any;
// End of hack

// loads our auth token once into the static class we use to build requests
await AuthenticatedRequests.setToken();
console.log("Using token", AuthenticatedRequests.validToken);
export {};
