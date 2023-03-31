terraform {
  required_providers {
    stripe = {
      source  = "lukasaron/stripe"
      version = "1.6.0"
    }
  }
  # You don't need this if you're a solo dev. When you're ready you can create a
  # digital ocean spaces account and store your terraform state there safely
  # by doing a terraform init again
  backend "s3" {
    endpoint                    = "https://sfo3.digitaloceanspaces.com/"
    bucket                      = "darragh-com"
    key                         = "miller-app-terraform-state/apps/use-miller-stripe-prod"
    region                      = "us-east-1"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    profile                     = "digitaloceanspaces-terraform"
  }
}

variable "app_stripe_api_token" {
  type        = string
  sensitive   = true
  description = "The stripe API token"
}
variable "app_stripe_webhook_url" {
  type        = string
  sensitive   = true
  description = "The URL in your app to send the webhook to"
}
variable "app_stripe_customer_portal_privacy_url" {
  type        = string
  sensitive   = true
  description = "The url to the privacy policy in your application"
}
variable "app_stripe_customer_portal_header" {
  type        = string
  sensitive   = true
  description = "The text for the header of the customer portal"
}
variable "app_stripe_customer_portal_terms_conditions_url" {
  type        = string
  sensitive   = true
  description = "The url to the terms and conditions in your application"
}
variable "app_stripe_customer_portal_return_url" {
  type        = string
  sensitive   = true
  description = "The url in your app to return to after the customer leaves the stripe portal"
}

provider "stripe" {
  api_key = var.app_stripe_api_token
}
