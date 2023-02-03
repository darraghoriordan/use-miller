output "do_droplet_url" {
  description = "You must visit the url of the dokku droplet to finish configuration"
  value       = "http://${digitalocean_droplet.do_droplet[0].ipv4_address}/"
}

output "do_all_droplets_url" {
  description = "View all droplets here"
  value       = "https://cloud.digitalocean.com/droplets"
}
