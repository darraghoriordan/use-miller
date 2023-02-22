import { Module } from "@nestjs/common";
import {
    CoreModule,
    AuthzModule,
    DatabaseModule,
    OrganisationModule,
    SmtpEmailClientModule,
    PersonModule,
} from "@darraghor/nest-backend-libs";
import { UserOnboardingModule } from "./user-onboarding/user-onboarding.module";
import { PaymentsModule } from "./payments/payments.module";
import { CourseFilesModule } from "./course-files/course-files.module";

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        AuthzModule,
        PersonModule,
        SmtpEmailClientModule,
        OrganisationModule,
        UserOnboardingModule,
        PaymentsModule,
        CourseFilesModule,
    ],
    controllers: [],
    providers: [],
})
export class MainModule {}
