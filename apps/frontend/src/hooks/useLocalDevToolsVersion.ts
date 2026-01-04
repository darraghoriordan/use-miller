import { useQuery } from "@tanstack/react-query";
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
    const query = useQuery({
        queryKey: ["localDevToolsVersion"],
        queryFn: fetchLocalDevToolsVersion,
        staleTime: FIVE_MINUTES_MS,
        refetchInterval: FIVE_MINUTES_MS,
        refetchIntervalInBackground: false,
        retry: 2,
    });

    return {
        version: query.data?.version,
        releaseDate: query.data?.releaseDate,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
}
