import React from "react";
// import LoginButton from "./LoginButton";
import SharingLinks from "../sharingLinks/SharingLinks";
import Profile from "../Profile";
import FilterSettings from "../filterSettings/FilterSettings";
import ReceivedOffers from "../receivedOffers/ReceivedOffers";
import SubmitOffer from "../submitOffer/SubmitOffer";
import { Route, Routes } from "react-router-dom";
import SubmittedOffers from "../submittedOffers/SubmittedOffers";
import SubmittedOfferDetail from "../submittedOffers/SubmittedOfferDetails";
import ReceivedOfferDetails from "../receivedOffers/ReceivedOfferDetails";
import NewLayout from "./NewLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<NewLayout />}>
                <Route
                    index
                    element={<ProtectedRoute component={SharingLinks} />}
                />
                <Route
                    path="/settings"
                    element={<ProtectedRoute component={FilterSettings} />}
                />
                <Route
                    path="/profile"
                    element={<ProtectedRoute component={Profile} />}
                />{" "}
                <Route
                    path="/received-roles/:offerId"
                    element={
                        <ProtectedRoute component={ReceivedOfferDetails} />
                    }
                />
                <Route
                    path="/received-roles"
                    element={<ProtectedRoute component={ReceivedOffers} />}
                />
                <Route
                    path="/submitted-roles/:offerId"
                    element={
                        <ProtectedRoute component={SubmittedOfferDetail} />
                    }
                />
                <Route
                    path="/submitted-roles"
                    element={<ProtectedRoute component={SubmittedOffers} />}
                />
                <Route
                    path="/submit/:offerId"
                    element={<ProtectedRoute component={SubmitOffer} />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
