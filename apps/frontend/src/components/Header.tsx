import { Fragment, PropsWithChildren, useState } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Container } from "./Container";
import { NavLink } from "./NavLink";

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
            onClick={() => {
                console.log("open", open);
            }}
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

export const MobileNavigation = () => {
    const [open, setOpen] = useState(false);
    console.log("open", open);
    return (
        <Popover>
            <Popover.Button
                className="relative z-10000 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
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
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
                    >
                        <MobileNavLink href="/">Dashboard</MobileNavLink>

                        <hr className="m-2 border-slate-300/40" />
                        <MobileNavLink href="/account">Account</MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
};

export const Header = () => {
    return (
        <header className="pt-6 pb-10">
            <Container>
                <nav className="relative z-50 flex justify-between">
                    <div className="flex items-center md:gap-x-12">
                        <Link
                            href="#"
                            aria-label="Home"
                            className="text-3xl text-white"
                        >
                            Miller
                        </Link>
                    </div>
                    <div className="flex items-center gap-x-5 md:gap-x-8">
                        <div className="hidden md:block">
                            <NavLink href="/account">Account</NavLink>

                            <NavLink href="/">Dashboard</NavLink>
                        </div>

                        <div className="-mr-1 md:hidden">
                            <MobileNavigation />
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
};
