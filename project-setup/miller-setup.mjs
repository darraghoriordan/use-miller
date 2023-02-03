import * as inquirer from "inquirer";
import figlet from "figlet";
import fs from "fs";
import * as globby from "globby";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import dotenv from "dotenv";
import chalk from "chalk";
const execPromise = promisify(exec);

console.log(figlet.textSync("MillerWeb Dev Init"));
const pathDefault = process.cwd().split("/").pop();
const auth0DevTerraformVariablesPath =
    "./infrastructure/auth0-dev/terraform.tfvars";

console.log(`Hi and welcome to the Miller / Web project setup!`);

// try to read the default projectName from a file /project-setup/project-name.txt
let defaultProjectName = "Miller App";

if (fs.existsSync("./project-setup/project-name.txt")) {
    defaultProjectName = fs.readFileSync(
        "./project-setup/project-name.txt",
        "utf8"
    );
}

inquirer.default
    .prompt([
        {
            name: "projectName",
            default: defaultProjectName,
            validate: (input) => {
                console.log(input);
                if (input.length < 1) {
                    return "Please enter a value";
                }

                return true;
            },
        },
    ])
    .then(async (answers) => {
        console.info(`${os.EOL}Setting name to: `, typeof answers.projectName);
        // write the project name to a file so it can be read by other scripts
        fs.writeFileSync(
            "./project-setup/project-name.txt",
            answers.projectName
        );
        const snakeCaseName = answers.projectName
            .toLowerCase()
            .replace(" ", "-");
        const underscoreCaseName = answers.projectName
            .toLowerCase()
            .replace(" ", "_");

        console.info(
            `${os.EOL}Setting project names to: ${answers.projectName}, ${snakeCaseName}, ${underscoreCaseName}`
        );

        await searchFilesForTextAndReplace("path-template", snakeCaseName);

        console.log(
            `${os.EOL}=====================================================`
        );
        console.log(
            `${os.EOL}Next create a new auth0 tenant and management account${os.EOL}`
        );
        console.log(
            `1. Go to https://auth0.com and signup. Create a new development tenant and call it '${answers.projectName}-dev' for example.${os.EOL}`
        );
        console.log(
            `2. Go to the dashboard and click on 'Applications' in the left menu. Click on 'Create Application' and select 'Machine to Machine Applications'. Give it a name and click 'Create'.${os.EOL}`
        );
        console.log(
            `3. Give the application a name like "Terraform Management Account" and click 'Create'.${os.EOL}`
        );
        console.log(
            `There are detailed instructions for this at https://registry.terraform.io/providers/auth0/auth0/latest/docs/guides/quickstart (you only need the first "Create a Machine to Machine Application" section)${os.EOL}`
        );
        console.log(
            `=====================================================${os.EOL}`
        );
        const unknownStateVariables = {
            app_auth0_dev_domain: { value: "myapp.au.auth0.com" },
            app_auth0_dev_management_client_id: { value: "ASSAunknown" },
            app_auth0_dev_management_client_secret: { value: "WWSDFunknown" },
        };
        // set a default value for the auth0 variables if they don't exist
        if (!fs.existsSync(auth0DevTerraformVariablesPath)) {
            writeAuth0DevTerraformVars({
                app_auth0_dev_domain:
                    unknownStateVariables.app_auth0_dev_domain.value,
                app_auth0_dev_management_client_id:
                    unknownStateVariables.app_auth0_dev_management_client_id
                        .value,
                app_auth0_dev_management_client_secret:
                    unknownStateVariables.app_auth0_dev_management_client_secret
                        .value,
            });
        }

        // on the first run of this script, the auth0 variables won't be output
        let existingVariableValues = {};

        const initOutput = await runTerraform(["init"]);
        const variables = await runTerraform(["output -json"]);

        existingVariableValues = JSON.parse(variables.stdout || "{}");
        if (!existingVariableValues.app_auth0_dev_domain) {
            existingVariableValues = unknownStateVariables;
        }

        inquirer.default
            .prompt([
                {
                    name: "app_auth0_dev_domain",
                    default: existingVariableValues.app_auth0_dev_domain.value,
                    validate: (input) => {
                        console.log(input);
                        if (input.length < 1) {
                            return 'Enter the domain for the management application you created in auth0 - don\'t add http://. e.g. "myappdev.au.auth0.com"';
                        }
                        if (input.includes(" ")) {
                            return "Cannot contain spaces";
                        }
                        return true;
                    },
                },
                {
                    name: "app_auth0_dev_management_client_id",
                    default:
                        existingVariableValues
                            .app_auth0_dev_management_client_id.value,
                    validate: (input) => {
                        console.log(input);
                        if (input.length < 1) {
                            return "Enter the client ID for the management application you created in auth0. e.g. VrTDdwsq...";
                        }
                        if (input.includes(" ")) {
                            return "Cannot contain spaces";
                        }
                        return true;
                    },
                },
                {
                    name: "app_auth0_dev_management_client_secret",
                    default:
                        existingVariableValues
                            .app_auth0_dev_management_client_secret.value,
                    validate: (input) => {
                        console.log(input);
                        if (input.length < 1) {
                            return "Enter the client secret for the management application you created in auth0.";
                        }
                        if (input.includes(" ")) {
                            return "Cannot contain spaces";
                        }
                        return true;
                    },
                },
            ])
            .then(async (auth0SectionAnswers) => {
                writeAuth0DevTerraformVars(auth0SectionAnswers);
                // apply the new infrastructure
                const result = await runTerraform(["apply", "-auto-approve"]);
                console.log(result.stdout);
                console.error(result.stderr);

                const variables = await runTerraform(["output -json"]);

                const variableValues = JSON.parse(variables.stdout || "{}");
                console.log(
                    chalk.magentaBright("Auth0 dev created successfully.")
                );
                // write FE env vars
                const frontendEnvVars = readEnvVars(
                    "apps/frontend/.env",
                    "apps/frontend/.env.template"
                );
                frontendEnvVars.VITE_AUTH0_DOMAIN =
                    variableValues.app_auth0_dev_domain.value;
                frontendEnvVars.VITE_AUTH0_CLIENT_ID =
                    variableValues.auth0_client_id.value;
                writeEnvVars(frontendEnvVars, "apps/frontend/.env");
                console.log(
                    chalk.magentaBright(
                        "Wrote auth0 account env vars to .env for app frontend"
                    )
                );
                // write BE env vars
                const beEnvVars = readEnvVars(
                    "apps/backend/.env",
                    "apps/backend/.env.template"
                );
                beEnvVars.AUTH0_DOMAIN =
                    variableValues.app_auth0_dev_domain.value;
                beEnvVars.COMPOSE_PROJECT_NAME = underscoreCaseName;
                beEnvVars.APP_POSTGRES_PORT = `54${Math.floor(
                    Math.random() * 100
                )}`;
                beEnvVars.APP_REDIS_PORT = `63${Math.floor(
                    Math.random() * 100
                )}`;
                beEnvVars.APP_POSTGRES_DATABASE = `${answers.projectName
                    .toLowerCase()
                    .replace(" ", "")}db`;
                beEnvVars.APP_TITLE = `${answers.projectName} BE`;
                beEnvVars.EMAIL_SENDER_NAME = `${answers.projectName}`;
                writeEnvVars(beEnvVars, "apps/backend/.env");
                console.log(
                    chalk.magentaBright(
                        "Wrote auth0 account env vars to .env for app backend"
                    )
                );

                // write BE e2e tests env vars
                const e2eEnvVars = readEnvVars(
                    "apps/backend-e2e/.env",
                    "apps/backend-e2e/.env.template"
                );
                e2eEnvVars.AUTH0_DOMAIN =
                    variableValues.app_auth0_dev_domain.value;
                e2eEnvVars.AUTH0_CLIENT_ID =
                    variableValues.auth0_client_id.value;
                e2eEnvVars.AUTH0_CLIENT_SECRET =
                    variableValues.auth0_client_secret.value;
                e2eEnvVars.AUTH0_TEST_ACCOUNT_USERNAME =
                    variableValues.test_user_username.value;
                e2eEnvVars.AUTH0_TEST_ACCOUNT_PASSWORD =
                    variableValues.test_user_password.value;
                writeEnvVars(e2eEnvVars, "apps/backend-e2e/.env");

                console.log(
                    chalk.magentaBright(
                        "Wrote auth0 account env vars to .env for app backend-e2e"
                    )
                );

                console.log(
                    "Setup complete. You have a configured auth0 instance for dev, the application has been configured with your auth0 details"
                );
                console.log(
                    "The application has been configured with the name of your app and all env variables are configured"
                );
                console.log(
                    "You don't have to run this script again, you can work with env vars and terraform directly."
                );
                console.log(
                    "You can now run 'yarn mill:dev' to run the app locally."
                );
            });
    });

