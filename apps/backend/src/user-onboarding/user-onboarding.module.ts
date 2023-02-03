import { CoreModule } from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { UserOnboardingController } from "./user-onboarding.controller";
import { UserOnboardingService } from "./user-onboarding.service";

@Module({
    imports: [CoreModule],
    controllers: [UserOnboardingController],
    providers: [UserOnboardingService],
    exports: [],
})
export class UserOnboardingModule {}
