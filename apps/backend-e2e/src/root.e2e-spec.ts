/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import request from "supertest";
import { AuthenticatedRequests } from "./commonDataModels/AuthenticatedRequests";
import { WellKnownUrls } from "./commonDataModels/WellKnownUrls";

describe("When using a valid token", () => {
  it("unsecure endpoints are reachable", async () => {
    return request(process.env.TEST_API_URL)
      .get(WellKnownUrls.authorize())
      .set("content-type", "application/json")
      .expect(401);
  });

  it("the auth guard secures endpoints as expected", async () => {
    return await AuthenticatedRequests.getRequestAuthenticated(
      WellKnownUrls.authorize()
    ).expect(200);
  });
});
