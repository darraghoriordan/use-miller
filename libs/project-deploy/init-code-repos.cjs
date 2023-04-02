#!/usr/bin/env node
const fs = require("fs");
const util = require("util");
const child_process = require("child_process");
const rimraf = require("rimraf");
const exec = util.promisify(child_process.exec);

async function main() {
    try {
        await exec(
            "cd code-repos && git clone git@" +
                process.argv[2] +
                ":darraghoriordan/nest-backend-libs.git --depth 1"
        );
        await exec(
            "cd code-repos && git clone git@" +
                process.argv[2] +
                ":darraghoriordan/mac-setup-script.git --depth 1"
        );
        await exec(
            "cd code-repos && git clone git@" +
                process.argv[2] +
                ":darraghoriordan/use-miller.git --depth 1"
        );
        rimraf.sync("code-repos/nest-backend-libs/.git");
        rimraf.sync("code-repos/mac-setup-script/.git");
        rimraf.sync("code-repos/use-miller/.git");
        console.log("Done!");
    } catch (error) {
        console.error(`exec error: ${error}`);
    }
}

if (!fs.existsSync("code-repos")) {
    fs.mkdirSync("code-repos");
}

main();
