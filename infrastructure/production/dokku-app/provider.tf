terraform {
  required_providers {
    dokku = {
      source = "aaronstillwell/dokku"
    }
  }
  # You don't need this if you're a solo dev. When you're ready you can create a
  # digital ocean spaces account and store your terraform state there safely
  # by doing a terraform init again
  backend "s3" {
    endpoint                    = "https://sfo3.digitaloceanspaces.com/"
    bucket                      = "darragh-com"
    key                         = "miller-app-terraform-state/apps/use-miller-dokku-app"
    region                      = "us-east-1"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    profile                     = "digitaloceanspaces-terraform"
  }
}

variable "do_droplet_ip" {
  type        = string
  description = "Your digital ocean droplet IP address"
}

variable "do_ssh_private_path" {
  type        = string
  description = "The path to an ssh certificate to use for deploying to droplets"
}

variable "app_auth0_domain" {
  type        = string
  description = "The auth0 domain for PROD account"
}

variable "app_web_port" {
  type = string
}
variable "app_node_env" {
  type = string
}

variable "frontend_app_domains" {
  type = list(string)
}
variable "backend_app_domains" {
  type = list(string)
}
variable "app_auth0_audience" {
  type = string
}
variable "app_generate_swagger" {
  type = string
}
variable "app_frontend_app_url" {
  type = string
}
variable "app_smtp_email_username" {
  type = string
}
variable "app_smtp_email_password" {
  type = string
}
variable "app_smtp_email_sync_send_enabled" {
  type = string
}
variable "app_smtp_email_host" {
  type = string
}
variable "app_smtp_email_port" {
  type = string
}
variable "app_email_bcc" {
  type = string
}
variable "app_email_sender_address" {
  type = string
}
variable "app_email_sender_name" {
  type = string
}
variable "app_auto_install_api_models" {
  type = string
}
variable "app_logger_name" {
  type = string
}
variable "app_app_title" {
  type = string
}
variable "app_stripe_access_token" {
  type = string
}

variable "app_module_entity_path" {
  type = string
}
variable "app_backend_app_url" {
  type = string
}
variable "app_core_module_entity_path" {
  type = string
}
variable "app_migrations_path" {
  type = string
}
variable "app_github_access_token" {
  type = string
}
variable "app_invitation_base_url" {
  type = string
}
variable "app_course_files_base_path" {
  type = string
}
variable "app_logger_use_pretty_logs" {
  type = string
}
variable "app_logger_min_level" {
  type = string
}
variable "app_stripe_webhook_verification_key" {
  type = string
}
variable "app_stripe_redirects_base_url" {
  type = string
}
variable "frontend_app_auth0_secret" {
  type = string
}
variable "frontend_app_auth0_base_url" {
  type = string
}
variable "frontend_app_auth0_issuer_base_url" {
  type = string
}
variable "frontend_app_auth0_client_secret" {
  type = string
}
variable "frontend_app_auth0_client_id" {
  type = string
}
variable "frontend_app_auth0_scope" {
  type = string
}
variable "frontend_app_auth0_audience" {
  type = string
}
variable "frontend_app_next_public_api_base_path" {
  type = string
}
variable "frontend_app_next_public_auth0_domain" {
  type = string
}
variable "frontend_app_next_public_auth0_client_id" {
  type = string
}
variable "frontend_app_next_public_app_base_path" {
  type = string
}
variable "frontend_app_next_public_stripe_regular_price_id" {
  type = string
}
variable "frontend_app_next_public_stripe_regular_price_no_recurrence_id" {
  type = string
}

variable "otel_exporter_otlp_endpoint" {
  type = string
}
variable "frontend_app_otel_exporter_otlp_headers" {
  type = string
}
variable "backend_app_otel_exporter_otlp_headers" {
  type = string
}
variable "otel_exporter_otlp_compression" {
  type = string
}
variable "otel_traces_exporter" {
  type = string
}
variable "otel_exporter_otlp_traces_protocol" {
  type = string
}
variable "otel_log_level" {
  type = string
}
variable "otel_sdk_disabled" {
  type = string
}

provider "dokku" {
  ssh_host                 = var.do_droplet_ip
  ssh_user                 = "dokku"
  ssh_port                 = 22
  ssh_cert                 = var.do_ssh_private_path
  fail_on_untested_version = false
}
