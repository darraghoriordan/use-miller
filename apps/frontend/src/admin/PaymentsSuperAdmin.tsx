import React from "react";
import useGetPerson from "../account/persons/useGetPerson";

const PaymentsSuperAdmin = () => {
    const { data } = useGetPerson("me");
    return <div>{data?.isSuper}</div>;
};

export default PaymentsSuperAdmin;
