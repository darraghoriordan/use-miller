import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
    CoreModule,
    BetterAuthzModule,
    OrganisationModule,
    UserInternalModule,
    SmtpEmailClientModule,
    SuperPowersModule,
    InvitationModule,
    DatabaseModule,
} from "@darraghor/nest-backend-libs";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { UserOnboardingModule } from "./user-onboarding/user-onboarding.module.js";
import { PaymentsModule } from "./payments/payments.module.js";
import { CourseFilesModule } from "./course-files/course-files.module.js";
import { SubscriptionAssetsModule } from "./subscription-assets/sub-assets.module.js";
import { OpenTelemetryModule } from "nestjs-otel";
import {
    createCoreConfig,
    createLoggerConfig,
    createBetterAuthzConfig,
    createSmtpEmailConfig,
    createInvitationConfig,
} from "./config/library.config.js";
import { auth } from "./auth/auth.js";

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

        AuthModule.forRoot({
            auth,
            disableGlobalAuthGuard: true,
            bodyParser: {
                json: { limit: "2mb" },
                urlencoded: { limit: "2mb", extended: true },
                rawBody: true,
            },
        }),

        BetterAuthzModule.forRootAsync({
            useFactory: createBetterAuthzConfig,
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
