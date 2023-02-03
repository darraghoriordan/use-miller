resource "digitalocean_droplet" "do_droplet" {
  name      = "miller-app-dokku"
  region    = "sfo3"
  tags      = ["miller-app"]
  count     = "1"
  image     = "dokku-20-04"
  size      = "s-1vcpu-1gb"
  ssh_keys  = [digitalocean_ssh_key.path_template_ssh.fingerprint]
  user_data = <<EOF
		#!/bin/bash
		apt-get update && apt-get upgrade -qq -y
		dokku-upgrade run
        dokku version
        echo "Don't forget to visit your new container in a web browser right away!!"
        echo "-----------------------"
        echo "https://$(curl -s ifconfig.me)"
        echo "-----------------------"
        echo "↑↑↑↑↑↑↑↑↑↑↑↑↑"
	EOF
}
