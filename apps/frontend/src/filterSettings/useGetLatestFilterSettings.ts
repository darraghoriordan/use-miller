import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";

import {
    FilterSettingsApi,
    QuestionSection,
} from "@use-miller/shared-api-client";
import wellKnownQueries from "./wellKnownQueries";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

const getLatestFilterSetting = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<QuestionSection[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        FilterSettingsApi,
        getAccessTokenSilently
    );

    return apiClient.filterSettingsControllerGetLatest();
};

export default function useGetLatestFilterSettings() {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery(wellKnownQueries.filterSettingLatest, () =>
        getLatestFilterSetting(getAccessTokenSilently)
    );
}
