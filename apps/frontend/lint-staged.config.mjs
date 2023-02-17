import path from "path";

const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(" --file ")}`;
const config = {
    "*.{js,jsx,ts,tsx}": [buildEslintCommand, `prettier --write`],

    // Type check TypeScript files
    // "**/*.(ts|tsx)": (files) => {
    //     return [console.log("files marketing", files)];
    //     // "**/*.(ts|tsx)": () => [
    //     //     "cd apps/marketing && npm run lint",
    //     //     "cd apps/marketing && npm run prettier",
    // },
};

export default config;
