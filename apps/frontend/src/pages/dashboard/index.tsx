import { MenuSection } from "../../components/LeftMenu";
import { dashboardGetSspData } from "../../dashboard/dashboardDataService";
import type { components } from "../../shared/types/api-specs";
import { DashboardDetails } from "../../dashboard/components/DashboardDetails";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent";
import { auth0 } from "../../lib/auth0";

type Organisation = components["schemas"]["Organisation"];
type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];
type SubscriptionAsset = components["schemas"]["SubscriptionAsset"];
type UserDto = components["schemas"]["UserDto"];

export const getServerSideProps = auth0.withPageAuthRequired({
    getServerSideProps: dashboardGetSspData,
});

export default function Home({
    menuSections,
    currentOrg,
    currentUser,
    subAssets,
    subs,
    ghUsername,
}: {
    menuSections: MenuSection[];
    currentOrg: Organisation;
    currentUser: UserDto;
    subAssets: SubscriptionAsset[];
    subs: OrganisationSubscriptionRecord[];
    ghUsername: string | undefined;
}) {
    return (
        <LeftMenuWrappedContent
            menuHeaderTitle="Dashboard"
            menuHeaderHref="/dashboard"
            menuSections={menuSections}
            headerTitle={"Miller Dev Tools"}
        >
            <DashboardDetails
                subs={subs}
                subAssets={subAssets}
                currentOrg={currentOrg}
                currentUser={currentUser}
                ghUsername={ghUsername}
            />
        </LeftMenuWrappedContent>
    );
}
