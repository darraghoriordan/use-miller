import { Fragment, PropsWithChildren, useState } from "react";
import { NavLink } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderContext from "./HeaderContext";
import { useContext } from "react";
import logo from "../transp-windmill.png";
import useGetPerson from "../account/persons/useGetPerson";

function MobileNavLink({
    href,
    onClick,
    children,
}: { href?: string; onClick?: () => void } & PropsWithChildren) {
    return (
        <Popover.Button
            as={NavLink}
            to={href || "#"}
            onClick={onClick}
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
                    ? "px-3 py-2 font-medium rounded-sm text-light-accent hover:bg-dark-accent hover:text-white text-md border-b-2 border-white"
                    : "px-3 py-2 font-medium rounded-sm text-light-accent hover:bg-dark-accent hover:text-white text-md"
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
    const [open, setOpen] = useState(false);
    const { logout } = useAuth0();

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
                        <MobileNavLink href="/">Dashboard</MobileNavLink>

                        <hr className="m-2 border-slate-300/40" />
                        <MobileNavLink href="/account">Account</MobileNavLink>
                        <MobileNavLink
                            onClick={() =>
                                logout({
                                    logoutParams: {
                                        returnTo: window.location.origin,
                                    },
                                })
                            }
                        >
                            Sign Out
                        </MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
};

export const Header = () => {
    const headerContext = useContext(HeaderContext);
    const { data, isLoading } = useGetPerson("me");

    return (
        <header className="px-12 pt-2 pb-2 border-b-2 border-dark-shade bg-dark-accent">
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
                    <div className="hidden md:block">
                        <StyledNavLink to="/">Products Home</StyledNavLink>
                        <StyledNavLink to="/account">Account</StyledNavLink>

                        {!isLoading && data && data.isSuper && (
                            <StyledNavLink to="/super-admin">
                                SuperAdmin
                            </StyledNavLink>
                        )}
                    </div>

                    <div className="-mr-1 md:hidden">
                        <MobileNavigation />
                    </div>
                </div>
            </nav>
        </header>
    );
};
