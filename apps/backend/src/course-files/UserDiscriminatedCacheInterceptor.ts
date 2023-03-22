import { RequestWithUser } from "@darraghor/nest-backend-libs";
import {
    CacheInterceptor,
    ExecutionContext,
    Injectable,
    Logger,
} from "@nestjs/common";

// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
@Injectable()
export default class UserDiscriminatedCacheInterceptor extends CacheInterceptor {
    private readonly logger = new Logger(
        UserDiscriminatedCacheInterceptor.name
    );

    trackBy(context: ExecutionContext): string | undefined {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const httpContext = context
            .switchToHttp()
            .getRequest<RequestWithUser>();

        const cacheKey = `${httpContext.user?.uuid || ""}${httpContext.method}${
            httpContext.url
        }`;
        this.logger.debug({ cacheKey }, "Using cache key");
        return cacheKey;
    }
}
