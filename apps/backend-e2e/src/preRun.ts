import dotenv from "dotenv";
import { AuthenticatedRequests } from "./commonDataModels/AuthenticatedRequests";
dotenv.config();
// import fetch from "node-fetch";
import { TextEncoder, TextDecoder } from "util";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.TextDecoder = TextDecoder as any;
// window = {} as any;
// window.fetch = fetch as any;
// loads our auth token into the static class we use to build requests
await AuthenticatedRequests.setToken();

export {};
