import * as inquirer from "inquirer";
import figlet from "figlet";
import fs from "fs";
import os from "os";
import chalk from "chalk";
import {
    runPnpmInstall,
    searchFilesForTextAndReplace,
    swapEnvVars,
} from "./setup-helpers.js";
import runTfEnvVarMapping, {
    TerraformVariablesMapperParams,
} from "./setup-terraform-project.js";

export type Auth0DevTerraformInputVariables = {
    app_auth0_dev_domain: { value: string };
    app_auth0_dev_management_client_id: { value: string };
    app_auth0_dev_management_client_secret: { value: string };
};
export type Auth0DevTerraformOutputVariables = {
    auth0_client_id: { value: string };
    app_auth0_dev_domain: { value: string };
    app_auth0_dev_management_client_id: { value: string };
    app_auth0_dev_management_client_secret: { value: string };
    auth0_client_secret: { value: string };
    test_user_username: { value: string };
    test_user_password: { value: string };
    test_user_basic_username: { value: string };
    test_user_basic_password: { value: string };
    test_user_no_email_verified_username: { value: string };
    test_user_no_email_verified_password: { value: string };
    next_app_auth0_secret: { value: string };
};

export type StripeTerraformInputVariables = {
    app_stripe_api_token: { value: string };
    app_stripe_customer_portal_privacy_url: { value: string };
    app_stripe_customer_portal_header: { value: string };
    app_stripe_customer_portal_terms_conditions_url: { value: string };
    app_stripe_customer_portal_return_url: { value: string };
    app_stripe_webhook_url: { value: string };
    app_stripe_webhook_verification_key: { value: string };
};
export type StripeTerraformOutputVariables = {
    regular_price_id: { value: string };
    app_stripe_webhook_verification_key: { value: string };
    app_stripe_api_token: { value: string };
};

console.log(figlet.textSync("Miller/Web"));

console.log(`Hi and welcome to the Miller / Web project setup!`);

// try to read the default projectName from a file /project-setup/project-name.txt
let defaultProjectName = "Miller App";

if (fs.existsSync("./libs/project-setup/project-name.txt")) {
    defaultProjectName = fs.readFileSync(
        "./libs/project-setup/project-name.txt",
        "utf8"
    );
}

const answers = await inquirer.default.prompt([
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
]);

// write the project name to a file so it can be read by other scripts
fs.writeFileSync("./libs/project-setup/project-name.txt", answers.projectName);
const snakeCaseName = answers.projectName.toLowerCase().replace(" ", "-");
const underscoreCaseName = answers.projectName.toLowerCase().replace(" ", "_");

console.info(
    `${os.EOL}Using project name(s): ${answers.projectName}, ${snakeCaseName}, ${underscoreCaseName}`
);

await searchFilesForTextAndReplace("use-miller", snakeCaseName);
// -------------

