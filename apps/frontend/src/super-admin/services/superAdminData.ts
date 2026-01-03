import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../../api-services/apiInstanceFactories";
import { auth0 } from "../../lib/auth0";

export const getUsersServerSideProps = auth0.withPageAuthRequired({
    getServerSideProps: superUserGetUserData,
});

export const getPaymentEventsServerSideProps = auth0.withPageAuthRequired({
    getServerSideProps: superUserGetPaymentData,
});

export const getSubscriptionsServerSideProps = auth0.withPageAuthRequired({
    getServerSideProps: superUserGetSubscriptionsData,
});

async function superUserGetUserData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
    const accessToken = await auth0.getAccessToken(context.req, context.res);
    if (!accessToken?.token) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    const apiClient = getAuthenticatedApiInstance({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
        authToken: accessToken.token,
        fetchApi: fetch,
    });

    const [usersResult, menuSections] = await Promise.allSettled([
        apiClient.GET("/user"),
        createMenu(),
    ]);

    if (
        usersResult.status === "rejected" ||
        menuSections.status === "rejected"
    ) {
        throw new Error(
            "Failed to get data:" +
                (usersResult as PromiseRejectedResult).reason!,
        );
    }

    const { data: allUsers, error } = usersResult.value;
    if (error || !allUsers) {
        throw new Error("Failed to fetch users");
    }

    return {
        props: JSON.parse(
            JSON.stringify({
                allUsers,
                menuSections: menuSections.value,
            }),
        ),
    };
}

export const createMenu = () => {
    const menuSections = [];

    menuSections.push({
        name: "Super Powers",
        slug: "super-powers",
        items: [
            {
                name: "Users",
                path: "/super-admin/users",
            },
            {
                name: "Org Subs",
                path: "/super-admin/org-subs",
            },
            {
                name: "Payment Events",
                path: "/super-admin/payment-events",
            },
        ],
    });

    return menuSections;
};

async function superUserGetPaymentData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
    const accessToken = await auth0.getAccessToken(context.req, context.res);
    if (!accessToken?.token) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    const apiClient = getAuthenticatedApiInstance({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
        authToken: accessToken.token,
        fetchApi: fetch,
    });

    const [paymentResult, menuSections] = await Promise.allSettled([
        apiClient.GET("/payments/stripe/events", {
            params: { query: { skip: 0, take: 20 } },
        }),
        createMenu(),
    ]);

    if (
        paymentResult.status === "rejected" ||
        menuSections.status === "rejected"
    ) {
        throw new Error("Failed to get data");
    }

    const { data: allData, error } = paymentResult.value;
    if (error || !allData) {
        throw new Error("Failed to fetch payment events");
    }

    return {
        props: JSON.parse(
            JSON.stringify({
                allData,
                menuSections: menuSections.value,
            }),
        ),
    };
}

async function superUserGetSubscriptionsData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
    const accessToken = await auth0.getAccessToken(context.req, context.res);
    if (!accessToken?.token) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    const apiClient = getAuthenticatedApiInstance({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
        authToken: accessToken.token,
        fetchApi: fetch,
    });

    const [subsResult, menuSections] = await Promise.allSettled([
        apiClient.GET("/subscriptions"),
        createMenu(),
    ]);

    if (
        subsResult.status === "rejected" ||
        menuSections.status === "rejected"
    ) {
        throw new Error("Failed to get data");
    }

    const { data: orgSubs, error } = subsResult.value;
    if (error || !orgSubs) {
        throw new Error("Failed to fetch subscriptions");
    }

    return {
        props: JSON.parse(
            JSON.stringify({
                allSubs: orgSubs,
                menuSections: menuSections.value,
            }),
        ),
    };
}
