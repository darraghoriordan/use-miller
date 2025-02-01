import unicorn from "eslint-plugin-unicorn";
import eslintNestJs from "@darraghor/eslint-plugin-nestjs-typed";
import sonarjs from "eslint-plugin-sonarjs";
import jest from "eslint-plugin-jest";
import globals from "globals";
// @ts-check
import eslint from "@eslint/js";
import tseslint, { parser } from "typescript-eslint";

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
                ...globals.jest,
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

    //   promise.configs.recommended,
    {
        files: ["**/*.ts"],
        plugins: {
            jest,

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

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all
// });

// export default [{
//     ignores: ["**/.eslintrc.cjs", "**/dist"],

// }, ...compat.extends(
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended-type-checked",
//     "plugin:@typescript-eslint/stylistic-type-checked",
//     "plugin:unicorn/recommended",
//     "plugin:eslint-comments/recommended",
//     "plugin:sonarjs/recommended",
//     "prettier",
//     "plugin:promise/recommended",
//     "plugin:jest/recommended",
//     "plugin:@darraghor/nestjs-typed/recommended",
// ), {
//     plugins: {
//         "@typescript-eslint": typescriptEslintEslintPlugin,
//         unicorn,
//         "@darraghor/nestjs-typed": darraghorNestjsTyped,
//         "eslint-comments": eslintComments,
//         sonarjs,
//         promise,
//         jest,
//     },

//     languageOptions: {
//         globals: {
//             ...globals.node,
//             ...globals.jest,
//         },

//         parser: tsParser,
//         ecmaVersion: "ES2022",
//         sourceType: "module",

//         parserOptions: {
//             project: "tsconfig.json",
//         },
//     },

//     settings: {},

//     rules: {
//         "import/namespace": "off",

//         "jest/expect-expect": ["error", {
//             assertFunctionNames: [
//                 "expect",
//                 "request.**.expect",
//                 "AuthenticatedRequests.getRequestAuthenticated",
//             ],
//         }],

//         "eslint-comments/disable-enable-pair": ["error", {
//             allowWholeFile: true,
//         }],

//         "@darraghor/nestjs-typed/injectable-should-be-provided": ["error", {
//             src: ["src/**/*.ts"],
//             filterFromPaths: ["node_modules", ".test.", ".spec."],
//         }],

//         "unicorn/prefer-node-protocol": "off",
//         "unicorn/filename-case": "off",

//         "@typescript-eslint/naming-convention": ["error", {
//             selector: "default",
//             format: ["camelCase"],
//         }, {
//             selector: "variable",
//             format: ["PascalCase", "UPPER_CASE"],
//             types: ["boolean"],
//             prefix: ["is", "should", "has", "can", "did", "will"],
//         }, {
//             selector: "variableLike",
//             format: ["camelCase", "UPPER_CASE", "PascalCase"],
//         }, {
//             selector: "parameter",
//             format: ["camelCase"],
//         }, {
//             selector: "memberLike",
//             modifiers: ["private"],
//             format: ["camelCase"],
//             leadingUnderscore: "forbid",
//         }, {
//             selector: "typeLike",
//             format: ["PascalCase"],

//             filter: {
//                 regex: "\\d{10}$",
//                 match: false,
//             },
//         }, {
//             selector: "property",
//             modifiers: ["readonly"],
//             format: ["camelCase"],
//         }, {
//             selector: "enumMember",
//             format: ["UPPER_CASE"],
//         }],

//         "unicorn/prevent-abbreviations": ["error", {
//             checkFilenames: false,

//             replacements: {
//                 e: {},

//                 e2e: {
//                     checkFilenames: false,
//                 },

//                 res: false,

//                 cmd: {
//                     command: true,
//                 },

//                 errCb: {
//                     handleError: true,
//                 },
//             },
//         }],
//     },
// }];
