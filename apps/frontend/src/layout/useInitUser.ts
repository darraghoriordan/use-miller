import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "react-query";
import wellKnownQueries from "./wellKnownQueries";
import * as wellKnownSharingLinkQueries from "../sharingLinks/wellKnownQueries";
import * as wellKnownFilterQueries from "../filterSettings/wellKnownQueries";
import { InitUserDto } from "./InitUserResult";
import { ApplicationSupportApi } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

const callApi = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<InitUserDto> => {
    const apiClient = await getAuthenticatedApiInstance(
        ApplicationSupportApi,
        getAccessTokenSilently
    );
    console.log(
        "HELLO authorized",
        await apiClient.appControllerGetHelloAuthorized()
    );
    const data = await apiClient.appControllerInitUser();

    return data;
};

export default function useInitUser() {
    const { getAccessTokenSilently } = useAuth0();

    const queryClient = useQueryClient();
    return useMutation(
        wellKnownQueries.initUser,
        () => callApi(getAccessTokenSilently),
        {
            onSettled: (data) => {
                // only invalidate everything if the user was initialised
                if (data?.userWasInitialised === true) {
                    setTimeout(function () {
                        // this timeout is awful but i'm not sure how to make it work otherwise!
                        // the invalidates happen too fast for the user to be initialised on the server otherwise.
                        console.log(
                            "user was initialised, invalidating queries"
                        );
                        queryClient.invalidateQueries(
                            wellKnownSharingLinkQueries.default
                                .sharingLinksGetAll
                        );
                        queryClient.invalidateQueries(
                            wellKnownSharingLinkQueries.default
                                .sharingLinksGetLatest
                        );
                        queryClient.invalidateQueries(
                            wellKnownFilterQueries.default.filterSettingLatest
                        );
                        queryClient.invalidateQueries(
                            wellKnownFilterQueries.default.filterSettingsAll
                        );
                        return;
                    }, 500);
                }

                console.log("user did not need to be initialised");
                return;
            },
            onError: (error) => {
                console.log("Couldn't initialise the user", error);
                throw error;
            },
        }
    );
}
