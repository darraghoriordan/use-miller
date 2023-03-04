/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
    // Type check TypeScript files
    "**/*.(ts)": (files) => {
        return [
            `prettier --parser typescript --write ${files.join(" ")}`,
            `npx eslint -c .eslintrc.cjs --max-warnings 0 ${files.join(" ")}`,
        ];
    },
};
