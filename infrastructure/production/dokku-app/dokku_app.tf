resource "dokku_app" "frontend_app" {
  name = "use-miller-frontend"

  config_vars = {
    APP_BASE                                          = "apps/frontend"
    AUTH0_SECRET                                      = var.frontend_app_auth0_secret
    AUTH0_BASE_URL                                    = var.frontend_app_auth0_base_url
    AUTH0_ISSUER_BASE_URL                             = var.frontend_app_auth0_issuer_base_url
    AUTH0_CLIENT_SECRET                               = var.frontend_app_auth0_client_secret
    AUTH0_CLIENT_ID                                   = var.frontend_app_auth0_client_id
    AUTH0_SCOPE                                       = var.frontend_app_auth0_scope
    AUTH0_AUDIENCE                                    = var.frontend_app_auth0_audience
    NEXT_PUBLIC_API_BASE_PATH                         = var.frontend_app_next_public_api_base_path
    NEXT_PUBLIC_AUTH0_DOMAIN                          = var.frontend_app_next_public_auth0_domain
    NEXT_PUBLIC_AUTH0_CLIENT_ID                       = var.frontend_app_next_public_auth0_client_id
    NEXT_PUBLIC_APP_BASE_PATH                         = var.frontend_app_next_public_app_base_path
    NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID               = var.frontend_app_next_public_stripe_regular_price_id
    NEXT_PUBLIC_STRIPE_REGULAR_PRICE_NO_RECURRENCE_ID = var.frontend_app_next_public_stripe_regular_price_no_recurrence_id
  }

  domains = var.frontend_app_domains

  buildpacks = []
}

resource "dokku_app" "app" {
  name = "use-miller"

  config_vars = {
    APP_BASE                        = "apps/backend"
    AUTO_INSTALL_API_MODELS         = var.app_auto_install_api_models
    AUTH0_AUDIENCE                  = var.app_auth0_audience
    AUTH0_DOMAIN                    = var.app_auth0_domain
    APP_TITLE                       = var.app_app_title
    APP_MODULE_ENTITY_PATH          = var.app_module_entity_path
    BACKEND_APP_URL                 = var.app_backend_app_url
    CORE_MODULE_ENTITY_PATH         = var.app_core_module_entity_path
    MIGRATIONS_PATH                 = var.app_migrations_path
    GITHUB_ACCESS_TOKEN             = var.app_github_access_token
    EMAIL_SENDER_NAME               = var.app_email_sender_name
    EMAIL_SYNC_SEND_ENABLED         = var.app_smtp_email_sync_send_enabled
    EXTRA_EMAIL_BCC                 = var.app_email_bcc
    EMAIL_SENDER_ADDRESS            = var.app_email_sender_address
    FRONTEND_APP_URL                = var.app_frontend_app_url
    GENERATE_SWAGGER                = var.app_generate_swagger
    INVITATION_URLS_BASE_URL        = var.app_invitation_base_url
    COURSE_FILES_BASE_PATH          = var.app_course_files_base_path
    LOGGER_NAME                     = var.app_logger_name
    LOGGER_USE_PRETTY_LOGS          = var.app_logger_use_pretty_logs
    LOGGER_MIN_LEVEL                = var.app_logger_min_level
    NODE_ENV                        = var.app_node_env
    SMTP_EMAIL_USERNAME             = var.app_smtp_email_username
    SMTP_EMAIL_PASSWORD             = var.app_smtp_email_password
    SMTP_EMAIL_HOST                 = var.app_smtp_email_host
    SMTP_EMAIL_PORT                 = var.app_smtp_email_port
    STRIPE_ACCESS_TOKEN             = var.app_stripe_access_token
    STRIPE_WEBHOOK_VERIFICATION_KEY = var.app_stripe_webhook_verification_key
    STRIPE_REDIRECTS_BASE_URL       = var.app_stripe_redirects_base_url
    WEB_PORT                        = var.app_web_port
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
