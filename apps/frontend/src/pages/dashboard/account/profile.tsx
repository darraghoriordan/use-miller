import type { components } from "../../../shared/types/api-specs";
import { MenuSection } from "../../../components/LeftMenu";
import { LeftMenuWrappedContent } from "../../../components/LeftMenuWrappedContent";
import { ProfileDetails } from "../../../dashboard/components/ProfileDetails";

export { getServerSideProps } from "../../../dashboard/accountProfileDataService";

type User = components["schemas"]["User"];

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
