import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { User } from "@use-miller/shared-api-client";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { MenuSection } from "../../../components/LeftMenu.jsx";
import { LeftMenuWrappedContent } from "../../../components/LeftMenuWrappedContent.jsx";
import { ProfileDetails } from "../../../dashboard/components/ProfileDetails.jsx";
import { getAccountIndexData } from "../../../dashboard/dashboardDataService.js";

export const getServerSideProps = withPageAuthRequired({
    // returnTo: '/unauthorized',
    getServerSideProps: customGetSSP,
});

export async function customGetSSP(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
    const atResponse = await getAccessToken(context.req, context.res, {
        scopes: ["openid", "email", "profile", "offline_access"],
    });

    const data = await getAccountIndexData(
        atResponse.accessToken! // user can't be logged in
    );
    return {
        props: data,
    };
}

export default function Home({
    menuSections,
    currentUser,
}: {
    menuSections: MenuSection[];
    currentUser: User;
}) {
    return (
        <LeftMenuWrappedContent
            menuSections={menuSections}
            menuHeaderTitle={"Dashboard"}
            menuHeaderHref={"/dashboard"}
        >
            <ProfileDetails currentUser={currentUser} />
        </LeftMenuWrappedContent>
    );
}
