import React, { FunctionComponent, PropsWithChildren } from "react";

import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import HeaderContext from "./HeaderContext";
import { useState } from "react";
import useGetOrgs from "../account/organisations/useGetOrgs";
import AppGlobalContext from "./AppGlobalContext";
import { Organisation } from "@use-miller/shared-api-client";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import StyledButton from "../account/StyledButton";

const MainLayout: FunctionComponent = ({ children }: PropsWithChildren<{}>) => {
    const [context, setContext] = useState({ title: "Miller" });
    const { logout, loginWithRedirect } = useAuth0();
    const { data, isError, error, isLoading } = useGetOrgs();
    const [appContext, setAppContext] = useState<{
        currentOrganisation: Organisation;
    }>({ currentOrganisation: {} as Organisation }); // this {} is a hack but it works!

    useEffect(() => {
        if (data) {
            setAppContext({ currentOrganisation: data[0] });
        }
    }, [data]);

    if (isError) {
        if ((error as any)?.error === "login_required") {
            loginWithRedirect();
        }
        return (
            <HeaderContext.Provider value={{ context, setContext }}>
                <Header />
                <main>
                    <div className="">
                        <div>Error getting organisation</div>
                        <StyledButton onClick={() => logout()}>
                            Logout to attempt a reset
                        </StyledButton>
                    </div>
                </main>
            </HeaderContext.Provider>
        );
    }
    if (isLoading) {
        return <div>Loading</div>;
    }
    if (!data || data.length === 0) {
        return <div>No organisations!</div>;
    }

    return (
        <AppGlobalContext.Provider value={{ appContext, setAppContext }}>
            <HeaderContext.Provider value={{ context, setContext }}>
                <Header />
                <main>
                    <Outlet />
                </main>
            </HeaderContext.Provider>
        </AppGlobalContext.Provider>
    );
};

export default MainLayout;
