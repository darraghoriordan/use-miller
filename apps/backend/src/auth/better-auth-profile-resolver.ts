import { fromNodeHeaders } from "better-auth/node";
import type {
    AuthenticatedUserProfile,
    AuthenticatedUserProfileResolver,
} from "@darraghor/nest-backend-libs";
import { auth } from "./auth.js";
import { hasAdminRole, isConfiguredAdminEmail } from "./admin-config.js";

function parseDisplayName(name: string): {
    givenName?: string;
    familyName?: string;
} {
    const parts = name.trim().split(/\s+/u).filter(Boolean);
    const givenName = parts.shift();
    const familyName = parts.length > 0 ? parts.join(" ") : undefined;
    return { givenName, familyName };
}

function superUserPermissions(email: string, role?: string): string[] {
    return isConfiguredAdminEmail(email) || hasAdminRole(role)
        ? ["read:all", "modify:all"]
        : [];
}

export const resolveBetterAuthUser: AuthenticatedUserProfileResolver = async (
    request,
) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
    });
    if (!session) {
        return null;
    }

    const userWithAdminFields = session.user as typeof session.user & {
        role?: string;
    };
    const names = parseDisplayName(session.user.name);
    return {
        id: session.user.id,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
        name: session.user.name,
        picture: session.user.image ?? undefined,
        permissions: superUserPermissions(
            session.user.email,
            userWithAdminFields.role,
        ),
        ...names,
    } satisfies AuthenticatedUserProfile;
};
