resource "dokku_app" "app" {
  name = "use-miller"

  config_vars = {
    AUTO_INSTALL_API_MODELS         = var.app_auto_install_api_models
    AUTH0_AUDIENCE                  = var.app_auth0_audience
    AUTH0_DOMAIN                    = var.app_auth0_domain
    APP_TITLE                       = var.app_app_title
    EMAIL_SENDER_NAME               = var.app_email_sender_name
    EMAIL_SYNC_SEND_ENABLED         = var.app_smtp_email_sync_send_enabled
    EMAIL_BCC                       = var.app_email_bcc
    EMAIL_SENDER_ADDRESS            = var.app_email_sender_address
    FRONTEND_APP_URL                = var.app_frontend_app_url
    GENERATE_SWAGGER                = var.app_generate_swagger
    INVITATION_URLS_BASE_URL        = var.app_invitation_base_url
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

  domains = [
    var.dokku_app_domain
  ]

  buildpacks = [
    "https://github.com/heroku/heroku-buildpack-nodejs.git"
  ]
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
