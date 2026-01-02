import type { components } from "../../../shared/types/api-specs";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { MenuSection } from "../../../components/LeftMenu";
import { LeftMenuWrappedContent } from "../../../components/LeftMenuWrappedContent";
import { getAccountIndexData } from "../../../dashboard/accountProfileDataService";
import { ProfileDetails } from "../../../dashboard/components/ProfileDetails";
import { auth0 } from "../../../lib/auth0";

type User = components["schemas"]["User"];

export const getServerSideProps = auth0.withPageAuthRequired({
    getServerSideProps: customGetSSP,
});

export async function customGetSSP(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
    const accessToken = await auth0.getAccessToken(context.req, context.res);
    if (!accessToken?.token) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    const data = await getAccountIndexData(accessToken.token);
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
            productKey="miller-start"
            menuSections={menuSections}
            menuHeaderTitle={"Dashboard"}
            menuHeaderHref={"/dashboard"}
            headerTitle={"Miller Dev Tools"}
        >
            <ProfileDetails currentUser={currentUser} />
        </LeftMenuWrappedContent>
    );
}
