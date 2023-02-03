import React from "react";
import ConstantSettings from "./ConstantSettings";
import { Routes, Route } from "react-router";
import Home from "./Home";
import Privacy from "./Privacy";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="mx-auto bg-light-shade min-w-sm">
            <header>
                <div className="flex flex-wrap items-stretch justify-between px-4 text-center border-b border-black border-solid">
                    <Link
                        to={"/"}
                        className="min-w-full py-6 mx-auto text-3xl sm:min-w-min sm:mx-0"
                    >
                        {ConstantSettings.title}
                    </Link>

                    <a
                        href={ConstantSettings.appUrl}
                        className="min-w-full mx-auto mb-2 text-lg border border-black sm:mx-0 sm:min-w-min sm:border-l sm:border-0 sm:px-8 sm:mb-0 sm:flex sm:items-center"
                    >
                        <span className="block">Get Started // Login</span>
                    </a>
                </div>
            </header>

            <main>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/privacy"} element={<Privacy />} />
                </Routes>
            </main>

            <footer className="bg-dark-shade" aria-labelledby="footerHeading">
                <h2 id="footerHeading" className="sr-only">
                    Footer
                </h2>
                <div className="px-4 pt-16 pb-8 text-center sm:px-6 lg:pt-24 lg:px-8">
                    <p className="mt-8 text-base text-light-shade md:mt-0 md:order-1">
                        &copy; 2021 {ConstantSettings.title}. All rights
                        reserved.
                    </p>
                    <p className="mt-8 text-base text-light-shade md:mt-0 md:order-1">
                        <Link to={"/privacy"} className="underline">
                            privacy policy
                        </Link>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
