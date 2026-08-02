import { type ConfigService } from "@nestjs/config";
import {
    type CoreModuleOptions,
    type LoggerModuleOptions,
    type BetterAuthzModuleOptions,
    type SmtpEmailModuleOptions,
    type InvitationModuleOptions,
    type StripePaymentsModuleOptions,
    parseStripeProductCatalog,
} from "@darraghor/nest-backend-libs";
import { resolveBetterAuthUser } from "../auth/better-auth-profile-resolver.js";

/**
 * Helper to get a required environment variable or throw an error
 */
function getRequiredEnvironment(config: ConfigService, key: string): string {
    const value = config.get<string>(key);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value === undefined || value === null) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

export const createCoreConfig = (config: ConfigService): CoreModuleOptions => ({
    webPort: parseInt(config.get<string>("WEB_PORT") ?? "3000", 10),
    appTitle: config.get<string>("APP_TITLE") ?? "Miller App",
    frontEndAppUrl: getRequiredEnvironment(config, "FRONTEND_APP_URL"),
    nodeEnv: config.get<string>("NODE_ENV") ?? "development",
    bullQueueHost: getRequiredEnvironment(config, "REDIS_URL"),
    shouldGenerateSwagger: config.get<string>("GENERATE_SWAGGER") === "true",
    shouldAutomaticallyInstallApiModels:
        config.get<string>("AUTO_INSTALL_API_MODELS") === "true",
    shouldUseNestCors: config.get<string>("ENABLE_NEST_CORS") === "true",
    globalPrefix: config.get<string>("APP_GLOBAL_PREFIX"),
    helmetOptions: {
        crossOriginResourcePolicy: { policy: "cross-origin" },
    },
});

export const createLoggerConfig = (
    config: ConfigService,
): LoggerModuleOptions => ({
    nodeEnv: config.get<string>("NODE_ENV") ?? "development",
    loggerName: config.get<string>("LOGGER_NAME"),
    minLevel: config.get<string>("LOGGER_MIN_LEVEL") ?? "debug",
    usePrettyLogs: config.get<string>("LOGGER_USE_PRETTY_LOGS") === "true",
});

export const createBetterAuthzConfig = (): BetterAuthzModuleOptions => ({
    resolveUser: resolveBetterAuthUser,
});

export const createSmtpEmailConfig = (
    config: ConfigService,
): SmtpEmailModuleOptions => ({
    smtpHost: getRequiredEnvironment(config, "SMTP_EMAIL_HOST"),
    smtpPort: parseInt(config.get<string>("SMTP_EMAIL_PORT") ?? "587", 10),
    emailUsername: getRequiredEnvironment(config, "SMTP_EMAIL_USERNAME"),
    emailPassword: getRequiredEnvironment(config, "SMTP_EMAIL_PASSWORD"),
    senderEmailAddress: getRequiredEnvironment(config, "EMAIL_SENDER_ADDRESS"),
    senderName: getRequiredEnvironment(config, "EMAIL_SENDER_NAME"),
    extraEmailBcc: config.get<string>("EXTRA_EMAIL_BCC") ?? "",
    isEmailSyncSendEnabled:
        config.get<string>("EMAIL_SYNC_SEND_ENABLED") === "true",
});

export const createInvitationConfig = (
    config: ConfigService,
): InvitationModuleOptions => ({
    baseUrl: getRequiredEnvironment(config, "INVITATION_URLS_BASE_URL"),
});

export const createStripePaymentsConfig = (
    config: ConfigService,
): StripePaymentsModuleOptions => {
    const catalogJson = config.get<string>("STRIPE_PRODUCT_CATALOG_JSON");
    const products = catalogJson
        ? parseStripeProductCatalog(catalogJson)
        : [
              {
                  key: "miller-start",
                  priceId: getRequiredEnvironment(
                      config,
                      "STRIPE_PRICE_MILLER_START",
                  ),
                  mode: "subscription" as const,
                  internalSku: "miller-start",
                  displayName: "Miller Start",
              },
              {
                  key: "miller-start-consulting",
                  priceId: getRequiredEnvironment(
                      config,
                      "STRIPE_PRICE_MILLER_START_CONSULTING",
                  ),
                  mode: "subscription" as const,
                  internalSku: "miller-start-consulting",
                  displayName: "Miller Start Consulting",
              },
              {
                  key: "dev-shell",
                  priceId: getRequiredEnvironment(
                      config,
                      "STRIPE_PRICE_DEV_SHELL",
                  ),
                  mode: "payment" as const,
                  internalSku: "dev-shell",
                  displayName: "Dev Shell",
              },
          ];

    return {
        accessToken: getRequiredEnvironment(config, "STRIPE_ACCESS_TOKEN"),
        webhookVerificationKey: getRequiredEnvironment(
            config,
            "STRIPE_WEBHOOK_VERIFICATION_KEY",
        ),
        redirectsBaseUrl: getRequiredEnvironment(
            config,
            "STRIPE_REDIRECTS_BASE_URL",
        ),
        products,
    };
};
