import { useEffect, useState } from "react";

export const useFormattedDate = (date: Date): string => {
    const [formattedDate, setFormattedDate] = useState<string>("{local date}");

    useEffect(() => setFormattedDate(new Date(date).toLocaleDateString()), []);

    return formattedDate;
};
