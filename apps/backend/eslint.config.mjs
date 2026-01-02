import unicorn from "eslint-plugin-unicorn";
import eslintNestJs from "@darraghor/eslint-plugin-nestjs-typed";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
// @ts-check
import eslint from "@eslint/js";
import tseslint, { parser } from "typescript-eslint";

// eslint-disable-next-line @typescript-eslint/no-deprecated -- config() is correct for typescript-eslint 8.x
export default tseslint.config(
    {
        ignores: ["**/.eslintrc.cjs", "**/dist", "**/node_modules"],
    },
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,

    {
        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser,
            ecmaVersion: 2022,
            sourceType: "module",

            parserOptions: {
                project: "tsconfig.json",
            },
        },
    },

    eslintNestJs.configs.flatRecommended,

    {
        files: ["**/*.ts"],
        plugins: {
            sonarjs,
        },
    },

    {
        files: ["**/*.ts"],
        rules: {
            "@typescript-eslint/no-extraneous-class": "off",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "default",
                    format: ["camelCase"],
                },
                {
                    selector: "variable",
                    format: ["PascalCase", "UPPER_CASE"],
                    types: ["boolean"],
                    prefix: ["is", "should", "has", "can", "did", "will"],
                },
                {
                    selector: "variableLike",
                    format: ["camelCase", "UPPER_CASE", "PascalCase"],
                },
                {
                    selector: "parameter",
                    format: ["camelCase"],
                },
                {
                    selector: "memberLike",
                    modifiers: ["private"],
                    format: ["camelCase"],
                    leadingUnderscore: "forbid",
                },
                {
                    selector: "typeLike",
                    format: ["PascalCase"],

                    filter: {
                        regex: "\\d{10}$",
                        match: false,
                    },
                },
                {
                    selector: "property",
                    modifiers: ["readonly"],
                    format: ["camelCase"],
                },
                {
                    selector: "enumMember",
                    format: ["UPPER_CASE"],
                },
            ],
        },
    },

    {
        languageOptions: {
            globals: globals.builtin,
        },
        plugins: {
            unicorn,
        },
        rules: {
            "unicorn/prefer-node-protocol": "off",
            "unicorn/filename-case": "off",
            "unicorn/prevent-abbreviations": [
                "error",
                {
                    checkFilenames: false,
                    replacements: {
                        e: {},

                        e2e: {
                            checkFilenames: false,
                        },

                        res: false,

                        cmd: {
                            command: true,
                        },

                        errCb: {
                            handleError: true,
                        },
                    },
                },
            ],
        },
    },
);
