import {
    DefaultAuthGuard,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";
import {
    Controller,
    UseGuards,
    Request,
    Post,
    HttpCode,
    HttpStatus,
    Logger,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { InitUserResponseDto } from "./InitUserResponseDto.js";
import { UserOnboardingService } from "./user-onboarding.service.js";

@Controller("user-onboarding")
@ApiTags("Users")
export class UserOnboardingController {
    private readonly logger = new Logger(UserOnboardingController.name);

    constructor(private readonly onboardingService: UserOnboardingService) {}

    @UseGuards(DefaultAuthGuard)
    @ApiBearerAuth()
    @Post("init-user")
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOkResponse({ type: InitUserResponseDto })
    async initUser(
        @Request() request: RequestWithUser
    ): Promise<InitUserResponseDto> {
        if (!request.user.auth0UserId) {
            throw new Error("No user found on request");
        }
        this.logger.log("Initializing user: " + request.user.auth0UserId);
        const isUerInitialised = await this.onboardingService.initUser(
            request.user.auth0UserId
        );

        return { userWasInitialised: isUerInitialised };
    }
}
