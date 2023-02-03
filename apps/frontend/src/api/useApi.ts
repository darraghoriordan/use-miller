import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export interface ProtectedApiOptions {
    audience: string;
    scope: string;
    headers?: Headers | string[][] | Record<string, string> | undefined;
}

const defaultAudience = import.meta.env.VITE_AUTH0_API_AUDIENCE as string;
const defaultScope = import.meta.env.VITE_AUTH0_API_SCOPE as string;

export const useApi = (
    url: string,
    options: ProtectedApiOptions = {
        audience: defaultAudience,
        scope: defaultScope,
    }
) => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState({
        error: null,
        loading: true,
        data: null,
    });
    const [refreshIndex, setRefreshIndex] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const { audience, scope, ...fetchOptions } = options;
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: { audience, scope },
                });
                const res = await fetch(url, {
                    ...fetchOptions,
                    headers: {
                        ...(fetchOptions.headers as any),
                        // Add the Authorization header to the existing headers
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setState({
                    ...state,
                    data: await res.json(),
                    error: null,
                    loading: false,
                });
            } catch (error) {
                setState({
                    ...state,
                    error: error as any,
                    loading: false,
                });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshIndex]);

    return {
        ...state,
        refresh: () => setRefreshIndex(refreshIndex + 1),
    };
};
