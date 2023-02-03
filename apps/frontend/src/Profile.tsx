import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const defaultAudience = import.meta.env.VITE_AUTH0_API_AUDIENCE as string;
const defaultScope = import.meta.env.VITE_AUTH0_API_SCOPE as string;

const Profile = (): JSX.Element => {
    const {
        user,
        isAuthenticated,
        getAccessTokenSilently,
        getAccessTokenWithPopup,
    } = useAuth0();

    const [protectedData, setProtectedData] = useState("");

    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                console.debug("starting...");
                let accessToken: string | undefined;
                try {
                    console.debug("getting token silently...");
                    accessToken = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: defaultAudience,
                            scope: defaultScope,
                        },
                        cacheMode: "off",
                    });
                    console.debug("token attempt complete...");
                } catch (error) {
                    console.debug("error when getting silently", error);
                    if ((error as any)?.error === "consent_required") {
                        console.debug("consent error");
                        accessToken = await getAccessTokenWithPopup({
                            authorizationParams: {
                                audience: defaultAudience,
                                scope: defaultScope,
                            },

                            cacheMode: "off",
                        });
                        console.debug("popup token attempt complete");
                    } else {
                        throw new Error("Unrecoverable authentication error");
                    }
                }
                if (!accessToken) {
                    throw new Error("no access token received");
                }

                const result = await fetch(
                    `${import.meta.env.VITE_API_BASE}/authorise`,
                    {
                        method: "get",
                        headers: new Headers({
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        }),
                    }
                );
                const rtext = (await result.text()) || "no result";
                setProtectedData(rtext);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, [getAccessTokenWithPopup, getAccessTokenSilently]);

    return isAuthenticated && user ? (
        <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Data: {JSON.stringify(protectedData || {})}</p>
        </div>
    ) : (
        <p>Oops, you need to login to see your profile.</p>
    );
};

export default Profile;
