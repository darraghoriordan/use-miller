import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./layout/routes/AppRoutes";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./layout/Auth0ProviderWithHistory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <QueryClientProvider client={queryClient}>
                    <AppRoutes />
                </QueryClientProvider>
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
