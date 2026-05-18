import { useMemo } from "react";

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
});

export const useFormattedDate = (date: Date | string): string => {
    return useMemo(() => dateFormatter.format(new Date(date)), [date]);
};
