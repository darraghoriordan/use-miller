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
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

const MainLayout: FunctionComponent = ({ children }: PropsWithChildren<{}>) => {
    const [context, setContext] = useState({ title: "Miller" });
    const { loginWithRedirect } = useAuth0();
    const { data, isError, error, isLoading } = useGetOrgs();
    const [appContext, setAppContext] = useState<{
        currentOrganisation: Organisation;
    }>({ currentOrganisation: {} as Organisation }); // this {} is a hack but it works!

    useEffect(() => {
        if (data) {
            setAppContext({ currentOrganisation: data[0] });
        }
    }, [data]);

    let control = <Loading />;
    if (data && !isLoading) {
        control = <Outlet />;
    }

    if (isError) {
        if ((error as any)?.error === "login_required") {
            loginWithRedirect();
        }

        if (isError) {
            control = (
                <Error message={"Couldn't load an organisation for you!"} />
            );
        }
    }
    return (
        <AppGlobalContext.Provider value={{ appContext, setAppContext }}>
            <HeaderContext.Provider value={{ context, setContext }}>
                <Header />
                <main>{control}</main>
            </HeaderContext.Provider>
        </AppGlobalContext.Provider>
    );
};

export default MainLayout;
