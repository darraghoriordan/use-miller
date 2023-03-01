import React, { FunctionComponent, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import useGetOrgs from "../account/organisations/useGetOrgs";
import AppGlobalContext from "./AppGlobalContext";
import { Organisation } from "@use-miller/shared-api-client";
import { useEffect } from "react";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import HeaderContextProvider from "./HeaderContextProvider";
import { useQueries } from "@tanstack/react-query";
import useGetPerson from "../account/persons/useGetPerson";

const MainLayout: FunctionComponent = ({ children }: PropsWithChildren<{}>) => {
    const { data, isError, error, isLoading } = useGetOrgs();
    const { data: person, isLoading: personIsLoading } = useGetPerson("me");

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
        if (isError) {
            control = (
                <Error
                    message={
                        "We couldn't load an organisation for you! There's likely a problem with our backend. Please contact support or try again later."
                    }
                />
            );
        }
    }
    return (
        <AppGlobalContext.Provider value={{ appContext, setAppContext }}>
            <HeaderContextProvider>
                <Header person={person} />
                <main>{control}</main>
            </HeaderContextProvider>
        </AppGlobalContext.Provider>
    );
};

export default MainLayout;
