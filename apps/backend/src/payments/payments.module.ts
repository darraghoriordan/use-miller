import {
    StripeAccountModule,
    StripeCheckoutController,
    OrganisationSubscriptionsModule,
    StripeQueuedEventHandler,
} from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { createStripeConfig } from "../config/library.config.js";

@Module({
    imports: [
        StripeAccountModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: createStripeConfig,
        }),
        OrganisationSubscriptionsModule,
    ],
    controllers: [StripeCheckoutController],
    providers: [StripeQueuedEventHandler],
    exports: [],
})
export class PaymentsModule {}
