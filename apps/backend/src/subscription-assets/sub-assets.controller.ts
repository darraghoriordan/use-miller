import {
    DefaultAuthGuard,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";
import { Controller, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SubscriptionAsset } from "./sub-asset.entity.js";
import { SubscriptionAssetsService } from "./sub-assets.service.js";

@Controller("subscription-assets")
@ApiTags("Organisation Subscriptions")
export class SubscriptionAssetsController {
    constructor(private readonly subAssetsService: SubscriptionAssetsService) {}

    @UseGuards(DefaultAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: SubscriptionAsset, isArray: true })
    async getAssetsForOrg(
        @Request() request: RequestWithUser
    ): Promise<SubscriptionAsset[]> {
        if (!request.user?.auth0UserId) {
            throw new Error("No user found on request");
        }
        return this.subAssetsService.getSubscriptionAssets(request.user);
    }
}
