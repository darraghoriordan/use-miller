import {
    CoreLoggerService,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";
import {
    Controller,
    UseGuards,
    Request,
    Post,
    HttpCode,
    HttpStatus,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { InitUserDto } from "./InitUserResult.dto";
import { UserOnboardingService } from "./user-onboarding.service";

@Controller("user-onboarding")
@ApiTags("Users")
export class UserOnboardingController {
    constructor(
        private readonly onboardingService: UserOnboardingService,
        private readonly logger: CoreLoggerService
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @Post("init-user")
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOkResponse({ type: InitUserDto })
    async initUser(@Request() request: RequestWithUser): Promise<InitUserDto> {
        this.logger.log("Initializing user: " + request.user.auth0UserId);
        const isUerInitialised = await this.onboardingService.initUser(
            request.user.auth0UserId
        );

        return { userWasInitialised: isUerInitialised };
    }
}
