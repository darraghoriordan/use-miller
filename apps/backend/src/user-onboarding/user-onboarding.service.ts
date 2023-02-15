import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UserOnboardingService {
    private readonly logger = new Logger(UserOnboardingService.name);

    // This is for onboarding new users
    // Set up the initial items for a user if any are required
    // eslint-disable-next-line @typescript-eslint/require-await
    async initUser(ownerId: string): Promise<boolean> {
        this.logger.log("Initialising new user " + ownerId);

        return true;
    }
}
