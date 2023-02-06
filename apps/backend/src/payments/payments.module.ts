import {
    CoreModule,
    StripeAccountModule,
    StripeCheckoutController,
    StripeEventHandler,
} from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";

@Module({
    imports: [CoreModule, StripeAccountModule],
    controllers: [StripeCheckoutController],
    providers: [StripeEventHandler],
    exports: [],
})
export class PaymentsModule {}
