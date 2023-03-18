import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getStripeCustomerPortalLink } from "../../../hooks/useGetCustomerPortalSession.js";

export default withApiAuthRequired(getStripeCustomerPortalLink);
