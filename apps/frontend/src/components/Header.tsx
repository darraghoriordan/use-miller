import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "@auth0/nextjs-auth0/types";
import { colorVariants, ThemeColor } from "../styles/themeColors";
import { getSignUpUrl } from "./signupUrl";
import {
    ChevronDownIcon,
    CommandLineIcon,
    RocketLaunchIcon,
    WrenchIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";

function MobileNavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Popover.Button
            as={Link}
            href={href}
            className="block w-full p-3 font-mono text-sm text-security-light hover:text-accent hover:bg-security-mid rounded-md transition-colors"
        >
            {children}
        </Popover.Button>
    );
}

function MobileNavIcon({ open }: { open: boolean }) {
    return (
        <svg
            aria-hidden="true"
            className="h-4 w-4 overflow-visible stroke-security-light"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
        >
            <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx(
                    "origin-center transition",
                    open && "scale-90 opacity-0",
                )}
            />
            <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx(
                    "origin-center transition",
                    !open && "scale-90 opacity-0",
                )}
            />
        </svg>
    );
}

const products = [
    {
        icon: CommandLineIcon,
        key: "dev-shell",
        name: "Dev Shell",
        description: "Reproducible dev environments",
        color: "devshell" as ThemeColor,
    },
    {
        icon: WrenchIcon,
        key: "local-dev-tools",
        name: "Local Dev Tools",
        description: "Offline utilities for devs",
        color: "localtools" as ThemeColor,
    },
    {
        icon: RocketLaunchIcon,
        key: "miller-start",
        name: "Miller Start",
        description: "Security-first NestJS template",
        color: "millerstart" as ThemeColor,
    },
    {
        icon: ShieldCheckIcon,
        key: "eslint-plugin-nestjs-typed",
        name: "ESLint Plugin",
        description: "Free & open source",
        color: "eslint" as ThemeColor,
        external:
            "https://github.com/darraghoriordan/eslint-plugin-nestjs-typed",
    },
];

