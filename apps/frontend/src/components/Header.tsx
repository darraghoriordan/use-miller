import { Fragment, PropsWithChildren } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { colorVariants } from "../styles/themeColors.js";
import StyledHref from "./StyledHref.jsx";
import { getSignUpUrl } from "../home-ctas/signupUrl.js";
import {
    ChevronDownIcon,
    CommandLineIcon,
    RocketLaunchIcon,
    WrenchIcon,
} from "@heroicons/react/24/outline";

function MobileNavLink({
    href,
    children,
}: { href: string } & PropsWithChildren) {
    return (
        <Popover.Button
            as={Link}
            href={href}
            className="block w-full p-2 py-4 text-xl font-bold"
        >
            {children}
        </Popover.Button>
    );
}

function MobileNavIcon({ open }: { open: boolean }) {
    return (
        <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 overflow-visible stroke-gray-300"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
        >
            <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx(
                    "origin-center transition",
                    open && "scale-90 opacity-0"
                )}
            />
            <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx(
                    "origin-center transition",
                    !open && "scale-90 opacity-0"
                )}
            />
        </svg>
    );
}

export const MobileNavigation = ({
    user,
    productKey,
    signUpUri,
    docsPath,
}: {
    user: UserProfile | undefined;
    productKey: string;
    signUpUri: string;
    docsPath: string;
}) => {
    //const { user, isLoading } = useUser();
    return (
        <Popover>
            <Popover.Button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
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
                    <Popover.Overlay className="fixed inset-0 bg-slate-100/10" />
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
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
                    >
                        <MobileNavLink href={`/${productKey}/#features`}>
                            Features
                        </MobileNavLink>
                        <MobileNavLink href={`/${productKey}/#pricing`}>
                            Pricing
                        </MobileNavLink>
                        <MobileNavLink href={docsPath}>Docs</MobileNavLink>

                        {user && (
                            <MobileNavLink href={"/dashboard"}>
                                Dashboard
                            </MobileNavLink>
                        )}
                        {!user && (
                            <>
                                <MobileNavLink href={signUpUri}>
                                    Get Started
                                </MobileNavLink>
                                <hr className="m-2 border-slate-300/40" />
                                <a
                                    className="block w-full p-2 py-4 text-xl font-bold"
                                    href={"/api/auth/login"}
                                >
                                    Sign in
                                </a>
                            </>
                        )}
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
};

export function Header({
    productKey,
    headerTitle,
    successRedirectPath,
    themeColor,
}: {
    productKey: string;
    headerTitle?: string;
    successRedirectPath?: string;
    themeColor?: "green" | "cyan" | "amber" | "red" | "violet" | "pink";
}) {
    const { user, isLoading } = useUser();
    const signUpUri = getSignUpUrl({ successRedirectPath });
    const docsPath = `/docs/${productKey}/get-started/quick-start`;
    const color = themeColor || "green";
    return (
        <header className="pt-6 pb-10">
            <Container>
                <nav className="relative z-50 flex justify-between">
                    <div className="flex items-center md:hidden md:gap-x-12">
                        <StyledHref href={signUpUri}>
                            Get started
                            <span className="hidden lg:inline">today</span>
                        </StyledHref>
                    </div>
                    <div className="flex items-center md:gap-x-12">
                        <Link
                            href="/"
                            aria-label="Home"
                            className="text-3xl text-white"
                        >
                            {`Miller Dev Tools`}
                        </Link>
                    </div>
                    <div className="flex items-center gap-x-5 md:gap-x-8">
                        <div className="hidden md:flex md:gap-x-6">
                            <NavLink
                                href={`/${productKey}/#features`}
                                className={
                                    colorVariants["green"].hoverBackground
                                }
                            >
                                Features
                            </NavLink>
                            <NavLink href={`/${productKey}/#pricing`}>
                                Pricing
                            </NavLink>
                            <NavLink href={docsPath}>Docs</NavLink>
                            {(isLoading || !user) && (
                                <NavLink href={signUpUri}>Get Started</NavLink>
                            )}
                        </div>
                        <Popover className="relative">
                            <Popover.Button className="inline-flex items-center rounded-lg py-1 px-2 text-sm text-white hover:bg-slate-100 hover:text-slate-900 md:text-lg">
                                <span>Products</span>
                                <ChevronDownIcon
                                    className="ml-2 h-5 w-5"
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
                                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
                                    <div className="w-64 space-y-4 shrink rounded-xl bg-white p-4 text-lg font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                                        {[
                                            {
                                                icon: (
                                                    <CommandLineIcon className="h-6 w-6 mr-4" />
                                                ),
                                                key: "dev-shell",
                                                name: "Dev Shell",
                                            },
                                            {
                                                icon: (
                                                    <RocketLaunchIcon className="h-6 w-6 mr-4" />
                                                ),
                                                key: "miller-start",
                                                name: "Miller Start",
                                            },

                                            {
                                                icon: (
                                                    <WrenchIcon className="h-6 w-6 mr-4" />
                                                ),
                                                key: "local-dev-tools",
                                                name: "Local Dev Tools",
                                            },
                                        ].map((item) => (
                                            <a
                                                key={item.name}
                                                href={`/${item.key}`}
                                                className={clsx(
                                                    `focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center px-4 py-2 font-medium text-white border border-transparent rounded-md`,

                                                    colorVariants[color]
                                                        .hoverBackground,
                                                    colorVariants[color]
                                                        .hoverShadow,
                                                    colorVariants[color]
                                                        .hoverFocusRing,
                                                    "w-full",
                                                    "hover:shadow-lg",
                                                    "text-neutral-900",
                                                    "text-lg",
                                                    "hover:text-white"
                                                )}
                                            >
                                                <div className="flex items-center">
                                                    {item.icon}
                                                    {item.name}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                        <div className="hidden md:block">
                            {(isLoading || !user) && (
                                <StyledHref href="/api/auth/login">
                                    Sign In
                                </StyledHref>
                            )}
                            {user && (
                                <NavLink href={"/dashboard"}>Dashboard</NavLink>
                            )}
                        </div>

                        <div className="-mr-1 md:hidden">
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
