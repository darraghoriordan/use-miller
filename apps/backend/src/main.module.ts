import { Module } from "@nestjs/common";
import {
    CoreModule,
    AuthzModule,
    DatabaseModule,
    OrganisationModule,
    SmtpEmailClientModule,
} from "@darraghor/nest-backend-libs";
import { UserOnboardingModule } from "./user-onboarding/user-onboarding.module";
import { PaymentsModule } from "./payments/payments.module";

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        AuthzModule,
        SmtpEmailClientModule,
        OrganisationModule,
        UserOnboardingModule,
        PaymentsModule,
    ],
    controllers: [],
    providers: [],
})
export class MainModule {}
