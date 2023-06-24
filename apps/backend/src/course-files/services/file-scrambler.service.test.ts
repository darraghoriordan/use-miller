// a test for file-scrambler.service.ts
//

import {
    FileScramblerService,
    ScramblePartitions,
} from "./file-scrambler.service";

describe("FileScramblerService", () => {
    const service = new FileScramblerService();

    describe("partition", () => {
        // a test for an array of lengths
        const tests = [
            {
                lines: 1,
                expected: {
                    clearPortion: { start: 0, takeLines: 1 },
                } as ScramblePartitions,
            },
            {
                lines: 3,
                expected: {
                    clearPortion: { start: 0, takeLines: 1 },
                } as ScramblePartitions,
            },
            {
                lines: 4,
                expected: {
                    clearPortion: { start: 0, takeLines: 1 },
                } as ScramblePartitions,
            },
            {
                lines: 8,
                expected: {
                    clearPortion: { start: 0, takeLines: 2 },
                } as ScramblePartitions,
            },
            {
                lines: 30,
                expected: {
                    clearPortion: { start: 0, takeLines: 6 },
                } as ScramblePartitions,
            },
            {
                lines: 50,
                expected: {
                    clearPortion: { start: 0, takeLines: 10 },
                },
            },
        ];

        test.each(tests)(
            "get partitions $lines lines",
            ({ lines, expected }) => {
                expect(service.getPartitions(lines)).toMatchObject(expected);
            }
        );
    });

    describe("scrambling", () => {
        // a test for an array of lengths
        // prettier-ignore
        const tests = [
            {
                input: "line 1\r\nline 2\r\nline 3\r\nline 4\r\nline 5\r\nline 6\r\nline 7\r\nline 8\r\nline 9\r\nline 10",
  
            },
        ];

        test.each(tests)("get scrambled text", ({ input }) => {
            expect(service.scrambleCodeFile(input, "aaa")).toContain("a");
        });
    });
});
