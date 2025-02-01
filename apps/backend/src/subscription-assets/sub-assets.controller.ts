import {
    ClaimsAuthorisationGuard,
    DefaultAuthGuard,
    MandatoryUserClaims,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";
import {
    Controller,
    UseGuards,
    Request,
    Get,
    Post,
    Delete,
    Param,
    Body,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SaveSubscriptionAssetDto } from "./save-sub-asset.dto.js";
import { SubscriptionAsset } from "./sub-asset.entity.js";
import { SubscriptionAssetsService } from "./sub-assets.service.js";

@ApiBearerAuth()
@Controller("subscription-assets")
@ApiTags("Organisation Subscriptions")
export class SubscriptionAssetsController {
    constructor(private readonly subAssetsService: SubscriptionAssetsService) {}

    @Get()
    @UseGuards(DefaultAuthGuard)
    @ApiOkResponse({ type: SubscriptionAsset, isArray: true })
    async getAssetsForOrg(
        @Request() request: RequestWithUser
    ): Promise<SubscriptionAsset[]> {
        if (!request.user.auth0UserId) {
            throw new Error("No user found on request");
        }
        return this.subAssetsService.getSubscriptionAssets(request.user);
    }

    @Post()
    @UseGuards(DefaultAuthGuard, ClaimsAuthorisationGuard)
    @MandatoryUserClaims("modify:all")
    @ApiOkResponse({ type: SubscriptionAsset, isArray: true })
    async addAssetRecord(
        @Body() asset: SaveSubscriptionAssetDto,
        @Request() request: RequestWithUser
    ): Promise<SubscriptionAsset> {
        if (!request.user.auth0UserId) {
            throw new Error("No user found on request");
        }
        return this.subAssetsService.saveAsset(asset);
    }

    @Delete(":id")
    @UseGuards(DefaultAuthGuard, ClaimsAuthorisationGuard)
    @MandatoryUserClaims("modify:all")
    @ApiOkResponse()
    async deleteAssetRecord(@Param("id") id: number): Promise<void> {
        return this.subAssetsService.deleteAsset(id);
    }
}
