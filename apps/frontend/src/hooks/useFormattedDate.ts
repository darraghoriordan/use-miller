import { useEffect, useState } from "react";

export const useFormattedDate = (date: Date | string): string => {
    const [formattedDate, setFormattedDate] = useState<string>("{local date}");

    useEffect(() => setFormattedDate(new Date(date).toLocaleDateString()), []);

    return formattedDate;
};
