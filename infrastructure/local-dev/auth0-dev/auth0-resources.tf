resource "auth0_tenant" "dev_tenant" {
  friendly_name     = "use-miller app (Development)"
  default_directory = "Username-Password-Authentication"
}

resource "auth0_client" "frontend_spa_app" {
  name                       = "Frontend App"
  description                = "The frontend client application"
  app_type                   = "spa"
  callbacks                  = ["http://localhost:3000", "http://localhost:3001", "http://localhost"]
  oidc_conformant            = true
  allowed_origins            = ["http://localhost:3000", "http://localhost:3001", "http://localhost"]
  allowed_logout_urls        = ["http://localhost:3000", "http://localhost:3001", "http://localhost"]
  web_origins                = ["http://localhost:3000", "http://localhost:3001", "http://localhost"]
  token_endpoint_auth_method = "none"
  grant_types = [
    "authorization_code",
    "implicit",
    "password",
    "refresh_token"
  ]

  jwt_configuration {
    alg = "RS256"
  }
  refresh_token {
    leeway          = 0
    token_lifetime  = 2592000
    rotation_type   = "rotating"
    expiration_type = "expiring"
  }
}

resource "auth0_resource_server" "backend_api_app" {
  name                                            = "Backend API"
  identifier                                      = "backend-api-audience"
  signing_alg                                     = "RS256"
  allow_offline_access                            = true
  token_lifetime                                  = 86400
  skip_consent_for_verifiable_first_party_clients = true
  enforce_policies                                = true
  token_dialect                                   = "access_token_authz"

  scopes {
    value       = "read:own"
    description = "Read own records"
  }
  scopes {
    value       = "read:org"
    description = "Read all organisation records"
  }
  scopes {
    value       = "read:all"
    description = "Read all records in the system (Super power!)"
  }
  scopes {
    value       = "modify:own"
    description = "Modify own records"
  }
  scopes {
    value       = "modify:org"
    description = "Modify all organisation records"
  }
  scopes {
    value       = "modify:all"
    description = "Modify all records in the system (Super power!)"
  }
}

resource "auth0_role" "super_user_role" {
  name        = "SuperUserDeveloper"
  description = "This role is able to do everything"

  permissions {
    name                       = "read:own"
    resource_server_identifier = auth0_resource_server.backend_api_app.identifier
  }
  permissions {
    name                       = "read:org"
    resource_server_identifier = auth0_resource_server.backend_api_app.identifier
  }
  permissions {
    name                       = "read:all"
    resource_server_identifier = auth0_resource_server.backend_api_app.identifier
  }
  permissions {
    name                       = "modify:own"
    resource_server_identifier = auth0_resource_server.backend_api_app.identifier
  }
  permissions {
    name                       = "modify:org"
    resource_server_identifier = auth0_resource_server.backend_api_app.identifier
  }
  permissions {
    name                       = "modify:all"
    resource_server_identifier = auth0_resource_server.backend_api_app.identifier
  }
}

resource "auth0_user" "dev_test_basic_user" {
  connection_name = "Username-Password-Authentication"
  email           = "testbasic@testbasic.com"
  password        = "apasspass$12$12"
  nickname        = "testbasic"
  email_verified  = true
  given_name      = "Basic"
  family_name     = "User"
}

resource "auth0_user" "dev_test_no_email_verified_user" {
  connection_name = "Username-Password-Authentication"
  email           = "testbasic@testnoemailverified.com"
  password        = "apasspass$12$12"
  nickname        = "testbasic"
  email_verified  = false
  given_name      = "NoEmail"
  family_name     = "Verified"
}

resource "auth0_user" "dev_test_user" {
  connection_name = "Username-Password-Authentication"
  email           = "test@test.com"
  password        = "apasspass$12$12"
  nickname        = "testnick"
  given_name      = "Super"
  family_name     = "User"
  email_verified  = true
  roles           = [auth0_role.super_user_role.id]
}

output "auth0_client_id" {
  value = auth0_client.frontend_spa_app.client_id
}
output "app_auth0_dev_domain" {
  value = var.app_auth0_dev_domain
}
output "app_auth0_dev_management_client_id" {
  value = var.app_auth0_dev_management_client_id
}
output "app_auth0_dev_management_client_secret" {
  value     = var.app_auth0_dev_management_client_secret
  sensitive = true
}
output "auth0_client_secret" {
  value     = auth0_client.frontend_spa_app.client_secret
  sensitive = true
}
output "test_user_username" {
  value = auth0_user.dev_test_user.email
}
output "test_user_password" {
  value     = auth0_user.dev_test_user.password
  sensitive = true
}
output "test_user_basic_username" {
  value = auth0_user.dev_test_basic_user.email
}
output "test_user_basic_password" {
  value     = auth0_user.dev_test_basic_user.password
  sensitive = true
}
output "test_user_no_email_verified_username" {
  value = auth0_user.dev_test_no_email_verified_user.email
}
output "test_user_no_email_verified_password" {
  value     = auth0_user.dev_test_no_email_verified_user.password
  sensitive = true
}
