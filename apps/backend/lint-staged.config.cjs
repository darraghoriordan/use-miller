/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

module.exports = {
    // Type check TypeScript files
    "**/*.(ts)": (files) => {
        return [
            `prettier --parser typescript --write ${files.join(" ")}`,
            `pnpm run lint ${files.join(" ")}`,
        ];
    },
};
