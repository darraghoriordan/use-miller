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

variable "do_ssh_path" {
  type        = string
  description = "The path to an ssh certificate to use for droplets"
}

variable "app_auth0_prod_domain" {
  type        = string
  description = "The auth0 domain for PROD account"
}
variable "app_auth0_prod_management_client_id" {
  type        = string
  description = "The auth0 client ID for PROD Management API"
}
variable "app_auth0_prod_management_client_secret" {
  type        = string
  description = "The auth0 client secret for PROD Management API"
}
variable "app_public_domain" {
  type        = string
  description = "The public domain for your api"
}

variable "app_web_port" {
  type = string
}
variable "app_node_env" {
  type = string
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
variable "app_stripe_checkout_success_url" {
  type = string
}
variable "app_stripe_checkout_failure_url" {
  type = string
}
variable "app_stripe_checkout_price_id" {
  type = string
}

provider "dokku" {
  ssh_host                 = var.do_droplet_ip
  ssh_user                 = "dokku"
  ssh_port                 = 22
  ssh_cert                 = var.do_ssh_path
  fail_on_untested_version = false
}