const auth0TfRunParams: TerraformVariablesMapperParams<Auth0DevTerraformInputVariables> =
    {
        terraformVariablesPath:
            "./infrastructure/local-dev/auth0-dev/terraform.tfvars",
        terraformProjectPath: "./infrastructure/local-dev/auth0-dev",
        introText: `${
            os.EOL
        }=====================================================${os.EOL}${
            os.EOL
        }Next create a new dev ${chalk.magenta(
            "https://auth0.com"
        )} tenant account and add a management API to it.${
            os.EOL
        }There are detailed instructions for this at ${chalk.magenta(
            "https://registry.terraform.io/providers/auth0/auth0/latest/docs/guides/quickstart"
        )} (you only need the first "Create a Machine to Machine Application" section)${
            os.EOL
        }Enter the values from the tenant and management API below ${
            os.EOL
        }=====================================================${os.EOL}`,
        variables: [
            {
                name: "app_auth0_dev_domain",
                default: "myapp.au.auth0.com",
                validate: (input: any) => {
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
                default: "ABC123",
                validate: (input: any) => {
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
                default: "someSecret1234",
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
        ],
    };
const auth0DevTerraformOutputVariables = await runTfEnvVarMapping<
    Auth0DevTerraformInputVariables,
    Auth0DevTerraformOutputVariables
>(auth0TfRunParams);

// --------------------

const stripeTfRunParams: TerraformVariablesMapperParams<StripeTerraformInputVariables> =
    {
        terraformVariablesPath:
            "./infrastructure/local-dev/stripe-dev/terraform.tfvars",
        terraformProjectPath: "./infrastructure/local-dev/stripe-dev",
        introText: `${
            os.EOL
        }=====================================================${os.EOL}${
            os.EOL
        }Next create a new ${chalk.magenta(
            "https://stripe.com"
        )} account and retrieve an api key and a webhook validation key.${
            os.EOL
        }There are detailed instructions for this ${chalk.magenta(
            "in the README"
        )}${os.EOL}Enter the values from Stripe below${
            os.EOL
        }=====================================================${os.EOL}`,
        variables: [
            {
                name: "app_stripe_api_token",
                default: "sk_...",
                validate: (input: any) => {
                    console.log(input);
                    if (input.length < 1) {
                        return "Enter the api token for the stripe account";
                    }
                    if (input.includes(" ")) {
                        return "Cannot contain spaces";
                    }
                    return true;
                },
            },
            {
                name: "app_stripe_webhook_verification_key",
                default: "whsec_123...",
                validate: (input: any) => {
                    console.log(input);
                    if (input.length < 1) {
                        return "Enter the webhook url for the stripe account (default is probably ok)";
                    }
                    if (input.includes(" ")) {
                        return "Cannot contain spaces";
                    }
                    return true;
                },
            },
            {
                name: "app_stripe_webhook_url",
                default:
                    "http://localhost:34522/payments/stripe/webhook-receiver",
                validate: (input: any) => {
                    console.log(input);
                    if (input.length < 1) {
                        return "Enter the webhook url for the stripe account (default is probably ok)";
                    }
                    if (input.includes(" ")) {
                        return "Cannot contain spaces";
                    }
                    return true;
                },
            },
            {
                name: "app_stripe_customer_portal_header",
                default: "Use Miller Billing",
                validate: (input) => {
                    console.log(input);
                    if (input.length < 1) {
                        return "Enter the title for the customer portal header";
                    }
                    return true;
                },
            },
            {
                name: "app_stripe_customer_portal_privacy_url",
                default: "http://localhost:3000/privacy",
                validate: (input) => {
                    console.log(input);
                    if (input.length < 1) {
                        return "Enter the privacy policy url for your site";
                    }
                    if (input.includes(" ")) {
                        return "Cannot contain spaces";
                    }
                    return true;
                },
            },

            {
                name: "app_stripe_customer_portal_terms_conditions_url",
                default: "http://localhost:3000/termsconditions",
                validate: (input) => {
                    console.log(input);
                    if (input.length < 1) {
                        return "Enter the terms and conditions url for your site";
                    }
                    if (input.includes(" ")) {
                        return "Cannot contain spaces";
                    }
                    return true;
                },
            },
            {
                name: "app_stripe_customer_portal_return_url",
                default: "http://localhost:3001/profile",
                validate: (input) => {
                    console.log(input);
                    if (input.length < 1) {
                        return "Enter the return url for the customer portal";
                    }
                    if (input.includes(" ")) {
                        return "Cannot contain spaces";
                    }
                    return true;
                },
            },
        ],
    };
const stripeTerraformOutputVariables = await runTfEnvVarMapping<
    StripeTerraformInputVariables,
    StripeTerraformOutputVariables
>(stripeTfRunParams);

// --------------------
swapEnvVars({
    from: "apps/frontend/.env.template",
    to: "apps/frontend/.env",
    replacementValues: {
        VITE_AUTH0_DOMAIN:
            auth0DevTerraformOutputVariables.app_auth0_dev_domain.value,
        VITE_AUTH0_CLIENT_ID:
            auth0DevTerraformOutputVariables.auth0_client_id.value,
        VITE_STRIPE_REGULAR_PRICE_ID:
            stripeTerraformOutputVariables.regular_price_id.value,
    },
});
swapEnvVars({
    from: "apps/marketing/.env.local.template",
    to: "apps/marketing/.env.local",
    replacementValues: {
        NEXT_PUBLIC_AUTH0_DOMAIN:
            auth0DevTerraformOutputVariables.app_auth0_dev_domain.value,
        NEXT_PUBLIC_AUTH0_CLIENT_ID:
            auth0DevTerraformOutputVariables.auth0_client_id.value,
        NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID:
            stripeTerraformOutputVariables.regular_price_id.value,

        AUTH0_SECRET:
            auth0DevTerraformOutputVariables.next_app_auth0_secret.value,
        AUTH0_ISSUER_BASE_URL: `https://${auth0DevTerraformOutputVariables.app_auth0_dev_domain.value}`,

        AUTH0_CLIENT_ID: auth0DevTerraformOutputVariables.auth0_client_id.value,
        AUTH0_CLIENT_SECRET:
            auth0DevTerraformOutputVariables.auth0_client_secret.value,
    },
});
const redisPort = `63${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
)}`;

swapEnvVars({
    from: "apps/backend/.env.template",
    to: "apps/backend/.env",
    replacementValues: {
        AUTH0_DOMAIN:
            auth0DevTerraformOutputVariables.app_auth0_dev_domain.value,
        COMPOSE_PROJECT_NAME: underscoreCaseName,
        APP_POSTGRES_PORT: `54${Math.floor(Math.random() * 10)}${Math.floor(
            Math.random() * 10
        )}`,
        APP_REDIS_PORT: redisPort,
        REDIS_URL: `"redis://:redis-pass@host.docker.internal:${redisPort}"`,
        APP_POSTGRES_DATABASE: `${answers.projectName
            .toLowerCase()
            .replace(" ", "")}db`,
        APP_TITLE: `${answers.projectName} BE`,
        EMAIL_SENDER_NAME: `${answers.projectName}`,
        STRIPE_ACCESS_TOKEN:
            stripeTerraformOutputVariables.app_stripe_api_token.value,

        STRIPE_WEBHOOK_VERIFICATION_KEY:
            stripeTerraformOutputVariables.app_stripe_webhook_verification_key
                .value,
    },
});
swapEnvVars({
    from: "apps/backend-e2e/.env.template",
    to: "apps/backend-e2e/.env",
    replacementValues: {
        AUTH0_DOMAIN:
            auth0DevTerraformOutputVariables.app_auth0_dev_domain.value,
        AUTH0_CLIENT_ID: auth0DevTerraformOutputVariables.auth0_client_id.value,
        AUTH0_CLIENT_SECRET:
            auth0DevTerraformOutputVariables.auth0_client_secret.value,
        AUTH0_TEST_ACCOUNT_USERNAME:
            auth0DevTerraformOutputVariables.test_user_username.value,
        AUTH0_TEST_ACCOUNT_PASSWORD:
            auth0DevTerraformOutputVariables.test_user_password.value,
        AUTH0_TEST_ACCOUNT_BASIC_USERNAME:
            auth0DevTerraformOutputVariables.test_user_basic_username.value,
        AUTH0_TEST_ACCOUNT_BASIC_PASSWORD:
            auth0DevTerraformOutputVariables.test_user_basic_password.value,
        AUTH0_TEST_ACCOUNT_NO_EMAILV_USERNAME:
            auth0DevTerraformOutputVariables
                .test_user_no_email_verified_username.value,
        AUTH0_TEST_ACCOUNT_NO_EMAILV_PASSWORD:
            auth0DevTerraformOutputVariables
                .test_user_no_email_verified_password.value,
    },
});

// execute the command "pnpm install" in the root of the project
await runPnpmInstall("./", ["-recursive"]);

console.log(
    `${os.EOL}Setup complete. You have a configured auth0 instance for dev, the application has been configured with your auth0 details`
);
console.log(
    "The application has been configured with the name of your app and all env variables are configured"
);
console.log(
    "This script is re-runnable safely. You don't have to run it again, you can work with all projects directly now. Note that running the script will overwrite the same env vars. "
);
console.log(
    `${os.EOL}You can now run ${chalk.magenta(
        "pnpm run mill:dev"
    )} to run the app locally. (or run each app individually as you like)`
);
