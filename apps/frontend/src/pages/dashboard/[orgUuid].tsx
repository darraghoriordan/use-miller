import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { dashboardGetSspData } from "../../dashboard/dashboardDataService.js";

export const getServerSideProps = withPageAuthRequired({
    // returnTo: '/unauthorized',
    getServerSideProps: dashboardGetSspData,
});
export { default } from "./index";
