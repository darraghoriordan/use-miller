const config = {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],

    // Type check TypeScript files
    // "**/*.(ts|tsx)": (files) => {
    //     return [console.log("files marketing", files)];
    //     // "**/*.(ts|tsx)": () => [
    //     //     "cd apps/marketing && npm run lint",
    //     //     "cd apps/marketing && npm run prettier",
    // },
};

export default config;
