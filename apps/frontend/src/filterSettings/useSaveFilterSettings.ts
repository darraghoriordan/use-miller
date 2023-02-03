import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "react-query";
import wellKnownQueries from "./wellKnownQueries";
import {
    FilterSetting,
    FilterSettingsApi,
} from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

type SaveFilterSettingsMutationVariables = {
    model: FilterSetting;
};
const saveFilterSetting = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>,
    model: FilterSetting
): Promise<FilterSetting> => {
    const apiClient = await getAuthenticatedApiInstance(
        FilterSettingsApi,
        getAccessTokenSilently
    );

    return apiClient.filterSettingsControllerSaveLatest({
        filterSettingDto: model,
    });
};

export default function useSaveFilterSettings() {
    const { getAccessTokenSilently } = useAuth0();

    const queryClient = useQueryClient();
    return useMutation(
        wellKnownQueries.filterSettingLatest,
        (variables: SaveFilterSettingsMutationVariables) =>
            saveFilterSetting(getAccessTokenSilently, variables.model),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(
                    wellKnownQueries.filterSettingLatest
                );
                queryClient.invalidateQueries(
                    wellKnownQueries.filterSettingsAll
                );
            },
        }
    );
}
