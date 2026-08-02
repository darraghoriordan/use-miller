export const BETTER_AUTH_ADMIN_ROLE = "admin";

export function configuredAdminEmails(): string[] {
    return [
        ...new Set(
            (process.env.SUPER_USER_EMAILS ?? "")
                .split(",")
                .map((value) => value.trim().toLowerCase())
                .filter(Boolean),
        ),
    ];
}

export function isConfiguredAdminEmail(email: string): boolean {
    return configuredAdminEmails().includes(email.trim().toLowerCase());
}

export function hasAdminRole(role: string | null | undefined): boolean {
    return (role ?? "")
        .split(",")
        .map((value) => value.trim().toLowerCase())
        .includes(BETTER_AUTH_ADMIN_ROLE);
}
