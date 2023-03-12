import { runPnpmInstall } from "./setup-helpers.mjs";

describe("when running the init scripts", () => {
    it("can call pnpm in the root", async () => {
        const result = await runPnpmInstall("./", ["-recursive"]);
        expect(result).toBeTruthy();
    });
});
