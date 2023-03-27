import { registerAs } from "@nestjs/config";

export default registerAs("github-client", () => ({
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
}));
