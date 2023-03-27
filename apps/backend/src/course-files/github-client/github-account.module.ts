import { Module } from "@nestjs/common";
import "reflect-metadata";
import { ConfigModule } from "@nestjs/config";
import configVariables from "./GithubConfigurationVariables.js";
import { GithubClientProvider } from "./GithubClientProvider.js";
import { GithubClientConfigurationService } from "./GithubClientConfigurationService.js";
import { GithubClientService } from "./github-service.js";

@Module({
    imports: [ConfigModule.forFeature(configVariables)],
    providers: [
        GithubClientProvider,
        GithubClientConfigurationService,
        GithubClientService,
    ],
    exports: [GithubClientService],
    controllers: [],
})
export class GithubAccountModule {}
