import { RequestUser } from "@darraghor/nest-backend-libs";
import { Injectable, Logger } from "@nestjs/common";
import { SubscriptionAsset } from "./sub-asset.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SaveSubscriptionAssetDto } from "./save-sub-asset.dto.js";

@Injectable()
export class SubscriptionAssetsService {
    private readonly logger = new Logger(SubscriptionAssetsService.name);

    constructor(
        @InjectRepository(SubscriptionAsset)
        private subAssetRepo: Repository<SubscriptionAsset>,
    ) {}

    async deleteAsset(id: number): Promise<void> {
        this.logger.debug(
            `Deleting subscription asset with id ${id.toString()}`,
        );
        await this.subAssetRepo.delete({ id });
    }
    async saveAsset(
        asset: SaveSubscriptionAssetDto,
    ): Promise<SubscriptionAsset> {
        this.logger.debug(`Saving subscription asset ${asset.internalSku}`);
        return this.subAssetRepo.save(asset);
    }

    async getSubscriptionAssets(
        currentUser: RequestUser,
    ): Promise<SubscriptionAsset[]> {
        return this.subAssetRepo.find({
            where: {
                internalSku: In(currentUser.activeSubscriptionProductKeys),
            },
        });
    }
}
