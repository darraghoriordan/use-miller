import { createContext } from "react";
import { Organisation } from "@use-miller/shared-api-client";
import { Dispatch } from "react";
import { SetStateAction } from "react";

export type AppGlobalContextModel = {
    currentOrganisation: Organisation;
};

export type AppGlobalContextType = {
    appContext: AppGlobalContextModel;
    setAppContext: Dispatch<SetStateAction<AppGlobalContextModel>>;
};
const fakeOrg = {} as Organisation;
const AppGlobalContext = createContext<AppGlobalContextType>({
    appContext: { currentOrganisation: fakeOrg },
    setAppContext: (params: SetStateAction<AppGlobalContextModel>): any => {},
});
export default AppGlobalContext;
