module.exports = {
    "**/*.(ts|tsx)": (files) => {
        return [
            `prettier  --write ${files.join(" ")}`,
            `npx eslint -c .eslintrc.js  --max-warnings 0 ${files.join(" ")}`,
        ];
        // "prettier --parser typescript --write",
        // "npx eslint -c .eslintrc.js --max-warnings 0"
    },
};
