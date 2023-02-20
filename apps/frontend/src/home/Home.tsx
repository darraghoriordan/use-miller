import { useContext } from "react";
import { useEffect } from "react";
import { Container } from "../layout/Container";
import HeaderContext from "../layout/HeaderContext";
import ProductActionsCard from "./ProductActionsCard";
import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";
import Quotes from "./Quotes";
import AppGlobalContext from "../layout/AppGlobalContext";
import useGetSubscriptions from "../account/subscriptions/useGetSubscriptions";

import { useNavigate } from "react-router-dom";

const Home = () => {
    const { setContext } = useContext(HeaderContext);
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
        if (subsData && subsData?.length > 0) {
            setContext({ title: "Miller / Home" });
        }

        if (
            subsIsError ||
            (subsData &&
                (subsData?.length === 0 ||
                    !subsData?.some((s) => s.validUntil > new Date())))
        ) {
            nav("/account");
        }
    }, [nav, setContext, subsData, subsIsError]);

    if (subsIsLoading) {
        return <div>Loading</div>;
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
                            iconForeground: "green",
                        },
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
                            iconForeground: "amber",
                        },
                        {
                            title: "Latest Code - Miller Web SaaS",
                            href: "/learn-courses/miller/documentation",
                            icon: CheckBadgeIcon,
                            description: "View the latest code.",
                            iconForeground: "cyan",
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
                            description: "View the latest code.",
                            iconForeground: "pink",
                        },
                    ]}
                />
            </div>
        </Container>
    );
};

export default Home;
