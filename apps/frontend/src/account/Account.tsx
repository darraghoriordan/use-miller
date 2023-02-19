import { useContext } from "react";
import { useEffect } from "react";
import AppGlobalContext from "../layout/AppGlobalContext";
import { Container } from "../layout/Container";
import HeaderContext from "../layout/HeaderContext";
import useGetPerson from "./persons/useGetPerson";
import { Subscriptions } from "./Subscriptions";

const Account = () => {
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
                <div
                    key={appContext.currentOrganisation.id}
                    className="mr-auto"
                >
                    <h1 className="mb-10 text-4xl font-bold leading-tight tracking-tight text-black">
                        Account - {appContext.currentOrganisation.name}
                    </h1>

                    {personData?.memberships.some(
                        (m) =>
                            m.organisationId ===
                                appContext.currentOrganisation.id &&
                            m.roles.some((r) => r.name === "owner")
                    ) && (
                        <Subscriptions
                            orgId={appContext.currentOrganisation.id}
                        />
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Account;
