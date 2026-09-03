resource "dokku_app" "frontend_app" {
  name = "use-miller-frontend"

  config_vars = {
    APP_BASE                        = "apps/frontend"
    APP_BASE_URL                    = var.frontend_app_base_url
    NEXT_PUBLIC_API_BASE_PATH       = var.frontend_app_api_base_path
    OTEL_EXPORTER_OTLP_ENDPOINT     = var.otel_exporter_otlp_endpoint
    OTEL_EXPORTER_OTLP_HEADERS      = var.frontend_app_otel_exporter_otlp_headers
  }

  domains = var.frontend_app_domains

  buildpacks = []
}

resource "dokku_app" "app" {
  name = "use-miller"

  config_vars = {
    APP_BASE                               = "apps/backend"
    AUTO_INSTALL_API_MODELS                = var.app_auto_install_api_models
    BETTER_AUTH_SECRET                     = var.app_better_auth_secret
    BETTER_AUTH_URL                        = var.app_better_auth_url
    BETTER_AUTH_COOKIE_DOMAIN              = var.app_better_auth_cookie_domain
    GOOGLE_CLIENT_ID                       = var.app_google_client_id
    GOOGLE_CLIENT_SECRET                   = var.app_google_client_secret
    SUPER_USER_EMAILS                      = var.app_super_user_emails
    APP_TITLE                              = var.app_app_title
    APP_MODULE_ENTITY_PATH                 = var.app_module_entity_path
    BACKEND_APP_URL                        = var.app_backend_app_url
    CORE_MODULE_ENTITY_PATH                = var.app_core_module_entity_path
    MIGRATIONS_PATH                        = var.app_migrations_path
    GITHUB_ACCESS_TOKEN                    = var.app_github_access_token
    EMAIL_SENDER_NAME                      = var.app_email_sender_name
    EMAIL_SYNC_SEND_ENABLED                = var.app_smtp_email_sync_send_enabled
    EXTRA_EMAIL_BCC                        = var.app_email_bcc
    EMAIL_SENDER_ADDRESS                   = var.app_email_sender_address
    FRONTEND_APP_URL                       = var.app_frontend_app_url
    GENERATE_SWAGGER                       = var.app_generate_swagger
    INVITATION_URLS_BASE_URL               = var.app_invitation_base_url
    COURSE_FILES_BASE_PATH                 = var.app_course_files_base_path
    LOGGER_NAME                            = var.app_logger_name
    LOGGER_USE_PRETTY_LOGS                 = var.app_logger_use_pretty_logs
    LOGGER_MIN_LEVEL                       = var.app_logger_min_level
    NODE_ENV                               = var.app_node_env
    SMTP_EMAIL_USERNAME                    = var.app_smtp_email_username
    SMTP_EMAIL_PASSWORD                    = var.app_smtp_email_password
    SMTP_EMAIL_HOST                        = var.app_smtp_email_host
    SMTP_EMAIL_PORT                        = var.app_smtp_email_port
    STRIPE_ACCESS_TOKEN                    = var.app_stripe_access_token
    STRIPE_WEBHOOK_VERIFICATION_KEY        = var.app_stripe_webhook_verification_key
    STRIPE_PRODUCT_CATALOG_JSON            = var.app_stripe_product_catalog_json
    STRIPE_REDIRECTS_BASE_URL              = var.app_stripe_redirects_base_url
    WEB_PORT                               = var.app_web_port
    OTEL_EXPORTER_OTLP_ENDPOINT            = var.otel_exporter_otlp_endpoint
    OTEL_EXPORTER_OTLP_HEADERS             = var.backend_app_otel_exporter_otlp_headers
    OTEL_EXPORTER_OTLP_COMPRESSION         = var.otel_exporter_otlp_compression
    OTEL_TRACES_EXPORTER                   = var.otel_traces_exporter
    OTEL_EXPORTER_OTLP_TRACES_PROTOCOL     = var.otel_exporter_otlp_traces_protocol
    OTEL_LOG_LEVEL                         = var.otel_log_level
    OTEL_SDK_DISABLED                      = var.otel_sdk_disabled
  }

  domains = var.backend_app_domains

  buildpacks = []
}

# Create accompanying services...
resource "dokku_postgres_service" "app-postgres" {
  name          = "use-miller-postgres"
  image_version = "14.4"
}

resource "dokku_postgres_service_link" "postgres-link" {
  app     = dokku_app.app.name
  service = dokku_postgres_service.app-postgres.name

  alias = "DATABASE_URL"
  # query_string = ""
}

resource "dokku_redis_service" "app-redis" {
  name = "use-miller-redis"
}

resource "dokku_redis_service_link" "redis-link" {
  app     = dokku_app.app.name
  service = dokku_redis_service.app-redis.name

  alias = "REDIS_URL"
  # query_string = ""
}
