module.exports = {
    extends: ["next/core-web-vitals"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        "@typescript-eslint/require-await": "off",
        "react/no-unescaped-entities": "off",
    },
    ignorePatterns: [],
};
