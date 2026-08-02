import { StripePaymentsModule } from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { createStripePaymentsConfig } from "../config/library.config.js";

@Module({
    imports: [
        StripePaymentsModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: createStripePaymentsConfig,
        }),
    ],
})
export class PaymentsModule {}
