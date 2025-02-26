terraform {
  required_providers {
    auth0 = {
      source = "auth0/auth0"
    }
  }
  # You don't need this if you're a solo dev. When you're ready you can create a
  # digital ocean spaces account and store your terraform state there safely
  # by doing a terraform init again
  backend "s3" {
    endpoints {
      s3 = "https://sfo3.digitaloceanspaces.com/"
    }

    bucket                      = "darragh-com"
    key                         = "miller-app-terraform-state/apps/use-miller-auth0-dev"
    region                      = "us-east-1"
    skip_credentials_validation = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    profile                     = "digitaloceanspaces-terraform"
  }
}

variable "app_auth0_dev_domain" {
  type        = string
  description = "The auth0 domain for DEV account"
}
variable "app_auth0_dev_management_client_id" {
  type        = string
  description = "The auth0 client ID for DEV Management API"
}
variable "app_auth0_dev_management_client_secret" {
  type        = string
  sensitive   = true
  description = "The auth0 client secret for DEV Management API"
}

provider "auth0" {
  domain        = var.app_auth0_dev_domain
  client_id     = var.app_auth0_dev_management_client_id
  client_secret = var.app_auth0_dev_management_client_secret
  #   scopes = ["read:client_grants",
  #     "create:client_grants",
  #     "delete:client_grants",
  #     "update:client_grants",
  #     "read:users",
  #     "update:users",
  #     "delete:users",
  #     "create:users",
  #     "read:users_app_metadata",
  #     "update:users_app_metadata",
  #     "delete:users_app_metadata",
  #     "create:users_app_metadata",
  #     "read:user_custom_blocks",
  #     "create:user_custom_blocks",
  #     "delete:user_custom_blocks",
  #     "create:user_tickets",
  #     "read:clients",
  #     "update:clients",
  #     "delete:clients",
  #     "create:clients",
  #     "read:client_keys",
  #     "update:client_keys",
  #     "delete:client_keys",
  #     "create:client_keys",
  #     "read:connections",
  #     "update:connections",
  #     "delete:connections",
  #     "create:connections",
  #     "read:resource_servers",
  #     "update:resource_servers",
  #     "delete:resource_servers",
  #     "create:resource_servers",
  #     "read:device_credentials",
  #     "update:device_credentials",
  #     "delete:device_credentials",
  #     "create:device_credentials",
  #     "read:rules",
  #     "update:rules",
  #     "delete:rules",
  #     "create:rules",
  #     "read:rules_configs",
  #     "update:rules_configs",
  #     "delete:rules_configs",
  #     "read:hooks",
  #     "update:hooks",
  #     "delete:hooks",
  #     "create:hooks",
  #     "read:actions",
  #     "update:actions",
  #     "delete:actions",
  #     "create:actions",
  #     "read:email_provider",
  #     "update:email_provider",
  #     "delete:email_provider",
  #     "create:email_provider",
  #     "blacklist:tokens",
  #     "read:stats",
  #     "read:insights",
  #     "read:tenant_settings",
  #     "update:tenant_settings",
  #     "read:logs",
  #     "read:logs_users",
  #     "read:shields",
  #     "create:shields",
  #     "update:shields",
  #     "delete:shields",
  #     "read:anomaly_blocks",
  #     "delete:anomaly_blocks",
  #     "update:triggers",
  #     "read:triggers",
  #     "read:grants",
  #     "delete:grants",
  #     "read:guardian_factors",
  #     "update:guardian_factors",
  #     "read:guardian_enrollments",
  #     "delete:guardian_enrollments",
  #     "create:guardian_enrollment_tickets",
  #     "read:user_idp_tokens",
  #     "create:passwords_checking_job",
  #     "delete:passwords_checking_job",
  #     "read:custom_domains",
  #     "delete:custom_domains",
  #     "create:custom_domains",
  #     "update:custom_domains",
  #     "read:email_templates",
  #     "create:email_templates",
  #     "update:email_templates",
  #     "read:mfa_policies",
  #     "update:mfa_policies",
  #     "read:roles",
  #     "create:roles",
  #     "delete:roles",
  #     "update:roles",
  #     "read:prompts",
  #     "update:prompts",
  #     "read:branding",
  #     "update:branding",
  #     "delete:branding",
  #     "read:log_streams",
  #     "create:log_streams",
  #     "delete:log_streams",
  #     "update:log_streams",
  #     "create:signing_keys",
  #     "read:signing_keys",
  #     "update:signing_keys",
  #     "read:limits",
  #     "update:limits",
  #     "create:role_members",
  #     "read:role_members",
  #     "delete:role_members",
  #     "read:entitlements",
  #     "read:attack_protection",
  #     "update:attack_protection",
  #     "read:organizations",
  #     "update:organizations",
  #     "create:organizations",
  #     "delete:organizations",
  #     "create:organization_members",
  #     "read:organization_members",
  #     "delete:organization_members",
  #     "create:organization_connections",
  #     "read:organization_connections",
  #     "update:organization_connections",
  #     "delete:organization_connections",
  #     "create:organization_member_roles",
  #     "read:organization_member_roles",
  #     "delete:organization_member_roles",
  #     "create:organization_invitations",
  #     "read:organization_invitations",
  #     "delete:organization_invitations",
  #     "read:organizations_summary",
  #     "create:actions_log_sessions",
  #     "create:authentication_methods",
  #     "read:authentication_methods",
  #     "update:authentication_methods",
  #     "delete:authentication_methods"
  #   ]
}
