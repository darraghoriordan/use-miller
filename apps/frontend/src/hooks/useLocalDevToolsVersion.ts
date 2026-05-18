import { useEffect, useState } from "react";
import type { LocalDevToolsVersionResponse } from "../pages/api/local-dev-tools/version";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

async function fetchLocalDevToolsVersion(): Promise<LocalDevToolsVersionResponse> {
    const response = await fetch("/api/local-dev-tools/version");

    if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error || "Failed to fetch version");
    }

    return response.json() as Promise<LocalDevToolsVersionResponse>;
}

export function useLocalDevToolsVersion() {
    const [data, setData] = useState<LocalDevToolsVersionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isActive = true;
        let intervalId: ReturnType<typeof setInterval> | null = null;

        const load = async () => {
            try {
                const result = await fetchLocalDevToolsVersion();
                if (!isActive) {
                    return;
                }
                setData(result);
                setError(null);
            } catch (loadError) {
                if (!isActive) {
                    return;
                }
                setError(
                    loadError instanceof Error
                        ? loadError
                        : new Error("Failed to fetch version"),
                );
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        void load();
        intervalId = setInterval(() => {
            void load();
        }, FIVE_MINUTES_MS);

        return () => {
            isActive = false;
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    return {
        version: data?.version,
        releaseDate: data?.releaseDate,
        isLoading,
        isError: !!error,
        error,
    };
}
