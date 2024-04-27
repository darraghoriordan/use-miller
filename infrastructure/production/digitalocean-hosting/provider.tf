terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.37.1"
    }
  }

  # This stores the terraform state on a shared s3 bucket or digital oceans space
  # You don't really need this if you're a solo dev so it is commented out.
  # If you're running terraform as part of a pipeline or similar or When you're 
  # ready you can create a digital ocean spaces account or an AWS s3 bucket 
  # and store your terraform state there safely by doing a terraform init again
  backend "s3" {
    endpoint                    = "https://sfo3.digitaloceanspaces.com/"
    bucket                      = "darragh-com"
    key                         = "miller-app-terraform-state/digitalocean-hosting"
    region                      = "us-east-1"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    profile                     = "digitaloceanspaces-terraform"
  }
  # End of shared state store block

}

variable "do_token" {
  type        = string
  sensitive   = true
  description = "Your digital ocean api key"
}

variable "do_ssh_path" {
  type        = string
  description = "The path to an ssh certificate to use for droplets"
}

provider "digitalocean" {
  token = var.do_token
}
