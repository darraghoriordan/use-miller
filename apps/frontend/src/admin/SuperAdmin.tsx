import React from "react";
import useGetUser from "../account/users/useGetUser";
import ProductActionsCard from "../components/ProductActionsCard";
import { Container } from "../layout/Container";
import { CreditCardIcon, UserIcon } from "@heroicons/react/24/outline";
const SuperAdmin = () => {
    const { data } = useGetUser("me");
    if (!data?.isSuper) return <div>No access</div>;

    return (
        <Container className="bg-white">
            <div className="flex flex-col w-full h-full mt-10 space-y-6">
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-black">
                    Super-admin Tools
                </h1>

                <ProductActionsCard
                    actions={[
                        {
                            title: "Users",
                            href: "/super-admin/users",
                            icon: UserIcon,
                            description: "Review all users.",
                            iconForeground: "green",
                        },
                        {
                            title: "Subs and Payments",
                            href: "/super-admin/payments",
                            icon: CreditCardIcon,
                            description:
                                "Review all existing payments and subscriptions.",
                            iconForeground: "green",
                        },
                        {
                            title: "Payment events",
                            href: "/super-admin/payment-events",
                            icon: CreditCardIcon,
                            description: "Review payment events.",
                            iconForeground: "green",
                        },
                    ]}
                />
            </div>
        </Container>
    );
};

export default SuperAdmin;