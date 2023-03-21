import { UsersApi } from "@use-miller/shared-api-client";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories.js";
import { createMenu } from "./leftMenuGeneration.js";

export const getAccountIndexData = async (accessToken: string) => {
    const userData = await getUserData(accessToken);
    const userOrgs = userData.memberships.reduce(
        (acc, membership) => [
            ...acc,
            {
                name: membership.organisation.name,
                uuid: membership.organisation.uuid,
            },
        ],
        [] as { name: string; uuid: string }[]
    );
    // org data permissions are enforced on the server
    // so we can just return the data
    const menuData = await createMenu(userOrgs);

    return {
        menuSections: menuData,
        currentUser: JSON.parse(JSON.stringify(userData)),
    };
};

export const getUserData = async (accessToken: string) => {
    const apiClient = await getAuthenticatedApiInstance(
        UsersApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH,
        accessToken,
        fetch
    );
    const userData = await apiClient.userControllerFindOne({
        uuid: "me",
    });
    return userData;
};
