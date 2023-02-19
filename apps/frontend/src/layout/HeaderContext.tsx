import { createContext } from "react";

const HeaderContext = createContext({
    context: { title: "Miller" },
    setContext: (context: { title: string }) => {},
});
export default HeaderContext;
