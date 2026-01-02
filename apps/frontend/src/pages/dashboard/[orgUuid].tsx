import { dashboardGetSspData } from "../../dashboard/dashboardDataService";
import { auth0 } from "../../lib/auth0";

export const getServerSideProps = auth0.withPageAuthRequired({
    getServerSideProps: dashboardGetSspData,
});
export { default } from "./index";