export const MobileNavigation = ({
    user,
    productKey,
    signUpUri,
    docsPath,
}: {
    user: User | undefined | null;
    productKey?: string;
    signUpUri: string;
    docsPath: string;
}) => {
    return (
        <Popover>
            <Popover.Button
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-md border border-security-border hover:border-accent/50 transition-colors not-focus-visible:focus:outline-hidden"
                aria-label="Toggle Navigation"
            >
                {({ open }: { open: boolean }) => <MobileNavIcon open={open} />}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 bg-security-black/80 backdrop-blur-sm" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        as="div"
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-lg bg-security-dark border border-security-border p-4 shadow-terminal"
                    >
                        <div className="mb-4 pb-4 border-b border-security-border">
                            <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                                Products
                            </span>
                        </div>

                        {products.map((item) =>
                            item.external ? (
                                <a
                                    key={item.name}
                                    href={item.external}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full p-3 font-mono text-sm text-security-light hover:text-accent hover:bg-security-mid rounded-md transition-colors"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <MobileNavLink
                                    key={item.name}
                                    href={`/${item.key}`}
                                >
                                    {item.name}
                                </MobileNavLink>
                            ),
                        )}

                        {productKey && (
                            <>
                                <div className="my-4 border-t border-security-border" />
                                <MobileNavLink
                                    href={`/${productKey}/#features`}
                                >
                                    Features
                                </MobileNavLink>
                                <MobileNavLink href={`/${productKey}/#pricing`}>
                                    Pricing
                                </MobileNavLink>
                                <MobileNavLink href={docsPath}>
                                    Docs
                                </MobileNavLink>
                            </>
                        )}

                        <div className="mt-4 pt-4 border-t border-security-border">
                            {user ? (
                                <MobileNavLink href="/dashboard">
                                    Dashboard
                                </MobileNavLink>
                            ) : (
                                <>
                                    <a
                                        href="/auth/login"
                                        className="block w-full p-3 font-mono text-sm text-accent hover:bg-accent/10 rounded-md transition-colors"
                                    >
                                        Sign in
                                    </a>
                                </>
                            )}
                        </div>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
};

export function Header({
    productKey,
    headerTitle,
    themeColor,
}: {
    productKey?: string;
    headerTitle?: string;
    themeColor?: ThemeColor;
}) {
    const { user, isLoading } = useUser();
    const signUpUri = getSignUpUrl({
        productKey,
    });
    const docsPath = `/docs/${productKey}/get-started/quick-start`;

    return (
        <header className="relative z-50 border-b border-security-border/50">
            <Container>
                <nav className="flex items-center justify-between py-4">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            aria-label="Home"
                            className="group flex items-center gap-2"
                        >
                            <span className="font-mono text-lg md:text-xl text-security-light group-hover:text-accent transition-colors">
                                <span className="text-accent">{">"}</span>{" "}
                                {headerTitle || "MILLER_"}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {/* Products Dropdown */}
                        <Popover className="relative">
                            <Popover.Button className="inline-flex items-center gap-1 px-3 py-2 font-mono text-sm text-security-text hover:text-accent rounded-md transition-colors focus:outline-none">
                                <span>Products</span>
                                <ChevronDownIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute right-0 z-10 mt-3 w-72 rounded-lg bg-security-dark border border-security-border shadow-terminal overflow-hidden">
                                    <div className="px-4 py-3 border-b border-security-border">
                                        <span className="font-mono text-xs uppercase tracking-wider text-security-muted">
                                            Products
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        {products.map((item) => {
                                            const Icon = item.icon;
                                            const content = (
                                                <div className="flex items-start gap-3 p-3 rounded-md hover:bg-security-mid transition-colors group">
                                                    <Icon
                                                        className={clsx(
                                                            "h-5 w-5 mt-0.5 transition-colors",
                                                            colorVariants[
                                                                item.color
                                                            ].foreground,
                                                        )}
                                                    />
                                                    <div>
                                                        <div className="font-mono text-sm text-security-light group-hover:text-accent transition-colors">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-xs text-security-muted mt-0.5">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            );

                                            return item.external ? (
                                                <a
                                                    key={item.name}
                                                    href={item.external}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {content}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={item.name}
                                                    href={`/${item.key}`}
                                                >
                                                    {content}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>

                        {/* Product-specific links */}
                        {productKey && (
                            <>
                                <NavLink
                                    href={`/${productKey}/#features`}
                                    className="px-3 py-2 font-mono text-sm text-security-text hover:text-accent rounded-md transition-colors"
                                >
                                    Features
                                </NavLink>
                                <NavLink
                                    href={`/${productKey}/#pricing`}
                                    className="px-3 py-2 font-mono text-sm text-security-text hover:text-accent rounded-md transition-colors"
                                >
                                    Pricing
                                </NavLink>
                                <NavLink
                                    href={docsPath}
                                    className="px-3 py-2 font-mono text-sm text-security-text hover:text-accent rounded-md transition-colors"
                                >
                                    Docs
                                </NavLink>
                            </>
                        )}

                        <NavLink
                            href="/about"
                            className="px-3 py-2 font-mono text-sm text-security-text hover:text-accent rounded-md transition-colors"
                        >
                            About
                        </NavLink>
                    </div>

                    {/* Right side - Auth */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2">
                            {isLoading ? null : user ? (
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center px-4 py-2 font-mono text-sm text-security-light border border-security-border rounded-md hover:border-accent/50 hover:text-accent transition-all"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <a
                                    href="/auth/login"
                                    className="inline-flex items-center px-4 py-2 font-mono text-sm bg-accent text-security-black rounded-md hover:bg-accent-dim transition-all"
                                >
                                    Sign In
                                </a>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            {!isLoading && (
                                <MobileNavigation
                                    signUpUri={signUpUri}
                                    productKey={productKey}
                                    user={user}
                                    docsPath={docsPath}
                                />
                            )}
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
}
