import { useQuery } from "react-query";
import {
    FilterSettingsApi,
    QuestionSection,
} from "@use-miller/shared-api-client";
import { getAnonymousApiInstance } from "../api/apiInstanceFactories";

import wellKnownQueries from "./wellKnownQueries";

const apiRequest = async (offerId: string): Promise<QuestionSection[]> => {
    const apiClient = getAnonymousApiInstance(FilterSettingsApi);

    const fancyData = apiClient.filterSettingsControllerGetSettings({
        offerId,
    });
    return fancyData;
};

export default function useGetSubmitOfferQuestions(offerId: string) {
    return useQuery(wellKnownQueries.getOfferData, () => apiRequest(offerId));
}
