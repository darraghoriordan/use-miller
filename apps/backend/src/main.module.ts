import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
    CoreModule,
    AuthzModule,
    AuthzClientModule,
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
import {
    createCoreConfig,
    createLoggerConfig,
    createAuthzConfig,
    createAuthzClientConfig,
    createSmtpEmailConfig,
    createInvitationConfig,
} from "./config/library.config.js";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        CoreModule.forRootAsync({
            core: {
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: createCoreConfig,
            },
            logger: {
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: createLoggerConfig,
            },
        }),

        OpenTelemetryModule.forRoot({
            metrics: {
                hostMetrics: true,
            },
        }),

        DatabaseModule,

        AuthzModule.forRootAsync({
            imports: [
                ConfigModule,
                AuthzClientModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: createAuthzClientConfig,
                }),
            ],
            inject: [ConfigService],
            useFactory: createAuthzConfig,
        }),

        UserInternalModule,

        SmtpEmailClientModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: createSmtpEmailConfig,
        }),

        OrganisationModule,
        UserOnboardingModule,
        PaymentsModule,
        CourseFilesModule,
        SuperPowersModule,

        InvitationModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: createInvitationConfig,
        }),

        SubscriptionAssetsModule,
    ],
    controllers: [],
    providers: [],
})
export class MainModule {}
