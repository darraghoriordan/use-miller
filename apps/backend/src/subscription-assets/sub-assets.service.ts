import { RequestUser } from "@darraghor/nest-backend-libs";
import { Injectable, Logger } from "@nestjs/common";
import { SubscriptionAsset } from "./sub-asset.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

@Injectable()
export class SubscriptionAssetsService {
    private readonly logger = new Logger(SubscriptionAssetsService.name);

    constructor(
        @InjectRepository(SubscriptionAsset)
        private subAssetRepo: Repository<SubscriptionAsset>
    ) {}

    // eslint-disable-next-line @typescript-eslint/require-await
    async getSubscriptionAssets(
        currentUser: RequestUser
    ): Promise<SubscriptionAsset[]> {
        this.logger.debug(
            {
                products: currentUser.activeSubscriptionProducts,
                user: currentUser.uuid,
            },
            "Getting subscription assets for user"
        );
        const r = this.subAssetRepo.find();
        this.logger.log(r);

        return this.subAssetRepo.find({
            where: {
                internalSku: In(currentUser.activeSubscriptionProducts),
            },
        });
    }
}
