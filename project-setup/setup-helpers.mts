import chalk from "chalk";
import fs from "fs";
import dotenv from "dotenv";
import { promisify } from "util";
import { exec } from "child_process";
import * as globby from "globby";
import os from "os";

const execPromise = promisify(exec);

const swapEnvVars = (params: {
    from: string;
    to: string;
    replacementValues: { [key: string]: string };
}) => {
    console.log(
        chalk.magentaBright(
            `Setting envvars for ${params.to} from ${params.from}`
        )
    );
    const newEnvVars = readEnvVars(params.to, params.from);

    for (const [key, value] of Object.entries(params.replacementValues)) {
        newEnvVars[key] = value;
    }
    writeEnvVars(newEnvVars, params.to);
};
const readEnvVars = (envPath: string, envTemplatePath: string) => {
    if (!fs.existsSync(envPath)) {
        // copy .env.template to .env
        fs.copyFileSync(envTemplatePath, envPath);
    }
    const envVars = dotenv.parse(fs.readFileSync(envPath));
    return envVars;
};
const runTerraform = async (projectPath: string, commands: string[]) => {
    const tfResult = await execPromise(`terraform ${commands.join(" ")}`, {
        cwd: projectPath,
    });

    return tfResult;
};

const runPnpmInstall = async (projectPath: string, commands?: string[]) => {
    const tfResult = await execPromise(`pnpm install ${commands?.join(" ")}`, {
        cwd: projectPath,
    });

    return tfResult;
};

const writeTerraformVariables = (
    tfVarsPath: string,
    values: { [key: string]: string }
) => {
    let fileContents = "";
    for (const [key, value] of Object.entries(values)) {
        fileContents += `${key} = "${value}"${os.EOL}`;
    }
    // const fileContents = `app_auth0_dev_domain                   = "${answers.app_auth0_dev_domain}"
    //     app_auth0_dev_management_client_id     = "${answers.app_auth0_dev_management_client_id}"
    //     app_auth0_dev_management_client_secret = "${answers.app_auth0_dev_management_client_secret}"
    //     `;

    fs.writeFileSync(tfVarsPath, fileContents, { encoding: "utf8", flag: "w" });
};

const searchFilesForTextAndReplace = async (
    searchText: string,
    replaceText: string
) => {
    const files = await globby.globby(["**/*"], {
        dot: true,
        gitignore: true,
        ignore: [
            "node_modules/**/*",
            "dist/**/*",
            "project-setup/**/*",
            "yarn.lock",
        ],
    });
    files.forEach((file) => {
        const fileContents = fs.readFileSync(file, "utf8");

        if (fileContents.includes(searchText)) {
            const regex = new RegExp(searchText, "g");
            const newFileContents = fileContents.replace(regex, replaceText);
            fs.writeFileSync(file, newFileContents);
        }
    });
};

const writeEnvVars = (envVars: { [key: string]: string }, envPath: string) => {
    fs.writeFileSync(
        envPath,
        Object.keys(envVars)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map((key) => {
                if (envVars[key].includes(" ") || envVars[key].includes("#")) {
                    return `${key}="${envVars[key]}"`;
                }
                return `${key}=${envVars[key]}`;
            })
            .join(os.EOL)
    );
};

export {
    readEnvVars,
    runTerraform,
    searchFilesForTextAndReplace,
    swapEnvVars,
    writeTerraformVariables,
    writeEnvVars,
    runPnpmInstall,
};
