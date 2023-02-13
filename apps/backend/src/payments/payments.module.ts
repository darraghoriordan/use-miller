import {
    CoreModule,
    StripeAccountModule,
    StripeCheckoutController,
    OrganisationSubscriptionsModule,
} from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";

@Module({
    imports: [CoreModule, StripeAccountModule, OrganisationSubscriptionsModule],
    controllers: [StripeCheckoutController],
    providers: [],
    exports: [],
})
export class PaymentsModule {}