const readEnvVars = (envPath, envTemplatePath) => {
    if (!fs.existsSync(envPath)) {
        // copy .env.template to .env
        fs.copyFileSync(envTemplatePath, envPath);
    }
    const envVars = dotenv.parse(fs.readFileSync(envPath));
    return envVars;
};
const runTerraform = async (commands) => {
    const tfResult = await execPromise(`terraform ${commands.join(" ")}`, {
        cwd: "./infrastructure/auth0-dev",
    });

    return tfResult;
};

const writeAuth0DevTerraformVars = (answers) => {
    const fileContents = `app_auth0_dev_domain                   = "${answers.app_auth0_dev_domain}"
        app_auth0_dev_management_client_id     = "${answers.app_auth0_dev_management_client_id}"
        app_auth0_dev_management_client_secret = "${answers.app_auth0_dev_management_client_secret}"
        `;

    fs.writeFileSync(
        "./infrastructure/auth0-dev/terraform.tfvars",
        fileContents,
        { encoding: "utf8", flag: "w" }
    );
};

const searchFilesForTextAndReplace = async (searchText, replaceText) => {
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
            const newFileContents = fileContents.replace(
                searchText,
                replaceText
            );
            fs.writeFileSync(file, newFileContents);
        }
    });
};

function writeEnvVars(envVars, envPath) {
    fs.writeFileSync(
        envPath,
        Object.keys(envVars)
            .map((key) => {
                if (envVars[key].includes(" ") || envVars[key].includes("#")) {
                    return `${key}="${envVars[key]}"`;
                }
                return `${key}=${envVars[key]}`;
            })
            .join(os.EOL)
    );
}
