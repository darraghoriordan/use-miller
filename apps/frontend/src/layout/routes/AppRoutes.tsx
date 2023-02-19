import React from "react";

import { Route, Routes } from "react-router-dom";
import Account from "../../account/Account";
import Admin from "../../admin/Admin";
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
                    path="admin"
                    element={<ProtectedRoute component={Admin} />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
