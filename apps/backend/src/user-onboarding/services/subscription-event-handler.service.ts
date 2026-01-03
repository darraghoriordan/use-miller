import { Injectable, Logger } from "@nestjs/common";
import { Process, Processor } from "@nestjs/bull";
import { ProductActivationDto } from "../models/product-activation.dto.js";
import { Job } from "bull";
import { UserOnboardingService } from "./user-onboarding.service.js";
import { SmtpEmailClient } from "@darraghor/nest-backend-libs";

@Injectable()
@Processor("subscription-activation-changed")
export class SubscriptionEventHandlerService {
    constructor(
        private readonly onboardingService: UserOnboardingService,
        private readonly emailClient: SmtpEmailClient,
    ) {}
    private readonly logger = new Logger(SubscriptionEventHandlerService.name);

    @Process()
    public async handleEvent(job: Job<ProductActivationDto>): Promise<void> {
        this.logger.debug(
            {
                job,
            },
            "Handling queued item",
        );

        try {
            await this.onboardingService.updateGithubAccess({
                productKey: job.data.productKey,
                organisationUuid: job.data.organisationUuid,
                isActive: job.data.active,
            });
        } catch (error) {
            this.logger.error(
                {
                    error,
                    jobData: job.data,
                },
                "Failed to process subscription activation event",
            );

            await this.sendAdminErrorNotification(job.data, error);

            // Re-throw to let Bull handle retry logic
            throw error;
        }
    }

    private async sendAdminErrorNotification(
        jobData: ProductActivationDto,
        error: unknown,
    ): Promise<void> {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        const errorStack =
            error instanceof Error
                ? (error.stack ?? "No stack trace available")
                : "No stack trace available";

        const subject = `[ALERT] Subscription Webhook Processing Failed - ${jobData.productKey}`;

        const htmlBody = `
            <h2>Subscription Event Processing Failed</h2>
            <p>An error occurred while processing a subscription activation event.</p>
            
            <h3>Event Details</h3>
            <ul>
                <li><strong>Product Key:</strong> ${jobData.productKey}</li>
                <li><strong>Organisation UUID:</strong> ${jobData.organisationUuid}</li>
                <li><strong>Action:</strong> ${jobData.active ? "Activate" : "Deactivate"}</li>
            </ul>
            
            <h3>Error Details</h3>
            <p><strong>Message:</strong> ${errorMessage}</p>
            <pre>${errorStack}</pre>
            
            <p>Please investigate and manually resolve if necessary.</p>
        `;

        const plainTextBody = `
Subscription Event Processing Failed

An error occurred while processing a subscription activation event.

Event Details:
- Product Key: ${jobData.productKey}
- Organisation UUID: ${jobData.organisationUuid}
- Action: ${jobData.active ? "Activate" : "Deactivate"}

Error Details:
Message: ${errorMessage}

${errorStack}

Please investigate and manually resolve if necessary.
        `.trim();

        try {
            // Send to empty "to" array - the EXTRA_EMAIL_BCC will receive it
            await this.emailClient.sendMail(
                [], // No direct recipients
                [], // BCC will be added from config (EXTRA_EMAIL_BCC)
                subject,
                "system", // System user ID for automated emails
                plainTextBody,
                htmlBody,
            );

            this.logger.debug("Admin error notification email queued");
        } catch (emailError) {
            // Don't fail the job if email fails - just log it
            this.logger.error(
                { emailError },
                "Failed to send admin error notification email",
            );
        }
    }
}
