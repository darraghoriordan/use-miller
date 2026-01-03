import { MenuSection } from "../../components/LeftMenu";
import type { components } from "../../shared/types/api-specs";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent";
import { getPaymentEventsServerSideProps } from "../../super-admin/services/superAdminData";
import PaymentEventsSuperAdmin from "../../super-admin/components/PaymentEventsSuperAdmin";

type StripeCheckoutEvent = components["schemas"]["StripeCheckoutEvent"];

export const getServerSideProps = getPaymentEventsServerSideProps;

export default function Home({
    menuSections,
    allData,
}: {
    menuSections: MenuSection[];
    allData: StripeCheckoutEvent[];
}) {
    return (
        <LeftMenuWrappedContent
            productKey="miller-start"
            menuHeaderTitle="Super Admin"
            menuHeaderHref="/super-admin"
            headerTitle="Miller Dev Tools"
            menuSections={menuSections}
        >
            <PaymentEventsSuperAdmin
                allData={allData}
                title={"Latest Payment Events"}
            />
        </LeftMenuWrappedContent>
    );
}
