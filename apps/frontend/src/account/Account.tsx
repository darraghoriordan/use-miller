import { useAuth0 } from "@auth0/auth0-react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useEffect } from "react";
import AppGlobalContext from "../layout/AppGlobalContext";
import { Container } from "../layout/Container";
import HeaderContext from "../layout/HeaderContext";
import useGetPerson from "./persons/useGetPerson";
import StyledButton from "../components/StyledButton";
import { Subscriptions } from "./Subscriptions";
import StyledHeader1 from "../components/StyledHeader1";

const Account = () => {
    const { logout } = useAuth0();
    const { setContext } = useContext(HeaderContext); // the header titles
    const { appContext } = useContext(AppGlobalContext); // the selected organisation
    useEffect(() => {
        setContext({ title: "Miller / Account" });
    }, [setContext]);

    const {
        data: personData,
        isError: personIsError,
        isLoading: personIsLoading,
    } = useGetPerson("me");

    if (personIsError) {
        return <div>Error getting user</div>;
    }
    if (personIsLoading) {
        return <div>Loading</div>;
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
                    {personData?.memberships.some(
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
                    <StyledButton onClick={() => logout()}>
                        Log out of your account
                        <ArrowLeftOnRectangleIcon className="w-6 h-6 ml-2" />
                    </StyledButton>
                    <p className="mt-4 mb-4">Email: {personData.email}</p>
                    <p className="mt-4 mb-4">
                        Member since:{" "}
                        {personData.createdDate.toLocaleDateString()}
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default Account;
