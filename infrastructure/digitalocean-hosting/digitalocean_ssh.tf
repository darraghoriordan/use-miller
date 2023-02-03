resource "digitalocean_ssh_key" "path_template_ssh" {
  name       = "miller-app-ssh"
  public_key = file(var.do_ssh_path)
}
