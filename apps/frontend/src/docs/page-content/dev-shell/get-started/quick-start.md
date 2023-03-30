---
title: "Quick Start"
date: "2020-01-01"
order: 1
---

## MacOS Quick Start

1. Download the source code.
1. Delete `.github` and `buildTools` folders.
1. Run the `home/setupscripts/sharedSetup.sh` script from the `setupscripts` directory to set up everything. This is script works on Windows and MacOS. It will detect the OS automatically. You must run it while in the `setupscripts` folder.

## Windows Quick Start

1. Download the source code.
1. Delete `.github` and `buildTools` folders.
1. Install WSL2 and Ubuntu (or your preferred Linux distro but note that the scripts use apt-get).
1. Run the `home/setupscripts/sharedSetup.sh` script from the `setupscripts` directory to set up everything. This is script works on Windows and MacOS. It will detect the OS automatically. You must run it while in the `setupscripts` folder.

## Additional Setup

Edit anything you like to suit your needs.

There are readme files in various folders describing some of the files you can change.

You can populate the `/certs` directory to have ssh certs installed for you.

You should commit to your own private repo and manage with homeshick.

Read more in the full docs.
