import React, { PropsWithChildren } from "react";

import HeaderContext from "./HeaderContext";
import { useState } from "react";

const HeaderContextProvider = ({ children }: PropsWithChildren) => {
    const [context, setContext] = useState({ title: "Miller" });

    return (
        <HeaderContext.Provider value={{ context, setContext }}>
            {children}
        </HeaderContext.Provider>
    );
};

export default HeaderContextProvider;
