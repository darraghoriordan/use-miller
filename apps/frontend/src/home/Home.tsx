import { useContext } from "react";
import { useEffect } from "react";
import { Container } from "../layout/Container";
import ProductActionsCard from "../components/ProductActionsCard";
import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";
import Quotes from "./Quotes";
import AppGlobalContext from "../layout/AppGlobalContext";
import useGetSubscriptions from "../account/subscriptions/useGetSubscriptions";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

const Home = () => {
    const { appContext } = useContext(AppGlobalContext);
    const nav = useNavigate();
    const {
        data: subsData,
        isError: subsIsError,
        isLoading: subsIsLoading,
    } = useGetSubscriptions(
        appContext.currentOrganisation.id,
        appContext?.currentOrganisation?.id !== undefined
    );
    useEffect(() => {
        if (
            subsIsError ||
            (subsData &&
                (subsData?.length === 0 ||
                    !subsData?.some((s) => s.validUntil > new Date())))
        ) {
            nav("/account");
        }
    }, [nav, subsData, subsIsError]);

    if (subsIsError) {
        return <Error message={"Error finding your subscriptions"} />;
    }
    if (subsIsLoading) {
        return <Loading />;
    }

    return (
        <Container className="bg-white">
            <div className="flex flex-col w-full h-full mt-10 space-y-6">
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-black">
                    Time to start building!
                </h1>
                <Quotes />
                <h2 className="pb-10 text-4xl font-bold leading-tight tracking-tight text-dark-accent">
                    Miller Web
                </h2>
                <ProductActionsCard
                    actions={[
                        {
                            title: "Tutorial - Your first Miller product (30 mins)",
                            href: "/learn-courses/miller/tutorials/your-first-miller-product",
                            icon: ClockIcon,
                            description:
                                "Learn how to build a Miller product from scratch.",
                            iconForeground: "red",
                        },

                        {
                            title: "Documentation - Miller Web SaaS",
                            href: "/learn-courses/miller/documentation",
                            icon: CheckBadgeIcon,
                            description:
                                "View the full documentation for Miller Web SaaS.",
                            iconForeground: "green",
                        },
                        {
                            title: "Latest Code - Miller Web SaaS",
                            href: "/learn-courses/miller/documentation",
                            icon: CheckBadgeIcon,
                            description: "View the latest code for Miller Web.",
                            iconForeground: "green",
                        },
                        {
                            title: "Nest Libraries Documentation",
                            href: "/learn-courses/nest-backend-libs/documentation",
                            icon: CheckBadgeIcon,
                            description:
                                "View the full documentation for Miller Nest Backend Libraries.",
                            iconForeground: "violet",
                        },
                        {
                            title: "Latest Code - Miller Nest Libraries",
                            href: "/learn-courses/miller/documentation",
                            icon: CheckBadgeIcon,
                            description:
                                "View the latest code for the Miller NestJs backend libraries.",
                            iconForeground: "violet",
                        },
                    ]}
                />
            </div>
        </Container>
    );
};

export default Home;
