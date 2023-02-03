import {
    CoreModule,
    StripeAccountModule,
    StripeEventHandler,
    StripeUnauthenticatedCheckoutController,
} from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";

@Module({
    imports: [CoreModule, StripeAccountModule],
    controllers: [StripeUnauthenticatedCheckoutController],
    providers: [StripeEventHandler],
    exports: [],
})
export class PaymentsModule {}
