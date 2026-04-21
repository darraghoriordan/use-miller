import { useMemo } from "react";

export const useFormattedDate = (date: Date | string): string => {
    return useMemo(() => new Date(date).toLocaleDateString(), [date]);
};
