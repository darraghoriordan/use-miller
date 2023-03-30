---
title: "Installation"
date: "2020-01-01"
order: 2
---

## Overview

This is a set of scripts to configure a \*nix computer.

It will work on MacOS or WSL.

However - These scripts are designed for NEW machines. If you try to install it on an existing machine there might be conflict issues where I use brew and your existing install is another method for example.

Please hit me up [on Twitter](https://twitter.com/darraghor) if you have any concerns.

## What the setup scripts will do

The setup scripts will perform the following:

-   install rosetta
-   install XCode command line tools
-   install homebrew
-   install 60 tools and apps that i use from homebrew
-   install nvm
-   assign all text-like files to vscode
-   heaps of updates to default OS operation such as
    -   Display full POSIX path as Finder window title
    -   Keep folders on top when sorting by name
    -   Avoid creating .DS_Store files on network or USB volumes
    -   Enable snap-to-grid for icons on the desktop and in other icon views
    -   Finder: show all filename extensions
    -   Save to disk (not to iCloud) by default
    -   Disable the warning when changing a file extension
    -   Prevent Photos from opening automatically when devices are plugged in
-   setup github
-   set you dns to use google dns
-   set difftool to bcompare
-   install the pure terminal prompt
-   install the "Hack" nerd font
-   install latest version of zsh
-   install oh my zsh
-   write my preferred oh my zsh configuration and aliases with antigen
-   use homeshick to manage dotfiles
-   add docker local url to hosts
-   install vscode settings and extensions
-   symlink brew java for macos
-   clone my personal repositories from github
-   post a bunch of reminders for manual steps to take to finish configuring the computer

Scripts are inspired by this and others: https://github.com/mathiasbynens/dotfiles/blob/main/.macos

## Preparation steps for a brand new Mac

1. OPTIONAL: Setup your default web browser manually
1. On newer versions of MacOS you have to give your terminal application "Full Disk Access" in the privacy section of system preferences before starting. Click `apple icon > System Preferences > Security & Privacy > Full Disk Access`. Click the + and add `Applications/Utilities/Terminal`. You will be asked for your password.
1. Review the list of software that will be installed in `brew.sh`. Most of the terminal apps are needed for scripts and aliases. I recommended leaving those in place. Delete or add any of the GUI applications ("casks") as you like. It installs Github copilot but you might not want that so comment it out.

## Preparation steps on a brand new Windows WSL2 machine

1. For WSL you need to have WSL 2+ and Ubuntu installed. See Microsoft's instructions on how t setup WSL 2+.

## OPTIONAL Preparation steps to run the script

1. OPTIONAL: If you put your certs and config file in the `setupscripts/certs` folder before running `setupscripts/sharedSetup.sh` they will be put in "~/.ssh" for you. If this folder is empty we will only try to create the `~/.ssh` folder for you and you can put your certs in later. It goes without saying, do not ever put your ssh certs in github.
1. OPTIONAL: You can add a list of github repos to clone in the `cloneRepos.sh` file. These will be cloned after installing your certs so you can use ssh github endpoints. You will be asked for your password(s) for the ssh certs.

## Running the script

1. Run the `home/setupscripts/sharedSetup.sh` script from the `setupscripts` directory to set up everything. This is script works on Windows and MacOS. It will detect the OS automatically. You must run it while in the `setupscripts` folder.
   e.g. `cd home/setupscripts && ./sharedSetup.sh`
   If you try to run the script from outside of this folder some of the references to other scripts may break.
1. You will be asked for your github email and username as part of the setup. This is for configuring the global git user
1. On MacOS If the script is failing you might need to `chmod +x sharedSetup.sh`. Alternatively you might need to remove the quarantine - `xattr -d com.apple.quarantine /PATH/TO/SCRIPTYOUCANTRUN.sh` for each script.

## Now setup your terminal!

1. Run `homeshick clone git@yourSshAlias:your/githubrepo.git`. This is the repo with the files from this pack that you created in step 1 of this file.
1. It should ask you to link your dotfiles if it's the first time running so press `y`.
1. Get a new terminal, restart the terminal or you could open iterm now. Antigen should start installing plugins.
1. You should set the font for the terminal to "Hack Nerd Font" or "Hack" font family so that icons work as expected.

## After installing

1. I print out a list of suggested manual steps after the scripts have run. You don't have to do these but they are reminders for things that I usually do!
1. Any of the GUI apps installed with brew will need to be opened once in MacOS to "allow running downloaded apps" before they will get indexed in finder or Alfred - I usually go through all of them in one go and open them.
1. Docker desktop seems to be better when installed from the download on the docker site - https://docs.docker.com/get-docker/
1. Microsoft One Note is the same. Better to get from the site than from homebrew - https://www.onenote.com/download
1. I use beyond compare as a visual diff tool for git, but it requires a licence. You can change git to use any visual difftool you like with the following commands, but replacing bc3 with your preference.

```shell
git config --global diff.tool bc3
git config --global difftool.bc3.trustExitCode true
git config --global merge.tool bc3
git config --global mergetool.bc3.trustExitCode true
```

## Custom commands and aliases

You can use `brewall` on Mac to update everything on the system at once. It will pull from homeshick, update brew packages and update zsh plugins with antigen. All in one command.

`ch` uses fzf to search chrome history

`gcob` uses fzf to checkout a git branch

`fe` to find and edit a file
`ff` to find a file
`fd` to find and enter a directory

`killp <port>` kills any app on a port
`listp` to list all tcp using processes

`stealfolder` to take ownership of a path

All the commands in https://github.com/unixorn/git-extra-commands are available
