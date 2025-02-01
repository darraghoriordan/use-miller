import {
    CoreModule,
    OrganisationSubscriptionRecord,
    SubActivationQueueModule,
} from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GithubAccountModule } from "../course-files/github-client/github-account.module.js";
import { OrgGithubUser } from "./models/org-github-user.entity.js";
import { SubscriptionEventHandlerService } from "./services/subscription-event-handler.service.js";
import { UserOnboardingController } from "./controllers/user-onboarding.controller.js";

import { UserOnboardingService } from "./services/user-onboarding.service.js";

@Module({
    imports: [
        CoreModule,
        TypeOrmModule.forFeature([
            OrgGithubUser,
            OrganisationSubscriptionRecord,
        ]),
        GithubAccountModule,
        SubActivationQueueModule,
    ],
    controllers: [UserOnboardingController],
    providers: [UserOnboardingService, SubscriptionEventHandlerService],
    exports: [],
})
 
export class UserOnboardingModule {}
