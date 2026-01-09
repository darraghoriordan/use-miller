import clsx from "clsx";
import {
    LockClosedIcon,
    CodeBracketIcon,
    ServerIcon,
    ShieldCheckIcon,
    StarIcon,
    UsersIcon,
    ArrowDownTrayIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type BadgeIcon =
    | "lock"
    | "code"
    | "server"
    | "shield"
    | "star"
    | "star-solid"
    | "users"
    | "download"
    | "terminal";

interface SecurityBadgeProps {
    icon?: BadgeIcon;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "accent" | "muted";
}

const iconMap = {
    lock: LockClosedIcon,
    code: CodeBracketIcon,
    server: ServerIcon,
    shield: ShieldCheckIcon,
    star: StarIcon,
    "star-solid": StarIconSolid,
    users: UsersIcon,
    download: ArrowDownTrayIcon,
    terminal: CommandLineIcon,
};

export function SecurityBadge({
    icon,
    children,
    className,
    variant = "default",
}: SecurityBadgeProps) {
    const Icon = icon ? iconMap[icon] : null;

    const variantStyles = {
        default:
            "border-security-border text-security-text hover:border-accent/50 hover:text-accent",
        accent: "border-accent/30 text-accent hover:border-accent hover:bg-accent/10",
        muted: "border-security-border/50 text-security-muted",
    };

    return (
        <span
            className={clsx(
                "inline-flex items-center gap-2 px-3 py-1.5 border rounded-full font-mono text-xs transition-colors",
                variantStyles[variant],
                className,
            )}
        >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {children}
        </span>
    );
}

// Trust badges row component
interface TrustBadgesProps {
    className?: string;
}

export function TrustBadges({ className }: TrustBadgesProps) {
    return (
        <div className={clsx("flex flex-wrap items-center gap-3", className)}>
            <SecurityBadge icon="lock" variant="accent">
                Local Processing
            </SecurityBadge>
            <SecurityBadge icon="code" variant="accent">
                Open Source
            </SecurityBadge>
            <SecurityBadge icon="shield" variant="accent">
                Zero Data Collection
            </SecurityBadge>
        </div>
    );
}

// GitHub stars badge
interface GitHubStarsBadgeProps {
    stars: number;
    className?: string;
}

export function GitHubStarsBadge({ stars, className }: GitHubStarsBadgeProps) {
    return (
        <SecurityBadge icon="star-solid" variant="accent" className={className}>
            {stars} GitHub Stars
        </SecurityBadge>
    );
}
