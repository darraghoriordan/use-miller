import { useAuth0 } from "@auth0/auth0-react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import ApiLoading from "../api/ApiLoading";
import useInitUser from "./useInitUser";

const InitialisedUserWrapped = (
    props: PropsWithChildren<{}>
): JSX.Element | null => {
    const { isAuthenticated } = useAuth0();

    const useInitUserMutation = useInitUser();

    const [userInitialised, toggleUserInitialised] = useState(false);

    useEffect(
        function initializeUserOnce() {
            if (isAuthenticated && !userInitialised) {
                useInitUserMutation.mutate();

                toggleUserInitialised(true);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [userInitialised, isAuthenticated]
    );

    if (isAuthenticated && !userInitialised) {
        return (
            <ApiLoading message="We're getting everything ready for you..." />
        );
    }

    return <>{props.children}</>;
};

export default InitialisedUserWrapped;
