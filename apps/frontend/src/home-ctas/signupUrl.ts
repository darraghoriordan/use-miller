export function getSignUpUrl({
    successRedirectPath,
}: {
    successRedirectPath?: string;
}) {
    return `https://${
        process.env.NEXT_PUBLIC_AUTH0_DOMAIN
    }/authorize?response_type=code&client_id=${
        process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
    }&screen_hint=signup&redirect_uri=${
        process.env.NEXT_PUBLIC_APP_BASE_PATH
    }${successRedirectPath}&scope=${encodeURIComponent(
        "openid email profile offline_access"
    )}`;
}
