import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }: PropsWithChildren) => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
    const audience = import.meta.env.VITE_AUTH0_API_AUDIENCE as string;
    const apiScopes = import.meta.env.VITE_AUTH0_API_SCOPE as string;
    const navigate = useNavigate();

    const onRedirectCallback = (appState: any) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: audience,
                scope: apiScopes,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
