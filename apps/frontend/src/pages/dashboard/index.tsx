import { MenuSection } from "../../components/LeftMenu.jsx";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { dashboardGetSspData } from "../../dashboard/dashboardDataService.js";
import {
    Organisation,
    OrganisationSubscriptionRecord,
    SubscriptionAsset,
    UserDto,
} from "@use-miller/shared-api-client";
import { DashboardDetails } from "../../dashboard/components/DashboardDetails.jsx";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent.jsx";

export const getServerSideProps = withPageAuthRequired({
    // returnTo: '/unauthorized',
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
            productKey="miller-start"
            menuHeaderTitle="Dashboard"
            menuHeaderHref="/dashboard"
            menuSections={menuSections}
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
