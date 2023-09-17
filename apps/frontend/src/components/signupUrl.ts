export function getSignUpUrl({ productKey }: { productKey?: string }) {
    if (!productKey) {
        return `/api/auth/signup?returnTo=${encodeURIComponent("/#pricing")}`;
    }
    // super hack. fix all this!!
    // the sku that gets passed around is miller-start-consulting but there is no url for that to return to
    if (productKey.includes("miller-start")) {
        productKey = "miller-start";
    }
    return `/api/auth/signup?returnTo=/${encodeURIComponent(
        productKey + "#pricing",
    )}`;
}

export function getGithubUrl({ productKey }: { productKey?: string }) {
    switch (productKey) {
        case "miller-start":
            return "https://github.com/darraghoriordan/use-miller";
        case "local-dev-tools":
            return "https://github.com/darraghoriordan/ssh-tool-new-electron";
        case "dev-shell":
            return "https://github.com/darraghoriordan/mac-setup-script";
        default:
            return "https://github.com/darraghoriordan/use-miller";
    }
}
