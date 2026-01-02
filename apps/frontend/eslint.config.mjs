import nextConfig from "eslint-config-next";

const eslintConfig = [
    {
        ignores: [".next/*", "node_modules/*"],
    },
    ...nextConfig,
    {
        rules: {
            "@typescript-eslint/require-await": "off",
            "react/no-unescaped-entities": "off",
        },
    },
];

export default eslintConfig;
