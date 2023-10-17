import {
    DefaultAuthGuard,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";
import {
    Controller,
    UseGuards,
    HttpCode,
    HttpStatus,
    Get,
    Param,
    Request,
    Post,
    Body,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { OrgGithubUserDto } from "../models/orgGhUser.dto.js";
import { OrgGithubUser } from "../models/org-github-user.entity.js";
import { UserOnboardingService } from "../services/user-onboarding.service.js";

@UseGuards(DefaultAuthGuard)
@ApiBearerAuth()
@Controller("onboarding")
@ApiTags("User Onboarding")
export class UserOnboardingController {
    constructor(
        private readonly ghUserOnboardingService: UserOnboardingService,
    ) {}

    @Get("github-user/:orgUuid")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: OrgGithubUser, isArray: true })
    async getAllForOrg(
        @Param("orgUuid") orgUuid: string,
        @Request() request: RequestWithUser,
    ): Promise<OrgGithubUser[]> {
        return this.ghUserOnboardingService.get(orgUuid, request.user);
    }

    @Post("github-user")
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ type: OrgGithubUser })
    async addForOrg(
        @Body() requestBody: OrgGithubUserDto,
        @Request() request: RequestWithUser,
    ): Promise<OrgGithubUser> {
        return this.ghUserOnboardingService.addOrgGithubUser(
            requestBody,
            request.user,
        );
    }
}
