import { MenuSection } from "../../components/LeftMenu.jsx";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { StripeCheckoutEvent } from "@use-miller/shared-api-client";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent.jsx";
import { superUserGetPaymentData } from "../../super-admin/services/superAdminData.js";
import PaymentEventsSuperAdmin from "../../super-admin/components/PaymentEventsSuperAdmin.jsx";

export const getServerSideProps = withPageAuthRequired({
    // returnTo: '/unauthorized',
    getServerSideProps: superUserGetPaymentData,
});

export default function Home({
    menuSections,
    allData,
}: {
    menuSections: MenuSection[];
    allData: StripeCheckoutEvent[];
}) {
    return (
        <LeftMenuWrappedContent
            menuHeaderTitle="Super Admin"
            menuHeaderHref="/super-admin"
            menuSections={menuSections}
        >
            <PaymentEventsSuperAdmin allData={allData} title={"Users"} />
        </LeftMenuWrappedContent>
    );
}
