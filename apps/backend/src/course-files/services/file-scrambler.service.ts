import { Injectable } from "@nestjs/common";

export type ScramblePartitions = {
    clearPortion: { start: number; takeLines: number };
};

@Injectable()
export class FileScramblerService {
    getPartitions = (numberOfLines: number): ScramblePartitions => {
        if (numberOfLines < 3) {
            return {
                clearPortion: { start: 0, takeLines: numberOfLines },
            };
        }
        const clearTextDisplayConfiguration = {
            percentOfLinesToShow: 0.2,
            percentOfLinesForTransition: 0.15,
        };

        const amountToTakeClear = Math.ceil(
            numberOfLines * clearTextDisplayConfiguration.percentOfLinesToShow
        );

        const clearPortion = {
            start: 0,
            takeLines: amountToTakeClear,
        };

        return {
            clearPortion,
        };
    };

    scrambleCodeFile = (
        contents: string,
        scrambleCharacters: string
    ): string => {
        const lines = contents?.split("\n");
        const partitions = this.getPartitions(lines.length);

        const clearPortion = lines.slice(
            partitions.clearPortion.start,
            partitions.clearPortion.start + partitions.clearPortion.takeLines
        );
        // replace random non-whitespace characters with characters from scrambleCharacters
        const transitionPortion = lines.slice(
            partitions.clearPortion.takeLines
        );
        console.log("clearPortion", clearPortion);
        console.log("transitionPortion", transitionPortion);
        const scrambled = transitionPortion.map((line, lineNumber) => {
            const ratioOfLinesRemaining =
                (transitionPortion.length - lineNumber) /
                transitionPortion.length;

            const characters = [...line];
            const scrambledCharacters = characters.map((character) => {
                // a regex to match whitespace - leave these alone
                const whitespaceRegex = /\s/;
                if (whitespaceRegex.test(character)) {
                    return character;
                }
                // a chance to scramble the character in transition
                // increases as a percentage of the line count
                const shouldScramble =
                    // always scramble the second half (removed, this is too harsh)
                    // ratioOfLinesRemaining <= 0.5 ||
                    // and scramble the first half with a chance
                    // that increases as we go
                    Math.random() > ratioOfLinesRemaining;

                if (!shouldScramble) {
                    return character;
                }

                const randomIndex = Math.floor(
                    Math.random() * scrambleCharacters.length
                );
                return scrambleCharacters[randomIndex];
            });
            return scrambledCharacters.join("");
        });

        const result = [...clearPortion, ...scrambled].join("\n");
        console.log("result", result);
        const scrambleMessage =
            // eslint-disable-next-line sonarjs/no-duplicate-string
            "\n#######################################################" +
            "\n#                       NOTICE                         " +
            "\n#######################################################" +
            "\n# File viewing here is progressively scrambled unless you have purchased " +
            "\n" +
            "# To see the full contents of each file and get the full source code on GitHub" +
            "\n" +
            "# please support development by purchasing." +
            "\n\n";
        return scrambleMessage + result;
    };

    trimCodeFile = (contents: string, demoUrl: string): string => {
        const lines = contents?.split("\n");
        const partitions = this.getPartitions(lines.length);

        const clearPortion = lines.slice(
            partitions.clearPortion.start,
            partitions.clearPortion.start + partitions.clearPortion.takeLines
        );
        return (
            clearPortion.join("\n") +
            "\n" +
            "\n#######################################################" +
            "\n#                       NOTICE                         " +
            "\n#######################################################" +
            "\n# File viewing is clipped unless you have purchased " +
            "\n" +
            "# To see the full contents of each file and get the full source code on GitHub" +
            "\n" +
            "# please support development by purchasing." +
            "\n" +
            "# As a demo, the full file contents are available at the following path" +
            "\n" +
            `# ${demoUrl}`
        );
    };
}
