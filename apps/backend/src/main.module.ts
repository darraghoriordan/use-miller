import { Module } from "@nestjs/common";
import {
    CoreModule,
    AuthzModule,
    DatabaseModule,
    OrganisationModule,
    UserInternalModule,
    SmtpEmailClientModule,
    SuperPowersModule,
    InvitationModule,
} from "@darraghor/nest-backend-libs";
import { UserOnboardingModule } from "./user-onboarding/user-onboarding.module.js";
import { PaymentsModule } from "./payments/payments.module.js";
import { CourseFilesModule } from "./course-files/course-files.module.js";

@Module({
    imports: [
        CoreModule,
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
    ],
    controllers: [],
    providers: [],
})
export class MainModule {}
