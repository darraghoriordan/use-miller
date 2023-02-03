import { CoreLoggerService } from "@darraghor/nest-backend-libs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserOnboardingService {
    constructor(private loggerService: CoreLoggerService) {}

    // This is for onboarding new users
    // Set up the initial items for a user if any are required
    // eslint-disable-next-line @typescript-eslint/require-await
    async initUser(ownerId: string): Promise<boolean> {
        this.loggerService.log("Initialising new user " + ownerId);

        return true;
    }
}
