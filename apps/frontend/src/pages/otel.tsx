"use client";

import { useEffect } from "react";
import { initInstrumentation } from "../otel/instrumentation.client.js";

function OtelClientSide() {
    useEffect(() => {
        if (typeof window !== undefined) {
            initInstrumentation();
        }
    }, []);

    return null;
}

export default OtelClientSide;
