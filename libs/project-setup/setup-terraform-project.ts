import * as fs from "fs";
import chalk from "chalk";
import * as inquirer from "inquirer";

import { writeTerraformVariables, runTerraform } from "./setup-helpers.js";
export type TerraformVariablesMapperParams<T> = {
    terraformVariablesPath: string;
    terraformProjectPath: string;
    introText: string;
    variables: {
        name: keyof T;
        default: string;
        validate: (input: any) => boolean | string;
    }[];
};
// prettier-ignore
const runTfEnvVarMapping = async <T,U,>(
    params: TerraformVariablesMapperParams<T>
): Promise<U> => {
    console.log(params.introText);

    // Try to read the existing values to use as defaults for the prompts
    let newInitVars: Record<keyof T, { value: string }> = {} as Record<
        keyof T,
        { value: string }
    >;
    for (const variable of params.variables) {
        newInitVars[variable.name] = { value: variable.default };
    }

    const tfVariablesAsInquirerAnswers: Record<
        keyof T,
        string
    > = {} as Record<keyof T, string>;

    for (const variable of params.variables) {
        tfVariablesAsInquirerAnswers[variable.name] = variable.default;
    }
    // set a initial values for the terraform variables if they don't exist
    if (!fs.existsSync(params.terraformVariablesPath)) {
        writeTerraformVariables(
            params.terraformVariablesPath,
            tfVariablesAsInquirerAnswers
        );
    }

    // on the first run of this script, the  variables won't be output
    let existingVariableValues: Record<keyof T, { value: string; }>;

    await runTerraform(params.terraformProjectPath, ["init"]);
    const firstRunVariables = await runTerraform(
        params.terraformProjectPath,
        ["output -json"]
    );

    existingVariableValues = JSON.parse(firstRunVariables.stdout || "{}");
    if (!existingVariableValues[params.variables[0].name]) {
        existingVariableValues = newInitVars;
    }

    const cliInputAnswers:T = await inquirer.default.prompt(
        params.variables.map((variable) => {
            if (!existingVariableValues[variable.name]?.value){
                console.log(chalk.yellowBright(`Variable ${String(variable.name)} not found. Using default value: ${variable.default}`))
            }
            return {
            name: variable.name,
            default: existingVariableValues[variable.name]?.value ?? variable.default,
            validate: variable.validate,
        }})
    );

    // the as here is a bit of a hack but the object is so generic it's not a big deal
    writeTerraformVariables(params.terraformVariablesPath, cliInputAnswers as { [key: string]: string; });
    // apply the new infrastructure
    const result = await runTerraform(params.terraformProjectPath, [
        "apply",
        "-auto-approve",
    ]);
    console.log(result.stdout);
    console.error(result.stderr);

    const variables = await runTerraform(params.terraformProjectPath, [
        "output -json",
    ]);

    const variableValues = JSON.parse(
        variables.stdout || "{}"
    ) as U;

    console.log(chalk.magentaBright("Infra created successfully."));

    return variableValues;
};

export default runTfEnvVarMapping;
