import {
    CoreModule,
    StripeAccountModule,
    StripeCheckoutController,
    OrganisationSubscriptionsModule,
    StripeQueuedEventHandler,
} from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";

@Module({
    imports: [CoreModule, StripeAccountModule, OrganisationSubscriptionsModule],
    controllers: [StripeCheckoutController],
    providers: [StripeQueuedEventHandler],
    exports: [],
})
export class PaymentsModule {}
