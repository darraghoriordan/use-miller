resource "stripe_product" "miller_start_product" {
  name                 = "Miller Start"
  description          = "Web product kit with 1 year of updates"
  shippable            = false
  active               = true
  statement_descriptor = "USEMILLER.DEV"
  metadata = {
    internalSku = "miller-start"
  }
}

resource "stripe_price" "miller_start_price" {
  product     = stripe_product.miller_start_product.id
  unit_amount = 24900
  currency    = "usd"
  recurring {
    interval       = "year"
    interval_count = 1
    usage_type     = "licensed"
  }
  billing_scheme = "per_unit"
  tax_behaviour  = "inclusive"
}

resource "stripe_product" "product_with_consult" {
  name                 = "Miller Start Consulting"
  description          = "Web product kit, 1 year of updates, 8h of consulting"
  shippable            = false
  active               = true
  statement_descriptor = "USEMILLER.DEV"
  metadata = {
    internalSku = "miller-start-consulting"
  }
}

resource "stripe_price" "miller_start_consult_price" {
  product     = stripe_product.product_with_consult.id
  unit_amount = 164900
  currency    = "usd"
  recurring {
    interval       = "year"
    interval_count = 1
    usage_type     = "licensed"
  }
  billing_scheme = "per_unit"
  tax_behaviour  = "inclusive"
}

resource "stripe_product" "dev_shell_product" {
  name                 = "Miller Dev Shell"
  description          = "Premium setup and configuration for your terminal"
  shippable            = false
  active               = true
  statement_descriptor = "USEMILLER.DEV"
  metadata = {
    internalSku = "dev-shell"
  }
}

resource "stripe_price" "dev_shell_price" {
  product        = stripe_product.dev_shell_product.id
  unit_amount    = 2900
  currency       = "usd"
  billing_scheme = "per_unit"
  tax_behaviour  = "inclusive"
}
resource "stripe_webhook_endpoint" "webhook_endpoint" {
  url      = var.app_stripe_webhook_url
  disabled = false
  enabled_events = [
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
    "checkout.session.async_payment_failed",
    "charge.succeeded",
    "payment_intent.succeeded",
    "payment_intent.created",
    "invoice.paid",
    "customer.subscription.trial_will_end",
    "invoice.payment_failed",
    "customer.subscription.created",
    "customer.subscription.deleted",
    "customer.subscription.updated",
  ]
}

resource "stripe_portal_configuration" "portal_configuration" {
  business_profile {
    headline             = var.app_stripe_customer_portal_header
    privacy_policy_url   = var.app_stripe_customer_portal_privacy_url
    terms_of_service_url = var.app_stripe_customer_portal_terms_conditions_url
  }
  default_return_url = var.app_stripe_customer_portal_return_url
  features {
    customer_update {
      enabled         = true
      allowed_updates = ["email", "address", "shipping", "phone", "tax_id"]
    }
    invoice_history {
      enabled = true
    }
    payment_method_update {
      enabled = true
    }
    subscription_cancel {
      enabled = true
      cancellation_reason {
        enabled = true
        options = ["too_expensive", "missing_features", "switched_service", "unused", "customer_service", "too_complex", "low_quality", "other"]
      }
      mode               = "at_period_end"
      proration_behavior = "none"
    }
    subscription_pause {
      enabled = true
    }
    subscription_update {
      enabled                 = true
      default_allowed_updates = ["price", "quantity", "promotion_code"]
      proration_behavior      = "none"
      products {
        product = stripe_product.miller_start_product.id
        prices  = [stripe_price.miller_start_price.id]
      }
    }
  }
}

output "miller_start_price_id" {
  value     = stripe_price.miller_start_price.id
  sensitive = false
}

output "miller_start_consult_price_id" {
  value     = stripe_price.miller_start_consult_price.id
  sensitive = false
}

output "dev_shell_price_id" {
  value     = stripe_price.dev_shell_price.id
  sensitive = false
}
output "app_stripe_webhook_verification_key" {
  value     = stripe_webhook_endpoint.webhook_endpoint.secret
  sensitive = true
}

output "app_stripe_api_token" {
  value     = var.app_stripe_api_token
  sensitive = true
}

# we output all the variables so that we can restore them from the state store
output "app_stripe_customer_portal_header" {
  value     = var.app_stripe_customer_portal_header
  sensitive = true
}
output "app_stripe_webhook_url" {
  value     = var.app_stripe_webhook_url
  sensitive = true
}
output "app_stripe_customer_portal_privacy_url" {
  value     = var.app_stripe_customer_portal_privacy_url
  sensitive = true
}
output "app_stripe_customer_portal_terms_conditions_url" {
  value     = var.app_stripe_customer_portal_terms_conditions_url
  sensitive = true
}
output "app_stripe_customer_portal_return_url" {
  value     = var.app_stripe_customer_portal_return_url
  sensitive = true
}
