import { Module } from "@nestjs/common";
// import { SubscriptionAsset } from "./sub-asset.entity.js";
import { SubscriptionAssetsController } from "./sub-assets.controller.js";
import { SubscriptionAssetsService } from "./sub-assets.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionAsset } from "./sub-asset.entity.js";
import { CoreConfigModule, CoreModule } from "@darraghor/nest-backend-libs";

@Module({
    imports: [
        CoreModule,
        CoreConfigModule,
        TypeOrmModule.forFeature([SubscriptionAsset]),
    ],
    controllers: [SubscriptionAssetsController],
    providers: [SubscriptionAssetsService],
    exports: [],
})
export class SubscriptionAssetsModule {}
