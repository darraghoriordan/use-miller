import wellKnownQueries from "./wellKnownQueries";
import { PersonDto, PersonsApi } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "@use-miller/shared-frontend-tooling";
import { useQuery } from "@tanstack/react-query";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
const apiBase = import.meta.env.VITE_API_BASE as string;

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>,
    personUuid: string
): Promise<PersonDto> => {
    const apiClient = await getAuthenticatedApiInstance(
        PersonsApi,
        apiBase,
        getAccessTokenSilently
    );

    return await apiClient.personControllerFindOne({
        uuid: personUuid,
    });
};

export default function useGetPerson(personUuid: string) {
    const { getAccessTokenSilently } = useAuth0();
    return useQuery(
        [wellKnownQueries.getPerson, personUuid],
        () => apiCall(getAccessTokenSilently, personUuid),
        { refetchOnWindowFocus: false }
    );
}
