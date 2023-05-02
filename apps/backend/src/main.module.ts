/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from "@nestjs/common";
import {
    CoreModule,
    AuthzModule,
    OrganisationModule,
    UserInternalModule,
    SmtpEmailClientModule,
    SuperPowersModule,
    InvitationModule,
    DatabaseModule,
} from "@darraghor/nest-backend-libs";
import { UserOnboardingModule } from "./user-onboarding/user-onboarding.module.js";
import { PaymentsModule } from "./payments/payments.module.js";
import { CourseFilesModule } from "./course-files/course-files.module.js";
import { SubscriptionAssetsModule } from "./subscription-assets/sub-assets.module.js";
import { OpenTelemetryModule } from "nestjs-otel";

@Module({
    imports: [
        CoreModule,
        OpenTelemetryModule.forRoot({
            metrics: {
                hostMetrics: true,
                apiMetrics: {
                    enable: true,
                },
            },
        }),
        DatabaseModule,
        AuthzModule,
        UserInternalModule,
        SmtpEmailClientModule,
        OrganisationModule,
        UserOnboardingModule,
        PaymentsModule,
        CourseFilesModule,
        SuperPowersModule,
        InvitationModule,
        SubscriptionAssetsModule,
    ],
    controllers: [],
    providers: [],
})
export class MainModule {}
