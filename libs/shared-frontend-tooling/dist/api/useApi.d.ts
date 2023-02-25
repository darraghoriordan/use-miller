export interface ProtectedApiOptions {
    audience: string;
    scope: string;
    headers?: Headers | string[][] | Record<string, string> | undefined;
}
export declare const useApi: (url: string, options: ProtectedApiOptions) => {
    refresh: () => void;
    error: null;
    loading: boolean;
    data: null;
};
