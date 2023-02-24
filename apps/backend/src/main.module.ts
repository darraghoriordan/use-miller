import { Module } from "@nestjs/common";
import {
    CoreModule,
    AuthzModule,
    DatabaseModule,
    OrganisationModule,
    SmtpEmailClientModule,
    PersonExternalModule,
} from "@darraghor/nest-backend-libs";
import { UserOnboardingModule } from "./user-onboarding/user-onboarding.module";
import { PaymentsModule } from "./payments/payments.module";
import { CourseFilesModule } from "./course-files/course-files.module";

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        AuthzModule,
        PersonExternalModule,
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
