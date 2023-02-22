import React from "react";

import { Route, Routes } from "react-router-dom";
import Account from "../../account/Account";
import PaymentsSuperAdmin from "../../admin/PaymentsSuperAdmin";
import SuperAdmin from "../../admin/SuperAdmin";
import UsersSuperAdmin from "../../admin/UsersSuperAdmin";
import Home from "../../home/Home";
import LayoutErrorBoundary from "../LayoutErrorBoundry";
import MainLayout from "../MainLayout";
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
                >
                    <Route
                        path="users"
                        element={<ProtectedRoute component={UsersSuperAdmin} />}
                    />
                    <Route
                        path="payments"
                        element={
                            <ProtectedRoute component={PaymentsSuperAdmin} />
                        }
                    />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;
