import React from "react";

import { Route, Routes } from "react-router-dom";
import Account from "../account/Account";
import PaymentEventsSuperAdmin from "../admin/PaymentEventsSuperAdmin";
import PaymentsSuperAdmin from "../admin/PaymentsSuperAdmin";
import SuperAdmin from "../admin/SuperAdmin";
import UsersSuperAdmin from "../admin/UsersSuperAdmin";
import Home from "../home/Home";
import LayoutErrorBoundary from "../layout/LayoutErrorBoundry";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <LayoutErrorBoundary>
                        <MainLayout />{" "}
                    </LayoutErrorBoundary>
                }
            >
                <Route index element={<ProtectedRoute component={Home} />} />
                <Route
                    path="account"
                    element={<ProtectedRoute component={Account} />}
                />
                <Route
                    path="super-admin"
                    element={<ProtectedRoute component={SuperAdmin} />}
                ></Route>
                <Route
                    path="super-admin/users"
                    element={<ProtectedRoute component={UsersSuperAdmin} />}
                />
                <Route
                    path="super-admin/payments"
                    element={<ProtectedRoute component={PaymentsSuperAdmin} />}
                />
                <Route
                    path="super-admin/payment-events"
                    element={
                        <ProtectedRoute component={PaymentEventsSuperAdmin} />
                    }
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
