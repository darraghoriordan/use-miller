import { useEffect, useState, type FormEvent } from "react";
import type { UserWithRole } from "better-auth/plugins/admin";
import { authClient } from "../../lib/auth-client";

function roleNames(role: string | null | undefined): string[] {
    return (role ?? "user")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
}

function isAdmin(user: UserWithRole): boolean {
    return roleNames(user.role).includes("admin");
}

function formatDate(value: Date | string): string {
    return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

function listIdentityUsers(searchValue = "") {
    return authClient.admin.listUsers({
        query: {
            limit: 100,
            offset: 0,
            sortBy: "createdAt",
            sortDirection: "desc",
            ...(searchValue
                ? {
                      searchValue,
                      searchField: "email" as const,
                      searchOperator: "contains" as const,
                  }
                : {}),
        },
    });
}

export function IdentityUsersAdmin() {
    const { data: session } = authClient.useSession();
    const [users, setUsers] = useState<UserWithRole[]>([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeAction, setActiveAction] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    async function loadUsers(searchValue = "") {
        setIsLoading(true);
        setError(null);
        const result = await listIdentityUsers(searchValue);
        setIsLoading(false);
        if (result.error) {
            setError(result.error.message ?? "Unable to load identity users");
            return;
        }
        setUsers(result.data?.users ?? []);
    }

    useEffect(() => {
        let isCancelled = false;
        void listIdentityUsers().then((result) => {
            if (isCancelled) {
                return;
            }
            setIsLoading(false);
            if (result.error) {
                setError(
                    result.error.message ?? "Unable to load identity users",
                );
                return;
            }
            setUsers(result.data?.users ?? []);
        });
        return () => {
            isCancelled = true;
        };
    }, []);

    async function submitSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await loadUsers(search.trim());
    }

    async function runAction(
        key: string,
        action: () => Promise<{ error: { message?: string } | null }>,
        successMessage: string,
    ) {
        setActiveAction(key);
        setError(null);
        setNotice(null);
        const result = await action();
        setActiveAction(null);
        if (result.error) {
            setError(result.error.message ?? "The admin action failed");
            return;
        }
        setNotice(successMessage);
        await loadUsers(search.trim());
    }

    return (
        <main className="min-w-0 flex-1 px-6 py-8 md:px-12">
            <div className="max-w-7xl">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                            Better Auth directory
                        </p>
                        <h1 className="mt-3 font-display text-4xl text-security-light">
                            Identity users
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-security-muted">
                            Manage global operators and account access. Tenant
                            membership and billing remain application-owned.
                        </p>
                    </div>
                    <form
                        onSubmit={submitSearch}
                        className="flex w-full max-w-md gap-2"
                    >
                        <label className="sr-only" htmlFor="identity-search">
                            Search users by email
                        </label>
                        <input
                            id="identity-search"
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by email"
                            className="min-w-0 flex-1 rounded-lg border border-security-border bg-security-black px-4 py-2.5 text-sm text-security-light outline-none placeholder:text-security-muted focus:border-accent focus:ring-2 focus:ring-accent/15"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-lg bg-accent px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-security-black transition hover:bg-accent-dim disabled:opacity-50"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider">
                    <span className="rounded-full border border-security-border px-3 py-1.5 text-security-muted">
                        {users.length} loaded
                    </span>
                    <span className="rounded-full border border-accent/30 px-3 py-1.5 text-accent">
                        {users.filter(isAdmin).length} admins
                    </span>
                    <span className="rounded-full border border-red-400/30 px-3 py-1.5 text-red-300">
                        {users.filter((user) => user.banned).length} suspended
                    </span>
                </div>

                {error && (
                    <p
                        role="alert"
                        className="mt-6 rounded-lg border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm text-red-200"
                    >
                        {error}
                    </p>
                )}
                {notice && (
                    <p
                        role="status"
                        className="mt-6 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-accent"
                    >
                        {notice}
                    </p>
                )}

                <div className="mt-6 overflow-hidden rounded-xl border border-security-border bg-security-dark shadow-terminal">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-security-border">
                            <thead className="bg-security-black/60">
                                <tr className="font-mono text-left text-[0.7rem] uppercase tracking-[0.16em] text-security-muted">
                                    <th className="px-5 py-4 font-medium">
                                        User
                                    </th>
                                    <th className="px-5 py-4 font-medium">
                                        Role
                                    </th>
                                    <th className="px-5 py-4 font-medium">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 font-medium">
                                        Created
                                    </th>
                                    <th className="px-5 py-4 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-security-border">
                                {users.map((user) => {
                                    const hasAdminAccess = isAdmin(user);
                                    const isCurrentUser =
                                        session?.user.id === user.id;
                                    return (
                                        <tr key={user.id} className="align-top">
                                            <td className="px-5 py-5">
                                                <p className="font-medium text-security-light">
                                                    {user.name}
                                                </p>
                                                <p className="mt-1 text-sm text-security-muted">
                                                    {user.email}
                                                </p>
                                                {isCurrentUser && (
                                                    <span className="mt-2 inline-block font-mono text-[0.65rem] uppercase tracking-wider text-accent">
                                                        Current session
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-5">
                                                <span
                                                    className={
                                                        hasAdminAccess
                                                            ? "rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent"
                                                            : "rounded-full border border-security-border px-2.5 py-1 font-mono text-xs text-security-muted"
                                                    }
                                                >
                                                    {roleNames(user.role).join(
                                                        ", ",
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-5 py-5 text-sm">
                                                {user.banned ? (
                                                    <div>
                                                        <span className="text-red-300">
                                                            Suspended
                                                        </span>
                                                        {user.banReason && (
                                                            <p className="mt-1 max-w-xs text-xs text-security-muted">
                                                                {user.banReason}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-security-text">
                                                        Active
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-5 text-sm text-security-muted">
                                                {formatDate(user.createdAt)}
                                            </td>
                                            <td className="px-5 py-5">
                                                <div className="flex min-w-72 flex-wrap justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isCurrentUser ||
                                                            activeAction !==
                                                                null
                                                        }
                                                        onClick={() =>
                                                            runAction(
                                                                `role:${user.id}`,
                                                                async () =>
                                                                    await authClient.admin.setRole(
                                                                        {
                                                                            userId: user.id,
                                                                            role: hasAdminAccess
                                                                                ? "user"
                                                                                : "admin",
                                                                        },
                                                                    ),
                                                                hasAdminAccess
                                                                    ? `${user.email} is now a regular user.`
                                                                    : `${user.email} is now an admin.`,
                                                            )
                                                        }
                                                        className="rounded-md border border-security-border px-3 py-2 font-mono text-xs text-security-text transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        {activeAction ===
                                                        `role:${user.id}`
                                                            ? "Saving…"
                                                            : hasAdminAccess
                                                              ? "Remove admin"
                                                              : "Make admin"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isCurrentUser ||
                                                            activeAction !==
                                                                null
                                                        }
                                                        onClick={() =>
                                                            runAction(
                                                                `ban:${user.id}`,
                                                                async () =>
                                                                    user.banned
                                                                        ? await authClient.admin.unbanUser(
                                                                              {
                                                                                  userId: user.id,
                                                                              },
                                                                          )
                                                                        : await authClient.admin.banUser(
                                                                              {
                                                                                  userId: user.id,
                                                                                  banReason:
                                                                                      "Suspended by an application administrator",
                                                                              },
                                                                          ),
                                                                user.banned
                                                                    ? `${user.email} can sign in again.`
                                                                    : `${user.email} has been suspended.`,
                                                            )
                                                        }
                                                        className="rounded-md border border-security-border px-3 py-2 font-mono text-xs text-security-text transition hover:border-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        {activeAction ===
                                                        `ban:${user.id}`
                                                            ? "Saving…"
                                                            : user.banned
                                                              ? "Restore access"
                                                              : "Suspend"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isCurrentUser ||
                                                            activeAction !==
                                                                null
                                                        }
                                                        onClick={() =>
                                                            runAction(
                                                                `sessions:${user.id}`,
                                                                async () =>
                                                                    await authClient.admin.revokeUserSessions(
                                                                        {
                                                                            userId: user.id,
                                                                        },
                                                                    ),
                                                                `All sessions for ${user.email} were revoked.`,
                                                            )
                                                        }
                                                        className="rounded-md border border-security-border px-3 py-2 font-mono text-xs text-security-text transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        {activeAction ===
                                                        `sessions:${user.id}`
                                                            ? "Revoking…"
                                                            : "Sign out all"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {!isLoading && users.length === 0 && (
                        <div className="px-6 py-16 text-center">
                            <p className="font-display text-xl text-security-light">
                                No identities found
                            </p>
                            <p className="mt-2 text-sm text-security-muted">
                                Try a different email search.
                            </p>
                        </div>
                    )}
                    {isLoading && (
                        <div
                            role="status"
                            className="px-6 py-16 text-center font-mono text-sm text-accent"
                        >
                            Loading identity directory…
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
