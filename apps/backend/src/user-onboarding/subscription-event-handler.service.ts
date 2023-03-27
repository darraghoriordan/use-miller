import { Injectable, Logger } from "@nestjs/common";
import { Process, Processor } from "@nestjs/bull";
import { ProductActivationDto } from "./product-activation.dto.js";
import { Job } from "bull";
import { UserOnboardingService } from "./user-onboarding.service.js";

@Injectable()
@Processor("subscription-activation-changed")
export class SubscriptionEventHandlerService {
    constructor(private readonly onboardingService: UserOnboardingService) {}
    private readonly logger = new Logger(SubscriptionEventHandlerService.name);

    @Process()
    public async handleEvent(job: Job<ProductActivationDto>): Promise<void> {
        this.logger.debug(
            {
                job,
            },
            "Handling queued item"
        );
        await this.onboardingService.updateGithubAccess(job.data);
    }
}
