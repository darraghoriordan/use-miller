declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_BASE_PATH: string;
        NEXT_PUBLIC_AUTH0_DOMAIN: string;
        NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
        NEXT_PUBLIC_APP_BASE_PATH: string;
        NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID: string;
        NEXT_PUBLIC_STRIPE_REGULAR_PRICE_NO_RECURRENCE_ID: string;
        NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT: string;
        NEXT_PUBLIC_STRIPE_MILLER_CONSULTING_PRICE_ID: string;
    }
}
