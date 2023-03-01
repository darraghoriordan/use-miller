import React, { FunctionComponent, PropsWithChildren } from "react";
import { Header } from "./Header";
import HeaderContextProvider from "./HeaderContextProvider";
import { Outlet } from "react-router";

const UnAuthLayout: FunctionComponent = ({
    children,
}: PropsWithChildren<{}>) => {
    let control = <Outlet />;

    return (
        <HeaderContextProvider>
            <Header />
            <main>{control}</main>
        </HeaderContextProvider>
    );
};

export default UnAuthLayout;
