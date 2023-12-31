resource "auth0_tenant" "prod_tenant" {
  friendly_name     = "Use Miller Dev Tools"
  default_directory = "Username-Password-Authentication"
}

resource "auth0_client" "frontend_spa_app" {
  name        = "Frontend App"
  description = "The frontend client application"
  app_type    = "spa"
  callbacks = ["https://usemiller.dev",
    "https://usemiller.dev/api/auth/callback",
    "https://usemiller.dev/#pricing",
    "https://usemiller.dev/dashboard",
    "https://usemiller.dev/miller-start/#pricing",
    "https://usemiller.dev/dev-shell/#pricing",
  ]
  oidc_conformant     = true
  allowed_origins     = ["https://usemiller.dev", "https://www.usemiller.dev"]
  allowed_logout_urls = ["https://usemiller.dev", "https://www.usemiller.dev"]
  web_origins         = ["https://usemiller.dev", "https://www.usemiller.dev"]

  grant_types = [
    "authorization_code",
    "implicit",
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
resource "auth0_client_credentials" "fe_spa_client_credentials" {
  client_id = auth0_client.frontend_spa_app.id

  authentication_method = "none"
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


}
resource "auth0_resource_server_scopes" "backend_api_app_scopes" {
  resource_server_identifier = auth0_resource_server.backend_api_app.identifier


  scopes {
    name        = "read:own"
    description = "Read own records"
  }
  scopes {
    name        = "read:org"
    description = "Read all organisation records"
  }
  scopes {
    name        = "read:all"
    description = "Read all records in the system (Super power!)"
  }
  scopes {
    name        = "modify:own"
    description = "Modify own records"
  }
  scopes {
    name        = "modify:org"
    description = "Modify all organisation records"
  }
  scopes {
    name        = "modify:all"
    description = "Modify all records in the system (Super power!)"
  }
}
resource "auth0_role" "super_user_role" {
  name        = "SuperUserDeveloper"
  description = "This role is able to do everything"


}

resource "auth0_role_permissions" "backend_api_app_role_permissions" {
  role_id = auth0_role.super_user_role.id
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

output "auth0_client_id" {
  value = auth0_client.frontend_spa_app.client_id
}
output "app_auth0_prod_domain" {
  value = var.app_auth0_domain
}
output "app_auth0_prod_management_client_id" {
  value = var.app_auth0_management_client_id
}
output "app_auth0_prod_management_client_secret" {
  value     = var.app_auth0_management_client_secret
  sensitive = true
}
output "auth0_client_secret" {
  value     = auth0_client_credentials.fe_spa_client_credentials.client_secret
  sensitive = true
}
