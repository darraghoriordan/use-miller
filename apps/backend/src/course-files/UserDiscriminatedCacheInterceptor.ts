import { RequestWithUser } from "@darraghor/nest-backend-libs";
import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Injectable()
export default class UserDiscriminatedCacheInterceptor extends CacheInterceptor {
    private readonly logger = new Logger(
        UserDiscriminatedCacheInterceptor.name,
    );

    trackBy(context: ExecutionContext): string | undefined {
        const httpContext = context
            .switchToHttp()
            .getRequest<RequestWithUser>();

        const userUuid = httpContext.user.uuid || "anonymous";
        const cacheKey = `${userUuid}${httpContext.method}${httpContext.url}`;
        this.logger.debug({ cacheKey }, "Using cache key");
        return cacheKey;
    }
}
