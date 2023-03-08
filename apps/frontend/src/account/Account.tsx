import { useAuth0 } from "@auth0/auth0-react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import AppGlobalContext from "../layout/AppGlobalContext";
import { Container } from "../layout/Container";
import useGetUser from "./users/useGetUser";
import StyledButton from "@use-miller/shared-frontend-tooling/src/components/StyledButton";
import { Subscriptions } from "./Subscriptions";
import StyledHeader1 from "../components/StyledHeader1";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
const Account = () => {
    const { logout } = useAuth0();

    const { appContext } = useContext(AppGlobalContext); // the selected organisation

    const {
        data: userData,
        isError: userIsError,
        isLoading: userIsLoading,
    } = useGetUser("me");

    if (userIsError) {
        return <Error message={"Error finding your user details"} />;
    }
    if (userIsLoading) {
        return <Loading />;
    }

    return (
        <Container className="bg-white">
            <div className="flex flex-col w-full h-full mt-10 space-y-10">
                <div>
                    <StyledHeader1>
                        {appContext.currentOrganisation.name}
                    </StyledHeader1>

                    <StyledHeader1>Your products</StyledHeader1>

                    <p className="mb-10">
                        Any products you have purchased will be listed below.
                        Use the links to manage the billing.
                    </p>
                    {userData?.memberships.some(
                        (m) =>
                            m.organisationId ===
                                appContext.currentOrganisation.id &&
                            m.roles.some((r) => r.name === "owner")
                    ) && (
                        <Subscriptions
                            orgId={appContext.currentOrganisation.id}
                            orgUuid={appContext.currentOrganisation.uuid}
                        />
                    )}

                    <StyledHeader1 className="mt-8">Your account</StyledHeader1>
                    <p className="mt-4 mb-4">Email: {userData.email}</p>
                    <p className="mt-4 mb-4">
                        Member since:{" "}
                        {userData.createdDate.toLocaleDateString()}
                    </p>
                    <StyledButton className="mb-4" onClick={() => logout()}>
                        Log out of your account
                        <ArrowLeftOnRectangleIcon className="w-6 h-6 ml-2" />
                    </StyledButton>
                </div>
            </div>
        </Container>
    );
};

export default Account;
