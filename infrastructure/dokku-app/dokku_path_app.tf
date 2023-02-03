resource "dokku_app" "app" {
  name = "candidate-response"

  config_vars = {
    WEB_PORT                    = var.app_web_port
    NODE_ENV                    = var.app_node_env
    AUTH0_DOMAIN                = var.app_auth0_domain
    AUTH0_ISSUER_URL            = var.app_auth0_issuer_url
    AUTH0_AUDIENCE              = var.app_auth0_audience
    GENERATE_SWAGGER            = var.app_generate_swagger
    FRONTEND_APP_URL            = var.app_frontend_app_url
    SMTP_EMAIL_USERNAME         = var.app_smtp_email_username
    SMTP_EMAIL_PASSWORD         = var.app_smtp_email_password
    EMAIL_SYNC_SEND_ENABLED     = var.app_smtp_email_sync_send_enabled
    SMTP_EMAIL_HOST             = var.app_smtp_email_host
    SMTP_EMAIL_PORT             = var.app_smtp_email_port
    EMAIL_BCC                   = var.app_email_bcc
    EMAIL_SENDER_ADDRESS        = var.app_email_sender_address
    EMAIL_SENDER_NAME           = var.app_email_sender_name
    AUTO_INSTALL_API_MODELS     = var.app_auto_install_api_models
    LOGGER_NAME                 = var.app_logger_name
    APP_TITLE                   = var.app_app_title
    STRIPE_ACCESS_TOKEN         = var.app_stripe_access_token
    STRIPE_CHECKOUT_SUCCESS_URL = var.app_stripe_checkout_success_url
    STRIPE_CHECKOUT_FAILURE_URL = var.app_stripe_checkout_failure_url
    STRIPE_CHECKOUT_PRICE_ID    = var.app_stripe_checkout_price_id
  }

  domains = [
    "candidate-response.filteredreduced.dev"
  ]

  buildpacks = [
    "https://github.com/heroku/heroku-buildpack-nodejs.git"
  ]
}

# Create accompanying services...
resource "dokku_postgres_service" "app-postgres" {
  name          = "candidate-response-postgres"
  image_version = "14.4"
}

resource "dokku_postgres_service_link" "postgres-link" {
  app     = dokku_app.app.name
  service = dokku_postgres_service.app-postgres.name

  alias = "DATABASE_URL"
  # query_string = ""
}

resource "dokku_redis_service" "app-redis" {
  name = "candidate-response-redis"
}

resource "dokku_redis_service_link" "redis-link" {
  app     = dokku_app.app.name
  service = dokku_redis_service.app-redis.name

  alias = "REDIS_URL"
  # query_string = ""
}
