import { runPnpmInstall } from "./setup-helpers.js";

describe("when running the init scripts", () => {
    // had trouble with this one
    it("can call pnpm in the root", { timeout: 70000 }, async () => {
        const result = await runPnpmInstall("./", ["-recursive"]);
        expect(result).toBeTruthy();
    });
});
