# Project Setup

This directory contains the scripts and configuration files used to set up a new Miller project.

When you run `pnpm run mill:init` you're running a transpiled `miller-setup.ts` with node. This script will ask you a series of questions with some guidance and then create a new project for you.

When the project is setup the script will run Auth0 terraform and Stripe terraform.

The script will parse the output of terraform and write it to relevant env vars in all the projects.
