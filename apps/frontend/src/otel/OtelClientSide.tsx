"use client";

import { useEffect } from "react";
import { initInstrumentation } from "./instrumentation.client";

export default function OtelClientSide() {
    useEffect(() => {
        if (typeof window !== undefined) {
            initInstrumentation();
        }
    }, []);

    return null;
}
