import { useEffect, useState } from "react";

export const useFormattedDate = (date: Date | string): string => {
    const [formattedDate, setFormattedDate] = useState<string>("{local date}");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setFormattedDate(new Date(date).toLocaleDateString()), []);

    return formattedDate;
};
