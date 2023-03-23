export function getSignUpUrl({ productKey }: { productKey?: string }) {
    if (!productKey) {
        return `/api/auth/signup?returnTo=${encodeURIComponent("/#pricing")}`;
    }
    return `/api/auth/signup?returnTo=/${encodeURIComponent(
        productKey + "#pricing"
    )}`;
}
