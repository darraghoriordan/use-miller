import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getStripeCheckoutLink } from "../../../hooks/useGetPaymentLink.js";

export default withApiAuthRequired(getStripeCheckoutLink);
