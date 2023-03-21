module.exports = {
    extends: ["plugin:@next/next/recommended", "plugin:tailwind/recommended"],
    settings: {
        next: {
            rootDir: "apps/marketing/",
        },
    },
    rules: {
        "@typescript-eslint/require-await": "error",
    },
    ignorePatterns: [],
};
