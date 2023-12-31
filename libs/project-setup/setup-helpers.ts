import chalk from "chalk";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { promisify } from "util";
import { exec } from "child_process";
import * as globby from "globby";
import * as os from "os";

const execPromise = promisify(exec);

const swapEnvVars = (params: {
    from: string;
    to: string;
    replacementValues: { [key: string]: string };
}) => {
    console.log(
        chalk.magentaBright(
            `Setting envvars for ${params.to} from ${params.from}`,
        ),
    );
    const newEnvVars = initialiseAndReadEnvVars(params.to, params.from);

    for (const [key, value] of Object.entries(params.replacementValues)) {
        newEnvVars[key] = value;
    }
    writeEnvVars(newEnvVars, params.to);
};
const initialiseAndReadEnvVars = (envPath: string, envTemplatePath: string) => {
    // copy .env.template to .env if it doesn't exist
    if (!fs.existsSync(envPath)) {
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

const runPnpmInstall = async (projectRootPath: string, commands?: string[]) => {
    const command = `pnpm install ${commands?.join(" ")}`;
    console.log("re-installing dependencies with new names", {
        command,
        cwd: projectRootPath,
    });
    const tfResult = await execPromise(command, {
        cwd: projectRootPath,
    });

    return tfResult;
};

const writeTerraformVariables = (
    tfVarsPath: string,
    values: { [key: string]: string },
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
    replacePatterns: {
        search: string;
        replace: string;
    }[],
) => {
    const files = await globby.globby(["**/*"], {
        dot: true,
        gitignore: true,
        ignore: [
            "*.png",
            "*.jpg",
            "*.jpeg",
            "*.gif",
            "*.svg",
            "*.ico",
            ".git/**/*",
            "node_modules/**/*",
            "dist/**/*",
            "libs/project-setup/**/*",
            "yarn.lock",
        ],
    });
    files.forEach((file) => {
        const fileContents = fs.readFileSync(file, "utf8");
        for (const { search, replace } of replacePatterns) {
            const regex = new RegExp(search, "g");
            if (!regex.test(fileContents)) {
                continue;
            }
            const newFileContents = fileContents.replace(regex, replace);
            console.log(`replacing ${search} with ${replace} in ${file}`);
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
            .join(os.EOL),
    );
};

export {
    initialiseAndReadEnvVars as readEnvVars,
    runTerraform,
    searchFilesForTextAndReplace,
    swapEnvVars,
    writeTerraformVariables,
    writeEnvVars,
    runPnpmInstall,
};
