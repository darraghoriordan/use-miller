import { CoreModule } from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GithubAccountModule } from "../course-files/github-client/github-account.module.js";
import { OrgGithubUser } from "./org-github-user.js";
import { SubscriptionEventHandlerService } from "./subscription-event-handler.service.js";

import { UserOnboardingService } from "./user-onboarding.service.js";

@Module({
    imports: [
        CoreModule,
        TypeOrmModule.forFeature([OrgGithubUser]),
        GithubAccountModule,
    ],
    controllers: [],
    providers: [UserOnboardingService, SubscriptionEventHandlerService],
    exports: [],
})
export class UserOnboardingModule {}
