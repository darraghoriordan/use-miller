import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

const ProtectedRoute = <T extends React.FunctionComponent<object>>({
    component,
    ...args
}: {
    component: T;
}) => {
    const Component = withAuthenticationRequired(component, args);
    return <Component />;
};

export default ProtectedRoute;
