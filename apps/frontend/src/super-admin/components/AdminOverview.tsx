import Link from "next/link";

const adminDestinations = [
    {
        href: "/super-admin/identities",
        index: "01",
        title: "Identity users",
        description:
            "Search accounts, promote operators, suspend access, and inspect authentication state.",
    },
    {
        href: "/super-admin/users",
        index: "02",
        title: "Application users",
        description:
            "Inspect onboarded users and their application-owned organisation records.",
    },
    {
        href: "/super-admin/org-subs",
        index: "03",
        title: "Subscriptions",
        description:
            "Review organisation subscriptions and reconcile commercial access.",
    },
    {
        href: "/super-admin/payment-events",
        index: "04",
        title: "Payment events",
        description:
            "Inspect recent Stripe events when diagnosing billing and webhook behaviour.",
    },
] as const;

export function AdminOverview() {
    return (
        <main className="min-w-0 flex-1 px-6 py-8 md:px-12">
            <div className="max-w-5xl">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                    Restricted operations
                </p>
                <h1 className="mt-3 font-display text-4xl text-security-light md:text-5xl">
                    Application control room
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-security-muted">
                    Identity management comes from Better Auth. Tenant,
                    subscription, and payment controls remain protected by the
                    NestJS application layer.
                </p>

                <div className="mt-10 grid gap-4 md:grid-cols-2">
                    {adminDestinations.map((destination) => (
                        <Link
                            key={destination.href}
                            href={destination.href}
                            className="group relative overflow-hidden rounded-xl border border-security-border bg-security-dark p-6 transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-terminal"
                        >
                            <div className="absolute right-5 top-4 font-mono text-4xl text-security-border transition-colors group-hover:text-accent/20">
                                {destination.index}
                            </div>
                            <h2 className="relative font-display text-2xl text-security-light">
                                {destination.title}
                            </h2>
                            <p className="relative mt-3 max-w-md text-sm leading-6 text-security-muted">
                                {destination.description}
                            </p>
                            <p className="relative mt-6 font-mono text-xs uppercase tracking-wider text-accent">
                                Open module <span aria-hidden="true">→</span>
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
