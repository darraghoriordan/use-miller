declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_BASE_PATH: string;
        NEXT_PUBLIC_APP_BASE_PATH: string;
        NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID: string;
        NEXT_PUBLIC_STRIPE_REGULAR_PRICE_NO_RECURRENCE_ID: string;
        NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT: string;
        NEXT_PUBLIC_STRIPE_MILLER_CONSULTING_PRICE_ID: string;
        // Auth0 v4 variables (server-side only)
        AUTH0_DOMAIN: string;
        AUTH0_CLIENT_ID: string;
        AUTH0_CLIENT_SECRET: string;
        AUTH0_SECRET: string;
        APP_BASE_URL: string;
        AUTH0_AUDIENCE: string;
    }
}
