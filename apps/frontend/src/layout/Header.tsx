import { Fragment, PropsWithChildren, useState } from "react";
import { NavLink } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderContext from "./HeaderContext";
import { useContext } from "react";
import logo from "../transp-windmill.png";
import { PersonDto } from "@use-miller/shared-api-client";
import { Container } from "./Container";

const MobileNavButton = ({
    onClick,
    children,
}: { onClick: () => unknown } & PropsWithChildren) => {
    return (
        <button
            onClick={onClick}
            className="block w-full p-2 py-4 text-xl font-bold text-left"
        >
            {children}
        </button>
    );
};
function MobileNavLink({
    href,
    children,
}: { href?: string } & PropsWithChildren) {
    return (
        <Popover.Button
            as={NavLink}
            to={href || "#"}
            className="block w-full p-2 py-4 text-xl font-bold"
        >
            {children}
        </Popover.Button>
    );
}

const StyledNavLink = ({
    to,
    children,
}: { to: string } & PropsWithChildren) => {
    return (
        <NavLink
            to={to}
            className={({ isActive, isPending }) =>
                isActive
                    ? // ? "px-3 py-2 font-medium rounded-sm text-light-accent hover:bg-dark-accent hover:text-white text-md border-b-2 border-white"
                      // : "px-3 py-2 font-medium rounded-sm text-light-accent hover:bg-dark-accent hover:text-white text-md"
                      "inline-block rounded-lg py-1 px-2 text-sm text-white hover:bg-slate-100 hover:text-slate-900 md:text-lg"
                    : "inline-block rounded-lg py-1 px-2 text-sm text-white hover:bg-slate-100 hover:text-slate-900 md:text-lg"
            }
        >
            {children}
        </NavLink>
    );
};
function MobileNavIcon({ open }: { open: boolean }) {
    return (
        <svg
            aria-hidden="true"
            className="overflow-visible h-3.5 w-3.5 stroke-gray-300"
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

export const MobileNavigation = () => {
    const { logout, loginWithRedirect, user } = useAuth0();
    return (
        <Popover>
            <Popover.Button
                className="relative flex items-center justify-center w-8 h-8 z-10000 [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
            >
                {({ open }: { open: boolean }) => {
                    return <MobileNavIcon open={open} />;
                }}
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
                        className="absolute inset-x-0 flex flex-col p-4 mt-4 text-lg tracking-tight bg-white shadow-xl top-full origin-top rounded-md text-slate-900 ring-1 ring-slate-900/5"
                    >
                        {user && (
                            <MobileNavLink href="/">Dashboard</MobileNavLink>
                        )}
                        {!user && (
                            <>
                                <MobileNavLink href="/#features">
                                    Features
                                </MobileNavLink>
                                <MobileNavLink href="/#pricing">
                                    Pricing
                                </MobileNavLink>

                                <MobileNavButton
                                    onClick={() =>
                                        loginWithRedirect({
                                            authorizationParams: {
                                                screen_hint: "signup",
                                                scope: "openid email profile read:own offline_access",
                                            },
                                        })
                                    }
                                >
                                    Get Started
                                </MobileNavButton>
                                <hr className="m-2 border-slate-300/40" />
                                <MobileNavButton
                                    onClick={() =>
                                        loginWithRedirect({
                                            authorizationParams: {
                                                scope: "openid email profile read:own offline_access",
                                            },
                                        })
                                    }
                                >
                                    Sign in
                                </MobileNavButton>
                            </>
                        )}

                        {user && (
                            <>
                                <hr className="m-2 border-slate-300/40" />
                                <MobileNavLink href="/account">
                                    Account
                                </MobileNavLink>
                                <MobileNavButton
                                    onClick={() =>
                                        logout({
                                            logoutParams: {
                                                returnTo: import.meta.env
                                                    .VITE_AUTH0_REDIRECT_URL,
                                            },
                                        })
                                    }
                                >
                                    Sign Out
                                </MobileNavButton>
                            </>
                        )}
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
};

export const Header = ({ person }: { person?: PersonDto }) => {
    const headerContext = useContext(HeaderContext);
    const { logout, loginWithRedirect, user } = useAuth0();

    return (
        <header className="pt-4 pb-4 bg-neutral-900">
            <Container>
                <nav className="relative z-50 flex justify-between ">
                    <div className="flex items-center md:gap-x-12">
                        <img src={logo} alt="Logo" className="h-16" />
                        <NavLink
                            to="/"
                            aria-label="Home"
                            className="text-3xl text-white"
                        >
                            {headerContext.context.title}
                        </NavLink>
                    </div>
                    <div className="flex items-center gap-x-5 md:gap-x-8">
                        {user && (
                            <div className="hidden md:flex gap-x-5 md:gap-x-8">
                                <StyledNavLink to="/">
                                    Products Home
                                </StyledNavLink>
                                <StyledNavLink to="/account">
                                    Account
                                </StyledNavLink>

                                {person && person.isSuper && (
                                    <StyledNavLink to="/super-admin">
                                        SuperAdmin
                                    </StyledNavLink>
                                )}
                            </div>
                        )}

                        {!user && (
                            <div className="hidden md:flex md:gap-x-6">
                                <StyledNavLink
                                    to={`${
                                        import.meta.env.VITE_AUTH0_REDIRECT_URL
                                    }/#features`}
                                >
                                    Features
                                </StyledNavLink>
                                <StyledNavLink
                                    to={`${
                                        import.meta.env.VITE_AUTH0_REDIRECT_URL
                                    }/#pricing`}
                                >
                                    Pricing
                                </StyledNavLink>
                                <button
                                    className="inline-block px-2 py-1 text-sm text-white rounded-lg hover:bg-slate-100 hover:text-slate-900 md:text-lg"
                                    onClick={() =>
                                        loginWithRedirect({
                                            authorizationParams: {
                                                screen_hint: "signup",
                                                scope: "openid email profile read:own offline_access",
                                            },
                                        })
                                    }
                                >
                                    Get Started
                                </button>
                            </div>
                        )}

                        <div className="-mr-1 md:hidden">
                            <MobileNavigation />
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
};
