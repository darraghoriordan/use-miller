import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const { isLoading, isAuthenticated, user, loginWithRedirect, logout } =
        useAuth0();

    const [isProfileExpanded, toggleProfileExpansion] = useState(false);
    const [isMainMenuExpanded, toggleMainMenuExpansion] = useState(false);

    return (
        <nav className="bg-dark-shade">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-light-shade">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 text-light-shade">
                                <Link to={"/"}>filtered:reduced</Link>
                            </div>
                            <div className="hidden md:block">
                                {isAuthenticated && (
                                    <div className="flex items-baseline ml-10 space-x-4">
                                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                        <NavLink
                                            className={(isActive) =>
                                                isActive
                                                    ? "px-3 py-2 text-sm font-medium text-light-shade hover:bg-gray-700 hover:text-white rounded-md"
                                                    : "px-3 py-2 text-sm font-medium text-light-shade hover:bg-gray-700 hover:text-white rounded-md active-menu-item"
                                            }
                                            to={"/"}
                                        >
                                            Sharing Link
                                        </NavLink>
                                        <NavLink
                                            className={(isActive) =>
                                                isActive
                                                    ? "px-3 py-2 text-sm font-medium text-light-shade hover:bg-gray-700 hover:text-white rounded-md"
                                                    : "px-3 py-2 text-sm font-medium text-light-shade hover:bg-gray-700 hover:text-white rounded-md active-menu-item"
                                            }
                                            to={"/settings"}
                                        >
                                            Filter Setup
                                        </NavLink>

                                        <NavLink
                                            className={(isActive) =>
                                                isActive
                                                    ? "px-3 py-2 text-sm font-medium text-light-shade hover:bg-gray-700 hover:text-white rounded-md"
                                                    : "px-3 py-2 text-sm font-medium text-light-shade hover:bg-gray-700 hover:text-white rounded-md active-menu-item"
                                            }
                                            to={"/received-roles"}
                                        >
                                            Filtered received roles
                                        </NavLink>
                                        <NavLink
                                            className={(isActive) =>
                                                isActive
                                                    ? "px-3 py-2 text-sm font-medium text-light-shade hover:bg-gray-700 hover:text-white rounded-md"
                                                    : "px-3 py-2 text-sm font-medium text-light-shade hover:bg-gray-700 hover:text-white rounded-md active-menu-item"
                                            }
                                            to={"/submitted-roles"}
                                        >
                                            Submitted roles
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center ml-4 md:ml-6">
                                {/* <!-- Profile dropdown --> */}
                                <div className="relative ml-3">
                                    <div>
                                        <button
                                            className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            id="user-menu"
                                            aria-haspopup="true"
                                            onClick={() =>
                                                toggleProfileExpansion(
                                                    !isProfileExpanded
                                                )
                                            }
                                        >
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            {user && user.picture ? (
                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                    src={user.picture}
                                                    alt="My Profile Avatar"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="white"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                    {/* <!--
                    Profile dropdown panel, show/hide based on dropdown state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  --> */}
                                    <div
                                        className={`${
                                            isProfileExpanded
                                                ? `block`
                                                : `hidden`
                                        } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu"
                                    >
                                        {!isLoading && !user && (
                                            <>
                                                <button
                                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        loginWithRedirect()
                                                    }
                                                >
                                                    Sign In
                                                </button>
                                            </>
                                        )}

                                        {!isLoading && user && (
                                            <>
                                                {/* <Link
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          to={"/profile"}
                        >
                          Your Profile
                        </Link> */}

                                                <button
                                                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        logout({
                                                            logoutParams: {
                                                                returnTo:
                                                                    window
                                                                        .location
                                                                        .origin,
                                                            },
                                                        })
                                                    }
                                                >
                                                    Sign Out
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mr-2 md:hidden">
                            {/* <!-- Mobile menu button --> */}
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() =>
                                    toggleMainMenuExpansion(!isMainMenuExpanded)
                                }
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* <!--
                  Heroicon name: outline/menu

                  Menu open: "hidden", Menu closed: "block"
                --> */}
                                <svg
                                    className="block w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                                {/* <!--
                  Heroicon name: outline/x

                  Menu open: "block", Menu closed: "hidden"
                --> */}
                                <svg
                                    className="hidden w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            <div
                className={`${
                    isMainMenuExpanded ? `block` : `hidden`
                } border-b border-gray-700 md:hidden`}
                id="mobile-menu"
            >
                {isAuthenticated && (
                    <div className="px-2 py-3 space-y-1 sm:px-3">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <NavLink
                            className={(isActive) =>
                                isActive
                                    ? "block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                                    : "block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md active-menu-item"
                            }
                            to={"/"}
                        >
                            Sharing link
                        </NavLink>
                        <NavLink
                            className={(isActive) =>
                                isActive
                                    ? "block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                                    : "block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md active-menu-item"
                            }
                            to={"/settings"}
                        >
                            Filter Setup
                        </NavLink>

                        <NavLink
                            className={(isActive) =>
                                isActive
                                    ? "block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                                    : "block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md active-menu-item"
                            }
                            to={"/received-roles"}
                        >
                            Filtered received roles
                        </NavLink>
                        <NavLink
                            className={(isActive) =>
                                isActive
                                    ? "block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                                    : "block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md active-menu-item"
                            }
                            to={"/submitted-roles"}
                        >
                            Submitted roles
                        </NavLink>
                    </div>
                )}
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            {user && user.picture && (
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={user.picture}
                                    alt="My Profile Avatar"
                                />
                            )}
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">
                                {user?.name}
                            </div>
                            <div className="text-sm font-medium leading-none text-gray-400">
                                {user?.email}
                            </div>
                        </div>
                    </div>
                    <div
                        className={`
             block mt-3 px-2 space-y-1`}
                    >
                        {!isLoading && !user && (
                            <>
                                <button
                                    className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                                    onClick={() => loginWithRedirect()}
                                >
                                    Sign In
                                </button>
                            </>
                        )}

                        {!isLoading && user && (
                            <>
                                {/* <Link
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  to={"/profile"}
                >
                  Your Profile
                </Link> */}
                                <button
                                    className="w-full px-3 py-2 text-base font-medium text-left text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                                    onClick={() =>
                                        logout({
                                            logoutParams: {
                                                returnTo:
                                                    window.location.origin,
                                            },
                                        })
                                    }
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
