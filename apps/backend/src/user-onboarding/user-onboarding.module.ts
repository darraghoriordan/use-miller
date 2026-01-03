import {
    CoreModule,
    OrganisationSubscriptionRecord,
    SmtpEmailClientModule,
    SubActivationQueueModule,
} from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GithubAccountModule } from "../course-files/github-client/github-account.module.js";
import { OrgGithubUser } from "./models/org-github-user.entity.js";
import { SubscriptionEventHandlerService } from "./services/subscription-event-handler.service.js";
import { UserOnboardingController } from "./controllers/user-onboarding.controller.js";

import { UserOnboardingService } from "./services/user-onboarding.service.js";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { createSmtpEmailConfig } from "../config/library.config.js";

@Module({
    imports: [
        CoreModule,
        TypeOrmModule.forFeature([
            OrgGithubUser,
            OrganisationSubscriptionRecord,
        ]),
        GithubAccountModule,
        SubActivationQueueModule,
        SmtpEmailClientModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: createSmtpEmailConfig,
        }),
    ],
    controllers: [UserOnboardingController],
    providers: [UserOnboardingService, SubscriptionEventHandlerService],
    exports: [],
})
export class UserOnboardingModule {}
