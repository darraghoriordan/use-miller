import { Module } from "@nestjs/common";
// import { SubscriptionAsset } from "./sub-asset.entity.js";
import { SubscriptionAssetsController } from "./sub-assets.controller.js";
import { SubscriptionAssetsService } from "./sub-assets.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@darraghor/nest-backend-libs";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [SubscriptionAssetsController],
    providers: [SubscriptionAssetsService],
    exports: [],
})
export class SubscriptionAssetsModule {}
